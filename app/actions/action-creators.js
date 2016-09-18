export const ADD_TO_CAR = 'ADD_TO_CAR';
export const addToCar = (item) => (
  {
    type: ADD_TO_CAR,
    item
  }
);

export const REMOVE_FROM_CAR = 'REMOVE_FROM_CAR';
export const removeFromCar = (item) => (
  {
    type: REMOVE_FROM_CAR,
    item
  }
);

export const FILTER_CHANGE = 'FILTER_CHANGE';
export const filterChange = (filter) => (
  {
    type: FILTER_CHANGE,
    filter
  }
);

export const CHANGE_DATE = 'CHANGE_DATE';
export const changeDate = (date) => (
  {
    type: CHANGE_DATE,
    date: new Date(date)
  }
);
