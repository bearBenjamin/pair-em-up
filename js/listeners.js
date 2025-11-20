import { renderResultScreen } from './screens/resultScreen.js';
import { renderSettingScreen } from './screens/settingScreen.js';
import { renderStarScreen } from './screens/startScreen.js';
import { renderGameScreen } from './screens/gameScreen.js';
import { getGrid } from './utils.js';

const body = document.body;

export function listenersEvent(state) {
    console.log('body: ', body);

    body.addEventListener('click', (evt) => {
        handleBtnModeClick(evt, state);
        handleBtnManagerClick(evt, state);
        handleBtnBackClik(evt, state);
        handleBtnGameClick(evt, state);
    });
}

function handleBtnModeClick(evt, state) {
    state.currentScreen = "game";

    switch(evt.target.getAttribute('data-action')) {
        case 'open-classic-screen' :
            state.mode = "classic";
            state.grid = getGrid(state.mode);
            console.log('state.grid: ', state.grid);
            state.selectedCells = state.grid.map((item, index) => index);
            renderGameScreen(state);
        break;

        case 'open-random-screen' :
            state.mode = "random";
            state.grid = getGrid(state.mode);
            state.selectedCells = state.grid.map((item, index) => index);
            renderGameScreen(state);
        break;

        case 'open-chaotic-screen' :
            state.mode = "chaotic";
            state.grid = getGrid(state.mode);
            state.selectedCells = state.grid.map((item, index) => index);
            renderGameScreen(state);
        break;
    }
}

function handleBtnManagerClick(evt, state) {
    switch(evt.target.getAttribute('data-action')) {
        case 'open-setting-screen' :
            renderSettingScreen(state);
        break;

        case 'open-result-screen' :
            renderResultScreen(state);
        break;
    }
}

function handleBtnBackClik(evt, state) {
    if (evt.target.className.split(' ')[1] === 'btn-back-start') {
        renderStarScreen(state);
    }   
}

function handleBtnGameClick(evt, state) {
    switch(evt.target.getAttribute('data-action')) {
        case 'hints' :
            console.log('hints'); // пока так
        break;

        case 'backspace' :
            console.log('backspace');
        break;

        case 'add' :
            console.log('add');
        break;

        case 'shuffle' :
            console.log('shuffle');
        break;

        case 'eraser' :
            console.log('eraser');
        break;
    }
}