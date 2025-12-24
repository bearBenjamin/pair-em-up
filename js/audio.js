import { state } from './state.js';

const sounds = {
  click: new Audio('../assets/sounds/click-btn.mp3'),
  win: new Audio('../assets/sounds/win.mp3'),
  lose: new Audio('../assets/sounds/lost.mp3'),
  abort: new Audio('../assets/sounds/abort.mp3'),
  happi: new Audio('../assets/sounds/happi.mp3'),
};

const playSound = (soundName) => {
    if (state.setting.soundEnabled && sounds[soundName]) {
        console.log('внутри звука')
        console.log('sounds: ', sounds['click']);
        sounds[soundName].currentTime = 0;
        sounds[soundName].play().catch(err => console.log('Ошибка воспроизведения: ', err));
    }
};

export { playSound };
