import { createElement } from "../../utils.js";
import { state } from '../../state.js';

function renderGameSettingScreen(curentState) {
  console.log('curentState: ', curentState);

  document.body.innerHTML = '';
  
  const title = createElement('h1', { className: 'page-title' }, 'Setting');
      
  // переключатель звука
  const soundLabel = createElement('label', { className: 'sound-label' }, 'Sound Effect');
  soundLabel.setAttribute('for', 'sound');
  const soundCheckbox = createElement('input', { className: 'toggle-sound' });
  soundCheckbox.setAttribute('type', 'checkbox');
  soundCheckbox.setAttribute('name', 'sound');
  soundCheckbox.setAttribute('id', 'sound');
  soundCheckbox.checked = state.setting.soundEnabled;
  
  const soundContainer = createElement('div', { className: 'sound-control-container' }, soundLabel, soundCheckbox);
  
  // переключатель темы
  const themeLabel = createElement('label', { className: 'theme-label' }, 'Theme');
  themeLabel.setAttribute('for', 'theme');
  const themeSelect = createElement('select', { className: 'toggle-theme', id: 'theme', name: 'theme'});
  const lightOption = createElement('option', { value: 'light' }, 'Light');
  const darkOption = createElement('option', { value: 'dark' }, 'Dark');
  if (state.setting.theme === 'light') lightOption.selected = true;
  if (state.setting.theme === 'dark') darkOption.selected = true;
  themeSelect.append(lightOption, darkOption);
  
  const themeSetting = createElement('div', { className: 'theme-container' }, themeLabel, themeSelect);
  
  const backStartBtn = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');
  const backGameBtn = createElement('button', { className: 'btn btn-back-game' }, 'Back to Game');

  const containerBtn = createElement('div', { className: 'btn-back-container' }, backStartBtn, backGameBtn);
  
  const container = createElement('div', { className: 'wrapper setting-screen' }, title, soundContainer, themeSetting, containerBtn);
  
  document.body.append(container);
  console.log('currentState: ', curentState);
}

export { renderGameSettingScreen };