import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import routerLocationChange from './routerLocationChange';

const config = {
  apiKey: "AIzaSyBCvQaUEZxgdxNykfYuTScEU-u4N1SqD8U",
  authDomain: "la-huerta-espartana.firebaseapp.com",
  databaseURL: "https://la-huerta-espartana.firebaseio.com",
  storageBucket: "",
};

const firebaseApp = firebase.initializeApp(config);

const auth = firebase.auth();
const facebook = new firebase.auth.FacebookAuthProvider();

const database = firebase.database();

const api = {
  '@@router/LOCATION_CHANGE': routerLocationChange(database, auth)
};

function setFireBaseTasks(next, action, store) {
  next(action);
  const state = Object.assign({}, store.getState());

  if (state.user.res) {
    database.ref(`users/${state.user.res.uid}/tasks`).set(
      Object.keys(state.tasks).reduce((a, b, i) => {
        return a[i] = { name: b, data: state.tasks[b] }, a;
      }, [])
    );
  }
}

const firebaseMiddleware = store => next => {

  return function (action) {
    if (typeof api[action.type] === 'function') {
      return api[action.type](next, action, store);
    }
    return next(action);
  };
};

export { auth, facebook, database };
export default firebaseMiddleware;
