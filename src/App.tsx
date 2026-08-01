import { lazy, Suspense, useEffect } from "react";
import { useReduceMotion } from "./lib/useReduceMotion";

import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { TapeRule } from "./components/TapeRule";

// Below-the-fold sections are lazy so the initial bundle stays lean
// (GSAP and Lenis live entirely in deferred chunks — they never block first paint).
const CaseStudy = lazy(() => import("./sections/CaseStudy").then((m) => ({ default: m.CaseStudy })));
const HowWeBuild = lazy(() => import("./sections/HowWeBuild").then((m) => ({ default: m.HowWeBuild })));
const Subtraction = lazy(() => import("./sections/Subtraction").then((m) => ({ default: m.Subtraction })));
const Offer = lazy(() => import("./sections/Offer").then((m) => ({ default: m.Offer })));
const Story = lazy(() => import("./sections/Story").then((m) => ({ default: m.Story })));
const Values = lazy(() => import("./sections/Values").then((m) => ({ default: m.Values })));
const Contact = lazy(() => import("./sections/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("./sections/Footer").then((m) => ({ default: m.Footer })));

export default function App() {
  const reduce = useReduceMotion();

  // Smooth scroll (Lenis) wired into GSAP's ticker; loaded after first paint,
  // disabled entirely under reduced motion.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.05 });
      (window as unknown as { lenis?: unknown }).lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // route in-page anchors through Lenis so pinned sections don't fight the jump
      const onClick = (e: Event) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const el = document.querySelector(a.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -64 });
        }
      };
      document.addEventListener("click", onClick);

      // lazy sections mount after first layout — recompute pin positions once settled
      const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);

      cleanup = () => {
        window.clearTimeout(refresh);
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduce]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Suspense fallback={null}>
          <CaseStudy />
          <TapeRule />
          <HowWeBuild />
          <Subtraction />
          <Offer />
          <Story />
          <Values />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
