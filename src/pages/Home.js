import React, { Component } from "react";
import PerceelOverzicht from "../components/perceelOverzicht/PerceelOverzicht";
import PerceelInfo from "../components/perceelOverzicht/PerceelInfo";
import { connect } from "react-redux";
import GroenteModal from "../components/perceelOverzicht/GroenteModal";

class Home extends Component {
  render() {
    const { selectedPerceel, groenten } = this.props;
    const perceelInfo = groenten.filter(
      groente => groente.perceelNummer === selectedPerceel
    );

    return (
      <div className="container-fluid">
        <div className="row">
          <PerceelOverzicht></PerceelOverzicht>
          {/* uitleg per perceel START*/}
          <div id="perceelInfo" className="col-md-7 border">
            <div
              className="
              mt-2 mb-0"
            >
              <div id="groenteModal">
                <GroenteModal selectedPerceel={selectedPerceel}></GroenteModal>
              </div>
            </div>
            {perceelInfo.map((groente, index) => (
              <PerceelInfo
                key={index}
                groente={groente}
                handleDelete={this.deleteItem}
              ></PerceelInfo>
            ))}
            {/* uitleg over geselecteerd perceel */}
          </div>
          {/* uitleg per perceel END*/}
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
