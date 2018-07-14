import { combineReducers } from "redux";

import { businessReducer } from "./businessReducer";
import { userReducer } from "./userReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  errors,
  businesses: businessReducer
});
