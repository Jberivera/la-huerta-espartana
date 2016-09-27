import createReducer from 'redux-createreducer';
import {
  ADD_NEW_ORDER
} from '../actions/inventory-action-creators';

const initialState = {};

const actionHandlers = {
  [ADD_NEW_ORDER]: (state, action) => {
    return Object.assign({}, state, {
      [action.key]: action.order
    });
  },
  '@@router/LOCATION_CHANGE': (state, action) => {
    return action.orders ? action.orders : state;
  }
};

export default createReducer(initialState, actionHandlers);
