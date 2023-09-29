import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inventories: [],
  collection: null,
  selectedModuleName: "",
};

// A slice for inventory with our 2 reducers
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setInventories: (state, { payload }) => {
      state.inventories = payload;
    },
    setCollection: (state, { payload }) => {
      state.collection = payload;
    },
    setSelectedModuleName: (state, { payload }) => {
      state.selectedModuleName = payload;
    },
  },
});

// Two actions generated from the slice
export const { setInventories, setCollection, setSelectedModuleName} = inventorySlice.actions;

// The reducer
export default inventorySlice.reducer;

// Asynchronous thunk action
export function postSetInventories(inventories) {
  return async (dispatch) => {
    dispatch(setInventories(inventories));
  };
}

// Asynchronous thunk action
export function postSetCollection(collection) {
  return async (dispatch) => {
    dispatch(setCollection(collection));
  };
}

// Asynchronous thunk action
export function postSetSelectedModuleName(moduleName) {
  return async (dispatch) => {
    dispatch(setSelectedModuleName(moduleName));
  };
}
