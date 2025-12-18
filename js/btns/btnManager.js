import { loadAndApplySavedGame, setCurrentScreen } from "../state.js";

function handleBtnManagerClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      setCurrentScreen('setting');
      break;

    case "open-result-screen":
      setCurrentScreen('result');
      break;

    case "open-continue-game":
      if(loadAndApplySavedGame()) {
        setCurrentScreen('game');
      };
      break;
  }
}

export { handleBtnManagerClick };
