import { generateSecret, type NumberBase } from "./generateSecret.ts";
import { countPossibleSecrets } from "./countPossibleSecrets.ts";

export type SettingsOptions = {
  base: NumberBase;
  length: number;
  secretGenerator: typeof generateSecret;
};

export const useSettings = (
  options: SettingsOptions = {
    base: "bin",
    length: 2,
    secretGenerator: generateSecret,
  },
) => {
  let base: NumberBase = options.base;
  let secretLength: number = options.length;
  let secret: string = options.secretGenerator(secretLength, base);
  let possibleSecrets = countPossibleSecrets(secretLength, base);

  const player1Name = "player 1";
  const player2Name = "player 2";

  const regenSecret = () => {
    secret = options.secretGenerator(secretLength, base);
    possibleSecrets = countPossibleSecrets(secretLength, base);
  };

  const setBase = (newBase: NumberBase) => {
    base = newBase;
    regenSecret();
  };

  const setSecretLength = (newLength: number) => {
    secretLength = newLength;
    regenSecret();
  };

  return {
    get base() {
      return base;
    },
    get secret() {
      return secret;
    },
    get secretLength() {
      return secretLength;
    },
    get possibleSecrets() {
      return possibleSecrets;
    },
    player1Name,
    player2Name,
    regenSecret,
    setBase,
    setSecretLength,
  };
};
