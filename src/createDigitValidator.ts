import { DIGITS, type NumberBase } from "./generateSecret.ts";

export const createDigitValidator = (
  base: NumberBase,
): ((char: string) => boolean) => {
  const availableDigits = DIGITS[base];

  return (s: string) => availableDigits.includes(s.toLowerCase());
};
