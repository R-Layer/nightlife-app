import { reservationProcess, getVisitorsProcess, failProcess } from "../types";

export const reservationAction = id => dispatch => {
  const requestOptions = {
    method: "PATCH",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken)
    requestOptions.headers.authorization = localStorage.authToken;

  return fetch(`api/biz/${id}`, requestOptions)
    .then(res => res.json())
    .then(result => dispatch({ type: reservationProcess.SUCCESS, result }))
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const getVisitorsAction = () => dispatch => {
  const requestOptions = {
    method: "GET",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken)
    requestOptions.headers.authorization = localStorage.authToken;

  return fetch("api/biz", requestOptions)
    .then(res => res.json())
    .then(result => dispatch({ type: getVisitorsProcess.SUCCESS, result }))
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
