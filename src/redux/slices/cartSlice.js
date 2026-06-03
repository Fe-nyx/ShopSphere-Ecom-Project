import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
    name: "cart",
    initialState: savedCart || [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(
                (cartItem) => cartItem.product.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                state.push({
                    product: action.payload,
                    quantity: 1
                })
            }
        },

        deleteFromCart: (state, action) => {
            return state.filter(
                (item) => item.product.id !== action.payload
            );
        },

        increaseQty: (state, action) => {
            const currentItem = state.find(
                (cartItem) => cartItem.product.id === action.payload
            );

            if (currentItem) {
                currentItem.quantity++;
            }

        },

        decreaseQty: (state, action) => {
            const currentItem = state.find(
                (cartItem) => cartItem.product.id === action.payload
            );

            if (currentItem.quantity > 1) {
                currentItem.quantity--;
            }
            else {
                return state.filter(
                    (item) => item.product.id !== action.payload
                );
            }
        }

    }
});

export const { addToCart, deleteFromCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer