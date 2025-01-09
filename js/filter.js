const RANDOM_PHOTOS_AMOUNT = 10;
const ACTIVE_FILTER = 'img-filters__button--active';

const filterSection = document.querySelector('.img-filters');
const allFilterButtons = document.querySelectorAll('.img-filters__button');

export const filterRandom = (items) => items.sort(() => Math.random() - Math.random()).slice(0, RANDOM_PHOTOS_AMOUNT);
export const sortByMostDiscussed = (items) => items.sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);
export const showFilter = () => filterSection.classList.remove('img-filters--inactive');
export const changeFilter = (renderGallery) => {
  allFilterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filterSection.querySelector(`.${ACTIVE_FILTER}`).classList.remove(ACTIVE_FILTER);
      evt.target.classList.add(ACTIVE_FILTER);
      renderGallery();
    });
  });
};
