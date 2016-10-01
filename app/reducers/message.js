import createReducer from 'redux-createreducer';
import {
  ADD_NEW_ORDER
} from '../actions/action-creators';

const initialState = null;

const actionHandlers = {
  [ADD_NEW_ORDER]: (state, action) => {
    return {
      type: 'succes',
      text: 'La orden se realizo con exito'
    };
  },
  '@@router/LOCATION_CHANGE': (state, action) => {
    return null;
  }
};

export default createReducer(initialState, actionHandlers);
