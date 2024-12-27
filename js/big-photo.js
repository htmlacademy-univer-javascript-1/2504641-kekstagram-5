const COMMENT_COUNT = 5;
const AVATAR_SIZE = 35;

// DOM-элементы для работы с комментариями
const commentListElement = document.querySelector('.social__comments');
const counterRenderedCommentsElement = document.querySelector('.comments-current');

// Создание элемента комментария
const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = AVATAR_SIZE;
  avatarElement.height = AVATAR_SIZE;

  const messageElement = document.createElement('p');
  messageElement.classList.add('social__text');
  messageElement.textContent = message;

  commentElement.append(avatarElement, messageElement);

  return commentElement;
};

// Добавление комментария в список
const appendComment = (comment) => {
  commentListElement.append(createCommentElement(comment));
};

// Обновление счётчика отображённых комментариев
const updateRenderedCommentsCount = (currentCount, totalCount) => Math.min(currentCount, totalCount);

// Создание кнопки "Загрузить ещё"
const createLoadMoreButton = () => {
  let button = document.querySelector('.comments-loader');
  if (!button) {
    button = document.createElement('button');
    button.type = 'button';
    button.classList.add('social__comments-loader', 'comments-loader');
    button.textContent = 'Загрузить еще';
    commentListElement.after(button);
  }
  button.classList.remove('hidden');
  return button;
};

// Управление видимостью кнопки "Загрузить ещё"
const toggleLoadMoreButtonVisibility = (isVisible) => {
  const loadMoreButton = document.querySelector('.comments-loader');
  if (loadMoreButton) {
    loadMoreButton.classList.toggle('hidden', !isVisible);
  }
};

// Обработчик клика по кнопке "Загрузить ещё"
const handleLoadMoreClick = (comments) => (event) => {
  event.preventDefault();

  const renderedCount = commentListElement.childElementCount;
  const nextComments = comments.slice(renderedCount, renderedCount + COMMENT_COUNT);

  nextComments.forEach(appendComment);

  const newRenderedCount = renderedCount + nextComments.length;
  counterRenderedCommentsElement.textContent = updateRenderedCommentsCount(newRenderedCount, comments.length);

  if (newRenderedCount >= comments.length) {
    toggleLoadMoreButtonVisibility(false);
  }
};

// Отображение всех комментариев
const renderAllComments = (comments) => {
  comments.forEach(appendComment);
  toggleLoadMoreButtonVisibility(false);
  counterRenderedCommentsElement.textContent = comments.length;
};

// Постраничное отображение комментариев
const renderPagedComments = (comments) => {
  const initialComments = comments.slice(0, COMMENT_COUNT);
  initialComments.forEach(appendComment);

  counterRenderedCommentsElement.textContent = updateRenderedCommentsCount(commentListElement.childElementCount, comments.length);

  const loadMoreButton = createLoadMoreButton();
  loadMoreButton.removeEventListener('click', handleLoadMoreClick(comments));
  loadMoreButton.addEventListener('click', handleLoadMoreClick(comments));

  toggleLoadMoreButtonVisibility(comments.length > COMMENT_COUNT);
};

// Основной метод для отображения комментариев
const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  if (comments.length <= COMMENT_COUNT) {
    renderAllComments(comments);
  } else {
    renderPagedComments(comments);
  }
};

// Экспортируемая функция для отображения деталей элемента
export const renderItemDetails = (item, outputContainer) => {
  const { comments, description, likes, url } = item;

  const bigImage = outputContainer.querySelector('.big-picture__img img');
  bigImage.src = url;
  bigImage.alt = description;

  outputContainer.querySelector('.social__caption').textContent = description;
  outputContainer.querySelector('.likes-count').textContent = likes;
  outputContainer.querySelector('.comments-count').textContent = comments.length;

  renderComments(comments);
};
