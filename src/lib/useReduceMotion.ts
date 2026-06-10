import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

const isServer = typeof window === "undefined";

/**
 * Like framer's useReducedMotion, but returns true during build-time
 * prerendering so the static HTML snapshot is the fully-resolved,
 * motion-free render — real content paints before any JS arrives.
 */
export function useReduceMotion(): boolean {
  const reduce = useFramerReducedMotion();
  return isServer ? true : !!reduce;
}
