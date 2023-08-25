import { getDate } from '../utils/point.js';
import { getRandomInteger } from '../utils/common.js';

function generatePoint(type, descriptionId, offersIds) {
  return {
    id: crypto.randomUUID(),
    type,
    destination: descriptionId,
    basePrice: getRandomInteger(400, 1500),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    isFavorite: !!getRandomInteger(0, 1),
    offers: offersIds
  };

}


export { generatePoint };
