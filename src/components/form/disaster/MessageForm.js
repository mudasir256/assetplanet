import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Icon } from "antd";

const formName = "messageForm";

class MessageForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Asset Planet Message
              </h2>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                This module serves to major purposes. The first is to ensure
                there is sufficient insurance coverage in the event of a
                disaster. The user can create a custom "What-If" scenario that
                illustrates a loss of any or all items possessed and determine
                if the various insurances owned by the user would be sufficient
                in replacing those items.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                he second purpose of this module is to create a comprehensive
                database of Who, What, Where and When in the event of a
                disaster. All of the information you collect and would be
                requested of you by emergency responders and insurance companies
                will be at your fingertips. All you need to do is prepare in
                advance by completing your Inventory Application by Asset
                Planet.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                A Natural Disaster would be anything resulting from flood,
                hurricane, tornadoe, volcanic eruption, earthquake, tsunami,
                storms, etc.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center mb-4">
                ms, etc. A Manmade Disaster would be anything resulting from
                theft, vandalism, lawsuit, accident, etc.
              </h4>
            </Col>
          </Row>
        </div>
        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4 d-flex justify-content-end">
            {/* <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('FORM DATA ', this.props.checklistObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type='right' />
            </Button> */}

            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
              style={{ background: "#39b54a", width: "30%" }}
            >
              {/* <Icon type="left" /> */}
              <span className="custom-footer-text">Next</span>
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageForm;
