import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import './AnimatedAnalyticsSection.css';

const numPoints = 200;
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

const sColumn = Array.from({ length: numPoints }, (_, i) => {
  const p = i / (numPoints - 1);
  const localP = (p * 12) % 1;
  const colIdx = Math.min(Math.floor(p * 12), 11);
  const heights = [0.2, 0.3, 0.25, 0.4, 0.3, 0.5, 0.45, 0.35, 0.6, 0.5, 0.4, 0.55];
  const ch = heights[colIdx] * H * 0.8;
  let y = H * 0.8;
  if (localP <= 0.2) y = H * 0.8 - ch * (localP / 0.2);
  else if (localP < 0.6) y = H * 0.8 - ch;
  else if (localP <= 0.8) y = H * 0.8 - ch * ((0.8 - localP) / 0.2);
  return { x: W * 0.1 + p * W * 0.8, y };
});

const mapNodes = [
  { x: W * 0.2, y: H * 0.35 },
  { x: W * 0.4, y: H * 0.5 },
  { x: W * 0.55, y: H * 0.25 },
  { x: W * 0.85, y: H * 0.3 },
  { x: W * 0.75, y: H * 0.6 },
];

const sMap = Array.from({ length: numPoints }, (_, i) => {
  const p = i / (numPoints - 1);
  const segments = mapNodes.length - 1;
  const segment = Math.min(Math.floor(p * segments), segments - 1);
  const segmentT = p * segments - segment;
  const p1 = mapNodes[segment];
  const p2 = mapNodes[segment + 1];
  return { x: p1.x + (p2.x - p1.x) * segmentT, y: p1.y + (p2.y - p1.y) * segmentT };
});

const sPie = Array.from({ length: numPoints }, (_, i) => {
  const angle = (i / (numPoints - 1)) * 2 * Math.PI - Math.PI / 2;
  const r = H * 0.25;
  return { x: CX + Math.cos(angle) * r, y: CY + Math.sin(angle) * r };
});

