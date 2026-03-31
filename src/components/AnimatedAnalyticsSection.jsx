import { useEffect, useRef, memo } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import './AnimatedAnalyticsSection.css';

// Reduced from 200 to 100 points for better performance
const numPoints = 100;
const W = 800;
const H = 400;
const CX = W / 2;
const CY = H / 2;

// --- Precomputed point states ---
const sCenter = Array.from({ length: numPoints }, () => ({ x: CX, y: CY }));

const sFlat = Array.from({ length: numPoints }, (_, i) => ({
  x: W * 0.1 + (i / (numPoints - 1)) * W * 0.8,
  y: H * 0.8,
}));

const sLine = Array.from({ length: numPoints }, (_, i) => {
  const p = i / (numPoints - 1);
  return {
    x: W * 0.1 + p * W * 0.8,
    y: H * 0.8 - (Math.sin(p * Math.PI * 3) * H * 0.15 + p * H * 0.4),
  };
});

const sBar = Array.from({ length: numPoints }, (_, i) => {
  const p = i / (numPoints - 1);
  const localP = (p * 4) % 1;
  const barIdx = Math.min(Math.floor(p * 4), 3);
  const heights = [0.35, 0.55, 0.25, 0.45];
  const bh = heights[barIdx] * H;
  let y = H * 0.8;
  if (localP <= 0.15) y = H * 0.8 - bh * (localP / 0.15);
  else if (localP < 0.35) y = H * 0.8 - bh;
  else if (localP <= 0.5) y = H * 0.8 - bh * ((0.5 - localP) / 0.15);
  return { x: W * 0.1 + p * W * 0.8, y };
});

const sPie = Array.from({ length: numPoints }, (_, i) => {
  const angle = (i / (numPoints - 1)) * 2 * Math.PI - Math.PI / 2;
  const r = H * 0.25;
  return { x: CX + Math.cos(angle) * r, y: CY + Math.sin(angle) * r };
});

// Reduced from 40 to 25 particles
const PARTICLES = Array.from({ length: 25 }, (_, i) => {
  const seed = i * 1234567;
  const angle = ((seed * 9301 + 49297) % 233280) / 233280 * 2 * Math.PI;
  const speed = 80 + ((seed * 1234 + 5678) % 233280) / 233280 * 220;
  const chars = '0123456789ABCDEF+*#';
  const char = chars[i % chars.length];
  return { angle, speed, char };
});

function morphLeftToRight(startPts, endPts, t) {
  if (t <= 0) return startPts;
  if (t >= 1) return endPts;
  return startPts.map((s, i) => {
    const delay = (i / (numPoints - 1)) * 0.6;
    const pt = Math.max(0, Math.min(1, (t - delay) / 0.4));
    const easeT = pt < 0.5 ? 4 * pt * pt * pt : 1 - Math.pow(-2 * pt + 2, 3) / 2;
    return { x: s.x + (endPts[i].x - s.x) * easeT, y: s.y + (endPts[i].y - s.y) * easeT };
  });
}

// Canvas-based renderer
const DataCanvas = memo(({ progress }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const unsubscribe = progress.on('change', (t) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // --- Determine line state ---
      let pts;
      let lineOpacity = 1;

      if (t < 0.15) { pts = morphLeftToRight(sCenter, sFlat, t / 0.15); lineOpacity = 0; }
      else if (t < 0.20) { pts = sFlat; lineOpacity = ((t - 0.15) / 0.05); }
      else if (t < 0.35) { pts = morphLeftToRight(sFlat, sLine, (t - 0.20) / 0.15); }
      else if (t < 0.50) { pts = morphLeftToRight(sLine, sBar, (t - 0.35) / 0.15); }
      else if (t < 0.65) { pts = morphLeftToRight(sBar, sPie, (t - 0.50) / 0.15); }
      else if (t < 0.80) { pts = sPie; }
      else if (t < 0.90) { pts = morphLeftToRight(sPie, sCenter, (t - 0.80) / 0.1); lineOpacity = 1 - ((t - 0.87) / 0.03); }
      else { pts = sCenter; lineOpacity = 0; }

      lineOpacity = Math.max(0, Math.min(1, lineOpacity));

      if (lineOpacity > 0 && pts) {
        // Simplified rendering - removed glow for performance
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(2, 132, 199, ${lineOpacity})`;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Pie arcs (simplified)
        if (t > 0.67 && t < 0.83) {
          const pieAlpha = Math.sin(((t - 0.67) / 0.16) * Math.PI);
          ctx.lineWidth = 24;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79, 70, 229, ${pieAlpha})`;
          ctx.arc(CX, CY, H * 0.25, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          ctx.lineCap = 'butt';
        }
      }

      // Particles explosion (simplified)
      if (t > 0.08 && t < 0.20) {
        const expT = (t - 0.08) / 0.12;
        const opacity = Math.max(0, 1 - expT * expT);
        const easeOut = 1 - Math.pow(1 - expT, 3);
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        PARTICLES.forEach((p) => {
          const d = p.speed * easeOut;
          const px = CX + Math.cos(p.angle) * d;
          const py = CY + Math.sin(p.angle) * d;
          ctx.fillStyle = `rgba(2, 132, 199, ${opacity * 0.7})`;
          ctx.fillText(p.char, px, py);
        });
      }

      // MOOR logo
      if (t < 0.14) {
        let opacity = 1;
        let shakeX = 0;
        if (t < 0.03) opacity = t / 0.03;
        else if (t > 0.08) { opacity = 1 - ((t - 0.08) / 0.06); shakeX = (Math.random() - 0.5) * 8; }
        ctx.fillStyle = `rgba(2, 132, 199, ${Math.max(0, opacity)})`;
        ctx.font = `bold ${W * 0.09}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('MOOR', CX + shakeX, CY);
      }

      // Final quote
      if (t > 0.82) {
        const qT = (t - 0.82) / 0.18;
        let opacity = 1;
        const yOff = qT < 0.2 ? 20 * (1 - qT / 0.2) : qT > 0.9 ? 20 * ((qT - 0.9) / 0.1) : 0;
        if (qT < 0.2) opacity = qT / 0.2;
        else if (qT > 0.9) opacity = 1 - ((qT - 0.9) / 0.1);
        ctx.fillStyle = `rgba(15, 23, 42, ${Math.max(0, opacity)})`;
        ctx.font = `500 ${W * 0.04}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Turning data into direction,', CX, CY - W * 0.025 + yOff);
        ctx.fillText('and insight into impact.', CX, CY + W * 0.025 + yOff);
      }
    });

    return unsubscribe;
  }, [progress]);

  return <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', height: '100%', display: 'block' }} />;
});

DataCanvas.displayName = 'DataCanvas';

const AnimatedAnalyticsSection = () => {
  const progress = useMotionValue(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '100px 0px' });
  const controlsRef = useRef(null);

  useEffect(() => {
    // Reduced from 15s to 10s for faster completion
    controlsRef.current = animate(progress, 1, {
      duration: 10,
      ease: 'linear',
      repeat: Infinity,
    });

    // Start paused
    controlsRef.current.pause();

    return () => {
      if (controlsRef.current) controlsRef.current.stop();
    };
  }, [progress]);

  useEffect(() => {
    if (controlsRef.current) {
      if (isInView) {
        controlsRef.current.play();
      } else {
        controlsRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className="s-dashboard-container container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="s-dashboard-wrapper">
        <DataCanvas progress={progress} />
      </div>
    </motion.div>
  );
};

export default memo(AnimatedAnalyticsSection);
