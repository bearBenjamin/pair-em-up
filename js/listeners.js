import { handleGameFieldClick } from "./gameLogic.js";
import { handleBtnManagerGameClick } from "./btns/btnManagerGame.js";
import { handleBtnGameClick } from "./btns/btnGame.js";
import { handleBtnNavigationClick } from "./btns/btnNavigation.js";
import { handleBtnBackGameClick } from "./btns/btnBackGame.js";
import { handleBtnModeClick } from "./btns/btnMode.js";
import { handleBtnManagerClick } from "./btns/btnManager.js";
import { handleBtnBackClik } from "./btns/btnBack.js";
import { handleToggleTheme } from "./theme.js";
import { setScore, showModal, resetAssists } from './state.js';
import { playSound } from './audio.js';

const body = document.body;

  body.addEventListener("click", (evt) => {
    const target = evt.target;

  
  if (target.closest('.btn')) {
    playSound('click'); // Звук на любой клик по кнопке
  }

    if (target.closest(".btn-mode-game")) {
      setScore(0);
      resetAssists();
      handleBtnModeClick(evt);
    }

    if (target.closest(".btn-manager")) {
      handleBtnManagerClick(evt);
    }

    if (target.closest(".btn-back-start")) {
      handleBtnBackClik();
    }

    if (target.closest('.btn-navigation')) {
      handleBtnNavigationClick(target);
    }

    if (target.closest('.btn-back-game')) {
      handleBtnBackGameClick();
    }
 
    if (target.closest(".btn-manager-game")) {
      handleBtnManagerGameClick(evt);
    }

    if (target.closest(".btn-game")) {
      handleBtnGameClick(evt);
    }

    if (target.closest(".cell")) {
      playSound('click');
      handleGameFieldClick(evt);
    }

    if (target.closest(".modal-hint-close-button")) {
      showModal(false); 
      return;
  }
  });

  body.addEventListener("change", (evt) => {
    handleToggleTheme(evt);
  });





