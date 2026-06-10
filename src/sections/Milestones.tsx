import { useLayoutEffect, useRef } from "react";
import { useReduceMotion } from "../lib/useReduceMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow, Reveal } from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { clients: 5, profit: 0, label: "5 clients", note: "Break-even" },
  { clients: 10, profit: 890, label: "10 clients", note: "~$890/mo" },
  { clients: 20, profit: 2400, label: "20 clients", note: "~$2,400/mo" },
  { clients: 38, profit: 6000, label: "35–40 clients", note: "~$6,000/mo" },
  { clients: 75, profit: 12000, label: "75 clients", note: "$12,000+/mo" },
];

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Piecewise-linear interpolation across the milestone points. */
function at(progress: number) {
  const segs = MILESTONES.length - 1;
  const f = Math.min(Math.max(progress, 0), 0.9999) * segs;
  const i = Math.floor(f);
  const t = f - i;
  const a = MILESTONES[i];
  const b = MILESTONES[i + 1];
  return {
    clients: a.clients + (b.clients - a.clients) * t,
    profit: a.profit + (b.profit - a.profit) * t,
  };
}

/** Reduced-motion fallback: the full stepped chart, all at once. */
function StaticChart() {
  return (
    <ol className="mt-12 grid gap-6 border-l border-rule pl-6 md:grid-cols-5 md:border-l-0 md:border-t md:pl-0 md:pt-8">
      {MILESTONES.map((m) => (
        <li key={m.label}>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-brass">{m.label}</p>
          <p className="mt-1 font-mono text-2xl text-chalk tabular-nums">{m.note}</p>
        </li>
      ))}
    </ol>
  );
}

export function Milestones() {
  const reduce = useReduceMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const profitRef = useRef<HTMLSpanElement>(null);
  const clientsRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=1400",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const { clients, profit } = at(self.progress);
          if (profitRef.current) profitRef.current.textContent = fmt(profit);
          if (clientsRef.current) clientsRef.current.textContent = String(Math.round(clients));
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          markRefs.current.forEach((el, i) => {
            if (!el) return;
            const reached = clients >= MILESTONES[i].clients - 0.5;
            el.style.opacity = reached ? "1" : "0.35";
            el.style.color = reached ? "#c8923d" : "";
          });
        },
      });
    }, section);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative">
      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <Reveal>
          <Eyebrow>The numbers</Eyebrow>
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
            A real business, by design.
          </h2>
          <p className="mt-4 max-w-md text-lg text-chalk/65">
            No venture math, no growth-at-all-costs. A studio that works at five clients and
            compounds from there.
          </p>
        </Reveal>

        {reduce ? (
          <StaticChart />
        ) : (
          <div className="mt-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-chalk/55">Monthly profit</p>
                <p className="font-mono text-[clamp(2.6rem,7vw,4.5rem)] leading-none text-chalk tabular-nums">
                  <span ref={profitRef}>$0</span>
                  <span className="text-2xl text-chalk/45">/mo</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs tracking-[0.25em] uppercase text-chalk/55">Clients</p>
                <p className="font-mono text-4xl text-brass tabular-nums">
                  <span ref={clientsRef}>5</span>
                </p>
              </div>
            </div>

            {/* track + fill */}
            <div className="relative mt-10 h-px w-full bg-rule">
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 h-px w-full origin-left scale-x-0 bg-brass"
              />
            </div>

            <ol className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-5">
              {MILESTONES.map((m, i) => (
                <li
                  key={m.label}
                  ref={(el) => {
                    markRefs.current[i] = el;
                  }}
                  className="opacity-35 transition-colors duration-200"
                >
                  <span aria-hidden="true" className="mb-2 block h-2 w-px bg-current" />
                  <p className="font-mono text-xs tracking-[0.15em] uppercase">{m.label}</p>
                  <p className="mt-1 font-mono text-sm text-chalk/70 tabular-nums">{m.note}</p>
                </li>
              ))}
            </ol>

            <p className="mt-12 font-mono text-xs tracking-wide text-chalk/55">
              Keep scrolling — the model runs from break-even to a durable studio.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
