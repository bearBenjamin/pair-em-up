import './utils.js';
import './listeners.js';
import { initializeUIRunner, state, setCurrentScreen } from "./state.js";
import { loadGameState } from './storage.js';
import { renderStarScreen } from "./screens/startScreen.js";
import { renderGameScreen } from "./screens/gameScreen/gameScreen.js";
import { renderSettingScreen } from "./screens/settingScreen.js";
import { renderResultScreen } from "./screens/resultScreen.js";
import { renderGameSettingScreen } from "./screens/gameScreen/gameSettingScreen.js";
import { renderGameResultScreen } from "./screens/gameScreen/gameResultScreen.js";

const updateUI = () => {
  console.log('Central UI Dispatcher running for screen: ', state.currentScreen);

  switch (state.currentScreen) {
    case 'start' :
      renderStarScreen();
      break;
    
    case 'game' :
      switch (state.mode) {
        case 'classic' :
        case 'random' :
        case 'chaotic' :
        renderGameScreen(state); // для игрового экрана нужны данные из состояния
        break;
      default:
        console.error('Неизвестный игровой режим. Возврат на старт.');
        setCurrentScreen('start');
      }
      break;

    case 'setting' :
      renderSettingScreen(state); // состояние нужно для изменения темы
      break;

    case 'game-setting' :
      renderGameSettingScreen(state); // состояние нужно для изменения темы
      break;

    case 'result' :
      renderResultScreen();
      break;
    
    case 'game-result' :
      renderGameResultScreen();
      break;

    default:
      console.error('Неизвестный экран. Возврат на стартовый экран');
      renderStarScreen('start');
  }
}

const init = () => {
  loadGameState();
  initializeUIRunner(updateUI);
  updateUI();
};

document.addEventListener("DOMContentLoaded", init);
