export const changeWishlistAction = (cartItem) => {
    return {
        type: "CHANGE_WISHLIST",
        payload: cartItem
    };
};


export const deleteFromWishlistAction = (cartItem) => {
    return {
        type: "DELETE_WISHLIST",
        payload: cartItem
    };
};