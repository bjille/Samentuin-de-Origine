import axios from "axios";
import { API } from "../../API";
import clone from "lodash/clone";
import { getZaaikalenderinfo } from "./zaaikalenderActions";
import { setkalenderData } from "./kalenderActions";
const backendURI = require("../../config/keys").BACKEND_URI;
// export const getPerceelinfo = () => async dispatch => {
//   const res = await axios.get(
//     `https://vanloocke.synology.me:1880/samentuin-groenten-get`
//   );
//   dispatch({ type: "GET_PERCEELINFO", payload: res.data });
// };

const reformat = (data) => {
  // console.log(data);
  // acties uitfilteren die een linkedId hebben
  let childActions = data.filter((action) => {
    return action.linkedId ? action : "";
  });
  // let linkedIDs = childActions.map(action => action.linkedId);

  let rootActions = data.filter((action) => {
    return !action.linkedId ? action : "";
  });
  // console.log(rootActions);

  let newData = rootActions.map((rootAction) => {
    let selectedChildActions = childActions.filter(
      (childAction) => childAction.linkedId === rootAction._id
    );
    rootAction.childActions = selectedChildActions;
    if (selectedChildActions.length > 0) {
      // rootAction.childActions = selectedChildActions;
    }
    return rootAction;
  });

  return newData;
};

export const setActivePerceel = (id) => (dispatch) => {
  dispatch({
    type: "SET_SELECTED_PERCEEL",
    payload: id,
  });
};

export const getPerceelinfo = () => (dispatch) => {
  API
    // .get(`https://samentuin-backend.herokuapp.com/api/acties`)
    .get(`${backendURI}/api/acties`)
    .then((res) => {
      const formattedData = reformat(res.data);
      dispatch({ type: "GET_PERCEELINFO", payload: formattedData });
      dispatch(getZaaikalenderinfo());
      // setkalenderData(formattedData);
      // dispatch(setkalenderData());
    });
};

export const delete_action_overview = (action) => async (dispatch) => {
  const { _id } = action;
  const newGroente = clone(action);
  delete newGroente._id;
  delete newGroente.childActions;
  const res = await API.delete(`${backendURI}/api/acties/${_id}`);
  dispatch({ type: "DELETE_ACTION_OVERZICHT", payload: action });
};

export const add_Action_Overview = (action) => async (dispatch) => {
  // console.log(action);
  const res = await API.post(`${backendURI}/api/acties`, action).then((res) => {
    // console.log(res.data);
    action._id = res.data._id;
    action.childActions = [];
    dispatch({ type: "ADD_ACTION_OVERVIEW", payload: action });
  });
};

export const edit_Action_Overview = (action) => async (dispatch) => {
  const res = await API.post(`${backendURI}/api/acties`, action).then((res) => {
    // console.log(res.data);
    dispatch({ type: "EDIT_ACTION_OVERVIEW", payload: action });
  });
};
