import { createElement, getGrid } from "../utils.js";
import { renderGameScreen } from "./gameScreen.js";
import { renderSettingScreen } from "./settingScreen.js";
import { renderResultScreen } from "./resultScreen.js";

export function renderStarScreen(state) {
  console.log('state startScreen: ', state);
  document.body.innerHTML = "";
  const title = createElement("h1", { className: "site-title" }, "Pair 'em Up");
  const authorLink = createElement(
    "a",
    { href: "https://github.com/bearBenjamin", target: "_blank" },
    "bearBenjamin"
  );
  const author = createElement(
    "p",
    { className: "author" },
    "Created by ",
    authorLink
  );

  const btnClassicMode = createElement(
    "button",
    { className: "btn btn-mode-game" },
    "Classic"
  );
  const btnRandomMode = createElement(
    "button",
    { className: "btn btn-mode-game" },
    "Random"
  );
  const btnChaoticMode = createElement(
    "button",
    { className: "btn btn-mode-game" },
    "Chaotic"
  );

  const btnModeContainer = createElement(
    "div",
    { className: "btn-mode-game-container" },
    btnClassicMode,
    btnRandomMode,
    btnChaoticMode
  );

  const btnSettings = createElement(
    "button",
    { className: "btn btn-manager" },
    "Settings"
  );
  const btnContunie = createElement(
    "button",
    { className: "btn btn-manager" },
    "Continue"
  );
  const btnResult = createElement(
    "button",
    { className: "btn btn-manager" },
    "Result"
  );

  const btnManagerContainer = createElement(
    "div",
    { className: "btn-manager-container" },
    btnSettings,
    btnContunie,
    btnResult
  );

  const childrens = [title, author, btnModeContainer, btnManagerContainer];

  const pageContainer = createElement(
    "div",
    { className: "wrapper start-screen" },
    ...childrens
  );

  document.body.append(pageContainer);

  const modeBtns = document.querySelectorAll(".btn-mode-game");
  const managerBtns = document.querySelectorAll('.btn-manager');

  modeBtns.forEach((btnMode) => {
    btnMode.addEventListener("click", (evt) => {
      handleBtnModeClick(evt, state);
    });
  });

  managerBtns.forEach((btnManager) => {
    btnManager.addEventListener('click', (evt) => {
      state.currentScreen = 'setting';
      switch (evt.target.textContent) {
        case 'Settings' :
          renderSettingScreen(state);
        break;

        case 'Result' :
          renderResultScreen(state);
      }
    })
  })
}

function handleBtnModeClick (evt, state) {
  state.currentScreen = "game";
  switch (evt.target.textContent) {
    case "Classic":
      state.mode = "classic";
      state.grid = getGrid(state.mode);
      console.log('state.grid: ', state.grid);
      state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
    break;

    case "Random":
      state.mode = "random";
      state.grid = getGrid(state.mode);
      state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
    break;

    case "Chaotic":
      state.mode = "chaotic";
      state.grid = getGrid(state.mode);
      state.selectedCells = state.grid.map((item, index) => index);
      renderGameScreen(state);
    break;

    default:
      state.currentScreen = "start";
      state.mode = null;
    break;
  }
}