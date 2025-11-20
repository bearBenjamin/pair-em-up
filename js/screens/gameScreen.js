import { createElement } from "../utils.js";

export function renderGameScreen(state) {
    console.log('state game screen: ', state);
  document.body.innerHTML = '';

  const { mode, timer, score, grid, selectedCells } = state;

  // header
  const modeTitle = createElement(
    "h1",
    { className: "game-title" },
    `${
      mode
        ? mode.charAt(0).toUpperCase() + mode.slice(1)
        : "Not Selected"
    }`
  );

  const scoreDisplay = createElement(
    "p",
    { className: "score-display" },
    "Check: "
  );
  const scoreCount = createElement(
    "p",
    { className: "score-count" },
    `${score} / 100`
  );
  const scoreContainer = createElement(
    "div",
    { className: "score-container" },
    scoreDisplay,
    scoreCount
  );

  const timeDisplay = createElement(
    "p",
    { className: "time-display" },
    "Time: "
  );
  const timeCount = createElement(
    "p",
    { className: "time-count" },
    `${timer}`
  ); // надо будет посмотреть как делать таймер
  const timeContainer = createElement(
    "div",
    { className: "time-container" },
    timeDisplay,
    timeCount
  );

  const header = createElement(
    "header",
    { className: "game-header" },
    modeTitle,
    scoreContainer,
    timeContainer
  );

  // Игровое поле
  const gridElement = renderGrid(grid, selectedCells);
  console.log('gridElement: ', gridElement);

   // Кнопки управления
  const btnSetting = createElement('button', { className: 'btn btn-manager' }, 'Setting');
  const btnContinue = createElement('button', { className: 'btn btn-manager' }, 'Continue');
  const btnResult = createElement('button', { className: 'btn btn-manager' }, 'Result');

  const btnManagerChildrens = [btnSetting, btnContinue, btnResult];

  const btnManagerContainer = createElement('div', { className: 'btn-manager-container' }, ...btnManagerChildrens);

  const gridContainer = createElement('div', { className: 'game-grid-container' }, gridElement, btnManagerContainer);

  const main = createElement('main', { className: 'game' }, gridContainer);

  // Вспомогательные кнопки
  const btnHints = createElement('button', { className: 'btn btn-game btn-hints' }, 'Hints');
  const btnBackspace = createElement('button', { className: 'btn btn-game btn-backspace' }, 'Backspace');
  const btnAdd = createElement('button', { className: 'btn btn-game btn-add' }, 'Add Numbers');
  const btnShuffle = createElement('button', { className: 'btn btn-game btn-shuffle' }, 'Shuffle');
  const btnEraser = createElement('button', { className: 'btn btn-game btn-eraser' }, 'Eraser');

  const btnChildrens = [btnHints, btnBackspace, btnAdd, btnShuffle, btnEraser];

  const btnContainer = createElement('div', { className: 'game-btn-container' }, ...btnChildrens);

  const footer = createElement('footer', { className: 'game-footer' }, btnContainer);

  const container = createElement('div', { className: 'wrapper game-screen' }, header, main, footer);

  document.body.append(container);
}


function renderGrid(grid, selectedCells) {
    const gridElement = createElement('div', { className: 'game-grid' });
    
    grid.forEach((cellValue, index) => {
     // Пропускаю пустые ячейки в конце массива, чтобы они не занимали место
     // if (grid.length > 0 && index >= grid.length && !cellValue) return;

      const isCellEmpty = !cellValue;
      const isCellSelected = selectedCells.includes(index);

    // Создаю ячейку
      const cell = createElement('div', {
        className: `cell ${isCellEmpty ? 'empty' : ''} ${isCellSelected ? 'selected' : ''}`,
        'data-index': index,
        'data-action': 'select-cell',
        textContent: isCellEmpty ? '' : cellValue,
        });
    

        gridElement.append(cell);
    });
    return gridElement;
}