function getModalElements() {
    const modalOverlay = document.querySelector('.modal-overlay');

    if (!modalOverlay) {
        console.error('Модальное окно не найдено! Убедитесь, что renderGameScreen отрисовал его.');
        return null;
    }

    return {
        overlay: modalOverlay,
        message: modalOverlay.querySelector('.modal-message'),
        closeButton: modalOverlay.querySelector('.modal-close-button'),
    };
}

export function showModal(message) {
    const elements = getModalElements();
    if (!elements) return;

    elements.message.textContent = message;

    elements.closeButton.onclick = hideModal;
    elements.overlay.onclick = (evt) => {
        if (evt.target === elements.overlay) {
            hideModal();
        }
    };

    elements.overlay.classList.remove('visually-hidden');
}

function hideModal() {
    const elements = getModalElements();
    if(!elements) return;

    elements.overlay.classList.add('visually-hidden');

    elements.closeButton.onclick = null;
    elements.overlay.onclick = null;
}