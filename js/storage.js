import { state, triggerUIUpdate } from './state.js';

const STORAGE__KEY = 'userGameSave';

function saveGameState() {
    try {
        const dataToSave = {
            mode: state.mode,
            score: state.score,
            timer: state.timer,
            grid: state.grid,
            setting: state.setting,
            assists: state.assists,
            history: state.history,
        };
        localStorage.setItem(STORAGE__KEY, JSON.stringify(dataToSave));
        console.log('Game state saved to localStorage');
        state.hasSavedGame = true;
        triggerUIUpdate();
    } catch (error) {
        console.error('Failed to save game state: ', error);
    }
}

function loadGameState() {
    try {
        const savedData = localStorage.getItem(STORAGE__KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            //пока напрямую, потом попробую заменить на сеттеры пока не очень понятно,
            //как будет отрисовываться экран
            state.mode = parsedData.mode;
            state.score = parsedData.score;
            state.timer = parsedData.timer;
            state.grid = parsedData.grid;
            Object.assign(state.setting, parsedData.setting);
            Object.assign(state.assists, parsedData.assists);
            state.history = parsedData.history;

            state.hasSavedGame = true;
            console.log('Game state loaded from localStorage.');

            return true;
        }
    } catch (error) {
        console.error('Failed to load or parse game state: ', error);
    }
    return false;
}

function clearSavedGame() {
    localStorage.removeItem(STORAGE__KEY);
    state.hasSavedGame = false;
    console.log('Saved game cleared.');
}

export { saveGameState, loadGameState, clearSavedGame}