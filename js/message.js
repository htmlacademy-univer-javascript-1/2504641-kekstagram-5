import {isEscapeKey} from './util.js';
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
export const getMessageElement = () => document.querySelector('.success, .error');
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && getMessageElement()) {
    evt.preventDefault();
    closeMessage();
  }
};

const onOutsideClick = (evt) => {
  const messageElement = getMessageElement();
  if (evt.target === messageElement) {
    closeMessage();
  }
};
function closeMessage () {
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);

  const messageElement = getMessageElement();
  if (messageElement) {
    messageElement.remove();
  }
}
export const openMessageBox = (typeMessage) => {
  const message = typeMessage === 'success' ? successTemplate.cloneNode(true) : errorTemplate.cloneNode(true);
  const messageButton = message.querySelector(`.${typeMessage}__button`);
  document.body.append(message);

  messageButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};
