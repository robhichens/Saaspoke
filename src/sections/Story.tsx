import { Reveal, Eyebrow } from "../components/Reveal";

/* First-person founder letter. The one quiet paper section — stillness carries the weight. */
export function Story() {
  return (
    <section id="story" className="on-paper relative bg-oat py-28 text-ink md:py-40">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[0.85fr_1fr] md:gap-20 md:px-8">
        <div>
          <Reveal>
            <Eyebrow light>The founder</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-tight md:text-5xl">
              Built by an operator, not a vendor.
            </h2>
          </Reveal>
          <blockquote className="font-display mt-12 max-w-sm text-3xl font-medium leading-snug text-slate">
            "I didn't study this problem from the outside. I've lived it for over two decades."
          </blockquote>
          <Reveal delay={0.1}>
            <img
              src="/Rob-profile-pic.jpg"
              alt="Rob Hichens, founder of Hichens & Sons"
              width={880}
              height={1168}
              loading="lazy"
              className="mt-12 w-full max-w-[300px] rounded-md border border-ink/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.55)]"
            />
          </Reveal>
        </div>

        <div className="flex max-w-xl flex-col gap-6 self-center text-lg leading-relaxed text-ink/75">
          <Reveal as="p">
            At twenty-five I was running a 46,000-seat stadium for the 2010 FIFA World Cup. Since then
            I've been handed one unfamiliar operation after another, and the job never changed: learn
            how the place actually works, then make it run better. So I won't walk into your business
            pretending to know your industry — I'll come ready to learn it, quickly and properly, from
            the people who live it every day. That much I'm sure of; it's the one thing I've done my
            whole career.
          </Reveal>
          <Reveal as="p" delay={0.06}>
            I've spent years on the building side, too. As a product manager for a health-tech
            company, I owned the roadmap for a subscription platform used by hundreds of thousands of
            people — turning the messy, real-world needs of customers and a 150-strong coaching team
            into software that actually shipped. So when I say I'll build you something, that's not the
            part I'm figuring out as I go. I know how to take what I learn about your operation and
            make it real.
          </Reveal>
          <Reveal as="p" delay={0.12}>
            Most recently, both sides came together in my family's own business — Bright Beginnings, a
            multi-site preschool where I've run operations and built the platform this studio grew out
            of. It's the proving ground for everything you see here.
          </Reveal>
          <Reveal as="p" delay={0.18}>
            When we work together, I'm listening for the things that never make it into a brief — the
            pain points, the wish list you've never said out loud, and the human cost underneath,
            because a broken system isn't a line on a report; it's someone catching the dropped ball
            at six o'clock again. Then, with your knowledge and mine, I build the undercurrent of
            support you've always wanted but didn't think was possible: where nothing important slips,
            every change gets logged, and your operation quietly becomes resilient.
          </Reveal>
          <Reveal as="p" delay={0.24} className="text-ink">
            And you won't wait months to feel it. Inside the first month you'll be clicking through
            working prototypes of your own workflows — not slides, not a report, the real thing. That's
            the whole idea behind what I do: I don't hand you a strategy. I show you the true measure
            of your business. So — <a href="#contact" className="italic text-ember link-wipe hover:text-ember">let me show you.</a>
          </Reveal>
          <Reveal as="p" delay={0.3} className="mt-2 font-mono text-xs tracking-[0.18em] uppercase text-slate">
            — Rob Hichens, founder
          </Reveal>
        </div>
      </div>
    </section>
  );
}
