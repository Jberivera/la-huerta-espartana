import isOnTime from './utils/isOnTime';

export default function routerLocationChange(database, auth) {
  let firstCall = true;

  return function (next, action, state) {
    window.scrollTo(0, 0);
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

  inventory.once('value').then(function (inventorySnapShot) {

    auth.onAuthStateChanged(function(result) {
      if (result) {
        database.ref(`users/${result.uid}/orders`)
                .orderByChild('active')
                .equalTo(true)
                .once('value')
                .then(function(ordersSnapShot) {
          const { providerData } = result;
          let storageInfo = localStorage.getItem(result.uid);
          storageInfo = storageInfo ? JSON.parse(storageInfo) : null;

          let newAction = Object.assign({}, action, {
            response: {
              name: providerData[0].displayName,
              url: providerData[0].photoURL,
              uid: result.uid
            }
          });
          newAction.inventory = inventorySnapShot.val();
          newAction.orders = ordersSnapShot.val();
          newAction.cart = storageInfo && isOnTime(new Date(storageInfo.date), 120) ? storageInfo.cart : null;

          next(newAction);
        });
      } else {
        next(Object.assign({}, action, { response: null, inventory: inventorySnapShot.val() }));
      }
    });
  }).catch(function () {
    next(action);
  });
}
