import React, { Component } from "react";
import { connect } from "react-redux";
import { setActivePerceel } from "../../redux/actions/perceelActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShower } from "@fortawesome/free-solid-svg-icons";

class PerceelItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = (e) => {
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
        <div className="container perceelTitle">
          <div className="row">
            <div className="col perceelTitle-left">
              {this.props.perceel.naam}
            </div>
            <div className="col justify-content-between perceelTitle-right">
              <FontAwesomeIcon
                // className="fa-blink"
                icon={faShower}
              ></FontAwesomeIcon>
              <span>O</span>
              <span>W</span>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="perceelBody">
          {/* {this.props.perceelAction.map((action, index) => {
            return (
              <div
                className={
                  action.type === "groente" ? "text-success" : "text-primary"
                }
                key={index}
              >
                {`${action.naam} ${action.serre ? "(S)" : ""}${
                  action.childActions && action.childActions.length > 0
                    ? `(${action.childActions.length})`
                    : ""
                }`}{" "}
                {action.type === "groente" && action.boolWater === true ? (
                  <FontAwesomeIcon
                    className="fa-blink"
                    icon={faShower}
                  ></FontAwesomeIcon>
                ) : (
                  ""
                )}
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePerceel: (id) => dispatch(setActivePerceel(id)),
    // dispatch({
    //   type: "SET_SELECTED_PERCEEL",
    //   payload: id
    // })
  };
};

export default connect(undefined, mapDispatchToProps)(PerceelItem);
