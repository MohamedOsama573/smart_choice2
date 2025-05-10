import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slices/getAllProductsSlice";
const store = configureStore({
    reducer: {
        products: productReducer,
        // Add other reducers here if needed
    }, // Add your reducers here
});
export default store;