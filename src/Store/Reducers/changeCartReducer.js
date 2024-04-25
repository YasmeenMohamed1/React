const INITIAL_STATE = {
  cartListItems: [],
  // auth: {
  //   isLoggedIn: false
  // },
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("ADD_TO_CART Action Payload:", action.payload);
      const existingItemIndex = state.cartListItems.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedCartListItems = state.cartListItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity 
            };
          }
          return item;
        });
        return {
          ...state,
          cartListItems: updatedCartListItems,
        };
      } else {
       
        return {
          ...state,
          cartListItems: [...state.cartListItems, action.payload],
        };
      }
    


    case "UPDATE_CART_ITEM":
      console.log("UPDATE_CART_ITEM Action Payload:", action.payload);
      return {
        ...state,
        cartListItems: state.cartListItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "DELETE_FROM_CART":
      console.log("DELETE_FROM_CART Action Payload:", action.payload);
      return {
        ...state,
        cartListItems: state.cartListItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
