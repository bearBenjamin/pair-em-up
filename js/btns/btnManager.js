import { renderSettingScreen } from "../screens/settingScreen.js";
import { renderResultScreen } from "../screens/resultScreen.js";

export function handleBtnManagerClick(evt, currentScreen) {
  switch (evt.target.getAttribute("data-action")) {
    case "open-setting-screen":
      renderSettingScreen(currentScreen);
      break;

    case "open-result-screen":
      renderResultScreen(currentScreen);
      break;
  }
}