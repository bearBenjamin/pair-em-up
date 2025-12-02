import { renderGameScreen } from "../screens/gameScreen/gameScreen.js";
import { resetSelection, areaCellsAdjacent, validatePair } from "../gameLogic.js";
import { showModal } from "../screens/modalScreen.js";

// блок Hints
const NUM_HINTS = 5;
// блок Hints

export function handleBtnGameClick(evt, currentState) {
  switch (evt.target.getAttribute("data-action")) {
    case "hints":
      handleHintBtnClick(currentState);
      break;

    case "backspace":
      handleBackspaceClick(currentState);
      break;

    case "add":
      handleAddClick(currentState);
      break;

    case "shuffle":
      handleShuffleClick(currentState);
      break;

    case "eraser":
      handleEraserClick(currentState);
      break;
  }
}

// начало блока Backspace;
function handleBackspaceClick(currentState) {
  if (currentState.history.length === 0) {
    console.log("История пуста, откат невозможен");
    return;
  }

  if (currentState.hasRevertedLastMove) {
    console.log("Откат уже был использован. Сделайте новый ход.");
    return;
  }

  const lastMove = currentState.history.pop();

  const { cell1Index, cell2Index, cell1Value, cell2Value, pointsScored } =
    lastMove;

  currentState.grid[cell1Index] = cell1Value;
  currentState.grid[cell2Index] = cell2Value;
  currentState.score = currentState.score - pointsScored;

  currentState.hasRevertedLastMove = true;
  resetSelection(currentState);
  renderGameScreen(currentState);
}
// конец блока Backspace;

// начало блока Hints;
function handleHintBtnClick(currentState) {
  const { grid } = currentState;

  if (currentState.assists.hints === 0) {
    showModal("The hints have run out.");
    return;
  }

  currentState.hintsActive = !currentState.hintsActive;

  if (currentState.hintsActive) {
    const hints = getAllHints(grid);

    if (hints.length === 0) {
      showModal("There are no available moves on the field!");
      currentState.hintsActive = false;
      return;
    }

    currentState.assists.hints -= 1;

    renderHints(hints, true);
  }
}

function getAllHints(grid) {
  const currentHints = [];
  const nonEmptyGridIndex = [];

  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i]) {
      nonEmptyGridIndex.push(i);
    }
  }

  for (let i = 0; i < nonEmptyGridIndex.length - 1; i += 1) {
    for (let j = i + 1; j < nonEmptyGridIndex.length; j += 1) {
      const index1 = nonEmptyGridIndex[i];
      const index2 = nonEmptyGridIndex[j];

      const value1 = grid[index1];
      const value2 = grid[index2];

      const { isValid } = validatePair(value1, value2);

      if (isValid) {
        if (areaCellsAdjacent(index1, index2, grid)) {
          currentHints.push([index1, index2]);
        }
      }
    }
  }

  const numberOfElementsToPick = Math.min(NUM_HINTS, currentHints.length);
  const shuffleCurrentHints = shuffleHints(currentHints);

  return shuffleCurrentHints.slice(0, numberOfElementsToPick);
}

export function renderHints(shuffleCurrenHints, isShow) {
  document.querySelectorAll(".cell.hint").forEach((cell) => {
    cell.classList.remove("hint");
  });

  if (!isShow || shuffleCurrenHints.length === 0) {
    return;
  }

  const hintedCells = new Set(shuffleCurrenHints.flat());

  document.querySelectorAll(".cell").forEach((cell) => {
    const index = parseInt(cell.getAttribute("data-index"), 10);
    if (hintedCells.has(index)) {
      cell.classList.add("hint");
    }
  });
}

function shuffleHints(hints) {
  const arr = [...hints];
  let currentIndex = arr.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}
// конец блока Hints;

// начало блока Add;
function handleAddClick(currentState) {
  console.log('currentState: ', currentState);
  const notEmptyGrid = currentState.grid.filter(Boolean);
  const { grid } = currentState;
  console.log('grid: ', grid);
  const newGrid = [...grid, ...notEmptyGrid];
  console.log('newGrid: ', newGrid);
  currentState.grid = newGrid;
  renderGameScreen(currentState);
}
// конец блока Add;


// начало блока Shuffle
function handleShuffleClick(currentState) {
  const newGrid = currentState.grid;
  console.log('newGrid: ', newGrid);
  for (let i = newGrid.length - 1; i > 0; i -= 1) {
     const j = Math.floor(Math.random() * (i + 1));
    [newGrid[i], newGrid[j]] = [newGrid[j], newGrid[i]];
  }
  console.log('newGrid: ', newGrid);
  currentState.grid = newGrid;
  renderGameScreen(currentState);
}
// конец блока Shuffle;

// начало блока Eraser
export function handleEraserClick(currentState) {
  const cellSellected = document.querySelector('.cell.selected');
  const index = cellSellected.getAttribute('data-index');
  currentState.grid[index] = '';
  renderGameScreen(currentState);
}