import { joinProcess, cancelProcess } from "./../types";

export const businessReducer = (state = {}, action) => {
  switch (action.type) {
    case joinProcess.SUCCESS:
      console.log("Joined!");
      return state;
    case cancelProcess.SUCCESS:
      console.log("Canceled");
      return state;
    default:
      return state;
  }
};
