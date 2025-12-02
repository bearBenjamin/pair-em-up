import { createElement } from "../../utils.js";

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
  
  const soundContainer = createElement('div', { className: 'sound-control-container' }, soundLabel, soundCheckbox);
  
  // переключатель темы
  const themeLabel = createElement('label', { className: 'theme-label' }, 'Theme');
  themeLabel.setAttribute('for', 'theme');
  const themeSelect = createElement('select', { className: 'toggle-theme', id: 'theme', name: 'theme'});
  const lightOption = createElement('option', { value: 'light', selected: curentState.setting.theme === 'light' }, 'Light');
  const darkOption = createElement('option', { value: 'dark', selected: curentState.setting.theme === 'dark' }, 'Dark');
  themeSelect.append(lightOption);
  themeSelect.append(darkOption);
  
  const themeSetting = createElement('div', { className: 'theme-container' }, themeLabel, themeSelect);
  
  const backStartBtn = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');
  const backGameBtn = createElement('button', { className: 'btn btn-back-game' }, 'Back to Game');

  const containerBtn = createElement('div', { className: 'btn-back-container' }, backStartBtn, backGameBtn);
  
  const container = createElement('div', { className: 'wrapper setting-screen' }, title, soundContainer, themeSetting, containerBtn);
  
  document.body.append(container);
  console.log('currentState: ', curentState);
}

export { renderGameSettingScreen };