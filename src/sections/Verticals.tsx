import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReduceMotion } from "../lib/useReduceMotion";
import { ArrowRight } from "lucide-react";
import { Wheel } from "../components/Wheel";
import { Reveal, Eyebrow } from "../components/Reveal";
import { VERTICALS } from "../lib/verticals";

export function Verticals() {
  const [selected, setSelected] = useState(0);
  const reduce = useReduceMotion();
  const v = VERTICALS[selected];

  return (
    <section className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <Reveal>
        <Eyebrow>The verticals</Eyebrow>
        <h2 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-tight text-chalk md:text-5xl">
          One hub. A spoke for every kind of family business.
        </h2>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* The wheel, now functional. Hidden as a flat list under reduced motion. */}
        {reduce ? (
          <ul className="flex flex-wrap gap-2" aria-label="Verticals">
            {VERTICALS.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-pressed={i === selected}
                  className={`rounded-full border px-4 py-2 font-mono text-xs tracking-wide uppercase ${
                    i === selected
                      ? "border-brass bg-brass text-ink"
                      : "border-rule text-chalk/60 hover:text-chalk"
                  }`}
                >
                  {item.shortName}
                  {item.status === "live" && " ●"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Wheel
            mode="interactive"
            selected={selected}
            onSelect={setSelected}
            className="mx-auto w-full max-w-[540px]"
          />
        )}

        {/* detail panel */}
        <div aria-live="polite" className="min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={v.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border border-rule p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                {v.status === "live" ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-ember/60 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-ember">
                    <span className="live-pulse h-1.5 w-1.5 rounded-full bg-ember" /> Live
                  </span>
                ) : (
                  <span className="rounded-full border border-rule px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-chalk/60">
                    In the workshop
                  </span>
                )}
              </div>
              <h3 className="font-display mt-5 text-3xl font-medium text-chalk">{v.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-chalk/60">
                {/* lighter slate tint — --slate itself fails AA on ink at this size */}
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#84aba4]">The friction — </span>
                {v.friction}
              </p>
              {v.status === "live" ? (
                <>
                  <p className="mt-4 text-base leading-relaxed text-chalk/80">{v.detail}</p>
                  <a
                    href="#oliver"
                    className="link-wipe mt-6 inline-flex items-center gap-1.5 text-sm text-brass"
                  >
                    Meet Oliver <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </>
              ) : (
                <p className="mt-4 font-mono text-sm text-chalk/50">{v.detail}</p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* keyboard-friendly chip list mirrors the wheel */}
          {!reduce && (
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Choose a vertical">
              {VERTICALS.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wide uppercase transition-colors duration-150 ${
                      i === selected
                        ? "border-brass bg-brass text-ink"
                        : "border-rule text-chalk/50 hover:border-chalk/30 hover:text-chalk"
                    }`}
                  >
                    {item.shortName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
