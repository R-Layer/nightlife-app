import { combineReducers } from "redux";

import {
  businessesReducer,
  reservationReducer,
  visitorsReducer
} from "./businessReducer";
import { userReducer } from "./userReducer";
import { errors } from "./errorReducer";

export const rootReducer = combineReducers({
  authState: userReducer,
  errors,
  visitors: visitorsReducer,
  businesses: businessesReducer,
  reservations: reservationReducer
});
