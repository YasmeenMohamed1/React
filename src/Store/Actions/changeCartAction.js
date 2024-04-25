export const changeCartAction = (id, quantity) => {
  return {
    type: "ADD_TO_CART",
    payload: { id, quantity },
  };
};
export const updateCartItemAction = (cartItem) => {
  return {
    type: "UPDATE_CART_ITEM",
    payload: cartItem,
  };
};

export const deleteFromCartAction = (id) => {
  return {
    type: "DELETE_FROM_CART",
    payload: id,
  };
};
