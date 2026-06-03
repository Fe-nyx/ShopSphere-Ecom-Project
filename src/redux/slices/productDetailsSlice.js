import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProductById } from "../../services/productService";

const initialState = {
    productDetails: null,
    status: "idle",
    error: null
}

export const fetchProductDetails = createAsyncThunk(
    "productDetails/fetchProductDetails",
    async(id)=>{
        return getProductById(id);
    }
);

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {},

    extraReducers: (builder)=>{
        builder.addCase(
            fetchProductDetails.pending,
            (state) => {
                state.status = "loading";
                state.error = null;
                state.productDetails = null;
            }
        )

        builder.addCase(
            fetchProductDetails.fulfilled,
            (state, action) => {
                state.status = "succeeded";
                state.productDetails = action.payload;
            }
        )

        builder.addCase(
            fetchProductDetails.rejected,
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            }
        )
    }
});

export default productDetailsSlice.reducer;