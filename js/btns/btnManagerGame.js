import { state, setCurrentScreen, setGrid, setScore, setTimer, setModal, triggerUIUpdate } from "../state.js";
import { clearSavedGame, saveGameState } from "../storage.js";
import { getGrid } from "../utils.js";

function handleBtnManagerGameClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "reset-game":
      const newGrid = getGrid(state.mode);
      setGrid(newGrid);
      setScore(0);
      setTimer(0);
      setModal(false)
      setCurrentScreen('game');
      break;

    case "clear-game":
      clearSavedGame();
      triggerUIUpdate();
      break;

    case "save-game":
      saveGameState();
      triggerUIUpdate();
      break;
  }
}

export { handleBtnManagerGameClick };
