import axios from "axios";
import jwt_decode from "jwt-decode";

export const LOCALSTORAGE_KEY = "SAMENTUIN_OAUTHTOKEN";
export let TOKEN = window.localStorage.getItem(LOCALSTORAGE_KEY);
const backendURI = require("./config/keys").BACKEND_URI;

if (TOKEN) {
  const decoded = jwt_decode(TOKEN.slice(7));
  const exp_date = decoded.exp;
  const current_unix = Date.now();
  // console.log(exp_date, int current_unix);
  if (exp_date * 1000 < current_unix) {
    console.log("token expired");
    window.localStorage.removeItem("SAMENTUIN_OAUTHTOKEN");
    TOKEN = undefined;
  } else console.log("token valid");
} else {
  console.log("not logged in");
}

export const API = axios.create({
  baseURL: backendURI,
});

if (TOKEN) {
  API.defaults.headers.common["Authorization"] = TOKEN;
}
