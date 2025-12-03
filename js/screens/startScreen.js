import { createElement } from "../utils.js";
import { state } from "../state.js";

function renderStarScreen() {
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
    { className: "btn btn-mode-game", "data-action": "open-classic-screen" },
    "Classic"
  );
  const btnRandomMode = createElement(
    "button",
    { className: "btn btn-mode-game", "data-action": "open-random-screen" },
    "Random"
  );
  const btnChaoticMode = createElement(
    "button",
    { className: "btn btn-mode-game", "data-action": "open-chaotic-screen" },
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
    { className: "btn btn-manager", "data-action": "open-setting-screen" },
    "Settings"
  );

  let btnContunie;

  if (state.hasSavedGame) {
    btnContunie = createElement(
      "button",
      { className: "btn btn-manager", "data-action": "open-continue-game" },
      "Continue"
    );
  } else {
    btnContunie = createElement(
      "button",
      {
        className: "btn btn-manager",
        "data-action": "open-continue-game",
        "data-state": "disabled",
      },
      "Continue"
    );
  }

  const btnResult = createElement(
    "button",
    { className: "btn btn-manager", "data-action": "open-result-screen" },
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
}

export { renderStarScreen };
