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
const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const value = document.querySelector('.effect-level__value');
const fieldset = document.querySelector('.img-upload__effects');
const effectRadio = document.querySelector('.effects__radio');
const defaultEffect = EFFECTS.find((effect) => effect.name === 'none');

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const setSlider = (nameEffect, chosenEffect) => {
  imagePreview.className = `effects__preview--${nameEffect}`;
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });
  slider.noUiSlider.on('update', () => {
    value.value = slider.noUiSlider.get();
    imagePreview.style.filter = `${chosenEffect.style}(${value.value}${chosenEffect.unit})`;
  });
};

export const resetSlider = () => {
  slider.noUiSlider.set(defaultEffect.max);
  imagePreview.style.filter = '';
  imagePreview.className = 'effects__preview--none';
  value.value = defaultEffect.max;
  effectRadio.checked = true;
};

export const destroySlider = () => {
  slider.noUiSlider.destroy();
};

export const initSlider = () => {
  noUiSlider.create(slider, {
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
  fieldset.addEventListener('change', (evt) => {
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
    }
  });
};
