import { setCurrentScreen } from "../state.js";
import { loadGameState } from "../storage.js";

function handleBtnManagerClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      setCurrentScreen('setting');
      break;

    case "open-result-screen":
      setCurrentScreen('result');
      break;

    case "open-continue-game":
      if(loadGameState()) {
        setCurrentScreen('game');
      };
      break;
  }
}

export { handleBtnManagerClick };
