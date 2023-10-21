import dayjs from 'dayjs';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERRORINIT: 'ERRORINIT',
};

const NEW_POINT = {
  basePrice: 0,
  startDate: dayjs(),
  endDate: dayjs(),
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const EmptyListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const ErrorMessage = 'Server is temporary unavailable';

export { NEW_POINT, FilterType, SortType, UserAction, UpdateType, TimeLimit, EmptyListTextType, ErrorMessage };
