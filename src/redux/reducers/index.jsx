import { combineReducers } from "@reduxjs/toolkit";
import contactReducer from "./contact";

const rootReducer = combineReducers({
  contact: contactReducer,
});

export default rootReducer;
