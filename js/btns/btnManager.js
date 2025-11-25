import { renderSettingScreen } from "../screens/settingScreen.js";
import { renderResultScreen } from "../screens/resultScreen.js";

export function handleBtnManagerClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      renderSettingScreen(state);
      break;

    case "open-result-screen":
      renderResultScreen(state);
      break;
  }
}