const STORAGE__KEY = 'userGameSave';
const SETTINGS__KEY = 'userGameSettings';

const save = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Ошибка записи в ${key}: `, error);
    }
};

const load = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Ошибка чтения из ${key}: `, error);
    }
};

const saveGameState = (data) => save(STORAGE__KEY, data);
const saveGameRecord = (data) => save(SETTINGS__KEY, data);

const loadGameState = (data) => load(STORAGE__KEY, data);
const loadGameRecord = (data) => load(SETTINGS__KEY, data);

const clearSaveGame = () => localStorage.removeItem(STORAGE__KEY);

export {
    saveGameState,
    saveGameRecord,
    loadGameState,
    loadGameRecord,
    clearSaveGame
}