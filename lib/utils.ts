import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toArray = <T>(value: T | T[] | undefined) =>
  Array.isArray(value) ? value : value === undefined ? undefined : [value];
