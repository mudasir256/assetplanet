import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Form,
  Icon,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Radio,
} from "antd";
import { INSURANCE_TYPES_PROPERTY_CASUALTY } from "constants/types";

import moment from "moment";
import Currency from "../../../../components/form/Currency";

const dateFormat = "MM/DD/YYYY";

const { Option } = Select;
const stat = ["STFrank Jones"];

const pp = ["PPFrank Jones", "PPTracy Jones", "PPJoint"];

const ud = ["UDAIG", "UDAllstate", "UDAmerical Family", "UDAmerican Financial"];
const mc = ["MCAIG", "MCAllstate", "MCAmerical Family", "MCAmerican Financial"];
const formID = "FinancialInformationSubForm";
class FinancialInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Financial Information",
      fields: [
        {
          id: "annualPremium",
          title: "Annual Premium",
          value: data["annualPremium"],
        },
        {
          id: "monthlyPremium",
          title: "Monthly Premium",
          value: data["monthlyPremium"],
        },
        {
          id: "deductible",
          title: "Deductible",
          value: data["deductible"],
        },
        {
          id: "cashValue",
          title: "Cash Value (if applicable)",
          value: data["cashValue"],
        },
        {
          id: "cashValueDate",
          title: "Cash Value Date (if applicable)",
          value: data["cashValueDate"],
        },
        {
          id: "faceValue",
          title: "Face Value",
          value: data["faceValue"],
        },
        {
          id: "ror",
          title: "Rate Of Return",
          value: data["ror"],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      enableNext: false,
      formData: {
        showPremiumMonthly: "",
        showPremiumAnnual: "",
        annualPremium: "",
        monthlyPremium: "",
        deductible: "",
        cashValue: "",
        cashValueDate: "",
        faceValue: "",
        ror: "",
        stat: "",
        pp: "",
        ud: "",
        mc: "",
      },
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.goPreviousForm = this.goPreviousForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty("fields")) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]["id"] == "annualPremium") {
          formData["annualPremium"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "monthlyPremium") {
          formData["monthlyPremium"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "deductible") {
          formData["deductible"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "cashValue") {
          formData["cashValue"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "cashValueDate") {
          formData["cashValueDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "faceValue") {
          formData["faceValue"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "ror") {
          formData["ror"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (formData["static"] != "") {
        enableNext = true;
      }

      enableNext = true;

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

  handleFormInputChange(name, value) {
    let formData = this.state.formData;
    formData[name] = value;

    let newState = {
      formData: formData,
    };

    if (formData["static"] != "") {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }

    newState["enableNext"] = true;

    this.setState(newState);
  }

  handleInputChange(event) {
    if (event.target.name == "premium") {
      if (event.target.value == "Monthly") {
        this.setState({
          showPremiumMonthly: true,
          showPremiumAnnual: false,
        });
      } else if (event.target.value == "Annual") {
        this.setState({
          showPremiumMonthly: false,
          showPremiumAnnual: true,
        });
      }
    }
    /**<Radio.Button value="Static">Static</Radio.Button>
                    <Radio.Button value="Professional Prediction">
                      Professional Prediction
                    </Radio.Button>
                    <Radio.Button value="User Defined">
                      User Defined
                    </Radio.Button>
                    <Radio.Button value="Monte Carlo">Monte Carlo</Radio.Button> */
    if (event.target.name == "ror") {
      if (event.target.value == "Static") {
        this.setState({
          stat: true,
          pp: false,
          ud: false,
          mc: false,
        });
      } else if (event.target.value == "Professional Prediction") {
        this.setState({
          stat: false,
          pp: true,
          ud: false,
          mc: false,
        });
      } else if (event.target.value == "User Defined") {
        this.setState({
          stat: false,
          pp: false,
          ud: true,
          mc: false,
        });
      } else if (event.target.value == "Monte Carlo") {
        this.setState({
          stat: false,
          pp: false,
          ud: false,
          mc: true,
        });
      }
    }
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(name, value);
  }

  handleSelectChange(name, value) {
    this.handleFormInputChange(name, value);
  }

  handleDatePickerChange(name, date, dateString) {
    this.handleFormInputChange(name, dateString);
  }

  goNextForm(bEnd = false) {
    if (!this.state.enableNext) {
      return;
    }

    let formData = FinancialInformationSubForm.FnCreateFormData({
      annualPremium: this.state.formData["annualPremium"],
      monthlyPremium: this.state.formData["monthlyPremium"],
      deductible: this.state.formData["deductible"],
      cashValue: this.state.formData["cashValue"],
      cashValueDate: this.state.formData["cashValueDate"],
      faceValue: this.state.formData["faceValue"],
      ror: this.state.formData["ror"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    if (!bEnd) {
      this.props.cbGoNext(formID);
    }
  }

  goPreviousForm() {
    this.props.cbGoPrev(formID);
  }
  getMonthlyPremium() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Monthly Premium">
            <Currency
              value={this.state.formData.monthlyPremium}
              name="monthlyPremium"
              onChange={(event) => this.handleInputChange(event)}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getAnnualPremium() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Annual Premium">
            <Currency
              value={this.state.formData.annualPremium}
              name="annualPremium"
              onChange={(event) => this.handleInputChange(event)}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getStatic() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Static">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.stat}
              size={"large"}
              onChange={(value) => this.handleSelectChange("stat", value)}
            >
              {stat.map((stat, index) => (
                <Option key={index} value={stat}>
                  {stat}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getPP() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Professional Prediction">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.pp}
              size={"large"}
              onChange={(value) => this.handleSelectChange("pp", value)}
            >
              {pp.map((pp, index) => (
                <Option key={index} value={pp}>
                  {pp}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getUD() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="User Defined">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.ud}
              size={"large"}
              onChange={(value) => this.handleSelectChange("ud", value)}
            >
              {ud.map((ud, index) => (
                <Option key={index} value={ud}>
                  {ud}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  getMC() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Monte Carlo">
            <Select
              showSearch
              placeholder="-Select-"
              value={this.state.formData.mc}
              size={"large"}
              onChange={(value) => this.handleSelectChange("mc", value)}
            >
              {mc.map((mc, index) => (
                <Option key={index} value={mc}>
                  {mc}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    );
  }
  render() {
    var insurceTypeField = this.props.cbGetSubFormField(
      "InsuranceTypeSubForm",
      "insuranceType"
    );
    let bPropertyCasualty = false;
    if (insurceTypeField != null) {
      for (
        var index = 0;
        index < INSURANCE_TYPES_PROPERTY_CASUALTY.length;
        index++
      ) {
        if (
          INSURANCE_TYPES_PROPERTY_CASUALTY[index]["name"] ==
          insurceTypeField.value
        ) {
          bPropertyCasualty = true;
          break;
        }
      }
    }

    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Financial Information
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Select Annual/Monthly Premium">
                <Radio.Group
                  name="premium"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.premium}
                >
                  <Radio.Button value="Monthly">Monthly</Radio.Button>
                  <Radio.Button value="Annual">Annual</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {this.state.showPremiumMonthly ? this.getMonthlyPremium() : null}
          {this.state.showPremiumAnnual ? this.getAnnualPremium() : null}

          {/* <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Annual Premium">
                <Currency
                  value={this.state.formData.annualPremium}
                  name="annualPremium"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Monthly Premium">
                <Currency
                  value={this.state.formData.monthlyPremium}
                  name="monthlyPremium"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Deductible">
                <Currency
                  value={this.state.formData.deductible}
                  name="deductible"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Cash Value (if applicable)">
                <Currency
                  value={this.state.formData.cashValue}
                  name="cashValue"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          {!bPropertyCasualty && (
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Cash Value Date (if applicable)">
                  <DatePicker
                    style={{ width: "100%" }}
                    format={dateFormat}
                    onChange={(date, dateString) =>
                      this.handleDatePickerChange(
                        "cashValueDate",
                        date,
                        dateString
                      )
                    }
                    size={"large"}
                    value={
                      this.state.formData.cashValueDate == ""
                        ? null
                        : moment(this.state.formData.cashValueDate, dateFormat)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {!bPropertyCasualty && (
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Face Value">
                  <Currency
                    value={this.state.formData.faceValue}
                    name="faceValue"
                    onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          {!bPropertyCasualty && (
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Rate Of Return(if applicable)">
                  <Radio.Group
                    name="ror"
                    size={"large"}
                    onChange={(event) => this.handleInputChange(event)}
                    value={this.state.formData.ror}
                  >
                    <Radio.Button value="Static">Static</Radio.Button>
                    <Radio.Button value="Professional Prediction">
                      Professional Prediction
                    </Radio.Button>
                    <Radio.Button value="User Defined">
                      User Defined
                    </Radio.Button>
                    <Radio.Button value="Monte Carlo">Monte Carlo</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          )}
          {!bPropertyCasualty && this.state.stat ? this.getStatic() : null}
          {!bPropertyCasualty && this.state.pp ? this.getPP() : null}
          {!bPropertyCasualty && this.state.ud ? this.getUD() : null}
          {!bPropertyCasualty && this.state.mc ? this.getMC() : null}
        </div>
        <div className="row justify-content-between">
          <div className="col-8">
            <Button
              type="primary"
              size={"large"}
              onClick={() => this.goPreviousForm()}
            >
              <Icon type="left" />
              Previous
            </Button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            {this.props.dataID != null && (
              <Button
                type="primary"
                size={"large"}
                style={{ marginRight: "10px" }}
                onClick={() => this.goNextForm(true)}
              >
                Update
              </Button>
            )}
            <Button
              type="primary"
              disabled={!this.state.enableNext}
              size={"large"}
              onClick={() => this.goNextForm()}
            >
              Next
              <Icon type="right" />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(FinancialInformationSubForm);
