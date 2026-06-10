import { Reveal, Eyebrow } from "../components/Reveal";
import { CountUp } from "../components/CountUp";

const PAINS = [
  "You're paying for features built for a company ten times your size.",
  "The software won't bend, so your workflow does.",
  "Spreadsheets, group texts, and paper logs — duct tape holding the week together.",
  "Hours lost every week to friction that compounds quietly.",
];

export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <Reveal>
          <Eyebrow>The gap</Eyebrow>
          <p className="font-display mt-6 text-[clamp(3.5rem,9vw,6.5rem)] font-medium leading-none text-chalk">
            <CountUp to={33} format={(n) => Math.round(n).toString()} />
            <span className="text-brass"> million</span>
          </p>
          <p className="mt-3 font-mono text-xs tracking-[0.25em] uppercase text-chalk/50">
            Small businesses in America
          </p>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-chalk/70">
            Most are family-run. The software market built for almost none of them. Enterprise tools
            get handed down as a compromise — built for companies ten times bigger, then shrunk to
            fit a price point instead of a process.
          </p>
        </Reveal>
        <ul className="flex flex-col justify-center gap-7 md:pl-8">
          {PAINS.map((pain, i) => (
            <Reveal as="li" key={pain} delay={i * 0.08} className="flex gap-4">
              {/* measurement-tick bullet */}
              <span aria-hidden="true" className="mt-2.5 flex shrink-0 items-end gap-[3px]">
                <span className="h-3 w-px bg-brass" />
                <span className="h-2 w-px bg-rule" />
                <span className="h-2 w-px bg-rule" />
              </span>
              <span className="text-base leading-relaxed text-chalk/85 md:text-lg">{pain}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
