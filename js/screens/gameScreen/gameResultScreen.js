import { createElement } from "../../utils.js";
import { state } from '../../state.js';

function renderGameResultScreen() {
    document.body.innerHTML = '';
  
    const title = createElement('h1', { className: 'page-title' }, 'Result');
  
    const colTitleOne = createElement('td', { className: 'name-item-table' }, 'Name');
    const colTitleTwo = createElement('td', { className: 'name-item-table' }, 'Points');
  
    const rowOne = createElement('tr', { className: 'row-one' }, colTitleOne, colTitleTwo);
  
    const colNameOneRowTwo = createElement('td', { className: 'name-item-table' }, 'Classic');
    const colNameTwoRowTwo = createElement('td', { className: 'name-item-table' }, `${state.highScore['classic']}`);
  
    const rowTwo = createElement('tr', { className: 'row-two' }, colNameOneRowTwo, colNameTwoRowTwo);
  
    const colNameOneRowThree = createElement('td', { className: 'name-item-table' }, 'Random');
    const colNameTwoRowThree = createElement('td', { className: 'name-item-table' }, `${state.highScore['random']}`);
  
    const rowThree = createElement('tr', { className: 'row-three' }, colNameOneRowThree, colNameTwoRowThree);
  
    const colNameOneRowFour = createElement('td', { className: 'name-item-table' }, 'Chaotic');
    const colNameTwoRowFour = createElement('td', { className: 'name-item-table' }, `${state.highScore['chaotic']}`);
  
    const rowFour = createElement('tr', { className: 'row-four' }, colNameOneRowFour, colNameTwoRowFour);
  
    const rowChilds = [rowOne, rowTwo, rowThree, rowFour];
  
    const tableContainer = createElement('table', { className: 'table-point' }, ...rowChilds);
  
    const backStartBtn = createElement('button', { className: 'btn btn-back-start' }, 'Back to Start');
    const backGameBtn = createElement('button', { className: 'btn btn-back-game' }, 'Back to Game');

    const containerBtn = createElement('div', { className: 'btn-back-container' }, backStartBtn, backGameBtn);
  
    const pageContainer = createElement('div', { className: 'wrapper result-screen' }, title, tableContainer, containerBtn);
  
    document.body.append(pageContainer);
};

export { renderGameResultScreen };
