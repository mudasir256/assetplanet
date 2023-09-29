import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Table, Divider, Tag, Button } from "antd";
import "../../../components/Report.css";

var instance = null;
class List extends Component {
  constructor(props) {
    super(props);
    instance = this;
  }
  render() {
    const { rows, loading } = this.props;

    return (
      <div
        style={{ color: "#2A3DA3", fontFamily: "Poppins", fontSize: "12px" }}
      >
        <div className="clearfix">
          <h2 className="text-success float-left">{this.props.title}</h2>
          {typeof this.props.actions != "undefined"
            ? this.props.actions.map((action, aindex) => (
                <Button
                  key={aindex}
                  type="primary"
                  className="float-right"
                  onClick={action.fnClick}
                >
                  {action.title}
                </Button>
              ))
            : null}
        </div>
        <Table
          style={{ color: "#2A3DA3", fontFamily: "Poppins", fontSize: "12px", background:"white" }}
          rowClassName={(rows, index) =>
            index % 2 === 0 ? "table-row-light newClass" : "table-row-light newClass"
          }
          rowKey="id"
          loading={loading}
          dataSource={rows}
          columns={this.props.cols}
          rowSelection={this.props.rowSelect}
          scroll={{ x: this.props.scroll }}
        />
      </div>
    );
  }
}

export default connect()(List);
