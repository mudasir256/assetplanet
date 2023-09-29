import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, InputNumber, DatePicker, Icon } from "antd";
import moment from "moment";

import Currency from "../../../../components/form/Currency";

const dateFormat = "MM/DD/YYYY";

const formID = "SellingAssetCostsSubForm";
class SellingAssetCostsSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Selling Assets Costs",
      fields: [
        {
          id: "saleDate",
          title: "Date of Sale",
          value: data["saleDate"],
        },
        {
          id: "totalLiabilities",
          title: "Total Liabitlities",
          value: data["totalLiabilities"],
          type: "currency",
        },
        {
          id: "totalNetSoldValue",
          title: "Total Net Sold Value",
          value: data["totalNetSoldValue"],
          type: "currency",
        },
        {
          id: "commissionSale",
          title: "Commission on Sale",
          value: data["commissionSale"],
          type: "percent",
        },
        {
          id: "rateReturnValue",
          title: "Value Based on Rate of Return",
          value: data["rateReturnValue"],
          type: "currency",
        },
        {
          id: "otherTransactionCosts",
          title: "Other Transaction Costs",
          value: data["otherTransactionCosts"],
          type: "currency",
        },
        {
          id: "actualValue",
          title: "Actual Value at Sale Date",
          value: data["actualValue"],
          type: "currency",
        },
        {
          id: "taxes",
          title: "Taxes",
          value: data["taxes"],
          type: "currency",
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
        saleDate: "",
        totalLiabilities: "",
        totalNetSoldValue: "",
        commissionSale: "",
        rateReturnValue: "",
        otherTransactionCosts: "",
        actualValue: "",
        taxes: "",
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
        if (newFormData.fields[findex]["id"] == "saleDate") {
          formData["saleDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "totalLiabilities") {
          formData["totalLiabilities"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "totalNetSoldValue") {
          formData["totalNetSoldValue"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "commissionSale") {
          formData["commissionSale"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "rateReturnValue") {
          formData["rateReturnValue"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "otherTransactionCosts") {
          formData["otherTransactionCosts"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "actualValue") {
          formData["actualValue"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "taxes") {
          formData["taxes"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (
        formData["saleDate"] != "" &&
        formData["totalLiabilities"] != "" &&
        formData["totalNetSoldValue"] != "" &&
        formData["commissionSale"] != "" &&
        formData["rateReturnValue"] != "" &&
        formData["otherTransactionCosts"] != "" &&
        formData["actualValue"] != "" &&
        formData["taxes"] != ""
      ) {
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

    if (
      formData["saleDate"] != "" &&
      formData["totalLiabilities"] != "" &&
      formData["totalNetSoldValue"] != "" &&
      formData["commissionSale"] != "" &&
      formData["rateReturnValue"] != "" &&
      formData["otherTransactionCosts"] != "" &&
      formData["actualValue"] != "" &&
      formData["taxes"] != ""
    ) {
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

    let formData = SellingAssetCostsSubForm.FnCreateFormData({
      saleDate: this.state.formData["saleDate"],
      totalLiabilities: this.state.formData["totalLiabilities"],
      totalNetSoldValue: this.state.formData["totalNetSoldValue"],
      commissionSale: this.state.formData["commissionSale"],
      rateReturnValue: this.state.formData["rateReturnValue"],
      otherTransactionCosts: this.state.formData["otherTransactionCosts"],
      actualValue: this.state.formData["actualValue"],
      taxes: this.state.formData["taxes"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    if (!bEnd) {
      // this.props.cbGoSubForm("AssetPerformanceSubForm");
      this.props.cbGoNext(formID);
    }
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("StepQuestionContributionDistributionSubForm");
    this.props.cbGoPrev(formID);
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Selling Asset Costs
              </h2>
            </Col>
          </Row>
          <Row type="flex" justify="center" className="mb-4">
            <Col span={12}>
              Asset Planet has created this section so the user can detail what
              the sale of an asset that does not have the ability for partial
              sale looks like.
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Date of Sale">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange("saleDate", date, dateString)
                  }
                  value={
                    this.state.formData.saleDate == ""
                      ? null
                      : moment(this.state.formData.saleDate, dateFormat)
                  }
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Total Liabitlities">
                <Currency
                  value={this.state.formData.totalLiabilities}
                  name="totalLiabilities"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Total Net Sold Value">
                <Currency
                  value={this.state.formData.totalNetSoldValue}
                  name="totalNetSoldValue"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Commission on Sale">
                <InputNumber
                  value={this.state.formData.commissionSale}
                  size={"large"}
                  style={{ width: "100%" }}
                  name="commissionSale"
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) =>
                    this.handleFormInputChange("commissionSale", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Value Based on Rate of Return">
                <Currency
                  value={this.state.formData.rateReturnValue}
                  name="rateReturnValue"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Other Transaction Costs">
                <Currency
                  value={this.state.formData.otherTransactionCosts}
                  name="otherTransactionCosts"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Actual Value at Sale Date">
                <Currency
                  value={this.state.formData.actualValue}
                  name="actualValue"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Taxes">
                <Currency
                  value={this.state.formData.taxes}
                  name="taxes"
                  onChange={(event) => this.handleInputChange(event)}
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

export default connect()(SellingAssetCostsSubForm);
