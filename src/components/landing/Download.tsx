import { useEffect, useState } from "react";
import { RELEASES_API, REPO_URL } from "../../lib/repo";

type Asset = { name: string; browser_download_url: string; size: number };
type Release = { tag_name: string; name?: string; html_url: string; assets: Asset[]; published_at: string };

type Status = "idle" | "loading" | "ready" | "unavailable" | "downloading" | "started" | "error";

export function Download({
  onVersion,
}: { onVersion?: (v: string | null) => void }) {
  const [status, setStatus] = useState<Status>("loading");
  const [release, setRelease] = useState<Release | null>(null);
  const [installer, setInstaller] = useState<Asset | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
        return (await r.json()) as Release;
      })
      .then((data) => {
        if (cancelled) return;
        const exe =
          data.assets.find((a) => /\.exe$/i.test(a.name)) ||
          data.assets.find((a) => /win|windows/i.test(a.name) && /\.(exe|msi|zip)$/i.test(a.name)) ||
          null;
        setRelease(data);
        setInstaller(exe);
        setStatus(exe ? "ready" : "unavailable");
        onVersion?.(data.tag_name ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("unavailable");
        onVersion?.(null);
      });
    return () => { cancelled = true; };
  }, [onVersion]);

  const handleDownload = () => {
    if (!installer) return;
    setStatus("downloading");
    setTimeout(() => {
      setStatus("started");
      window.location.href = installer.browser_download_url;
      setTimeout(() => setStatus("ready"), 4000);
    }, 700);
  };

  const label = (() => {
    switch (status) {
      case "loading": return "Preparing Download...";
      case "downloading": return "Preparing Download...";
      case "started": return "Download Starting...";
      case "unavailable": return "Download Unavailable";
      case "error": return "Download Unavailable";
      default: return "Download for Windows";
    }
  })();

  const disabled = status !== "ready";

  return (
    <section id="download" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl glass p-10 md:p-14 glow-violet">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,.6), transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,.55), transparent 70%)" }}
          />

          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                <span className="h-1 w-1 animate-orb-pulse rounded-full bg-cyan-300" />
                {release?.tag_name ? `Latest: ${release.tag_name}` : "Fetching latest release"}
              </span>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="text-white">Bring the orb</span>{" "}
                <span className="text-gradient">to your desktop</span>
              </h2>
              <p className="mt-4 max-w-md text-white/65">
                Free forever. MIT licensed. No account required. Installs in seconds and
                lives quietly above your work until you summon it.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  disabled={disabled}
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 px-7 py-4 text-sm font-semibold text-white glow-violet transition disabled:cursor-not-allowed disabled:opacity-60 enabled:hover:scale-[1.03]"
                  aria-busy={status === "loading" || status === "downloading"}
                >
                  <WindowsIcon className="h-4 w-4" />
                  {label}
                  {(status === "loading" || status === "downloading") && (
                    <span className="ml-1 inline-block h-3.5 w-3.5 animate-orb-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                </button>
                <a
                  href={`${REPO_URL}/releases`}
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass px-6 py-4 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition"
                >
                  All releases <span aria-hidden>↗</span>
                </a>
              </div>

              {status === "unavailable" && (
                <p className="mt-4 text-xs text-amber-200/80">
                  We couldn't reach the latest release. You can browse all builds on GitHub.
                </p>
              )}
              {installer && (
                <p className="mt-4 text-xs text-white/45">
                  {installer.name} · {(installer.size / 1024 / 1024).toFixed(1)} MB
                </p>
              )}
            </div>

            <ul className="grid gap-2.5 text-sm">
              {[
                "Free for personal & commercial use",
                "Works offline with local Whisper",
                "Bring-your-own Groq & Gemini keys",
                "Auto-updates from GitHub Releases",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 rounded-xl glass px-4 py-3 text-white/80">
                  <Check />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}
function WindowsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 11 4v7.5H3V5.5Zm0 13L11 20v-7.5H3v6Zm9 1.5 9 1.5v-9h-9V20Zm0-16v8h9V3l-9 1Z" />
    </svg>
  );
}
