'use strict'

const zoomInBtn = document.querySelector('.zoom-in'),
  zoomOutBtn = document.querySelector('.zoom-out'),
  mapIcons = document.querySelectorAll('.map-icon'),
  mapImg = document.querySelector('.map');

let currentMapWidth = +window.getComputedStyle(mapImg).width.replace(/\D/g, ''),
  zoomCounter = 0;

function resizeHeight(zoomCounter) {
  if (zoomCounter == 1)  mapImg.style.height = '1240px';
  if (zoomCounter == 2)  mapImg.style.height = '1540px';
  if (zoomCounter == 3)  mapImg.style.height = '1840px';
  if (zoomCounter == 4)  mapImg.style.height = '2140px';
}

function zoomIn() {
  if(zoomCounter > 3) return;
  zoomCounter++;
  mapImg.setAttribute('style', 'background-size:cover');
  mapImg.style.width =  currentMapWidth + 500  + 'px';
  currentMapWidth += 500;
  resizeHeight(zoomCounter);
  replaceIcons();
} 

function zoomOut() {
  if (zoomCounter === 0) {
    return;
  }
  if (zoomCounter === 1) {
    mapImg.setAttribute('style', 'background-size:contain');
  } else {
    mapImg.setAttribute('style', 'background-size:cover');
  }
  zoomCounter--;
  mapImg.style.width =  currentMapWidth - 500 + 'px';
  currentMapWidth -= 500;
  resizeHeight(zoomCounter);
  replaceIcons();
}

zoomInBtn.addEventListener('click', () => {
  zoomIn();
});

zoomOutBtn.addEventListener('click', () => {
  zoomOut();
});

// Icons replace
let resizingRatio = [1, 1.4, 1.72, 2.1, 2.45];
let initialTops = [];
let initialLefts = [];

mapIcons.forEach(icon => {
  initialTops.push(parseInt(window.getComputedStyle(icon).top));
  initialLefts.push(parseInt(window.getComputedStyle(icon).left))
});

function replaceIcons() {
  console.log(zoomCounter);
  mapIcons.forEach((icon, index) => {
    icon.style.top = initialTops[index] * resizingRatio[zoomCounter] + 'px';
    icon.style.left = initialLefts[index] * resizingRatio[zoomCounter] + 'px';
  });
}

// Drag and drop

mapImg.addEventListener('mousedown', (e)=> {

  let shiftX = e.clientX - mapImg.getBoundingClientRect().left;
  let shiftY = e.clientY - mapImg.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    mapImg.style.left = pageX - shiftX - 215 + 'px';
    mapImg.style.top = pageY - shiftY - 167 + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
});

mapImg.ondragstart = function() {
  return false;
};