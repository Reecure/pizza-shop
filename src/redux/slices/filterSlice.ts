import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listType } from "../../types/types";

type filterState = {
  categoryId: number;
  activeSort: listType;
};

const initialState: filterState = {
  categoryId: 0,
  activeSort: {
    name: "популярности",
    PropType: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setActiveSort(state, action: PayloadAction<listType>) {
      state.activeSort = action.payload;
    },
  },
});

export const { setActiveCategory, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;
