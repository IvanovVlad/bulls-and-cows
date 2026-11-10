import { DIGITS, type NumberBase } from "./generateSecret.ts";

const memo = new Map<string, number>();

export const countPossibleSecrets = (
  length: number,
  base: NumberBase,
): number => {
  const key = base + length;

  const memoCount = memo.get(key);
  if (memoCount !== undefined) return memoCount;

  const digitsSize = DIGITS[base].length;
  const count = computeCount(length, digitsSize);
  memo.set(key, count);
  return count;
};

const computeCount = (length: number, size: number): number => {
  if (length === 0) return 1;
  if (size < length) return 0;
  return size * computeCount(length - 1, size - 1);
};
