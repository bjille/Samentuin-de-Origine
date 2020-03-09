import React, { Component } from "react";

import "./PerceelInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { delete_groente_overview } from "../../redux/actions/perceelActions";

class PerceelInfo extends Component {
  displayGroenteInfo = groente => {
    return (
      <div>
        <div className="geplant">geplant op: {groente.actieStartDate}</div>
        <div className="info">bijkomende info: {groente.opmerking}</div>
      </div>
    );
  };
  displayActionInfo = action => {
    return (
      <div>
        <div className="tijdspanne">
          van: {action.actieStartDate} tot {action.actieEndDate}
        </div>
        <div className="info">bijkomende info: {action.opmerking}</div>
      </div>
    );
  };

  renderStyle = groente => {
    if (groente.type === "manualAction") {
      return { backgroundColor: "rgba(0, 123, 255,0.8)", color: "white" };
    }
    if (groente.type === "groenteAction") {
      return { backgroundColor: "rgba(40, 167, 69, 0.8)", color: "white" };
    }
  };

  render() {
    let groente = this.props.groente;
    return (
      //   <h1 className="test">{this.props.groente.naam}</h1>
      <React.Fragment>
        {/* {groente.type === "groenteAction"
          ? this.displayGroenteInfo(groente)
          : ""}
        {groente.type === "manualAction" ? this.displayActionInfo(groente) : ""} */}
        <div className="groenteInfo card bg-light border mt-2">
          <div className="card-header flex" style={this.renderStyle(groente)}>
            <h5>{groente.naam} </h5>
            <div>
              {" "}
              {/* <a
              id={groente._id}
              onClick={() => this.props.handleAddAction(groente)}
              href="#"
              title="actie toevoegen aan groente"
            >
              <FontAwesomeIcon icon={faPlus} />
            </a> */}
              <a
                id={groente._id}
                onClick={() => this.props.handleEdit(groente)}
                href="#"
                title="Info aanpassen"
              >
                <FontAwesomeIcon icon={faEdit} />
              </a>
              <a
                id={groente._id}
                onClick={() => this.props.handleDelete(groente)}
                href="#"
                title="Groente verwijderen"
              >
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </div>
          <div className="card-body">
            {/* <h2 className="card-title"></h2> */}
            {groente.type === "groenteAction"
              ? this.displayGroenteInfo(groente)
              : ""}
            {groente.type === "manualAction"
              ? this.displayActionInfo(groente)
              : ""}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(delete_groente_overview(id))
  };
};

export default connect(undefined, mapDispatchToProps)(PerceelInfo);
