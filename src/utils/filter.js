import { isPointPlanned, isPointPassed } from './point.js';
import { FilterType } from '../const';

const Filter = {
  [FilterType.EVERYTHING]: (points) => points.map((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointPlanned(point.startDate, point.endDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPassed(point.startDate, point.endDate))
};

export { Filter };
