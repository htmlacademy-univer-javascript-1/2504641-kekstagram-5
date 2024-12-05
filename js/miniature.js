import { photos } from './data.js';
import { renderFullPhoto } from './draw_fullImg.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const renderPictures = (photoData) => {
  const fragment = document.createDocumentFragment();
  photoData.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');
    const likes = pictureElement.querySelector('.picture__likes');
    const comments = pictureElement.querySelector('.picture__comments');

    img.src = photo.url;
    img.alt = photo.description;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    pictureElement.querySelector('.picture').addEventListener('click',() => {
      renderFullPhoto(photo);
    });
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
};

const generatedPhotos = photos();
renderPictures(generatedPhotos);

