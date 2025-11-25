export function handleBtnGameClick(evt, state) {
  switch (evt.target.getAttribute("data-action")) {
    case "hints":
      console.log("hints"); // пока так
      break;

    case "backspace":
      console.log("backspace");
      break;

    case "add":
      console.log("add");
      break;

    case "shuffle":
      console.log("shuffle");
      break;

    case "eraser":
      console.log("eraser");
      break;
  }
}
