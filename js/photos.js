import {photos} from './data.js'
const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').textContent;
const picture = template.querySelector('.picture');
const readyPics = photos(25);
const fragment = document.createDocumentFragment();

readyPics.forEach(({url,description,likes,comments}) => {
  const pictureClone = picture.cloneNode(true);
  pictureClone.querySelector('img').src = url;
  pictureClone.querySelector('img').alt = description;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(pictureClone);
});

pictures.appendChild(fragment)
