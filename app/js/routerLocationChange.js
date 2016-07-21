
export default function routerLocationChange(database, auth) {
  let firstCall = true;

  return function (next, action, state) {
    if (firstCall) {
      setAuthStateChangeListener({ database, auth, next, action, state });
      firstCall = false;
    } else {
      next(action);
    }
  }
}

function setAuthStateChangeListener({ database, auth, next, action, state }) {
  const inventory = database.ref('inventory');

  inventory.once('value').then(function(snapshot) {

    auth.onAuthStateChanged(function(result) {
      if (result) {
        const { providerData } = result;
        const cart = localStorage.getItem(result.uid);

        let newAction = Object.assign({}, action, {
          response: {
            name: providerData[0].displayName,
            url: providerData[0].photoURL,
            uid: result.uid
          }
        });
        newAction.inventory = snapshot.val();
        newAction.cart = cart ? JSON.parse(cart) : null;

        next(newAction);
      } else {
        next(Object.assign({}, action, { response: null, inventory: snapshot.val() }));
      }
    });
  });
}
