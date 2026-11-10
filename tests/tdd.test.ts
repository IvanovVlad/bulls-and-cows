import { describe, expect, test, it, suite } from "vitest";
import { generateSecret, type NumberBase } from "../src/generateSecret";
import { evaluateGuess, type GuessResult } from "../src/evaluateGuess";
import { isValidGuess } from "../src/isValidGuess";
import { createDigitValidator } from "../src/createDigitValidator";

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
describe("createDigitValidator", () => {
  describe("with 'bin' base", () => {
    const validate = createDigitValidator("bin");

    it("should return true for a string of binary digits", () => {
      expect(validate("0101")).toBe(true);
    });
    it("should return false if string contains a non-binary digit", () => {
      expect(validate("0102")).toBe(false);
    });
  });
  describe("with 'oct' base", () => {
    const validate = createDigitValidator("oct");

    it("should return true for a string of octal digits", () => {
      expect(validate("0127")).toBe(true);
    });
    it("should return false if string contains a non-octal digit", () => {
      expect(validate("0128")).toBe(false);
    });
  });
  describe("with 'dec' base", () => {
    const validate = createDigitValidator("dec");

    it("should return true for a string of decimal digits", () => {
      expect(validate("0129")).toBe(true);
    });
    it("should return false if string contains a non-decimal character", () => {
      expect(validate("01a9")).toBe(false);
    });
  });
  describe("with 'hex' base", () => {
    const validate = createDigitValidator("hex");

    it("should return true for a string of hex digits", () => {
      expect(validate("09af")).toBe(true);
    });
    it("should return false if string contains a non-hex character", () => {
      expect(validate("09g1")).toBe(false);
    });
  });
});
