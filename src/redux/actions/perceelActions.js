import axios from "axios";
import clone from "lodash/clone";
import { getZaaikalenderinfo } from "./zaaikalenderActions";
import { setkalenderData } from "./kalenderActions";

// export const getPerceelinfo = () => async dispatch => {
//   const res = await axios.get(
//     `https://vanloocke.synology.me:1880/samentuin-groenten-get`
//   );
//   dispatch({ type: "GET_PERCEELINFO", payload: res.data });
// };

export const getPerceelinfo = () => dispatch => {
  axios
    .get(`https://vanloocke.synology.me:1880/samentuin-action-get`)
    .then(res => {
      dispatch({ type: "GET_PERCEELINFO", payload: res.data });
      dispatch(getZaaikalenderinfo());
      // dispatch(setkalenderData());
    });
};

export const delete_action_overview = action => async dispatch => {
  const { _id } = action;
  const newGroente = clone(action);
  delete newGroente._id;
  const res = await axios.delete(
    "https://vanloocke.synology.me:1880/samentuin-action-delete",
    { data: newGroente }
  );
  dispatch({ type: "DELETE_ACTION_OVERZICHT", payload: _id });
};

export const add_Action_Overview = action => async dispatch => {
  const res = await axios
    .post("https://vanloocke.synology.me:1880/samentuin-action-post", action)
    .then(res => {
      console.log(res.data);
      action._id = res.data.insertedIds[0];
      dispatch({ type: "ADD_ACTION_OVERVIEW", payload: action });
    });
};

export const edit_Action_Overview = action => async dispatch => {
  const res = await axios
    .put("https://vanloocke.synology.me:1880/samentuin-action-put", action)
    .then(res => {
      console.log(res.data);
      dispatch({ type: "EDIT_ACTION_OVERVIEW", payload: action });
    });
};
