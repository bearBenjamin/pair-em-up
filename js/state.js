const state = {
  currentScreen: "start", // 'game', 'setting', 'result', 'gameOver';
  mode: null, // 'classic', 'random', 'chaotic';
  grid: [], // игровая сетка массив с цифрами;
  score: 0,
  timer: 0,
  setting: {
    soundEnabled: false,
    theme: "light", // 'dark';
  },
  assists: {
    hints: -1,
    revert: 0,
    addNumbers: 10,
    shuffle: 5,
    eraser: 5,
  },
  history: [], // история ходов;
  hasSavedGame: false,
  firstClick: null,
  secondClick: null,
  selectedCells: [], // массив индексов выделенных ячеек
};

let subscribers = [];

function subscribe(callback) {
    subscribers.push(callback);
}

function updateState(updates) {
    Object.assign(state, updates);
    
    subscribers.forEach(callback => callback(state));
}

function getState() {
    return { ...state }; 
}

export { state, updateState, subscribe, getState };