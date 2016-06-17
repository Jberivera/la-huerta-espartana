import createReducer from 'redux-createreducer';
import {
  GET_USER
} from '../actions/user-action-creators';

const initialState = {};

const actionHandlers = {
  [GET_USER]: (state, action) => {
    return Object.assign({}, state, {
      res: action.response
    });
  },
  'LOGOUT': (state, action) => {
    return {};
  },
  '@@router/LOCATION_CHANGE': (state, action) => {
    if (action.response) {
      return Object.assign({}, state, {
        res: action.response
      });
    }
    return state;
  }
};

export default createReducer(initialState, actionHandlers);
