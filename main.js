import "./style.css";

const $ = (selector) => document.querySelector(selector);
const $app = $("#app");

const BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let CURRENT_FOCUS_POSITION = {
  x: 0,
  y: 0,
};

function handleClickCell(event) {
  const el = event.currentTarget;
  const i = el.getAttribute("data-i");
  const j = el.getAttribute("data-j");
  setFocus({ x: +i, y: +j });
}

function setFocus({ x = 0, y = 0 }) {
  const { x: prevX, y: prevY } = CURRENT_FOCUS_POSITION;
  const $currentFocusedCell = $(`#cell-${prevX}-${prevY}`);
  if ($currentFocusedCell) {
    $currentFocusedCell.classList.remove("focus");
  }
  const $cell = $(`#cell-${x}-${y}`);
  if ($cell) {
    $cell.classList.add("focus");
    CURRENT_FOCUS_POSITION = { x, y };
  }
}

function moveFocusByKeyboard() {
  document.addEventListener("keydown", (event) => {
    const { x: currX, y: currY } = CURRENT_FOCUS_POSITION;
    let nextY = null;
    let nextX = null;
    let boardLimitX = null;
    const { key } = event;
    switch (key) {
      case "ArrowLeft":
        nextY = currY - 1;
        if (nextY >= 0) {
          setFocus({ x: currX, y: nextY });
        }
        break;
      case "ArrowRight":
        nextY = currY + 1;
        boardLimitX = BOARD[currX].length;
        if (nextY < boardLimitX) {
          setFocus({ x: currX, y: nextY });
        }
        break;
      case "ArrowUp":
        nextX = currX - 1;
        if (nextX >= 0) {
          setFocus({ x: nextX, y: currY });
        }
        break;
      case "ArrowDown":
        nextX = currX + 1;
        boardLimitX = BOARD[currX].length;
        if (nextX < boardLimitX - 1) {
          setFocus({ x: nextX, y: currY });
        }
        break;
      default:
        break;
    }
  });
}

function initBoard() {
  // create board
  const $board = document.createElement("div");
  $board.id = "board";
  $board.classList.add("board");

  // columns and rows
  const rows = BOARD.length;
  const columns = Math.max(...BOARD.map((row) => row.length)) ?? 4;

  // append board to app
  $app.appendChild($board);

  for (let i = 0; i < BOARD.length; i++) {
    const $row = document.createElement("div");
    $row.classList.add("row");
    $row.id = `row-${i}`;
    $board.appendChild($row);
    for (let j = 0; j < BOARD[i].length; j++) {
      const $cell = document.createElement("div");
      $cell.classList.add("cell");
      $cell.id = `cell-${i}-${j}`;
      $cell.setAttribute("data-i", i);
      $cell.setAttribute("data-j", j);
      $row.appendChild($cell);

      $cell.addEventListener("click", handleClickCell);
    }
  }

  setFocus({ x: 0, y: 0 });

  // keyboard events
  moveFocusByKeyboard();
}

initBoard();
