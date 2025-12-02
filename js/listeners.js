import { handleGameFieldClick } from "./gameLogic.js";
import { handleBtnManagerGameClick } from "./btns/btnManagerGame.js";
import { handleBtnGameClick } from "./btns/btnGame.js";
import { handleBtnNavigationClick } from "./btns/btnNavigation.js";
import { handleBtnBackGameClick } from "./btns/btnBackGame.js";
import { handleBtnModeClick } from "./btns/btnMode.js";
import { handleBtnManagerClick } from "./btns/btnManager.js";
import { handleBtnBackClik } from "./btns/btnBack.js";
import { handleToggleTheme } from "./theme.js";

const body = document.body;

export function listenersEvent(curentState) {
  body.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.closest(".btn-mode-game")) {
      curentState.score = 0;
      handleBtnModeClick(evt, curentState);
    }

    if (target.closest(".btn-manager")) {
      handleBtnManagerClick(evt, curentState);
    }

    if (target.closest(".btn-back-start")) {
      handleBtnBackClik(evt, curentState);
    }

    if (target.closest('.btn-navigation')) {
      handleBtnNavigationClick(target, curentState);
    }

    if (target.closest('.btn-back-game')) {
      handleBtnBackGameClick(curentState);
    }

    if (target.closest(".btn-manager-game")) {
      handleBtnManagerGameClick(evt, curentState);
    }

    if (target.closest(".btn-game")) {
      handleBtnGameClick(evt, curentState);
    }

    if (target.closest(".cell")) {
      handleGameFieldClick(evt, curentState);
    }
  });

  body.addEventListener("change", (evt) => {
    handleToggleTheme(evt, curentState);
  });
}





