import React, { Component } from "react";
import { Row, Col } from "antd";
import "./CustomSubFormTable.css";

class CustomSubFormTable extends Component {
  render() {
    // const {rows} = this.props;
    const rows = [1];
    return (
      <React.Fragment>
        {rows.map((item, index) => {
          return (
            <Row key={index} className="custom-sub-container">
              <Col span={2}>
                <div className="custom-sub-index">1</div>
              </Col>
              <Col span={20}>1</Col>
              <Col span={1}>1</Col>
              <Col span={1}>1</Col>
            </Row>
          );
        })}
      </React.Fragment>
    );
  }
}

export default CustomSubFormTable;
