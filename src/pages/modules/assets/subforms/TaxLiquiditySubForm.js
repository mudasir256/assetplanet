import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Button,
  Row,
  Col,
  Form,
  Radio,
  Input,
  DatePicker,
  InputNumber,
  Icon,
} from "antd";

import Currency from "../../../../components/form/Currency";
import moment from "moment";

const dateFormat = "MM/DD/YYYY";

const formID = "TaxLiquiditySubForm";

class TaxLiquiditySubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Tax and Liquidity",
      fields: [
        {
          id: "basisCost",
          title: "Cost Basis",
          value: data["basisCost"],
          type: "currency",
        },
        {
          id: "costBasisDate",
          title: "Cost Basis Date",
          value: data["costBasisDate"],
        },
        {
          id: "taxability",
          title: "Taxability",
          value: data["taxability"],
        },
        {
          id: "assetLiquid",
          title: "This Asset is Liquid",
          value: data["assetLiquid"],
        },
        {
          id: "partialSaleAbility",
          title: "Ability for Partial Sale",
          value: data["partialSaleAbility"],
        },
        {
          id: "distributionTaxability",
          title: "Taxability on Distribution",
          value: data["distributionTaxability"],
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
        basisCost: "",
        costBasisDate: "",
        taxability: "",
        assetLiquid: "",
        partialSaleAbility: "",
        distributionTaxability: "",
      },
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.goPreviousForm = this.goPreviousForm.bind(this);

    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.setConditionValue = this.setConditionValue.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty("fields")) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]["id"] == "basisCost") {
          formData["basisCost"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "costBasisDate") {
          formData["costBasisDate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "taxability") {
          formData["taxability"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "assetLiquid") {
          formData["assetLiquid"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "partialSaleAbility") {
          formData["partialSaleAbility"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "distributionTaxability") {
          formData["distributionTaxability"] =
            newFormData.fields[findex]["value"];
        }
      }

      formData = this.setConditionValue(formData);

      let enableNext = false;
      if (
        formData["basisCost"] != "" &&
        formData["costBasisDate"] != "" &&
        formData["taxability"] != "" &&
        formData["assetLiquid"] != "" &&
        formData["partialSaleAbility"] != "" &&
        formData["distributionTaxability"] != ""
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
      formData["basisCost"] != "" &&
      formData["costBasisDate"] != "" &&
      formData["taxability"] != "" &&
      formData["assetLiquid"] != "" &&
      formData["partialSaleAbility"] != "" &&
      formData["distributionTaxability"] != ""
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

    let formData = TaxLiquiditySubForm.FnCreateFormData({
      basisCost: this.state.formData["basisCost"],
      costBasisDate: this.state.formData["costBasisDate"],
      taxability: this.state.formData["taxability"],
      assetLiquid: this.state.formData["assetLiquid"],
      partialSaleAbility: this.state.formData["partialSaleAbility"],
      distributionTaxability: this.state.formData["distributionTaxability"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    if (!bEnd) {
      // this.props.cbGoSubForm("EndSubForm");
      this.props.cbGoNext(formID);
    }
  }

  goPreviousForm() {
    // this.props.cbGoSubForm("AssetPerformanceSubForm");
    this.props.cbGoPrev(formID);
  }

  setConditionValue(formData) {
    let accountType = "";
    accountType = this.props.cbGetSubFormField(
      "AssetInformationSubForm",
      "accountType"
    );
    if (accountType != null) {
      accountType = accountType.value;
    }

    let assetsAllocation = "";
    assetsAllocation = this.props.cbGetSubFormField(
      "AssetAllocationSubForm",
      "assetsAllocation"
    );
    if (assetsAllocation != null) {
      assetsAllocation = assetsAllocation.value;
    }

    // Auto Populate Taxability and Taxability Distruibution Based on Account Type -- Taxable, Capital Gains  /////////////
    if (accountType == "Trust" || "Individual" || "Joint" || "Custodial") {
      if (formData["taxability"] == "") {
        formData["taxability"] = "Taxable";
      }

      if (formData["distributionTaxability"] == "") {
        formData["distributionTaxability"] = "Capital Gains";
      }
    }

    // Auto Populate Taxability and Taxability Distruibution Based on Account Type -- Tax-Deferred, Tax Free  /////////////
    if (
      accountType == "401k Roth" ||
      accountType == "529" ||
      accountType == "Health Savings Account" ||
      accountType == "Roth"
    ) {
      if (formData["taxability"] == "") {
        formData["taxability"] = "Tax-Deferred";
      }

      if (formData["distributionTaxability"] == "") {
        formData["distributionTaxability"] = "Tax Free";
      }
    }

    // Auto Populate Taxability and Taxability Distruibution Based on Account Type -- Tax Deferred, Oridnary Income  /////////////
    if (
      accountType == "401k" ||
      accountType == "401K - Individual" ||
      accountType == "403B" ||
      accountType == "457" ||
      accountType == "Coverdell Education" ||
      accountType == "Defined Benefit" ||
      accountType == "Defined Contribution" ||
      accountType == "ESOP" ||
      accountType == "IRA Contributory" ||
      accountType == "IRA Inherited" ||
      accountType == "IRA Rollover" ||
      accountType == "Money Purchase" ||
      accountType == "Pension" ||
      accountType == "Profit Sharing Plan" ||
      accountType == "SEP IRA"
    ) {
      if (formData["taxability"] == "") {
        formData["taxability"] = "Tax-Deferred";
      }

      if (formData["distributionTaxability"] == "") {
        formData["distributionTaxability"] = "Oridnary Income";
      }
    }

    // Auto Populate Liquid Asset and Ability for Partial Sale Based on Asset Allocation -- No, No /////////////
    if (
      assetsAllocation == "Airplane" ||
      assetsAllocation == "Auto - non-collectible" ||
      assetsAllocation == "Boat" ||
      assetsAllocation == "Motorcycles" ||
      assetsAllocation == "Business Interest" ||
      assetsAllocation == "Club Membership" ||
      assetsAllocation == "Private Placement & VC" ||
      assetsAllocation == "Real Estate"
    ) {
      if (formData["assetLiquid"] == "") {
        formData["assetLiquid"] = "No";
      }

      if (formData["partialSaleAbility"] == "") {
        formData["partialSaleAbility"] = "No";
      }
    }

    // Auto Populate Liquid Asset and Ability for Partial Sale Based on Asset Allocation -- Yes, Yes /////////////
    if (
      assetsAllocation == "General Household" ||
      assetsAllocation == "Indexes, ETF's and Mutual Funds" ||
      assetsAllocation == "Bonds - Int Long Term" ||
      assetsAllocation == "Cash/CD's T-Bills" ||
      assetsAllocation == "Collectibles" ||
      assetsAllocation == "Livestock" ||
      assetsAllocation == "Stocks - Individual" ||
      assetsAllocation == "User Defined Portfolio Allocation"
    ) {
      if (formData["assetLiquid"] == "") {
        formData["assetLiquid"] = "Yes";
      }

      if (formData["partialSaleAbility"] == "") {
        formData["partialSaleAbility"] = "Yes";
      }
    }

    return formData;
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Tax and Liquidity
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Cost Basis">
                <Currency
                  value={this.state.formData.basisCost}
                  name="basisCost"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Cost Basis Date">
                <DatePicker
                  size={"large"}
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "costBasisDate",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.costBasisDate == ""
                      ? null
                      : moment(this.state.formData.costBasisDate, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Estimated Unrealised Gains">
                <Currency
                  value={
                    this.state.formData.unrealisedGains
                      ? this.state.formData.unrealisedGains
                      : null
                  }
                  name="unrealisedGains"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Taxability">
                <Radio.Group
                  name="taxability"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.taxability}
                >
                  <Radio.Button value="Taxable">Taxable</Radio.Button>
                  <Radio.Button value="Tax Deferred">Tax Deferred</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={16} type="flex" justify="center">
              <Form.Item label="This Asset is Liquid">
                <Radio.Group
                  name="assetLiquid"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.assetLiquid}
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            {/* <Col span={16}>
                            <Form.Item label="Ability for Partial Sale">
                                <Radio.Group name="partialSaleAbility" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.partialSaleAbility}>
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col> */}
            <Col span={16} type="flex" justify="center">
              <Form.Item label="Taxability on Distribution">
                <Radio.Group
                  name="distributionTaxability"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.distributionTaxability}
                >
                  <Radio.Button value="Capital Gains">
                    Capital Gains
                  </Radio.Button>
                  <Radio.Button value="Ordinary Income">
                    Ordinary Income
                  </Radio.Button>
                  <Radio.Button value="Qualifid Income">
                    Qualified Income
                  </Radio.Button>
                  <Radio.Button value="Tax Free">Tax Free</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Early Withdrawl Penalty">
                <Input
                  value={this.state.formData.early}
                  name="early"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Taxability Of Distribution">
                <Input
                  value={this.state.formData.distribution}
                  name="distribution"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Penalty Based on Age">
                <Input
                  value={this.state.formData.agePenalty}
                  name="agePenalty"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
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

export default connect()(TaxLiquiditySubForm);
