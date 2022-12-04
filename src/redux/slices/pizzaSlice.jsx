import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizza",
  async (params) => {
    const { category, activeSort } = params;
    const data = await axios.get(
      `https://637a7c2b10a6f23f7f94e973.mockapi.io/item?${category}&sortBy=${activeSort.PropType}&order=asc`
    );
    return data.data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.pizzas = [];
      state.status = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.pizzas = [];
      state.status = "error";
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
