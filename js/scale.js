import {removeLastCharacter} from './util.js';

const ScaleOptions = {
  MIN: 25,
  MAX: 100,
  BY_DEFAULT: 100,
  STEP: 25
};

const scaleControls = document.querySelector('.scale');
const scaleSmaller = scaleControls.querySelector('.scale__control--smaller');
const scaleBigger = scaleControls.querySelector('.scale__control--bigger');
const scaleValue = scaleControls.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const setValuesScale = (scale) => {
  scaleValue.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale / 100})`;
};

const resetValuesScale = () => {
  imagePreview.style.transform = '';
  scaleValue.value = `${ScaleOptions.BY_DEFAULT}%`;
};

const getScale = () => {
  const currentValue = scaleValue.value;
  return Number(removeLastCharacter(currentValue));
};

const onScaleSmallerButtonClick = () => {
  const scale = getScale();
  if(scale > ScaleOptions.MIN) {
    const newScale = scale - ScaleOptions.STEP;
    setValuesScale(newScale);
  }
};

const onScaleBiggerButtonClick = () => {
  const scale = getScale();
  if(scale < ScaleOptions.MAX) {
    const newScale = scale + ScaleOptions.STEP;
    setValuesScale(newScale);
  }
};

const addListeners = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerButtonClick);
  scaleBigger.addEventListener('click', onScaleBiggerButtonClick);
};

const removeListeners = () => {
  scaleSmaller.removeEventListener('click', onScaleSmallerButtonClick);
  scaleBigger.removeEventListener('click', onScaleBiggerButtonClick);
};

export const initScale = () => {
  resetValuesScale();
  addListeners();
};

export const resetScale = () => {
  resetValuesScale();
  removeListeners();
};
