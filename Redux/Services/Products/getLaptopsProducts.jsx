import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAmazonLaptops = createAsyncThunk(
  "products/getAmazonLaptops",
  async ({ page = 1, limit = 10, filters = {} }, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams({ page, limit });

      // Loop through all keys in filters and append them if they exist
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/products/all-amazon-laptop?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
