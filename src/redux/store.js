import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice"
import productsReducer from "./slices/productsSlice"
import productDetailsReducer from "./slices/productDetailsSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productsReducer,
        productDetails: productDetailsReducer
    }
});

store.subscribe(()=>{
    const state = store.getState()

    const cart = state.cart;
    const wishlist = state.wishlist;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
});

export default store;