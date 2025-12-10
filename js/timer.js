import { state, setTimer } from './state.js';

let timerInterval = null;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimerDisplay(timeInSeconds) {
    const timerElement = document.querySelector('.time-count');

    if (timerElement) {
        timerElement.textContent = formatTime(timeInSeconds);
    }
}

function startTimer() {
    if(timerInterval) return;

    timerInterval = setInterval(() => {
        const newTime = state.timer + 1;

        setTimer(newTime);
        updateTimerDisplay(newTime)
    }, 1000);
}

function stopTimer() {
    if(timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    setTimer(0);
}

export { formatTime, startTimer, stopTimer, resetTimer};
