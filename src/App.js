import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import GroentenBeheer from "./pages/GroentenBeheer";
import Info from "./pages/Info";
import Home from "./pages/Home";
import Kalender from "./pages/Kalender";
import { TOKEN } from "./API";
import { connect } from "react-redux";
import { getPerceelinfo } from "./redux/actions/perceelActions";
import { setkalenderData } from "./redux/actions/kalenderActions";
import { getUser } from "./redux/actions/authActions";
import moment from "moment";
import "./app.css";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

class App extends Component {
  componentDidMount() {
    this.props.getPerceelinfo();
    if (TOKEN) {
      this.props.setUserData();
    }
  }

  render() {
    return (
      <Router>
        <div className="">
          <NavBar />
          <Switch>
            <Route path="/groentenbeheer" component={GroentenBeheer} />
            <Route path="/info" component={Info} />
            <Route path="/kalender" component={Kalender} />
            <Route path="/setPerceel/:activePerceel" component={Home} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groenten: state.perceelinfo.groenten,
    zaaikalender: state.zaaikalender,
    kalenderData: state.kalender,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPerceelinfo: () => dispatch(getPerceelinfo()),
  setKalenderData: (data) => dispatch(setkalenderData(data)),
  setUserData: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
