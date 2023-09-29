import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Icon } from "antd";
import Header from "../components/header";
import Footer from "../components/footer";
import property from "../../../assets/images/latest/Principal-House.png";
import ToggleCustom from "../../ToggleCustom";

const formName = "taxReturn";

class PropertyDetailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
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
        <Col span={6}></Col>

        <Col span={18}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="When will property be listed for scale ?"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Enter Details"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="scale"
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
              <Form.Item label="List Price" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Price Here"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="listPrice"
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
              <Form.Item label="Listing Agent" style={{ fontSize: 17 }}>
                <Input
                  placeholder="Enter Listing Agent Name Here"
                  type={"number"}
                  // suffix={suffix}
                  size={"large"}
                  name="listingAgent"
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
                label="Will cash offer be accepted ?"
                style={{ fontSize: 17 }}
              >
                <ToggleCustom
                 values={["Yes", "No"]} 
                 handleToggleCustomChange={handleToggleCustomChange}
                 currentForm={currentForm}
                 name="offerAccepted"
                 />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Who Occipies the property currently ?"
                style={{ fontSize: 17, marginBottom: "8%" }}
              >
                <ToggleCustom
                 values={["Party 1", "Party 2", "Together"]} 
                 handleToggleCustomChange={handleToggleCustomChange}
                 currentForm={currentForm}
                 name="propertyOccupied"
                 />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Property Overhead paid by ?"
                style={{ fontSize: 17 }}
              >
                <ToggleCustom 
                values={["Party 1", "Party 2", "Together"]}
                handleToggleCustomChange={handleToggleCustomChange}
                currentForm={currentForm}
                name="propertyOverheadToggle"
                 />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Property Overhead Paid by ?"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 1"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="propertyOverheadParty1"
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
                label="Property Overhead Paid by ?"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 2"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="propertyOverheadParty2"
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
                label="Distribution of Proceeds of Sale"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 1"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="distProceedsSaleParty1"
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
                label="Distribution of Proceeds of Sale"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 2"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="distProceedsSaleParty2"
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
                label="Capital Gain Tax Responsibility"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 1"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="gainTaxParty1"
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
                label="Capital Gain Tax Responsibility"
                style={{ fontSize: 17 }}
              >
                <Input
                  placeholder="Party 2"
                  type={"number"}
                  suffix={suffix}
                  size={"large"}
                  name="gainTaxParty2"
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
        </Col>
      </Row>
    );
  };

  render() {
    // const { divorceObject, handleInputChange } = this.props;

    return (
      <React.Fragment>
        <Header image={property} title={"Property Details"} />

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

export default PropertyDetailForm;
