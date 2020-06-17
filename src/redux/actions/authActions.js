import { API } from "../../API";

export const getUser = () => async (dispatch) => {
  await API.get("api/users/current").then((response) => {
    console.log(response.data);
    dispatch({ type: "SET_USER", payload: response.data });
  });
};

export const logout = () => (dispatch) => {
  window.localStorage.removeItem("SAMENTUIN_OAUTHTOKEN");
  API.defaults.headers.common["Authorization"] = undefined;
  dispatch({ type: "UNSET_USER" });
};
