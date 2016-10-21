import isOnTime from './utils/isOnTime';

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

  inventory.once('value').then(function (inventorySnapShot) {

    auth.onAuthStateChanged(function(result) {
      if (result) {
        const directionPromise = database.ref(`users/${result.uid}/direction`)
          .once('value');
        const ordersPromise = database.ref(`users/${result.uid}/orders`)
          .orderByChild('active')
          .equalTo(true)
          .once('value');
        let dataDir;

        directionPromise.then(function (snapDataDir) {
          dataDir = snapDataDir.val();

          return ordersPromise;
        })
        .then(function (ordersSnapShot) {
          const { providerData } = result;
          let storageInfo = localStorage.getItem(result.uid);
          storageInfo = storageInfo && JSON.parse(storageInfo);

          let newAction = Object.assign({}, action, {
            response: {
              name: providerData[0].displayName,
              url: providerData[0].photoURL,
              uid: result.uid,
              direction: dataDir
            }
          });
          newAction.inventory = inventorySnapShot.val();
          newAction.orders = ordersSnapShot.val();
          newAction.cart = storageInfo && isOnTime(new Date(storageInfo.date), 120) && storageInfo.cart;

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
