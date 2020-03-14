import React, { Component } from "react";
import { connect } from "react-redux";
import { getPerceelinfo } from "../../redux/actions/perceelActions";
import PerceelItem from "./Perceelitem";
import "./PerceelOverzicht.css";

class PerceelOverzicht extends Component {
  state = {
    groenten: [],
    percelen: [
      { naam: "Serre droog", id: 1 },
      { naam: "Serre nat", id: 2 },
      { naam: "Kolen", id: 3 },
      { naam: "Braak", id: 4 },
      { naam: "Blad", id: 5 },
      { naam: "Peulen", id: 6 },
      { naam: "Vrucht", id: 7 },
      { naam: "Patatn", id: 8 },
      { naam: "Aardbeien", id: 9 },
      { naam: "Kleine vruchten", id: 10 },
      { naam: "Worter-Bol-Knol", id: 11 },
      { naam: "Kruiden", id: 12 }
    ]
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

  showPerceelInfo = perceel => {
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
    const { groenten } = this.props;
    const { percelen } = this.state;
    return (
      <div className="col-lg-5 border">
        <div
          className="container-fluid grondlayout p-2"
          style={{ backgroundColor: `rgba(166, 111, 81, 0.1)` }}
        >
          {/* {this.drawGrondlayout()} */}
          {percelen.map((perceel, index) => {
            // console.log(perceel.naam);
            let perceelGroente = [];
            groenten.map(groente => {
              if (groente.perceelNummer === perceel.naam) {
                perceelGroente.push(groente);
              }
              return groente;
              // groente.perceelNummer === (index + 1).toString()
              //   ? perceelGroente.push(groente)
              //   : "";
            });
            return (
              <PerceelItem
                key={index}
                perceel={perceel}
                perceelNummer={perceelGroente.perceelNummer}
                perceelGroente={perceelGroente}
              ></PerceelItem>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groenten: state.perceelinfo.groenten,
  selectedPerceel: state.perceelinfo.selectedPerceel
});

const mapDispatchToProps = dispatch => ({
  getPerceelinfo: () => dispatch(getPerceelinfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(PerceelOverzicht);
