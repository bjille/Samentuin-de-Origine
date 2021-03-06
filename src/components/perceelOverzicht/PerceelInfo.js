import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import "./PerceelInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlus,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import PerceelChildInfo from "./PerceelChildInfo";
import WaterSlider from "./WaterSlider";
import { connect } from "react-redux";

class PerceelInfo extends Component {
  handleAdd = (e, action, actionLevel) => {
    // let action = {};
    let newAction = { ...action };
    newAction.type = "action";
    this.props.handleAdd(e, newAction, actionLevel);
  };

  displayGroenteInfo = (action) => {
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
  displayActionInfo = (action) => {
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

  renderPerceelItemStyle = (action) => {
    if (action.type === "action") {
      return { backgroundColor: "rgba(0, 123, 255,0.8)", color: "white" };
    }
    if (action.type === "groente") {
      return { backgroundColor: "rgba(40, 167, 69, 0.8)", color: "white" };
    }
  };

  render() {
    let action = this.props.action;
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
            {/* naam van actie */}
            <h5>
              {action.naam} {action.serre > 0 ? ` (Serre)` : ""}{" "}
              {action.childActions && action.childActions.length > 0
                ? `(${action.childActions.length} ${
                    action.childActions.length > 1 ? "acties" : "actie"
                  })`
                : ""}
            </h5>
            {/* <a as={Button} viariant="link" eventkey={action._id}>
              {action.naam}
            </a> */}
            {this.props.user ? (
              <div className="perceelInfoButtons">
                {action.type === "groente" ? (
                  <WaterSlider action={action} type="water"></WaterSlider>
                ) : undefined}
                {/* {action.type === "groente" ? (
                  <WaterSlider action={action} type="oogsten"></WaterSlider>
                ) : undefined} */}
                {/* <div className="form-group">
                <div className="custom-control custom-switch">
                  
                  <WaterSlider action={action}></WaterSlider>
                  <label className="custom-control-label" htmlFor={action._id}>
                    Water geven
                  </label>
                </div>
              </div> */}

                <a
                  id={action._id}
                  onClick={(e) => this.handleAdd(e, action, 1)}
                  href="#"
                  title="actie toevoegen aan groente"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </a>
                <a
                  id={action._id}
                  onClick={(e) => this.props.handleEdit(e, action, 0)}
                  href="#"
                  title="Info aanpassen"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </a>
                <a
                  id={action._id}
                  onClick={(e) => this.props.handleDelete(e, action)}
                  href="#"
                  title="Groente verwijderen"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </a>
              </div>
            ) : (
              ""
            )}
            {!this.props.user &&
            action.type === "groente" &&
            action.boolWater === true ? (
              <div className="headerNoUser">
                <FontAwesomeIcon
                  className="fa-blink"
                  icon={faShower}
                ></FontAwesomeIcon>
              </div>
            ) : (
              ""
            )}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={action._id}>
            <Card.Body className="actionInfo card bg-light border">
              {/* <h2 className="card-title"></h2> */}
              {action.type === "groente" && this.displayGroenteInfo(action)}
              {action.type === "action" && this.displayActionInfo(action)}
              <Accordion
              // defaultActiveKey={perceelInfo[0] && perceelInfo[0]._id}
              >
                {action.childActions &&
                  action.childActions.length > 0 &&
                  action.childActions.map((action) => (
                    <PerceelChildInfo
                      handleEdit={(e, action) =>
                        this.props.handleEdit(e, action, 1)
                      }
                      handleDelete={(e, action) =>
                        this.props.handleDelete(e, action)
                      }
                      key={action._id}
                      action={action}
                    ></PerceelChildInfo>
                  ))}
              </Accordion>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(PerceelInfo);
