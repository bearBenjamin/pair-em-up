import { handleGameFieldClick } from "./gameLogic.js";
import { handleBtnManagerGameClick } from "./btns/btnManagerGame.js";
import { handleBtnGameClick } from "./btns/btnGame.js";
import { handleBtnModeClick } from "./btns/btnMode.js";
import { handleBtnManagerClick } from "./btns/btnManager.js";
import { handleBtnBackClik } from "./btns/btnBack.js";
import { handleToggleTheme } from "./theme.js";

const body = document.body;

export function listenersEvent(currentState) {
  body.addEventListener("click", (evt) => {
    const target = evt.target;

    if (target.closest(".btn-mode-game")) {
      handleBtnModeClick(evt, currentState);
    }

    if (target.closest(".btn-manager")) {
      handleBtnManagerClick(evt, currentState);
    }

    if (target.closest(".btn-back-start")) {
      handleBtnBackClik(evt, currentState);
    }

    if (target.closest('.btn-navigation'))

    if (target.closest(".btn-manager-game")) {
      handleBtnManagerGameClick(evt, currentState);
    }

    if (target.closest(".btn-game")) {
      handleBtnGameClick(evt, currentState);
    }

    if (target.closest(".cell")) {
      handleGameFieldClick(evt, currentState);
    }
  });

  body.addEventListener("change", (evt) => {
    handleToggleTheme(evt, currentState);
  });
}
