import { useEffect, useRef } from "react";

const BF_COUNT = 20;
const BF_COLORS = ["#e9c176", "#87d7ac", "#ffffff"];

export default function Butterflies({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const butterflies = [];

    for (let i = 0; i < BF_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "butterfly";
      const size = 15 + Math.random() * 25;
      const color = BF_COLORS[Math.floor(Math.random() * BF_COLORS.length)];

      el.innerHTML = `
        <svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="${color}" style="filter:drop-shadow(0 0 8px ${color})">
          <path d="M50 40 C30 10, 10 20, 10 50 C10 80, 40 90, 50 60 C60 90, 90 80, 90 50 C90 20, 70 10, 50 40" />
          <circle cx="50" cy="50" r="4" fill="#000" />
        </svg>
      `;

      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `${Math.random() * 100}vh`;
      el.style.opacity = (Math.random() * 0.4 + 0.2).toString();
      el.style.animationDelay = `${Math.random() * 15}s`;
      el.style.animationDuration = `${15 + Math.random() * 10}s`;

      container.appendChild(el);
      butterflies.push(el);
    }

    return () => {
      butterflies.forEach((b) => {
        b.getAnimations().forEach((a) => a.cancel());
        b.remove();
      });
    };
  }, [active]);

  return <div ref={containerRef} className="butterflies-container" />;
}
