export const ADD_TO_CAR = 'ADD_TO_CAR';
export const addToCar = (item) => (
  {
    action: ADD_TO_CAR,
    item
  }
);

export const REMOVE_FROM_CAR = 'REMOVE_FROM_CAR';
export const removeFromCar = (index) => (
  {
    action: ADD_TO_CAR,
    index
  }
);
