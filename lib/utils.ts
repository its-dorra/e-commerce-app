import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toArray = <T>(value: T | T[] | undefined) =>
  Array.isArray(value) ? value : value === undefined ? undefined : [value];

export const catchError = async <T, E extends Error>(
  promise: Promise<T>,
): Promise<[T, undefined] | [undefined, E]> => {
  try {
    const res = await promise;
    return [res, undefined];
  } catch (error) {
    return [undefined, error as E];
  }
};
