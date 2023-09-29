import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse, Icon } from "antd";
import SubFormTable from "../../../../components/SubFormTable";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";
import Add from "../../../../components/form/components/add";
import AddModal from "../../../../components/form/components/addmodal";
import UpdateModal from "../../../../components/form/components/updatemodal";
import Header from "../../../../components/form/components/header";
import support from "../../../../assets/images/latest/support.png";
import swal from 'sweetalert';
import DEATH_API from "../../../../apis/death.api";

const formName = "othersImpactedForm";
class OthersImpactedSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      financial_subform_list: [],

      formData: {},

      isFinancialSubformAddModalVisible: false,
      isFinancialSubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null
    };

  }

  componentDidMount() {
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("financial_subform_list")
    ) {
      this.setState({ financial_subform_list: this.props.checklistObject.clientForm.financial_subform_list, });
    }
    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getOtherImpacts();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            financial_subform_list: data.data.map((item) => {
              return {
                ...item,
                relationship: item.relationship,
                firstName: item.firstName,
                lastName: item.lastName,
                phone: item.phone,
                web: item.website,
                email: item.email,
                personFirstName: item.personFirstName,
                personLastName: item.personLastName,
                notes: item.notes,

              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list)
  }


  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for financial subform add modal
  setFinancialSubformAddModalVisible = () => {
    if (this.state.isFinancialSubformAddModalVisible)
      this.setState({ isFinancialSubformAddModalVisible: false });
    else this.setState({ isFinancialSubformAddModalVisible: true });
  };

  // to handle hide and show for financial subform update modal
  setFinancialSubformUpdateModalVisible = () => {
    if (this.state.isFinancialSubformUpdateModalVisible)
      this.setState({ isFinancialSubformUpdateModalVisible: false });
    else this.setState({ isFinancialSubformUpdateModalVisible: true });
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
      await DEATH_API.deleteOtherImpacts(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });

      if (name === "financial_subform") {
        this.setState(
          { financial_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list) }
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


  // function to update a specific financial subform row
  updateFinancialSubformRow = async () => {

    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        relationship: this.state.updateObject.relationship,
        firstName: this.state.updateObject.firstName,
        lastName: this.state.updateObject.lastName,
        phone: this.state.updateObject.phone,
        web: this.state.updateObject.website,
        email: this.state.updateObject.email,
        personFirstName: this.state.updateObject.personFirstName,
        personLastName: this.state.updateObject.personLastName,
        notes: this.state.updateObject.notes,

      };
      console.log("object after change...", obj);
      await DEATH_API.updateOtherImpacts(obj.id, obj);
      this.props.handleLoader();

      let { financial_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      financial_subform_list = [...this.state.financial_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      financial_subform_list[index] = obj; // replace current updated object in financial_subform_list based on index
      this.setState({ financial_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list)
      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }

  };


  // function to create financial subform row(data)
  createFinancialSubform = async (currentFormData) => {


    try {
      this.props.handleLoader();
      console.log("in Spouse submit data");
      let otherImpactsDataCopy = { ...currentFormData };
      console.log("otherImpactsDataCopy", otherImpactsDataCopy.formData)
      const payload = {
        otherImpacts: [otherImpactsDataCopy.formData],
      };
      console.log("payload", payload);
      const res = await DEATH_API.addOtherImpacts(payload);
      this.props.handleLoader();
      console.log("result create...", res);

    } catch (error) {
      this.props.handleLoader();
      console.log(error);
    }

    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in financial subform list with keeping old data
    this.setState({
      financial_subform_list: [...this.state.financial_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.financial_subform_list)
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


  getFinancialSubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Relationship</span>
            <span className="custom-table-value-text">{data.relationship}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Name</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
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
            <span className="custom-table-value-text">{data.website}</span>
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
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { financial_subform_list } = this.state;
                  this.getSelectedRow(index, financial_subform_list);

                  this.setFinancialSubformUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { financial_subform_list } = this.state;
                  const name = "financial_subform";
                  this.deleteSelectedRow(index, financial_subform_list, name, data.id);
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

    const financialSubformFields = [
      {
        title: "Relationship",
        type: "select",
        options: ['Child', 'Parent', 'Grandparent', 'GrandChild'],
        index: "relationship"
      },
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
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "website"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
    ];

    const updateFinancialSubformFields = [
      {
        title: "Relationship",
        type: "select",
        options: ['Child', 'Parent', 'Grandparent', 'GrandChild'],
        index: "relationship"
      },
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
        title: "Phone",
        type: "phone",
        index: "phone"
      },
      {
        title: "Website",
        type: "web",
        index: "website"
      },
      {
        title: "Email",
        type: "input",
        index: "email"
      },
      {
        title: "Person First Name",
        type: "input",
        index: "personFirstName"
      },
      {
        title: "Person Last Name",
        type: "input",
        index: "personLastName"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "notes"
      },
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

        {/* Others ImpactedModal */}
        <AddModal
          title={"Add Others Impacted"}
          fields={financialSubformFields}
          isVisible={this.state.isFinancialSubformAddModalVisible}
          cbClose={this.setFinancialSubformAddModalVisible}
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
          create={this.createFinancialSubform}
        />


        <UpdateModal
          title={"Update Others Impacted"}
          fields={updateFinancialSubformFields}
          isVisible={this.state.isFinancialSubformUpdateModalVisible}
          cbClose={this.setFinancialSubformUpdateModalVisible}
          cbUpdate={this.updateFinancialSubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />


        <Header image={support} title={"Others Impacted"} />


        <Add
          title={"Others Impacted"}
          button={"Add Others Impacted"}
          cbAdd={this.setFinancialSubformAddModalVisible}
        />

        {
          // get financial subform row
          this.state.financial_subform_list.map((data, index) =>
            this.getFinancialSubformRow({ data, index: index + 1 })
          )
        }

        <div className="row justify-content-between">
          <div className="col-8">
            <Button
              type="primary"
              size={"large"}
              onClick={() => this.props.previousForm()}
              style={{ background: "#39b54a", width: "20%" }}
            >
              Previous
            </Button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={() => {
                // console.log("FORM DATA ", this.props.divorceObject);
                swal("Success!", "You data has been saved!", "success").then(() => this.props.navigate("/clients/plans"))
              }}
              style={{ background: "#39b54a", width: "30%" }}
            >
              Finish
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

export default connect(mapStateToProps, mapDispatchToProps)(OthersImpactedSubForm);
