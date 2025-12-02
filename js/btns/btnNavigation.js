import { renderGameSettingScreen } from "../screens/gameScreen/gameSettingScreen.js";
import { renderGameResultScreen } from "../screens/gameScreen/gameResultScreen.js";
import { renderStarScreen } from "../screens/startScreen.js";

function handleBtnNavigationClick(target, curentState) {
  switch (target.getAttribute('data-action')) {
    case ('open-game-setting-screen') :
      renderGameSettingScreen(curentState);
    break;

    case ('open-game-result-screen') :
      renderGameResultScreen(curentState);
    break;

    case ('open-start-screen-game') :
      curentState.score = 0; 
      renderStarScreen(curentState);
    break;
  }
}

export { handleBtnNavigationClick };