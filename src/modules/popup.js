import { generateComment, addNewComment } from './comment.js';
import updateCounter from './countComments.js';

export const fetchMealData = async (id) => {
  const mealDbApi = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(`${mealDbApi}`);
  const data = await response.json();
  return data.meals;
};

const addCommentEvent = async () => {
  const form = document.querySelector('#form');
  const addCommentBtn = document.querySelector('.add-comment-btn');

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const user = form.elements.fname;
    const comment = form.elements.newUserComment;

    await addNewComment(addCommentBtn.id, user.value, comment.value);

    const commentDiv = document.querySelector('.comments-div');
    const commentParagraph = await generateComment(addCommentBtn.id);
    commentDiv.innerHTML = '';
    commentDiv.append(commentParagraph);

    const commentCountSpan = document.querySelector('#comment-counter');
    const commentNumbers = updateCounter();
    commentCountSpan.textContent = `${commentNumbers}`;

    form.reset();
  });
};

const addCloseEvent = () => {
  const closeBtn = document.getElementById('closebtn');
  closeBtn.addEventListener('click', () => {
    const popupSection = document.querySelector('.pop-up');
    popupSection.style.display = 'none';
  });
};

const createPopHtml = (mealDetails) => {
  const popupDetails = document.createElement('div');
  popupDetails.className = 'popup-details';
  popupDetails.innerHTML = `
    <span id="closebtn" class="closebtn">&times;</span>
            <div class="meal">
               <img src='${mealDetails.strMealThumb}' alt="meal">
            </div>
            <h2>${mealDetails.strMeal}</h2>
            <div class="flex">
                <h4>Area: ${mealDetails.strArea}</h4>
                <h4>Category: ${mealDetails.strCategory}</h4>
            </div>
            <h3>Comments (<span id="comment-counter"></span>)</h3>
            <div class="comments-div">
              
            </div>
            <h3>Add a Comment</h3>
            <form method="post" class="flex" id="form">
                <input class="name-field" type="text" id="fname" name="fname" value="" placeholder="Your name" required>
                <textarea maxlength="500" cols="30" rows="10" id="newUserComment" class="text-area" placeholder="Your insights" required></textarea>
                <button class="add-comment-btn" id='${mealDetails.idMeal}' type="submit">Comment</button>
              </form> 
    `;
  return popupDetails;
};

export const showPopup = async (id) => {
  const popupSection = document.querySelector('.pop-up');
  popupSection.innerHTML = ' ';

  const mealDetails = await fetchMealData(id);
  popupSection.append(createPopHtml(mealDetails[0]));

  const commentDiv = document.querySelector('.comments-div');
  const commentParagraph = await generateComment(id);
  commentDiv.append(commentParagraph);

  const commentCountSpan = document.querySelector('#comment-counter');
  const commentNumbers = updateCounter();
  commentCountSpan.textContent = `${commentNumbers}`;

  popupSection.style.display = 'block';
  addCommentEvent();
  addCloseEvent();
};
