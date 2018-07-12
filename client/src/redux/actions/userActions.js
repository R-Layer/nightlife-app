import {
  registerProcess,
  loginProcess,
  deleteProcess,
  failProcess
} from "../types";

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
        return dispatch({ type: failProcess.ERRORS, err: newUser.err });
      } else {
        return dispatch({ type: registerProcess.SUCCESS, newUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
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
          type: failProcess.ERRORS,
          err: loggedUser.err
        });
      } else {
        return dispatch({ type: loginProcess.SUCCESS, loggedUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
