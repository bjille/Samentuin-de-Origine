import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import GroentenBeheer from "./pages/GroentenBeheer";
import Info from "./pages/Info";
import Home from "./pages/Home";
import Kalender from "./pages/Kalender";
import { connect } from "react-redux";
import { getPerceelinfo } from "./redux/actions/perceelActions";

class App extends Component {
  componentDidMount() {
    this.props.getPerceelinfo();
  }
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <NavBar />
          <Switch>
            <Route path="/groentenbeheer" component={GroentenBeheer} />
            <Route path="/info" component={Info} />
            <Route path="/kalender" component={Kalender} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getPerceelinfo: () => dispatch(getPerceelinfo())
});

export default connect(undefined, mapDispatchToProps)(App);
