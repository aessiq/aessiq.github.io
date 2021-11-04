'use strict'

const mainVideo = document.querySelector('.player__video');
const sideCamerasWrappers = document.querySelectorAll('.player__camera-wrapper');
const sideCameras = document.querySelectorAll('.player__side-camera');

//  Switching cameras
sideCamerasWrappers.forEach((item, index) => {
  item.addEventListener('click', () => {
    console.log(sideCameras[index].dataset.favorited);

    let t1 = mainVideo.src;
    mainVideo.src = sideCameras[index].src;
    sideCameras[index].src = t1;

    let t2 = mainVideo.dataset.favorited;
    mainVideo.dataset.favorited = sideCameras[index].dataset.favorited;
    sideCameras[index].dataset.favorited = t2;

    
    if (mainVideo.dataset.favorited === 'true') {
      enableFavorite();
    } else {
      disableFavorite();
    }
  });  
});

//  Favorite button
const favorite = document.querySelector('.favorite');
function enableFavorite() {
  favorite.firstChild.src = '../../assets/icons/favorite-active.svg';
  favorite.classList.add('favorite_active');
  mainVideo.dataset.favorited = true; 
}
function disableFavorite() {
  favorite.firstChild.src = '../../assets/icons/button-heart.svg';
  favorite.classList.remove('favorite_active');
  mainVideo.dataset.favorited = false; 
}

favorite.addEventListener('click', () => {
  if (!favorite.classList.contains('favorite_active')) {
    enableFavorite();
  } else {
    disableFavorite();
  }
});


