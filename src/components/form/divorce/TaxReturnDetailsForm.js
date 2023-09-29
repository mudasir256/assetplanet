import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Icon } from "antd";
import Header from "../components/header";
import tax from "../../../assets/images/tax.png";
import Footer from "../components/footer";

const formName = "taxReturn";

class TaxReturnDetailsForm extends Component {
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
        <Col span={12}>
          <Form.Item label="Percent to Party 1" style={{ fontSize: 17 }}>
            <Input
              placeholder="Enter Percentage Here"
              type={"number"}
              suffix={suffix}
              size={"large"}
              name="percent_to__party_1"
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
          <Form.Item label="Percent to Party 1" style={{ fontSize: 17 }}>
            <Input
              placeholder="Enter Percentage Here"
              type={"number"}
              suffix={suffix}
              size={"large"}
              name="percent_to__party_2"
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
    );
  };

  render() {
    // const { divorceObject, handleInputChange } = this.props;

    return (
      <React.Fragment>
        <Header image={tax} title={"Tax Return Details"} />
        <h2 className="text-center font-weight-bold" style={{marginBottom: '70px'}}>
          Tax refunds from last year will be paid to ?
        </h2>
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

export default TaxReturnDetailsForm;
