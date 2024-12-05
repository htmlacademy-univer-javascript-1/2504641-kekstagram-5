import { isEscapeKey } from "./util";
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const renderFullPhoto = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Очистка комментариев
  socialCommentsList.innerHTML = '';
  comments.forEach(({avatar, message, name}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
    <img class="social__picture" src="${avatar} alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
    `;
    socialCommentsList.appendChild(commentElement);
  });

  // Скрыть блоки счётчика комментариев и загрузки новых комментариев
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

// Функция закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Событие на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);

// Событие на Escape
document.addEventListener('keydown', (event) => {
  if (isEscapeKey) {
    closeBigPicture();
  }
});

export { renderFullPhoto };
