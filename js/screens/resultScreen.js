import { createElement } from "../utils.js";
import { renderStarScreen } from "./startScreen.js";

export function renderResultScreen(curentState) {
    curentState.currentScreen = 'result';
    console.log('curentState result: ', curentState);
    document.body.innerHTML = '';

    const title = createElement('h1', { className: 'page-title' }, 'Result');

    const colTitleOne = createElement('td', { className: 'name-item-table' }, 'Name');
    const colTitleTwo = createElement('td', { className: 'name-item-table' }, 'Points');

    const rowOne = createElement('tr', { className: 'row-one' }, colTitleOne, colTitleTwo);

    const colNameOneRowTwo = createElement('td', { className: 'name-item-table' }, 'Classic');
    const colNameTwoRowTwo = createElement('td', { className: 'name-item-table' });

    const rowTwo = createElement('tr', { className: 'row-two' }, colNameOneRowTwo, colNameTwoRowTwo);

    const colNameOneRowThree = createElement('td', { className: 'name-item-table' }, 'Random');
    const colNameTwoRowThree = createElement('td', { className: 'name-item-table' });

    const rowThree = createElement('tr', { className: 'row-three' }, colNameOneRowThree, colNameTwoRowThree);

    const colNameOneRowFour = createElement('td', { className: 'name-item-table' }, 'Chaotic');
    const colNameTwoRowFour = createElement('td', { className: 'name-item-table' });

    const rowFour = createElement('tr', { className: 'row-four' }, colNameOneRowFour, colNameTwoRowFour);

    const rowChilds = [rowOne, rowTwo, rowThree, rowFour];

    const tableContainer = createElement('table', { className: 'table-point' }, ...rowChilds);

    const btnBack = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');

    const pageContainer = createElement('div', { className: 'wrapper result-screen' }, title, tableContainer, btnBack);

    document.body.append(pageContainer);

    const backBtn = document.querySelector('.btn-back-start');

    backBtn.addEventListener('click', () => {
        state.currentScreen = 'start';
        renderStarScreen(state);
    })
}