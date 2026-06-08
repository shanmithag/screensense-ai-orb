import React, { useEffect, useState } from "react";
import { RELEASES_API, REPO_URL } from "../../lib/repo";

type Asset = { name: string; browser_download_url: string; size: number };
type Release = { tag_name: string; name?: string; html_url: string; assets: Asset[]; published_at: string };

const matchWindows = (n: string) => /^screensense-ai-setup-.*\.exe$/i.test(n);

export function Download({
  onVersion,
}: { onVersion?: (v: string | null) => void }) {
  const [release, setRelease] = useState<Release | null>(null);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
        return (await r.json()) as Release;
      })
      .then((data) => {
        if (cancelled) return;
        setAsset(data.assets.find((a) => matchWindows(a.name)) ?? null);
        setRelease(data);
        setLoading(false);
        onVersion?.(data.tag_name ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
        onVersion?.(null);
      });
    return () => { cancelled = true; };
  }, [onVersion]);

  const available = !!asset;

  const handleDownload = () => {
    if (!asset) return;
    setDownloading(true);
    setTimeout(() => {
      window.location.href = asset.browser_download_url;
      setTimeout(() => setDownloading(false), 4000);
    }, 500);
  };

  const label = loading
    ? "Preparing Download..."
    : downloading
      ? "Download Starting..."
      : available
        ? "Download for Windows"
        : "Unavailable for Windows";

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
                  disabled={loading || downloading || !available}
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 px-7 py-4 text-sm font-semibold text-white glow-violet transition disabled:cursor-not-allowed disabled:opacity-60 enabled:hover:scale-[1.03]"
                  aria-busy={loading || downloading}
                >
                  <WindowsIcon className="h-4 w-4" />
                  {label}
                  {(loading || downloading) && (
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

              {!loading && !available && (
                <p className="mt-4 text-xs text-amber-200/80">
                  No Windows build in the latest release yet — check All releases or build from source.
                </p>
              )}
              {asset && (
                <p className="mt-4 text-xs text-white/45">
                  {asset.name} · {(asset.size / 1024 / 1024).toFixed(1)} MB
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
