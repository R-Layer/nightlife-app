import { joinProcess, cancelProcess } from "../types";

export const joinAction = id => dispatch => {
  return dispatch({ type: joinProcess.SUCCESS, id });
};

export const cancelAction = id => dispatch => {
  return dispatch({ type: cancelProcess.SUCCESS, id });
};
