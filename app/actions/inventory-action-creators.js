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
