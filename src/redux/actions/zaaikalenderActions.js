import axios from "axios";
const backendURI = require("../../config/keys").BACKEND_URI;

export const getZaaikalenderinfo = () => async (dispatch) => {
  const res = await axios.get(`${backendURI}/api/groenteninfo`);
  dispatch({ type: "GET_ZAAIKALENDER", payload: res.data });
};
