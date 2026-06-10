import { useState } from "react";
import type { FormEvent } from "react";
import { Reveal, Eyebrow } from "../components/Reveal";
import { Wheel } from "../components/Wheel";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { name: "name", label: "Your name", type: "text", placeholder: "First name is fine" },
  { name: "business", label: "Your business", type: "text", placeholder: "What you run, where" },
  { name: "email", label: "Email", type: "email", placeholder: "So I can write back" },
] as const;

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "A name helps — even just a first one.";
    if (!data.business?.trim()) next.business = "Tell me what you run, in a few words.";
    if (!data.message?.trim()) next.message = "One sentence about what's eating your week is plenty.";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "I need a working email to write back to.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (field: string) =>
    `w-full border-b bg-transparent px-0 py-3 text-base text-chalk placeholder:text-chalk/30 focus:outline-none ${
      errors[field] ? "border-ember" : "border-rule focus:border-brass"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      {/* the wheel returns, small and at rest — closing the loop */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 w-[340px] opacity-25 max-md:hidden">
        <Wheel mode="rest" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Start a conversation</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-medium leading-tight text-chalk md:text-5xl">
              Tell me about your operation.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-chalk/65">
              No pitch deck. Just a conversation about how your business actually works — and
              whether software could give you time back.
            </p>
          </Reveal>

          {status === "sent" ? (
            <div role="status" className="mt-12 border border-brass/50 p-8">
              <p className="font-mono text-sm tracking-wide text-brass">
                Got it — I'll be in touch within a day.
              </p>
              <p className="mt-2 text-sm text-chalk/60">
                In the meantime, the kettle's on and your message is on the bench.
              </p>
            </div>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} noValidate className="mt-12 flex flex-col gap-7">
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-7 sm:grid-cols-2">
                  {FIELDS.slice(0, 2).map((f) => (
                    <div key={f.name}>
                      <label htmlFor={f.name} className="font-mono text-[10px] tracking-[0.25em] uppercase text-chalk/50">
                        {f.label}
                      </label>
                      <input id={f.name} name={f.name} type={f.type} placeholder={f.placeholder} className={inputClass(f.name)} />
                      {errors[f.name] && <p className="mt-1.5 text-xs text-ember">{errors[f.name]}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-[10px] tracking-[0.25em] uppercase text-chalk/50">
                    What's eating your week
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="The thing you keep doing by hand. The spreadsheet that's become a job. Whatever it is."
                    className={inputClass("message")}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-ember">{errors.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="font-mono text-[10px] tracking-[0.25em] uppercase text-chalk/50">
                    Email
                  </label>
                  <input id="email" name="email" type="email" placeholder="So I can write back" className={inputClass("email")} />
                  {errors.email && <p className="mt-1.5 text-xs text-ember">{errors.email}</p>}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="rounded-full bg-ember px-7 py-3.5 text-base font-medium text-ink transition-colors duration-150 hover:bg-[#e26c47] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Start a conversation"}
                  </button>
                  {status === "error" && (
                    <p role="status" className="font-mono text-xs text-ember">
                      That didn't go through. Email me directly instead:{" "}
                      <a href="mailto:robertmhichens@gmail.com" className="underline">
                        robertmhichens@gmail.com
                      </a>
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
