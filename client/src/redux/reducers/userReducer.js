import jwt_decode from "jwt-decode";

import { loginProcess } from "../types";

export const userReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case loginProcess.SUCCESS:
      let user = jwt_decode(action.loggedUser.token);
      return { isAuthenticated: true, user };
    case loginProcess.LOGOUT:
      return { isAuthenticated: false };
    default:
      return state;
  }
};
