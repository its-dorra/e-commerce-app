import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export const ADMIN_AUTHENTICATION_ERROR_MESSAGE =
  "You must be an admin to view this content";

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

export const AuthenticationError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const AdminAuthenticationError = class AdminAuthenticationError extends Error {
  constructor() {
    super(ADMIN_AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AdminAuthenticationError";
  }
};

export const MAX_FILE_SIZE = 5000000;

export function checkFileType(file: File, types: string[]) {
  return types.includes(file.type);
}

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
