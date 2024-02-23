import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function replaceSpacesWithHyphens(value:string) {
  return value.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}