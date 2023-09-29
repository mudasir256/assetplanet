import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse, Icon } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Currency from "../../../../components/form/Currency";
import PhoneNumber from "../../../../components/form/PhoneNumber";
import Email from "../../../../components/form/Email";
import moment from "moment";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";
import Add from "../../../../components/form/components/add";
import AddModal from "../../../../components/form/components/addmodal";
import UpdateModal from "../../../../components/form/components/updatemodal";
import Header from "../../../../components/form/components/header";
import Footer from "../../../../components/form/components/footer";
import support from "../../../../assets/images/latest/support.png";
import DEATH_API from "../../../../apis/death.api";

const dateFormat = "MM/DD/YYYY";
const { Option } = Select;
const { Panel } = Collapse;

const formName = "spouseInformationForm";
class SpouseInformationSubForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spouse_information_subform_list: [],

      formData: {},

      isSpouseInformationSubformAddModalVisible: false,
      isSpouseInformationSubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null,
    };
  }

  componentDidMount() {
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("spouse_information_subform_list")
    ) {
      this.setState({ spouse_information_subform_list: this.props.checklistObject.clientForm.spouse_information_subform_list, });
    }


    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getSpouseDetails();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            spouse_information_subform_list: data.data.map((item) => {
              return {
                ...item,
                spouseFirstName: item.firstName,
                spouseLastName: item.lastName,
                spouseBirthdate: item.dob,
                spouseEstimatedDeathAge: item.ageOfDeath,
                spouseCurrentAge: item.ageOfDeath,
                spouseEmailAddress: item.email,
                spouseSecondaryEmailAddress: item.emailSecondary,
                spouseGender: item.gender,
                spousePrimaryContactNumber: item.phonePrimary,
                spouseSecondaryContactNumber: item.phone,
                spouseWorkContactNumber: item.phone,
                spouseInvestmentKnowledge: item.investmentKnowledge,
                spouseRetirementDate: item.retirementAge,
              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }

    this.props.handleChecklistObject(this.props.currentForm, this.state.spouse_information_subform_list)
  }


  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for spouse information subform add modal
  setSpouseInformationSubformAddModalVisible = () => {
    if (this.state.isSpouseInformationSubformAddModalVisible)
      this.setState({ isSpouseInformationSubformAddModalVisible: false });
    else this.setState({ isSpouseInformationSubformAddModalVisible: true });
  };


  // to handle hide and show for spouse information subform update modal
  setSpouseInformationUpdateModalVisible = () => {
    if (this.state.isSpouseInformationSubformUpdateModalVisible)
      this.setState({ isSpouseInformationSubformUpdateModalVisible: false });
    else this.setState({ isSpouseInformationSubformUpdateModalVisible: true });
  };

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
  deleteSelectedRow = async (idx, all_rows, name, id) => {
    try {
      
      this.props.handleLoader();
      await DEATH_API.deleteSpouseInfo(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });
      if (name === "spouse_information_subform") {
        this.setState(
          { spouse_information_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.spouse_information_subform_list) }
        );
      }
    } catch (error) {
      console.log("error in deleting")
      console.log(error)
    }

  };


  // Function to get selected  array (row)
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


  // function to update a specific spouse information subform row
  updateSpouseInformationSubformRow = async () => {
    
    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        firstName: this.state.updateObject.firstName,
        lastName: this.state.updateObject.lastName,
        dob: this.state.updateObject.dob,
        ageOfDeath: this.state.updateObject.ageOfDeath,
        spouseCurrentAge: this.state.updateObject.ageOfDeath,
        email: this.state.updateObject.email,
        emailSecondary: this.state.updateObject.emailSecondary,
        gender: this.state.updateObject.gender,
        phonePrimary: this.state.updateObject.phonePrimary,
        phoneSecondary: this.state.updateObject.phoneSecondary,
        phone: this.state.updateObject.phone,
        investmentKnowledge: this.state.updateObject.investmentKnowledge,
        retirementAge: this.state.updateObject.retirementAge,
      };
      
      await DEATH_API.updateSpouseInfo(obj.id, obj);
      this.props.handleLoader();

      let { spouse_information_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      spouse_information_subform_list = [...this.state.spouse_information_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      spouse_information_subform_list[index] = obj; // replace current updated object in spouse_information_subform_list based on index
      this.setState({ spouse_information_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.spouse_information_subform_list)
      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }
  };


  // function to create spouse information subform row(data)
  createSpouseInformationSubform = async (currentFormData) => {
    try {
      
      this.props.handleLoader();
      let spouseDataCopy = { ...currentFormData };
      
      const payload = {
        spouses: [spouseDataCopy.formData],
      };
      
      const res = await DEATH_API.addSpouseInfo(payload);
      this.props.handleLoader();
      

    } catch (error) {
      this.props.handleLoader();
      console.log(error);
    }
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in spouse information list with keeping old data
    this.setState({
      spouse_information_subform_list: [...this.state.spouse_information_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.spouse_information_subform_list)
    });
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


  getSpouseInformationSubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Name</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">DOB</span>
            <span className="custom-table-value-text"> {moment(data.dob).format("DD/MM/YYYY")}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Current Age</span>
            <span className="custom-table-value-text">{data.ageOfDeath}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Gender</span>
            <span className="custom-table-value-text">{data.gender}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.phonePrimary}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { spouse_information_subform_list } = this.state;
                  this.getSelectedRow(index, spouse_information_subform_list);

                  // this.setSpouseInformationSubformUpdateModalVisible();
                  this.setSpouseInformationUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { spouse_information_subform_list } = this.state;
                  const name = "spouse_information_subform";
                  this.deleteSelectedRow(index, spouse_information_subform_list, name, data.id);
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
    
    const spouseInformationSubformFields = [
      {
        title: "First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "DOB",
        type: "date",
        index: "dob"
      },
      {
        title: "Estimated Death Age",
        type: "date",
        index: "ageOfDeath"
      },
      {
        title: "Current Age",
        type: "input",
        index: "ageOfDeath"
      },
      {
        title: "Email Address",
        type: "email",
        index: "email"
      },
      {
        title: "Secondary Email Address",
        type: "email",
        index: "emailSecondary"
      },
      {
        title: "Gender",
        type: "select",
        options: ["Male", "Female"],
        index: "gender"
      },
      {
        title: "Primary Contact No.",
        type: "phone",
        index: "phonePrimary"
      },
      {
        title: "Secondary Contact No.",
        type: "phone",
        index: "phoneSecondary"
      },
      {
        title: "Work Contact No.",
        type: "phone",
        index: "phone"
      },
      {
        title: "Investment Knowledge",
        type: "select",
        options: ["Highly Experienced", "Enthusiast", "Some Experience/General", "Novice/Beginner"],
        index: "investmentKnowledge"
      },
      {
        title: "Retirement Date",
        type: "date",
        index: "retirementAge"
      }
    ];

    const updateSpouseInformationSubformFields = [
      {
        title: "First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Last Name",
        type: "input",
        index: "lastName"
      },

      {
        title: "DOB",
        type: "date",
        index: "dob"
      },
      {
        title: "Estimated Death Age",
        type: "date",
        index: "spouseEstimatedDeathAge"
      },
      {
        title: "Current Age",
        type: "input",
        index: "ageOfDeath"
      },
      {
        title: "Email Address",
        type: "email",
        index: "email"
      },
      {
        title: "Secondary Email Address",
        type: "email",
        index: "emailSecondary"
      },
      {
        title: "Gender",
        type: "select",
        options: ["Male", "Female"],
        index: "gender"
      },
      {
        title: "Primary Contact No.",
        type: "phone",
        index: "phonePrimary"
      },
      {
        title: "Secondary Contact No.",
        type: "phone",
        index: "spouseSecondaryContactNumber"
      },
      {
        title: "Work Contact No.",
        type: "phone",
        index: "phone"
      },
      {
        title: "Investment Knowledge",
        type: "select",
        options: ["Highly Experienced", "Enthusiast", "Some Experience/General", "Novice/Beginner"],
        index: "investmentKnowledge"
      },
      {
        title: "Retirement Date",
        type: "date",
        index: "retirementAge"
      }
    ];


    const {
      currentForm,
      handleInputChange,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
      handlePhoneChange,
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add Spouse Information"}
          fields={spouseInformationSubformFields}
          isVisible={this.state.isSpouseInformationSubformAddModalVisible}
          cbClose={this.setSpouseInformationSubformAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createSpouseInformationSubform}
        />

        <UpdateModal
          title={"Update Spouse Information"}
          fields={updateSpouseInformationSubformFields}
          isVisible={this.state.isSpouseInformationSubformUpdateModalVisible}
          cbClose={this.setSpouseInformationUpdateModalVisible}
          cbUpdate={this.updateSpouseInformationSubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />


        <Header image={support} title={"Spouse Information"} />


        <Add
          title={"Spouse Information"}
          button={"Add Spouse Information"}
          cbAdd={this.setSpouseInformationSubformAddModalVisible}
        />

        {
          // get spouse information subform row
          this.state.spouse_information_subform_list.map((data, index) => this.getSpouseInformationSubformRow({ data: data, index: index + 1 }))
        }

        {
          role === "ROLE"
            ? <Footer cbPrev={this.props.previousForm} />
            : <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
        }

      </React.Fragment>
    );
  }
}



const mapDispatchToProps = (dispatch) => {

  return {
    // dispatching plain actions
    handleClientInfoObject: (data) => {
      
      dispatch(setClientInfoObject({ ...data }))
    },
  };
};

const mapStateToProps = (state) => {
  

  return {
    // clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpouseInformationSubForm);
