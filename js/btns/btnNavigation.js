import { setCurrentScreen, setScore, setTimer, setModal, setGrid, setGameStatus, setGameMode, resetHistory, resetAssists } from "../state.js";

function handleBtnNavigationClick(target) {
  switch (target.getAttribute('data-action')) {
    case ('open-game-setting-screen') :
      setCurrentScreen('game-setting');
    break;

    case ('open-game-result-screen') :
      setCurrentScreen('game-result');
    break;

    case ('open-start-screen-game') :
      setTimer(0);
      setScore(0);
      setGameMode(null);
      setGrid([]);
      setModal(false);
      resetHistory();
      resetAssists();
      setGameStatus('playing');
      setCurrentScreen('start');
    break;
  }
}

export { handleBtnNavigationClick };