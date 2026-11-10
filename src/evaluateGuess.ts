export type GuessResult = {
  bulls: string;
  cows: string;
};

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  throw new Error(secret + guess);
};
