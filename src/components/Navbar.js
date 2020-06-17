import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import { faInfoCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { setActivePerceel } from "../redux/actions/perceelActions";
import "./Navbar.css";

class NavBar extends Component {
  render() {
    const { user } = this.props.user;
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
            {this.props.user.user !== undefined ? (
              <div
                className="logout d-flex flex-row align-items-center"
                onClick={this.props.logout}
              >
                <span className="nav-link">
                  {/* <img
                    src={user.avatar}
                    className="card-img-top mx-auto d-block avatar "
                    alt="..."
                  /> */}
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                </span>
                <span className="navbar-brand mb-0 h1">Logout</span>
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                <span>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                  <span className="">Login</span>
                </span>
              </Link>
            )}
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

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePerceel: (id) => dispatch(setActivePerceel(id)),
    resetActivePerceel: () =>
      dispatch({
        type: "RESET_SELECTED_PERCEEL",
      }),
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
