import React, { Component } from "react";
import { connect } from "react-redux";

class ActieButtons extends Component {
  addGroenteButton = () => {
    return (
      <button
        type="button"
        className="btn btn-success col-sm button-right"
        title="Groente toevoegen aan perceel"
        onClick={this.props.toggleShowAddGroente}
      >
        groente zaaien of planten
      </button>
    );
  };

  addManualActionButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary col-sm "
        title="Actie toevoegen aan perceel"
        onClick={this.props.toggleAddManualAction}
      >
        Actie toevoegen
      </button>
    );
  };

  addManualPerceelActionButton = () => {
    return (
      <button
        type="button"
        className="btn btn-primary col-sm button-left"
        title="Actie toevoegen aan perceel"
        onClick={this.props.toggleAddManualAction}
      >
        Actie toevoegen
      </button>
    );
  };
  render() {
    return (
      <div className="buttonContainer container-fluid">
        <div className="row justify-content-end">
          {/* <div>{this.props.selectedPerceel ? "" : this.addManualActionButton()}</div> */}
          {this.props.selectedPerceel ? "" : this.addManualActionButton()}
          {this.props.selectedPerceel
            ? this.addManualPerceelActionButton()
            : ""}
          {this.props.selectedPerceel ? this.addGroenteButton() : ""}
        </div>
      </div>
    );
  }
}
const getStateFromProps = state => {
  return { selectedPerceel: state.perceelinfo.selectedPerceel };
};
const mapDispatchToProps = dispatch => ({
  //   addGroente_overview: groente => dispatch(add_Groente_Overview(groente))
});

export default connect(getStateFromProps, mapDispatchToProps)(ActieButtons);
