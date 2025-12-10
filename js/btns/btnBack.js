import { setCurrentScreen, setTimer } from "../state.js";

function handleBtnBackClik() {
  setTimer(0);
  setCurrentScreen('start');
}

export { handleBtnBackClik };
