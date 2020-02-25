import React, { Component } from "react";
import logo from "../assets/images/logo.svg";

export default class Info extends Component {
  render() {
    return (
      <div className="d-flex flex-row justify-content-center">
        <div className="d-flex flex-column ">
          <div className="logo">
            <img src={logo} style={{ width: 300 }} alt="" />
          </div>
          <div style={{ textAlign: "center" }} className="copyright">
            &copy; Tim vanloocke 2020
          </div>
        </div>
      </div>
    );
  }
}
