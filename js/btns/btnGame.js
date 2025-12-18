import { resetSelection, areaCellsAdjacent, validatePair } from "../gameLogic.js";
import { renderMessageModal } from "../screens/modalScreen.js";
import { state, triggerUIUpdate } from '../state.js';
import { addMoveToHistory } from "../utils.js";

// блок Hints
const NUM_HINTS = 5;
// блок Hints

function handleBtnGameClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "hints":
      handleHintBtnClick();
      break;

    case "backspace":
      handleBackspaceClick();
      break;

    case "add":
      handleAddClick();
      break;

    case "shuffle":
      handleShuffleClick();
      break;

    case "eraser":
      handleEraserClick();
      break;
  }
}

// начало блока Backspace;
function handleBackspaceClick() {
  if (state.history.length === 0) {
    console.log("История пуста, откат невозможен");
    return;
  }

  if (state.hasRevertedLastMove) {
    console.log("Откат уже был использован. Сделайте новый ход.");
    return;
  }

  const lastMove = state.history.pop();
  
  switch (lastMove.type) {
    case 'move' : {
      const { cell1Index, cell2Index, cell1Value, cell2Value, pointsScored } = lastMove;
 
      state.grid[cell1Index] = cell1Value;
      state.grid[cell2Index] = cell2Value;
      state.score = state.score - pointsScored;
      break;
    }

    case 'eraser' : {
      const { cell1Index, cell1Value } = lastMove;
      state.grid[cell1Index] = cell1Value;
      state.assists.eraser += 1; // Возвращаем бонус
      break; 
    }

    case 'add' : {
      state.grid = lastMove.oldGrid;
      state.assists.addNumbers += 1;
      break;
    }

    case 'shuffle' : {
      state.grid = lastMove.oldGrid;
      state.assists.shuffle += 1;
      break;
    }
  }

  state.hasRevertedLastMove = true;
  resetSelection();
  //renderGameScreen(state);
  triggerUIUpdate();
}
// конец блока Backspace;

// начало блока Hints;
function handleHintBtnClick() {
  const { grid } = state;

  if (state.assists.hints === 0) {
    renderMessageModal("The hints have run out.");
    return;
  }

  state.hintsActive = !state.hintsActive;
  console.log('state.hintsActive: ', state.hintsActive)

  if (state.hintsActive) {
    const hints = getAllHints(grid);
console.log('hints: ', hints);
    if (hints.length === 0) {
      renderMessageModal("There are no available moves on the field!");
      state.hintsActive = false;
      return;
    }

    state.assists.hints -= 1;

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
function handleAddClick() {
  if (state.assists.addNumbers === 0) return;

  state.history.push({
    type: 'add',
    oldGrid: [...state.grid],
  });

  const notEmptyGrid = state.grid.filter(Boolean);
  const { grid } = state;
  const newGrid = [...grid, ...notEmptyGrid];
  state.grid = newGrid;
  //renderGameScreen(currentState);
  state.assists.addNumbers -= 1;
  state.hasRevertedLastMove = false;
  triggerUIUpdate();
}
// конец блока Add;


// начало блока Shuffle
function handleShuffleClick() {
  if (state.assists.shuffle === 0) return;
  
  const numbers = state.grid.filter(cell => cell !== '');

  if (numbers.length === 0) return;

  state.history.push({
    type: 'shuffle',
    oldGrid: [...state.grid],
  });

  for (let i = numbers.length - 1; i > 0; i -= 1) {
     const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  let numberIndex = 0;
  const newGrid = state.grid.map((cell) => {
    if (cell !== '') {
      const newValue = numbers[numberIndex];
      numberIndex += 1;
      return newValue;
    }
    return cell;
  });
  state.grid = newGrid;
  //renderGameScreen(currentState);
  state.assists.shuffle -= 1;
  state.hasRevertedLastMove = false;
  triggerUIUpdate();
}
// конец блока Shuffle;

// начало блока Eraser
function handleEraserClick() {
  if (state.assists.eraser === 0) return;
  
  /*const cellSellected = document.querySelector('.cell.selected');
  if (cellSellected) {
    const index = cellSellected.getAttribute('data-index');
    state.grid[index] = '';
    state.firstClick = null;
    state.selectedCells = [];
    state.assists.eraser -= 1;
    triggerUIUpdate();
  }*/

  if (state.selectedCells.length > 0) {
    const index = state.selectedCells[0];
    const oldValue = state.grid[index];

    if (oldValue === '') return;

    /*state.history.push({
      type: 'eraser',
      index: index,
      oldValue: oldValue,
    });*/
    addMoveToHistory(state, index, null, oldValue, null, 0, 'eraser');

    state.grid[index] = '';
    state.selectedCells = [];
    state.firstClick = null;
    state.assists.eraser -= 1;
    state.hasRevertedLastMove = false;
    triggerUIUpdate();

  }
}

export { handleEraserClick, handleBtnGameClick, getAllHints };
