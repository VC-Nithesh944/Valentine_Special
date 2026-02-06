
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with tailwind-merge and clsx.
 * Note: Since we are using a CDN script for tailwind, we'll implement a simple version
 * if these libraries are not available, but usually they are provided in standard environments.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
