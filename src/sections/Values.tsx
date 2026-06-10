import { Reveal, Eyebrow } from "../components/Reveal";
import { TapeRule } from "../components/TapeRule";

const VALUES = [
  { title: "Operators first", line: "Built for the person who opens the building, not the one who buys enterprise licenses." },
  { title: "Time is the metric", line: "If a feature doesn't give back thirty minutes a week, it doesn't belong." },
  { title: "Honest pricing", line: "One price, on the page. No tiers, no gates, no \"contact us.\"" },
  { title: "Build less, better", line: "Five things, exceptionally — never fifty, adequately." },
  { title: "The founder is the customer", line: "Every product starts as a tool Rob needed and couldn't buy." },
  { title: "Sustainable by design", line: "A small studio built to still be here in twenty years." },
];

export function Values() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <Reveal>
        <Eyebrow>Operating principles</Eyebrow>
        <h2 className="font-display mt-6 max-w-xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
          The spine of the studio.
        </h2>
      </Reveal>
      <div className="mt-14">
        <TapeRule label="30 min / week — minimum return" />
        <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} delay={(i % 3) * 0.08} className="card-lift bg-ink p-7 md:p-8">
              <span className="font-mono text-[10px] tracking-[0.25em] text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium text-chalk">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-chalk/60">{v.line}</p>
            </Reveal>
          ))}
        </ul>
        <TapeRule />
      </div>
    </section>
  );
}
