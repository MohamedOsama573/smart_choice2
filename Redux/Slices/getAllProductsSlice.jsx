import { createSlice } from "@reduxjs/toolkit";
import { getAmazonLaptops } from "../Services/Products/getLaptopsProducts";
import { getPhoneProducts } from "../Services/Products/getPhoneProducts";
import { getAllTablets } from "../Services/Products/getTabletProducts";
import { getTelevisionProducts } from "../Services/Products/getTelevisionProducts";

const productSlice = createSlice({
  name: "products", 
    initialState: {
        AmazonLaptopsProducts: [],
        phoneProducts : [],
        tabletesProducts : [],
        televisionProducts:[],
        ProductsLoading: false,
        ProductError: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAmazonLaptops.pending, (state) => {
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getAmazonLaptops.fulfilled, (state, action) => {
                state.ProductsLoading = false;
                state.AmazonLaptopsProducts = action.payload.products;
            })
            .addCase(getAmazonLaptops.rejected, (state, action) => {
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            })
            .addCase(getPhoneProducts.pending,(state)=>{
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getPhoneProducts.fulfilled,(state,action)=>{
                state.ProductsLoading = false;
                state.phoneProducts = action.payload.products;
            })
            .addCase(getPhoneProducts.rejected,(state,action)=>{
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            })
            .addCase(getAllTablets.pending,(state)=>{
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getAllTablets.fulfilled,(state,action)=>{
                state.ProductsLoading = false;
                state.tabletesProducts = action.payload.products;
            })
            .addCase(getAllTablets.rejected,(state,action)=>{
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            })
            .addCase(getTelevisionProducts.pending,(state)=>{
                state.ProductsLoading = true;
                state.ProductError = null;
            })
            .addCase(getTelevisionProducts.fulfilled,(state,action)=>{
                state.ProductsLoading = false;
                state.televisionProducts = action.payload.products;
            })
            .addCase(getTelevisionProducts.rejected,(state,action)=>{
                state.ProductsLoading = false;
                state.ProductError = action.payload;
            })
    },
});
export default productSlice.reducer;