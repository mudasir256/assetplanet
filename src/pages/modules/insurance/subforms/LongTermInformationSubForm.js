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

import moment from "moment";
import Currency from "../../../../components/form/Currency";

const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

const formID = "LongTermInformationSubForm";
class LongTermInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Long Term Care / Long Term Disability Information",
      fields: [
        {
          id: "dailyBenefit",
          title: "Daily Benefit",
          value: data["dailyBenefit"],
        },
        {
          id: "monthlyBenefit",
          title: "Monthly Benefit",
          value: data["monthlyBenefit"],
        },
        {
          id: "lifetimeBenefit",
          title: "Lifetime Benefit",
          value: data["lifetimeBenefit"],
        },
        {
          id: "inflationRider",
          title: "Inflation Rider",
          value: data["inflationRider"],
        },
        {
          id: "eliminationPeriod",
          title: "Elimination Period",
          value: data["eliminationPeriod"],
        },
        {
          id: "qualification",
          title: "Qualification",
          value: data["qualification"],
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
        dailyBenefit: "",
        monthlyBenefit: "",
        lifetimeBenefit: "",
        inflationRider: "",
        eliminationPeriod: "",
        qualification: "",
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
        if (newFormData.fields[findex]["id"] == "dailyBenefit") {
          formData["dailyBenefit"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "monthlyBenefit") {
          formData["monthlyBenefit"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "lifetimeBenefit") {
          formData["lifetimeBenefit"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "inflationRider") {
          formData["inflationRider"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "eliminationPeriod") {
          formData["eliminationPeriod"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "qualification") {
          formData["qualification"] = newFormData.fields[findex]["value"];
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

    let formData = LongTermInformationSubForm.FnCreateFormData({
      dailyBenefit: this.state.formData["dailyBenefit"],
      monthlyBenefit: this.state.formData["monthlyBenefit"],
      lifetimeBenefit: this.state.formData["lifetimeBenefit"],
      inflationRider: this.state.formData["inflationRider"],
      eliminationPeriod: this.state.formData["eliminationPeriod"],
      qualification: this.state.formData["qualification"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    // this.props.cbGoSubForm("FinancialInformationSubForm");
    this.props.cbGoNext(formID);
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("ProductInformationSubForm");
    this.props.cbGoPrev(formID);
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Long Term Care / Long Term Disability Information
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Daily Benefit">
                <Currency
                  value={this.state.formData.dailyBenefit}
                  name="dailyBenefit"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Monthly Benefit">
                <Currency
                  value={this.state.formData.monthlyBenefit}
                  name="monthlyBenefit"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Lifetime Benefit">
                <Currency
                  value={this.state.formData.lifetimeBenefit}
                  name="lifetimeBenefit"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Inflation Rider">
                <Input
                  addonAfter="%"
                  value={this.state.formData.inflationRider}
                  size={"large"}
                  name="inflationRider"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Elimination Period">
                <Radio.Group
                  size={"large"}
                  name="eliminationPeriod"
                  onChange={this.handleInputChange}
                >
                  <Radio.Button value="30 Days">30 Days</Radio.Button>
                  <Radio.Button value="60 Days">60 Days</Radio.Button>
                  <Radio.Button value="90 Days">90 Days</Radio.Button>
                  <Radio.Button value="120 Days">120 Days</Radio.Button>
                  <Radio.Button value="Other">Other</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Qualification">
                <Radio.Group
                  name="qualification"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.qualification}
                >
                  <Radio.Button value="Qualified">Qualified</Radio.Button>
                  <Radio.Button value="Non-Qualified">
                    Non-Qualified
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
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

export default connect()(LongTermInformationSubForm);
