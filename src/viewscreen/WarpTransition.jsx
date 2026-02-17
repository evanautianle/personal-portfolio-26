import { useEffect, useRef } from 'react';

export function WarpTransition({ onEnd, duration = 1200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    const numStars = 220;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * (w * 0.5),
        o: 0.2 + Math.random() * 0.8
      });
    }
    let currentSpeed = 0.5;
    const warpSpeed = 10;
    const lerp = (a, b, t) => a + (b - a) * t;
    let start = null;
    function draw(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      // Animate speed up to warp
      currentSpeed = lerp(currentSpeed, warpSpeed, 0.04);
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      for (let i = 0; i < numStars; i++) {
        let star = stars[i];
        star.z -= currentSpeed;
        if (star.z <= 0) {
          star.x = Math.random() * w - w / 2;
          star.y = Math.random() * h - h / 2;
          star.z = w * 0.5;
        }
        const k = 260.0 / star.z;
        const sx = star.x * k;
        const sy = star.y * k;
        // Draw streaks for warp
        const px = star.x * (k + 0.16);
        const py = star.y * (k + 0.16);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,220,255,${star.o})`;
        ctx.lineWidth = 2.8;
        ctx.moveTo(sx, sy);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, star.o + 0.2)})`;
        ctx.fill();
      }
      ctx.restore();
      if (elapsed < duration) {
        animationId = requestAnimationFrame(draw);
      } else {
        if (onEnd) onEnd();
      }
    }
    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [onEnd, duration]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, #181828 0%, #10101a 70%, #000 100%)',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}
