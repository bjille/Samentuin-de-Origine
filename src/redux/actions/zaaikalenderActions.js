import axios from "axios";

export const getZaaikalenderinfo = () => async dispatch => {
  const res = await axios.get(
    `https://vanloocke.synology.me:1880/samentuin-zaaikalender-get`
  );
  dispatch({ type: "GET_ZAAIKALENDER", payload: res.data });
};
