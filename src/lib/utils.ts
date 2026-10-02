import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTerminalOutput(text: string) {
  // Simple ansi-to-html or color formatting could go here for static terminal logs
  return text;
}
