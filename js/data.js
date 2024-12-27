import {createIdGenerator, createCircleGenerator, getRandomInteger, getRandomArrayElement} from './util.js';

const COUNT_ITEMS = 25;
const avatarRange = {
  MIN: 1,
  MAX: 6
};
const likesRange = {
  MIN: 15,
  MAX: 200
};
const commentsRange = {
  MIN: 3,
  MAX: 15
};
const commentMessageRange = {
  MIN: 1,
  MAX: 2
};
const MIN_ID_COMMENT = 100;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
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


const generateItemId = createIdGenerator();
const generateItemPathId = createIdGenerator();
const generateDescriptionId = createCircleGenerator(DESCRIPTIONS.length);
const generateCommentId = createIdGenerator(MIN_ID_COMMENT);

const getCommentMessage = () => Array.from({length: getRandomInteger(commentMessageRange.MIN, commentMessageRange.MAX)},
  () => getRandomArrayElement(MESSAGES)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(avatarRange.MIN, avatarRange.MAX)}.svg`,
  message: getCommentMessage(),
  name: getRandomArrayElement(NAMES)
});

const createItem = () => ({
  id: generateItemId(),
  url: `photos/${generateItemPathId()}.jpg`,
  description: DESCRIPTIONS[generateDescriptionId()],
  likes: getRandomInteger(likesRange.MIN, likesRange.MAX),
  comments: Array.from({length: getRandomInteger(commentsRange.MIN, commentsRange.MAX)}, createComment)
});

const getItems = () => Array.from({length: COUNT_ITEMS}, createItem);
export{getItems};
