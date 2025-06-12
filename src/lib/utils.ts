import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CnInput {
  [key: string]: unknown;
}

export function cn(
  ...inputs: Array<string | number | boolean | null | undefined | CnInput>
): string {
  return twMerge(clsx(inputs));
}
