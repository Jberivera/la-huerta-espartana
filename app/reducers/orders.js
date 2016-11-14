import createReducer from 'redux-createreducer';
import {
  ADD_NEW_ORDER,
  GET_ORDERS
} from '../actions/inventory-action-creators';

const initialState = {};

const actionHandlers = {
  [ADD_NEW_ORDER]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: Object.assign({}, action.order)
    });
  },
  [GET_ORDERS]: (state, action) => {
    return action.orders ? action.orders : state;
  },
  'DATA_ENTRY': (state, action) => {
    return action.orders ? action.orders : state;
  }
};

export default createReducer(initialState, actionHandlers);
