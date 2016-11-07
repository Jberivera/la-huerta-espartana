import createReducer from 'redux-createreducer';
import {
  CHANGE_DATE
} from '../actions/action-creators';

const initialState = TIMESTAMP ? new Date(TIMESTAMP) : new Date();

const actionHandlers = {
  [CHANGE_DATE]: (state, action) => {
    return action.date;
  }
};

export default createReducer(initialState, actionHandlers);
