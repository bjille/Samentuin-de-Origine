import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import { connect } from "react-redux";
import { add_Action_Overview } from "../../redux/actions/perceelActions";

class ManualActionModal extends Component {
  state = {};

  handleStartDayChange = day => {
    this.setState({ selectedStartDay: day });
    // document.getElementById("daypicker").innerHTML = day;
  };

  handleEndDayChange = day => {
    this.setState({ selectedEndDay: day });
    // document.getElementById("daypicker").innerHTML = day;
  };

  handleForm = event => {
    this.props.toggleShowAddManualAction();
    event.preventDefault();
    const form = event.currentTarget;
    // const result = {
    //   groente: form.children[0].children[0].children[1].value,
    //   actieDatum:
    //     form.children[0].children[1].children[1].children[0].children[0].value,
    //   serre: form.children[0].children[2].children[0].checked
    // };
    const result = {
      naam: form.elements[0].value,
      perceelNummer: this.props.selectedPerceel,
      actieStartDate: form.elements[1].value,
      actieEndDate: form.elements[2].value,
      opmerking: form.elements[3].value,
      type: "manualAction"
    };
    console.log(form.elements);
    console.log(result);
    this.props.addAction_overview(result);
  };

  render() {
    const { selectedPerceel } = this.props;
    const { selectedStartDay, selectedEndDay } = this.state;

    return (
      <Modal
        // show={this.state.showAddGroente}
        show={this.props.showAddManualAction}
        onHide={this.props.toggleShowAddManualAction}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {this.props.selectedPerceel
              ? "Actie toevoegen aan Perceel:"
              : "Actie toevoegen:"}
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={this.handleForm}>
          <Modal.Body>
            <div className="form-group">
              <label className="" htmlFor="Groente">
                {this.props.selectedPerceel
                  ? `Omschrijving actie aan perceel ${selectedPerceel}:`
                  : "Actie toevoegen:"}
              </label>
              <input
                type="text"
                className="form-control"
                id="Groente"
                aria-describedby="groenteHelp"
                required
                // placeholder="Groente"
              />
              {/* <small id="groenteHelp" className="form-text text-muted">
			Geef de Groeten op die je gezaaid/geplant hebt{" "}
		  </small> */}
            </div>{" "}
            <div className="form-group">
              {/* {selectedDay && (
			<label>Datum: {selectedDay.toLocaleDateString()}</label>
		  )}
		  {!selectedDay && <label>Kies een datum</label>} */}
              <label>Startdatum actie</label>
              <div className="form-group">
                <DayPickerInput
                  value={selectedStartDay}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="l"
                  onDayChange={this.handleStartDayChange}
                  placeholder={`${formatDate(new Date(), "l", "nl")}`}
                  dayPickerProps={{
                    locale: "be",
                    localeUtils: MomentLocaleUtils
                  }}
                  required
                />
              </div>
            </div>{" "}
            <div className="form-group">
              {/* {selectedDay && (
			<label>Datum: {selectedDay.toLocaleDateString()}</label>
		  )}
		  {!selectedDay && <label>Kies een datum</label>} */}
              <label>Einddatum actie</label>
              <div className="form-group">
                <DayPickerInput
                  value={selectedEndDay}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="l"
                  onDayChange={this.handleEndDayChange}
                  placeholder={`${formatDate(new Date(), "l", "nl")}`}
                  dayPickerProps={{
                    locale: "be",
                    localeUtils: MomentLocaleUtils
                  }}
                  required
                />
              </div>
            </div>{" "}
            <div className="form-group">
              <label className="" htmlFor="opmerking">
                opmerking:
              </label>
              <textarea
                name="opmerking"
                id="opmerking"
                className="form-control"
                rows="3"
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.props.toggleShowAddGroente}
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
  addAction_overview: groente => dispatch(add_Action_Overview(groente))
});

export default connect(
  getStateFromProps,
  mapDispatchToProps
)(ManualActionModal);
