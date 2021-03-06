import {
  registerProcess,
  loginProcess,
  deleteProcess,
  failProcess,
  updateProcess
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
        dispatch({ type: failProcess.CLEAR });
        return dispatch({ type: registerProcess.SUCCESS, newUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const loginAction = (userData, history) => dispatch => {
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
        localStorage.setItem("authToken", loggedUser.token);
        dispatch({ type: failProcess.CLEAR });
        dispatch({ type: loginProcess.SUCCESS, loggedUser });
        return history.push("/");
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem("authToken");
  dispatch({ type: loginProcess.LOGOUT });
};

export const deleteAction = () => dispatch => {
  const requestOptions = {
    method: "DELETE",
    headers: { "content-type": "application/json" }
  };

  if (localStorage.authToken)
    requestOptions.headers.authorization = localStorage.authToken;

  return fetch("/api/users/delete", requestOptions)
    .then(res => res.json())
    .then(deletedUser => {
      if (deletedUser.err) {
        return dispatch({
          type: failProcess.ERRORS,
          err: { message: deletedUser.message }
        });
      } else {
        dispatch({ type: failProcess.CLEAR });
        return dispatch({ type: deleteProcess.SUCCESS, deletedUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};

export const updateAction = userData => dispatch => {
  const requestOptions = {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userData)
  };

  if (localStorage.authToken) {
    requestOptions.headers.authorization = localStorage.authToken;
  }

  fetch("/api/users/update", requestOptions)
    .then(res => res.json())
    .then(updatedUser => {
      if (updatedUser.err) {
        return dispatch({ type: failProcess.ERRORS, err: updatedUser.err });
      } else {
        dispatch({ type: failProcess.CLEAR });
        console.log("updatedUser", updatedUser);
        return dispatch({ type: updateProcess.SUCCESS, updatedUser });
      }
    })
    .catch(err => dispatch({ type: failProcess.ERRORS, err }));
};
