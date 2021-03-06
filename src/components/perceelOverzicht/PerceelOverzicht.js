import React, { Component } from "react";
import { connect } from "react-redux";
import { getPerceelinfo } from "../../redux/actions/perceelActions";
import PerceelItem from "./Perceelitem";
import "./PerceelOverzicht.css";

class PerceelOverzicht extends Component {
  state = {
    groenten: [],
    percelen: [
      { naam: "Blad" },
      { naam: "Aardbeien" },
      { naam: "Vrucht" },
      { naam: "Kolen" },
      { naam: "Wortel-Bol-Knol" },
      { naam: "Peulen" },
      { naam: "Braak" },
      { naam: "Patatn" },
      { naam: "Serre droog" },
      { naam: "Serre nat" },
      { naam: "Kleine vruchten" },
      { naam: "Kruiden" },
    ],
  };
  componentDidMount() {
    // this.props.getPerceelinfo();
    // console.log("componentdidmount");
  }
  drawGrondlayout = () => {
    let grondlayout = [];
    for (let i = 0; i < this.state.percelen.length; i++) {
      let item = <div className="perceelItem border"></div>;
      // item.attr("id", "your-id-value");
      grondlayout += item;
    }
    // console.log(grondlayout);
    return grondlayout;
  };

  showPerceelInfo = (perceel) => {
    // console.log(this.state.groenten);
    // let perceelInfo = [];
    // let perceelInfodiv = document.getElementById("perceelInfo");
    // perceelInfo = this.state.groenten.filter(
    //   groente => groente.perceelNummer === perceel.id.toString()
    // );
    this.setState({ activePerseel: perceel });
    // this.setState({ perceelInfo });
  };
  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }

    const { groenten } = this.props;
    const { percelen } = this.state;
    return (
      <div
        className="container-fluid grondlayout p-2"
        style={{ backgroundColor: `rgba(166, 111, 81, 0.1)` }}
      >
        {/* //</div
         id="slideMenu"
        onClick={this.props.handleMouseDown}
         onMouseDown={this.props.handleMouseDown}
         className={visibility}
         style={{ backgroundColor: `rgba(166, 111, 81, 0.1)` }}
       > */}
        {/* {this.drawGrondlayout()} */}
        {percelen.map((perceel, index) => {
          // console.log(perceel.naam);
          let perceelAction = [];
          groenten.map((groente) => {
            if (groente.perceelNummer === perceel.naam) {
              perceelAction.push(groente);
            }
            return groente;
            // groente.perceelNummer === (index + 1).toString()
            //   ? perceelAction.push(groente)
            //   : "";
          });
          return (
            <PerceelItem
              key={index}
              perceel={perceel}
              perceelNummer={perceelAction.perceelNummer}
              perceelAction={perceelAction}
            ></PerceelItem>
          );
        })}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groenten: state.perceelinfo.groenten,
  selectedPerceel: state.perceelinfo.selectedPerceel,
});

const mapDispatchToProps = (dispatch) => ({
  getPerceelinfo: () => dispatch(getPerceelinfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceelOverzicht);
