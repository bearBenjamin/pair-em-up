import { saveGameState, saveGameRecord, loadGameState, loadGameRecord, } from "./storage.js";

const DEFAULT__ASSISTS = {
  hints: 5,
  addNumbers: 5,
  shuffle: 5,
  eraser: 5,
}

const state = {
  currentScreen: "start", // 'game', 'setting', 'result'
  mode: null, // 'classic', 'random', 'chaotic';
  gameStatus: 'playing', // 'playing', 'won', lost'
  grid: [], // игровая сетка массив с цифрами;
  score: 0, // текущий результат игры;
  highScore: {
    classic: 0,
    random: 0,
    chaotic: 0,
  },
  timer: 0,
  setting: {
    soundEnabled: false,
    theme: "light", // 'dark';
  },
  assists: { ...DEFAULT__ASSISTS },
  history: [], // история ходов;
  hasSavedGame: false,
  hasHints: false,
  hasRevertedLastMove: false,
  firstClick: null,
  secondClick: null,
  selectedCells: [], // массив индексов выделенных ячеек 
  ui: {
    isModalOpen: false,
    modalType: null, // 'win', 'lose'
  },
};

function persistRecord() {
  const data = {
    highScore: state.highScore,
    setting: state.setting,
  };
  saveGameRecord(data);
}

function persistState() {
  if (state.grid.length === 0 || state.gameStatus !== 'playing') return;
  
  const data = {
    mode: state.mode,
    score: state.score,
    timer: state.timer,
    grid: state.grid,
    assists: state.assists,
    history: state.history,
  };
  saveGameState(data);
  state.hasSavedGame = true;
}

function applyDataToState(data) {
  if(!data) return;

  if(data.highScore) Object.assign(state.highScore, data.highScore);
  if(data.setting) Object.assign(state.setting, data.setting);
  if(data.assists) Object.assign(state.assists, data.assists);

  const { highScore, setting, assists, ...primitives } = data;
  Object.assign(state, primitives);
}

function initLoadedData() {
  const prefs = loadGameRecord();
  applyDataToState(prefs);

  const savedGame = loadGameState();
  state.hasSavedGame = !!savedGame;

  if (state.setting.theme) {
    document.body.setAttribute('data-theme', state.setting.theme);
  }
}

function loadAndApplySavedGame() {
  const savedGame = loadGameState();
  if (savedGame) {
    applyDataToState(savedGame);
    return true;
  }
  return false;
}

let UIRunnerCallback = () => {};

function initializeUIRunner(callback) {
  UIRunnerCallback = callback;
}

function triggerUIUpdate() {
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
  document.documentElement.setAttribute('data-theme', newTheme);
  persistRecord();
  UIRunnerCallback();
}

function setSound(isEnabled) {
  state.setting.soundEnabled = isEnabled;
  persistRecord();
}

function setTimer(newTime) {
  state.timer = newTime;
}

function updateHightScore(mode, newScore) {
  if(state.highScore[mode] < newScore) {
    state.highScore[mode] = newScore;
    persistRecord(); 
  }
}

function showModal(isOpen, type = null) {
  state.ui.isModalOpen = isOpen;
  state.ui.modalType = type;
  triggerUIUpdate(); // Обновляю UI, чтобы показать/скрыть окно
}

function setModal(isOpen, type = null) {
  state.ui.isModalOpen = isOpen;
  state.ui.modalType = type;
}

function setGameStatus(status) {
  state.gameStatus = status;
}

function resetAssists() {
  state.assists = { ...DEFAULT__ASSISTS };
}

function resetHistory() {
  state.history = [];
}

export {
  state,
  persistRecord,
  persistState,
  applyDataToState,
  initLoadedData,
  loadAndApplySavedGame,
  initializeUIRunner,
  triggerUIUpdate,
  setCurrentScreen,
  setGameMode,
  setGrid,
  setScore,
  setTheme,
  setSound,
  setTimer,
  updateHightScore,
  showModal,
  setModal,
  setGameStatus,
  resetAssists,
  resetHistory
};
