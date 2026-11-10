import { DIGITS, type NumberBase } from "./generateSecret.ts";

export const isValidGuess = (
  guess: string,
  length: number,
  base: NumberBase,
): boolean => {
  if (guess.length !== length) return false;
  const guessChars = guess.split("");
  const uniqueSize = new Set(guessChars).size;
  if (uniqueSize !== length) return false;
  const digits = DIGITS[base];
  return !guessChars.some((c) => !digits.includes(c));
};
