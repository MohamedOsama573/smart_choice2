import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTelevisionProducts = createAsyncThunk(
  '/gettelevisionproducts',
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const queryParams = new URLSearchParams({ page, limit });

      // Append filters dynamically
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value);
        }
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/televisions/amazon-television?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
