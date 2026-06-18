import { combineReducers } from "@reduxjs/toolkit";
import contactReducer from "./contact";
import projectReducer from "./project";

const rootReducer = combineReducers({
  contact: contactReducer,
  project: projectReducer,
});

export default rootReducer;
