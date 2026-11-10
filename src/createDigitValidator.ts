import type { NumberBase } from "./generateSecret.ts";

export const createDigitValidator = (
  base: NumberBase,
): ((s: string) => boolean) => {
  throw Error(base);
};
