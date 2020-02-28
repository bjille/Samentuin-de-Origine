import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import "moment/locale/be";
import { connect } from "react-redux";
import { add_Groente_Overview } from "../../redux/actions/perceelActions";

class GroenteModal extends Component {
  state = { show: false, selectedDay: undefined };

  addbutton = () => {
    return (
      <button
        type="button"
        style={{ width: "100%" }}
        className="btn btn-success"
        // data-toggle="modal"
        // data-target="#exampleModal"
        onClick={this.toggleShow}
      >
        groente zaaien of planten
      </button>
    );
  };

  toggleShow = () => {
    // console.log("show");
    this.setState({ show: !this.state.show });
  };

  handleDayChange = day => {
    this.setState({ selectedDay: day });
    // document.getElementById("daypicker").innerHTML = day;
  };

  handleForm = event => {
    this.toggleShow();
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
      actieDatum: form.elements[1].value,
      serre: form.elements[2].checked,
      opmerking: form.elements[3].value
    };
    console.log(result);
    this.props.addGroente_overview(result);
  };

  render() {
    const { selectedDay } = this.state;
    const { selectedPerceel } = this.props;
    return (
      <div>
        {this.props.selectedPerceel ? this.addbutton() : ""}
        <Modal show={this.state.show} onHide={this.toggleShow} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Geef gegevens op:</Modal.Title>
          </Modal.Header>

          <form onSubmit={this.handleForm}>
            <Modal.Body>
              <div className="form-group">
                <label className="" htmlFor="Groente">
                  Groente planten op perceel {selectedPerceel}
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
                <label>Datum van actie</label>
                <div className="form-group">
                  <DayPickerInput
                    value={selectedDay}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    format="l"
                    onDayChange={this.handleDayChange}
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
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="switch1"
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
                ></textarea>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.toggleShow}>
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
  addGroente_overview: groente => dispatch(add_Groente_Overview(groente))
});

export default connect(getStateFromProps, mapDispatchToProps)(GroenteModal);
