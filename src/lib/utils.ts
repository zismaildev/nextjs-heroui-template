import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to elegantly merge Tailwind CSS classes, resolving conflicts automatically.
 * It combines the capabilities of `clsx` (for conditional classes) and `tailwind-merge` (for conflict resolution).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
