import { setCurrentScreen, setTimer, setModal, setGrid, setGameStatus, setGameMode, resetHistory, resetAssists, setScore } from "../state.js";

function handleBtnBackClik() {
  setTimer(0);
  setScore(0)
  setGameMode(null);
  setGrid([]);
  setModal(false);
  resetHistory();
  resetAssists();
  setGameStatus('playing');
  setCurrentScreen('start');
}

export { handleBtnBackClik };
