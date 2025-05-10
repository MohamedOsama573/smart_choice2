import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPhoneProducts = createAsyncThunk(
  "/getphoneproducts",
  async ({ page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      // Build query params
      const params = new URLSearchParams({ page, limit });

      // Add filters to the params
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== "") {
          params.append(key, filters[key]);
        }
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/v1/mobiles/amazon-mobile?${params.toString()}`,
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
