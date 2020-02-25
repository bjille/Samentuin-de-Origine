import { combineReducers } from "redux";
import perceelReducer from "./perceelReducer";
import zaaikalenderReducer from "./zaaikalenderReducer";
import kalenderReducer from "./kalenderReducer";

export default combineReducers({
  perceelinfo: perceelReducer,
  zaaikalender: zaaikalenderReducer,
  kalender: kalenderReducer
});
