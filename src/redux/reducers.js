import { combineReducers } from "redux";
import Auth from "./auth/reducers";
import User from "./user/reducers";
import Inventory from "./inventory/reducers";
import loginUser from "./login/reducers";

export default combineReducers({
  Auth,
  User,
  Inventory,
  loginUser
});
