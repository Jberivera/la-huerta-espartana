import createReducer from 'redux-createreducer';
import {
  FILTER_CHANGE
} from '../actions/action-creators';

const initialState = 'todos';

const actionHandlers = {
  [FILTER_CHANGE]: (state, action) => action.filter
};

export default createReducer(initialState, actionHandlers);
