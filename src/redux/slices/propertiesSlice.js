import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProperties: [],
  activeProperty: {
    id: 0,
    name: "",
  },
};

const propertiesSlice = createSlice({
  name: "Properties",
  initialState,
  reducers: {
    saveActiveProperty: (state, action) => {
      console.log(action);
      state.activeProperty.id = action.payload.id;
      state.activeProperty.name = action.payload.name;
    },
    saveAllProperties: (state, action) => {
      state.allProperties = action.payload;
    },
  },
});

// Two actions generated from the slice
export const { saveActiveProperty, saveAllProperties } =
  propertiesSlice.actions;

// The reducer
export default propertiesSlice.reducer;
