import axios from "axios";
import jwt_decode from "jwt-decode";

export const LOCALSTORAGE_KEY = "SAMENTUIN_OAUTHTOKEN";
export let TOKEN = window.localStorage.getItem(LOCALSTORAGE_KEY);
const backendURI = require("../../config/keys").BACKEND_URI;

if (TOKEN) {
  const decoded = jwt_decode(TOKEN);
  const exp_date = decoded.exp;
  const current_unix = Date.now();
  // console.log(exp_date, int current_unix);
  if (exp_date * 1000 < current_unix) {
    console.log("token expired");
    window.localStorage.removeItem("SAMENTUIN_OAUTHTOKEN");
    TOKEN = undefined;
  } else console.log("token valid");
}

export const API = axios.create({
  baseURL: backendURI,
});
