import { renderGameScreen } from "../screens/gameScreen/gameScreen.js";
import { getGrid } from "../utils.js";

export function handleBtnModeClick(evt, currentState) {
  currentState.currentScreen = "game";

  switch (evt.target.getAttribute("data-action")) {
    case "open-classic-screen":
      currentState.mode = "classic";
      currentState.grid = getGrid(currentState.mode);
      renderGameScreen(currentState);
      break;

    case "open-random-screen":
      currentState.mode = "random";
      currentState.grid = getGrid(currentState.mode);
      renderGameScreen(currentState);
      break;

    case "open-chaotic-screen":
      currentState.mode = "chaotic";
      currentState.grid = getGrid(currentState.mode);
      renderGameScreen(currentState);
      break;
  }
}
