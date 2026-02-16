import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { heroSpeedAtom } from '../../state/heroSpeedAtom';

// Warp speed starfield animation

export function Hero() {
  const canvasRef = useRef(null);
  const speed = useAtomValue(heroSpeedAtom);

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

    // Animation speed state

    let currentSpeed = speed === 'warp' ? 10 : 0.5;
    const warpSpeed = 10;
    const cruiseSpeed = 0.5;
    const lerp = (a, b, t) => a + (b - a) * t;

    function draw() {
      // Smoothly interpolate currentSpeed toward target
      const targetSpeed = speed === 'warp' ? warpSpeed : cruiseSpeed;
      currentSpeed = lerp(currentSpeed, targetSpeed, 0.0025); // 0.025 = slower smoothness

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
        if (speed === 'warp' || currentSpeed > 2) {
          // Draw streaks for warp, with a slightly larger head
          const px = star.x * (k + 0.16);
          const py = star.y * (k + 0.16);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(200,220,255,${star.o})`;
          ctx.lineWidth = 2.8;
          ctx.moveTo(sx, sy);
          ctx.lineTo(px, py);
          ctx.stroke();
          // Draw a brighter head for the streak
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(255,255,255,${Math.min(1, star.o + 0.2)})`;
          ctx.fill();
        } else {
          // Draw as a larger point for cruise
          ctx.beginPath();
          ctx.arc(sx, sy, 2.8, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(200,220,255,${star.o})`;
          ctx.shadowColor = '#fff';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.restore();
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #181828 0%, #10101a 70%, #000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
      <div style={{
        position: 'relative',
        zIndex: 2,
        color: '#fff',
        fontSize: 96,
        fontWeight: 900,
        textShadow: '0 0 64px #00f8, 0 4px 0 #000a',
        letterSpacing: 4,
        textAlign: 'center',
        padding: 48,
        background: 'rgba(0,0,0,0.18)',
        borderRadius: 32,
      }}>
      </div>
    </div>
  );
}
