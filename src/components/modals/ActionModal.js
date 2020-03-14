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

class ActionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.actionType === "add") {
      this.state = { selectedStartDay: new Date(), selectedEndDay: new Date() };
    }
    if (this.props.actionType === "edit") {
      this.state = {
        selectedStartDay: this.props.selectedAction.actieStartDate,
        selectedEndDay: this.props.selectedAction.actieEndDate
      };
    }
  }
  handleStartDayChange = day => {
    this.setState({ selectedStartDay: day });
  };

  handleEndDayChange = day => {
    this.setState({ selectedEndDay: day });
  };

  handleForm = event => {
    this.props.toggleShowActionModal();
    event.preventDefault();
    const form = event.currentTarget;
    const result = {
      _id:
        this.props.actionType === "edit"
          ? this.props.selectedAction._id
          : undefined,
      naam: form.elements[0].value,
      perceelNummer: this.props.selectedPerceel,
      actieStartDate: form.elements[1].value,
      actieEndDate: form.elements[2].value,
      opmerking: form.elements[3].value,
      type: "action",
      childActions: this.props.selectedAction.childActions,
      linkedId:
        this.props.actionType === "add" && this.props.actionLevel === 1
          ? this.props.selectedAction._id
          : this.props.selectedAction.linkedId &&
            this.props.selectedAction.linkedId
    };

    if (this.props.actionType === "edit") {
      this.props.editAction_overview(result);
    }
    if (this.props.actionType === "add") {
      this.props.addAction_overview(result);
    }
  };
  render() {
    const { selectedPerceel, selectedAction, actionType } = this.props;
    const { selectedStartDay, selectedEndDay } = this.state;

    let modalTitle,
      naam,
      info = "";
    if (selectedPerceel && selectedAction && !selectedAction._id) {
      modalTitle = `Actie linken aan Perceel ${selectedPerceel}`;
    }
    if (selectedAction && selectedAction._id) {
      modalTitle = `Actie linken aan ${selectedAction.naam}`;
    }
    if (!modalTitle && !selectedPerceel) {
      modalTitle = "Actie toevoegen:";
    }
    if (actionType === "add") {
    }
    if (actionType === "edit") {
      modalTitle = "Actie wijzigen";
      naam = selectedAction.naam;
      info = selectedAction.opmerking;
    }

    return (
      <Modal
        show={this.props.showActionModal}
        onHide={this.props.toggleShowActionModal}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <form onSubmit={this.handleForm}>
          <Modal.Body>
            <div className="form-group">
              <label className="" htmlFor="Groente">
                Korte omschrijving:
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
              <label>Startdatum actie</label>
              <div className="form-group">
                <DayPickerInput
                  value={selectedStartDay}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="l"
                  onDayChange={this.handleStartDayChange}
                  dayPickerProps={{
                    locale: "nl-be",
                    localeUtils: MomentLocaleUtils
                  }}
                  required
                />
              </div>
            </div>{" "}
            <div className="form-group">
              <label>Einddatum actie</label>
              <div className="form-group">
                <DayPickerInput
                  value={selectedEndDay}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="l"
                  onDayChange={this.handleEndDayChange}
                  dayPickerProps={{
                    locale: "nl-be",
                    localeUtils: MomentLocaleUtils
                  }}
                  required
                />
              </div>
            </div>{" "}
            <div className="form-group">
              <label className="" htmlFor="opmerking">
                Gedetailleerde omschrijving:
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
              onClick={this.props.toggleShowActionModal}
            >
              Close
            </Button>
            <Button type="submit" variant="primary">
              Opslaan
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
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

export default connect(getStateFromProps, mapDispatchToProps)(ActionModal);
