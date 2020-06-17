import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../API";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends Component {
  state = {
    redirect: false,
    errors: [],
  };

  errorStyle = { color: "red", textAlign: "left", paddingTop: "10px" };

  register = (values) => {
    API.post("api/users/register", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    }).then(
      (res) => {
        alert("registratie gelukt");
        this.setState({ redirect: true });
      },
      (error) => {
        let errors = error.response.data;
        this.setState({ errors, redirect: false });
      }
    );
  };

  validate = (values) => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = "verplicht veld";
    }
    if (!values.last_name) {
      errors.last_name = "verplicht veld";
    }
    if (!values.email) {
      errors.email = "verplicht veld";
    }
    if (!values.password) {
      errors.password = "verplicht veld";
    }
    return errors;
  };

  // Formik

  submitHandler = (values) => {
    this.register(values);
  };

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Formik
        onSubmit={this.submitHandler}
        validate={this.validate}
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
      >
        <Form>
          <div className="text-center border border-light p-5">
            <p className="h4 mb-4">Registreren</p>
            <div className="form-row mb-4">
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Voornaam"
                ></Field>
                <div style={this.errorStyle} className="error">
                  {this.state.errors.first_name &&
                    this.state.errors.errors.first_name}
                </div>
                <ErrorMessage
                  style={this.errorStyle}
                  className="error"
                  name="first_name"
                ></ErrorMessage>
              </div>
              <div className="col">
                <Field
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Naam"
                ></Field>
                <div style={this.errorStyle} className="error">
                  {this.state.errors.last_name && this.state.errors.last_name}
                </div>
                <ErrorMessage
                  style={this.errorStyle}
                  className="error"
                  name="last_name"
                ></ErrorMessage>
              </div>
            </div>
            <div className="form-row mb-4">
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="E-mail"
              ></Field>
              <div style={this.errorStyle} className="error">
                {this.state.errors.email && this.state.errors.email}
              </div>
              <ErrorMessage
                style={this.errorStyle}
                className="error"
                name="email"
              ></ErrorMessage>
            </div>
            <div className="form-row">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Paswoord"
              ></Field>
            </div>
            <div style={this.errorStyle} className="error">
              {this.state.errors.password && this.state.errors.password}
            </div>
            <ErrorMessage
              style={this.errorStyle}
              className="error"
              name="password"
            ></ErrorMessage>

            {/* <label htmlFor="avatar">Url Avatar: </label>
            <Field className="form-control" type="text" name="avatar"></Field> */}
            <button className="btn btn-info my-4 btn-block" type="submit">
              Registeren
            </button>
          </div>
        </Form>
      </Formik>
    );
  }
}
