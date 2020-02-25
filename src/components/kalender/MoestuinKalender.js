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
  calendarRef = React.createRef();

  componentDidMount() {
    let kalenderData = this.formatData();
    // console.log("componentDidMount " + kalenderData);
    // this.setState({ kalenderData });
    this.props.setKalenderData(kalenderData);
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
    let kalenderData = this.props.groenten.map(groente => {
      return {
        title: groente.naam,
        start: this.formatDate(groente.actieDatum)
        // end: this.formatDate(groente.oogsten)
      };
    });
    return kalenderData;
  };

  changeView = view => {
    let calendarAPI = this.calendarRef.current.getApi();
    // this.setState({ calendarView: "dayGridMonth" });
    calendarAPI.changeView(view);
    // calenderAPI.next();
  };

  clicked = info => {
    console.log("Event: " + info.event.title);
  };

  render() {
    // const kalenderData = [];
    const kalenderData = this.props.kalenderData;
    console.log(kalenderData);

    return (
      <div>
        <button onClick={() => this.changeView("dayGridWeek")}>
          Weekoverzicht
        </button>
        <button onClick={() => this.changeView("dayGridMonth")}>
          Maandoverzicht
        </button>
        <button onClick={() => this.changeView("listWeek")}>Lijst</button>
        <FullCalendar
          ref={this.calendarRef}
          defaultView="dayGridMonth"
          View="list"
          plugins={[list, bootstrapPlugin, dayGridPlugin]}
          // themeSystem="bootstrap"
          events={kalenderData}
          eventClick={this.clicked}
        ></FullCalendar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groenten: state.perceelinfo.groenten,
    kalenderData: state.kalender
  };
};

const mapDispatchToProps = dispatch => ({
  setKalenderData: data => dispatch(setkalenderData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoestuinKalender);
