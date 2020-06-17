import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import PerceelOverzicht from "../components/perceelOverzicht/PerceelOverzicht";
import PerceelInfo from "../components/perceelOverzicht/PerceelInfo";
import { connect } from "react-redux";
import {
  delete_action_overview,
  setActivePerceel,
} from "../redux/actions/perceelActions";

import TodoList from "../components/TodoList";
import ActieButtons from "../components/perceelOverzicht/ActieButtons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import RenderModal from "../components/modals/RenderModal";

class Home extends Component {
  state = {};

  componentDidUpdate = () => {
    // console.log(this.props.match.params.activePerceel);
    if (this.props.match.params.activePerceel === "0") {
      this.props.resetActivePerceel();
    }
  };

  handleChangeAction = (e, action, actionLevel, actionType) => {
    // console.log(e);
    e.stopPropagation();
    console.log(action);
    if (action.type === "action") {
      this.setState({
        showActionModal: true,
        actionType: actionType,
        selectedAction: action,
        actionLevel: actionLevel,
      });
    }
    if (action.type === "groente") {
      this.setState({
        showGroenteModal: true,
        actionType: actionType,
        selectedAction: action,
        actionLevel: actionLevel,
      });
    }
  };

  handleDelete = (e, action) => {
    e.stopPropagation();
    const linkedActionCount = action.childActions.length;
    if (linkedActionCount > 0) {
      if (
        window.confirm(
          `Deze ${action.type} heeft ${linkedActionCount} gelinke ${
            linkedActionCount > 1 ? "acties" : "actie"
          }, ben je zeker dat je deze ${action.type} wil verwijderen?`
        )
      ) {
        this.props.handleDelete(action);
      }
    } else this.props.handleDelete(action);
  };

  peceelInfoSorter = (a, b) => {
    if (a.actionType === "action" && b.actionType === "groente") {
      return -1;
    }
    if (a.actionType === "groente" && b.actionType === "action") {
      return 1;
    }
    return 0;
  };

  render() {
    const { selectedPerceel, groenten } = this.props;
    const { selectedAction, actionType, actionLevel } = this.state;
    let perceelInfo = groenten.filter(
      (groente) => groente.perceelNummer === selectedPerceel
    );
    // .sort(this.perceelInfoSorter);

    perceelInfo.sort(this.perceelInfoSorter);
    // console.log(perceelInfo);

    return (
      <div>
        <TodoList></TodoList>
        <div id="Modal">
          <RenderModal
            actionType={actionType}
            actionLevel={actionLevel}
            selectedPerceel={selectedPerceel}
            selectedAction={selectedAction}
            showActionModal={this.state.showActionModal}
            toggleShowActionModal={() =>
              this.setState({
                showActionModal: false,
                selectedAction: undefined,
                actionType: undefined,
              })
            }
            showGroenteModal={this.state.showGroenteModal}
            toggleShowGroenteModal={() =>
              this.setState({
                showGroenteModal: false,
                selectedAction: undefined,
                actionType: undefined,
              })
            }
          ></RenderModal>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 border">
              <PerceelOverzicht></PerceelOverzicht>
            </div>
            {/* uitleg per perceel START*/}
            <div id="perceelInfo" className="col-lg-7 border">
              <div
                className="
              mt-2 mb-0"
              ></div>
              <div className="PerceelInfo">
                <h2>
                  {this.props.selectedPerceel
                    ? `perceel ${this.props.selectedPerceel}`
                    : "Algemeen Overzicht"}
                </h2>
                <div className="actieButtons">
                  {this.props.user ? (
                    <ActieButtons
                      toggleShowGroenteModal={(e, action, actionLevel) =>
                        this.handleChangeAction(e, action, actionLevel, "add")
                      }
                      // toggleShowGroenteModal={() =>
                      //   this.setState({
                      //     showGroenteModal: true,
                      //     actionType: "add"
                      //   })
                      // }
                      toggleShowActionModal={(e, action, actionLevel) =>
                        this.handleChangeAction(e, action, actionLevel, "add")
                      }
                    ></ActieButtons>
                  ) : (
                    ""
                  )}
                </div>
                <Accordion
                  defaultActiveKey={perceelInfo[0] && perceelInfo[0]._id}
                >
                  {perceelInfo.map((action, index) => (
                    <PerceelInfo
                      handleEdit={(e, action, actionLevel) =>
                        this.handleChangeAction(e, action, actionLevel, "edit")
                      }
                      handleAdd={(e, action, actionLevel) =>
                        this.handleChangeAction(e, action, actionLevel, "add")
                      }
                      handleDelete={(e, action) => this.handleDelete(e, action)}
                      key={index}
                      action={action}
                    ></PerceelInfo>
                  ))}
                </Accordion>
              </div>
              {/* uitleg over geselecteerd perceel */}
            </div>
            {/* uitleg per perceel END*/}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    selectedPerceel: state.perceelinfo.selectedPerceel,
    groenten: state.perceelinfo.groenten,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (id) => dispatch(delete_action_overview(id)),
    resetActivePerceel: () =>
      dispatch({
        type: "RESET_SELECTED_PERCEEL",
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
