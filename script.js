lconst puzzle = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const moveCountEl = document.getElementById("moveCount");
const timerEl = document.getElementById("timer");
const bestTimeEl = document.getElementById("bestTime");
const victoryMessage = document.getElementById("victoryMessage");

let tiles = [];
let moveCount = 0;
let timerInterval = null;
let secondsElapsed = 0;

const solvedState = [1,2,3,4,5,6,7,8,null];
let bestTime = localStorage.getItem("bestTime") || null;

function initPuzzle(state = solvedState) {
  puzzle.innerHTML = "";
  tJKLiles = [...state];
  tiles.forEach((val, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (val === null) {
      tile.classList.add("empty");
    } else {
      tile.textContent = val;
      tile.addEventListener("click", () => handleTileClick(index));
    }
    puzzle.appendChild(tile);
  });
}

function handleTileClick(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = getValidMoves(emptyIndex);

  if (validMoves.includes(index)) {
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    moveCount++;
    updatePuzzle();
    checkVictory();
  }
}

function getValidMoves(emptyIndex) {
  const moves = [];
  const row = Math.floor(emptyIndex / 3);
  const col = emptyIndex % 3;

  if (row > 0) moves.push(emptyIndex - 3);
  if (row < 2) moves.push(emptyIndex + 3);
  if (col > 0) moves.push(emptyIndex - 1);
  if (col < 2) moves.push(emptyIndex + 1);

  return moves;
}

function updatePuzzle() {
  initPuzzle(tiles);
  moveCountEl.textContent = moveCount;
}

function checkVictory() {
  if (tiles.join() === solvedState.join()) {
    victoryMessage.classList.remove("hidden");
    clearInterval(timerInterval);

    if (!bestTime || secondsElapsed < bestTime) {
      bestTime = secondsElapsed;
      localStorage.setItem("bestTime", bestTime);
      displayBestTime();
    }
  }
}

function resetPuzzle() {
  moveCount = 0;
  secondsElapsed = 0;
  victoryMessage.classList.add("hidden");
  clearInterval(timerInterval);
  timerEl.textContent = formatTime(secondsElapsed);
  initPuzzle();
  moveCountEl.textContent = moveCount;
}

function shufflePuzzle() {
  let shuffled;
  do {
    shuffled = [...solvedState].sort(() => Math.random() - 0.5);
  } while (!isSolvable(shuffled) || shuffled.join() === solvedState.join());

  moveCount = 0;
  secondsElapsed = 0;
  clearInterval(timerInterval);
  startTimer();

  victoryMessage.classList.add("hidden");
  initPuzzle(shuffled);
  moveCountEl.textContent = moveCount;
}

function isSolvable(array) {
  const arr = array.filter(n => n !== null);
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTimer() {
  timerEl.textContent = formatTime(secondsElapsed);
  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerEl.textContent = formatTime(secondsElapsed);
  }, 1000);
}

function displayBestTime() {
  bestTimeEl.textContent = bestTime ? formatTime(bestTime) : "--:--";
}

// Event listeners
shuffleBtn.addEventListener("click", shufflePuzzle);
resetBtn.addEventListener("click", resetPuzzle);

// Initial setup
initPuzzle();
displayBestTime();
