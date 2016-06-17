import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
  '@@router/LOCATION_CHANGE': (function () {
    let isLoged = false;
    return function (next, action, state) {
      if (!isLoged) {
        auth.onAuthStateChanged(function(result) {
          if (result) {
            const { providerData } = result;
            const user = database.ref(`users/${result.uid}`);
            isLoged = true;

            user.child('tasks').once('value').then(function(snapshot) {
              let newAction = Object.assign({}, action, {
                response: {
                  name: providerData[0].displayName,
                  url: providerData[0].photoURL,
                  uid: result.uid
                }
              });
              if (snapshot.val()) {
                newAction.tasks = snapshot.val().reduce((a, b) => {
                  return a[b.name] = b.data || [], a;
                }, {});
              } else {
                user.child('tasks').set([
                  {
                    name: 'toDo'
                  },
                  {
                    name: 'inProgress'
                  },
                  {
                    name: 'Done'
                  }
                ]);
              }
              next(newAction);
            });
          } else {
            isLoged = false;
            next(Object.assign({}, action, { response: null }));
          }
        });
      } else {
        next(action);
      }
    }
  }()),
  'ADD_TODO': setFireBaseTasks,
  'EDIT_TASK': setFireBaseTasks,
  'MOVE_FROM_TO': setFireBaseTasks,
  'RE_ORDER': setFireBaseTasks,
  'ADD_GROUP': setFireBaseTasks,
  'EDIT_GROUP_NAME': setFireBaseTasks
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
