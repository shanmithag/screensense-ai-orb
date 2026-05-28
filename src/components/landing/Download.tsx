import { useEffect, useState } from "react";
import { RELEASES_API, REPO_URL } from "../../lib/repo";

type Asset = { name: string; browser_download_url: string; size: number };
type Release = { tag_name: string; name?: string; html_url: string; assets: Asset[]; published_at: string };

type Platform = "windows" | "mac" | "linux";
type PlatformInfo = {
  key: Platform;
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  match: (name: string) => boolean;
};

const PLATFORMS: PlatformInfo[] = [
  {
    key: "windows",
    label: "Windows",
    Icon: WindowsIcon,
    match: (n) => /\.exe$|\.msi$|win(dows)?/i.test(n),
  },
  {
    key: "mac",
    label: "macOS",
    Icon: AppleIcon,
    match: (n) => /\.dmg$|\.pkg$|mac|darwin|osx/i.test(n),
  },
  {
    key: "linux",
    label: "Linux",
    Icon: LinuxIcon,
    match: (n) => /\.appimage$|\.deb$|\.rpm$|\.tar\.gz$|linux/i.test(n),
  },
];

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "windows";
  const ua = navigator.userAgent.toLowerCase();
  if (/mac|darwin|iphone|ipad/.test(ua)) return "mac";
  if (/linux|x11/.test(ua) && !/android/.test(ua)) return "linux";
  return "windows";
}

export function Download({
  onVersion,
}: { onVersion?: (v: string | null) => void }) {
  const [release, setRelease] = useState<Release | null>(null);
  const [assets, setAssets] = useState<Record<Platform, Asset | null>>({
    windows: null, mac: null, linux: null,
  });
  const [active, setActive] = useState<Platform>("windows");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setActive(detectPlatform());
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then(async (r) => {
        if (!r.ok) throw new Error(`GitHub responded ${r.status}`);
        return (await r.json()) as Release;
      })
      .then((data) => {
        if (cancelled) return;
        const next: Record<Platform, Asset | null> = { windows: null, mac: null, linux: null };
        for (const p of PLATFORMS) {
          next[p.key] = data.assets.find((a) => p.match(a.name)) ?? null;
        }
        setAssets(next);
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

  const activeInfo = PLATFORMS.find((p) => p.key === active)!;
  const activeAsset = assets[active];
  const available = !!activeAsset;

  const handleDownload = () => {
    if (!activeAsset) return;
    setDownloading(true);
    setTimeout(() => {
      window.location.href = activeAsset.browser_download_url;
      setTimeout(() => setDownloading(false), 4000);
    }, 500);
  };

  const label = loading
    ? "Preparing Download..."
    : downloading
      ? "Download Starting..."
      : available
        ? `Download for ${activeInfo.label}`
        : `Unavailable for ${activeInfo.label}`;

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

              {/* Platform tabs */}
              <div className="mt-7 inline-flex rounded-xl glass p-1">
                {PLATFORMS.map((p) => {
                  const isActive = p.key === active;
                  return (
                    <button
                      key={p.key}
                      onClick={() => setActive(p.key)}
                      className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition ${
                        isActive
                          ? "bg-white/10 text-white ring-1 ring-white/15"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <p.Icon className="h-3.5 w-3.5" />
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  disabled={loading || downloading || !available}
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 px-7 py-4 text-sm font-semibold text-white glow-violet transition disabled:cursor-not-allowed disabled:opacity-60 enabled:hover:scale-[1.03]"
                  aria-busy={loading || downloading}
                >
                  <activeInfo.Icon className="h-4 w-4" />
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
                  No {activeInfo.label} build in the latest release yet — check All releases or build from source.
                </p>
              )}
              {activeAsset && (
                <p className="mt-4 text-xs text-white/45">
                  {activeAsset.name} · {(activeAsset.size / 1024 / 1024).toFixed(1)} MB
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
function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.365 12.86c-.02-2.07 1.69-3.06 1.77-3.11-.97-1.42-2.48-1.61-3.01-1.63-1.28-.13-2.5.75-3.15.75-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.81-3.42 2.07-1.46 2.53-.37 6.27 1.05 8.32.69 1 1.52 2.13 2.6 2.09 1.05-.04 1.45-.68 2.71-.68s1.62.68 2.73.66c1.13-.02 1.84-1.02 2.53-2.03.8-1.17 1.13-2.3 1.15-2.36-.03-.01-2.2-.84-2.23-3.36ZM14.36 6.6c.58-.7.97-1.67.86-2.65-.83.03-1.84.55-2.44 1.25-.54.62-1.01 1.62-.88 2.57.93.08 1.88-.47 2.46-1.17Z" />
    </svg>
  );
}
function LinuxIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2c-1.7 0-3 1.6-3 3.7 0 .8.2 1.5.5 2.1-.3.4-.7 1-1.1 1.7-.9 1.5-1.9 3.5-1.9 5.3 0 1.1.4 2.1 1 2.9-.4.4-.7.9-.9 1.4-.3.7-.4 1.4-.1 2 .3.6 1 .9 1.8.9.5 0 1-.1 1.5-.3.7.3 1.4.4 2.2.4s1.5-.1 2.2-.4c.5.2 1 .3 1.5.3.8 0 1.5-.3 1.8-.9.3-.6.2-1.3-.1-2-.2-.5-.5-1-.9-1.4.6-.8 1-1.8 1-2.9 0-1.8-1-3.8-1.9-5.3-.4-.7-.8-1.3-1.1-1.7.3-.6.5-1.3.5-2.1C15 3.6 13.7 2 12 2Zm-1.2 3.3c.3 0 .5.4.5.9s-.2.9-.5.9-.5-.4-.5-.9.2-.9.5-.9Zm2.4 0c.3 0 .5.4.5.9s-.2.9-.5.9-.5-.4-.5-.9.2-.9.5-.9ZM12 8.6c.7 0 1.6.4 1.9.9.1.2-.2.4-.6.6-.4.3-.9.5-1.3.5s-.9-.2-1.3-.5c-.4-.2-.7-.4-.6-.6.3-.5 1.2-.9 1.9-.9Z" />
    </svg>
  );
}
