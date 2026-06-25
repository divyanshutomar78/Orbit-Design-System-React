import { type ClassValue, clsx } from 'clsx';

/** Merge class names — shadcn-style helper for Radix primitive composition. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
