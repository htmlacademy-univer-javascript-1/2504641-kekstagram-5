const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');
const fieldsetElement = document.querySelector('.img-upload__effects');
const defaultEffect = EFFECTS.find((effect) => effect.name === 'none');
const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};
const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};
const setSlider = (name, choice) => {
  imagePreview.className = `effects__preview--${name}`;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choice.min,
      max: choice.max
    },
    start: choice.max,
    step: choice.step
  });
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imagePreview.style.filter = `${choice.style}(${valueElement.value}${choice.unit})`;
  });
};
export const resetSlider = () => {
  sliderElement.noUiSlider.set(defaultEffect.max);
  imagePreview.style.filter = '';
  imagePreview.classList.add('effects__preview--none');
  valueElement.value = 100;
};
noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
hideSlider();
resetSlider();
fieldsetElement.addEventListener('change', (evt) => {
  const nameEffect = evt.target.value;
  const chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  switch (nameEffect) {
    case 'none':
      hideSlider();
      setSlider(nameEffect, chosenEffect);
      imagePreview.style.filter = '';
      break;
    case 'chrome':
      showSlider();
      setSlider(nameEffect, chosenEffect);
      break;
    case 'sepia':
      showSlider();
      setSlider(nameEffect, chosenEffect);
      break;
    case 'marvin':
      showSlider();
      setSlider(nameEffect, chosenEffect);
      break;
    case 'phobos':
      showSlider();
      setSlider(nameEffect, chosenEffect);
      break;
    case 'heat':
      showSlider();
      setSlider(nameEffect, chosenEffect);
      break;
    default:
  }
});
