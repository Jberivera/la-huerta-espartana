import createReducer from 'redux-createreducer';
import {
  GET_INVENTORY
} from '../actions/inventory-action-creators';

const initialState = {};

const actionHandlers = {
  [GET_INVENTORY]: (state, action) => {
    return action.inventory ? Object.assign(action.inventory) : state;
  },
  'DATA_ENTRY': (state, action) => {
    return action.inventory ? Object.assign(action.inventory) : state;
  }
};

export default createReducer(initialState, actionHandlers);