// --- Pre-generate particles (deterministic) ---
const PARTICLES = Array.from({ length: 40 }, (_, i) => {
  const seed = i * 1234567;
  const angle = ((seed * 9301 + 49297) % 233280) / 233280 * 2 * Math.PI;
  const speed = 80 + ((seed * 1234 + 5678) % 233280) / 233280 * 220;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+*#&';
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

function ptsToPath(pts) {
  return `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)} ` +
    pts.slice(1).map(p => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

// --- Canvas-based renderer to avoid all hooks-in-loops issues ---
function DataCanvas({ progress }) {
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
      let fillOpacity = 0;

      if (t < 0.15) { pts = morphLeftToRight(sCenter, sFlat, t / 0.15); lineOpacity = 0; }
      else if (t < 0.20) { pts = sFlat; lineOpacity = ((t - 0.15) / 0.05); }
      else if (t < 0.28) { pts = morphLeftToRight(sFlat, sLine, (t - 0.20) / 0.08); }
      else if (t < 0.36) { pts = morphLeftToRight(sLine, sBar, (t - 0.28) / 0.08); }
      else if (t < 0.44) { pts = morphLeftToRight(sBar, sLine, (t - 0.36) / 0.08); fillOpacity = Math.sin(((t - 0.36) / 0.08) * Math.PI) * 0.3; }
      else if (t < 0.52) { pts = morphLeftToRight(sLine, sColumn, (t - 0.44) / 0.08); }
      else if (t < 0.62) { pts = morphLeftToRight(sColumn, sMap, (t - 0.52) / 0.1); }
      else if (t < 0.70) { pts = morphLeftToRight(sMap, sPie, (t - 0.62) / 0.08); }
      else if (t < 0.80) { pts = sPie; }
      else if (t < 0.90) { pts = morphLeftToRight(sPie, sCenter, (t - 0.80) / 0.1); lineOpacity = 1 - ((t - 0.87) / 0.03); }
      else { pts = sCenter; lineOpacity = 0; }

      lineOpacity = Math.max(0, Math.min(1, lineOpacity));

      if (lineOpacity > 0 && pts) {
        // Glow layer
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(2, 132, 199, ${lineOpacity * 0.15})`;
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.strokeStyle = `rgba(2, 132, 199, ${lineOpacity * 0.3})`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Area fill
        if (fillOpacity > 0) {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[pts.length - 1].x, H * 0.9);
          ctx.lineTo(pts[0].x, H * 0.9);
          ctx.closePath();
          const grad = ctx.createLinearGradient(0, 0, 0, H);
          grad.addColorStop(0, `rgba(2, 132, 199, ${fillOpacity})`);
          grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Main line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(2, 132, 199, ${lineOpacity})`;
        ctx.lineWidth = 3.5;
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Map nodes
        if (t > 0.50 && t < 0.68) {
          const alpha = Math.sin(((t - 0.50) / 0.18) * Math.PI);
          mapNodes.forEach((n) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(15, 23, 42, ${alpha})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(79, 70, 229, ${alpha * 0.8})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 14 * alpha, 0, 2 * Math.PI);
            ctx.stroke();
          });
        }

        // Pie arcs
        if (t > 0.67 && t < 0.83) {
          const pieAlpha = Math.sin(((t - 0.67) / 0.16) * Math.PI);
          const intro = Math.min(1, (t - 0.67) / 0.1);
          const sweep1 = 2 * Math.PI * 0.4 * (1 - Math.pow(1 - intro, 3));
          const sweep2 = 2 * Math.PI * 0.25 * (1 - Math.pow(1 - intro, 3));
          ctx.lineWidth = 28;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79, 70, 229, ${pieAlpha})`;
          ctx.arc(CX, CY, H * 0.25, -Math.PI / 2, -Math.PI / 2 + sweep1);
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = `rgba(15, 23, 42, ${pieAlpha * 0.7})`;
          ctx.arc(CX, CY, H * 0.25, -Math.PI / 2 + sweep1 + 0.15, -Math.PI / 2 + sweep1 + 0.15 + sweep2);
          ctx.stroke();
          ctx.lineCap = 'butt';
        }
      }

      // Particles explosion
      if (t > 0.08 && t < 0.20) {
        const expT = (t - 0.08) / 0.12;
        const opacity = Math.max(0, 1 - expT * expT);
        const easeOut = 1 - Math.pow(1 - expT, 3);
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        PARTICLES.forEach((p) => {
          const d = p.speed * easeOut;
          const px = CX + Math.cos(p.angle) * d;
          const py = CY + Math.sin(p.angle) * d;
          ctx.fillStyle = `rgba(2, 132, 199, ${opacity * 0.8})`;
          ctx.fillText(p.char, px, py);
        });
      }

      // MOOR logo
      if (t < 0.14) {
        let opacity = 1;
        let shakeX = 0;
        if (t < 0.03) opacity = t / 0.03;
        else if (t > 0.08) { opacity = 1 - ((t - 0.08) / 0.06); shakeX = (Math.random() - 0.5) * 10; }
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
        ctx.font = `500 ${W * 0.043}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Turning data into direction,', CX, CY - W * 0.025 + yOff);
        ctx.fillText('and insight into impact.', CX, CY + W * 0.025 + yOff);
      }
    });

    return unsubscribe;
  }, [progress]);

  return <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

const AnimatedAnalyticsSection = () => {
  const progress = useMotionValue(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });
  const controlsRef = useRef(null);

  useEffect(() => {
    controlsRef.current = animate(progress, 1, {
      duration: 15,
      ease: 'linear',
      repeat: Infinity,
    });
    
    // Initialize state
    if (!isInView) {
      controlsRef.current.pause();
    }
    
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="s-dashboard-wrapper">
        <DataCanvas progress={progress} />
      </div>
    </motion.div>
  );
};

export default AnimatedAnalyticsSection;
