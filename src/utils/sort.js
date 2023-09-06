import { SortType } from '../const.js';
import { getPointsDateDifference, getPointsPriceDifference, getPointsDurationDifference } from './point.js';

if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function (fn) {
    return [...this].sort(fn);
  };
}

const sort = {
  [SortType.DAY]: (points) => points.toSorted(getPointsDateDifference),
  [SortType.PRICE]: (points) => points.toSorted(getPointsPriceDifference),
  [SortType.TIME]: (points) => points.toSorted(getPointsDurationDifference),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implimented`);
  },
  [SortType.OFFER]: () => {
    throw new Error(`Sort by ${SortType.OFFER} is not implimented`);
  }
};

export { sort };
