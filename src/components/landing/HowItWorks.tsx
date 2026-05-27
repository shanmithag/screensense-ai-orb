const STEPS = [
  {
    n: "01",
    title: "Download",
    desc: "Grab the latest Windows installer. No account. No setup wizard. Just one .exe.",
    tone: "violet" as const,
  },
  {
    n: "02",
    title: "Add free API keys",
    desc: "Paste in your Groq and Gemini keys. Both have generous free tiers — no credit card.",
    tone: "blue" as const,
  },
  {
    n: "03",
    title: "Launch the AI orb",
    desc: "The orb floats above your desktop, ready to caption, summarize and answer.",
    tone: "cyan" as const,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span className="h-1 w-1 rounded-full bg-blue-300" /> Setup in 3 steps
          </span>
          <h2 className="mx-auto mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-white">From zero to orb</span>{" "}
            <span className="text-gradient">in under 2 minutes</span>
          </h2>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px md:block"
               style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,.5), rgba(6,182,212,.5), transparent)" }} />

          {STEPS.map((s) => {
            const dot =
              s.tone === "violet" ? "from-violet-500 to-violet-700" :
              s.tone === "blue"   ? "from-blue-500 to-blue-700" :
                                    "from-cyan-400 to-cyan-600";
            return (
              <div key={s.n} className="relative">
                <div className={`relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${dot} text-xl font-bold text-white shadow-[0_0_50px_rgba(124,58,237,0.45)]`}>
                  <span className="absolute inset-0 rounded-full bg-white/10" />
                  <span className="relative">{s.n}</span>
                </div>
                <div className="mt-6 rounded-2xl glass p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* API setup card */}
        <div id="api" className="mt-16 grid gap-5 md:grid-cols-2">
          <ApiCard
            name="Groq API Key"
            desc="Ultra-fast LLM inference for chat, summaries and reasoning."
            url="https://console.groq.com/keys"
            tone="violet"
          />
          <ApiCard
            name="Gemini API Key"
            desc="Multimodal scene understanding and image-aware intelligence."
            url="https://aistudio.google.com/app/apikey"
            tone="cyan"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-medium text-emerald-300 ring-1 ring-emerald-400/30">FREE</span>
          <span>No credit card required.</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Both keys are free for personal use.</span>
        </div>
      </div>
    </section>
  );
}

function ApiCard({
  name, desc, url, tone,
}: { name: string; desc: string; url: string; tone: "violet" | "cyan" }) {
  const ring = tone === "violet" ? "ring-violet-400/30" : "ring-cyan-400/30";
  const dot  = tone === "violet" ? "bg-violet-400" : "bg-cyan-300";
  return (
    <div className={`group relative overflow-hidden rounded-2xl glass p-6 transition hover:bg-white/[0.07] ring-1 ${ring}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <h3 className="text-base font-semibold text-white">{name}</h3>
        <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300">Free</span>
      </div>
      <p className="mt-2 text-sm text-white/65">{desc}</p>
      <a
        href={url} target="_blank" rel="noopener noreferrer"
        onClick={(e) => {
          // Preview iframes often block window.open popups; fall back to same-tab nav.
          const w = window.open(url, "_blank", "noopener,noreferrer");
          if (!w) {
            e.preventDefault();
            window.top ? (window.top.location.href = url) : (window.location.href = url);
          }
        }}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
      >
        Get your key <span aria-hidden>→</span>
      </a>
    </div>
  );
}
