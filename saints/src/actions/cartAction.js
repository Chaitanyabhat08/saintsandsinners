import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    UPDATE_CART_ITEM,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
} from "../constants/cartConstants";
import axios from "axios";
// Add to Cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/products/getProductDetails/${id}`);
    const { cartItems } = getState().cart;

    // Check if the product is already present in cartItems
    const existingItemIndex = cartItems.findIndex(item => item.product === data.product._id);
    if (existingItemIndex !== -1) {
        // If the product is already in cartItems, update its quantity
        const updatedCartItems = cartItems.map(item => {
            if (item.product === data.product._id) {
                return {
                    ...item,
                    quantity: item.quantity + quantity,
                };
            }
            return item;
        });
        dispatch({
            type: UPDATE_CART_ITEM,
            payload: updatedCartItems,
        });
    } else {
        // If the product is not in cartItems, add it as a new item
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                quantity,
            },
        });
    }
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
};

export const addtoWishlist = (id) => async (dispatch, getState)=>{
    const { data } = await axios.get(`/api/v1/products/getProductDetails/${id}`);
    const { wishlistItems } = getState().wishlist;
    const existingItemIndex = wishlistItems.findIndex(item => item.product === data.product._id);
    if (existingItemIndex !== -1) {
        // If the product is already in cartItems, update its quantity
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: id,
        });
    } else {
        // If the product is not in cartItems, add it as a new item
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
            },
        });
    }
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
}

export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_WISHLIST,
        payload: id,
    });

    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};