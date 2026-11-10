import "./style.css";
import { useGameMaster, type UserMove } from "./useGameMaster.ts";
import { isValidGuess } from "./isValidGuess.ts";
import { DIGITS, type NumberBase } from "./generateSecret.ts";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app container not found");

const gameMaster = useGameMaster();
let startedAt: number | null = null;
let finishedAt: number | null = null;
let message = "";

const MODE_OPTIONS: { value: NumberBase; label: string }[] = [
  { value: "bin", label: "Binary" },
  { value: "oct", label: "Octal" },
  { value: "dec", label: "Decimal" },
  { value: "hex", label: "Hexadecimal" },
];

const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string,
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  return element;
};

const title = createElement("h1", "Bulls and Cows");
const newGameButton = createElement("button", "New Game");
const resetButton = createElement("button", "Stop");
const toolbar = createElement("div");
toolbar.className = "toolbar";
toolbar.append(newGameButton, resetButton);

const modeLabel = createElement("label", "Mode:");
const modeSelect = createElement("select");
modeSelect.id = "mode-select";
modeLabel.htmlFor = modeSelect.id;
for (const { value, label } of MODE_OPTIONS) {
  const option = createElement("option", label);
  option.value = value;
  modeSelect.append(option);
}

const lengthLabel = createElement("label", "Length:");
const lengthInput = createElement("input");
lengthInput.id = "length-input";
lengthInput.type = "number";
lengthInput.min = "1";
lengthLabel.htmlFor = lengthInput.id;

const settingsRow = createElement("div");
settingsRow.className = "settings-row";
settingsRow.append(modeLabel, modeSelect, lengthLabel, lengthInput);

const inputLabel = createElement("label", "Input:");
const input = createElement("input");
input.id = "guess-input";
input.type = "text";
input.autocomplete = "off";
inputLabel.htmlFor = input.id;
const submitButton = createElement("button", "OK");
submitButton.type = "submit";
const inputForm = createElement("form");
inputForm.className = "input-row";
inputForm.append(inputLabel, input, submitButton);

const table = createElement("table");
table.className = "moves";
const tableHead = createElement("thead");
const headRow = createElement("tr");
headRow.append(
  createElement("th"),
  createElement("th", "Player"),
  createElement("th", "Guess"),
  createElement("th", "Result"),
);
tableHead.append(headRow);
const tableBody = createElement("tbody");
table.append(tableHead, tableBody);

const statusText = createElement("span");
const timeText = createElement("span");
const statusBar = createElement("div");
statusBar.className = "status-bar";
statusBar.append(statusText, timeText);
const possibleSecrets = createElement("div");

app.replaceChildren(
  title,
  toolbar,
  settingsRow,
  inputForm,
  table,
  statusBar,
  possibleSecrets,
);

const formatResult = (move: UserMove): string =>
  `${move.result.bulls.length} BULL ${move.result.cows.length} COW`;

const formatElapsed = (): string => {
  if (startedAt === null) return "0.0";
  const end = finishedAt ?? Date.now();
  return ((end - startedAt) / 1000).toFixed(1);
};

const renderTime = () => {
  timeText.textContent = `Used ${formatElapsed()} s.`;
};

const renderPossibleSecrets = () => {
  possibleSecrets.textContent = `Possible secrets: ${gameMaster.settings.possibleSecrets}`;
};

const rerender = () => {
  const { moves, gameOver } = gameMaster;

  tableBody.replaceChildren(
    ...moves.map((move, index) => {
      const row = createElement("tr");
      row.append(
        createElement("td", String(index + 1)),
        createElement("td", move.playerName),
        createElement("td", move.guess),
        createElement("td", formatResult(move)),
      );
      return row;
    }),
  );

  modeSelect.value = gameMaster.settings.base;
  lengthInput.max = String(DIGITS[gameMaster.settings.base].length);
  lengthInput.value = String(gameMaster.settings.secretLength);

  input.disabled = gameOver;
  submitButton.disabled = gameOver;
  modeSelect.disabled = !gameOver;
  lengthInput.disabled = !gameOver;
  statusText.textContent = message;
  renderTime();
  renderPossibleSecrets();
};

const startRound = () => {
  startedAt = Date.now();
  finishedAt = null;
  message = "";
  input.value = "";
  rerender();
};

inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (gameMaster.gameOver) return;

  const guess = input.value.trim().toLowerCase();
  const { base, secretLength } = gameMaster.settings;
  if (!isValidGuess(guess, secretLength, base)) {
    message = `Invalid guess`;
    rerender();
    return;
  }

  gameMaster.makeMove(guess);
  input.value = "";
  if (gameMaster.gameOver) {
    finishedAt = Date.now();
    message = "You win! :)";
  } else {
    message = "";
  }
  rerender();
});

inputForm.addEventListener("beforeinput", (e) => {
  if (!e.inputType.startsWith("insert") || e.data === null) return;
  if (
    !gameMaster.inputValidator(e.data) ||
    (e.target as HTMLInputElement).value.length >=
      gameMaster.settings.secretLength
  ) {
    e.preventDefault();
  }
});

newGameButton.addEventListener("click", () => {
  gameMaster.reset();
  startRound();
});

resetButton.addEventListener("click", () => {
  gameMaster.stop();
  if (finishedAt === null) finishedAt = Date.now();
  rerender();
});

window.setInterval(() => {
  if (finishedAt === null) renderTime();
}, 100);

modeSelect.addEventListener("change", () => {
  gameMaster.changeBase(modeSelect.value as NumberBase);
  rerender();
});

lengthInput.addEventListener("change", () => {
  const length = Number(lengthInput.value);
  const max = DIGITS[gameMaster.settings.base].length;
  if (!Number.isInteger(length) || length < 1 || length > max) {
    message = `Length must be from 1 to ${max}`;
    rerender();
    return;
  }
  gameMaster.changeLength(length);
  rerender();
});

rerender();
input.focus();
