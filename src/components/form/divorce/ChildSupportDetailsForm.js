import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Icon, DatePicker } from "antd";
import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import property from "../../../assets/images/latest/Principal-House.png";
import ToggleCustom from "../../ToggleCustom";
import "./divorce.css";
// const formName = "taxReturn";

class ChildSupportDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      child: "Timmy",
      startDateParty1: "startDateParty1",
      startDateParty2: "startDateParty2"
    };
  }
  childButton = (name = "Dummy") => {
    return (
      <div
        onClick={() => {
          this.setState({ child: name });
        }}
        className="custom-box-details"
        style={
          this.state.child === name
            ? {
              background: "#39b54a",
            }
            : {
              background: "white",
            }
        }
      >
        <span
          className="custom-box-details-text"
          style={{
            paddingTop: "10%",
            paddingBottom: "10%",
          }}
        >
          {" "}
          {name}
        </span>
      </div>
    );
  };

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
      // divorceObject,
      handleDatePickerChange,
      // handleSelectChange,
      // handleFormInputChange,
      handleToggleCustomChange,
    } = this.props;

    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={6} style={{ marginTop: "1%" }}>
            {this.childButton("Timmy")}
            {this.childButton("Ross")}
            {this.childButton("Monica")}
            {this.childButton("Chandler")}
          </Col>

          <Col span={16} style={{ marginLeft: '5%' }}>
            <Add title={this.state.child} />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Percentage with Party 1"
                  style={{ fontSize: 17 }}
                >
                  <Input
                    placeholder="Enter Percentage"
                    type={"number"}
                    suffix={suffix}
                    size={"large"}
                    name="percent_with__party_1"
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
                <Form.Item
                  label="Percentage with Party 2"
                  style={{ fontSize: 17 }}
                >
                  <Input
                    placeholder="Enter Percentage"
                    type={"number"}
                    suffix={suffix}
                    size={"large"}
                    name="percent_with_party_2"
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

            <Row gutter={16} style={{ marginBottom: "4%" }}>
              <Col span={12}>
                <Form.Item
                  label="Child Support Reserved for Future"
                  style={{ fontSize: 17 }}
                >
                  <ToggleCustom
                    values={["Yes", "No"]}
                    handleToggleCustomChange={handleToggleCustomChange}
                    currentForm={currentForm}
                    name="supportReservedForFuture"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Add title="Payment Per Month" />

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Party 1 pays" style={{ fontSize: 17 }}>
                  <Input
                    placeholder="Enter Amount Here"
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
                <Form.Item label="Party 2 pays" style={{ fontSize: 17 }}>
                  <Input
                    placeholder="Enter Amount Here"
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
                <Form.Item
                  label="Payment Start Date - Party 1"
                  style={{ fontSize: 17 }}
                >
                  <DatePicker
                    size="large"
                    // style={{ width: "100%" }}
                    format={"MM/DD/YYYY"}
                    onChange={(date, dateString) => {
                      handleDatePickerChange(
                        this.state.startDateParty1,
                        date,
                        dateString,
                        currentForm
                      );
                      setFormData({
                        [this.state.startDateParty1]: dateString,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Payment Start Date - Party 2"
                  style={{ fontSize: 17 }}
                >
                  <DatePicker
                    size="large"
                    // style={{ width: "100%" }}
                    format={"MM/DD/YYYY"}
                    onChange={(date, dateString) => {
                      handleDatePickerChange(
                        this.state.startDateParty2,
                        date,
                        dateString,
                        currentForm
                      );
                      setFormData({
                        [this.state.startDateParty2]: dateString,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: "4%" }}>
              <Col span={12}>
                <Form.Item
                  label="Health Insurance Policy Maintained By ?"
                  style={{ fontSize: 17 }}
                >
                  <ToggleCustom
                    values={["Party 1", "Party 2", "Neither"]}
                    handleToggleCustomChange={handleToggleCustomChange}
                    currentForm={currentForm}
                    name="healthInsuranceMaintainedBy"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: "4%" }}>
              <Col span={12}>
                <Form.Item
                  label="Health Insurance Paid By ?"
                  style={{ fontSize: 17 }}
                >
                  <ToggleCustom
                    values={["Party 1", "Party 2"]}
                    handleToggleCustomChange={handleToggleCustomChange}
                    currentForm={currentForm}
                    name="healthInsurancePaidBy"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: "4%" }}>
              <Col span={12}>
                <Form.Item
                  label="Child Care Cost Paid By ?"
                  style={{ fontSize: 17 }}
                >
                  <ToggleCustom
                    values={["Party 1", "Party 2"]}
                    handleToggleCustomChange={handleToggleCustomChange}
                    currentForm={currentForm}
                    name="childCareCostPaidBy"
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ marginTop: "5%" }}>
            <Add title="Dependency Tax Exemptions (Who Claim Each Child)" />
            <Form.Item
              label={`Child (${this.state.child})`}
              style={{ fontSize: 17 }}
            >
              <ToggleCustom values={["Party 1", "Party 2"]} />
            </Form.Item>
            <Form.Item
              label="Household Tax Status Head"
              style={{ fontSize: 17 }}
            >
              <ToggleCustom values={["Party 1", "Party 2"]} />
            </Form.Item>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    // const { divorceObject, handleInputChange } = this.props;

    return (
      <React.Fragment>
        <Header image={property} title={"Child Support Details"} />

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

export default ChildSupportDetailsForm;
