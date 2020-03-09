import React, { Component } from "react";
import PerceelOverzicht from "../components/perceelOverzicht/PerceelOverzicht";
import PerceelInfo from "../components/perceelOverzicht/PerceelInfo";
import { connect } from "react-redux";
import GroenteModal from "../components/modals/GroenteModal";
import ManualActionModal from "../components/modals/ManualActionModal";
import TodoList from "../components/TodoList";
import ActieButtons from "../components/perceelOverzicht/ActieButtons";

class Home extends Component {
  state = {};
  render() {
    const { selectedPerceel, groenten } = this.props;
    const perceelInfo = groenten.filter(
      groente => groente.perceelNummer === selectedPerceel
    );

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
                    toggleShowAddGroente={() =>
                      this.setState({ showAddGroente: true })
                    }
                    toggleAddManualAction={() =>
                      this.setState({ showAddManualAction: true })
                    }
                  ></ActieButtons>
                </div>
                <div id="addGroenteModal">
                  <GroenteModal
                    selectedPerceel={selectedPerceel}
                    showAddGroente={this.state.showAddGroente}
                    toggleShowAddGroente={() =>
                      this.setState({
                        showAddGroente: false
                      })
                    }
                  ></GroenteModal>
                </div>
                <div id="actionModal">
                  <ManualActionModal
                    selectedPerceel={selectedPerceel}
                    showAddManualAction={this.state.showAddManualAction}
                    toggleShowAddManualAction={() =>
                      this.setState({
                        showAddManualAction: false
                      })
                    }
                  ></ManualActionModal>
                </div>
              </div>
              {perceelInfo.map((groente, index) => (
                <PerceelInfo key={index} groente={groente}></PerceelInfo>
              ))}
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
