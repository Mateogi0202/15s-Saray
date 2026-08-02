import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const target = new Date("2026-09-26T19:30:00-05:00").getTime();

    const update = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="countdown-grid">
      <div className="crystal-panel countdown-item">
        <span className="countdown-number" id="days">{pad(timeLeft.days || 0)}</span>
        <span className="countdown-label">DÍAS</span>
      </div>
      <div className="crystal-panel countdown-item">
        <span className="countdown-number" id="hours">{pad(timeLeft.hours || 0)}</span>
        <span className="countdown-label">HORAS</span>
      </div>
      <div className="crystal-panel countdown-item">
        <span className="countdown-number" id="minutes">{pad(timeLeft.minutes || 0)}</span>
        <span className="countdown-label">MINUTOS</span>
      </div>
      <div className="crystal-panel countdown-item">
        <span className="countdown-number" id="seconds">{pad(timeLeft.seconds || 0)}</span>
        <span className="countdown-label">SEGUNDOS</span>
      </div>
    </div>
  );
}
