import { state } from '../state.js';
import { createElement } from '../utils.js';

// Вспомогательная функция для рендеринга
function renderModal(modalElement) {
    document.body.appendChild(modalElement); 
}

export function renderMessageModal(message) {
  const btnCloseModalHint = createElement("button", { className: "btn modal-hint-close-button" }, "Close");
  const modalHintMessage = createElement("p", { className: "modal-hint-message" }, message);
  const modalHint = createElement("div", { className: "modal-hint" }, modalHintMessage, btnCloseModalHint);

  const modalHintContainer = createElement("div", { className: "modal-overlay hint" }, modalHint);

  renderModal(modalHintContainer);
}

export function renderLoseModal() {
  const modalLostTitle = createElement('h2', { className: 'modal-lose-title' }, 'Game Over');
  const modalLostMessage = createElement('p', { className: 'modal-lose-message' }, 'Unfortunately, we\'re out of moves.');
  const modalLostScore = createElement('p', { classNam: 'modal-lose-score' }, `Score: ${state.score}`);
  
  const contentLostChildrens = [modalLostTitle, modalLostMessage, modalLostScore];

  //const btnLostClose = createElement('button', { className: 'btn btn-lose-close', 'data-action': 'close' }, 'Close');
  const btnLostNewGame = createElement('button', { className: 'btn btn-lost-new-game btn-manager-game', 'data-action': 'reset-game' }, 'Play New Game');
  const btnLostBackToStart = createElement('button', { className: 'btn btn-back-start' }, 'Back To Start');

  const btnLostChildrens = [btnLostNewGame, btnLostBackToStart];

  const containerLostBtn = createElement('div', { className: 'modal-lose-action' }, ...btnLostChildrens);

  const containerLostContent = createElement('div', { className: 'modal-lose' }, ...contentLostChildrens, containerLostBtn);

  const modalLoseContainer = createElement('div', { className: 'modal-overlay lost'}, containerLostContent);

  renderModal(modalLoseContainer);
}

export function renderWinModal() {
  const modalWinTitle = createElement('h2', { className: 'modal-win-title' }, 'Congratulations on your victory!');
  const modalWinMessage = createElement('p', { className: 'modal-win-message' }, 'You have successfully found all pairs of numbers.');
  const modalWinScore = createElement('p', { classNam: 'modal-win-score' }, `Score: ${state.score}`);
  const modalWinTime = createElement('p', { className: 'modal-win-time' }, `Time: ${state.time}`);
  const modalWinBestScore = createElement('p', { className: 'modal-win-best' }, `Best score: ${state.highScore[state.mode]}`);
  
  const contentWinChildrens = [modalWinTitle, modalWinMessage, modalWinScore, modalWinTime, modalWinBestScore];

  //const btnLostClose = createElement('button', { className: 'btn btn-lose-close', 'data-action': 'close' }, 'Close');
  const btnWinNewGame = createElement('button', { className: 'btn btn-win-new-game btn-manager-game', 'data-action': 'reset-game' }, 'Play New Game');
  const btnWinBackToStart = createElement('button', { className: 'btn btn-back-start' }, 'Back To Start');

  const btnWinChildrens = [btnWinNewGame, btnWinBackToStart];

  const containerWinBtn = createElement('div', { className: 'modal-win-action' }, ...btnWinChildrens);

  const containerWinContent = createElement('div', { className: 'modal-win' }, ...contentWinChildrens, containerWinBtn);

  const modalWinContainer = createElement('div', { className: 'modal-overlay won'}, containerWinContent);

  renderModal(modalWinContainer);
}

export { renderMessageModal, renderLoseModal, renderWinModal };