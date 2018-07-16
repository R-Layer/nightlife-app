import {
  reservationProcess,
  getVisitorsProcess,
  getBusinessesProcess,
  failProcess
} from "../types";

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

export const getBusinessesAction = location => dispatch => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: process.env.YELP_KEY
    },
    mode: "cors"
  };

  fetch(
    `https://api.yelp.com/v3/businesses/search?location=${location}`,
    requestOptions
  )
    .then(res => res.json())
    .then(result => dispatch({ type: getBusinessesProcess.SUCCESS, result }))
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
