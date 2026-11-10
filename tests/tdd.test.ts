import { describe, expect, test, it } from "vitest";
import { generateSecret } from "../src/generateSecret";
import { evaluateGuess, type GuessResult } from "../src/evaluateGuess";

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
});
test("test it works", () => {
  expect(1).toBe(1);
});
