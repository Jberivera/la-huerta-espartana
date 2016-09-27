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
export const addNewOrderAsync = (order, uid) => (dispatch) => {
  const key = database.ref(`users/${uid}/orders`).push(order).key;

  dispatch(addNewOrder(order, key));
};
const addNewOrder = (order, key) => (
  {
    type: ADD_NEW_ORDER,
    order,
    key
  }
);
