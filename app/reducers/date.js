import createReducer from 'redux-createreducer';
import {
  CHANGE_DATE
} from '../actions/action-creators';

const initialState = new Date();
initialState.setHours(0, 0, 0, 0);

const actionHandlers = {
  [CHANGE_DATE]: (state, action) => {
    return action.date;
  }
};

export default createReducer(initialState, actionHandlers);
