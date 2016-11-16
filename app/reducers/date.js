import createReducer from 'redux-createreducer';
import {
  CHANGE_DATE
} from '../actions/action-creators';

import isValidDate from '../js/utils/isValidDate';

const date = new Date();
date.setHours(0, 0, 0, 0);

const initialState = {
  server: new Date(date),
  delivery: new Date(date),
  valid: false
};

const actionHandlers = {
  [CHANGE_DATE]: (state, action) => {
    return Object.assign({}, state, {
      delivery: action.date,
      valid: isValidDate(state.server, action.date)
    });
  },
  'DATA_ENTRY': (state, action) => {
    const date = new Date(action.date);
    date.setHours(0, 0, 0, 0);

    return typeof action.date === 'number' ? Object.assign({}, state, {
      server: new Date(date),
      delivery: new Date(date)
    }) : state;
  }
};

export default createReducer(initialState, actionHandlers);
