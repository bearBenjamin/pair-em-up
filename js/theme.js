const body = document.body;

export function handleToggleTheme(evt, state) {
  if (evt.target.value === "on") {
    return;
  }

  if (evt.target.value === "dark") {
    body.setAttribute("data-theme", "dark");
    state.setting.theme = "dark";
  } else {
    body.setAttribute("data-theme", "light");
    state.setting.theme = "light";
  }
}