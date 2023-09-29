import React, { Component } from "react";
import { connect } from "react-redux";
class InventorySubForm extends Component {
  render() {
    const showDatePicker = this.state;
    return (
      <React.Fragment>
        <Items />
      </React.Fragment>
    );
  }
}

export default connect()(InventorySubForm);
