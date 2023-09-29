import { combineReducers } from "redux";

import loginReducer from "./slices/loginSlice";
import inventoryReducer from "./slices/inventorySlice";
import clientInfoReducer from "./slices/clientInfoSlice";
import propertiesSlice from "./slices/propertiesSlice";
import roomsSlice from "./slices/roomsSlice";
import itemsSlice from "./slices/itemsSlice";

export default combineReducers({
  loginUser: loginReducer,
  inventory: inventoryReducer,
  clientInfo: clientInfoReducer,
  propertiesInfo: propertiesSlice,
  roomsInfo: roomsSlice,
  itemsInfo: itemsSlice,
});
