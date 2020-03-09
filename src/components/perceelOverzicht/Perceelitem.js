import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import TodoList from "../TodoList";

class PerceelItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // let perceelGroente = this.props.perceelGroente;
  }

  handleClick = e => {
    this.props.setActivePerceel(e.currentTarget.id);
    // $(".collapse").collapse("toggle");
  };

  render() {
    return (
      <div
        // onClick={e => this.props.setActivePerceel(e.currentTarget.id)}
        onClick={this.handleClick}
        className="perceelItem border"
        id={this.props.perceel.id}
      >
        {this.props.perceel.naam}
        {this.props.perceelGroente.map((groente, index) => (
          <div key={index}>{groente.naam}</div>
        ))}
      </div>
    );
  }
}

const matDispatchToProps = dispatch => {
  return {
    setActivePerceel: id =>
      dispatch({
        type: "SET_SELECTED_PERCEEL",
        payload: id
      })
  };
};

export default connect(undefined, matDispatchToProps)(PerceelItem);
