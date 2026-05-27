export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full glow-violet"
            style={{ background: "radial-gradient(circle at 30% 30%, #c4b5fd, #7C3AED 60%, #1e1b4b)" }} />
          <span className="text-sm font-semibold tracking-wide text-white">
            ScreenSense<span className="text-cyan-300"> AI</span>
          </span>
        </a>
        <nav className="hidden gap-7 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#tech" className="hover:text-white transition">Tech</a>
          <a href="#download" className="hover:text-white transition">Download</a>
        </nav>
        <a
          href="#download"
          className="rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 hover:bg-white/15 transition"
        >
          Get the app
        </a>
      </div>
    </header>
  );
}
