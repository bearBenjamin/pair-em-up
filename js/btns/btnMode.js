import { renderGameScreen } from "../screens/gameScreen.js";
import { getGrid } from "../utils.js";

export function handleBtnModeClick(evt, state) {
  state.currentScreen = "game";

  switch (evt.target.getAttribute("data-action")) {
    case "open-classic-screen":
      state.mode = "classic";
      state.grid = getGrid(state.mode);
      renderGameScreen(state);
      break;

    case "open-random-screen":
      state.mode = "random";
      state.grid = getGrid(state.mode);
      renderGameScreen(state);
      break;

    case "open-chaotic-screen":
      state.mode = "chaotic";
      state.grid = getGrid(state.mode);
      renderGameScreen(state);
      break;
  }
}
