const INITIAL_VALUE = {

    cartItems: [] 

};

export default function wishlistReducer(state = INITIAL_VALUE , action)
{
    switch(action.type)
    {
        case "CHANGE_WISHLIST":
            return{
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }

        case "DELETE_WISHLIST":
            return{
                ...state,
                cartItems: state.cartItems.filter(item => item !== action.payload) 


            }
        default:
            return state
    }
}
