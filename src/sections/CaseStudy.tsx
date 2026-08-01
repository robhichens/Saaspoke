import { Reveal, Eyebrow } from "../components/Reveal";
import { CountUp } from "../components/CountUp";
import { TapeRule } from "../components/TapeRule";

/* Real figures from Bright Beginnings, confirmed by Rob (Aug 2026):
   daily-report submission rose from 26% on the old hand-copied
   spreadsheet to 97% once the app shipped. */
const RATE_BEFORE = 26;
const RATE_AFTER = 97;

const PROOF = [
  "Before: a spreadsheet copied by hand — and most days, it didn't get done.",
  "After: a guided daily form that autosaves as you go, filed nearly every day, at every site.",
  "Leadership sees the whole business in near-real-time — and catches anomalies in hours, not weeks.",
];

export function CaseStudy() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>The proof</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-medium leading-tight text-chalk md:text-5xl">
            We built this for a business we run.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk/70">
            Bright Beginnings is a family-run preschool across three sites — our founding proving
            ground. Every day, each site files a Daily Operations Report: attendance, staffing,
            enrollment, the numbers that tell leadership whether the business is healthy.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {PROOF.map((p) => (
              <li key={p} className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 flex shrink-0 items-end gap-[3px]">
                  <span className="h-3 w-px bg-brass" />
                  <span className="h-2 w-px bg-rule" />
                </span>
                <span className="text-base leading-relaxed text-chalk/85">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-xs leading-relaxed tracking-wide text-chalk/50">
            The Daily Ops Report is one tool in a growing platform inside Bright Beginnings —
            scheduling, ratio compliance, onboarding, training. It's where the studio's method was
            proven: live inside the operation, find the friction, build the smallest useful thing,
            measure what changed.
          </p>
        </Reveal>

        {/* the win, on paper: the submission-rate leap */}
        <Reveal delay={0.1}>
          <div className="on-paper rounded-md bg-oat p-7 text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] md:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50">
                Daily Ops Report
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50">
                Submission rate
              </p>
            </div>
            <TapeRule onPaper className="mt-4" />

            <div className="mt-8 flex items-end gap-4">
              <CountUp
                to={RATE_AFTER}
                format={(n) => `${Math.round(n)}%`}
                className="font-display text-[clamp(3.5rem,10vw,5rem)] font-medium leading-none text-ink"
              />
              <p className="mb-2 font-mono text-xs leading-relaxed tracking-wide text-slate">
                of days now reported
                <br />
                <span className="text-ink/50">up from {RATE_BEFORE}%</span>
              </p>
            </div>

            {/* before / after bars */}
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50">
                  <span>Before — hand-copied</span>
                  <span className="tabular-nums">{RATE_BEFORE}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-ink/10">
                  <div className="h-2 rounded-full bg-ink/30" style={{ width: `${RATE_BEFORE}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-ink/70">
                  <span>After — the app</span>
                  <span className="tabular-nums">{RATE_AFTER}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-ink/10">
                  <div className="h-2 rounded-full bg-brass" style={{ width: `${RATE_AFTER}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-ink/10 pt-5">
              <p className="text-sm leading-relaxed text-ink/70">
                Every site. Every day. Visible to leadership the moment it's filed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
