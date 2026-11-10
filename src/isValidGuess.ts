import type { NumberBase } from "./generateSecret.ts";

export const isValidGuess = (
  guess: string,
  length: number,
  base: NumberBase,
): boolean => {
  throw new Error(guess + length + base);
};
