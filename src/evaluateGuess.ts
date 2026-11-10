export type GuessResult = {
  bulls: string;
  cows: string;
};

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  return secret.split("").reduce(
    (acc, v, i) => {
      if (guess[i] === v) {
        acc.bulls += v;
      } else if (guess.includes(v)) {
        acc.cows += v;
      }
      return acc;
    },
    { bulls: "", cows: "" },
  );
};
