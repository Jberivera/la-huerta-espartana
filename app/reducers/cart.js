import createReducer from 'redux-createreducer';
import {
  ADD_TO_CAR,
  REMOVE_FROM_CAR,
  ADD_NEW_ORDER
} from '../actions/action-creators';

const initialState = [];

const actionHandlers = {
  [ADD_TO_CAR]: (state, action) => {
    const { item } = action;
    const index = state.findIndex((cartItem) => {
      return cartItem.productName === item.productName;
    });
    return index === -1 ?
    [
      ...state,
      item
    ] :
    [
      ...state.slice(0, index),
      item,
      ...state.slice(index + 1, state.legth)
    ];
  },
  [REMOVE_FROM_CAR]: (state, action) => {
    const { item } = action;
    const index = state.findIndex((cartItem) => {
      return cartItem.productName === item.productName;
    });
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ];
  },
  [ADD_NEW_ORDER]: (state, action) => {
    return [];
  },
  'DATA_ENTRY': (state, action) => {
    return action.cart ? [ ...action.cart ] : state;
  }
};

export default createReducer(initialState, actionHandlers);
