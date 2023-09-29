import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Icon, DatePicker } from "antd";
import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import budget from "../../../assets/images/latest/Budget.png";
import ToggleCustom from "../../ToggleCustom";

const formName = "taxReturn";

class SpousalDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      startPaymentParty1:"startPaymentParty1",
      startPaymentParty2:"startPaymentParty2"
    };
  }

  getRow = () => {
    const suffix = (
      <div>
        <span style={{ fontSize: 20 }}>%</span>
      </div>
    );

    // store all modal data in formData state
    const setFormData = (value) => {
      this.setState({
        formData: {
          ...this.state.formData,
          ...value,
        },
      });
    };

    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleToggleCustomChange,
    } = this.props;

    return (
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Reserved" style={{ fontSize: 17 }}>
                <ToggleCustom 
                values={["Party 1", "Party 2", "Both"]}
                handleToggleCustomChange={handleToggleCustomChange}
                  currentForm={currentForm}
                  name="reserved"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label=" Waived" style={{ fontSize: 17 }}>
                <ToggleCustom 
                values={["Party 1", "Party 2", "Both"]}
                handleToggleCustomChange={handleToggleCustomChange}
                  currentForm={currentForm}
                  name="waived"
                />
              </Form.Item>
            </Col>
          </Row>

          <Add title={"Payment Per Month"} />

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Party 1 Pays" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Amount"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="party_1_pays"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Party 2 Pays" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Amount"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="party_2_pays"
                  onChange={(val) => {
                    handleInputChange(val, currentForm);
                    setFormData({
                      [val.target.name]: val.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={"Date to Start Payment - Party 1"}>
                <DatePicker
                  size="large"
                  // style={{ width: "100%" }}
                  format={"MM/DD/YYYY"}
                  onChange={(date, dateString) => {
                    handleDatePickerChange(
                      this.state.startPaymentParty1,
                      date,
                      dateString,
                      currentForm
                    );
                    setFormData({
                      [this.state.startPaymentParty1]: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Date to Start Payment - Party 2"}>
                <DatePicker
                  size="large"
                  // style={{ width: "100%" }}
                  format={"MM/DD/YYYY"}
                  onChange={(date, dateString) => {
                    handleDatePickerChange(
                      this.state.startPaymentParty2,
                      date,
                      dateString,
                      currentForm
                    );
                    setFormData({
                      [this.state.startPaymentParty2]: dateString,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  render() {
    // const { divorceObject, handleInputChange } = this.props;

    return (
      <React.Fragment>
        <Header image={budget} title={"Spousal Support Details"} />

        <Add title={"Spousal Support"} />

        {this.getRow()}

        <div style={{ marginTop: "10%" }}>
          <Footer
            cbPrev={this.props.previousForm}
            cbNext={this.props.nextForm}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SpousalDetailForm;
