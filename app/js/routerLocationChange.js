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
          .once('value');
        let dataDir;

        directionPromise.then(function (snapDataDir) {
          dataDir = snapDataDir.val();
        })
        .then(function () {
          const { providerData } = result;

          let newAction = Object.assign({}, action, {
            type: 'DATA_ENTRY',
            response: {
              name: providerData[0].displayName,
              url: providerData[0].photoURL,
              uid: result.uid,
              direction: dataDir
            },
            inventory: inventorySnapShot.val(),
            cart: getCartFromLocalStorage()
          });
          next(newAction);
        });

        ordersPromise.then(function (ordersSnapShot) {
          const data = ordersSnapShot.val();
          if (!data) throw 'No orders';
          const promises = Object.keys(data).map(function (key) {
            return database.ref(`orders/${key}`).once('value');
          });
          return Promise.all(promises);
        })
        .then(function (dataArray) {
          const orders = dataArray.reduce(function (a, b) {
            return a[b.key] = b.val(), a;
          }, {});
          next({ type: 'GET_ORDERS', orders });
        })
        .catch(function (err) {});
      } else {
        const newAction = Object.assign({}, action, {
          type: 'DATA_ENTRY',
          cart: getCartFromLocalStorage()
        });
        next(Object.assign({}, newAction, { response: null, inventory: inventorySnapShot.val() }));
      }
    });
  }).catch(function () {
    next(action);
  });
}

function getCartFromLocalStorage () {
  let storageInfo = localStorage.getItem('huerta-user');
  storageInfo = storageInfo && JSON.parse(storageInfo);
  storageInfo = storageInfo && isOnTime(new Date(storageInfo.date), 120) && storageInfo.cart;

  return storageInfo;
}
