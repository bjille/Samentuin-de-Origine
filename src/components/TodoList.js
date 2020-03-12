import React, { Component } from "react";
import { connect } from "react-redux";

class TodoList extends Component {
  render() {
    return (
      <div>
        <h1 className="TodoList">Komende acties:</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { groenten: state.groenten };
};

export default connect(mapStateToProps)(TodoList);
