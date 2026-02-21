import { useEffect, useRef } from 'react';

export function CruiseStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const numStars = 220;
    let stars = [];
    function initStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * w - w / 2,
          y: Math.random() * h - h / 2,
          z: Math.random() * (w * 0.5),
          o: 0.2 + Math.random() * 0.8
        });
      }
    }
    let currentSpeed = 0.5;
    function draw() {
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
        ctx.beginPath();
        ctx.arc(sx, sy, 2.8, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(200,220,255,${star.o})`;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
      animationId = requestAnimationFrame(draw);
    }
    initStars();
    draw();
    function handleResize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      initStars();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
