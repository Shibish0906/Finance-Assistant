/**
 * lib/utils.ts
 *
 * Small utility helpers used across the UI (class merging, formatting, etc.).
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge clsx strings safely with tailwind-merge to avoid conflicting classes.
export function cn(...inputs: Array<string | number | boolean | undefined | null>) {
  return twMerge(clsx(inputs));
}

// Basic currency formatter (USD). Replace/extend for localization if needed.
// Currency formatting was removed from this helper because the app
// currently formats currency inline where needed. If you want a
// centralized formatter again, re-add with localization support.