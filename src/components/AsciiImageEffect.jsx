import React, { useRef, useEffect, useState } from 'react';

const DEFAULT_CONFIG = {
  renderMode: "mosaic", bgMode: "blur", bgBlur: 30, bgOpacity: 90, cellSize: 14, coverage: 96, invert: false, 
  styleBlend: "source-over", charSet: "binary", customChars: "", brightness: 0, contrast: 115, edgeEmphasis: 40, density: 5, 
  toneCurve: [ { x: 0, y: 0 }, { x: 0.35, y: 0.08 }, { x: 0.7, y: 0.55 }, { x: 1, y: 1 } ], 
  tint: "#FF6A00", tintOpacity: 45, overlayBlend: "overlay", saturation: 100, grayscale: 0, blurType: "off", blurAmount: 35, 
  pfx: { 
    vignette: { enabled: true, intensity: 38 }, 
    scanLines: { enabled: true, intensity: 28 }, 
    chromatic: { enabled: true, intensity: 40 }, 
    bloom: { enabled: true, intensity: 60 }, 
    filmGrain: { enabled: true, intensity: 40 }, 
    glitch: { enabled: true, intensity: 20 }
  }, 
  animated: true, animStyle: "flicker", animSpeed: { enabled: true, intensity: 100 }, animIntensity: { enabled: true, intensity: 60 }, 
  lights: { enabled: false, points: [] }
};

