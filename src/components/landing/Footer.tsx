import { REPO_URL } from "../../lib/repo";

export function Footer({ version }: { version: string | null }) {
  return (
    <footer className="relative mt-12 border-t border-white/10 px-6 pb-10 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-full glow-violet"
              style={{ background: "radial-gradient(circle at 30% 30%, #c4b5fd, #7C3AED 60%, #1e1b4b)" }} />
            <span className="text-sm font-semibold tracking-wide text-white">
              ScreenSense<span className="text-cyan-300"> AI</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/55">
            A floating AI orb that lives on your desktop. Open source, MIT licensed, free forever.
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-wider text-white/40">
            {version ? `Version ${version}` : "Latest version"} · MIT License
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/45">Project</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><a className="hover:text-white" href={REPO_URL} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="hover:text-white" href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">Releases</a></li>
            <li><a className="hover:text-white" href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">MIT License</a></li>
            <li><a className="hover:text-white" href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">Report an issue</a></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/45">Developer</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Built with care by the ScreenSense community.</li>
            <li>Contributions welcome on GitHub.</li>
            <li className="text-white/45">© {new Date().getFullYear()} ScreenSense AI</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
