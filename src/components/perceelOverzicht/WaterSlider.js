import React, { Component } from "react";
import { connect } from "react-redux";
import { edit_Action_Overview } from "../../redux/actions/perceelActions";

class WaterSlider extends Component {
  componentDidMount() {
    this.checkWaterStatus();
  }
  componentDidUpdate(previousProps) {
    if (
      !previousProps ||
      previousProps.action.boolWater !== this.props.action.boolWater
    ) {
      this.checkWaterStatus();
    }
  }
  checkWaterStatus = () => {
    document.getElementById(
      this.props.action._id
    ).checked = this.props.action.boolWater;
  };
  handleEdit = () => {
    const { action } = this.props;
    action.boolWater = !action.boolWater;
    // delete action.hildActions;
    this.props.editAction_overview(action);
  };
  render() {
    const action = this.props.action;

    return (
      <div className="form-group">
        <div className="custom-control custom-switch">
          {/* {action.type === "groente"
        ? this.getWaterSlider(action)
        : undefined} */}
          <input
            type="checkbox"
            className="custom-control-input"
            id={action._id}
            onChange={this.handleEdit}
          />
          <label className="custom-control-label" htmlFor={action._id}>
            Water geven
          </label>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editAction_overview: action => dispatch(edit_Action_Overview(action))
  };
};

export default connect(undefined, mapDispatchToProps)(WaterSlider);
