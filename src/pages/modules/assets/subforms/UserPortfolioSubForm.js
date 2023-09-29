import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Row, Col, InputNumber, Button, Icon } from "antd";
import Percent from "components/form/PercentV2";
const formID = "UserPortfolioSubForm";
let newVal = 0;
let val1 = 0;
let val2 = 0;
let val3 = 0;
let val4 = 0;
let val5 = 0;
class UserPortfolioSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "User Defined Portfolio",
      fields: [
        {
          id: "spPortfolio",
          title: "Enter Portfolio % of S&P 500",
          value: data["spPortfolio"],
          type: "percent",
        },
        {
          id: "realEstatePortfolio",
          title: "Enter Portfolio % of Real Estate",
          value: data["realEstatePortfolio"],
          type: "percent",
        },
        {
          id: "bondsPortfolio",
          title: "Enter Portfolio % of Bonds",
          value: data["bondsPortfolio"],
          type: "percent",
        },
        {
          id: "cashPortfolio",
          title: "Enter Portfolio % of Cash",
          value: data["cashPortfolio"],
          type: "percent",
        },
        {
          id: "goldPortfolio",
          title: "Enter Portfolio % of Gold",
          value: data["goldPortfolio"],
          type: "percent",
        },
        {
          id: "totalPercentage",
          title: "Total Percentage",
          value: data["totalPercentage"],
          type: "percent",
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);
    this.state = {
      enableNext: false,
      totalVal: "",
      formData: {
        spPortfolio: "",
        realEstatePortfolio: "",
        bondsPortfolio: "",
        cashPortfolio: "",
        goldPortfolio: "",
        totalPercentage: "",
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
        if (newFormData.fields[findex]["id"] == "spPortfolio") {
          formData["spPortfolio"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "realEstatePortfolio") {
          formData["realEstatePortfolio"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "bondsPortfolio") {
          formData["bondsPortfolio"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "cashPortfolio") {
          formData["cashPortfolio"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "goldPortfolio") {
          formData["goldPortfolio"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "totalPercentage") {
          formData["totalPercentage"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (
        formData["spPortfolio"] != "" &&
        formData["realEstatePortfolio"] != "" &&
        formData["bondsPortfolio"] != "" &&
        formData["cashPortfolio"] != "" &&
        formData["goldPortfolio"] != "" &&
        formData["totalPercentage"] != ""
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
    console.log("handleFormInputChange:", name, value);
    let formData = this.state.formData;
    formData[name] = value;
    let newState = {
      formData: formData,
    };

    if (formData["spPortfolio"]) {
      val1 = 0;
      val1 = formData["spPortfolio"];
    }
    if (formData["realEstatePortfolio"]) {
      val2 = 0;
      val2 = formData["realEstatePortfolio"];
    }
    if (formData["bondsPortfolio"]) {
      val3 = 0;
      val3 = formData["bondsPortfolio"];
    }
    if (formData["cashPortfolio"]) {
      val4 = 0;
      val4 = formData["cashPortfolio"];
    }
    if (formData["goldPortfolio"]) {
      val5 = 0;
      val5 = formData["goldPortfolio"];
    }
    newVal = val1 + val2 + val3 + val4 + val5;
    // if (
    //   formData["spPortfolio"] != "" &&
    //   formData["realEstatePortfolio"] != "" &&
    //   formData["bondsPortfolio"] != "" &&
    //   formData["cashPortfolio"] != "" &&
    //   formData["goldPortfolio"] !=
    //     "" /*&&
    //   formData["totalPercentage"] != ""*/
    // )
    if (parseInt(newVal) >= 100) {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }
    this.setState({
      totalVal: newVal,
    });
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

    let formData = UserPortfolioSubForm.FnCreateFormData({
      spPortfolio: this.state.formData["spPortfolio"],
      realEstatePortfolio: this.state.formData["realEstatePortfolio"],
      bondsPortfolio: this.state.formData["bondsPortfolio"],
      cashPortfolio: this.state.formData["cashPortfolio"],
      goldPortfolio: this.state.formData["goldPortfolio"],
      totalPercentage: this.state.formData["totalPercentage"],
    });

    this.props.cbUpdateSubForm(formID, formData, true, bEnd);

    if (!bEnd) {
      this.props.cbGoSubForm("AssetPerformanceSubForm");
    }
  }

  goPreviousForm() {
    this.props.cbGoSubForm("StepQuestionContributionDistributionSubForm");
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                User Defined Portfolio
              </h2>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Enter Portfolio % of S&P 500">
                <Percent
                  value={this.state.formData.spPortfolio}
                  name="spPortfolio"
                  onChange={(value) =>
                    this.handleFormInputChange("spPortfolio", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Enter Portfolio % of Real Estate">
                <Percent
                  value={this.state.formData.realEstatePortfolio}
                  name="realEstatePortfolio"
                  onChange={(value) =>
                    this.handleFormInputChange("realEstatePortfolio", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Enter Portfolio % of Bonds">
                <Percent
                  value={this.state.formData.bondsPortfolio}
                  name="bondsPortfolio"
                  onChange={(value) =>
                    this.handleFormInputChange("bondsPortfolio", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Enter Portfolio % of Cash">
                <Percent
                  value={this.state.formData.cashPortfolio}
                  name="cashPortfolio"
                  onChange={(value) =>
                    this.handleFormInputChange("cashPortfolio", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Enter Portfolio % of Gold">
                <Percent
                  value={this.state.formData.goldPortfolio}
                  name="goldPortfolio"
                  onChange={(value) =>
                    this.handleFormInputChange("goldPortfolio", value)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Total Percentage">
                <Percent
                  style={{ color: "green", fontSize: "20px" }}
                  disabled={true}
                  value={this.state.totalVal ? this.state.totalVal : 0}
                  name="totalPercentage"
                  onChange={(value) =>
                    this.handleFormInputChange("totalPercentage", value)
                  }
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

export default connect()(UserPortfolioSubForm);
