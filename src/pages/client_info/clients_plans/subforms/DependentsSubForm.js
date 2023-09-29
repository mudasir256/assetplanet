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

const formName = "dependentsForm";
class DependentsSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dependents_subform_list: [],

      formData: {},

      isDependentsSubformAddModalVisible: false,
      isDependentsSubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null,
    };

  }

  componentDidMount() {
    // this.updateFormData(this.props.subFormData);
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("dependents_subform_list")
    ) {
      this.setState({ dependents_subform_list: this.props.checklistObject.clientForm.dependents_subform_list, });
    }
    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getDependentDetails();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            dependents_subform_list: data.data.map((item) => {
              return {
                ...item,
                firstName: item.firstName,
                lastName: item.lastName,
                dob: item.dob,
                gender: item.gender,
                relationship: item.relationship,
                childAge: item.childAge,
                disability: item.disability,
                childTaxCreditsEndAts: item.childTaxEnd
              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list)
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for dependents subform add modal
  setDependentsSubformAddModalVisible = () => {
    if (this.state.isDependentsSubformAddModalVisible)
      this.setState({ isDependentsSubformAddModalVisible: false });
    else this.setState({ isDependentsSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setDependentsSubformUpdateModalVisible = () => {
    if (this.state.isDependentsSubformUpdateModalVisible)
      this.setState({ isDependentsSubformUpdateModalVisible: false });
    else this.setState({ isDependentsSubformUpdateModalVisible: true });
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
      console.log("id", id)
      this.props.handleLoader();
      await DEATH_API.deleteDependentInfo(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });

      if (name === "dependents_subform") {
        this.setState(
          { dependents_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list) }
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

  // function to update a specific dependents subform row
  updateDependentsSubformRow = async () => {

    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        firstName: this.state.updateObject.firstName,
        lastName: this.state.updateObject.lastName,
        dob: this.state.updateObject.dob,
        gender: this.state.updateObject.gender,
        relationship: this.state.updateObject.relationship,
        childAge: this.state.updateObject.childAge,
        disability: this.state.updateObject.disability,
        childTaxCreditsEndAts: this.state.updateObject.childTaxEnd,

      };
      console.log("object after change...", obj);
      await DEATH_API.updateDependentInfo(obj.id, obj);
      this.props.handleLoader();

      let { dependents_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      dependents_subform_list = [...this.state.dependents_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      dependents_subform_list[index] = obj; // replace current updated object in dependents_subform_list based on index
      this.setState({ dependents_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list)

      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }

  };


  // function to create dependents subform row(data)
  createDependentsSubform = async (currentFormData) => {
    try {
      this.props.handleLoader();
      console.log("in Dependent submit data");
      let dependentDataCopy = { ...currentFormData };
      console.log("dependentDataCopy", dependentDataCopy.formData)
      const payload = {
        dependents: [dependentDataCopy.formData],
      };
      console.log("payload", payload);
      const res = await DEATH_API.addDependentInfo(payload);
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

    // add current form data in dependents list with keeping old data
    this.setState({
      dependents_subform_list: [...this.state.dependents_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.dependents_subform_list)
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

  getDependentsSubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Dependent</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">DOB</span>
            <span className="custom-table-value-text">{moment(data.dob).format("DD/MM/YYYY")}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.relationship}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Child Age</span>
            <span className="custom-table-value-text">{data.childAge}
           
              </span>
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
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { dependents_subform_list } = this.state;
                  this.getSelectedRow(index, dependents_subform_list);

                  this.setDependentsSubformUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { dependents_subform_list } = this.state;
                  const name = "dependents_subform";
                  this.deleteSelectedRow(index, dependents_subform_list, name, data.id);
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
    const dependentsSubformFields = [
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
        title: "Date of Birth",
        type: "date",
        index: "dob"
      },
      {
        title: "relationship",
        type: "select",
        options: ["Child", "Parent", "Grandparent", "GrandChild"],
        index: "relationship"
      },
      {
        title: "Child Age",
        type: "input",
        index: "childAge"
      },
      {
        title: "Gender",
        type: "select",
        options: ["Male", "Female"],
        index: "gender"
      },
      {
        title: "Disability",
        type: "select",
        options: ["Yes", "No"],
        index: "disability"
      },
      {
        title: "Child Tax Credits End At",
        type: "select",
        options: ["17 (lives at home - Child Credit)", "24 (Goes to College - Child Credit)", "Over 17 (Qualifies as Dependent Deduction)"],
        index: "childTaxEnd"
      }
    ];

    const updateDependentsSubformFields = [
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
        title: "Date of Birth",
        type: "date",
        index: "dob"
      },
      {
        title: "relationship",
        type: "select",
        options: ['Child', 'Parent', 'Grandparent', 'GrandChild'],
        index: "relationship"
      },
      {
        title: "Child Age",
        type: "input",
        index: "childAge"
      },
      {
        title: "Gender",
        type: "select",
        options: ['Male', 'Female'],
        index: "gender"
      },
      {
        title: "Disability",
        type: "select",
        options: ['Yes', 'No'],
        index: "disability"
      },
      {
        title: "Child Tax Credits End At",
        type: "select",
        options: ['17 (lives at home - Child Credit)', '24 (Goes to College - Child Credit)', 'Over 17 (Qualifies as Dependent Deduction)'],
        index: "childTaxEnd"
      }
    ];

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
        <AddModal
          title={"Add Dependents"}
          fields={dependentsSubformFields}
          isVisible={this.state.isDependentsSubformAddModalVisible}
          cbClose={this.setDependentsSubformAddModalVisible}
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
          create={this.createDependentsSubform}
        />

        <UpdateModal
          title={"Update Dependents Subform"}
          fields={updateDependentsSubformFields}
          isVisible={this.state.isDependentsSubformUpdateModalVisible}
          cbClose={this.setDependentsSubformUpdateModalVisible}
          cbUpdate={this.updateDependentsSubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />


        <Header image={support} title={"Dependents"} />


        <Add
          title={"Dependents"}
          button={"Add Dependents"}
          cbAdd={this.setDependentsSubformAddModalVisible}
        />

        {
          // get dependents subform row
          this.state.dependents_subform_list.map((data, index) =>
            this.getDependentsSubformRow({ data, index: index + 1 })
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

export default connect(mapStateToProps, mapDispatchToProps)(DependentsSubForm);
