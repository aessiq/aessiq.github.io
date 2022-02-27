'use strict'

const loginBtn = document.querySelector('.log-in'),
  modal = document.querySelector('.modal'),
  createAccount = document.querySelector('.create-account'),
  modalSwitch = document.querySelector('.create-account-switch'),
  passwordFields = document.querySelectorAll('[data-password]'),
  submitBtns = document.querySelectorAll('[data-submit]'),
  createAccountForm = document.querySelector('.create-account-form'),
  loginForm = document.querySelector('.login-form'),
  petsArrowNext = document.querySelector('.pets-in-zoo-arrow-right'),
  petsArrowPrev = document.querySelector('.pets-in-zoo-arrow-left'),
  slider = document.querySelector('.slider'),
  logOutBtn = document.querySelector('.log-out'),
  signUpBtn = document.querySelector('.sign-up');

function toggleLogin() {
  document.querySelector('[data-login]').classList.add('create-account-switch__title_active');
  document.querySelector('[data-signup]').classList.remove('create-account-switch__title_active');
  document.querySelector('.login-form').classList.remove('hidden');
  document.querySelector('.create-account-form').classList.add('hidden');
  createAccount.classList.add('login-height');
}

function toggleSignup() {
  document.querySelector('[data-signup]').classList.add('create-account-switch__title_active');
  document.querySelector('[data-login]').classList.remove('create-account-switch__title_active');
  document.querySelector('.create-account-form').classList.remove('hidden');
  document.querySelector('.login-form').classList.add('hidden');
  createAccount.classList.remove('login-height');
}

loginBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  toggleLogin();
});

signUpBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  toggleSignup();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

modalSwitch.addEventListener('click', (e) => {
  if (!e.target.classList.contains('.create-account-switch__title_active') && 'login' in e.target.dataset) {
    toggleLogin();
  }
  if (!e.target.classList.contains('.create-account-switch__title_active') && 'signup' in e.target.dataset) {
    toggleSignup();
  }
});

function disableSubmit() {
  submitBtns.forEach(item => {
    item.disabled = true;
  });
}

function enableSubmit() {
  submitBtns.forEach(item => {
    item.disabled = false;
  });
}

passwordFields.forEach(item => {
  item.addEventListener('change', () => {
    if (item.value.length < 8) {
      alert('Password must be 8 symbols or more');
      disableSubmit();
    }
  });
});

createAccountForm.addEventListener('input', () => {
  let acc = 0;
  if (document.querySelector('#create-account-form__name').value === '') acc++;
  if (document.querySelector('#create-account-form__email').value === '') acc++;
  if (document.querySelector('#create-account-form__password').value.length < 8) acc++;
  if (!document.querySelector('#create-account-form__agree').checked) acc++;
  if (acc === 0) {
    document.querySelector('.create-account-form__submit').classList.remove('form__submit_inactive');
    enableSubmit();
  }
  if (acc !== 0 && !document.querySelector('.create-account-form__submit').classList.contains('form__submit_inactive')) {
    document.querySelector('.create-account-form__submit').classList.add('form__submit_inactive');
    disableSubmit();
  }
});

loginForm.addEventListener('input', () => {
  let acc = 0;
  if (document.querySelector('#login-form__email').value === '') acc++;
  if (document.querySelector('#login-form__password').value.length < 8) acc++;
  console.log(acc);
  if (acc === 0) {
    document.querySelector('.login-form__submit').classList.remove('form__submit_inactive');
    enableSubmit();
  }
  if (acc !== 0 && !document.querySelector('.login-form__submit').classList.contains('form__submit_inactive')) {
    document.querySelector('.login-form__submit').classList.add('form__submit_inactive');
  }
});

function login() {
  modal.classList.add('hidden');
  loginBtn.classList.add('hidden');
  signUpBtn.classList.add('hidden');
  document.querySelector('.username').classList.remove('hidden');
  logOutBtn.classList.remove('hidden');
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (document.querySelector('#login-form__email').value === 'user@gmail.com' && document.querySelector('#login-form__password').value === 'useruser') {
    login();
    document.querySelector('.username-title').setAttribute('title', 'User');
  }
  if (document.querySelector('#login-form__email').value !== 'user@gmail.com' || document.querySelector('#login-form__password').value !== 'useruser') {
    alert('Wrong email or password');
    e.preventDefault();
  }
});

createAccountForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (document.querySelector('#create-account-form__name').value !== '' && document.querySelector('#create-account-form__email').value !== '' && document.querySelector('#create-account-form__password').value.length >= 8 && document.querySelector('#create-account-form__agree').checked) {
    login();
    document.querySelector('.username-title').setAttribute('title', `${document.querySelector('#create-account-form__name').value}`);
  }
});

logOutBtn.addEventListener('click', () => {
  loginBtn.classList.remove('hidden');
  signUpBtn.classList.remove('hidden');
  document.querySelector('.username').classList.add('hidden');
  logOutBtn.classList.add('hidden');
});

const googleSignUp = document.querySelector('.socials-sign-in-button_google'),
  facebookSignUp = document.querySelector('.socials-sign-in-button_facebook');

