import {getRandomInteger} from '../utils/common.js';

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInteger(50, 150)
  };
}

export { generateOffer };
