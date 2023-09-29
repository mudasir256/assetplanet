import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Form, Button, Row, Col, Input, DatePicker, Select, Radio, Icon } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PhoneNumber from "../../../../components/form/PhoneNumber";
import Email from "../../../../components/form/Email";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";
import ClientInfoSideDisplay from "../operations/ClientInfoSideDisplay";
import 'antd/dist/antd.css'
import { StyledForm } from '../../../../components/new-styled-components/FormStyling'
// import "../../../custom/CustomSubFormTable.css";
import support from "../../../../assets/images/latest/support.png";
const dateFormat = "MM/DD/YYYY";
const { Option } = Select;


const formName = "clientInformationForm";
class ClientInformationSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client_information_list: [
        {
          firstName: "", lastName: "", clientBirthdate: "", clientEstimatedDeathAge: "", clientCurrentAge: "", clientContactNumber: "", clientSecondaryContactNumber: "", clientWorkContactNumber: "", clientEmailAddress: "", clientSecondaryEmailAddress: "", clientGender: "",
          clientAddressFirstLine: "", clientAddressSecondLine: "", clientAddressCity:"", clientAddressPostalCode: "", clientAddressCountry: "",
          clientAddressState: "", clientInvestmentKnowledge: "", clientRetirementDate: "", clientNotes: "",
        }
      ],

      search: [],
      results: [],
      formData: {},

      isClientInformationAddModalVisible: false,
      isClientInformationUpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null
    };

    // this.goNextForm = this.goNextForm.bind(this);
    // this.updateFormData = this.updateFormData.bind(this);

    // this.handleFormInputChange = this.handleFormInputChange.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    // this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    if (
      this.props.checklistObject.contactListForm &&
      this.props.checklistObject.contactListForm.hasOwnProperty("client_information_list")
    )
    this.props.handleChecklistObject(this.props.currentForm,this.state.client_information_list)
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for client information add modal
  setClientInformationAddModalVisible = () => {
    if (this.state.isClientInformationAddModalVisible)
      this.setState({ isClientInformationAddModalVisible: false });
    else this.setState({ isClientInformationAddModalVisible: true });
  };

  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState({
      updateObject: {
        ...this.state.updateObject,
        [index]: val,
      },
    });
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };


  // Function to delete selected row
  deleteSelectedRow = (idx, all_rows, name) => {
    const updatedRows = all_rows.filter((row, index) => {
      return index !== idx - 1;
    });

    if (name === "client_information") {
      this.setState({
        contact_list: updatedRows,
      },()=>{ this.props.handleChecklistObject(this.props.currentForm,this.state.contact_list) });
    } else {
      this.setState({
        team_list: updatedRows, 
      },()=>{ this.props.handleChecklistObject(this.props.currentForm,this.state.team_list) });
    }
  };


  // Function to get selected array (row)
  getSelectedRow = (idx, rows, name) => {
    this.setState({
      selectedIndex: idx,
    });

    // get selected row (this will return array of object)
    let selectedRow = rows.filter((row, index) => {
      return index === idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };

    //  function to update a specific contact row
    updateClientInformationRow = () => {
      let obj = {
        ...this.state.updateObject,
      };
    
      let { client_information_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;
    
      client_information_list = [...this.state.client_information_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      client_information_list[index] = obj; // replace current updated object in client_information_list based on index
      this.setState({ client_information_list },()=>{
        this.props.handleChecklistObject(this.props.currentForm,this.state.client_information_list)
  
      });
    };


  // function to create contact row (data)
  createClientInformation = (currentFormData) => {
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }
  
    // add current form data in client_information_list list with keeping old data
    this.setState({
      client_information_list: [...this.state.client_information_list, currentFormData.formData],
    },()=>{ this.props.handleChecklistObject(this.props.currentForm,this.state.client_information_list) });
  };


  // store all modal data in formData state
  setFormData = (value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...value,
      },
    });
  };


  getClientInformationRow = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">First Name</span>
            <span className="custom-table-value-text">{data.Name}</span>
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Last Name</span>
            <span className="custom-table-value-text">{data.LastName}</span>
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.Phone}</span>
          </div>
        </Col>
        <Col span={3}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.Email}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.TypeOfRelation}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Notes</span>
            <span className="custom-table-value-text">{data.Notes}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }} 
              type="edit"
              onClick={() => {
                const { client_information_list } = this.state;
                this.getSelectedRow(index, client_information_list);

                this.setContactUpdateModalVisible();
              }}
              >
              
              </Icon>
              <Icon style={{ fontSize: "20px" }}
               type="delete"
               onClick={() => {
                const { client_information_list } = this.state;
                const name = "contact";
                this.deleteSelectedRow(index, client_information_list, name);
              }}
               >
               
               </Icon>
              <Icon style={{ fontSize: "20px" }} type="save"></Icon>
              <Icon style={{ fontSize: "20px" }} type="printer"></Icon>
            </div>
          </div>
        </Col>
      </Row>
    );
  };



  render() {
   const clientInformationFields = [
      {
        title: "First Name",
        type: "input",
        index:"firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index:"lastName"
      },
      {
        title: "Client DOB",
        type: "date",
        index:"clientBirthdate"
      },
      {
        title: "clientEstimatedDeathAge",
        type: "input",
        index:"clientEstimatedDeathAge"
      },
      {
        title: "Client Age",
        type: "input",
        index:"clientCurrentAge"
      },
      {
        title: "Client Number",
        type: "phone",
        index:"clientContactNumber"
      },
      {
        title: "Client Secondary Contact Number",
        type: "phone",
        index:"clientSecondaryContactNumber"
      },
      {
        title: "Client Work Contact Number",
        type: "phone",
        index:"clientWorkContactNumber"
      },
      {
        title: "Client Email Address",
        type: "email",
        index:"clientEmailAddress"
      },
      {
        title: "Client Secondary Email Address",
        type: "email",
        index:"clientSecondaryEmailAddress"
      },
      {
        title: "Client Gender",
        type: "radio",
        index:"clientGender"
      },
      {
        title: "Client Address First Line",
        type: "input",
        index:"clientAddressFirstLine"
      },
      {
        title: "Client Address Second Line",
        type: "input",
        index:"clientAddressSecondLine"
      },
      {
        title: "Client City",
        type: "input",
        index:"clientAddressCity"
      },
      {
        title: "Client Postal Code",
        type: "input",
        index:"clientAddressPostalCode"
      },
      {
        title: "Client Country",
        type: "input",
        index:"clientAddressCountry"
      },
      {
        title: "Client State",
        type: "input",
        index:"clientAddressState"
      },
      {
        title: "Client Investment Knowledge",
        type: "input",
        index:"clientInvestmentKnowledge"
      },
      {
        title: "Client Retirement Date",
        type: "date",
        index:"clientRetirementDate"
      },
      {
        title: "Client Notes",
        type: "textarea",
        index:"clientNotes"
      }
    ];


     // const { handleFormInputChange, role } = this.props;
     const {
      nextForm,
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      role
    } = this.props;

    
    return (
      <>
        <StyledForm>
          <Row>
            <Col>
              <Row type="flex" justify="center">
                <Col span={23}>
                  <Form 
                      name="basic"
                      initialValues={{
                          remember: true,
                      }}
                      autoComplete="off"
                  >
                    <Row type="flex" justify="center">
                      <Col xs={24}>
                        <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                          {/* First Name */}
                          <Col xs={24} md={12}>
                            <Form.Item label="First Name:">
                              <Input
                                placeholder="Enter Name Here..."
                                value={this.state.formData.firstName}
                                size={"large"}
                                name="firstName"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>

                          {/* Last Name */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Last Name:">
                              <Input
                                placeholder="Enter Name Here..."
                                value={this.state.formData.lastName}
                                size={"large"}
                                name="lastName"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>

                          {/* Client DOB */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client DOB:">
                              <DatePicker
                                placeholder="Select Date"
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

                          {/* Client Estimated Age of Death */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client Estimated Age of Death:">
                              <Input
                                placeholder="Enter Age Here..."
                                value={this.state.formData.clientEstimatedDeathAge}
                                size={"large"}
                                name="clientEstimatedDeathAge"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>

                          {/* Client Phone # */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client Phone #">
                              <PhoneNumber
                                className="input-with-icon"
                                placeholder="Enter Phone Number Here..."
                                value={this.state.formData.clientContactNumber}
                                name="clientContactNumber"
                                onChange={(event) => this.handleInputChange(event)}
                              ></PhoneNumber>
                            </Form.Item>
                          </Col>

                          {/* Client Work Phone # */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client Work Phone #">
                              <PhoneNumber
                                className="input-with-icon"
                                placeholder="Enter Phone Number Here..."
                                value={this.state.formData.clientWorkContactNumber}
                                name="clientWorkContactNumber"
                                onChange={(event) => this.handleInputChange(event)}
                              ></PhoneNumber>
                            </Form.Item>
                          </Col>

                          {/* Client Email Address - Primary */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client Email Address - Primary:">
                              <Email
                                placeholder="Enter Primary Email ID Here..."
                                value={this.state.formData.clientEmailAddress}
                                name="clientEmailAddress"
                                onChange={(event) => this.handleInputChange(event)}
                              ></Email>
                            </Form.Item>
                          </Col>

                          {/* Client Email Address - Other */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Client Email Address - Other:">
                              <Email
                                placeholder="Enter Other Email ID Here..."
                                value={this.state.formData.clientSecondaryEmailAddress}
                                name="clientSecondaryEmailAddress"
                                onChange={(event) => this.handleInputChange(event)}
                              ></Email>
                            </Form.Item>
                          </Col>

                          {/* Gender */}
                          <Col xs={16}>
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

                          {/* Address */}
                          <Col xs={24}>
                            <Form.Item label="Address:">
                              <TextArea
                                style={{"resize": "none"}}
                                rows={5}
                                value={this.state.formData.clientAddressFirstLine}
                                name="clientAddressFirstLine"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                              {/* <Input
                                placeholder="Address Line1"
                                size={"large"}
                                value={this.state.formData.clientAddressFirstLine}
                                name="clientAddressFirstLine"
                                onChange={(event) => this.handleInputChange(event)}
                              /> */}
                              {/* <Input
                                placeholder="Address Line2"
                                size={"large"}
                                value={this.state.formData.clientAddressSecondLine}
                                name="clientAddressSecondLine"
                                onChange={(event) => this.handleInputChange(event)}
                              /> */}
                            </Form.Item>
                          </Col>

                          {/* City */}
                          <Col xs={24} md={12}>
                            <Form.Item label="City:">
                              <Input
                                placeholder="Enter City Name Here..."
                                size={"large"}
                                value={this.state.formData.clientAddressCity}
                                name="clientAddressCity"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>

                          {/* Postal Code */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Postal Code:">
                              <Input
                                placeholder="Enter Post Code Here..."
                                size={"large"}
                                value={this.state.formData.clientAddressPostalCode}
                                name="clientAddressPostalCode"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>


                          {/* State */}
                          <Col xs={24} md={12}>
                            <Form.Item label="State">
                              <Select
                                showSearch
                                placeholder="Select State..."
                                value={this.state.formData.clientAddressState}
                                onChange={(value) =>
                                  this.handleSelectChange("clientAddressState", value)
                                }
                                size={"large"}
                              >
                                {/* <Option style={{ color: "darkgrey" }} disabled={true} value=""> <div>Select State...</div> </Option> */}
                                <Option key={0} disabled value="" > Select State... </Option>
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

                          {/* Investment Knowledge */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Investment Knowledge:">
                              <Select
                                showSearch
                                placeholder="Select..."
                                value={this.state.formData.clientInvestmentKnowledge}
                                onChange={(value) =>
                                  this.handleSelectChange("clientInvestmentKnowledge", value)
                                }
                                size={"large"}
                              >
                                {/* <Option key={0} style={{ color: "darkgrey" }} disabled={true} value="" > <div>Select...</div> </Option> */}
                                <Option key={0} disabled value="" > Select... </Option>
                                <Option value="Highly Experienced">Highly Experienced</Option>
                                <Option value="Enthusiast">Enthusiast</Option>
                                <Option value="Some Experience/General"> Some Experience/General</Option>
                                <Option value="Novice/Beginner">Novice/Beginner</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          {/* Date of Retirement */}
                          <Col xs={24} md={12}>
                            <Form.Item label="Date of Retirement:">
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
                                  this.state.formData.clientRetirementDate === ""
                                    ? null
                                    : moment(
                                        this.state.formData.clientRetirementDate,
                                        dateFormat
                                      )
                                }
                              />
                            </Form.Item>
                          </Col>
                          
                          {/* General Notes */}
                          <Col xs={24}>
                            <Form.Item label="General Notes">
                              <TextArea
                                style={{"resize": "none"}}
                                rows={5}
                                value={this.state.formData.clientNotes}
                                name="clientNotes"
                                onChange={(event) => this.handleInputChange(event)}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form> 
                </Col> 
              </Row> 
            </Col> 
          </Row> 
        </StyledForm>

        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
              style={{ background: "#39b54a", width: "30%" }}
            >
              {/* <Icon type="left" /> */}
              <span className="custom-footer-text">Next</span>
            </Button>
          </div>
        </div>

        {/* <div className='form-page--right-side custom'>


        <div className='form-page--right-side-wrap'>

        <ClientInfoSideDisplay 
        data={this.props.clientInfoObject}
        />
        </div>
        </div> */}

      </>
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
