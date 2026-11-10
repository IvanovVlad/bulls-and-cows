import { evaluateGuess, type GuessResult } from "./evaluateGuess.ts";
import { useSettings } from "./useSettings.ts";
import { createDigitValidator } from "./createDigitValidator.ts";
import { DIGITS, type NumberBase } from "./generateSecret.ts";

export type UserMove = {
  playerName: string;
  guess: string;
  result: GuessResult;
};

export const useGameMaster = () => {
  const settings = useSettings();
  let moves: UserMove[] = [];
  let activePlayer = settings.player1Name;
  let gameOver = true;

  const switchPlayer = () => {
    if (activePlayer === settings.player1Name) {
      activePlayer = settings.player2Name;
    } else {
      activePlayer = settings.player1Name;
    }
  };

  const makeMove = (guess: string) => {
    guess = guess.toLowerCase();
    if (moves.some((m) => m.guess === guess)) return;
    const result = evaluateGuess(settings.secret, guess);
    moves = [...moves, { playerName: activePlayer, guess, result }];

    if (checkWin(result, settings.secretLength)) {
      gameOver = true;
      return;
    }

    switchPlayer();
  };

  const checkWin = (result: GuessResult, length: number): boolean => {
    return result.bulls.length === length;
  };

  const reset = () => {
    settings.regenSecret();
    moves = [];
    activePlayer = settings.player1Name;
    gameOver = false;
  };

  const stop = () => {
    gameOver = true;
  };

  const changeBase = (base: NumberBase) => {
    settings.setSecretLength(
      Math.min(settings.secretLength, DIGITS[base].length),
    );
    settings.setBase(base);
  };

  const changeLength = (length: number) => {
    settings.setSecretLength(length);
  };

  return {
    get settings() {
      return settings;
    },
    get moves() {
      return moves;
    },
    get gameOver() {
      return gameOver;
    },
    get inputValidator() {
      return createDigitValidator(settings.base);
    },
    makeMove,
    stop,
    changeBase,
    changeLength,
    reset,
  };
};
