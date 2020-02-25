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
import { setkalenderData } from "./redux/actions/kalenderActions";

class App extends Component {
  componentDidMount() {
    this.props.getPerceelinfo();
    let kalenderData = this.formatData();
    // console.log("componentDidMount " + kalenderData);
    // this.setState({ kalenderData });
    this.props.setKalenderData(kalenderData);
  }

  formatData = () => {
    if (this.props.groenten) {
      let kalenderData = this.props.groenten.map(groente => {
        return {
          title: groente.naam,
          start: this.formatDate(groente.actieDatum)
          // end: this.formatDate(groente.oogsten)
        };
      });
      return kalenderData;
    }
  };

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
  getPerceelinfo: () => dispatch(getPerceelinfo()),
  setKalenderData: data => dispatch(setkalenderData(data))
});

export default connect(undefined, mapDispatchToProps)(App);
