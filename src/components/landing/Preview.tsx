export function Preview() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <SectionEyebrow>The Interface</SectionEyebrow>
        <h2 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          <span className="text-white">An ambient layer over</span>{" "}
          <span className="text-gradient">everything you do</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          The orb sits quietly on your desktop and surfaces context as you work — captions, notes,
          summaries, scene awareness and productivity insights, all in one canvas.
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl">
        <div
          className="absolute inset-x-10 -top-10 h-40 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,.5), transparent 70%)" }}
        />
        {/* Browser/desktop frame */}
        <div className="relative overflow-hidden rounded-2xl glass p-3 glow-violet">
          <div className="flex items-center gap-2 px-2 pb-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
            <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/50 ring-1 ring-white/10">
              screensense://session/active
            </div>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10"
            style={{
              background:
                "linear-gradient(135deg, #0b1024 0%, #0F172A 50%, #0a0f24 100%)",
            }}
          >
            {/* faux scene */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div
              className="absolute -left-24 top-1/4 h-72 w-72 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,.7), transparent 70%)" }}
            />
            <div
              className="absolute right-0 bottom-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(6,182,212,.6), transparent 70%)" }}
            />

            {/* Caption overlay (bottom) */}
            <div className="absolute bottom-6 left-1/2 w-[78%] -translate-x-1/2 rounded-xl glass px-4 py-3 text-center">
              <p className="text-[13px] text-white/90 md:text-sm">
                <span className="text-cyan-300">▍</span> “…and that's exactly why real-time captions
                change how teams capture meetings.”
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                Live transcription · Whisper local
              </p>
            </div>

            {/* Floating orb (small) */}
            <div className="absolute left-6 top-6">
              <div className="relative h-14 w-14 animate-orb-float">
                <div className="absolute inset-0 rounded-full blur-xl"
                  style={{ background: "radial-gradient(circle, rgba(124,58,237,.9), transparent 70%)" }} />
                <div className="absolute inset-1 rounded-full"
                  style={{ background: "radial-gradient(circle at 35% 30%, #c4b5fd, #7C3AED 60%, #1e1b4b)" }} />
              </div>
            </div>

            {/* Transcript panel */}
            <div className="absolute right-4 top-4 w-[36%] rounded-xl glass p-3 text-left">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Meeting transcript</p>
              <div className="mt-2 space-y-1.5 text-[11px] text-white/75">
                <p><span className="text-violet-300">Maya:</span> Let's align on launch dates.</p>
                <p><span className="text-cyan-300">Jordan:</span> Week of June 8 works.</p>
                <p><span className="text-blue-300">Ari:</span> I'll prep the release notes.</p>
                <p className="text-white/40">…</p>
              </div>
            </div>

            {/* AI summary panel */}
            <div className="absolute left-4 bottom-28 w-[34%] rounded-xl glass p-3 text-left">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-cyan-300/90">
                <Sparkle /> AI Summary
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-white/80">
                Team agreed on a <span className="text-white">June 8</span> launch.
                3 action items captured. Sentiment: positive.
              </p>
              <div className="mt-2 flex gap-1.5">
                <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] text-violet-200 ring-1 ring-violet-400/30">action</span>
                <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] text-cyan-200 ring-1 ring-cyan-400/30">decision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
      <span className="h-1 w-1 rounded-full bg-cyan-300" />
      {children}
    </span>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z"/></svg>
  );
}
