const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsToShow = []; // хранение комментариев фотографии
let displayedCommentsCount = 0; // количество отображённых комментариев

// Функция для отображения окончания слова в счётчике комментариев
function endWordComment(number){
  if (number % 10 === 1 && number % 100 !== 11){
    return 'комментария';
  }
  return 'комментариев';
}

const renderFullPhoto = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;


  // Очистка предыдущих комментариев
  socialCommentsList.innerHTML = '';
  commentsToShow = comments.slice(0, 5); // Начинаем с первых 5 комментариев
  displayedCommentsCount = 5; // Показываем 5 комментариев
  updateComments();
  if (displayedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  // Отображаем блоки счётчика комментариев и загрузки новых комментариев
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Событие на кнопку "Загрузить ещё"
  commentsLoader.addEventListener('click', () => {
    // Загружаем следующие 5 комментариев
    const nextComments = comments.slice(displayedCommentsCount, displayedCommentsCount + 5);
    commentsToShow = [...commentsToShow, ...nextComments];
    displayedCommentsCount += nextComments.length; // Обновляем счётчик показанных комментариев
    updateComments();
  });

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

// Функция для обновления списка комментариев и числа в блоке .social__comment-count
function updateComments() {
  socialCommentsList.innerHTML = ''; // Очистить список комментариев
  commentsToShow.forEach(({avatar, message, name}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
      <p class="social__text">${message}</p>
    `;
    socialCommentsList.appendChild(commentElement);
  });

  // Обновляем счётчик комментариев
  commentCountBlock.textContent = `${displayedCommentsCount} ${endWordComment(displayedCommentsCount)} из ${commentsCount.textContent}`;
}

// Функция закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Событие на кнопку закрытия
closeButton.addEventListener('click', closeBigPicture);

// Событие на Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

export { renderFullPhoto };
