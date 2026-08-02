import { useEffect, useRef } from "react";

const BUTTERFLY_COUNT = 12;

function ButterflySVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      <path d="M20 22c-1.5 0-3-0.5-4.2-1.5C13.5 18.5 10 16 10 12c0-3 2-5 5-5 2 0 3.5 1 5 2.5C16.5 10 18 11 20 11s3.5-1 5-2.5C26.5 7 28 6 30 6c3 0 5 2 5 5 0 4-3.5 6.5-5.8 8.5C23 21.5 21.5 22 20 22z" opacity="0.9" />
      <path d="M20 22c-1.5 0-3-0.5-4.2-1.5C13.5 18.5 10 16 10 12c0-3 2-5 5-5 2 0 3.5 1 5 2.5C16.5 10 18 11 20 11s3.5-1 5-2.5C26.5 7 28 6 30 6c3 0 5 2 5 5 0 4-3.5 6.5-5.8 8.5C23 21.5 21.5 22 20 22z" transform="scale(-1, 1) translate(-40, 0)" opacity="0.9" />
      <ellipse cx="20" cy="22" rx="2" ry="4" opacity="0.6" />
    </svg>
  );
}

export default function Background({ entered }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!entered) return;
    const container = containerRef.current;
    if (!container) return;

    const butterflies = [];
    for (let i = 0; i < BUTTERFLY_COUNT; i++) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.pointerEvents = "none";
      el.style.willChange = "transform";
      el.style.opacity = "0";

      const size = 14 + Math.random() * 16;
      const colors = ["#87d7ac", "#e9c176", "#ffffff", "#a6d0b9"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="${color}" style="filter:drop-shadow(0 0 6px ${color})"><path d="M20 22c-1.5 0-3-0.5-4.2-1.5C13.5 18.5 10 16 10 12c0-3 2-5 5-5 2 0 3.5 1 5 2.5C16.5 10 18 11 20 11s3.5-1 5-2.5C26.5 7 28 6 30 6c3 0 5 2 5 5 0 4-3.5 6.5-5.8 8.5C23 21.5 21.5 22 20 22z" opacity="0.9"/><path d="M20 22c-1.5 0-3-0.5-4.2-1.5C13.5 18.5 10 16 10 12c0-3 2-5 5-5 2 0 3.5 1 5 2.5C16.5 10 18 11 20 11s3.5-1 5-2.5C26.5 7 28 6 30 6c3 0 5 2 5 5 0 4-3.5 6.5-5.8 8.5C23 21.5 21.5 22 20 22z" transform="scale(-1, 1) translate(-40, 0)" opacity="0.9"/><ellipse cx="20" cy="22" rx="2" ry="4" opacity="0.6"/></svg>`;

      el.style.left = `${Math.random() * 90 + 5}%`;
      el.style.top = `${Math.random() * 90 + 5}%`;
      el.style.animationDelay = `${Math.random() * 8}s`;
      el.style.animationDuration = `${12 + Math.random() * 8}s`;

      const keyframes = [
        { transform: "translate(0, 0) rotate(0deg) scale(0.6)", opacity: 0 },
        { transform: "translate(30px, -20px) rotate(8deg) scale(1)", opacity: 1, offset: 0.1 },
        { transform: "translate(80px, 30px) rotate(-5deg) scale(0.9)", opacity: 1, offset: 0.4 },
        { transform: "translate(130px, -40px) rotate(12deg) scale(0.7)", opacity: 0.8, offset: 0.7 },
        { transform: "translate(180px, 10px) rotate(20deg) scale(0.5)", opacity: 0 },
      ];

      el.animate(keyframes, {
        duration: (12 + Math.random() * 8) * 1000,
        delay: Math.random() * 8 * 1000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      });

      container.appendChild(el);
      butterflies.push(el);
    }

    return () => {
      butterflies.forEach((b) => {
        b.getAnimations().forEach((a) => a.cancel());
        b.remove();
      });
    };
  }, [entered]);

  return (
    <div
      ref={containerRef}
      className="background-butterflies"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
