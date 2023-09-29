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
  Checkbox,
} from "antd";

import moment from "moment";
import Currency from "../../../../components/form/Currency";

const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

const formID = "IncomeInformationSubForm";
class IncomeInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Income Information",
      fields: [
        {
          id: "frequencyCurrentIncome",
          title: "Frequency of Current Income",
          value: data["frequencyCurrentIncome"],
        },
        {
          id: "currentMonthlyIncome",
          title: "Current Monthly Income",
          value: data["currentMonthlyIncome"],
        },
        {
          id: "currentAnnualIncome",
          title: "Current Annual Income",
          value: data["currentAnnualIncome"],
        },
        {
          id: "lumpsumPaymentDate",
          title: "Lump-sum Payment Date",
          value: data["lumpsumPaymentDate"],
        },
        {
          id: "futureLumpsumPayment",
          title: "Future Lump-sum Payment",
          value: data["futureLumpsumPayment"],
        },
        {
          id: "futureAnnualIncome",
          title: "Future Annual Income",
          value: data["futureAnnualIncome"],
        },
        {
          id: "futureIncomeDate",
          title: "Future Income Date",
          value: data["futureIncomeDate"],
        },
        {
          id: "incomeStartsRetirement",
          title: "Income Starts at Retirement",
          value: data["incomeStartsRetirement"],
        },
        {
          id: "dateFutureIncomeEnds",
          title: "Date Future Income Ends",
          value: data["dateFutureIncomeEnds"],
        },
        {
          id: "incomeEndsDeath",
          title: "Income Ends at Death",
          value: data["incomeEndsDeath"],
        },
        {
          id: "taxable",
          title: "Taxable",
          value: data["taxable"],
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
        frequencyCurrentIncome: "",
        currentMonthlyIncome: "",
        currentAnnualIncome: "",
        lumpsumPaymentDate: "",
        futureLumpsumPayment: "",
        futureAnnualIncome: "",
        dateFutureIncomeEnds: "",
        futureIncomeDate: "",
        incomeEndsDeath: false,
        incomeStartsRetirement: false,
        taxable: "",
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
        if (newFormData.fields[findex]["id"] == "frequencyCurrentIncome") {
          formData["frequencyCurrentIncome"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "currentMonthlyIncome") {
          formData["currentMonthlyIncome"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "currentAnnualIncome") {
          formData["currentAnnualIncome"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "lumpsumPaymentDate") {
          formData["lumpsumPaymentDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "futureLumpsumPayment") {
          formData["futureLumpsumPayment"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "futureAnnualIncome") {
          formData["futureAnnualIncome"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "dateFutureIncomeEnds") {
          formData["dateFutureIncomeEnds"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "futureIncomeDate") {
          formData["futureIncomeDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "incomeEndsDeath") {
          formData["incomeEndsDeath"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "incomeStartsRetirement") {
          formData["incomeStartsRetirement"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "taxable") {
          formData["taxable"] = newFormData.fields[findex]["value"];
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

    let formData = IncomeInformationSubForm.FnCreateFormData({
      frequencyCurrentIncome: this.state.formData["frequencyCurrentIncome"],
      currentMonthlyIncome: this.state.formData["currentMonthlyIncome"],
      currentAnnualIncome: this.state.formData["currentAnnualIncome"],
      lumpsumPaymentDate: this.state.formData["lumpsumPaymentDate"],
      futureLumpsumPayment: this.state.formData["futureLumpsumPayment"],
      futureAnnualIncome: this.state.formData["futureAnnualIncome"],
      dateFutureIncomeEnds: this.state.formData["dateFutureIncomeEnds"],
      futureIncomeDate: this.state.formData["futureIncomeDate"],
      incomeEndsDeath: this.state.formData["incomeEndsDeath"],
      incomeStartsRetirement: this.state.formData["incomeStartsRetirement"],
      taxable: this.state.formData["taxable"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    // this.props.cbGoSubForm("EndSubForm");
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
          <Row gutter={16} type="flex" justify="center">
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Income Information
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Frequency of Current Income">
                <Radio.Group
                  name="frequencyCurrentIncome"
                  size={"large"}
                  onChange={this.handleInputChange}
                  value={this.state.formData.frequencyCurrentIncome}
                >
                  <Radio.Button value="Monthly">Monthly</Radio.Button>
                  <Radio.Button value="Annually">Annually</Radio.Button>
                  <Radio.Button value="Not Receiving Income">
                    Not Receiving Income
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Current Monthly Income">
                <Currency
                  disabled={this.state.formData.frequencyCurrentIncome === 'Not Receiving Income' ? true : false}
                  value={this.state.formData.currentMonthlyIncome}
                  name="currentMonthlyIncome"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Current Annual Income">
                <Currency
                  disabled={this.state.formData.frequencyCurrentIncome === 'Not Receiving Income' ? true : false}
                  value={this.state.formData.currentAnnualIncome}
                  name="currentAnnualIncome"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Lump-sum Payment Date">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "lumpsumPaymentDate",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.lumpsumPaymentDate == ""
                      ? null
                      : moment(
                          this.state.formData.lumpsumPaymentDate,
                          dateFormat
                        )
                  }
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Future Lump-sum Payment">
                <Currency
                  value={this.state.formData.futureLumpsumPayment}
                  name="futureLumpsumPayment"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Future Annual Income">
                <Currency
                  value={this.state.formData.futureAnnualIncome}
                  name="futureAnnualIncome"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Future Income Date">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "futureIncomeDate",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.futureIncomeDate == ""
                      ? null
                      : moment(this.state.formData.futureIncomeDate, dateFormat)
                  }
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="">
                <Checkbox
                  checked={this.state.formData.incomeStartsRetirement}
                  size={"large"}
                  onChange={(event) =>
                    this.handleFormInputChange(
                      "incomeStartsRetirement",
                      event.target.checked
                    )
                  }
                >
                  Income Starts at Retirement{" "}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Date Future Income Ends">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "dateFutureIncomeEnds",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.dateFutureIncomeEnds == ""
                      ? null
                      : moment(
                          this.state.formData.dateFutureIncomeEnds,
                          dateFormat
                        )
                  }
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="">
                <Checkbox
                  checked={this.state.formData.incomeEndsDeath}
                  size={"large"}
                  onChange={(event) =>
                    this.handleFormInputChange(
                      "incomeEndsDeath",
                      event.target.checked
                    )
                  }
                >
                  Income Ends at Death{" "}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Taxable?">
                <Radio.Group
                  name="taxable"
                  size={"large"}
                  onChange={this.handleInputChange}
                  value={this.state.formData.taxable}
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
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

export default connect()(IncomeInformationSubForm);
