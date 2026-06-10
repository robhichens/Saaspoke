import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Wheel } from "../components/Wheel";
import { Magnetic } from "../components/Magnetic";
import { TapeRule } from "../components/TapeRule";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline lines reveal with a clip mask, staggered. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "108%" }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="relative z-10">
          <motion.p {...fade(0.15)} className="font-mono text-xs tracking-[0.3em] text-brass">
            SAAS&nbsp;+&nbsp;BESPOKE
          </motion.p>
          <h1 className="font-display mt-6 text-[clamp(2.9rem,8vw,5.6rem)] font-medium leading-[1.02] tracking-tight text-chalk">
            <Line delay={0.25}>Software,</Line>
            <Line delay={0.37}>
              made to <em className="not-italic text-brass">measure</em>.
            </Line>
          </h1>
          <motion.p {...fade(0.6)} className="mt-7 max-w-md text-lg leading-relaxed text-chalk/70">
            Purpose-built tools for family businesses — scoped to exactly how you already work,
            priced for a real budget, built by someone who's run one.
          </motion.p>
          <motion.div {...fade(0.75)} className="mt-9 flex flex-wrap items-center gap-7">
            <Magnetic>
              <a
                href="#contact"
                className="inline-block rounded-full bg-ember px-7 py-3.5 text-base font-medium text-ink transition-colors duration-150 hover:bg-[#e26c47]"
              >
                Start a conversation
              </a>
            </Magnetic>
            <a href="#how" className="link-wipe inline-flex items-center gap-1.5 text-sm text-chalk/70 hover:text-chalk">
              See how we build <ArrowRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* the signature: hub-and-spoke, drawn on load, tilts toward the cursor */}
        <div className="relative max-md:order-first max-md:-mb-16 max-md:opacity-90">
          <Wheel mode="hero" className="mx-auto w-full max-w-[560px] max-md:max-w-[380px]" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <TapeRule />
      </div>
    </section>
  );
}
