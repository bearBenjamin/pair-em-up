import { setCurrentScreen, setTimer, setModal } from "../state.js";

function handleBtnBackClik() {
  setTimer(0);
  setModal(false);
  setCurrentScreen('start');
}

export { handleBtnBackClik };
