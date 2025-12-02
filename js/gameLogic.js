import { addMoveToHistory } from "./utils.js";
import { renderHints } from "./btns/btnGame.js";
import { state, triggerUIUpdate } from './state.js';

const GRID_COLUMNS = 9;

function handleGameFieldClick(evt) {
  const cell = evt.target.closest("[data-index]");
  
  if (!cell) return;

  const index = parseInt(cell.getAttribute("data-index"), 10); // индекс ячейки

  const { grid } = state;

  if (!grid[index]) return; // Если ячейка пуста ничего не делаю

  const { firstClick, secondClick } = state;

  if (firstClick === null) {
    state.firstClick = index;
    state.selectedCells.push(index);
    cell.classList.add("selected");
  } else if (secondClick === null) {
    if (index === firstClick) {
      // Отмена первого выделения
      cell.classList.remove("selected");
      state.firstClick = null;
      state.selectedCells.length = 0;
    } else {
      // Второе выделение
      state.secondClick = index;
      state.selectedCells.push(index);
      cell.classList.add("selected");
    }
  } else {
    // Третье выделение - сбрасываю предыдущее и начинаю новое
    resetSelection(state);
    state.firstClick = index;
    state.selectedCells.push(index);
    cell.classList.add("selected");
  }

  // Если выбрано две ячейки, запускаю их обработку
  if (state.selectedCells.length === 2) {
    processSelection();
  }
}

function processSelection() {
  const { selectedCells, grid } = state;
  const [index1, index2] = selectedCells;

  const value1 = grid[index1];
  const value2 = grid[index2];
  const scoreBeforeMove = state.score;

  // Проверка возможности соединить ячейки
  if (!areaCellsAdjacent(index1, index2, grid)) {
    console.log("Ячейки не являются смежными");
    resetSelection();
    return triggerUIUpdate();
  }

  // Проверка валидности пары
  const { isValid, points } = validatePair(value1, value2);

  if (!isValid) {
    console.log("Пара не валидна");
    resetSelection();
    return triggerUIUpdate();
  }

  //  Пара валидна: удаляю ячейки, начисляю очки
  console.log(`Пара валидна! Начислено ${points} очков.`);
  grid[index1] = "";
  grid[index2] = "";
  state.score = scoreBeforeMove + points;

  state.hasRevertedLastMove = false;

  if (state.hintsActive) {
    state.hintsActive = false;
    renderHints([], false);
  }

  addMoveToHistory(state, index1, index2, value1, value2, points); // записываю ход в историю
  resetSelection(); // Сбрасываю после успешной обработки

  return triggerUIUpdate();
}

function resetSelection() {
  document
    .querySelectorAll(".cell.selected")
    .forEach((cell) => cell.classList.remove("selected"));
  state.firstClick = null;
  state.secondClick = null;
  state.selectedCells.length = 0;
  triggerUIUpdate();
}

function getSortIndex(index1, index2) {
  const [idxA, idxB] = [index1, index2].sort((a, b) => a - b);
  const indexOne = idxA;
  const indexTwo = idxB;
  return [indexOne, indexTwo];
}

function areaCellsAdjacent(index1, index2, grid) {
  const [indexOne, indexTwo] = getSortIndex(index1, index2);

  const { row: row1, col: col1 } = getRowCol(indexOne);
  const { row: row2, col: col2 } = getRowCol(indexTwo);

  // Проверка прямого соседства (горизонталь/вертикаль)
  const isAdjacentVertically = Math.abs(row1 - row2) === 1 && col1 === col2;
  const isAdjacentHorizontally = Math.abs(col1 - col2) === 1 && row1 === row2;

  if (isAdjacentVertically || isAdjacentHorizontally) {
    return true;
  }

  // Проверка на соседство в одной строке через пустые ячейки
  if (row1 === row2) {
    const start = Math.min(indexOne, indexTwo) + 1;
    const end = Math.max(indexOne, indexTwo);
    for (let i = start; i < end; i += 1) {
      if (grid[i]) return false; //если между ячейками есть не пустая ячейка
    }
    return true;
  }

  // Проверка на соседство в одном стобце через пустые ячейки
  if (col1 === col2) {
    const startRow = Math.min(row1, row2) + 1;
    const endRow = Math.max(row1, row2);
    for (let i = startRow; i < endRow; i += 1) {
      const cellIndex = i * GRID_COLUMNS + col1;
      // console.log('cellIndex: ', cellIndex);
      if (grid[cellIndex]) return false;
    }
    return true;
  }

  // Проверка на границу между строками
  const upperRow = Math.min(row1, row2);
  const lowerRow = Math.max(row1, row2);
  const lastInUpperRow = findLastNonEmptyCellInRow(upperRow, grid);
  const firstInLowerRow = findFirstNonEmptyCellInRow(lowerRow, grid);

  if (
    (indexOne === lastInUpperRow && indexTwo === firstInLowerRow) ||
    (indexTwo === lastInUpperRow && indexOne === firstInLowerRow)
  ) {
    const start = Math.min(indexOne, indexTwo) + 1;
    const end = Math.max(indexOne, indexTwo);
    for (let i = start; i < end; i += 1) {
      if (grid[i]) return false; //если между ячейками есть не пустая ячейка
    }
    return true;
  }

  return false;
}

// функция валидации пар и подсчета очков
function validatePair(num1, num2) {
  if (num1 === null || num2 === null) return { isValid: false, points: 0 };

  const isIdentical = num1 === num2;
  const sumToTen = num1 + num2 === 10;

  if (isIdentical && num1 === 5) {
    return { isValid: true, points: 3 }; // Бонус за двойную пятерку
  }
  if (isIdentical) {
    return { isValid: true, points: 1 }; // Одинаковые числа
  }
  if (sumToTen) {
    return { isValid: true, points: 2 }; // Сумма 10
  }

  return { isValid: false, points: 0 };
}

function getRowCol(index) {
  return {
    row: Math.floor(index / GRID_COLUMNS),
    col: index % GRID_COLUMNS,
  };
}

function findLastNonEmptyCellInRow(row, grid) {
  for (let col = GRID_COLUMNS - 1; col >= 0; col -= 1) {
    const index = row * GRID_COLUMNS + col;

    if (grid[index]) {
      return index;
    }
  }
  return null; // Ряд пуст
}

function findFirstNonEmptyCellInRow(row, grid) {
  for (let col = 0; col < GRID_COLUMNS; col += 1) {
    const index = row * GRID_COLUMNS + col;
    if (grid[index]) {
      return index;
    }
  }
  return null;
}

export { validatePair, areaCellsAdjacent, resetSelection, handleGameFieldClick }