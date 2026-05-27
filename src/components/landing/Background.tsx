export function Background() {
  // Deterministic particle positions to avoid SSR/CSR hydration mismatch
  const particles = Array.from({ length: 36 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const x = (seed / 233280) * 100;
    const y = ((i * 7919) % 100);
    const size = 1 + ((i * 13) % 3);
    const delay = (i * 0.37) % 8;
    const dur = 8 + ((i * 3) % 10);
    return { x, y, size, delay, dur };
  });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0" style={{ background: "#050816" }} />

      {/* ambient gradients */}
      <div
        className="absolute -top-40 -left-40 h-[640px] w-[640px] rounded-full opacity-50 blur-3xl animate-drift"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,58,237,0.55), transparent 60%)",
        }}
      />
      <div
        className="absolute top-[20%] -right-40 h-[560px] w-[560px] rounded-full opacity-40 blur-3xl animate-drift"
        style={{
          animationDelay: "-5s",
          background:
            "radial-gradient(circle at center, rgba(6,182,212,0.45), transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-[-200px] left-[20%] h-[680px] w-[680px] rounded-full opacity-35 blur-3xl animate-drift"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.5), transparent 60%)",
        }}
      />

      {/* grid */}
      <div className="absolute inset-0 bg-grid mask-radial-fade opacity-60" />

      {/* neural network SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="nn" x1="0" x2="1">
            <stop offset="0" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        {[
          [80, 120, 320, 220], [320, 220, 600, 140], [600, 140, 880, 260],
          [880, 260, 1120, 180], [80, 520, 360, 460], [360, 460, 640, 580],
          [640, 580, 920, 500], [920, 500, 1140, 620], [320, 220, 360, 460],
          [600, 140, 640, 580], [880, 260, 920, 500], [200, 700, 500, 660],
          [500, 660, 800, 740], [800, 740, 1100, 700],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#nn)"
            strokeWidth="1"
          />
        ))}
        {[
          [80,120],[320,220],[600,140],[880,260],[1120,180],
          [80,520],[360,460],[640,580],[920,500],[1140,620],
          [200,700],[500,660],[800,740],[1100,700],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#a5b4fc">
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/70 animate-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
            boxShadow: "0 0 8px rgba(165,180,252,.8)",
            opacity: 0.6,
          }}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,22,0.7) 100%)",
      }} />
    </div>
  );
}
