interface OrbProps {
  size?: number;
}

export function Orb({ size = 360 }: OrbProps) {
  return (
    <div
      className="relative animate-orb-float"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl animate-orb-pulse"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.7), rgba(59,130,246,0.4) 45%, transparent 70%)",
        }}
      />
      {/* secondary glow */}
      <div
        className="absolute inset-6 rounded-full blur-2xl animate-orb-pulse"
        style={{
          animationDelay: "-1.2s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.6), transparent 60%)",
        }}
      />

      {/* rotating ring 1 */}
      <div className="absolute inset-0 animate-orb-spin">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <linearGradient id="r1" x1="0" x2="1">
              <stop offset="0" stopColor="#7C3AED" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" stroke="url(#r1)" strokeWidth="1.2" fill="none" strokeDasharray="4 9" />
          <circle cx="100" cy="100" r="92" stroke="url(#r1)" strokeWidth="0.6" fill="none" />
        </svg>
      </div>
      {/* rotating ring 2 */}
      <div className="absolute inset-6 animate-orb-spin-reverse">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <linearGradient id="r2" x1="0" x2="1">
              <stop offset="0" stopColor="#06B6D4" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" stroke="url(#r2)" strokeWidth="0.8" fill="none" strokeDasharray="2 6" />
        </svg>
      </div>

      {/* the orb sphere */}
      <div
        className="absolute inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #c4b5fd 0%, #7C3AED 30%, #1e1b4b 70%, #050816 100%)",
          boxShadow:
            "inset 0 0 60px rgba(255,255,255,0.15), inset 0 -20px 60px rgba(6,182,212,0.5), 0 0 80px rgba(124,58,237,0.6), 0 0 160px rgba(59,130,246,0.4)",
        }}
      >
        {/* highlight */}
        <div
          className="absolute top-[10%] left-[18%] h-[28%] w-[40%] rounded-full blur-md"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85), transparent 70%)" }}
        />
        {/* inner core pulse */}
        <div
          className="absolute inset-[30%] rounded-full animate-orb-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9), rgba(165,180,252,0.7) 40%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* orbiting dots */}
      <div className="absolute inset-0 animate-orb-spin">
        <span
          className="absolute h-2 w-2 rounded-full bg-cyan-300"
          style={{ top: 4, left: "50%", boxShadow: "0 0 12px #06B6D4" }}
        />
      </div>
      <div className="absolute inset-0 animate-orb-spin-reverse">
        <span
          className="absolute h-1.5 w-1.5 rounded-full bg-violet-300"
          style={{ bottom: 8, left: "30%", boxShadow: "0 0 10px #7C3AED" }}
        />
      </div>
    </div>
  );
}
