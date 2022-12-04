import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import search from "./slices/searchSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter,
    search,
    pizza,
  },
});
