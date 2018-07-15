import { combineReducers } from "redux";

import { businessReducer, reservationReducer } from "./businessReducer";
import { userReducer } from "./userReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  errors,
  businesses: businessReducer,
  reservations: reservationReducer
});
