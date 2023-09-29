import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse, Icon } from "antd";
import SubFormTable from "../../../../components/SubFormTable";
import Currency from "../../../../components/form/Currency";
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
const otherTaxCredits = [
  "Adoption Credit",
  "American Opportunity Credit and Lifetime Learning Credit",
  "Child and Dependent Care Credit",
  "Child Tax Credit",
  "Credit for Tax on Undistributed Capital Gain",
  "Credit for the Elderly or Disabled",
  "Credit to Holders of Tax Credit Bonds",
  "Earned Income Tax Credit",
  "Excess Social Security and RRTA Tax Withheld",
  "Foreign Tax Credit",
  "Health Coverage Tax Credit",
  "Low-Income Housing Credit (for Owners)",
  "Nonbusiness Energy Property Credit",
  "Nonrefundable Credit for Prior Year Minimum Tax",
  "Premium Tax Credit (Affordable Care Act)",
  "Residential Energy Efficient Property Credit",
  "Saver's Credit",
];


const formName = "charityInformationForm";
class CharityInformationSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charity_subform_list: [],

      formData: {},

      isCharitySubformAddModalVisible: false,
      isCharitySubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null
    };


  }

  componentDidMount() {
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("charity_subform_list")
    ) {
      this.setState({ charity_subform_list: this.props.checklistObject.clientForm.charity_subform_list, });
    }
    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getCharityInfo();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            charity_subform_list: data.data.map((item) => {
              return {
                ...item,
                charityName: item.name,
                phone: item.phone,
                web: item.webAddress,
                email: item.email,
                personFirstName: item.firstName,
                personLastName: item.lastName,
                notes: item.notes

              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list)
  }


  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for charity subform add modal
  setCharitySubformAddModalVisible = () => {
    if (this.state.isCharitySubformAddModalVisible)
      this.setState({ isCharitySubformAddModalVisible: false });
    else this.setState({ isCharitySubformAddModalVisible: true });
  };

  // to handle hide and show for charity subform update modal
  setCharitySubformUpdateModalVisible = () => {
    if (this.state.isCharitySubformUpdateModalVisible)
      this.setState({ isCharitySubformUpdateModalVisible: false });
    else this.setState({ isCharitySubformUpdateModalVisible: true });
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
  deleteSelectedRow = async (idx, all_rows, name, id) => {

    try {
      console.log("id", id)
      this.props.handleLoader();
      await DEATH_API.deleteCharityInfo(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });

      if (name === "charity_subform") {
        this.setState(
          { charity_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list) }
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


  // function to update a specific charity subform row
  updateCharitySubformRow = async () => {

    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        charityName: this.state.updateObject.name,
        phone: this.state.updateObject.phone,
        web: this.state.updateObject.webAddress,
        email: this.state.updateObject.email,
        personFirstName: this.state.updateObject.firstName,
        personLastName: this.state.updateObject.lastName,
        notes: this.state.updateObject.notes,
      };
      console.log("object after change...", obj);
      await DEATH_API.updateCharityInfo(obj.id, obj);
      this.props.handleLoader();

      let { charity_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      charity_subform_list = [...this.state.charity_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      charity_subform_list[index] = obj; // replace current updated object in charity_subform_list based on index
      this.setState({ charity_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list)
      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }

  };


  // function to create charity subform row(data)
  createCharitySubform = async (currentFormData) => {


    try {
      this.props.handleLoader();
      console.log("in Charity submit data");
      let charityDataCopy = { ...currentFormData };
      console.log("charityDataCopy", charityDataCopy.formData)
      const payload = {
        charities: [charityDataCopy.formData],
      };
      console.log("payload", payload);
      const res = await DEATH_API.addCharityInfo(payload);
      this.props.handleLoader();
      console.log("result create...", res);

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

    // add current form data in charity subform list with keeping old data
    this.setState({
      charity_subform_list: [...this.state.charity_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.charity_subform_list)
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


  getCharitySubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Charity Name</span>
            <span className="custom-table-value-text">{data.name}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Phone</span>
            <span className="custom-table-value-text">{data.phone}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Web</span>
            <span className="custom-table-value-text">{data.webAddress}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Email</span>
            <span className="custom-table-value-text">{data.email}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Contact</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { charity_subform_list } = this.state;
                  this.getSelectedRow(index, charity_subform_list);

                  this.setCharitySubformUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { charity_subform_list } = this.state;
                  const name = "charity_subform";
                  this.deleteSelectedRow(index, charity_subform_list, name, data.id);
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

    const charitySubformFields = [
      {
        title: "Charity Name",
        type: "input",
        index: "name"
      },
      {
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "webAddress"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const updateCharitySubformFields = [
      {
        title: "Charity Name",
        type: "input",
        index: "name"
      },
      {
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "webAddress"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "firstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "lastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    // const { handleFormInputChange, role } = this.props;
    const {
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
      <React.Fragment>
        {/* Charity Subform Modal */}
        <AddModal
          title={"Add Charity Information"}
          fields={charitySubformFields}
          isVisible={this.state.isCharitySubformAddModalVisible}
          cbClose={this.setCharitySubformAddModalVisible}
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
          create={this.createCharitySubform}
        />


        <UpdateModal
          title={"Update Charity Information"}
          fields={updateCharitySubformFields}
          isVisible={this.state.isCharitySubformUpdateModalVisible}
          cbClose={this.setCharitySubformUpdateModalVisible}
          cbUpdate={this.updateCharitySubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />


        <Header image={support} title={"Charity Information"} />

        <Add
          title={"Charity Subform"}
          button={"Add Charity Subform"}
          cbAdd={this.setCharitySubformAddModalVisible}
        />

        {
          // get charity subform row
          this.state.charity_subform_list.map((data, index) =>
            this.getCharitySubformRow({ data, index: index + 1 })
          )
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
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  console.log("in map siaptach to props");

  return {
    // dispatching plain actions
    handleClientInfoObject: (data) => {
      console.log("in map siaptach tssjjshio props");
      dispatch(setClientInfoObject({ ...data }))
    },
  };
};

const mapStateToProps = (state) => {
  // console.log("all inventries",state.rootReducer.clientInfo.clientInfoObject);

  return {
    clientInfoObject: state.rootReducer.clientInfo.clientInfoObject
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CharityInformationSubForm);
