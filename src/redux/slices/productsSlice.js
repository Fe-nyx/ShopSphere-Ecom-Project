import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllProducts } from "../../services/productService";

const initialState = {
    products: [],
    status: "idle",
    error: null
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async()=>{
        return getAllProducts();
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},

    extraReducers: (builder)=>{
        builder.addCase(
            fetchProducts.pending,
            (state) => {
                state.status = "loading";
                state.error = null;
            }
        )

        builder.addCase(
            fetchProducts.fulfilled,
            (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
            }
        )

        builder.addCase(
            fetchProducts.rejected,
            (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            }
        )
    }
});

export default productsSlice.reducer