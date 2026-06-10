import { motion } from "framer-motion";
import { useReduceMotion } from "../lib/useReduceMotion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-entry reveal: rise 16px + fade, once per element. Static under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p";
}) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Mono eyebrow label with a brass tick — the drafting voice. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-mono text-xs tracking-[0.25em] uppercase ${
        light ? "text-slate" : "text-brass"
      }`}
    >
      <span aria-hidden="true" className="mr-3 inline-block h-3 w-px translate-y-0.5 bg-current" />
      {children}
    </p>
  );
}
