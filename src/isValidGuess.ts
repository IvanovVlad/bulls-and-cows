import { type NumberBase } from "./generateSecret.ts";
import { createDigitValidator } from "./createDigitValidator.ts";

export const isValidGuess = (
  guess: string,
  length: number,
  base: NumberBase,
): boolean => {
  if (guess.length !== length) return false;
  const guessChars = guess.split("");
  const uniqueSize = new Set(guessChars).size;
  if (uniqueSize !== length) return false;
  const digitValidator = createDigitValidator(base);
  return !guessChars.some((s) => !digitValidator(s));
};
