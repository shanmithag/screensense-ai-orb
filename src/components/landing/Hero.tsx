import { Orb } from "./Orb";

export function Hero({ version }: { version: string | null }) {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center px-6 pt-32 pb-16">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
              <span className="h-1.5 w-1.5 animate-orb-pulse rounded-full bg-cyan-300" />
              {version ? `Latest ${version}` : "Latest release"}
            </span>
            <span className="rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-300/90">
              Completely Free
            </span>
            <span className="rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70">
              MIT licensed
            </span>
          </div>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-gradient">Your AI Assistant</span>
            <br />
            <span className="text-white/95">For Everything On Screen</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base text-white/65 md:text-lg">
            Live captions. Smart notes. Scene understanding. AI summaries.{" "}
            <span className="text-white">One floating orb.</span>
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white glow-violet transition-transform hover:scale-[1.03]"
            >
              <WindowsIcon className="h-4 w-4" />
              Download for Windows
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
            >
              View Features
              <span aria-hidden>→</span>
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-left">
            {[
              { k: "9+", v: "AI features" },
              { k: "100%", v: "Local option" },
              { k: "0$", v: "Forever free" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl px-3 py-2.5">
                <dt className="text-lg font-semibold text-white">{s.k}</dt>
                <dd className="text-[11px] uppercase tracking-wider text-white/55">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          {/* halo behind orb */}
          <div
            className="absolute h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,.55), transparent 60%)" }}
          />
          <Orb size={420} />
          {/* floating chips */}
          <FloatingChip className="left-2 top-12" delay="0s" tone="cyan">
            Live Captions
          </FloatingChip>
          <FloatingChip className="right-0 top-32" delay="-1.5s" tone="violet">
            Scene Detected
          </FloatingChip>
          <FloatingChip className="left-6 bottom-20" delay="-3s" tone="blue">
            Smart Notes
          </FloatingChip>
          <FloatingChip className="right-6 bottom-8" delay="-4.2s" tone="cyan">
            Summary Ready
          </FloatingChip>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  children, className = "", delay = "0s", tone,
}: { children: React.ReactNode; className?: string; delay?: string; tone: "cyan" | "violet" | "blue" }) {
  const toneCls =
    tone === "cyan"
      ? "text-cyan-200 ring-cyan-400/30"
      : tone === "violet"
      ? "text-violet-200 ring-violet-400/30"
      : "text-blue-200 ring-blue-400/30";
  const dot = tone === "cyan" ? "bg-cyan-300" : tone === "violet" ? "bg-violet-300" : "bg-blue-300";
  return (
    <div
      className={`absolute hidden md:flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-medium ring-1 animate-orb-float ${toneCls} ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </div>
  );
}

function WindowsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 11 4v7.5H3V5.5Zm0 13L11 20v-7.5H3v6Zm9 1.5 9 1.5v-9h-9V20Zm0-16v8h9V3l-9 1Z" />
    </svg>
  );
}
