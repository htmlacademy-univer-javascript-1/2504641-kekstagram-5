const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function generateIdFuncCom () {
  let lastGeneratedId = 0;

  return function (){
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateId = generateIdFuncCom();



function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
export{getRandomInteger,getRandomArrayElement,generateId,createRandomIdFromRangeGenerator};
