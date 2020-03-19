import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { connect } from "react-redux";
import { setActivePerceel } from "../redux/actions/perceelActions";
import "./Navbar.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar sticky="top" bg="light" expand="sm">
        <Navbar.Brand>
          <span onClick={this.props.resetActivePerceel}>
            Samentuin de Origine
          </span>
          {/* <img src={logo} style={{ width: 100 }} alt="" /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <Link to="/">
              <span
                onClick={this.props.resetActivePerceel}
                className="navbar-brand mb-0 h1"
              >
                Home
              </span>
            </Link>{" "}
            <Link to="/groentenbeheer">
              <span className="navbar-brand mb-0 h1">Groenten</span>
            </Link>
            <Link to="kalender">
              {/* <i className="fas fa-info-circle"></i> */}
              <span className="navbar-brand mb-0 h1">Kalender</span>
            </Link>
            <Link to="Info">
              {/* <i className="fas fa-info-circle"></i> */}
              <span className="navbar-brand mb-0 h1">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
            </Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActivePerceel: id => dispatch(setActivePerceel(id)),
    resetActivePerceel: () =>
      dispatch({
        type: "RESET_SELECTED_PERCEEL"
      })
  };
};

export default connect(undefined, mapDispatchToProps)(NavBar);
