import {validateValues, resetValidator} from './validation.js';
import {isEnterKey, isEscapeKey} from './util.js';
import {initScale, resetScale} from './scale.js';
import {destroySlider, initSlider, resetSlider} from './slider.js';
import {openMessageBox, getMessageElement} from './message.js';
import {sendData} from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SUCCESS_TYPE_MESSAGE = 'success';
const ERROR_TYPE_MESSAGE = 'error';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadButton = document.querySelector('#upload-file');
const modalForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('#upload-select-image');
const hashtagInput = uploadForm.querySelector('[name="hashtags"]');
const commentInput = uploadForm.querySelector('[name="description"]');
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const onInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onInputFocus = (evt) => {
  evt.target.addEventListener('keydown', onInputEscKeydown);
};

const onInputBlur = (evt) => {
  evt.target.removeEventListener('keydown', onInputEscKeydown);
};

const clearInputs = () => {
  uploadButton.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
};

export const hideFormUpload = () => {
  modalForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetSlider();
  destroySlider();
  deleteListeners();
  clearInputs();
  resetValidator();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !getMessageElement()) {
    evt.preventDefault();
    hideFormUpload();
  }
};

const onButtonCloseClick = () => {
  hideFormUpload();
};

const onButtonCloseEnter = (evt) => {
  if (isEnterKey(evt)) {
    hideFormUpload();
  }
};

const addListeners = () => {
  document.addEventListener('keydown', onDocumentKeydown);
  closeFormButton.addEventListener('click', onButtonCloseClick);
  closeFormButton.addEventListener('keydown', onButtonCloseEnter);
  hashtagInput.addEventListener('focus', onInputFocus);
  hashtagInput.addEventListener('blur', onInputBlur);
  commentInput.addEventListener('focus', onInputFocus);
  commentInput.addEventListener('blur', onInputBlur);
};

function deleteListeners() {
  document.removeEventListener('keydown', onDocumentKeydown);
  closeFormButton.removeEventListener('click', onButtonCloseClick);
  closeFormButton.removeEventListener('keydown', onButtonCloseEnter);
  hashtagInput.removeEventListener('focus', onInputFocus);
  hashtagInput.removeEventListener('blur', onInputBlur);
  commentInput.removeEventListener('focus', onInputFocus);
  commentInput.removeEventListener('blur', onInputBlur);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const showFormUpload = () => {
  modalForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  addListeners();
  initScale();
  initSlider();
};

export const initFormUpload = (onStartValidator, onSuccessUpload) => {
  onStartValidator();
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(validateValues()) {
      blockSubmitButton();
      onSuccessUpload();
      openMessageBox(SUCCESS_TYPE_MESSAGE);
      unblockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccessUpload)
        .then(() => openMessageBox(SUCCESS_TYPE_MESSAGE))
        .catch(
          () => {
            openMessageBox(ERROR_TYPE_MESSAGE);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
  uploadButton.addEventListener('change', () => {
    const file = uploadButton.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
    if (matches) {
      imagePreview.src = URL.createObjectURL(file);
      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
      });
      showFormUpload();
    }
  });
};
