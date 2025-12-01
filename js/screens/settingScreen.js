import { createElement } from "../utils.js";

export function renderSettingScreen (curentState) {
    curentState.currentScreen = 'setting';
    console.log('curentState setting screen: ', curentState);
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
    const lightOption = createElement('option', { value: 'light', selected: state.setting.theme === 'light' }, 'Light');
    const darkOption = createElement('option', { value: 'dark', selected: state.setting.theme === 'dark' }, 'Dark');
    themeSelect.append(lightOption);
    themeSelect.append(darkOption);

    const themeSetting = createElement('div', { className: 'theme-container' }, themeLabel, themeSelect);

    const backBtn = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');

    const container = createElement('div', { className: 'wrapper setting-screen' }, title, soundContainer, themeSetting, backBtn);

    document.body.append(container);
}