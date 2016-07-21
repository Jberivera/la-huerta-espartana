import {
  ADD_TO_CAR,
  REMOVE_FROM_CAR
} from '../actions/action-creators';

const localStorageApi = {
  [ADD_TO_CAR]: setLocalStorageCart,
  [REMOVE_FROM_CAR]: setLocalStorageCart
};

function setLocalStorageCart(next, action, store) {
  next(action);
  const state = store.getState();

  if (state.user.res) {
    const { uid } = state.user.res;
    localStorage.setItem(uid, JSON.stringify(state.cart));
  }
}

const localStorageMiddleware = store => next => {

  return function (action) {
    if (typeof localStorageApi[action.type] === 'function') {
      return localStorageApi[action.type](next, action, store);
    }
    return next(action);
  };
};

export default localStorageMiddleware;
