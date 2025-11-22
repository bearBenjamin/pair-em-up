// нахожу последнюю непустую ячейку в строке и возвращаю индекс ячейки
// const findLastNonEmptyCellInRow = (row, grid) => {
//   for (let col = 8; col >= 0; col -= 1) {
//     const index = row * 9 + col;
//     if (grid[index] && grid[index] !== 0) { 
//     /* "Если значение существует (не null и не undefined), 
//     И при этом оно не равно числу 0, тогда считаем ячейку непустой
//     и возвращаем её индекс." */
//       return index;
//     }
//   }
//   return null; // Ряд пуст
// };

// // нахожу первую непоследнюю ячейку в строке и возвращаю индекс ячейки
// const findFirstNonEmptyCellInRow = (row, grid) => {
//   for (let col = 0; col < 9; col += 1) {
//     const index = row * 9 + col;
//     if (grid[index] && grid[index] !== 0) {
//       return index;
//     }
//   }
//   return null;
// };

// // нахожу последнюю непустую ячейку в столбце и возвращаю индекс ячейки
// const findLastNonEmptyCellInCol = (col, grid) => {
//   for (let row = 2; row >= 0; row -= 1) {
//     const index = row * 9 + col;
//     if (grid[index] && grid[index] !== 0) {
//       return index;
//     }
//   }
//   return null;
// };

// // нахожу первую непустую ячейку в столбце с и возвращаю индекс
// const findFirstNonEmptyCellInCol = (col, grid) => {
//   for (let row = 0; row < 3; row += 1) {
//     const index = row * 9 + col;
//     if (grid[index] && grid[index] !== 0) {
//       return index;
//     }
//   }
//   return null;
// };

// // Проверка соединения ячеек
// const areaCellsConnectable = (index1, index2, grid) => {
//   if (!grid[index1] || !grid[index2] || grid[index1] === 0 || grid[index2] === 0) {
//     return false;
//   }

//   const row1 = Math.floor(index1 / 9);
//   const col1 = index1 % 9;
//   const row2 = Math.floor(index2 / 9);
//   const col2 = index2 % 9;

//   const isAdjacentVertically = (Math.abs(row1 - row2) === 1) && (col1 === col2);
//   const isAdjacentHorizontally = (Math.abs(col1 - col2) === 1) && (row1 === row2);
//   if (isAdjacentVertically || isAdjacentHorizontally) {
//     return true;
//   }

//   if (row1 !== row2) {
//     const lastInRow1 = findLastNonEmptyCellInRow(row1, grid);
//     const firstInRow2 = findFirstNonEmptyCellInRow(row2, grid);

//     if ((index1 === lastInRow1 && index2 === firstInRow2)
//         || (index2 === lastInRow1 && index1 === firstInRow2)) {
//       return true;
//     }
//   }

//   if (row1 === row2) {
//     const start = Math.min(index1, index2) + 1;
//     const end = Math.max(index1, index2);
//     let areaAllCellsBetweenEmpty = true;
//     for (let i = start; i < end; i += 1) {
//       if (grid[i]) { // Если ячейка не пуста
//         areaAllCellsBetweenEmpty = false;
//         break;
//       }
//     }
//     if (areaAllCellsBetweenEmpty) {
//       return true;
//     }
//   }

//   if (col1 === col2) {
//     const startRow = Math.min(row1, row2) + 1;
//     const endRow = Math.max(row1, row2);
//     let areaAllCellsBetweenEmpty = true;
//     for (let r = startRow; r < endRow; r += 1) {
//       const cellIndex = r * 9 + col1;
//       if (grid[cellIndex]) {
//         areaAllCellsBetweenEmpty = false;
//         break;
//       }
//     }
//     if (areaAllCellsBetweenEmpty) {
//       return true;
//     }
//   }
//   return false;
// };

// export const handleCellClick = (currentState) => {
//   const {
//     grid, selectedCells, score, history,
//   } = currentState;

//   // Если выделено две ячейки, проверяю пару
//   if (selectedCells.length === 2) {
//     const [index1, index2] = selectedCells;

//     if (!areaCellsConnectable(index1, index2, grid)) {
//       console.log('Invalid connection');
//       return { selectedCells: [] };
//     }
//     const val1 = grid[index1];
//     const val2 = grid[index2];

//     const { isValid, points } = validatePair(val1, val2);

//     if (isValid) {
//       // Пара валидна: обновляю сетку, счет и историю
//       const newGrid = [...grid];
//       newGrid[index1] = null;
//       newGrid[index2] = null;

//       const newHistory = [...history, { grid: [...grid], score }];

//       return {
//         grid: newGrid,
//         score: score + points,
//         selectedCells: [], // Сбрасываю выделение
//         history: newHistory,
//       };
//     }
//     // Пара невалидна: просто сбрасываю выделение
//     console.log('Invalid pair');
//     return { selectedCells: [] };
//   }
//   return {};
// };

// export const handleSelectCellAction = (event) => {
//   const { index } = event.target.dataset;
//   const cellIndex = parseInt(index, 10);
//   const currentState = getState();

//   const { grid, selectedCells } = currentState;

//   // Если ячейка пуста, ничего не делаю
//   if (!grid[cellIndex]) {
//     console.log('Cannot select an empty cell');
//     return;
//   }

//   const newSelectedCells = [...selectedCells];
//   const selectedIndex = newSelectedCells.indexOf(cellIndex);

//   if (selectedIndex > -1) {
//     // Если ячейка уже выделена, снимаю выделение
//     newSelectedCells.splice(selectedIndex, 1);
//   } else {
//     // Если ячейка не выделена, добавляю ее в выделение
//     newSelectedCells.push(cellIndex);
//   }

//   // Применяю новое выделение
//   currentState.selectedCells = newSelectedCells;
//   //setState({ selectedCells: newSelectedCells });

//   // Если после этого выделено две ячейки, запускаю проверку
//   if (newSelectedCells.length === 2) {
//     setTimeout(() => { // Небольшая задержка, чтобы пользователь увидел второе выделение
//       const updates = handleCellClick(getState());
//       setState(updates);
//     }, 200);
//   }
// };
