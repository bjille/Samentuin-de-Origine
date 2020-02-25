export const setkalenderData = data => dispatch => {
  if (data) {
    dispatch({ type: "SET_KALENDERDATA", payload: data });
  }
};
