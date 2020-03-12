import React, { Component } from "react";
import GroenteModal from "./GroenteModal";
import ActionModal from "./ActionModal";

export default class RenderModal extends Component {
  state = {};
  render() {
    const { actionType, selectedAction } = this.props;

    if (selectedAction && selectedAction.type === "groente") {
      return (
        <GroenteModal
          actionType={actionType}
          showGroenteModal={this.props.showGroenteModal}
          toggleShowGroenteModal={this.props.toggleShowGroenteModal}
          selectedAction={selectedAction}
        ></GroenteModal>
      );
    }
    if (selectedAction && selectedAction.type === "action") {
      return (
        <ActionModal
          actionType={actionType}
          showActionModal={this.props.showActionModal}
          toggleShowActionModal={this.props.toggleShowActionModal}
          selectedAction={selectedAction}
        ></ActionModal>
      );
    } else return <div></div>;
  }
}
