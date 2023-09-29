import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  Radio,
  Icon,
  DatePicker,
} from "antd";

import Currency from "../../../../components/form/Currency";
import { COLLECTIBLE_TYPES, COLLECTIBLE_SUB_TYPES } from "constants/types";
import moment from "moment";
import Items from "../../../../components/organizer/assets/collectibles/items/items";
const { Option } = Select;
const dateFormat = "MM/DD/YYYY";
const formID = "CollectiblesSubForm";
class CollectiblesSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: "Collectibles",
      fields: [
        {
          id: "description",
          title: "Describe Collectible",
          value: data["description"],
        },
        {
          id: "collectibleType",
          title: "Type of Collectible",
          value: data["collectibleType"],
        },
        {
          id: "year",
          title: "Year",
          value: data["year"],
        },
        {
          id: "make",
          title: "Make",
          value: data["make"],
        },
        {
          id: "model",
          title: "Model",
          value: data["model"],
        },
        {
          id: "purchasePrice",
          title: "Purchase Price",
          value: data["purchasePrice"],
          type: "currency",
        },
        {
          id: "monthlyBudget",
          title: "$ applied to Monthly Budget",
          value: data["monthlyBudget"],
          type: "currency",
        },
        {
          id: "appraised",
          title: "Appraised",
          value: data["appraised"],
        },
        {
          id: "insured",
          title: "Insured",
          value: data["insured"],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
      enableNext: false,
      formData: {
        dateOfApproval: "",
        year: "",
        description: "",
        monthlyBudget: "",
        collectibleType: "",
        model: "",
        make: "",
        purchasePrice: "",
        appraised: "",
        insured: "",
      },
    };

    this.goNextForm = this.goNextForm.bind(this);
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
        if (newFormData.fields[findex]["id"] == "year") {
          formData["year"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "description") {
          formData["description"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "monthlyBudget") {
          formData["monthlyBudget"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "collectibleType") {
          formData["collectibleType"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "model") {
          formData["model"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "make") {
          formData["make"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "purchasePrice") {
          formData["purchasePrice"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "appraised") {
          formData["appraised"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "insured") {
          formData["insured"] = newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      if (
        formData["year"] != "" &&
        formData["description"] != "" &&
        formData["monthlyBudget"] != "" &&
        formData["collectibleType"] != "" &&
        formData["model"] != "" &&
        formData["make"] != "" &&
        formData["purchasePrice"] != "" &&
        formData["appraised"] != "" &&
        formData["insured"] != ""
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
      formData["year"] != "" &&
      formData["description"] != "" &&
      formData["monthlyBudget"] != "" &&
      formData["collectibleType"] != "" &&
      formData["model"] != "" &&
      formData["make"] != "" &&
      formData["purchasePrice"] != "" &&
      formData["appraised"] != "" &&
      formData["insured"] != ""
    ) {
      newState["enableNext"] = true;
    } else {
      newState["enableNext"] = false;
    }

    this.setState(newState);
  }

  handleInputChange(event) {
    if (event.target.name == "appraised") {
      if (event.target.value == "Yes") {
        this.setState({
          showDatePicker: true,
        });
      } else {
        this.setState({
          showDatePicker: false,
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

    let formData = CollectiblesSubForm.FnCreateFormData({
      year: this.state.formData["year"],
      description: this.state.formData["description"],
      monthlyBudget: this.state.formData["monthlyBudget"],
      collectibleType: this.state.formData["collectibleType"],
      model: this.state.formData["model"],
      make: this.state.formData["make"],
      purchasePrice: this.state.formData["purchasePrice"],
      appraised: this.state.formData["appraised"],
      insured: this.state.formData["insured"],
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
  getDatePicker() {
    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16}>
          <Form.Item label="Date of Approval">
            <DatePicker
              placeholder="Select Date"
              style={{ width: "100%" }}
              format={dateFormat}
              onChange={(date, dateString) =>
                this.handleDatePickerChange("dateOfApproval", date, dateString)
              }
              value={
                this.state.formData.dateOfApproval == ""
                  ? null
                  : moment(this.state.formData.dateOfApproval, dateFormat)
              }
              size={"large"}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  }
  render() {
    const collectible_types = [
      "Art",
      "Classic Car",
      "Clothing",
      "Guns, Knives, Swords, Armor",
      "Memorabilia",
    ];

    const showDatePicker = this.state;
    return (
      <React.Fragment>
        <Items />
        {/* <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Collectibles
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Type of Collectible">
                <Select
                  showSearch
                  placeholder="-Select-"
                  value={this.state.formData.collectibleType}
                  onChange={(value) =>
                    this.handleSelectChange("collectibleType", value)
                  }
                  size={"large"}
                >
                  {COLLECTIBLE_TYPES.map((collectible_type, index) => (
                    <Option key={index} value={collectible_type}>
                      {collectible_type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {(this.state.formData.collectibleType == "Art" ||
            this.state.formData.collectibleType == "Clothing" ||
            this.state.formData.collectibleType == "Memorabilia" ||
            this.state.formData.collectibleType == "Metals and Jewelry") && (
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item
                  label={"Type of " + this.state.formData.collectibleType}
                >
                  <Select
                    showSearch
                    placeholder="-Select-"
                    value={this.state.formData.collectibleSubType}
                    onChange={(value) =>
                      this.handleSelectChange("collectibleSubType", value)
                    }
                    size={"large"}
                  >
                    {COLLECTIBLE_SUB_TYPES[
                      this.state.formData.collectibleType
                    ].map((collectible_sub_type, index) => (
                      <Option key={index} value={collectible_sub_type}>
                        {collectible_sub_type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Describe Collectible">
                <Input
                  value={this.state.formData.description}
                  size={"large"}
                  name="description"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Purchase Price">
                <Currency
                  value={this.state.formData.purchasePrice}
                  name="purchasePrice"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="$ applied to Monthly Budget">
                <Currency
                  value={
                    this.state.formData.monthlyBudget
                      ? this.state.formData.monthlyBudget
                      : null
                  }
                  name="monthlyBudget"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Year">
                <Input
                  value={this.state.formData.year}
                  name="year"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Make">
                <Input
                  value={this.state.formData.make}
                  size={"large"}
                  name="make"
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Model">
                <Input
                  value={this.state.formData.model}
                  size={"large"}
                  name="model"
                  onChange={(event) => this.handleInputChange(event)}
                ></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Appraised">
                <Radio.Group
                  name="appraised"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.appraised}
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {this.state.showDatePicker ? this.getDatePicker() : null}
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Insured">
                <Radio.Group
                  name="insured"
                  size={"large"}
                  onChange={(event) => this.handleInputChange(event)}
                  value={this.state.formData.insured}
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
        </div> */}
      </React.Fragment>
    );
  }
}

export default connect()(CollectiblesSubForm);
