import { renderResultScreen } from "./screens/resultScreen.js";
import { renderSettingScreen } from "./screens/settingScreen.js";
import { renderStarScreen } from "./screens/startScreen.js";
import { renderGameScreen } from "./screens/gameScreen.js";
import { getGrid } from "./utils.js";

const body = document.body;

let firstClick = null;
let secondClick = null;

export function listenersEvent(state) {
  body.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.closest(".btn-mode-game")) {
      handleBtnModeClick(evt, state);
    }

    if (target.closest(".btn-manager")) {
      handleBtnManagerClick(evt, state);
    }

    if (target.closest(".btn-back-start")) {
      handleBtnBackClik(evt, state);
    }

    if (target.closest('.btn-manager-game')) {
        handleBtnManagerGameClick(evt, state);
    }
    
    if (target.closest('.btn-game')) {
        handleBtnGameClick(evt, state);
    }
    
    if (target.closest('.cell')) {
      handleGameFieldClick(evt, state);
    }
  });

  body.addEventListener("change", (evt) => {
    handleToggleTheme(evt, state);
  });
}

function handleBtnModeClick(evt, state) {
  state.currentScreen = "game";

  switch (evt.target.getAttribute("data-action")) {
    case "open-classic-screen":
      state.mode = "classic";
      state.grid = getGrid(state.mode);
      //state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
      break;

    case "open-random-screen":
      state.mode = "random";
      state.grid = getGrid(state.mode);
      //state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
      break;

    case "open-chaotic-screen":
      state.mode = "chaotic";
      state.grid = getGrid(state.mode);
      //state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
      break;
  }
}

function handleBtnManagerClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      renderSettingScreen(state);
      break;

    case "open-result-screen":
      renderResultScreen(state);
      break;
  }
}

function handleBtnBackClik(state) {
    renderStarScreen(state);
}

function handleBtnManagerGameClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "reset-game":
      console.log("reset");
      break;

    case "continue-game":
      console.log("continue");
      break;

    case "save-game":
      console.log("save");
      break;
  }
}

function handleBtnGameClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "hints":
      console.log("hints"); // пока так
      break;

    case "backspace":
      console.log("backspace");
      break;

    case "add":
      console.log("add");
      break;

    case "shuffle":
      console.log("shuffle");
      break;

    case "eraser":
      console.log("eraser");
      break;
  }
}

function handleToggleTheme(evt, state) {
  if (evt.target.value === "on") {
    return;
  }

  if (evt.target.value === "dark") {
    body.setAttribute("data-theme", "dark");
    state.setting.theme = "dark";
    // console.log('state: ', state);
  } else {
    body.setAttribute("data-theme", "light");
    state.setting.theme = "light";
    // console.log('state: ', state);
  }
}

function handleGameFieldClick(evt, state) {
  const { grid, selectedCells } = state;
  const cell = evt.target;
  const index = parseInt(cell.getAttribute('data-index')); // индекс ячейки
  const value = cell.textContent; // значение ячейки

  if (firstClick === null) {
    firstClick = index;
    cell.classList.add('selected');
    selectedCells.push(firstClick);
  } else if (secondClick === null && index !== firstClick) {
    secondClick = index;
    cell.classList.add('selected');
    selectedCells.push(secondClick);
  } else {
    state.selectedCells = [];
    resetSelection();
    console.log('Сброс выбора');
  }

  // функция обработки двух выбранных ячеек
    console.log('state: ', state);
    console.log('selectedCells: ', selectedCells);
    if (selectedCells.length === 2) {
      const [index1, index2] = selectedCells;
        const isTwoCell = handleTwoCells(index1, index2, grid);

        if (isTwoCell) {
            const [index1, index2] = selectedCells;
            console.log('index1: ', index1);
            console.log('index2: ', index2);
            const isValidNums = validatePair(grid[index1], grid[index2]);
            console.log('isValidNums: ', isValidNums);
            if (isValidNums.isValid) {
                grid[index1] = '';
                grid[index2] = '';
                console.log('state: ', state);
                state.selectedCells = [];
                return renderGameScreen(state);
            }   
        } else {
            state.selectedCells = [];
            return resetSelection();
        }
    }
    
}

function resetSelection() {
    firstClick = null;
    secondClick = null;

    document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
}

