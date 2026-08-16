import { useState, useEffect } from "react";

const FRAME_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAtKmLywA3UpZMc3TAL5YaPQJ4GrIIfzlP_gcT6KIxHUd7LByyNt1PTQS72Hcxm5e4U8efB0tCiUy8x4y4D98V562fxxk091h4XG0l73Esit7-pWLHq6P4WxVlEZVahrE-s4cxAEywQ7R-v--s4LAMgn52Iapuy7NumvhakSEgCLEZJlxtFdkgVgdcACoSWovQv4hT3ynELyfP5nx4hjupTMMu3RdSwWTd1H0tH3y-gXz35-hj_p3EANyX_4f8tVPdbHrs";

const LABELS = ["DÍAS", "HORAS", "MINUTOS", "SEGUNDOS"];

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

  const values = [
    timeLeft.days || 0,
    timeLeft.hours || 0,
    timeLeft.minutes || 0,
    timeLeft.seconds || 0,
  ];

  return (
    <div className="countdown-grid">
      {values.map((val, i) => (
        <div key={LABELS[i]} className="countdown-item">
          <div
            className="countdown-frame"
            style={{
              backgroundColor: "#F1DDCF",
              WebkitMaskImage: `url(${FRAME_URL})`,
              maskImage: `url(${FRAME_URL})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
          <span className="countdown-number">{String(val).padStart(2, "0")}</span>
          <span className="countdown-label">{LABELS[i]}</span>
        </div>
      ))}
    </div>
  );
}
