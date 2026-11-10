import { evaluateGuess, type GuessResult } from "./evaluateGuess.ts";
import { useSettings } from "./useSettings.ts";

type UserMove = {
  playerName: string;
  guess: string;
  result: GuessResult;
};

export const useGameMaster = () => {
  let settings = useSettings();
  let moves: UserMove[] = [];
  let activePlayer = settings.player1Name;
  let gameOver = false;

  const switchPlayer = () => {
    if (activePlayer === settings.player1Name) {
      activePlayer = settings.player2Name;
    } else {
      activePlayer = settings.player1Name;
    }
  };

  const makeMove = (guess: string) => {
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
    settings = useSettings();
    moves = [];
    gameOver = false;
  };

  return { settings, moves, gameOver, makeMove, reset };
};
