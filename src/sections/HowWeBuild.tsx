import { motion } from "framer-motion";
import { useReduceMotion } from "../lib/useReduceMotion";
import { Reveal, Eyebrow } from "../components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Start with a conversation",
    body: "You don't need to know what software you want. Just what's eating time, causing mistakes, or holding the business back.",
  },
  {
    n: "02",
    title: "Learn the work",
    body: "Tell me, show me, let me watch. We learn from the people doing the job — not just the org chart — until we can see the real process, not the official one.",
  },
  {
    n: "03",
    title: "Simplify, then build",
    body: "Before any code, we ask what can just go away. Then we build the smallest useful version — early enough for you to react to the real thing.",
  },
  {
    n: "04",
    title: "Deploy, measure, stay",
    body: "We watch how it's actually used, measure the capacity it gave back, and stay a person who knows your operation — without making you dependent on us.",
  },
];

export function HowWeBuild() {
  const reduce = useReduceMotion();

  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <Reveal>
        <Eyebrow>How we work</Eyebrow>
        <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
          We learn your business before we build a thing.
        </h2>
      </Reveal>

      <div className="relative mt-16">
        {/* the tape-measure line draws left-to-right as the section enters */}
        <div aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px md:block">
          <motion.div
            className="h-px origin-left bg-rule"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.n}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px 0px" }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* node on the line */}
              <span aria-hidden="true" className="mb-6 hidden h-[15px] items-center md:flex">
                <span className="h-[15px] w-[15px] rounded-full border border-brass bg-ink" />
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-brass">{step.n}</span>
              <h3 className="mt-3 text-xl font-medium text-chalk">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-chalk/65">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
