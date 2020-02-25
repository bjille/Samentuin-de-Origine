import React, { Component } from "react";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import { Button, Modal } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  Form,
  Field,
  useFormikContext,
  useField,
  ErrorMessage,
  setFieldValue
} from "formik";

export default class NewItemFormik extends Component {
  state = { selectedDay: undefined };
  handleDayChange = day => {
    this.setState({ selectedDay: day });
    // let actieDatumInput = document.getElementById("actieDatum");
    // actieDatumInput.value = formatDate(day, "l", "nl");
  };
  render() {
    // const { setFieldValue } = useFormikContext();
    const { selectedDay } = this.state;
    const { selectedPerceel } = this.props;
    return (
      <Form>
        <Modal.Body>
          <div className="form-group">
            <label className="" htmlFor="Groente">
              Groente planten op perceel {selectedPerceel}
            </label>
            <Field
              type="text"
              className="form-control"
              name="groente"
              id="groente"
              aria-describedby="groenteHelp"
              placeholder="Groente"
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
            {/* <Field
              type="text"
              // className="d-none"
              name="actieDatum"
              id="actieDatum"
              // value={this.state.selectedDay}
            ></Field> */}
            <label>Datum van actie</label>
            <div>
              <DayPickerInput
                ref={ref => (this.datePicker = ref)}
                // onChange={val => {
                //   setFieldValue("actieDatum", val);
                // }}
                // value={selectedDay}
                formatDate={formatDate}
                parseDate={parseDate}
                format="l"
                onDayChange={this.handleDayChange}
                placeholder={`${formatDate(new Date(), "l", "nl")}`}
                dayPickerProps={{
                  locale: "nl",
                  localeUtils: MomentLocaleUtils
                }}
              />
            </div>
          </div>{" "}
          <div className="custom-control custom-switch">
            <Field
              type="checkbox"
              className="custom-control-input"
              id="serre"
              name="serre"
            />
            <label className="custom-control-label" htmlFor="serre">
              In de serre?
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleShow}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Opslaan
          </Button>
        </Modal.Footer>
      </Form>
    );
  }
}
