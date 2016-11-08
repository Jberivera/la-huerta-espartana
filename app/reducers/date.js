import createReducer from 'redux-createreducer';
import {
  CHANGE_DATE
} from '../actions/action-creators';

import isValidDate from '../js/utils/isValidDate';

let date = TIMESTAMP ? new Date(TIMESTAMP) : (date = new Date(), date.setHours(0,0,0,0), date);

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
  }
};

export default createReducer(initialState, actionHandlers);
