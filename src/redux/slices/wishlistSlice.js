import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.find(
                (wishlistItem) => wishlistItem.id === action.payload.id
                );

            if (!existingItem){
                state.push(action.payload);
            }
        }
    }
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;