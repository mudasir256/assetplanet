import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Menu, Icon } from "antd";

import { BlockLink } from "../../components/Animations";
import "./schedules.css";
import { REPORTS_LIST, SCHEDULES_LIST } from "constants/types";
import Savings from "../../assets/images/latest/Savings.png";

const menu = (
  <Menu>
    <Menu.Item>
      <a>Steve and Sally Smith</a>
    </Menu.Item>
    <Menu.Item>
      <a>Lisa and Anthony May</a>
    </Menu.Item>
    <Menu.Item>
      <a>Bill and Peggy Thompson</a>
    </Menu.Item>
  </Menu>
);

class Schedules extends Component {
  clientPlan = () => {
    return (
      <React.Fragment>
        <Col
          xs={24}
          sm={6}
          lg={6}
          xl={6}
          style={{ height: "100%", marginBottom: "10px" }}
        >
          <div className="top-dropdown-style">
            <Dropdown overlay={menu} placement="bottomCenter">
              <a className="ant-dropdown-link">
                <span className="dropdown-text">Client Name</span>
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Col>
        <Col xs={24} sm={6} lg={6} xl={6} style={{ height: "100%" }}>
          <div className="top-dropdown-style">
            <Dropdown overlay={menu} placement="bottomCenter">
              <a className="ant-dropdown-link">
                <span className="dropdown-text">Plan Name</span>
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Col>
      </React.Fragment>
    );
  };

  scheduleCard = ({ name, url, img }, key) => {
    return (
      <Col key={key} xs={12} sm={8} lg={6} xl={6}>
        <div className="schedule-card">
          <Row>
            <div className="view-schedule-report-flow">
              <span className="view-schedule-report-header">{name}</span>
            </div>
          </Row>
          <Row>
            <div className="view-schedule-report-flow">
              <img src={img ? img : Savings} height="50%" width="55%"></img>
            </div>
          </Row>
          <Row>
            <div>
              <div
                className="view-schedule-button"
                onClick={() => {
                  this.props.history.push(url);
                }}
              >
                <span className="view-schedule-report-button">View Report</span>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    );
  };

  reportCard = ({ name, url, img }, key) => {
    return (
      <Col
        key={key}
        xs={12}
        sm={8}
        lg={6}
        xl={6}
        onClick={() => {
          this.props.history.push(url);
        }}
      >
        <div className="report-card-container">
          <div className="report-left">
            <img src={img ? img : Savings} height="66%" width="60%"></img>
          </div>
          <div className="report-right">
            <span className="report-right-text">{name}</span>
          </div>
        </div>
      </Col>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="report-main-container">
          <Row>{this.clientPlan()}</Row>

          <Row>
            <div className="top-header">
              <span className="report-top-text">Reports</span>
            </div>
          </Row>

          <Row gutter={[16, 16]}>
            {REPORTS_LIST.map((reportList, index) => {
              return this.reportCard(reportList, index);
            })}
          </Row>

          <Row>
            <div className="top-header-2">
              <span className="report-top-text">Schedules</span>
            </div>
          </Row>
          <Row gutter={[16, 16]}>
            {SCHEDULES_LIST.map((scheduleList, index) => {
              return this.scheduleCard(scheduleList, index);
            })}
          </Row>
        </div>

        {/* <div className="info-form-block">
          <Row gutter={16}>
            <Col span={6}>
              <h3 className="text-center font-weight-bold mb-2 insurace-group-title">
                Reportsx
              </h3>
              <div className="buttons-container">
                {REPORTS_LIST.map((reportList, index) => {
                  let className = "button-wrap width--full bk--purple";

                  return (
                    <div key={index} className={className}>
                      <a href={reportList.url}>{reportList.name}</a>
                    </div>
                  );
                })}
              </div>
            </Col>

            <Col span={6}>
              <h3 className="text-center font-weight-bold mb-2 insurace-group-title">
                Schedulesx
              </h3>
              <div className="buttons-container">
                {SCHEDULES_LIST.map((scheduleList, index) => {
                  let className = "button-wrap width--full bk--purple";

                  return (
                    <BlockLink
                      key={index}
                      className={className}
                      link={scheduleList.url}
                      title={scheduleList.name}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
        </div> */}
      </React.Fragment>
    );
  }
}

export default connect()(Schedules);