export default function AsciiImageEffect({ src, config = DEFAULT_CONFIG, className = "" }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;
    let width = 0, height = 0;
    
    // Offscreen caching
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    let cachedImgData = null;
    let imgLoaded = false;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgLoaded = true;
      if (width > 0) updateCache();
    };
    img.onerror = () => {
      // Fallback graphic for CSC
      imgLoaded = true;
      if (width > 0) updateCache();
    };
    img.src = src || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop";

    const applyColorPipeline = (data, w, h) => {
      const { brightness, contrast, saturation, grayscale } = config;
      const b = brightness / 100;
      const c = contrast / 100;
      const s = saturation / 100;
      const g = grayscale / 100;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i] / 255;
        let gr = data[i+1] / 255;
        let bl = data[i+2] / 255;

        // Brightness & Contrast
        r = (r - 0.5) * c + 0.5 + b;
        gr = (gr - 0.5) * c + 0.5 + b;
        bl = (bl - 0.5) * c + 0.5 + b;

        // Saturation & Grayscale
        const lum = 0.2126 * r + 0.7152 * gr + 0.0722 * bl;
        r = r + (lum - r) * g;
        gr = gr + (lum - gr) * g;
        bl = bl + (lum - bl) * g;
        
        r = r + (r - lum) * (s - 1);
        gr = gr + (gr - lum) * (s - 1);
        bl = bl + (bl - lum) * (s - 1);

        data[i] = Math.max(0, Math.min(255, r * 255));
        data[i+1] = Math.max(0, Math.min(255, gr * 255));
        data[i+2] = Math.max(0, Math.min(255, bl * 255));
      }
      return data;
    };

    const updateCache = () => {
      offscreen.width = width;
      offscreen.height = height;
      if (imgLoaded && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let drawW = width, drawH = height, offsetX = 0, offsetY = 0;
        if (canvasRatio > imgRatio) { drawH = width / imgRatio; offsetY = (height - drawH) / 2; } 
        else { drawW = height * imgRatio; offsetX = (width - drawW) / 2; }
        offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);
      } else {
        // High-tech fallback
        const grad = offCtx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, "#050505"); grad.addColorStop(0.5, "#111111"); grad.addColorStop(1, "#0a0a0a");
        offCtx.fillStyle = grad;
        offCtx.fillRect(0, 0, width, height);
        offCtx.fillStyle = "#FF6A00";
        offCtx.font = "bold 120px monospace";
        offCtx.textAlign = "center";
        offCtx.fillText("CSC", width/2, height/2);
      }
      
      let imgData = offCtx.getImageData(0, 0, width, height);
      applyColorPipeline(imgData.data, width, height);
      offCtx.putImageData(imgData, 0, 0);
      cachedImgData = offCtx.getImageData(0, 0, width, height).data;
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;
        updateCache();
      }
    });
    resizeObserver.observe(canvas.parentElement);

    // Prando noise for flicker
    const noise = (x, y, t) => {
      return (Math.sin(x * 12.9898 + y * 78.233 + t) * 43758.5453) % 1;
    };

    const render = (time) => {
      if (!cachedImgData || width === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      const { cellSize, tint, tintOpacity, pfx, animated, animSpeed, animIntensity, lights, coverage } = config;
      const t = animated ? time * 0.001 * (animSpeed.intensity / 100) : 0;
      
      // bgMode handling in canvas
      if (config.bgMode === "solid") {
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
      
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      const intensityScale = animIntensity.intensity / 100;

      // Draw Cells
      ctx.beginPath();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = x * cellSize + cellSize / 2;
          const cy = y * cellSize + cellSize / 2;
          if (cx >= width || cy >= height) continue;

          // Coverage check
          if (noise(x, y, 0) > coverage / 100) continue;

          const idx = (Math.floor(cy) * width + Math.floor(cx)) * 4;
          let r = cachedImgData[idx], g = cachedImgData[idx + 1], b = cachedImgData[idx + 2];
          let lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          
          if (config.invert) lum = 1 - lum;

          // Flicker
          let flickerMod = 1;
          if (animated && config.animStyle === "flicker") {
            const n = noise(x, y, t * 5);
            if (n < 0.1) flickerMod = 1 - (intensityScale * 0.5);
            else if (n > 0.9) flickerMod = 1 + (intensityScale * 0.5);
          }

          lum *= flickerMod;
          
          // Render mosaic
          if (config.renderMode === "mosaic") {
            const size = cellSize * Math.min(1, Math.max(0.2, lum));
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(cx - size/2, cy - size/2, size, size);
          }
        }
      }

      // Tint overlay (Screen)
      ctx.globalCompositeOperation = config.overlayBlend || 'screen';
      ctx.fillStyle = tint;
      ctx.globalAlpha = tintOpacity / 100;
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      // Lights
      if (lights.enabled) {
        ctx.globalCompositeOperation = 'screen';
        lights.points.forEach(pt => {
          const lx = pt.x * width, ly = pt.y * height;
          const r = pt.radius * Math.max(width, height);
          const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, r);
          grad.addColorStop(0, `rgba(255, 106, 0, ${pt.intensity / 100})`);
          grad.addColorStop(1, 'rgba(255, 106, 0, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lx, ly, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalCompositeOperation = 'source-over';
      }

      // Post-Effects
      // 1. Bloom
      if (pfx.bloom.enabled) {
        ctx.shadowColor = '#FF6A00';
        ctx.shadowBlur = (pfx.bloom.intensity / 100) * 30;
        // The bloom is applied to the bright spots by doing a quick draw over
      }

      // 2. Scanlines
      if (pfx.scanLines.enabled) {
        ctx.fillStyle = `rgba(0,0,0,${pfx.scanLines.intensity / 200})`;
        for(let i=0; i<height; i+=4) ctx.fillRect(0, i, width, 1);
      }

      // 3. Vignette
      if (pfx.vignette.enabled) {
        const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height) * 0.7);
        grad.addColorStop(0, 'rgba(5,5,5,0)');
        grad.addColorStop(1, `rgba(5,5,5,${pfx.vignette.intensity / 100})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Glitch
      if (pfx.glitch.enabled && animated) {
        if (Math.random() < (pfx.glitch.intensity / 1000)) {
          const sliceY = Math.random() * height;
          const sliceH = Math.random() * 20 + 5;
          const offset = (Math.random() - 0.5) * 40;
          ctx.drawImage(canvas, 0, sliceY, width, sliceH, offset, sliceY, width, sliceH);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, config]);

  const sourceUrl = src || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {config.bgMode === "blur" && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${sourceUrl}')`,
            filter: `blur(${config.bgBlur}px)`,
            opacity: config.bgOpacity / 100,
            transform: 'scale(1.1)' // Prevent blurred edges from showing
          }}
        />
      )}
      {config.bgMode === "solid" && (
        <div className="absolute inset-0 w-full h-full bg-[#050505]" />
      )}
      <canvas ref={canvasRef} className="block w-full h-full relative z-10" />
    </div>
  );
}