googleSignUp.addEventListener('click' , () => {
  login();
  document.querySelector('.username-title').setAttribute('title', 'Logged in with Google');
});

facebookSignUp.addEventListener('click' , () => {
  login();
  document.querySelector('.username-title').setAttribute('title', 'Logged in with Facebook');
});  

// Pets in Zoo Slider
function petsNextSlide() {
  petsArrowNext.removeEventListener('click', petsNextSlide);
  let sliderCards = document.querySelectorAll('.slider-card');
  slider.style.transition = '.5s';
  slider.append(sliderCards[0].cloneNode(true));
  slider.append(sliderCards[1].cloneNode(true));
  slider.style.transform = 'translateX(-500px)';
  function deleting() {
    sliderCards[0].remove();
    sliderCards[1].remove();
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(0px)';
    petsArrowNext.addEventListener('click', petsNextSlide);
  }
  setTimeout(deleting, 500);
}

function petsPrevSlide() {
  petsArrowPrev.removeEventListener('click', petsPrevSlide);
  let sliderCards = document.querySelectorAll('.slider-card');
  slider.style.transition = 'none';
  slider.style.transform = 'translateX(-500px)';
  slider.prepend(sliderCards[5].cloneNode(true));
  slider.prepend(sliderCards[4].cloneNode(true));
  sliderCards = document.querySelectorAll('.slider-card');
  setTimeout(() => {
    slider.style.transition = '.5s';
    slider.style.transform = 'translateX(0px)';
  }, 10);
  function deleting() {
    sliderCards[6].remove();
    sliderCards[7].remove();
    petsArrowPrev.addEventListener('click', petsPrevSlide);
  }
  setTimeout(deleting, 500);
}

petsArrowNext.addEventListener('click', petsNextSlide);
petsArrowPrev.addEventListener('click', petsPrevSlide);

// Look at animals slider

const lookAtAnimalsSliderCards = document.querySelectorAll('.look-at-animals__item'),
  lookAtAnimalsSlider = document.querySelector('.look-at-animals__slider'),
  lookAtAnimalsSliderArrowNext = document.querySelector('.look-at-animals__arrow-right'),
  lookAtAnimalsSliderArrowPrev = document.querySelector('.look-at-animals__arrow-left'),
  leaveFeedbackBtn = document.querySelector('.leave-feedback');
let lookAtAnimalsSliderOffset = 0;

function nextSlide() {
  const sliderOffsetStep = +window.getComputedStyle(lookAtAnimalsSliderCards[0]).width.replace(/\D/g, '') + +window.getComputedStyle(lookAtAnimalsSlider).gap.replace(/\D/g, '');
  lookAtAnimalsSliderOffset -= sliderOffsetStep;
  if (lookAtAnimalsSliderOffset < -(lookAtAnimalsSliderCards.length-7)*sliderOffsetStep) lookAtAnimalsSliderOffset = 0;
  lookAtAnimalsSlider.style.transform = `translateX(${lookAtAnimalsSliderOffset}px)`;
}

function prevSlide() {
  const sliderOffsetStep = +window.getComputedStyle(lookAtAnimalsSliderCards[0]).width.replace(/\D/g, '') + +window.getComputedStyle(lookAtAnimalsSlider).gap.replace(/\D/g, '');
  lookAtAnimalsSliderOffset += sliderOffsetStep;
  if (lookAtAnimalsSliderOffset > 0) lookAtAnimalsSliderOffset = -(lookAtAnimalsSliderCards.length-7)*sliderOffsetStep;
  lookAtAnimalsSlider.style.transform = `translateX(${lookAtAnimalsSliderOffset}px)`;
}

lookAtAnimalsSliderArrowNext.addEventListener('click', () => {
  nextSlide();
});

lookAtAnimalsSliderArrowPrev.addEventListener('click', () => {
  prevSlide();
});
let screenWidth = document.body.clientWidth;
const onresize = function() {
  screenWidth = document.body.clientWidth;
  console.log(screenWidth);
}
window.addEventListener("resize", onresize);
let lookAtAnimalsSliderTimer;
if (screenWidth > 600) {
  lookAtAnimalsSliderTimer = setInterval(nextSlide, 10000);
}

//Automatic carousel 

let comments = document.querySelectorAll('.comment'),
  commentsWrapper = document.querySelector('.comments'),
  commentsTimer = setInterval(commentsNextSlide, 10000);

function commentsNextSlide() {
  comments = document.querySelectorAll('.comment');
  commentsWrapper.style.transition = '.5s';
  commentsWrapper.append(comments[0].cloneNode(true));
  commentsWrapper.style.transform = 'translateX(-500px)';
  function commentDeleting() {
    comments[0].remove();
    commentsWrapper.style.transition = 'none';
    commentsWrapper.style.transform = 'translateX(0px)';
  }
  setTimeout(commentDeleting, 500);
}

function commentsPause() {
  clearInterval(commentsTimer);
  commentsTimer = setInterval(commentsNextSlide, 30000);
  setTimeout(() => {
    clearInterval(commentsTimer);
    commentsTimer = setInterval(commentsNextSlide, 10000);
  }, 30000);
}

commentsWrapper.addEventListener('click', (e) => {
  if (e.target !== e.currentTarget) commentsPause();
});





