/**
 * Generates data URLs for high-contrast cybersecurity images in the
 * woodcut/engraved style (pure red/orange on pitch black) matching the ScanlineBloom shader.
 */
export function getCyberGraphicDataUrl(stage: 1 | 2 | 3, width = 1920, height = 1080): string {
  if (typeof window === "undefined") return ""
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  // Solid deep pitch black
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height)

  const red = "#ff7900"
  const dimRed = "#884400"
  ctx.strokeStyle = red
  ctx.fillStyle = red

  // 1. Common Anchor (Bottom-left cybernetic padlock + PCB traces)
  ctx.save()
  const px = width * 0.18
  const py = height * 0.72
  const pw = width * 0.12
  const ph = height * 0.18

  // Base Padlock Body
  ctx.lineWidth = 4
  ctx.strokeRect(px - pw / 2, py, pw, ph)
  ctx.fillStyle = "#150800"
  ctx.fillRect(px - pw / 2, py, pw, ph)

  // Padlock Shackle
  ctx.beginPath()
  ctx.arc(px, py, pw * 0.35, Math.PI, 0, false)
  ctx.lineWidth = 8
  ctx.strokeStyle = red
  ctx.stroke()

  // Keyhole
  ctx.beginPath()
  ctx.arc(px, py + ph * 0.4, pw * 0.08, 0, Math.PI * 2)
  ctx.fillStyle = red
  ctx.fill()
  ctx.fillRect(px - pw * 0.03, py + ph * 0.4, pw * 0.06, ph * 0.3)

  // Circuit board traces radiating from padlock
  ctx.lineWidth = 2
  ctx.strokeStyle = dimRed
  for (let i = 0; i < 8; i++) {
    const startX = px + pw / 2
    const startY = py + 20 + i * (ph / 9)
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + 60 + i * 20, startY)
    ctx.lineTo(startX + 120 + i * 20, startY - 30)
    ctx.lineTo(width * 0.5 + i * 40, startY - 30)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(width * 0.5 + i * 40, startY - 30, 4, 0, Math.PI * 2)
    ctx.stroke()
  }
  ctx.restore()

  // 2. State-Specific Visual Elements
  if (stage === 1) {
    // Stage 1: Idle Matrix / Subtle Wireframe Grid
    ctx.save()
    ctx.strokeStyle = "#442200"
    ctx.lineWidth = 1
    const gridSize = 40
    for (let x = width * 0.4; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(width * 0.4, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Binary stream columns
    ctx.fillStyle = red
    ctx.font = "14px monospace"
    for (let col = width * 0.6; col < width; col += 60) {
      for (let r = 50; r < height - 50; r += 28) {
        if (Math.random() > 0.45) {
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", col, r)
        }
      }
    }
    ctx.restore()
  } else if (stage === 2) {
    // Stage 2: Geometric Threat Skull In Center
    ctx.save()
    const cx = width * 0.62
    const cy = height * 0.42
    const sw = 180

    ctx.strokeStyle = red
    ctx.lineWidth = 3

    // Cranium
    ctx.beginPath()
    ctx.arc(cx, cy, sw, Math.PI * 0.8, Math.PI * 0.2, false)
    ctx.stroke()

    // Cheekbones & Jaw
    ctx.beginPath()
    ctx.moveTo(cx - sw * 0.85, cy + sw * 0.5)
    ctx.lineTo(cx - sw * 0.5, cy + sw * 0.9)
    ctx.lineTo(cx - sw * 0.4, cy + sw * 1.3)
    ctx.lineTo(cx + sw * 0.4, cy + sw * 1.3)
    ctx.lineTo(cx + sw * 0.5, cy + sw * 0.9)
    ctx.lineTo(cx + sw * 0.85, cy + sw * 0.5)
    ctx.stroke()

    // Eye Sockets
    ctx.strokeRect(cx - sw * 0.55, cy, sw * 0.35, sw * 0.4)
    ctx.strokeRect(cx + sw * 0.2, cy, sw * 0.35, sw * 0.4)

    // Nose Cavity
    ctx.beginPath()
    ctx.moveTo(cx, cy + sw * 0.45)
    ctx.lineTo(cx - 20, cy + sw * 0.75)
    ctx.lineTo(cx + 20, cy + sw * 0.75)
    ctx.closePath()
    ctx.stroke()

    // Teeth grid
    for (let t = -3; t <= 3; t++) {
      ctx.strokeRect(cx + t * 16 - 7, cy + sw * 1.05, 14, 25)
    }
    ctx.restore()
  } else if (stage === 3) {
    // Stage 3: Breach Ring / Sweeping Cryptographic Dial
    ctx.save()
    const cx = width * 0.65
    const cy = height * 0.5
    ctx.strokeStyle = red

    // Concentric Dashed Radar / Cipher Rings
    for (let r = 80; r < 400; r += 45) {
      ctx.beginPath()
      ctx.setLineDash([12 + (r % 20), 8 + (r % 12)])
      ctx.lineWidth = 2 + (r % 4)
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Diagonal breach line cutting across the screen
    ctx.setLineDash([])
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, height * 0.85)
    ctx.lineTo(width, height * 0.15)
    ctx.stroke()

    // Glitch coordinates
    ctx.fillStyle = red
    ctx.font = "20px monospace"
    ctx.fillText("0x7F9A_EXPLOIT_PAYLOAD_DEPLOYED", cx - 220, cy - 20)
    ctx.fillText("STATUS: CRITICAL_OVERRIDE", cx - 180, cy + 30)
    ctx.restore()
  }

  return canvas.toDataURL("image/png")
}
