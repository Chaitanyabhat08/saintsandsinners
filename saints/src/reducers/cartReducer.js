import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEM,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
} from "../constants/cartConstants";

export const cartReducer = (
    state = { cartItems: [], shippingInfo: {} },
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            return {
                ...state,
                cartItems: [...state.cartItems, item],
            };
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
        case UPDATE_CART_ITEM:
            const totalItems = action.payload;
            return {
                ...state,
                cartItems: totalItems,
            };

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };

        default:
            return state;
    }
};

export const wishlistReducer = (
    state = {wishlistItems:[]},
    action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const item = action.payload;
            console.log("thissss is item", item);
            return {
                ...state,
                wishlistItems: [...state.wishlistItems, item],
            };
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter((i) => i.product !== action.payload),
            };
        default:
            return state;
    }
}