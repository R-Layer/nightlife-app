import {
  reservationProcess,
  getVisitorsProcess,
  getBusinessesProcess
} from "./../types";

export const visitorsReducer = (state = [], action) => {
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

export const businessesReducer = (state = [], action) => {
  switch (action.type) {
    case getBusinessesProcess.SUCCESS:
      return action.result.businesses;
    default:
      return state;
  }
};
