import { reservationProcess, getVisitorsProcess } from "./../types";

export const businessReducer = (state = [], action) => {
  switch (action.type) {
    case getVisitorsProcess.SUCCESS:
      return [...action.result];
    default:
      return state;
  }
};

export const reservationReducer = (state = {}, action) => {
  switch (action.type) {
    case reservationProcess.SUCCESS:
      return action.result;
    default:
      return state;
  }
};
