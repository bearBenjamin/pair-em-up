import './utils.js';
import './listeners.js';
import './audio.js';
import { initializeUIRunner, state, setCurrentScreen, updateHightScore, initLoadedData } from "./state.js";
import { startTimer, stopTimer } from './timer.js';
import { renderStarScreen } from "./screens/startScreen.js";
import { renderGameScreen } from "./screens/gameScreen/gameScreen.js";
import { renderSettingScreen } from "./screens/settingScreen.js";
import { renderResultScreen } from "./screens/resultScreen.js";
import { renderGameSettingScreen } from "./screens/gameScreen/gameSettingScreen.js";
import { renderGameResultScreen } from "./screens/gameScreen/gameResultScreen.js";
import { renderLoseModal, renderWinModal } from './screens/modalScreen.js';
import { playSound } from './audio.js';

const updateUI = () => {
  console.log('state: ', state);
  console.log('Central UI Dispatcher running for screen: ', state.currentScreen);
  const exitModal = document.querySelector('.modal-overlay');

  if(exitModal) exitModal.remove();

  switch (state.currentScreen) {
    case 'start' :
      stopTimer();
      renderStarScreen();
      break;
    
    case 'game' :
      switch (state.mode) {
        case 'classic' :
        case 'random' :
        case 'chaotic' :
          startTimer();
          renderGameScreen(state); // для игрового экрана нужны данные из состояния

          if (state.ui.isModalOpen) {
            switch (state.ui.modalType) {
              case 'win' :
                stopTimer();
                updateHightScore(state.mode, state.score);
                playSound('win');
                renderWinModal();
                break;
              case 'lose' :
                stopTimer();
                playSound('lose');
                renderLoseModal();
                break;
            }
          }
        break;

      default:
        console.error('Неизвестный игровой режим. Возврат на старт.');
        setCurrentScreen('start');
      }
      break;

    case 'setting' :
      stopTimer();
      renderSettingScreen(state); // состояние нужно для изменения темы
      break;

    case 'game-setting' :
      stopTimer();
      renderGameSettingScreen(state); // состояние нужно для изменения темы
      break;

    case 'result' :
      stopTimer();
      renderResultScreen();
      break;
    
    case 'game-result' :
      stopTimer();
      renderGameResultScreen();
      break;

    default:
      console.error('Неизвестный экран. Возврат на стартовый экран');
      renderStarScreen('start');
  }
}

const init = () => {
  initLoadedData();
  initializeUIRunner(updateUI);
  updateUI();
};

document.addEventListener("DOMContentLoaded", init);
