import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FEATURES = [
  {
    title: "Live Captions",
    desc: "Real-time speech-to-text overlay for any audio on screen.",
    icon: "captions",
    tone: "cyan",
    detail:
      "ScreenSense listens to everything playing on your desktop — video calls, podcasts, system audio — and renders live captions in a subtle, customizable overlay. Supports 30+ languages with local Whisper transcription for privacy-first environments.",
    highlights: ["Real-time streaming", "30+ languages", "Offline mode via Whisper", "Customizable overlay style"],
  },
  {
    title: "Scene Explainer",
    desc: "Understand what's on screen — apps, videos, charts, code.",
    icon: "eye",
    tone: "violet",
    detail:
      "Point the orb at any window and ask what you're looking at. ScreenSense analyzes UI layouts, reads charts, explains code snippets, and breaks down complex visuals into plain language — instantly.",
    highlights: ["Visual UI parsing", "Chart & graph comprehension", "Code explanation", "Multi-app awareness"],
  },
  {
    title: "Transcript Notes",
    desc: "Auto-structured notes from any meeting or call, in real time.",
    icon: "doc",
    tone: "blue",
    detail:
      "Never take meeting notes again. ScreenSense structures conversations into organized transcripts with speaker labels, action items, and key decisions — all while you stay present in the discussion.",
    highlights: ["Speaker diarization", "Auto action-items", "Topic clustering", "Export to Notion/Obsidian"],
  },
  {
    title: "AI Summarizer",
    desc: "Distill long sessions into crisp summaries and decisions.",
    icon: "spark",
    tone: "violet",
    detail:
      "Turn hours of calls, presentations, or research into bite-sized summaries. The Summarizer identifies key takeaways, decisions made, and follow-ups required — ready to share or archive.",
    highlights: ["Session-length agnostic", "Decision extraction", "Follow-up detection", "One-click share"],
  },
  {
    title: "Face Analyzer",
    desc: "Detect emotion, attention and engagement during sessions.",
    icon: "face",
    tone: "cyan",
    detail:
      "Get real-time feedback on audience engagement during presentations or 1:1s. ScreenSense analyzes facial expressions (with full consent) to gauge attention, confusion, and engagement — all processed locally.",
    highlights: ["Local processing only", "Attention scoring", "Emotion timeline", "Privacy-first design"],
  },
  {
    title: "AI Fake Detector",
    desc: "Spot AI-generated imagery and synthetic media on the fly.",
    icon: "shield",
    tone: "blue",
    detail:
      "As deepfakes and AI-generated content proliferate, ScreenSense gives you an instant sanity check. Hover over any image or video on screen to get a probability score and explanation of synthetic markers detected.",
    highlights: ["Image & video analysis", "Probability scoring", "Marker explanation", "Browser-agnostic"],
  },
  {
    title: "Call Recording",
    desc: "One-tap capture for any call with searchable transcripts.",
    icon: "mic",
    tone: "violet",
    detail:
      "Record any desktop audio session with a single click. Calls are stored with full transcripts, speaker labels, and searchable text — so you can find that one important detail without re-watching.",
    highlights: ["One-tap start/stop", "Searchable archive", "Cloud or local storage", "Encryption at rest"],
  },
  {
    title: "Session Chat",
    desc: "Ask the orb about anything happening on your screen, now.",
    icon: "chat",
    tone: "cyan",
    detail:
      "The orb isn't just watching — it's ready to talk. Ask about what's on screen, request summaries, get explanations, or have it take action. Session Chat is context-aware and grounded in what you're actually doing.",
    highlights: ["Context-aware responses", "Multi-turn conversations", "Screen-grounded answers", "Voice or text input"],
  },
  {
    title: "Activity Insights",
    desc: "Focus time, app switches, usage tables and an activity timeline.",
    icon: "chart",
    tone: "blue",
    detail:
      "Turn your day into data. Activity Insights tracks focus time, counts app switches, and surfaces usage tables alongside a full timeline of application activity — so you can see where your attention really went and build healthier work patterns.",
    highlights: ["Focus time tracking", "App switch counter", "Usage tables", "Activity timeline"],
  },
] as const;

export function Features() {
  const [openFeature, setOpenFeature] = useState<string | null>(null);

  const activeFeature = FEATURES.find((f) => f.title === openFeature);

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
            <FeatureCard key={f.title} {...f} index={i} onLearnMore={() => setOpenFeature(f.title)} />
          ))}
        </div>
      </div>

      <Dialog open={!!activeFeature} onOpenChange={() => setOpenFeature(null)}>
        {activeFeature && (
          <DialogContent className="max-w-lg border-white/10 bg-[#0b0f1e]/95 backdrop-blur-xl text-white shadow-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 ${
                    activeFeature.tone === "cyan"
                      ? "text-cyan-300"
                      : activeFeature.tone === "violet"
                        ? "text-violet-300"
                        : "text-blue-300"
                  }`}
                >
                  <FeatureIcon name={activeFeature.icon} />
                </div>
                <DialogTitle className="text-lg font-semibold text-white">
                  {activeFeature.title}
                </DialogTitle>
              </div>
              <DialogDescription className="mt-2 text-sm leading-relaxed text-white/70">
                {activeFeature.detail}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">Key capabilities</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {activeFeature.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-[13px] text-white/80 ring-1 ring-white/5"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeFeature.tone === "cyan"
                          ? "bg-cyan-400"
                          : activeFeature.tone === "violet"
                            ? "bg-violet-400"
                            : "bg-blue-400"
                      }`}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

function FeatureCard({
  title, desc, icon, tone, index, onLearnMore,
}: {
  title: string; desc: string; icon: string; tone: "cyan" | "violet" | "blue"; index: number; onLearnMore: () => void;
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

      <button
        onClick={onLearnMore}
        className="relative mt-5 flex cursor-pointer items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/40 transition hover:text-white/70 group-hover:text-white/70"
      >
        Learn more <span aria-hidden>→</span>
      </button>
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
    case "chart":    return (<svg viewBox="0 0 24 24" {...p}><path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 5-7"/><circle cx="7" cy="15" r="1.2" fill="currentColor"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/></svg>);
    default: return null;
  }
}
