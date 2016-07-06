import createReducer from 'redux-createreducer';
import {
  ADD_TO_CAR,
  REMOVE_FROM_CAR
} from '../actions/action-creators';

const initialState = [];

const actionHandlers = {
  [ADD_TO_CAR]: (state, action) => {
    return [
      ...state,
      action.item
    ];
  },
  [REMOVE_FROM_CAR]: (state, action) => {
    const { index } = action;
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ];
  },
  '@@router/LOCATION_CHANGE': (state, action) => {
    return action.inventory ? [ ...action.inventory ] : state;
  }
};

export default createReducer(initialState, actionHandlers);
