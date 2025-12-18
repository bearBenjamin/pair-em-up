import { state, setCurrentScreen, setGrid, setScore, setTimer, setModal, triggerUIUpdate, resetAssists, persistState } from "../state.js";
import { clearSaveGame } from "../storage.js";
import { getGrid } from "../utils.js";

function handleBtnManagerGameClick(evt) {
  switch (evt.target.getAttribute("data-action")) {
    case "reset-game":
      const newGrid = getGrid(state.mode);
      setGrid(newGrid);
      setScore(0);
      setTimer(0);
      setModal(false);
      resetAssists();
      setCurrentScreen('game');
      break;

    case "clear-game":
      clearSaveGame();
      state.hasSavedGame = false;
      triggerUIUpdate();
      break;

    case "save-game":
      persistState();
      triggerUIUpdate();
      break;
  }
}

export { handleBtnManagerGameClick };
