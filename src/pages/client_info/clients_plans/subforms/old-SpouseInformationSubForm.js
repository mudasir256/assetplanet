import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Form,
  Table,
  Divider,
  Tag,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Radio,
  Collapse,
  Icon,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Currency from "../../../../components/form/Currency";
import PhoneNumber from "../../../../components/form/PhoneNumber";
import Email from "../../../../components/form/Email";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";

const dateFormat = "MM/DD/YYYY";

const { Option } = Select;
const { Panel } = Collapse;

const formID = "SpouseInformationSubForm";
class SpouseInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let birthDate = new Date(data["spouseBirthdate"]);
    let difference = Date.now() - birthDate.getTime();
    let age = new Date(difference);
    let final_age = Math.abs(age.getUTCFullYear() - 1970);
    let formData = {
      title: "Spouse Information",
      fields: [
        {
          id: "spouseFirstName",
          title: "First Name",
          value: data["spouseFirstName"],
        }, {
          id: "spouseLastName",
          title: "Last Name",
          value: data["spouseLastName"],
        },
        {
          id: "spouseBirthdate",
          title: "Spouse/Partner Date of Birth",
          value: data["spouseBirthdate"],
        },
        {
          id: "spouseEstimatedDeathAge",
          title: "Spouse/Partner Estimated Age at Death",
          value: data["spouseEstimatedDeathAge"],
        },
        {
          id: "spouseCurrentAge",
          title: "Spouse/Partner Current Age",
          value: final_age,
        },
        {
          id: "spouseEmailAddress",
          title: "Spouse/Partner Email Address - Primary",
          value: data["spouseEmailAddress"],
        },
        {
          id: "spouseSecondaryEmailAddress",
          title: "Spouse/Partner Email Address - Other",
          value: data["spouseSecondaryEmailAddress"],
        },
        {
          id: "spouseGender",
          title: "Gender",
          value: data["spouseGender"],
        },
        {
          id: "spousePrimaryContactNumber",
          title: "Spouse/Partner Phone Number - Primary",
          value: data["spousePrimaryContactNumber"],
        },
        {
          id: "spouseSecondaryContactNumber",
          title: "Spouse/Partner Phone Number - Secondary",
          value: data["spouseSecondaryContactNumber"],
        },
        {
          id: "spouseWorkContactNumber",
          title: "Spouse/Partner Phone Number - Work",
          value: data["spouseWorkContactNumber"],
        },
        {
          id: "spouseInvestmentKnowledge",
          title: "Investment Knowledge",
          value: data["spouseInvestmentKnowledge"],
        },
        {
          id: "spouseRetirementDate",
          title: "Date of Retirement",
          value: data["spouseRetirementDate"],
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
        spouseFirstName:"",
        spouseLastName:"",
        spouseBirthdate: "",
        spouseEstimatedDeathAge: "",
        spouseCurrentAge: "",
        spouseEmailAddress: "",
        spouseSecondaryEmailAddress: "",
        spouseGender: "",
        spousePrimaryContactNumber: "",
        spouseSecondaryContactNumber: "",
        spouseWorkContactNumber: "",
        spouseInvestmentKnowledge: "",
        spouseRetirementDate: "",
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
        if (newFormData.fields[findex]["id"] == "spouseFirstName") {
          formData["spouseFirstName"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseLastName") {
          formData["spouseLastName"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseBirthdate") {
          formData["spouseBirthdate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseEstimatedDeathAge") {
          formData["spouseEstimatedDeathAge"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseEmailAddress") {
          formData["spouseEmailAddress"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseSecondaryEmailAddress") {
          formData["spouseSecondaryEmailAddress"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseGender") {
          formData["spouseGender"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spousePrimaryContactNumber") {
          formData["spousePrimaryContactNumber"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseWorkContactNumber") {
          formData["spouseWorkContactNumber"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseInvestmentKnowledge") {
          formData["spouseInvestmentKnowledge"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "spouseRetirementDate") {
          formData["spouseRetirementDate"] =
            newFormData.fields[findex]["value"];
        }
      }

      let enableNext = false;
      // if(formData['insuranceProduct'] != ''){
      //     enableNext = true;
      // }

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

    if (formData["insuranceProduct"] != "") {
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

  goNextForm() {
    if (!this.state.enableNext) {
      return;
    }

    console.log("propsssssssssssssssssssssssssssssssssssssss form dfata",this.state.formData);

    this.state.formData["formName"] = "SpousePartnerForm"
    
    this.props.handleClientInfoObject(this.state.formData)


    let formData = SpouseInformationSubForm.FnCreateFormData({
      spouseFirstName: this.state.formData["spouseFirstName"],
      spouseLastName: this.state.formData["spouseLastName"],

      spouseBirthdate: this.state.formData["spouseBirthdate"],
      spouseEstimatedDeathAge: this.state.formData["spouseEstimatedDeathAge"],
      spouseEmailAddress: this.state.formData["spouseEmailAddress"],
      spouseSecondaryEmailAddress: this.state.formData[
        "spouseSecondaryEmailAddress"
      ],
      spouseGender: this.state.formData["spouseGender"],
      spousePrimaryContactNumber: this.state.formData[
        "spousePrimaryContactNumber"
      ],
      spouseWorkContactNumber: this.state.formData["spouseWorkContactNumber"],
      spouseInvestmentKnowledge: this.state.formData[
        "spouseInvestmentKnowledge"
      ],
      spouseRetirementDate: this.state.formData["spouseRetirementDate"],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm("QuestionDependentSubForm");
  }

  goPreviousForm() {
    this.props.cbGoSubForm("ClientInformationSubForm");
  }

 
  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Spouse Information
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="First Name">
                <Input
                  value={this.state.formData.spouseFirstName}
                  size={"large"}
                  name="spouseFirstName"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Last Name">
                <Input
                  value={this.state.formData.spouseLastName}
                  size={"large"}
                  name="spouseLastName"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Date of Birth">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "spouseBirthdate",
                      date,
                      dateString
                    )
                  }
                  size={"large"}
                  value={
                    this.state.formData.spouseBirthdate == null ||
                    this.state.formData.spouseBirthdate == ""
                      ? null
                      : moment(this.state.formData.spouseBirthdate, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Estimated Age at Death">
                <Input
                  value={this.state.formData.spouseEstimatedDeathAge}
                  size={"large"}
                  name="spouseEstimatedDeathAge"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Email Address - Primary">
                <Email
                  value={this.state.formData.spouseEmailAddress}
                  name="spouseEmailAddress"
                  onChange={(event) => this.handleInputChange(event)}
                ></Email>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Email Address - Other">
                <Email
                  value={this.state.formData.spouseSecondaryEmailAddress}
                  name="spouseSecondaryEmailAddress"
                  onChange={(event) => this.handleInputChange(event)}
                ></Email>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Gender">
                <Radio.Group
                  name="spouseGender"
                  onChange={this.handleInputChange}
                  size={"large"}
                  value={this.state.formData.spouseGender}
                >
                  <Radio value={"Male"}>Male</Radio>
                  <Radio value={"Female"}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Phone Number - Primary">
                <PhoneNumber
                  value={this.state.formData.spousePrimaryContactNumber}
                  name="spousePrimaryContactNumber"
                  onChange={(event) => this.handleInputChange(event)}
                ></PhoneNumber>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Spouse/Partner Phone Number - Work">
                <PhoneNumber
                  value={this.state.formData.spouseWorkContactNumber}
                  name="spouseWorkContactNumber"
                  onChange={(event) => this.handleInputChange(event)}
                ></PhoneNumber>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Investment Knowledge">
                <Select
                  showSearch
                  placeholder="-Select-"
                  value={this.state.formData.spouseInvestmentKnowledge}
                  onChange={(value) =>
                    this.handleSelectChange("spouseInvestmentKnowledge", value)
                  }
                  size={"large"}
                >
                  <Option value="Highly Experienced">Highly Experienced</Option>
                  <Option value="Enthusiast">Enthusiast</Option>
                  <Option value="Some Experience/General">
                    Some Experience/General
                  </Option>
                  <Option value="Novice/Beginner">Novice/Beginner</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Date of Retirement">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "spouseRetirementDate",
                      date,
                      dateString
                    )
                  }
                  size={"large"}
                  value={
                    this.state.formData.spouseRetirementDate == null ||
                    this.state.formData.spouseRetirementDate == ""
                      ? null
                      : moment(
                          this.state.formData.spouseRetirementDate,
                          dateFormat
                        )
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



const mapDispatchToProps = (dispatch) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  console.log("in map siaptach to props");

  return {
       // dispatching plain actions
      handleClientInfoObject: (data) =>{
        console.log("in map siaptach tssjjshio props");
        dispatch(setClientInfoObject({...data}))},
  };
};

const mapStateToProps = (state) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  return {
    // clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SpouseInformationSubForm);
