import { combineReducers } from "redux";
import wishlistReducer from "./changeWishlistReducer";
import cartReducer from "./changeCartReducer";


export default combineReducers({
    wishlistR: wishlistReducer,
    myCartR: cartReducer,
    
})