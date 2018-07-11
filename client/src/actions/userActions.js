import { failProcess } from "../reducers/errorReducer";

export const registerProcess = {
  REQUEST: "REGISTER_REQUEST",
  SUCCESS: "REGISTER_SUCCESS",
  FAILURE: "REGISTER_FAILURE"
};

export const deleteProcess = {
  REQUEST: "DELETE_REQUEST",
  SUCCESS: "DELETE_SUCCESS",
  FAILURE: "DELETE_FAILURE"
};

export const loginProcess = {
  REQUEST: "LOGIN_REQUEST",
  SUCCESS: "LOGIN_SUCCESS",
  FAILURE: "LOGIN_FAILURE"
};

export const registerAction = userData => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  fetch("/api/users/signup", requestOptions)
    .then(res => res.json())
    .then(newUser => {
      if (newUser.err) {
        return dispatch({ type: failProcess.ACTUAL_ERRORS, err: newUser.err });
      } else {
        return dispatch({ type: registerProcess.SUCCESS, newUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ACTUAL_ERRORS, err }));
};

export const loginAction = userData => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  fetch("/api/users/login", requestOptions)
    .then(res => res.json())
    .then(loggedUser => {
      if (loggedUser.err) {
        return dispatch({
          type: failProcess.ACTUAL_ERRORS,
          err: loggedUser.err
        });
      } else {
        return dispatch({ type: loginProcess.SUCCESS, loggedUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ACTUAL_ERRORS, err }));
};
