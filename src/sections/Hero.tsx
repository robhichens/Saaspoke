import { motion } from "framer-motion";
import { useReduceMotion } from "../lib/useReduceMotion";
import { playIntro } from "../lib/intro";
import { ArrowRight } from "lucide-react";
import { TapeRule } from "../components/TapeRule";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Headline lines reveal with a clip mask, staggered. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  const still = useReduceMotion() || !playIntro;
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={still ? false : { y: "108%" }}
        animate={still ? undefined : { y: 0 }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const still = useReduceMotion() || !playIntro;
  const fade = (delay: number) => ({
    initial: still ? false : { opacity: 0, y: 12 },
    animate: still ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-10">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <motion.p {...fade(0.15)} className="font-mono text-xs tracking-[0.3em] text-brass">
            OPERATIONAL&nbsp;SOFTWARE&nbsp;STUDIO
          </motion.p>
          <h1 className="font-display mt-6 text-[clamp(2.7rem,7.5vw,5.4rem)] font-medium leading-[1.03] tracking-tight text-chalk">
            <Line delay={0.25}>Software, built around</Line>
            <Line delay={0.37}>
              the way you <em className="not-italic text-brass">already</em> work.
            </Line>
          </h1>
          <motion.p {...fade(0.62)} className="mt-7 max-w-xl text-lg leading-relaxed text-chalk/70">
            We learn how your business actually runs — from the people doing the work — then build the
            focused software that removes the friction and hands your team its time back. For
            owner-operated businesses that have outgrown their spreadsheets, not their good sense.
          </motion.p>
          <motion.div {...fade(0.78)} className="mt-9 flex flex-wrap items-center gap-7">
            <a
              href="#contact"
              className="inline-block rounded-full bg-ember px-7 py-3.5 text-base font-medium text-ink transition duration-150 ease-out hover:bg-[#e26c47] motion-safe:hover:scale-[1.03]"
            >
              Start a conversation
            </a>
            <a href="#work" className="link-wipe inline-flex items-center gap-1.5 text-sm text-chalk/70 hover:text-chalk">
              See what that looks like <ArrowRight size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <TapeRule />
      </div>
    </section>
  );
}
