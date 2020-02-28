import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import list from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
// import "./node_modules/@fullcalendar/core/main.css";
// import "./node_modules/@fullcalendar/list/main.css";
import "./MoestuinKalender.css";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { connect } from "react-redux";
import moment from "moment";
import { setkalenderData } from "../../redux/actions/kalenderActions";

class MoestuinKalender extends Component {
  constructor(props) {
    super(props);
    // this.state = { kalenderData: this.props.kalenderData };
  }
  state = { kalenderData: [] };

  calendarRef = React.createRef();

  componentDidMount() {
    let kalenderData = this.formatData();
    // console.log("componentDidMount " + kalenderData);
    // this.setState({ kalenderData });
    this.props.setKalenderData(kalenderData);
    this.setState({ kalenderData });
    let calendarAPI = this.calendarRef.current.getApi();
    calendarAPI.setOption("height", "auto");
    // calendarAPI.setOption("aspectRatio", 2);
  }
  // state = { kalenderData: [] };
  componentDidUpdate(prevProps) {
    if (this.props.groenten !== prevProps.groenten) {
      // let kalenderData = this.formatData();
      // // console.log("componentDidMount " + kalenderData);
      // // this.setState({ kalenderData });
      // this.props.setKalenderData(kalenderData);
    }
  }

  formatDate = date => {
    const newDate = moment(date, "DD-MM-YYYY");
    return newDate.format("YYYY-MM-DD");
  };

  formatData = () => {
    let kalenderData = [];

    let perceelInfo = this.props.groenten.map(groente => {
      let color;
      groente.naam === "aardappel" ? (color = "red") : (color = "green");
      return {
        title: groente.naam,
        start: this.formatDate(groente.actieDatum),
        color: color,
        // end: this.formatDate(groente.oogsten)
        source: "perceelinfo",
        groupId: 0
      };
    });

    let zaaikalenderData = this.props.zaaikalender.map(kalenderItem => {
      return {
        title: kalenderItem.naam + " (" + kalenderItem.type + ") " + "zaaien",
        start: moment()
          .day("Monday")
          .week(kalenderItem.zaaien_van)
          .format("YYYY-MM-DD"),
        end: moment()
          .day("Sunday")
          .week(kalenderItem.zaaien_tot)
          .format("YYYY-MM-DD"),
        color: "lightgrey",
        textColor: "black",
        source: "zaaikalender",
        groupId: 1
      };
    });
    kalenderData = [
      ...perceelInfo,
      ...zaaikalenderData,
      { title: "testdata", start: "2020-02-07", groupId: 2 }
    ];
    return kalenderData;
  };

  changeView = view => {
    let calendarAPI = this.calendarRef.current.getApi();
    // this.setState({ calendarView: "dayGridMonth" });
    calendarAPI.changeView(view);
    // calenderAPI.next();
  };

  clicked = info => {
    console.log(info.event);
    console.log("Event: " + info.event.title);
  };

  changeData = (e, groupId) => {
    console.log(e.target.checked);
    const value = e.target.checked;
    if (value === true) {
      let filteredKalenderData = this.props.kalenderData.filter(
        data => data.groupId === groupId
      );
      const kalenderData = [
        ...this.state.kalenderData,
        ...filteredKalenderData
      ];
      this.setState({ kalenderData });
    }
    if (value === false) {
      let filteredKalenderData = this.state.kalenderData.filter(
        data => data.groupId !== groupId
      );
      const kalenderData = filteredKalenderData;
      this.setState({ kalenderData });
    }
  };

  render() {
    // const kalenderData = [];
    const kalenderData = this.state.kalenderData;
    console.log(kalenderData);

    return (
      <div>
        <div className="row">
          <div className="fullcalendarContainer">
            <div
              className="calenderControls col col-md-3 col-12"
              style={{ margin: 20 }}
            >
              <button
                className="btn btn-primary btn-block"
                onClick={() => this.changeView("dayGridWeek")}
              >
                Weekoverzicht
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={() => this.changeView("dayGridMonth")}
              >
                Maandoverzicht
              </button>
              <button
                className="btn btn-primary btn-block"
                onClick={() => this.changeView("listWeek")}
              >
                Lijst
              </button>{" "}
              <div className="viewButtons">
                <div className="form-group">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="swtzaaikalender"
                      defaultChecked
                      onChange={e => this.changeData(e, 1)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="swtzaaikalender"
                    >
                      Zaaikalender Velt
                    </label>
                  </div>
                </div>{" "}
                <div className="form-group">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="swtmoestuinplanning"
                      defaultChecked
                      onChange={e => this.changeData(e, 0)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="swtmoestuinplanning"
                    >
                      Moestuinplanning
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="swttestdata"
                      defaultChecked
                      onChange={e => this.changeData(e, 2)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="swttestdata"
                    >
                      Testdata
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div
              // style={{ maxWidth: 800, width: "100%", height: "auto" }}
              className="calendarContainer col-md-auto"
            >
              <FullCalendar
                // header={{
                //   left: "title",
                //   center: "listWeek,dayGridMonth,dayGridWeek",
                //   right: "today prev,next"
                // }}
                ref={this.calendarRef}
                defaultView="dayGridMonth"
                View="list"
                plugins={[list, bootstrapPlugin, dayGridPlugin]}
                // themeSystem="bootstrap"
                events={kalenderData}
                eventClick={this.clicked}
                eventTextColor="white"
              ></FullCalendar>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groenten: state.perceelinfo.groenten,
    zaaikalender: state.zaaikalender,
    kalenderData: state.kalender
  };
};

const mapDispatchToProps = dispatch => ({
  setKalenderData: data => dispatch(setkalenderData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoestuinKalender);
