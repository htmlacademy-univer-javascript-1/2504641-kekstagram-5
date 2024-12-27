import {isEscapeKey} from './util.js';
export const getMessageElement = () => document.querySelector('.success, .error');
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

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

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

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && getMessageElement()) {
    evt.preventDefault();
    closeMessage();
  }
};

