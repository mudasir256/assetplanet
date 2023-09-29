import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allrooms: [],
  activeRoom: {
    id: 0,
    name: "",
    children: {},
  },
};

// A slice for client info with our 2 reducers
const roomsSlice = createSlice({
  name: "Rooms",
  initialState,
  reducers: {
    saveActiveRoom: (state, action) => {
      console.log(action);
      state.activeRoom.id = action.payload.id;
      state.activeRoom.children = action.payload.children;
      state.activeRoom.name = action.payload.name;
    },
    saveAllRooms: (state, action) => {
      state.allrooms = action.payload;
    },
  },
});

// Two actions generated from the slice
export const { saveActiveRoom, saveAllRooms } = roomsSlice.actions;

// The reducer
export default roomsSlice.reducer;
