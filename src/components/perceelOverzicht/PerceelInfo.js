import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import "./PerceelInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { delete_action_overview } from "../../redux/actions/perceelActions";

class PerceelInfo extends Component {
  handleAddAction = (e, action) => {
    // let action = {};
    let newAction = { ...action };
    newAction.type = "action";
    this.props.handleAdd(e, newAction);
  };

  displayGroenteInfo = action => {
    return (
      <div>
        <div className="tijdspanne">
          <b>geplant op:</b> {action.actieStartDate}
        </div>
        <div className="info">
          <b>bijkomende info:</b> {action.opmerking}
        </div>
      </div>
    );
  };
  displayActionInfo = action => {
    return (
      <div>
        <div className="tijdspanne">
          <b>van:</b> {action.actieStartDate} <br></br>
          <b>tot: </b> {action.actieEndDate}
        </div>
        <div className="info">
          <b>bijkomende info:</b> {action.opmerking}
        </div>
      </div>
    );
  };

  renderPerceelItemStyle = action => {
    if (action.type === "action") {
      return { backgroundColor: "rgba(0, 123, 255,0.8)", color: "white" };
    }
    if (action.type === "groente") {
      return { backgroundColor: "rgba(40, 167, 69, 0.8)", color: "white" };
    }
  };

  render() {
    let action = this.props.groente;
    return (
      //   <h1 className="test">{this.props.groente.naam}</h1>
      <React.Fragment>
        <Card className="groenteInfo card bg-light border mt-2">
          <Accordion.Toggle
            as={Card.Header}
            eventKey={action._id}
            className="card-header flex "
            style={this.renderPerceelItemStyle(action)}
          >
            <h5>{action.naam} </h5>
            {/* <a as={Button} viariant="link" eventkey={action._id}>
              {action.naam}
            </a> */}
            <div className="perceelInfoButtons">
              <a
                id={action._id}
                onClick={e => this.handleAddAction(e, action)}
                href="#"
                title="actie toevoegen aan groente"
              >
                <FontAwesomeIcon icon={faPlus} />
              </a>
              <a
                id={action._id}
                onClick={e => this.props.handleEdit(e, action)}
                href="#"
                title="Info aanpassen"
              >
                <FontAwesomeIcon icon={faEdit} />
              </a>
              <a
                id={action._id}
                onClick={() => this.props.handleDelete(action)}
                href="#"
                title="Groente verwijderen"
              >
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={action._id}>
            <Card.Body className="actionInfo card bg-light border">
              {/* <h2 className="card-title"></h2> */}
              {action.type === "groente" && this.displayGroenteInfo(action)}
              {action.type === "action" && this.displayActionInfo(action)}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(delete_action_overview(id))
  };
};

export default connect(undefined, mapDispatchToProps)(PerceelInfo);
