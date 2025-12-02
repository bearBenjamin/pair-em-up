import { renderGameScreen } from "../screens/gameScreen/gameScreen.js";

function handleBtnBackGameClick(curentState) {
  renderGameScreen(curentState);
}

export { handleBtnBackGameClick };
