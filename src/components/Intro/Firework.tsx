import { useEffect, useRef } from "react";

const PAPER_COLORS = [
  '#f87171',   // 빨강
  '#34d399',   // 청록
  '#60a5fa',   // 파랑
  '#facc15',   // 노랑
  '#a78bfa',   // 연보라
  '#fbbf24',   // 주황
  '#4ade80',   // 연초록
  '#a21caf',   // 진보라 (hsl → 헥사)
  '#fb7185'    // 연분홍
];

const PARTICLE_COUNT = 36;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

type Particle = {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  color: string;
  height: number;
  rotate: number;
  delay: number;
};

const Firework = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const g = 1300;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(() => {
      const fromLeft = Math.random() < 0.5;
      const x0 = fromLeft ? 50 : screenW - 50;
      const y0 = screenH - 30;
      const angle = randomBetween(Math.PI * 0.22, Math.PI * 0.38);
      const v = randomBetween(1000, 1600);
      const vx = Math.cos(angle) * v * (fromLeft ? 1 : -1);
      const vy = -Math.sin(angle) * v;
      const color = PAPER_COLORS[Math.floor(Math.random() * PAPER_COLORS.length)];
      const height = randomBetween(32, 50);
      const rotate = randomBetween(0, 360);
      const delay = randomBetween(0, 0.25);
      return { x0, y0, vx, vy, color, height, rotate, delay };
    });

    const target = ref.current;
    if (!target) return;
    target.innerHTML = "";
    particles.forEach((p, idx) => {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = `${p.x0}px`;
      el.style.top = `${p.y0}px`;
      el.style.width = `7px`;
      el.style.height = `${p.height}px`;
      el.style.borderRadius = `12px`;
      el.style.background = p.color;
      el.style.boxShadow = `0 0 6px ${p.color}99`;
      el.style.transform = `rotate(${p.rotate}deg)`;
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      el.style.transition = "opacity 0.2s linear";

      target.appendChild(el);

      setTimeout(() => {
        el.style.opacity = "1";
        const t0 = performance.now();
        const duration = 2 + Math.random() * 0.4;
        function animate(now: number) {
          const t = (now - t0) / 1000;
          if (t > duration) {
            el.style.opacity = "0";
            return;
          }
          el.style.left = `${p.x0 + p.vx * t}px`;
          el.style.top = `${p.y0 + p.vy * t + 0.5 * g * t * t}px`;
          el.style.transform = `rotate(${p.rotate + t * 80}) skewY(${Math.sin(t * 8 + idx) * 18}deg)`;
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }, p.delay * 1000);
    });

    return () => { target.innerHTML = ""; };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default Firework;