import { auth, facebook, database } from '../js/api';

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

export const ADD_NEW_ORDER = 'ADD_NEW_ORDER';
export const addNewOrderAsync = (order, uid, direction) => (dispatch) => {
  order.active = true;
  const key = database.ref(`users/${uid}/orders`).push(order).key;
  !direction.noSet && database.ref(`users/${uid}/direction`).set(direction);

  dispatch(addNewOrder(order, key, direction));
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
