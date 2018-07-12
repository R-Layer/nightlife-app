import jwt_decode from "jwt-decode";

import { loginProcess } from "../types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case loginProcess.SUCCESS:
      let user = jwt_decode(action.loggedUser.token);
      return user;
    case loginProcess.LOGOUT:
      return {};
    default:
      return state;
  }
};
