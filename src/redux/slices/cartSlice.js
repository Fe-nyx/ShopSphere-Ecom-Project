import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(
                (cartItem) => cartItem.product.id === action.payload.id
            );

            if (existingItem){
                existingItem.quantity++;
            }
            else {
                state.push({
                    product: action.payload,
                    quantity: 1
                })
            }
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer