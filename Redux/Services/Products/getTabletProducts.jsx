// features/tablets/tabletsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTablets = createAsyncThunk(
  "/products/getAllTablets",
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Convert filters object to query string
      const filterParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          filterParams.append(key, value);
        }
      });

      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/tablets/amazon-tablet?page=${page}&limit=${limit}&${filterParams}`,
        {
          headers: {
            Authorization: `abdelrahman ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);
