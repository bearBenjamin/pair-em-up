import { setCurrentScreen, setGameStatus } from "../state.js";

function handleBtnRulesClick() {
    setGameStatus('playing');
    setCurrentScreen('rules');
}

export { handleBtnRulesClick };
