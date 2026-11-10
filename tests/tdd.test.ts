import { describe, expect, test, it, suite } from "vitest";
import { generateSecret, type NumberBase } from "../src/generateSecret";
import { evaluateGuess, type GuessResult } from "../src/evaluateGuess";
import { isValidGuess } from "../src/isValidGuess";

describe("game logic", () => {
  describe("generate secret", () => {
    it("should return string with dedicated length", () => {
      const expectedLength = 4;

      const result = generateSecret(expectedLength, "dec");

      expect(result.length).toBe(expectedLength);
    });
    it("should throw error if length less then 4", () => {
      expect(() => generateSecret(3, "dec")).toThrow(
        "Length should be more or equal to 4",
      );
    });
    it("should generate non repeating digits", () => {
      const expectedLength = 4;
      const expectedUniqueDigits = 4;

      const result = generateSecret(expectedLength, "dec");

      expect(expectedUniqueDigits).toBe(new Set(result.split("")).size);
    });
  });
  describe("evaluate guess", () => {
    it("should evaluate correctly on example", () => {
      const secret = "4271";
      const guess = "1234";
      const expected: GuessResult = { bulls: "2", cows: "41" };

      const result = evaluateGuess(secret, guess);

      expect(result).toEqual(expected);
    });
  });
  describe("isValidGuess", () => {
    it("should validate correctly", () => {
      const guess = "1234";
      const length = 4;
      const base: NumberBase = "dec";

      const result = isValidGuess(guess, length, base);

      expect(result).toBe(true);
    });
    suite("should return false if length not match", () => {
      const guess = "zxcv";
      const length = 4;

      test("with 'bin' base", () => {
        const base: NumberBase = "bin";

        const result = isValidGuess(guess, length, base);

        expect(result).toBe(false);
      });

      test("with 'oct' base", () => {
        const base: NumberBase = "oct";

        const result = isValidGuess(guess, length, base);

        expect(result).toBe(false);
      });

      test("with 'dec' base", () => {
        const base: NumberBase = "dec";

        const result = isValidGuess(guess, length, base);

        expect(result).toBe(false);
      });

      test("with 'hex' base", () => {
        const base: NumberBase = "hex";

        const result = isValidGuess(guess, length, base);

        expect(result).toBe(false);
      });
    });
    it("should return false if numbers repeating", () => {
      const guess = "1123";
      const length = 4;
      const base: NumberBase = "dec";

      const result = isValidGuess(guess, length, base);

      expect(result).toBe(false);
    });
  });
});
test("test it works", () => {
  expect(1).toBe(1);
});
