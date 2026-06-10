import { useLayoutEffect, useRef, useState } from "react";
import { useReduceMotion } from "../lib/useReduceMotion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const KEEPERS = [
  "Ratio dashboard",
  "Staff scheduling",
  "Call-out tracking",
  "Break enforcement",
  "Multi-site view",
];

const CLUTTER = [
  "SSO / SAML", "Audit logs", "Custom roles", "API webhooks", "Gantt charts",
  "Kanban boards", "OKR tracking", "Sentiment analysis", "AI insights", "Data lake export",
  "Sandbox environment", "White-labeling", "Custom themes", "Approval chains", "Forecasting",
  "Territory management", "Lead scoring", "Email cadences", "NPS surveys", "Heatmaps",
  "Session replay", "Workflow builder", "Integrations hub", "Plugin marketplace", "Sprint velocity",
  "Resource pooling", "Capacity planning", "Vendor portal", "Contract redlining", "E-signatures",
  "Expense cards", "Mileage tracking", "Geofencing", "Badge printing", "Org charts",
  "Skills matrix", "360° reviews", "Pulse checks", "Learning paths", "Certification management",
  "Asset depreciation", "Multi-currency", "VAT engine", "EDI support", "Data residency",
];

// Interleave keepers through the grid so the brass survivors feel scattered, then gathered.
const CHIPS: { label: string; keeper: boolean }[] = [];
{
  let k = 0;
  let c = 0;
  for (let i = 0; i < 50; i++) {
    if (i % 10 === 4 && k < KEEPERS.length) {
      CHIPS.push({ label: KEEPERS[k++], keeper: true });
    } else if (c < CLUTTER.length) {
      CHIPS.push({ label: CLUTTER[c++], keeper: false });
    }
  }
}

function Chip({ label, keeper, brass = false }: { label: string; keeper?: boolean; brass?: boolean }) {
  return (
    <span
      data-keeper={keeper ? "" : undefined}
      data-chip=""
      className={`inline-block whitespace-nowrap rounded-sm border px-2.5 py-1.5 font-mono text-[11px] tracking-wide ${
        brass
          ? "border-brass bg-brass text-ink"
          : "border-rule bg-ink text-chalk/45"
      }`}
    >
      {label}
    </span>
  );
}

/** Static before/after fallback for reduced motion. */
function StaticVersion() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-chalk/50">Before — 50 features</p>
        <div className="mt-4 flex flex-wrap gap-2 opacity-60">
          {CHIPS.map((c) => (
            <Chip key={c.label} label={c.label} />
          ))}
        </div>
      </div>
      <div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-brass">After — 5</p>
        <div className="mt-4 flex flex-wrap content-start gap-2">
          {KEEPERS.map((label) => (
            <Chip key={label} label={label} brass />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Subtraction() {
  const reduce = useReduceMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const headARef = useRef<HTMLSpanElement>(null);
  const headBRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const field = fieldRef.current;
    const row = rowRef.current;
    if (!section || !field || !row) return;

    const ctx = gsap.context(() => {
      const clutter = Array.from(field.querySelectorAll<HTMLElement>("[data-chip]:not([data-keeper])"));
      const keepers = Array.from(field.querySelectorAll<HTMLElement>("[data-keeper]"));
      const slots = Array.from(row.querySelectorAll<HTMLElement>("[data-slot]"));

      // deterministic shuffle into 4 waves
      const shuffled = [...clutter].sort(
        (a, b) => ((a.offsetLeft * 7 + a.offsetTop * 13) % 97) - ((b.offsetLeft * 7 + b.offsetTop * 13) % 97),
      );
      const waves: HTMLElement[][] = [[], [], [], []];
      shuffled.forEach((el, i) => waves[i % 4].push(el));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const remaining = Math.max(5, Math.round(50 - 45 * Math.min(self.progress / 0.62, 1)));
            if (counterRef.current) counterRef.current.textContent = String(remaining).padStart(2, "0");
            setDone(self.progress > 0.95);
          },
        },
      });

      // chips dim, desaturate, and fall away in waves
      waves.forEach((wave, w) => {
        tl.to(
          wave,
          { opacity: 0, y: 28, filter: "saturate(0)", stagger: 0.012, duration: 0.45, ease: "power2.in" },
          w * 0.32,
        );
      });

      // the five keepers strike to brass…
      tl.to(
        keepers,
        {
          backgroundColor: "#c8923d",
          borderColor: "#c8923d",
          color: "#14110e",
          duration: 0.3,
          stagger: 0.05,
        },
        1.35,
      );

      // …and snap into a clean, confident row (FLIP via offset deltas — transform-safe)
      keepers.forEach((el, i) => {
        const slot = slots[i];
        if (!slot) return;
        tl.to(
          el,
          {
            x: () => slot.offsetLeft - el.offsetLeft,
            y: () => slot.offsetTop - el.offsetTop,
            duration: 0.7,
            ease: "power3.inOut",
          },
          1.7 + i * 0.04,
        );
      });

      // heading swap as the last chips clear
      tl.to(headARef.current, { opacity: 0, y: -14, duration: 0.35 }, 1.5);
      tl.fromTo(
        headBRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        1.65,
      );
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} id="work" className="relative">
      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
        <Eyebrow>Build less, better</Eyebrow>

        {reduce ? (
          <>
            <h2 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
              Most software does fifty things adequately.{" "}
              <span className="text-brass">We do five, exceptionally.</span>
            </h2>
            <div className="mt-12">
              <StaticVersion />
            </div>
            <p className="mt-10 max-w-xl font-mono text-xs leading-relaxed tracking-wide text-chalk/50">
              "If you removed this feature, would a customer notice within a week? If not, it
              doesn't ship."
            </p>
          </>
        ) : (
          <>
            <div className="relative mt-6 h-[7.5rem] md:h-[8.5rem]">
              <span ref={headARef} className="font-display absolute inset-x-0 top-0 max-w-3xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
                Most software does fifty things adequately.
              </span>
              <span
                ref={headBRef}
                className="font-display absolute inset-x-0 top-0 max-w-3xl text-4xl font-medium leading-tight text-brass opacity-0 md:text-5xl"
                aria-hidden="true"
              >
                We do five, exceptionally.
              </span>
            </div>

            <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto]">
              <div className="relative">
                {/* landing row for the five survivors — under the headline, always in view */}
                <div ref={rowRef} className="mb-8 flex flex-wrap gap-2" aria-hidden="true">
                  {KEEPERS.map((label) => (
                    <span
                      key={label}
                      data-slot=""
                      className="inline-block whitespace-nowrap rounded-sm border border-transparent px-2.5 py-1.5 font-mono text-[11px] tracking-wide text-transparent"
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div ref={fieldRef} className="flex flex-wrap gap-2">
                  {CHIPS.map((c) => (
                    <Chip key={c.label} label={c.label} keeper={c.keeper} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 md:items-end">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-chalk/55">Features</span>
                <span
                  ref={counterRef}
                  className={`font-mono text-5xl tabular-nums ${done ? "text-brass" : "text-chalk/70"}`}
                  aria-hidden="true"
                >
                  50
                </span>
              </div>
            </div>

            <p className="mt-10 max-w-xl font-mono text-xs leading-relaxed tracking-wide text-chalk/50">
              "If you removed this feature, would a customer notice within a week? If not, it
              doesn't ship."
            </p>
          </>
        )}
      </div>
    </section>
  );
}
