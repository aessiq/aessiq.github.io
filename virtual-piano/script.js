'use strict'

const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btns = document.querySelectorAll('.btn');
const fullscreen = document.querySelector('.fullscreen');
function playAudio(key) {
  const audio = document.querySelector(`audio[data-note=${key.dataset.note}]`);
  key.classList.toggle('piano-key-active');
  key.addEventListener('mouseup', () => key.classList.remove('piano-key-active'));
  key.addEventListener('mouseout', () => key.classList.remove('piano-key-active'));
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener('mousedown', () => {
    let isPressed = true;
    piano.addEventListener('mouseover', (event) => {
      if (event.target.classList.contains('piano-key') && isPressed) {
        playAudio(event.target);
      }
    });
    document.addEventListener('mouseup', () => {
      isPressed = false;
    });
});

pianoKeys.forEach(key => {
  key.addEventListener('mousedown', (event) => {
    playAudio(event.target);
  });
});

window.addEventListener('keydown', (event) => {
  if(event.repeat) return;
  pianoKeys.forEach(key => {
    if (event.code == key.dataset.code) {
      playAudio(key);
    }
  });
  window.addEventListener('keyup', () => {
    pianoKeys.forEach(key => {
      if (event.code == key.dataset.code) {
        key.classList.remove('piano-key-active');
      }
    });
  });
});

//notes/letter switching
btns.forEach(btn => {
  btn.addEventListener('click', event => {
    if (btn.classList.contains('btn-letters')) {
      document.querySelector('.btn-notes').classList.remove('btn-active');
      btn.classList.add('btn-active');
      pianoKeys.forEach(key => {
        key.classList.add('letter');
      });
    }
    if (btn.classList.contains('btn-notes')) {
      document.querySelector('.btn-letters').classList.remove('btn-active');
      btn.classList.add('btn-active');
      pianoKeys.forEach(key => {
        key.classList.remove('letter');
      });
    }
  });
});

fullscreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
