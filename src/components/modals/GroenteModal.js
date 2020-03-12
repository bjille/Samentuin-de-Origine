import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/nl-be";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import "moment/locale/be";
import { connect } from "react-redux";
import {
  add_Action_Overview,
  edit_Action_Overview
} from "../../redux/actions/perceelActions";

class GroenteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.actionType === "add") {
      this.state = { selectedDay: new Date() };
    }
    if (this.props.actionType === "edit") {
      this.state = { selectedDay: this.props.selectedAction.actieStartDate };
    }
  }

  handleDayChange = day => {
    this.setState({ selectedDay: day });
  };

  handleForm = event => {
    this.props.toggleShowGroenteModal();
    event.preventDefault();
    const form = event.currentTarget;
    const result = {
      _id: this.props.selectedAction._id,
      naam: form.elements[0].value,
      perceelNummer: this.props.selectedPerceel,
      actieStartDate: form.elements[1].value,
      serre: form.elements[2].checked,
      opmerking: form.elements[3].value,
      type: "groente"
    };
    console.log(result);
    if (this.props.actionType === "edit") {
      this.props.editAction_overview(result);
    }
    if (this.props.actionType === "add") {
      this.props.addAction_overview(result);
    }
  };

  render() {
    const { selectedDay } = this.state;
    const { selectedPerceel, actionType, selectedAction } = this.props;
    console.log(selectedAction);
    console.log(selectedDay);
    let modalTitle,
      naam,
      info = "";
    let serre = false;
    if (selectedPerceel && actionType === "add") {
      modalTitle = `Groente linken aan Perceel ${selectedPerceel}`;
    }
    if (selectedPerceel && actionType === "edit") {
      modalTitle = `Groente Wijzigen`;
      naam = selectedAction.naam;
      info = selectedAction.opmerking;
      serre = selectedAction.serre;
    }

    return (
      <div>
        <Modal
          show={this.props.showGroenteModal}
          onHide={this.props.toggleShowGroenteModal}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleForm}>
            <Modal.Body>
              <div className="form-group">
                <label className="" htmlFor="Groente">
                  Naam groente:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Groente"
                  aria-describedby="groenteHelp"
                  defaultValue={naam}
                  required
                />
              </div>{" "}
              <div className="form-group">
                <label>Datum van actie</label>
                <div className="form-group">
                  <DayPickerInput
                    value={selectedDay}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format="l"
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                      locale: "nl-be",
                      localeUtils: MomentLocaleUtils
                    }}
                    required
                  />
                </div>
              </div>{" "}
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="switch1"
                    defaultChecked={serre}
                  />
                  <label className="custom-control-label" htmlFor="switch1">
                    In de serre?
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="" htmlFor="opmerking">
                  opmerking:
                </label>
                <textarea
                  name="opmerking"
                  id="opmerking"
                  className="form-control"
                  rows="3"
                  defaultValue={info}
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={this.props.toggleShowGroenteModal}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Opslaan
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}

const getStateFromProps = state => {
  return { selectedPerceel: state.perceelinfo.selectedPerceel };
};

const mapDispatchToProps = dispatch => ({
  editAction_overview: action => dispatch(edit_Action_Overview(action)),
  addAction_overview: action => dispatch(add_Action_Overview(action))
});

export default connect(getStateFromProps, mapDispatchToProps)(GroenteModal);
