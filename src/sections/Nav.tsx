import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#how", label: "How we build" },
  { href: "#pricing", label: "Pricing" },
  { href: "#story", label: "Story" },
];

function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-0.5 font-display text-xl font-semibold tracking-tight text-chalk">
      Saasp
      {/* the "o" is a small hub-and-spoke glyph */}
      <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-px h-[0.72em] w-[0.72em] translate-y-[0.08em]">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#c8923d" strokeWidth="2" />
        <g stroke="#c8923d" strokeWidth="1.6" strokeLinecap="round">
          <line x1="12" y1="12" x2="12" y2="3.5" />
          <line x1="12" y1="12" x2="19.4" y2="16.2" />
          <line x1="12" y1="12" x2="4.6" y2="16.2" />
        </g>
        <circle cx="12" cy="12" r="2.4" fill="#c8923d" />
      </svg>
      ke
    </a>
  );
}

export function Nav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !!reduce || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-rule bg-ink/95 backdrop-blur-sm" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Wordmark />
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-wipe text-sm text-chalk/75 hover:text-chalk">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-ember/80 px-5 py-2 text-sm font-medium text-chalk transition-colors duration-150 hover:bg-ember hover:text-ink"
          >
            Start a conversation
          </a>
        </div>
        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-rule bg-ink px-5 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base text-chalk/85"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block rounded-full bg-ember px-6 py-3 text-sm font-medium text-ink"
          >
            Start a conversation
          </a>
        </div>
      )}
    </header>
  );
}
