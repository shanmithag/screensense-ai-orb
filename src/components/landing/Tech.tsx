const ITEMS = [
  { title: "Desktop App", desc: "Native Windows binary. No browser tab, no cloud lock-in.", icon: "desk" },
  { title: "Local Whisper", desc: "Optional fully-local transcription. Your audio never leaves your machine.", icon: "wave" },
  { title: "Privacy-focused", desc: "Per-session controls. Disk-only storage. Open MIT source.", icon: "lock" },
  { title: "Fast AI", desc: "Groq inference and Gemini multimodal — responsive even mid-call.", icon: "bolt" },
];

export function Tech() {
  return (
    <section id="tech" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-cyan-300" /> Under the hood
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-white">Built for speed.</span>{" "}
            <span className="text-gradient">Designed for privacy.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div key={it.title} className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-cyan-300">
                <TechIcon name={it.icon} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechIcon({ name }: { name: string }) {
  const p = { className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "desk": return (<svg viewBox="0 0 24 24" {...p}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>);
    case "wave": return (<svg viewBox="0 0 24 24" {...p}><path d="M3 12h2l2-6 3 12 3-9 3 6 2-3h3"/></svg>);
    case "lock": return (<svg viewBox="0 0 24 24" {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>);
    case "bolt": return (<svg viewBox="0 0 24 24" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>);
    default: return null;
  }
}
