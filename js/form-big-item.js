import { renderItemDetails } from './big-photo.js';
import { isEscapeKey, isEnterKey } from './util.js';

const bodyElement = document.querySelector('body');
const openDialog = document.querySelector('.big-picture');
const closeDialog = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigItemDialog();
  }
};

function closeBigItemDialog() {
  openDialog.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  const commentsLoader = document.querySelector('.comments-loader');
  if (commentsLoader) {
    commentsLoader.remove();
  }
}

export const showBigItemDialog = (item) => {
  openDialog.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  renderItemDetails(item, openDialog);
};

export const initializeBigItemDialog = () => {
  closeDialog.addEventListener('click', closeBigItemDialog);

  closeDialog.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeBigItemDialog();
    }
  });
};
