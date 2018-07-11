export const failProcess = {
  ACTUAL_ERRORS: "ACTUAL_ERRORS",
  CLEAR: "CLEAR"
};

export const errors = (state = {}, action) => {
  switch (action.type) {
    case failProcess.ACTUAL_ERRORS:
      return action.err;
    case failProcess.CLEAR:
      return {};
    default:
      return state;
  }
};
