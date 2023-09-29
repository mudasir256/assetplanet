import React, { Component } from "react";
import { connect } from "react-redux";
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";

import {
  Button,
  Row,
  Col,
  Input,
  Select,
  Form,
  Collapse,
  DatePicker,
  Icon,
} from "antd";
import Currency from "../../../../components/form/Currency";
import Percent from "../../../../components/form/PercentV2";
import moment from "moment";
import { disabledEndDate } from "helpers/Utils";

const dateFormat = "MM/DD/YYYY";
const { Option } = Select;
const { Panel } = Collapse;
const associatedAssetes = [];
const formID = "HelocInformationSubForm";
class HelocInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "HELOC Information",
      fields: [
        {
          id: "creditLimit",
          title: "Credit Limit",
          value: data["creditLimit"],
          type: "currency",
        },
        {
          id: "totalCreditAvailable",
          title: "Total Credit Available",
          value: data["totalCreditAvailable"],
          type: "currency",
        },
        {
          id: "creditBalance",
          title: "Credit Balance",
          value: data["creditBalance"],
          type: "currency",
        },
        {
          id: "interestRate",
          title: "Interest Rate (or APR%)",
          value: data["interestRate"],
          type: "percent",
        },
        {
          id: "monthlyPayment",
          title: "Monthly Payment",
          value: data["monthlyPayment"],
          type: "currency",
        },
        {
          id: "drawPeriodEndDate",
          title: "Draw Period End Date",
          value: data["drawPeriodEndDate"],
        },
        {
          id: "drawPeriodStartDate",
          title: "Draw Period Start Date",
          value: data["drawPeriodStartDate"],
        },
        {
          id: "startDateRepayment",
          title: "Start Date of Repayment",
          value: data["startDateRepayment"],
        },
        {
          id: "endDateRepayment",
          title: "End Date of Repayment",
          value: data["endDateRepayment"],
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
        creditLimit: "",
        totalCreditAvailable: "",
        creditBalance: "",
        interestRate: "",
        monthlyPayment: "",
        drawPeriodEndDate: "",
        drawPeriodStartDate: "",
        startDateRepayment: "",
        endDateRepayment: "",
        Step3Data: {},

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
        if (newFormData.fields[findex]["id"] == "creditLimit") {
          formData["creditLimit"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "totalCreditAvailable") {
          formData["totalCreditAvailable"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "creditBalance") {
          formData["creditBalance"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "interestRate") {
          formData["interestRate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "monthlyPayment") {
          formData["monthlyPayment"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "drawPeriodEndDate") {
          formData["drawPeriodEndDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "drawPeriodStartDate") {
          formData["drawPeriodStartDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "startDateRepayment") {
          formData["startDateRepayment"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "endDateRepayment") {
          formData["endDateRepayment"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (formData["maturityDate"] != "") {
        enableNext = true;
      }

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

    if (formData["maturityDate"] != "") {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }

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

    let formData = HelocInformationSubForm.FnCreateFormData({
      creditLimit: this.state.formData["creditLimit"],
      totalCreditAvailable: this.state.formData["totalCreditAvailable"],
      creditBalance: this.state.formData["creditBalance"],
      interestRate: this.state.formData["interestRate"],
      monthlyPayment: this.state.formData["monthlyPayment"],
      drawPeriodEndDate: this.state.formData["drawPeriodEndDate"],
      drawPeriodStartDate: this.state.formData["drawPeriodStartDate"],
      startDateRepayment: this.state.formData["startDateRepayment"],
      endDateRepayment: this.state.formData["endDateRepayment"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);
    console.log("step3datafill update", this.state.Step3Data);
    this.props.postCompletedSteps({
      ...this.props.CompletedSteps,
      ...this.state.Step3Data
    });
    if (!bEnd) {
      // this.props.cbGoSubForm("LoanPaybackSubForm");
      this.props.cbGoNext(formID);
    }
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("MainSubForm");
    this.props.cbGoPrev(formID);
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                HELOC Information
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Credit Balance">
                <Currency
                  value={this.state.formData.creditBalance}
                  name="creditBalance"
                  onChange={(event) => {
                    this.handleInputChange(event);
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Credit Balance"]: event.target.value
                      }
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Monthly Payment">
                <Currency
                  value={this.state.formData.monthlyPayment}
                  name="monthlyPayment"
                  onChange={(event) => {
                    this.handleInputChange(event);
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Monthly Payment"]: event.target.value
                      }
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Credit Limit">
                <Currency
                  value={this.state.formData.creditLimit}
                  name="creditLimit"
                  onChange={(event) => {
                    this.handleInputChange(event);
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Credit Limit"]: event.target.value
                      }
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Interest Rate">
                <Percent
                  value={this.state.formData.interestRate}
                  name="interestRate"
                  onChange={(value) => {
                    this.handleFormInputChange("interestRate", value);
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Interest Rate"]: value
                      }
                    });
                  }
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Bank">
                <Input value={this.state.formData.Bank} size={"large"} name="Bank" onChange={(event) => {
                  this.handleInputChange(event);
                  this.setState({
                    Step3Data: {
                      ...this.state.Step3Data,
                      ["Bank"]: event.target.value
                    }
                  });
                }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Draw Period Start Date">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    this.handleDatePickerChange(
                      "drawPeriodStartDate",
                      date,
                      dateString
                    );
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Draw Period Start Date"]: dateString
                      }
                    });
                  }
                  }
                  size={"large"}
                  value={
                    this.state.formData.drawPeriodStartDate == null ||
                      this.state.formData.drawPeriodStartDate == ""
                      ? null
                      : moment(
                        this.state.formData.drawPeriodStartDate,
                        dateFormat
                      )
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Draw Period End Date">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  disabledDate={(value) =>
                    disabledEndDate(
                      value,
                      this.state.formData.drawPeriodStartDate
                    )

                  }
                  onChange={(date, dateString) => {
                    this.handleDatePickerChange(
                      "drawPeriodEndDate",
                      date,
                      dateString
                    );
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Draw Period End Date"]: dateString
                      }
                    });
                  }
                  }
                  size={"large"}
                  value={
                    this.state.formData.drawPeriodEndDate == null ||
                      this.state.formData.drawPeriodEndDate == ""
                      ? null
                      : moment(
                        this.state.formData.drawPeriodEndDate,
                        dateFormat
                      )
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Start Date of Repayment">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) => {
                    this.handleDatePickerChange(
                      "startDateRepayment",
                      date,
                      dateString
                    );
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Start Date of Repayment"]: dateString
                      }
                    });
                  }
                  }
                  size={"large"}
                  value={
                    this.state.formData.startDateRepayment == null ||
                      this.state.formData.startDateRepayment == ""
                      ? null
                      : moment(
                        this.state.formData.startDateRepayment,
                        dateFormat
                      )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="End Date of Repayment">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  disabledDate={(value) =>
                    disabledEndDate(
                      value,
                      this.state.formData.startDateRepayment
                    )
                  }
                  onChange={(date, dateString) => {
                    this.handleDatePickerChange(
                      "endDateRepayment",
                      date,
                      dateString
                    );
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["End Date of Repayment"]: dateString
                      }
                    });
                  }
                  }
                  size={"large"}
                  value={
                    this.state.formData.endDateRepayment == null ||
                      this.state.formData.endDateRepayment == ""
                      ? null
                      : moment(this.state.formData.endDateRepayment, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Total Credit Available">
                <Currency
                  value={this.state.formData.totalCreditAvailable}
                  name="totalCreditAvailable"
                  onChange={(event) => {
                    this.handleInputChange(event);
                    this.setState({
                      Step3Data: {
                        ...this.state.Step3Data,
                        ["Total Credit Available"]: event.target.value
                      }
                    });
                  }}
                />
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
const mapStateToProps = (state) => ({
  stepsFields: state.rootReducer.loginUser.stepsFields,
  Step3: state.rootReducer.loginUser.Step3,
  CompletedSteps: state.rootReducer.loginUser.CompletedSteps,

});
const mapDispatchToProps = { postStepsFields, postCompletedSteps };
export default connect(mapStateToProps, mapDispatchToProps)(HelocInformationSubForm);
