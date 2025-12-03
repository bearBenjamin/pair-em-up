import { createElement } from "../../utils.js";

function renderGameScreen(state) {
  document.body.innerHTML = "";

  const { mode, timer, score, grid, selectedCells } = state;

  // header
  const modeTitle = createElement(
    "h1",
    { className: "game-title" },
    `${mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : "Not Selected"}`
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
  const timeCount = createElement("p", { className: "time-count" }, `${timer}`); // надо будет посмотреть как делать таймер
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
  // console.log('gridElement: ', gridElement);

  // Кнопки управления
  const btnReset = createElement(
    "button",
    { className: "btn btn-manager-game", "data-action": "reset-game" },
    "Reset"
  );
  
  let btnClear;

  if (state.hasSavedGame) {
    btnClear = createElement(
      "button",
      { className: "btn btn-manager-game", "data-action": "clear-game" },
      "Clear"
    );
  } else {
    btnClear = createElement(
      "button",
      {
        className: "btn btn-manager-game",
        "data-action": "clear-game",
        "data-state": "disabled",
      },
      "Clear"
    );
  }
  
  const btnSave = createElement(
    "button",
    { className: "btn btn-manager-game", "data-action": "save-game" },
    "Save"
  );

  const btnManagerChildrens = [btnSave, btnReset, btnClear];

  const btnManagerContainer = createElement(
    "div",
    { className: "btn-manager-container" },
    ...btnManagerChildrens
  );

  // Кнопки навигации
  const btnSettings = createElement(
    "button",
    {
      className: "btn btn-navigation",
      "data-action": "open-game-setting-screen",
    },
    "Settings"
  );
  const btnResult = createElement(
    "button",
    {
      className: "btn btn-navigation",
      "data-action": "open-game-result-screen",
    },
    "Result"
  );

  const btnExit = createElement(
    "button",
    {
      className: "btn btn-navigation",
      "data-action": "open-start-screen-game",
    },
    "Exit"
  )

  const btnNavigationChildrens = [btnSettings, btnResult, btnExit];

  const btnNavigationContainer = createElement(
    "div",
    { className: "btn-navigation-container" },
    ...btnNavigationChildrens
  );

  const gridContainer = createElement(
    "div",
    { className: "game-grid-container" },
    btnNavigationContainer,
    gridElement,
    btnManagerContainer
  );

  const main = createElement("main", { className: "game" }, gridContainer);

  // Вспомогательные кнопки
  const btnHints = createElement(
    "button",
    { className: "btn btn-game btn-hints", "data-action": "hints" },
    "Hints"
  );
  const btnBackspace = createElement(
    "button",
    { className: "btn btn-game btn-backspace", "data-action": "backspace" },
    "Backspace"
  );
  const btnAdd = createElement(
    "button",
    { className: "btn btn-game btn-add", "data-action": "add" },
    "Add Numbers"
  );
  const btnShuffle = createElement(
    "button",
    { className: "btn btn-game btn-shuffle", "data-action": "shuffle" },
    "Shuffle"
  );
  const btnEraser = createElement(
    "button",
    { className: "btn btn-game btn-eraser", "data-action": "eraser" },
    "Eraser"
  );

  const btnChildrens = [btnHints, btnBackspace, btnAdd, btnShuffle, btnEraser];

  const btnContainer = createElement(
    "div",
    { className: "game-btn-container" },
    ...btnChildrens
  );

  const footer = createElement(
    "footer",
    { className: "game-footer" },
    btnContainer
  );

  // Модальное окно
  const btnCloseModal = createElement(
    "button",
    { className: "btn modal-close-button" },
    "Close"
  );
  const modalMessage = createElement("p", { className: "modal-message" });
  const modal = createElement(
    "div",
    { className: "modal" },
    modalMessage,
    btnCloseModal
  );

  const modalContainer = createElement(
    "div",
    { className: "modal-overlay visually-hidden" },
    modal
  );

  const container = createElement(
    "div",
    { className: "wrapper game-screen" },
    header,
    main,
    footer,
    modalContainer
  );

  document.body.append(container);
}

function renderGrid(grid, selectedCells) {
  const gridElement = createElement("div", { className: "game-grid" });

  grid.forEach((cellValue, index) => {
    // Пропускаю пустые ячейки в конце массива, чтобы они не занимали место
    // if (grid.length > 0 && index >= grid.length && !cellValue) return;

    const isCellEmpty = !cellValue;
    //const isCellSelected = selectedCells.includes(index);

    // Создаю ячейку
    const cell = createElement("div", {
      className: `cell ${isCellEmpty ? "empty" : ""}`,
      "data-index": index,
      "data-action": "select-cell",
      textContent: isCellEmpty ? "" : cellValue,
    });

    gridElement.append(cell);
  });
  return gridElement;
}

export { renderGameScreen };
