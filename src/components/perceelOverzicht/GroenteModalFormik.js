import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Formik } from "formik";
import "react-day-picker/lib/style.css";

import "moment/locale/be";
import { connect } from "react-redux";
import NewItemFormik from "./NewItemFormik";
import { formatDate } from "react-day-picker/moment";

class GroenteModalFormik extends Component {
  state = { show: false };

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

  handleForm = event => {
    this.toggleShow();
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
  };

  submitHandler = values => {
    this.toggleShow();
    console.log(values);
  };

  render() {
    return (
      <div>
        {this.props.selectedPerceel ? this.addbutton() : ""}
        <Modal show={this.state.show} onHide={this.toggleShow} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Geef gegevens op:</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Formik
              onSubmit={this.submitHandler}
              initialValues={{
                groente: "test",
                actieDatum: formatDate(new Date(), "l", "nl"),
                serre: true
              }}
            >
              <NewItemFormik
                toggleShow={this.toggleShow}
                selectedPerceel={this.props.selectedPerceel}
                setFieldValue={Formik.setFieldValue}
              ></NewItemFormik>
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const getStateFromProps = state => {
  return { selectedPerceel: state.perceelinfo.selectedPerceel };
};
export default connect(getStateFromProps)(GroenteModalFormik);
