import { setTheme, setSound } from "./state.js";

const body = document.body;

function handleToggleTheme(evt) {
  const target = evt.target;

  if (target.name === 'theme') {
    const selectedTheme = target.value;
    body.setAttribute('data-theme', selectedTheme);
    setTheme(selectedTheme);
  }
  
  if (target.name === 'sound') {
    const isSoundOn = target.checked;
    setSound(isSoundOn);
  }
}

export { handleToggleTheme };
