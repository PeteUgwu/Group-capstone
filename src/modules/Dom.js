import ht2 from '../heart2.png';
import ht from '../heart.png';
import countFoods from './countFoods.js';
import { addlikes, getlikes } from './likes.js';
import { addPopEvent } from './popup.js';

const container = document.querySelector('.grid-container');

const loadPopUp = (meal) => {
  popup(meal);
};

const like = (element) => {
  addlikes(element);
};

const innerData = (meal) => {
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="grid-item">
        <div class="food">
            <div>
               <span style="display: none" id="idCategory">${meal.idMeal}</span>
                <img src="${meal.strMealThumb}" height="200" alt="">
            </div>
            <div class="food-name">
                <span>${meal.strMeal}</span>
                <span class="like"><img src="${ht2}" alt="" width="15" height="15" srcset=""></span>
            </div>
            <div class="likes">
                <span class="likes-count">0<span> likes</span></span>
            </div>
            <div>
                <input type="button" value="comments">
            </div>
        </div>
    </div>`;
  div.querySelector('input[type="button"]').addEventListener('click', () => {
    loadPopUp(meal);
  });
  div.querySelector('.like').addEventListener('click', (e) => {
    like(e.target.parentNode.parentNode.parentNode.querySelector('#idCategory').innerText);
  });
  container.appendChild(div);
  addPopEvent();
};

const fillDom = (meals) => {
  container.innerHTML = '';
  meals.forEach((meal) => {
    innerData(meal);
  });
  countFoods(meals.length);
  getlikes();
};

export { fillDom, innerData };