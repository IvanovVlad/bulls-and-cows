export type NumberBase = "bin" | "oct" | "dec" | "hex";

export const DIGITS: Record<NumberBase, string> = {
  bin: "01",
  oct: "01234567",
  dec: "0123456789",
  hex: "0123456789abcdef",
};

const MIN_LENGTH = 4;

export const generateSecret = (
  length: number,
  base: NumberBase,
  random: () => number = Math.random,
): string => {
  if (length < MIN_LENGTH) {
    throw new Error(`Length should be more or equal to ${MIN_LENGTH}`);
  }

  const pool = [...DIGITS[base]];

  if (length > pool.length) {
    throw new Error(
      `Length should be less or equal to ${pool.length} for base ${base}`,
    );
  }

  let secret = "";
  for (let i = 0; i < length; i++) {
    const index = Math.min(Math.floor(random() * pool.length), pool.length - 1);
    secret += pool.splice(index, 1)[0];
  }

  return secret;
};
