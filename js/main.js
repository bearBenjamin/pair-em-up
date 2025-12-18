import './utils.js';
import './listeners.js';
import { initializeUIRunner, state, setCurrentScreen, updateHightScore, initLoadedData, resetAssists } from "./state.js";
import { startTimer, stopTimer, resetTimer } from './timer.js';
import { loadGameState } from './storage.js';
import { renderStarScreen } from "./screens/startScreen.js";
import { renderGameScreen } from "./screens/gameScreen/gameScreen.js";
import { renderSettingScreen } from "./screens/settingScreen.js";
import { renderResultScreen } from "./screens/resultScreen.js";
import { renderGameSettingScreen } from "./screens/gameScreen/gameSettingScreen.js";
import { renderGameResultScreen } from "./screens/gameScreen/gameResultScreen.js";
import { renderLoseModal, renderWinModal } from './screens/modalScreen.js';

const updateUI = () => {
  console.log('state: ', state);
  console.log('Central UI Dispatcher running for screen: ', state.currentScreen);
  const exitModal = document.querySelector('.modal-overlay');
  if(exitModal) exitModal.remove();

  // if (state.gameStatus === 'won' && state.mode) {
  //   updateHightScore(state.mode, state.score);
  // }

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
                renderWinModal();
                break;
              case 'lose' :
                stopTimer();
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
  //loadGameState();
  initLoadedData();
  initializeUIRunner(updateUI);
  updateUI();
};

document.addEventListener("DOMContentLoaded", init);
