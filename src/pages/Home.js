import React, { Component } from "react";
import { Accordion } from "react-bootstrap";
import PerceelOverzicht from "../components/perceelOverzicht/PerceelOverzicht";
import PerceelInfo from "../components/perceelOverzicht/PerceelInfo";
import { connect } from "react-redux";
import GroenteModal from "../components/modals/GroenteModal";
import ActionModal from "../components/modals/ActionModal";
import TodoList from "../components/TodoList";
import ActieButtons from "../components/perceelOverzicht/ActieButtons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import RenderModal from "../components/modals/RenderModal";

class Home extends Component {
  state = {};

  handleChangeAction = (e, action, actionType) => {
    console.log(e);
    e.stopPropagation();
    console.log(action);
    if (action.type === "action") {
      this.setState({
        showActionModal: true,
        actionType: actionType,
        selectedAction: action
      });
    }
    if (action.type === "groente") {
      this.setState({
        showGroenteModal: true,
        actionType: actionType,
        selectedAction: action
      });
    }
  };

  render() {
    const { selectedPerceel, groenten } = this.props;
    const { selectedAction, actionType } = this.state;
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
            <div id="perceelInfo" className="col-md-7 border">
              <div
                className="
              mt-2 mb-0"
              >
                <div className="actieButtons">
                  <ActieButtons
                    toggleShowGroenteModal={(e, action) =>
                      this.handleChangeAction(e, action, "add")
                    }
                    // toggleShowGroenteModal={() =>
                    //   this.setState({
                    //     showGroenteModal: true,
                    //     actionType: "add"
                    //   })
                    // }
                    toggleShowActionModal={(e, action) =>
                      this.handleChangeAction(e, action, "add")
                    }
                  ></ActieButtons>
                </div>
                <div id="Modal">
                  <RenderModal
                    actionType={actionType}
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
                    handleEdit={(e, action) =>
                      this.handleChangeAction(e, action, "edit")
                    }
                    handleAdd={(e, action) =>
                      this.handleChangeAction(e, action, "add")
                    }
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

export default connect(mapStateToProps)(Home);
