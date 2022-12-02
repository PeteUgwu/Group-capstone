import './style.css';
import $ from 'jquery';
import loadmeals from './modules/meals.js';

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

$(document).ready(($) => {
  loadmeals();
  const bArray = [];
  const sArray = [4, 6, 8, 10];
  for (let i = 0; i < $('.bubbles').width(); i += 1) {
    bArray.push(i);
  }
  setInterval(() => {
    const size = randomValue(sArray);
    $('.bubbles').append(`<div class="individual-bubble" style="left: ${randomValue(bArray)}px; width: ${size}px; height:${size}px;"></div>`);
    $('.individual-bubble').animate({
      bottom: '100%',
      opacity: '-=0.7',
    }, 30000, () => {
      $(this).remove();
    });
  }, 350);
});