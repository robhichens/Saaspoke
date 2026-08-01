import { ArrowRight } from "lucide-react";
import { Reveal, Eyebrow } from "../components/Reveal";
import { TapeRule } from "../components/TapeRule";

const DOORS = [
  {
    tag: "Bespoke",
    title: "Build with us",
    body: "You've got a valuable problem no off-the-shelf tool solves well. We learn your operation and build a focused system around it — scoped to exactly how you work.",
    foot: "Starts with a paid Operational Discovery: we map the work, find the friction, and tell you honestly whether software is even the answer.",
  },
  {
    tag: "Products",
    title: "Use what we've built",
    body: "Some problems repeat across businesses. When they do, we turn a proven system into a focused product you can simply pick up and use.",
    foot: "The first are growing out of the daily work at Bright Beginnings right now.",
  },
];

export function Offer() {
  return (
    <section id="offer" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <Reveal>
        <Eyebrow>Two doors</Eyebrow>
        <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
          Two ways to work with us.
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-chalk/65">
          One operating philosophy, two clear paths in. You don't have to know which one you need —
          that's what the first conversation is for.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-md bg-rule md:grid-cols-2">
        {DOORS.map((d, i) => (
          <Reveal as="div" key={d.title} delay={i * 0.1} className="card-lift flex flex-col bg-ink p-8 md:p-10">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-brass">
              {String(i + 1).padStart(2, "0")} · {d.tag}
            </span>
            <h3 className="font-display mt-4 text-2xl font-medium text-chalk md:text-3xl">{d.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-chalk/70">{d.body}</p>
            <p className="mt-5 border-t border-rule pt-5 text-sm leading-relaxed text-chalk/55">{d.foot}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <TapeRule />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md font-mono text-xs leading-relaxed tracking-wide text-chalk/55">
          No tiers, no gated features, no surprise invoices. Scope and price agreed up front, sized
          to the work — and your data always leaves with you.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-base font-medium text-ink transition duration-150 ease-out hover:bg-[#e26c47] motion-safe:hover:scale-[1.03]"
        >
          Start with an Operational Discovery <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
