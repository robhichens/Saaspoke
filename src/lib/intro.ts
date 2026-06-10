/**
 * Whether to play the hero load orchestration. If the JS bundle arrived
 * late (slow connection), the prerendered content has already been on
 * screen — re-hiding it to replay an entrance would be a regression,
 * not a flourish. Evaluated once when the main chunk loads.
 */
export const playIntro = typeof window !== "undefined" && performance.now() < 1800;
