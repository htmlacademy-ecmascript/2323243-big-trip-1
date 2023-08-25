import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { DESCRIPTIONS, CITIES } from '../const.js';

const PICTURES_COUNT = 5;


function generateDestinationPics() {
  return {
    src: `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS)
  };
}

function generateDestination() {
  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(CITIES),
    pictures: Array.from({ length: PICTURES_COUNT }, generateDestinationPics)
  };

}

export { generateDestination };
