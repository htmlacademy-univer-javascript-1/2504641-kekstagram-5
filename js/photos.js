import { initializeBigItemDialog, showBigItemDialog } from './form-big-item.js';

const picturesContainer = document.querySelector('.pictures');

export const initGallery = (items) => {
  initializeBigItemDialog();

  const onPictureClick = (evt) => {
    const picture = evt.target.closest('.picture');

    if (picture) {
      const thumbnailId = Number(picture.querySelector('.picture__img').dataset.thumbnailId);
      const selectedPicture = items.find((item) => item.id === thumbnailId);

      if (selectedPicture) {
        showBigItemDialog(selectedPicture); // Передаем объект фотографии
      }
    }
  };

  picturesContainer.addEventListener('click', onPictureClick);
};
