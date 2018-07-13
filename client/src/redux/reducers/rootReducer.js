import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  errors
});
