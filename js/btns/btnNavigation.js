import { setCurrentScreen, setScore } from "../state.js";

function handleBtnNavigationClick(target) {
  switch (target.getAttribute('data-action')) {
    case ('open-game-setting-screen') :
      setCurrentScreen('game-setting');
    break;

    case ('open-game-result-screen') :
      setCurrentScreen('game-result');
    break;

    case ('open-start-screen-game') :
      setScore(0);
      setCurrentScreen('start');
    break;
  }
}

export { handleBtnNavigationClick };