const body = document.body;

export function handleToggleTheme(evt, currentState) {
  if (evt.target.value === "on") {
    return;
  }

  if (evt.target.value === "dark") {
    body.setAttribute("data-theme", "dark");
    currentState.setting.theme = "dark";
  } else {
    body.setAttribute("data-theme", "light");
    currentState.setting.theme = "light";
  }
}