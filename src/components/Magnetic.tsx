import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

/**
 * Magnetic pull for the ONE primary CTA (restraint guardrail §8).
 * Translates toward the cursor within the element's bounds, springs back on leave.
 * No-op on touch and under reduced motion.
 */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0, 0)";
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 360);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
