import { combineReducers } from "redux";
import customersReducer from "./customersReducer";

const rootReducer = combineReducers({
  customersReducer,
});

export default rootReducer;
