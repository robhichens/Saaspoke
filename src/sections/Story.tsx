import { Reveal, Eyebrow } from "../components/Reveal";

/* Chanel rule (§8): this section originally had a parallax pull-quote.
   Cut — on the one quiet paper section, stillness carries more weight. */
export function Story() {
  return (
    <section id="story" className="on-paper relative bg-oat py-28 text-ink md:py-40">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-8">
        <div>
          <Reveal>
            <Eyebrow light>The founder</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-tight md:text-5xl">
              Built by an operator, not a vendor.
            </h2>
          </Reveal>
          <blockquote className="font-display mt-14 max-w-sm text-3xl font-medium leading-snug text-slate">
            "I didn't study this problem from the outside. I lived it for ten years."
          </blockquote>
        </div>

        <div className="flex max-w-xl flex-col gap-6 self-center text-lg leading-relaxed text-ink/75">
          <Reveal as="p">
            Rob Hichens spent twenty years in operations management — nearly a decade of it as
            Director of Operations inside a family-run childcare business: three sites, run
            alongside his wife and his mother-in-law. Staff scheduling, state compliance, HR,
            enrollment, the Tuesday-morning crisis. All of it, every week.
          </Reveal>
          <Reveal as="p" delay={0.08}>
            When the people you love are the people you manage, nothing is abstract. A scheduling
            gap isn't a metric — it's your wife covering a classroom through lunch. So when the
            software you just paid for turns out to understand nothing about how your business
            actually runs, you feel it in hours, not dashboards.
          </Reveal>
          <Reveal as="p" delay={0.16}>
            Saaspoke exists because of that moment. Every product starts as a tool Rob needed and
            couldn't buy — built to return at least thirty minutes a week to the person running the
            building, or it doesn't ship.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
