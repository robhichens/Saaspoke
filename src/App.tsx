import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { Cursor } from "./components/Cursor";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Subtraction } from "./sections/Subtraction";
import { HowWeBuild } from "./sections/HowWeBuild";
import { Verticals } from "./sections/Verticals";
import { Oliver } from "./sections/Oliver";
import { Pricing } from "./sections/Pricing";
import { Milestones } from "./sections/Milestones";
import { Story } from "./sections/Story";
import { Values } from "./sections/Values";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { TapeRule } from "./components/TapeRule";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const reduce = useReducedMotion();

  // Smooth scroll (Lenis) wired into GSAP's ticker; disabled under reduced motion.
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.05 });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
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

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Subtraction />
        <TapeRule />
        <HowWeBuild />
        <Verticals />
        <Oliver />
        <Pricing />
        <Milestones />
        <Story />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
