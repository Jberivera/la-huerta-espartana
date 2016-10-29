import { auth, facebook, database, TIMESTAMP } from '../js/api';

export const GET_INVENTORY = 'GET_INVENTORY';
export const getInventory = (inventory) => {
  return {
    type: GET_INVENTORY,
    inventory
  };
};

export const getInventoryAsync = () => {
  return (dispatch) => {
    const inventory = database.ref('inventory');

    inventory.once('value').then(function(snapshot) {
      dispatch(getInventory(snapshot.val()));
    });
  };
};

export const GET_ORDERS = 'GET_ORDERS';
export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';
export const addNewOrderAsync = (order, uid, direction) => (dispatch) => {
  order.state = 'active';
  order.owner = uid;
  order.date = TIMESTAMP;
  const key = database.ref('orders').push(order).key;
  database.ref(`users/${uid}/orders/${key}`).set(true);

  !direction.noSet && database.ref(`users/${uid}/direction`).set(direction);

  database.ref(`orders/${key}/date`).once('value').then(function (dataSnapshot) {
    order.date = dataSnapshot.val();
    dispatch(addNewOrder(order, key, direction));
  });
  localStorage.removeItem(uid);
};
const addNewOrder = (order, key, direction) => (
  {
    type: ADD_NEW_ORDER,
    order,
    key,
    direction
  }
);
