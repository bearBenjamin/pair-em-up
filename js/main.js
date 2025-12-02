import { renderStarScreen } from "./screens/startScreen.js";
import './screens/gameScreen/gameScreen.js';
import './screens/settingScreen.js';
import './utils.js';
import { listenersEvent } from "./listeners.js";
import { getState } from "./state.js";

// const state = {
//   currentScreen: "start", // 'game', 'setting', 'result', 'gameOver';
//   mode: null, // 'classic', 'random', 'chaotic';
//   grid: [], // игровая сетка массив с цифрами;
//   score: 0,
//   timer: 0,
//   setting: {
//     soundEnabled: false,
//     theme: "light", // 'dark';
//   },
//   assists: {
//     hints: -1,
//     revert: 0,
//     addNumbers: 10,
//     shuffle: 5,
//     eraser: 5,
//   },
//   history: [], // история ходов;
//   hasSavedGame: false,
//   selectedCells: [], // массив индексов выделенных ячеек
// };

const init = () => {
  const currentState = getState();
  console.log('currentState: ', currentState);
  renderStarScreen();
  listenersEvent(currentState);
};

document.addEventListener("DOMContentLoaded", init());
