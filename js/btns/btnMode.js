import { setCurrentScreen, setGameMode, setGrid } from "../state.js";
import { getGrid } from "../utils.js";

function handleBtnModeClick(evt) {
  let selectedMode = null;

  switch (evt.target.getAttribute('data-action')) {
    case 'open-classic-screen' :
      selectedMode = 'classic';
      break;
    
    case 'open-random-screen' :
      selectedMode = 'random';
      break;
    
    case 'open-chaotic-screen' :
      selectedMode = 'chaotic';
      break;
  }

  if (selectedMode) {
    setGameMode(selectedMode);

    const newGrid = getGrid(selectedMode);
    
    setGrid(newGrid);
    setCurrentScreen('game');
  }
}

export { handleBtnModeClick };
