// Create Html Elements USing Js
let MainDiv = document.createElement("div");
MainDiv.className = "board"; //Player_OX
MainDiv.id = "board";
document.body.appendChild(MainDiv);
// Create a for Loop for 9 Cells
for (let i = 1; i <= 9; i++) {
  let Cells = document.createElement("div");
  Cells.className = "cell";
  Cells.setAttribute("data-cell", "");
  MainDiv.appendChild(Cells);
}
let Winning__message = document.createElement("div");
Winning__message.className = "winning-message";
Winning__message.id = "winningMessage";

let GetDataWinningText = document.createElement("div");
GetDataWinningText.setAttribute("data-winning-message", "");
// GetDataWinningText.innerHTML = "X's Wins!";
let CreateButton = document.createElement("button");
CreateButton.id = "restartButton";
CreateButton.textContent = "Restart";
// Append
MainDiv.appendChild(Winning__message);
Winning__message.appendChild(GetDataWinningText);
Winning__message.appendChild(CreateButton);

// Get all Ids and Data variables
let cellElements = document.querySelectorAll("[data-cell]");
let $board = document.getElementById("board");
let Show_winningMessage = document.getElementById("winningMessage");
let Show_data_message = document.querySelector("[data-winning-message]");
let Restart = document.getElementById("restartButton");

console.log(cellElements);
console.log($board);
console.log(Show_data_message);
console.log(Show_winningMessage);
console.log(Restart);
let Cell_X = "X";
let Cell_O = "O";
let playerX = "Player_X";
let playerO = "Player_O";
let CircleTurn;
let WinningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// Variables End----
// Functions Starts

startGame();
Restart.addEventListener("click", startGame);
function startGame() {
  CircleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(Cell_X);
    cell.classList.remove(Cell_O);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  hoverEffect();
  Winning__message.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentTurn = CircleTurn ? Cell_O : Cell_X;
  playMake(cell, currentTurn);
  if (CheckWins(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    hoverEffect();
  }
}
function playMake(cell, currentTurn) {
  cell.classList.add(currentTurn);
}
function swapTurn() {
  CircleTurn = !CircleTurn;
}
function hoverEffect() {
  $board.classList.remove(playerX);
  $board.classList.remove(playerO);
  if (CircleTurn) {
    $board.classList.add(playerO);
  } else {
    $board.classList.add(playerX);
  }
}

function CheckWins(currentTurn) {
  return WinningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentTurn);
    });
  });
}

function endGame(draw) {
  if (draw) {
    Show_data_message.innerText = "Draw";
  } else {
    Show_data_message.innerText = `${CircleTurn ? "O's" : "X's"}Wins!!!`;
  }
  Winning__message.classList.add("show");
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(Cell_X) || cell.classList.contains(Cell_O);
  });
}
