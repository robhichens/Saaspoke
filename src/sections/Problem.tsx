import { Reveal, Eyebrow } from "../components/Reveal";

const FRICTION = [
  "The same number gets typed into three different places.",
  "Nothing's wrong — but someone still has to check, because the system can't be trusted.",
  "The weekly report gets rebuilt by hand, from five other tabs.",
  "When one person is out, part of the business walks out with them.",
];

export function Problem() {
  return (
    <section id="problem" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <div className="grid gap-14 md:grid-cols-2 md:gap-10">
        <Reveal>
          <Eyebrow>The real problem</Eyebrow>
          <h2 className="font-display mt-6 max-w-md text-[clamp(2rem,4.5vw,3rem)] font-medium leading-[1.1] text-chalk">
            Your systems look connected.
            <span className="text-brass"> People are quietly connecting them.</span>
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-chalk/70">
            Someone reads a number out of one tool, messages someone else, updates a second tool,
            remembers the exception, and follows up later. The process works because the person works.
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-chalk/70">
            That invisible effort is where the friction hides — and what it quietly costs you is{" "}
            <span className="text-chalk">capacity</span>: the hours your best people spend keeping the
            operation running instead of improving it.
          </p>
        </Reveal>
        <ul className="flex flex-col justify-center gap-7 md:pl-8">
          {FRICTION.map((item, i) => (
            <Reveal as="li" key={item} delay={i * 0.08} className="flex gap-4">
              {/* measurement-tick bullet */}
              <span aria-hidden="true" className="mt-2.5 flex shrink-0 items-end gap-[3px]">
                <span className="h-3 w-px bg-brass" />
                <span className="h-2 w-px bg-rule" />
                <span className="h-2 w-px bg-rule" />
              </span>
              <span className="text-base leading-relaxed text-chalk/85 md:text-lg">{item}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
