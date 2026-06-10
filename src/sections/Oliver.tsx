import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Reveal, Eyebrow } from "../components/Reveal";
import { TapeRule } from "../components/TapeRule";

const FEATURES = [
  "Real-time ratio dashboard for every classroom",
  "Call-out tracking that suggests who can cover",
  "Break rules enforced before they're a violation",
  "Every site on one screen — no driving between buildings",
];

/** VA two-year-old classroom standard: 1 teacher per 8 children. */
const RATIO = 8;

function Stepper({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-ink/70">{label}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-150 hover:bg-ink/5 disabled:opacity-30"
        >
          <Minus size={16} />
        </button>
        <span className="w-10 text-center font-mono text-xl text-ink tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-150 hover:bg-ink/5 disabled:opacity-30"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export function Oliver() {
  const [children, setChildren] = useState(14);
  const [teachers, setTeachers] = useState(2);
  const required = Math.ceil(children / RATIO);
  const compliant = teachers >= required;

  return (
    <section id="oliver" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>The proof</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-medium leading-tight text-chalk md:text-5xl">
            Meet Oliver.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk/70">
            A scheduling and ratio-compliance tool built for preschool directors — because the
            founder was one.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 flex shrink-0 items-end gap-[3px]">
                  <span className="h-3 w-px bg-brass" />
                  <span className="h-2 w-px bg-rule" />
                </span>
                <span className="text-base leading-relaxed text-chalk/85">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-xs leading-relaxed tracking-wide text-chalk/50">
            Deployed as a single file, usable on any device, no IT required. Live at Bright
            Beginnings Preschool, Charlottesville, VA.
          </p>
        </Reveal>

        {/* the mini ratio demo — user-driven, shows the value in five seconds */}
        <Reveal delay={0.1}>
          <div className="on-paper rounded-md bg-oat p-7 text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] md:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/50">
                Oliver · Ratio check
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink/50">
                Room 2 — Two-year-olds
              </p>
            </div>
            <TapeRule onPaper className="mt-4" />

            <div className="mt-7 flex flex-col gap-5">
              <Stepper label="Children present" value={children} setValue={setChildren} min={1} max={24} />
              <Stepper label="Teachers on the floor" value={teachers} setValue={setTeachers} min={1} max={4} />
            </div>

            <div
              role="status"
              className={`mt-8 rounded-sm border-2 p-5 transition-colors duration-200 ${
                compliant ? "border-slate bg-slate/10" : "border-ember bg-ember/10"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className={`font-mono text-sm font-bold tracking-[0.2em] uppercase ${
                    compliant ? "text-slate" : "text-ember"
                  }`}
                >
                  {compliant ? "In ratio" : "Over ratio"}
                </span>
                <span className="font-mono text-sm text-ink/70 tabular-nums">
                  {children} : {teachers} · needs {required}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {compliant
                  ? `Virginia requires 1 teacher per ${RATIO} two-year-olds. You're covered${
                      teachers > required ? " — with room to send someone on break" : ""
                    }.`
                  : `Virginia requires 1 teacher per ${RATIO} two-year-olds. You need ${
                      required - teachers
                    } more teacher${required - teachers > 1 ? "s" : ""} in this room — Oliver would already be suggesting who.`}
              </p>
            </div>

            <p className="mt-5 font-mono text-[10px] tracking-wide text-ink/45">
              Try it — step the children up past {RATIO * teachers}.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
