import {getRandomArrayElement, getRandomInteger, generateId, createRandomIdFromRangeGenerator} from './util.js';
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Наталья',
  'Анастасия',
  'Елена',
  'Мария',
  'Софья',
  'Дарья',
  'Ольга',
  'Екатерина',
  'Виктория',
  'Александра',
  'Юлия',
  'Татьяна',
  'Елизавета',
  'Валерия',
  'Полина',
];

const DESCRIPTIONS = [
  'Солнечное утро в парке с моим любимым кофе',
  'Восхитительный закат на берегу моря' ,
  'Веселый пикник с друзьями в лесу',
  'Мой любимый кот спит на подоконнике',
  'Вкусный ужин в ресторане с видом на город',
  'Прогулка по старинным улочкам старого города',
  'Моя новая книга и чашка горячего чая',
  'Веселая вечеринка с друзьями в баре',
  'Моя новая татуировка - память о путешествии',
  'Спортивная тренировка на свежем воздухе',
  'Моя любимая роза в саду',
  'Вкусный завтрак в постели',
  'Моя новая коллекция растений',
];

const createComment = () => ({
  id: generateId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = function() {
  const comments = Array.from({length: getRandomInteger(0,30)}, createComment);
  const idGenerator = createRandomIdFromRangeGenerator(1,25);
  const urlGenerator = createRandomIdFromRangeGenerator(1,25);
  return{
    id: idGenerator(),
    url: `photos/${urlGenerator()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: comments
  };
};

const photos = Array.from({length: 25}, createPhoto);
export {photos};
