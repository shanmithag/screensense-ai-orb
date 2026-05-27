const FEATURES = [
  { title: "Live Captions", desc: "Real-time speech-to-text overlay for any audio on screen.", icon: "captions", tone: "cyan" },
  { title: "Scene Explainer", desc: "Understand what's on screen — apps, videos, charts, code.", icon: "eye", tone: "violet" },
  { title: "Transcript Notes", desc: "Auto-structured notes from any meeting or call, in real time.", icon: "doc", tone: "blue" },
  { title: "AI Summarizer", desc: "Distill long sessions into crisp summaries and decisions.", icon: "spark", tone: "violet" },
  { title: "Face Analyzer", desc: "Detect emotion, attention and engagement during sessions.", icon: "face", tone: "cyan" },
  { title: "AI Fake Detector", desc: "Spot AI-generated imagery and synthetic media on the fly.", icon: "shield", tone: "blue" },
  { title: "Call Recording", desc: "One-tap capture for any call with searchable transcripts.", icon: "mic", tone: "violet" },
  { title: "Session Chat", desc: "Ask the orb about anything happening on your screen, now.", icon: "chat", tone: "cyan" },
] as const;

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-violet-300" /> Capabilities
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-white">A single orb.</span>{" "}
            <span className="text-gradient">An entire intelligence layer.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            ScreenSense unifies what used to take five different apps into one ambient assistant —
            quietly aware, ready when you summon it.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title, desc, icon, tone, index,
}: {
  title: string; desc: string; icon: string; tone: "cyan" | "violet" | "blue"; index: number;
}) {
  const ring =
    tone === "cyan" ? "from-cyan-400/30" : tone === "violet" ? "from-violet-400/30" : "from-blue-400/30";
  const iconColor =
    tone === "cyan" ? "text-cyan-300" : tone === "violet" ? "text-violet-300" : "text-blue-300";

  return (
    <div
      className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.07]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* hover glow */}
      <div className={`pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br ${ring} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`} />

      <div className={`relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 ${iconColor}`}>
        <FeatureIcon name={icon} />
      </div>
      <h3 className="relative mt-4 text-base font-semibold text-white">{title}</h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-white/60">{desc}</p>

      <div className="relative mt-5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/40 group-hover:text-white/70 transition">
        Learn more <span aria-hidden>→</span>
      </div>
    </div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const p = { className: "h-5 w-5", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "captions": return (<svg viewBox="0 0 24 24" {...p}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 13h4M13 13h4M7 16h2M11 16h6"/></svg>);
    case "eye":      return (<svg viewBox="0 0 24 24" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>);
    case "doc":      return (<svg viewBox="0 0 24 24" {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></svg>);
    case "spark":    return (<svg viewBox="0 0 24 24" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/><circle cx="12" cy="12" r="3"/></svg>);
    case "face":     return (<svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r=".8" fill="currentColor"/><circle cx="15" cy="10" r=".8" fill="currentColor"/><path d="M8.5 15c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/></svg>);
    case "shield":   return (<svg viewBox="0 0 24 24" {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>);
    case "mic":      return (<svg viewBox="0 0 24 24" {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>);
    case "chat":     return (<svg viewBox="0 0 24 24" {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>);
    default: return null;
  }
}
