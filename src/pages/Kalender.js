import React, { Component } from "react";
import { connect } from "react-redux";

import { getZaaikalenderinfo } from "../redux/actions/zaaikalenderActions";
import MoestuinKalender from "../components/kalender/MoestuinKalender";

class Kalender extends Component {
  componentDidMount() {
    this.props.getZaaikalenderinfo();
  }
  render() {
    return (
      <div>
        <h1>kalender</h1>
        {/* <PerceelOverzicht></PerceelOverzicht> */}
        <MoestuinKalender></MoestuinKalender>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { zaaikalender: state.zaaikalender };
};

const mapDispatchToProps = dispatch => ({
  getZaaikalenderinfo: () => dispatch(getZaaikalenderinfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Kalender);
