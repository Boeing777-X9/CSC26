import React, { useRef, useEffect } from 'react';

export default function AsciiSunset() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    // Config from JSON
    const config = {
      cellSize: 10,
      contrast: 1.15,
      tint: "#ff3b1f",
      tintOpacity: 0.32,
      bloomIntensity: 0.45,
      vignetteIntensity: 0.55,
      animSpeed: 1, // 100%
      animIntensity: 0.6 // 60%
    };

    let animationFrameId;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cachedPixelData = null;
    
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

    // Load source image or draw gradient fallback
    const sourceImg = new Image();
    sourceImg.crossOrigin = "anonymous";
    let imgLoaded = false;
    
    const drawSourceToOffscreen = () => {
      offCtx.clearRect(0, 0, width, height);
      if (imgLoaded) {
        // Draw image covering the canvas
        const imgRatio = sourceImg.width / sourceImg.height;
        const canvasRatio = width / height;
        let drawW = width;
        let drawH = height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (canvasRatio > imgRatio) {
          drawH = width / imgRatio;
          offsetY = (height - drawH) / 2;
        } else {
          drawW = height * imgRatio;
          offsetX = (width - drawW) / 2;
        }
        offCtx.drawImage(sourceImg, offsetX, offsetY, drawW, drawH);
      } else {
        // Gradient fallback
        const grad = offCtx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, "#0a0a0a"); // dark
        grad.addColorStop(0.4, "#2d0a00"); // dark red/brown
        grad.addColorStop(0.7, "#ff3b1f"); // sunset orange
        grad.addColorStop(1, "#ff8a33"); // light orange
        offCtx.fillStyle = grad;
        offCtx.fillRect(0, 0, width, height);
        
        // Sun
        offCtx.beginPath();
        offCtx.arc(width * 0.5, height * 0.7, height * 0.25, 0, Math.PI * 2);
        offCtx.fillStyle = "#ffffff";
        offCtx.fill();
      }
      
      // Cache pixel data to avoid getImageData per frame
      cachedPixelData = offCtx.getImageData(0, 0, width, height).data;
    };

    sourceImg.onload = () => {
      imgLoaded = true;
      if (width > 0) drawSourceToOffscreen();
    };
    sourceImg.onerror = () => {
      // Fallback to gradient
      console.warn("Could not load ref-046.webp, using gradient fallback");
    };
    // Attempting to fetch from 21st.dev
    sourceImg.src = "https://21st.dev/ascii-editor/demos/generated/ref-046.webp";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      offscreen.width = width;
      offscreen.height = height;
      cols = Math.ceil(width / config.cellSize);
      rows = Math.ceil(height / config.cellSize);
      
      drawSourceToOffscreen();
    };
    
    window.addEventListener('resize', resize);
    resize();

    const render = (time) => {
      // Background Mode: Solid
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      if (!cachedPixelData) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      const { cellSize, animSpeed, animIntensity } = config;
      const t = time * 0.001 * animSpeed;
      
      // Bloom effect applied to the dots via shadow
      ctx.shadowColor = config.tint;
      ctx.shadowBlur = config.bloomIntensity * 20;
      
      ctx.beginPath();
      
      // Pre-calculate contrast factor
      const c = config.contrast;
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = x * cellSize + cellSize / 2;
          const cy = y * cellSize + cellSize / 2;
          
          if (cx >= width || cy >= height) continue;
          
          const idx = (Math.floor(cy) * width + Math.floor(cx)) * 4;
          let r = cachedPixelData[idx];
          let g = cachedPixelData[idx + 1];
          let b = cachedPixelData[idx + 2];
          
          // Apply contrast
          r = Math.max(0, Math.min(255, ((r / 255 - 0.5) * c + 0.5) * 255));
          g = Math.max(0, Math.min(255, ((g / 255 - 0.5) * c + 0.5) * 255));
          b = Math.max(0, Math.min(255, ((b / 255 - 0.5) * c + 0.5) * 255));
          
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          
          // Animation: Pulse style
          // Distance from center determines phase
          const distanceToCenter = Math.hypot(cx - width/2, cy - height/2);
          const pulse = Math.sin(distanceToCenter * 0.01 - t * 3) * animIntensity;
          
          // Calculate dot radius based on luminance and pulse
          // In "dots" renderMode, radius scales by brightness
          let scale = Math.max(0.05, Math.min(1, luminance + pulse * 0.2));
          let radius = (cellSize / 2.2) * scale;
          
          // Draw the dot
          ctx.moveTo(cx + radius, cy);
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          
          // Optimization: fill all paths at once with a single color if we ignored original colors, 
          // but we need original colors. We have to fill per cell or group by color.
          // For simplicity, we'll fill per cell since Canvas2D can handle 10k fills if reasonably optimized,
          // but let's do it directly.
          ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
          ctx.fill();
          ctx.beginPath(); // Reset path for next dot
        }
      }
      
      // Reset shadow for overlays
      ctx.shadowBlur = 0;
      
      // Tint with overlay blend mode
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = config.tint;
      ctx.globalAlpha = config.tintOpacity;
      ctx.fillRect(0, 0, width, height);
      
      // Reset composite
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      
      // Vignette post-effect
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height) * 0.75);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, `rgba(0,0,0,${config.vignetteIntensity})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
