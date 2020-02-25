import React, { Component } from "react";

import "./PerceelInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { delete_groente_overview } from "../../redux/actions/perceelActions";

class PerceelInfo extends Component {
  render() {
    let groente = this.props.groente;
    return (
      //   <h1 className="test">{this.props.groente.naam}</h1>
      <div className="groenteInfo card bg-light border mt-2">
        <div className="card-header flex">
          <h5>{groente.naam} </h5>
          <a
            id={groente._id}
            onClick={() => this.props.handleDelete(groente)}
            href="#"
          >
            <FontAwesomeIcon icon={faTrash} />
          </a>
        </div>
        <div className="card-body">
          {/* <h2 className="card-title"></h2> */}
          <div className="geplant">geplant op: {groente.actieDatum}</div>
          {/* <div className="bewateren">
            aantal keer bewateren: {groente.bewateren} keer per week
          </div> */}
          <div className="info">bijkomende info: {groente.opmerking}</div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(delete_groente_overview(id))
  };
};

export default connect(undefined, mapDispatchToProps)(PerceelInfo);
