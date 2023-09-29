import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: [],
  activeItem: {
    id: 0,
    // children: {},
  },
};

const itemSlice = createSlice({
  name: "Items",
  initialState,
  reducers: {
    saveActiveItem: (state, action) => {
      console.log(action);
      state.activeItem.id = action.payload.id;
    },
    saveAllItems: (state, action) => {
      state.allItems = action.payload;
    },
  },
});

// Two actions generated from the slice
export const { saveActiveItem, saveAllItems } = itemSlice.actions;

// The reducer
export default itemSlice.reducer;
