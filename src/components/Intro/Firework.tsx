import { useEffect, useRef } from "react";

const PAPER_COLORS = [
  "#f87171", "#34d399", "#60a5fa", "#facc15", "#a78bfa",
  "#fbbf24", "#4ade80", "#a21caf", "#fb7185"
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

  const launch = () => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const g = 1300;

    const isMobile = screenW <= 768;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map(() => {
      const fromLeft = isMobile ? null : Math.random() < 0.5;

      const x0 = isMobile
        ? screenW / 2 + randomBetween(-30, 30)
        : fromLeft
          ? 50
          : screenW - 50;

      const y0 = screenH - 30;

      const angle = isMobile
        ? randomBetween(Math.PI * 0.25, Math.PI * 0.75)
        : randomBetween(Math.PI * 0.22, Math.PI * 0.38);

      const v = randomBetween(1000, 1600);
      const vx = Math.cos(angle) * v * (isMobile ? 1 : fromLeft ? 1 : -1);
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
  };

  useEffect(() => {
    launch();
    window.addEventListener("resize", launch);
    window.addEventListener("orientationchange", launch);

    const el = ref.current;

    return () => {
      window.removeEventListener("resize", launch);
      window.removeEventListener("orientationchange", launch);
      if (el) el.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-50 pointer-events-none w-screen h-screen"
      style={{
        overflow: "hidden",
        touchAction: "none",
      }}
    />
  );
};

export default Firework;