import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPizza } from "../../types/types";

interface itemState {
  items: IPizza[];
}

const initialState: itemState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IPizza>) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
