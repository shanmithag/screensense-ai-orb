import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Background } from "../components/landing/Background";
import { Nav } from "../components/landing/Nav";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Tech } from "../components/landing/Tech";
import { Download } from "../components/landing/Download";
import { Footer } from "../components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [version, setVersion] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <Background />
      <Nav />
      <Hero version={version} />
      <Features />
      <HowItWorks />
      <Tech />
      <Download onVersion={setVersion} />
      <Footer version={version} />
    </main>
  );
}
