import { combineReducers } from "redux";
import perceelReducer from "./perceelReducer";
import zaaikalenderReducer from "./zaaikalenderReducer";
import kalenderReducer from "./kalenderReducer";
import authReducer from "./authReducer";

export default combineReducers({
  perceelinfo: perceelReducer,
  zaaikalender: zaaikalenderReducer,
  kalender: kalenderReducer,
  auth: authReducer,
});
