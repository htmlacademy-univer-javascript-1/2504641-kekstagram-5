const COMMENTS_STEP = 5;
const AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsToShow = [];
let displayedCommentsCount = 0;

const createCommentElement = (comment) => {
  const commentLi = document.createElement('li');
  commentLi.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = AVATAR_SIZE;
  commentImage.height = AVATAR_SIZE;

  const commentParagraph = document.createElement('p');
  commentParagraph.classList.add('social__text');
  commentParagraph.textContent = comment.message;

  commentLi.append(commentImage, commentParagraph);

  return commentLi;
};

const onCommentsRender = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = commentsToShow.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP);

  nextComments.forEach((comment) => {
    const commentEl = createCommentElement(comment);
    fragment.appendChild(commentEl);
  });

  commentList.appendChild(fragment);
  displayedCommentsCount += nextComments.length;

  commentCountBlock.textContent = `${displayedCommentsCount} из ${commentsToShow.length} комментариев`;

  if (displayedCommentsCount >= commentsToShow.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const initializeComments = (comments) => {
  commentList.innerHTML = '';
  commentsToShow = comments || [];
  displayedCommentsCount = 0;

  if (commentsToShow.length === 0) {
    commentCountBlock.textContent = '0 из 0 комментариев';
    commentsLoader.classList.add('hidden');
  } else {
    onCommentsRender();
  }
};

export const renderItemDetails = (item) => {
  bigImage.src = item.url;
  bigImage.alt = item.description;
  likesCount.textContent = item.likes;
  commentsCount.textContent = item.comments.length;
  socialCaption.textContent = item.description;

  initializeComments(item.comments);
};

commentsLoader.addEventListener('click', onCommentsRender);
