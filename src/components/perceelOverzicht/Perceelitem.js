import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import TodoList from "../TodoList";
import { setActivePerceel } from "../../redux/actions/perceelActions";

class PerceelItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // let perceelGroente = this.props.perceelGroente;
  }

  handleClick = e => {
    console.log(e.currentTarget);
    this.props.setActivePerceel(e.currentTarget.getAttribute("naam"));
    // $(".collapse").collapse("toggle");
  };

  render() {
    return (
      <div
        // onClick={e => this.props.setActivePerceel(e.currentTarget.id)}
        onClick={this.handleClick}
        className="perceelItem border border-success"
        id={this.props.perceel.id}
        naam={this.props.perceel.naam}
      >
        <div className="perceelTitle">{this.props.perceel.naam}</div>
        <hr></hr>
        <div className="perceelBody">
          {/* <div className="bodyTitle">groenten:</div>
          {this.props.perceelGroente.map((action, index) => {
            if (action.type === "groente") {
              return (
                <div key={index}>{`${action.naam} ${action.serre ? "(S)" : ""}${
                  action.childActions && action.childActions.length > 0
                    ? `(${action.childActions.length})`
                    : ""
                }`}</div>
              );
            }
          })}
          <hr></hr>
          <div className="bodyTitle">acties:</div> */}
          {this.props.perceelGroente.map((action, index) => {
            return (
              <div
                className={
                  action.type === "groente" ? "text-success" : "text-primary"
                }
                key={index}
              >{`${action.naam} ${action.serre ? "(S)" : ""}${
                action.childActions && action.childActions.length > 0
                  ? `(${action.childActions.length})`
                  : ""
              }`}</div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setActivePerceel: id => dispatch(setActivePerceel(id))
    // dispatch({
    //   type: "SET_SELECTED_PERCEEL",
    //   payload: id
    // })
  };
};

export default connect(undefined, mapDispatchToProps)(PerceelItem);
