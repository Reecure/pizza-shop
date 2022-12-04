import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  activeSort: {
    name: "популярности",
    PropType: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.category = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
      console.log(state.activeSort);
    },
  },
});

export const { setActiveCategory, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;
