import { setCurrentScreen } from "../state.js";

function handleBtnManagerClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      setCurrentScreen('setting');
      break;

    case "open-result-screen":
      setCurrentScreen('result');
      break;
  }
}

export { handleBtnManagerClick };
