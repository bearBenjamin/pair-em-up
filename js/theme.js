import { setTheme } from "./state.js";

const body = document.body;

function handleToggleTheme(evt) {
  if (evt.target.value === "on") {
    return;
  }

  if (evt.target.value === "dark") {
    body.setAttribute("data-theme", "dark");
    setTheme('dark');
  } else {
    body.setAttribute("data-theme", "light");
    setTheme('light');
  }
}

export { handleToggleTheme };
