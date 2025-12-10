const state = {
  currentScreen: "start", // 'game', 'setting', 'result', 'gameOver';
  mode: null, // 'classic', 'random', 'chaotic';
  grid: [], // игровая сетка массив с цифрами;
  score: 0, // текущий результат игры;
  timer: 0,
  setting: {
    soundEnabled: false,
    theme: "light", // 'dark';
  },
  assists: {
    hints: 5,
    revert: 0,
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
  },
  history: [], // история ходов;
  hasSavedGame: false,
  hasHints: false,
  hasRevertedLastMove: false,
  firstClick: null,
  secondClick: null,
  selectedCells: [], // массив индексов выделенных ячеек
};

let UIRunnerCallback = () => {};

function initializeUIRunner(callback) {
  UIRunnerCallback = callback;
}

function triggerUIUpdate () {
  UIRunnerCallback();
}

function setCurrentScreen(screenName) {
  state.currentScreen = screenName;
  UIRunnerCallback();
}

function setGameMode(modeName) {
  state.mode = modeName;
}

function setGrid(newGrid) {
  state.grid = newGrid;
}

function setScore(newScore) {
  state.score = newScore;
}

function setTheme(newTheme) {
  state.setting.theme = newTheme;
  UIRunnerCallback();
}

function setTimer(newTime) {
  state.timer = newTime;
}

export { state, initializeUIRunner, triggerUIUpdate, setCurrentScreen, setGameMode, setGrid, setScore, setTheme, setTimer }
