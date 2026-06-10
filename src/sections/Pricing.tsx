import { useState } from "react";
import { useReduceMotion } from "../lib/useReduceMotion";
import { Reveal, Eyebrow } from "../components/Reveal";
import { TapeRule } from "../components/TapeRule";

export function Pricing() {
  const reduce = useReduceMotion();
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");

  const scan = () => {
    if (scanState !== "idle") return;
    if (reduce) {
      setScanState("done");
      return;
    }
    setScanState("scanning");
    window.setTimeout(() => setScanState("done"), 950);
  };

  return (
    <section id="pricing" className="on-paper bg-oat py-28 text-ink md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <Eyebrow light>Honest pricing</Eyebrow>
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight md:text-5xl">
            Flat pricing. No tiers. No "contact us."
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink/65">
            One card, because there's one price. The absence of a pricing grid is the point.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative mx-auto max-w-2xl overflow-hidden border border-ink/15 bg-[#efe7d6] p-8 md:p-12">
            {/* scan beam */}
            {scanState === "scanning" && (
              <div
                aria-hidden="true"
                className="scan-beam pointer-events-none absolute -top-72 left-0 h-72 w-full bg-gradient-to-b from-transparent to-slate/25"
              />
            )}

            <TapeRule onPaper />
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50">One-time setup</p>
                <p className="mt-2 font-mono text-4xl tabular-nums">
                  $250<span className="text-xl text-ink/50">–$1,000</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Scoping, configuration, and your data moved in. Sized to the job, agreed up front.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50">Flat monthly</p>
                <p className="mt-2 font-mono text-4xl tabular-nums">
                  $99<span className="text-xl text-ink/50">–$249/mo</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Everything included. Every feature, every site, every staff member. No gating.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <TapeRule onPaper />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-ink/70">
              <span>14-day free trial, no card.</span>
              <span>Annual? Two months free.</span>
              <span>Cancel anytime; your data leaves with you.</span>
            </div>

            {/* the one playful moment on the page */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <button
                type="button"
                onClick={scan}
                disabled={scanState !== "idle"}
                aria-pressed={scanState === "done"}
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.15em] uppercase text-ink/60 transition-colors duration-150 hover:text-ink disabled:cursor-default"
              >
                <span
                  className={`relative h-5 w-9 rounded-full border transition-colors duration-200 ${
                    scanState === "done" ? "border-slate bg-slate" : "border-ink/40"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all duration-200 ${
                      scanState === "done" ? "left-[18px] bg-oat" : "left-[3px] bg-ink/50"
                    }`}
                  />
                </span>
                Look for the hidden fees
              </button>
              <span
                role="status"
                className={`-rotate-2 border-2 px-3 py-1 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-opacity duration-200 ${
                  scanState === "done" ? "border-slate text-slate opacity-100" : "border-transparent text-transparent opacity-0"
                }`}
              >
                {scanState === "done" ? "None." : ""}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