function handleTwoCells(index1, index2, grid) {
    // const cellOne= document.querySelector(`[data-index="${firstClick}"]`);
    // const cellTwo = document.querySelector(`[data-index="${secondClick}"]`);

    // const numOne = parseInt(cellOne.textContent);
    // const numTwo = parseInt(cellTwo.textContent);

    // const isValidNums = validatePair(numOne, numTwo);
    // //console.log('isValidNums: ', isValidNums);
    // if (!isValidNums.isValid) {
    //     return resetSelection();
    // }
    const [idxA, idxB] = [index1, index2].sort((a, b) => (a - b));

    const indexOne = idxA;
    const indexTwo = idxB;

    const NUMBER_COLUMNS = 9; 

    function getRowCol(index) {
        const row = Math.floor(index / NUMBER_COLUMNS);
        const col = index % NUMBER_COLUMNS;
        return { row, col };
    }

    const { row: row1, col: col1 } = getRowCol(indexOne); // возвращает значения от 0 до 2 индекс строки
    const { row: row2, col: col2 } = getRowCol(indexTwo); // возвращает значения от 0 до 8 индекс столбца

    // console.log('row1: ', row1);
    // console.log('row2: ', row2);
    // console.log('col1: ', col1);
    // console.log('col2: ', col2);

    // проверка на то смежные или нет ячейки
    let isAdjacent = false;
    const isAdjacentVertically = (Math.abs(row1 - row2) === 1) && (col1 === col2);
    const isAdjacentHorizontally = (Math.abs(col1 - col2) === 1) && (row1 === row2);
    if (isAdjacentVertically || isAdjacentHorizontally) {
        isAdjacent = true;
    }
    console.log('isAdjacent: ', isAdjacent);

    // проверка на пустые ячейки между двумя ячейками одной строки
    let isAdjacentRow = false;
    if (row1 === row2) {
        const start = Math.min(indexOne, indexTwo) + 1;
        const end = Math.max(indexOne, indexTwo);
        isAdjacentRow = true;
        for (let i = start; i < end; i += 1) {
            if (grid[i]) { // Если ячейка не пуста
                isAdjacentRow = false;
                break;
            }
        }
    }
    console.log('isAdjacentRow: ', isAdjacentRow);

    // проверка границы строк (последняя ячейка одной и первая ячейка другой)
    let isBoundareRow = false;
    if (row1 !== row2) {
        // console.log('row1: ', row1);
        // console.log('row2: ', row2);
        // console.log('in function: ');
        const lastInRow1 = findLastNonEmptyCellInRow(row1, grid);
        // console.log('lastInRow1: ', lastInRow1);
        // console.log('indexOne: ', indexOne);
        const firstInRow2 = findFirstNonEmptyCellInRow(row2, grid);
        // console.log('firstInRow2: ', firstInRow2);
        // console.log('indexTwo: ', indexTwo);
        // console.log('(indexOne === lastInRow1 && indexTwo === firstInRow2) || (indexTwo === lastInRow1 && indexOne === firstInRow2)');
        // console.log('(indexOne === lastInRow1 && indexTwo === firstInRow2): ', indexOne === lastInRow1 && indexTwo === firstInRow2);
        // console.log('(indexTwo === lastInRow1 && indexOne === firstInRow2): ', indexTwo === lastInRow1 && indexOne === firstInRow2);
        

        if ((indexOne === lastInRow1 && indexTwo === firstInRow2)
             || (indexTwo === lastInRow1 && indexOne === firstInRow2)) {
            // console.log('я тут');
            isBoundareRow = true;
        } 
    }
    console.log('isBoundareRow: ', isBoundareRow);

    let isBoundareCol = false;
    if (col1 === col2) {
        const startRow = Math.min(row1, row2) + 1;
        const endRow = Math.max(row1, row2);
        isBoundareCol = true;
        for (let r = startRow; r < endRow; r += 1) {
            const cellIndex = r * 9 + col1;
            if (grid[cellIndex]) {
                isBoundareCol = false;
                break;
            }
        }
    }
    console.log('isBoundareCol: ', isBoundareCol);

    if (isAdjacent || isAdjacentRow || isBoundareRow || isBoundareCol) {
         return true;
    }
    return false;
}

// функция валидации пар и подсчета очков
function validatePair (num1, num2) {
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
};

function findLastNonEmptyCellInRow (row, grid) {
    console.log('row: ', row);
  for (let col = 8; col >= 0; col -= 1) {
    console.log('col: ', col);
    console.log('index = row * 9 + col')
    const index = row * 9 + col;
    console.log('index: ', index);
    if (grid[index] && grid[index] !== 0) { 
    /* "Если значение существует (не null и не undefined), 
    И при этом оно не равно числу 0, тогда считаем ячейку непустой
    и возвращаем её индекс." */
      return index;
    }
  }
  return null; // Ряд пуст
};

function findFirstNonEmptyCellInRow (row, grid) {
  for (let col = 0; col < 9; col += 1) {
    const index = row * 9 + col;
    if (grid[index] && grid[index] !== 0) {
      return index;
    }
  }
  return null;
};