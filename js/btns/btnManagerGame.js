
export function handleBtnManagerGameClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "reset-game":
      console.log("reset");
      break;

    case "continue-game":
      console.log("continue");
      break;

    case "save-game":
      console.log("save");
      break;
  }
}