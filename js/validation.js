import {checkLength, checkRepeats} from './util.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 19;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_MAX_QUANTITY = 5;
const messages = {
  hasHash: `Правило: первый символ # далее буквы и числа, но не более ${HASHTAG_MAX_LENGTH} шт.`,
  maxQuantity: `Максимально может быть ${HASHTAG_MAX_QUANTITY} хэштегов`,
  noRepetitions: 'Хэштеги не могут повторяться',
  maxLengthComment: `Максимальная длина комментария: ${COMMENT_MAX_LENGTH} символов`
};

const uploadForm = document.querySelector('#upload-select-image');
const hashtagInput = uploadForm.querySelector('[name="hashtags"]');
const commentInput = uploadForm.querySelector('[name="description"]');

const validator = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const onCheckHasHash = () => hashtagInput.value !== '' ? hashtagInput.value
  .trim()
  .split(' ')
  .filter(Boolean)
  .every((hashtag) => HASHTAG_REGEX.test(hashtag)) : true;
const onCheckMaxQuantity = () => checkLength(hashtagInput.value.split(' ').filter(Boolean), HASHTAG_MAX_QUANTITY);
const onCheckNoRepetitions = () => checkRepeats(hashtagInput.value.split(' ').filter(Boolean));
const onCheckMaxLengthComment = () => checkLength(commentInput.value, COMMENT_MAX_LENGTH);

export const initValidation = () => {
  validator.addValidator(hashtagInput, onCheckHasHash, messages.hasHash);
  validator.addValidator(hashtagInput, onCheckMaxQuantity, messages.maxQuantity);
  validator.addValidator(hashtagInput, onCheckNoRepetitions, messages.noRepetitions);
  validator.addValidator(commentInput, onCheckMaxLengthComment, messages.maxLengthComment);
};

export const validateValues = () => validator.validate();
export const resetValidator = () => validator.reset();
