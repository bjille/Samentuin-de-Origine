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

  itemcounter = (item) => {};

  render() {
    const { perceel, perceelAction } = this.props;
    return (
      <div
        // onClick={e => this.props.setActivePerceel(e.currentTarget.id)}
        onClick={this.handleClick}
        className="perceelItem border border-success"
        id={perceel.id}
        naam={perceel.naam}
      >
        <div className="container">
          <div className="row">
            <div className=" perceelTitle">
              <div className="col">{perceel.naam}</div>
            </div>
          </div>
          <hr></hr>

          {/* 1ste rij iconen */}
          <div className="row ">
            <div className="d-flex justify-content-center">
              <div className="col">
                <div className="iconContainer">
                  <div>
                    <span className="icon icon-groente">G</span>{" "}
                    <span>
                      {
                        perceelAction.filter(
                          (action) => action.type === "groente"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="iconTitle">Groenten</div>
                </div>
              </div>
              <div className="col">
                <div className="iconContainer">
                  <span className="icon icon-acties">A</span>{" "}
                  <span>
                    {
                      perceelAction.filter((action) => action.type === "action")
                        .length
                    }
                  </span>
                  <div className="iconTitle">Acties</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2de rij iconen*/}
          <div className="row">
            <div className="col">
              <div className="iconContainer">
                <div>
                  <span className="icon icon-oogsten">O</span>{" "}
                  <span>
                    {
                      perceelAction.filter(
                        (action) => action.type === "groente"
                      ).length
                    }
                  </span>
                </div>
                <div className="iconTitle">Oogsten</div>
              </div>
            </div>
            <div className="col">
              <div className="iconContainer">
                <span className="icon icon-water">W</span>{" "}
                <span>
                  {
                    perceelAction.filter((action) => action.boolWater === true)
                      .length
                  }
                </span>
                <div className="iconTitle">Water</div>
              </div>
            </div>
          </div>
        </div>
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
