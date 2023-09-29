import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import {
  Form,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Radio,
  Icon,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import PhoneNumber from "../../../../components/form/PhoneNumber";
import Email from "../../../../components/form/Email";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";
// import ClientInfoSideDisplay from "../operations/ClientInfoSideDisplay";


const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

const formID = "ClientInformationSubForm";
class ClientInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let birthDate = new Date(data["clientBirthdate"]);
    let difference = Date.now() - birthDate.getTime();
    let age = new Date(difference);
    let final_age = Math.abs(age.getUTCFullYear() - 1970);
    let formData = {
      title: "Client Information",
      fields: [
        {
          id: "firstName",
          title: "First Name",
          value: data["firstName"],
        },   {
          id: "lastName",
          title: "Last Name",
          value: data["lastName"],
        },
        {
          id: "clientBirthdate",
          title: "Client Date of Birth",
          value: data["clientBirthdate"],
        },
        {
          id: "clientEstimatedDeathAge",
          title: "Client Estimated Age at DeathHHHHH",
          value: data["clientEstimatedDeathAge"],
        },
        {
          id: "clientCurrentAge",
          title: "Client Current Age",
          value: final_age,
        },
        {
          id: "clientContactNumber",
          title: "Client Phone Number - Primary",
          value: data["clientContactNumber"],
        },
        // {
        //     id: 'clientSecondaryContactNumber',
        //     title: 'Client Phone Number - Secondary',
        //     value: data['clientSecondaryContactNumber']
        // },
        {
          id: "clientWorkContactNumber",
          title: "Client Phone Number - Work",
          value: data["clientWorkContactNumber"],
        },
        {
          id: "clientEmailAddress",
          title: "Client Email Address - Primary",
          value: data["clientEmailAddress"],
        },
        {
          id: "clientSecondaryEmailAddress",
          title: "Client Email Address - Other",
          value: data["clientSecondaryEmailAddress"],
        },
        {
          id: "clientGender",
          title: "Gender",
          value: data["clientGender"],
        },
        {
          id: "clientAddressFirstLine",
          title: "Address Line1",
          value: data["clientAddressFirstLine"],
        },
        {
          id: "clientAddressSecondLine",
          title: "Address Line2",
          value: data["clientAddressSecondLine"],
        },
        {
          id: "clientAddressCity",
          title: "City / District",
          value: data["clientAddressCity"],
        },
        {
          id: "clientAddressPostalCode",
          title: "Postal Code",
          value: data["clientAddressPostalCode"],
        },
        // {
        //     id: 'clientAddressCountry',
        //     title: 'Country',
        //     value: data['clientAddressCountry']
        // },
        {
          id: "clientAddressState",
          title: "State",
          value: data["clientAddressState"],
        },
        {
          id: "clientInvestmentKnowledge",
          title: "Investment Knowledge",
          value: data["clientInvestmentKnowledge"],
        },
        {
          id: "clientRetirementDate",
          title: "Date of Retirement",
          value: data["clientRetirementDate"],
        },
        {
          id: "clientNotes",
          title: "General Notes",
          value: data["clientNotes"],
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
        firstName:"",
        lastName:"",
        clientBirthdate: "",
        clientEstimatedDeathAge: "",
        clientCurrentAge: "",
        clientContactNumber: "",
        clientSecondaryContactNumber: "",
        clientWorkContactNumber: "",
        clientEmailAddress: "",
        clientSecondaryEmailAddress: "",
        clientGender: "",
        clientAddressFirstLine: "",
        clientAddressSecondLine: "",
        clientAddressCity: "",
        clientAddressPostalCode: "",
        clientAddressCountry: "",
        clientAddressState: "",
        clientInvestmentKnowledge: "",
        clientRetirementDate: "",
        clientNotes: "",
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
        if (newFormData.fields[findex]["id"] == "firstName") {
          formData["firstName"] = newFormData.fields[findex]["value"];
        }if (newFormData.fields[findex]["id"] == "lastName") {
          formData["lastName"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientBirthdate") {
          formData["clientBirthdate"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientEstimatedDeathAge") {
          formData["clientEstimatedDeathAge"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientCurrentAge") {
          formData["clientCurrentAge"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientContactNumber") {
          formData["clientContactNumber"] = newFormData.fields[findex]["value"];
        }
        if (
          newFormData.fields[findex]["id"] == "clientSecondaryContactNumber"
        ) {
          formData["clientSecondaryContactNumber"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientWorkContactNumber") {
          formData["clientWorkContactNumber"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientEmailAddress") {
          formData["clientEmailAddress"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientSecondaryEmailAddress") {
          formData["clientSecondaryEmailAddress"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientGender") {
          formData["clientGender"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressFirstLine") {
          formData["clientAddressFirstLine"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressSecondLine") {
          formData["clientAddressSecondLine"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressCity") {
          formData["clientAddressCity"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressPostalCode") {
          formData["clientAddressPostalCode"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressCountry") {
          formData["clientAddressCountry"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientAddressState") {
          formData["clientAddressState"] = newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientInvestmentKnowledge") {
          formData["clientInvestmentKnowledge"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientRetirementDate") {
          formData["clientRetirementDate"] =
            newFormData.fields[findex]["value"];
        }
        if (newFormData.fields[findex]["id"] == "clientNotes") {
          formData["clientNotes"] = newFormData.fields[findex]["value"];
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


    console.log("propsssssssssssssssssssssssssssssssssssssss",this.props);
    this.state.formData["formName"] = "ClientInfoForm"
    
    this.props.handleClientInfoObject(this.state.formData)


    console.log("client info form data",this.state.formData);

    let formData = ClientInformationSubForm.FnCreateFormData({
      firstName: this.state.formData["firstName"],
      lastName: this.state.formData["lastName"],

      clientBirthdate: this.state.formData["clientBirthdate"],
      clientEstimatedDeathAge: this.state.formData["clientEstimatedDeathAge"],
      clientCurrentAge: this.state.formData["clientCurrentAge"],
      clientContactNumber: this.state.formData["clientContactNumber"],
      clientSecondaryContactNumber: this.state.formData[
        "clientSecondaryContactNumber"
      ],
      clientWorkContactNumber: this.state.formData["clientWorkContactNumber"],
      clientEmailAddress: this.state.formData["clientEmailAddress"],
      clientSecondaryEmailAddress: this.state.formData[
        "clientSecondaryEmailAddress"
      ],
      clientGender: this.state.formData["clientGender"],
      clientAddressFirstLine: this.state.formData["clientAddressFirstLine"],
      clientAddressSecondLine: this.state.formData["clientAddressSecondLine"],
      clientAddressCity: this.state.formData["clientAddressCity"],
      clientAddressPostalCode: this.state.formData["clientAddressPostalCode"],
      clientAddressCountry: this.state.formData["clientAddressCountry"],
      clientAddressState: this.state.formData["clientAddressState"],
      clientInvestmentKnowledge: this.state.formData[
        "clientInvestmentKnowledge"
      ],
      clientRetirementDate: this.state.formData["clientRetirementDate"],
      clientNotes: this.state.formData["clientNotes"],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm("QuestionSpousePartnerHasSubForm");
    
  }

  render() {
    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                Client Information
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="First Name">
                <Input
                  value={this.state.formData.firstName}
                  size={"large"}
                  name="firstName"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Last Name">
                <Input
                  value={this.state.formData.lastName}
                  size={"large"}
                  name="lastName"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Date of Birth">
                <DatePicker
                  style={{ width: "100%" }}
                  format={dateFormat}
                  size={"large"}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "clientBirthdate",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.clientBirthdate == null ||
                    this.state.formData.clientBirthdate == ""
                      ? null
                      : moment(this.state.formData.clientBirthdate, dateFormat)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Estimated Age at Death">
                <Input
                  value={this.state.formData.clientEstimatedDeathAge}
                  size={"large"}
                  name="clientEstimatedDeathAge"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Phone Number">
                <PhoneNumber
                  value={this.state.formData.clientContactNumber}
                  name="clientContactNumber"
                  onChange={(event) => this.handleInputChange(event)}
                ></PhoneNumber>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Phone Number - Work">
                <PhoneNumber
                  value={this.state.formData.clientWorkContactNumber}
                  name="clientWorkContactNumber"
                  onChange={(event) => this.handleInputChange(event)}
                ></PhoneNumber>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Email Address - Primary">
                <Email
                  value={this.state.formData.clientEmailAddress}
                  name="clientEmailAddress"
                  onChange={(event) => this.handleInputChange(event)}
                ></Email>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Client Email Address - Other">
                <Email
                  value={this.state.formData.clientSecondaryEmailAddress}
                  name="clientSecondaryEmailAddress"
                  onChange={(event) => this.handleInputChange(event)}
                ></Email>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Gender: '>
                <Radio.Group
                  name={`clientGender`}
                  size={'large'}
                  value={this.state.formData.clientGender}
                  onChange={this.handleInputChange}
                >
                  <Radio.Button value='Male'>Male</Radio.Button>
                  <Radio.Button value='Female'>Female</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Address">
                <Input
                  placeholder="Address Line1"
                  size={"large"}
                  value={this.state.formData.clientAddressFirstLine}
                  name="clientAddressFirstLine"
                  onChange={(event) => this.handleInputChange(event)}
                />
                <Input
                  placeholder="Address Line2"
                  size={"large"}
                  value={this.state.formData.clientAddressSecondLine}
                  name="clientAddressSecondLine"
                  onChange={(event) => this.handleInputChange(event)}
                />
                <Input
                  placeholder="City / District"
                  size={"large"}
                  value={this.state.formData.clientAddressCity}
                  name="clientAddressCity"
                  onChange={(event) => this.handleInputChange(event)}
                />
                <Input
                  placeholder="Postal Code"
                  size={"large"}
                  value={this.state.formData.clientAddressPostalCode}
                  name="clientAddressPostalCode"
                  onChange={(event) => this.handleInputChange(event)}
                />
                <Select
                  showSearch
                  value={this.state.formData.clientAddressState}
                  onChange={(value) =>
                    this.handleSelectChange("clientAddressState", value)
                  }
                  size={"large"}
                >
                  <Option
                    style={{ color: "darkgrey" }}
                    disabled={true}
                    value=""
                  >
                    <div style={{ color: "darkgrey" }}>Select State</div>
                  </Option>
                  <Option value="AL">Alabama</Option>
                  <Option value="AK">Alaska</Option>
                  <Option value="AZ">Arizona</Option>
                  <Option value="AR">Arkansas</Option>
                  <Option value="CA">California</Option>
                  <Option value="CO">Colorado</Option>
                  <Option value="CT">Connecticut</Option>
                  <Option value="DE">Delaware</Option>
                  <Option value="DC">District Of Columbia</Option>
                  <Option value="FL">Florida</Option>
                  <Option value="GA">Georgia</Option>
                  <Option value="HI">Hawaii</Option>
                  <Option value="ID">Idaho</Option>
                  <Option value="IL">Illinois</Option>
                  <Option value="IN">Indiana</Option>
                  <Option value="IA">Iowa</Option>
                  <Option value="KS">Kansas</Option>
                  <Option value="KY">Kentucky</Option>
                  <Option value="LA">Louisiana</Option>
                  <Option value="ME">Maine</Option>
                  <Option value="MD">Maryland</Option>
                  <Option value="MA">Massachusetts</Option>
                  <Option value="MI">Michigan</Option>
                  <Option value="MN">Minnesota</Option>
                  <Option value="MS">Mississippi</Option>
                  <Option value="MO">Missouri</Option>
                  <Option value="MT">Montana</Option>
                  <Option value="NE">Nebraska</Option>
                  <Option value="NV">Nevada</Option>
                  <Option value="NH">New Hampshire</Option>
                  <Option value="NJ">New Jersey</Option>
                  <Option value="NM">New Mexico</Option>
                  <Option value="NY">New York</Option>
                  <Option value="NC">North Carolina</Option>
                  <Option value="ND">North Dakota</Option>
                  <Option value="OH">Ohio</Option>
                  <Option value="OK">Oklahoma</Option>
                  <Option value="OR">Oregon</Option>
                  <Option value="PA">Pennsylvania</Option>
                  <Option value="RI">Rhode Island</Option>
                  <Option value="SC">South Carolina</Option>
                  <Option value="SD">South Dakota</Option>
                  <Option value="TN">Tennessee</Option>
                  <Option value="TX">Texas</Option>
                  <Option value="UT">Utah</Option>
                  <Option value="VT">Vermont</Option>
                  <Option value="VA">Virginia</Option>
                  <Option value="WA">Washington</Option>
                  <Option value="WV">West Virginia</Option>
                  <Option value="WI">Wisconsin</Option>
                  <Option value="WY">Wyoming</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="Investment Knowledge">
                <Select
                  showSearch
                  placeholder="-Select-"
                  value={this.state.formData.clientInvestmentKnowledge}
                  onChange={(value) =>
                    this.handleSelectChange("clientInvestmentKnowledge", value)
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
                      "clientRetirementDate",
                      date,
                      dateString
                    )
                  }
                  size={"large"}
                  value={
                    this.state.formData.clientRetirementDate == null ||
                    this.state.formData.clientRetirementDate == ""
                      ? null
                      : moment(
                          this.state.formData.clientRetirementDate,
                          dateFormat
                        )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
              <Form.Item label="General Notes">
                <TextArea
                  value={this.state.formData.clientNotes}
                  name="clientNotes"
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="d-flex justify-content-end">
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
        {/* <div className='form-page--right-side custom'>


        <div className='form-page--right-side-wrap'>

        <ClientInfoSideDisplay 
        data={this.props.clientInfoObject}
        />
        </div>
        </div> */}

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
    clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ClientInformationSubForm);
