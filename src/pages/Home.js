import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import PerceelOverzicht from "../components/perceelOverzicht/PerceelOverzicht";
import PerceelInfo from "../components/perceelOverzicht/PerceelInfo";
import { connect } from "react-redux";
import { delete_action_overview } from "../redux/actions/perceelActions";

import TodoList from "../components/TodoList";
import ActieButtons from "../components/perceelOverzicht/ActieButtons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import RenderModal from "../components/modals/RenderModal";

class Home extends Component {
  state = {};

  handleChangeAction = (e, action, actionLevel, actionType) => {
    // console.log(e);
    e.stopPropagation();
    console.log(action);
    if (action.type === "action") {
      this.setState({
        showActionModal: true,
        actionType: actionType,
        selectedAction: action,
        actionLevel: actionLevel
      });
    }
    if (action.type === "groente") {
      this.setState({
        showGroenteModal: true,
        actionType: actionType,
        selectedAction: action,
        actionLevel: actionLevel
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

  render() {
    const { selectedPerceel, groenten } = this.props;
    const { selectedAction, actionType, actionLevel } = this.state;
    const perceelInfo = groenten.filter(
      groente => groente.perceelNummer === selectedPerceel
    );
    console.log(perceelInfo);

    return (
      <div>
        <TodoList></TodoList>

        <div className="container-fluid">
          <div className="row">
            <PerceelOverzicht></PerceelOverzicht>
            {/* uitleg per perceel START*/}
            <div id="perceelInfo" className="col-lg-7 border">
              <div
                className="
              mt-2 mb-0"
              >
                <div className="actieButtons">
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
                </div>
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
                        actionType: undefined
                      })
                    }
                    showGroenteModal={this.state.showGroenteModal}
                    toggleShowGroenteModal={() =>
                      this.setState({
                        showGroenteModal: false,
                        selectedAction: undefined,
                        actionType: undefined
                      })
                    }
                  ></RenderModal>
                </div>
              </div>
              <Accordion
                defaultActiveKey={perceelInfo[0] && perceelInfo[0]._id}
              >
                {perceelInfo.map((groente, index) => (
                  <PerceelInfo
                    handleEdit={(e, action, actionLevel) =>
                      this.handleChangeAction(e, action, actionLevel, "edit")
                    }
                    handleAdd={(e, action, actionLevel) =>
                      this.handleChangeAction(e, action, actionLevel, "add")
                    }
                    handleDelete={(e, action) => this.handleDelete(e, action)}
                    key={index}
                    groente={groente}
                  ></PerceelInfo>
                ))}
              </Accordion>
              {/* uitleg over geselecteerd perceel */}
            </div>
            {/* uitleg per perceel END*/}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedPerceel: state.perceelinfo.selectedPerceel,
    groenten: state.perceelinfo.groenten
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleDelete: id => dispatch(delete_action_overview(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
