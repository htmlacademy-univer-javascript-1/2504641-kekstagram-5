import { filterRandom, sortByMostDiscussed } from './filter.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterSection = document.querySelector('.img-filters');
const createSmallItem = ({ id, url, description, likes, comments }) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureImg.dataset.thumbnailId = id;

  const commentsEl = picture.querySelector('.picture__comments');
  commentsEl.textContent = comments.length;

  const likesEl = picture.querySelector('.picture__likes');
  likesEl.textContent = likes;

  return picture;
};
export const renderSmallItems = (items) => {
  let filteredItems = [...items]; // Используем spread-оператор для создания копии массива
  const activeFilterButtonId = filterSection.querySelector('.img-filters__button--active').id;
  const existingItems = picturesContainer.querySelectorAll('.picture');

  if (activeFilterButtonId === 'filter-random') {
    filteredItems = filterRandom(filteredItems);
  } else if (activeFilterButtonId === 'filter-discussed') {
    filteredItems = sortByMostDiscussed(filteredItems);
  }

  existingItems.forEach((item) => item.remove());

  const fragment = document.createDocumentFragment();
  filteredItems.forEach((item) => {
    const itemEl = createSmallItem(item);
    fragment.append(itemEl);
  });

  picturesContainer.append(fragment);
};
