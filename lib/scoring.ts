/**
 * Scoring algorithm for Sense of Scale.
 *
 * Uses a ratio-based power function for a steep curve that
 * heavily rewards precision. The ratio (smaller/larger) is
 * raised to a power, making the dropoff aggressive.
 *
 * score = 100 * (min(guess, actual) / max(guess, actual)) ^ 2.5
 *
 * Examples (for an answer of $10B):
 *   $10B   → 100 pts (perfect)
 *   $9.5B  → 89 pts  (5% off)
 *   $9B    → 77 pts  (10% off)
 *   $8B    → 57 pts  (20% off)
 *   $7B    → 41 pts  (30% off)
 *   $5B    → 18 pts  (2x off)
 *   $1B    → 1 pt    (10x off)
 *
 * Within 5% scores at least double within 30%.
 */

const POWER = 2.5;

export function calculateScore(guess: number, actual: number): number {
  if (guess <= 0 || actual <= 0) return 0;

  const ratio = Math.min(guess, actual) / Math.max(guess, actual);
  const score = 100 * Math.pow(ratio, POWER);

  return Math.max(0, Math.round(score));
}

export function scoreLabel(score: number): string {
  if (score >= 85) return "Amazing!!";
  if (score >= 65) return "Good guess!";
  if (score >= 45) return "Not bad!";
  if (score >= 20) return "In the ballpark";
  if (score >= 5) return "Oof.";
  return "Ouch. Tough one.";
}

export function formatNumber(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}
