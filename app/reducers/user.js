import createReducer from 'redux-createreducer';
import {
  GET_USER,
  ADD_NEW_ORDER
} from '../actions/user-action-creators';

const initialState = {};

const actionHandlers = {
  [GET_USER]: (state, action) => {
    return Object.assign({}, state, {
      res: action.response
    });
  },
  [ADD_NEW_ORDER]: (state, action) => {
    if (!action.direction.noSet) {
      return Object.assign({}, state, {
        res: Object.assign({}, state.res, {
          direction: action.direction
        })
      });
    }
    return state;
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
