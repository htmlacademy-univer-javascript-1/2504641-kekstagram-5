import { renderItemDetails } from './big-photo.js';
import { isEscapeKey, isEnterKey } from './util.js';

const body = document.querySelector('body');
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
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const showBigItemDialog = (item) => {
  openDialog.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  renderItemDetails(item);
};

export const initializeBigItemDialog = () => {
  closeDialog.addEventListener('click', closeBigItemDialog);

  closeDialog.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      closeBigItemDialog();
    }
  });
};
