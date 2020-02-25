import axios from "axios";
import clone from "lodash/clone";

export const getPerceelinfo = () => async dispatch => {
  const res = await axios.get(
    `https://vanloocke.synology.me:1880/samentuin-groenten-get`
  );
  dispatch({ type: "GET_PERCEELINFO", payload: res.data });
};

export const delete_groente_overview = groente => async dispatch => {
  const { _id } = groente;
  const newGroente = clone(groente);
  delete newGroente._id;
  const res = await axios.delete(
    "https://vanloocke.synology.me:1880/samentuin-groenten-delete",
    { data: newGroente }
  );
  dispatch({ type: "DELETE_GROENTE_OVERZICHT", payload: _id });
};

export const add_Groente_Overview = groente => async dispatch => {
  const res = await axios
    .post("https://vanloocke.synology.me:1880/samentuin-groenten-post", groente)
    .then(res => {
      console.log(res.data);
      groente._id = res.data.insertedIds[0];
      dispatch({ type: "ADD_GROENTE_OVERVIEW", payload: groente });
    });
};