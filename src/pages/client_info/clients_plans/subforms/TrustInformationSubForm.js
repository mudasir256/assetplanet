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

const formName = "trustInformationForm";
class TrustInformationSubForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trust_subform_list: [],

      formData: {},

      isTrustSubformAddModalVisible: false,
      isTrustSubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null,
    };

  }

  componentDidMount() {
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("trust_subform_list")
    ) {
      this.setState({ trust_subform_list: this.props.checklistObject.clientForm.trust_subform_list, });
    }
    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getTrustInfo();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            trust_subform_list: data.data.map((item) => {
              return {
                ...item,
                trustName: item.name,
                beneficiariesFirstName: item.firstName,
                beneficiariesLastName: item.lastName,
                percentage: item.percentage,

              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }

    this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list)
  }


  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for dependents subform add modal
  setTrustSubformAddModalVisible = () => {
    if (this.state.isTrustSubformAddModalVisible)
      this.setState({ isTrustSubformAddModalVisible: false });
    else this.setState({ isTrustSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setTrustSubformUpdateModalVisible = () => {
    if (this.state.isTrustSubformUpdateModalVisible)
      this.setState({ isTrustSubformUpdateModalVisible: false });
    else this.setState({ isTrustSubformUpdateModalVisible: true });
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
  deleteSelectedRow = async (idx, all_rows, name,id) => {
    try {
      console.log("id",id)
      this.props.handleLoader();
      await DEATH_API.deleteTrustInfo(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });
  
      if (name === "trust_subform") {
        this.setState(
          { trust_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list) }
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


  // function to update a specific trust subform row
  updateTrustSubformRow = async () => {

    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        trustName: this.state.updateObject.name,
        beneficiariesFirstName: this.state.updateObject.firstName,
        beneficiariesLastName: this.state.updateObject.lastName,
        percentage: this.state.updateObject.percentage,

      };
      console.log("object after change...", obj);
      await DEATH_API.updateTrustInfo(obj.id, obj);
      this.props.handleLoader();

      let { trust_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      trust_subform_list = [...this.state.trust_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      trust_subform_list[index] = obj; // replace current updated object in trust_subform_list based on index
      this.setState({ trust_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list)

      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }

  };


  // function to create trust subform row(data)
  createTrustSubform = async (currentFormData) => {

    try {
      this.props.handleLoader();
      console.log("in trust submit data");
      let trustDataCopy = { ...currentFormData };
      console.log("trustDataCopy...", trustDataCopy)
      const payload = {
        trusts: [trustDataCopy.formData],
      };
      console.log("payload", payload);
      const res = await DEATH_API.addTrustInfo(payload);
      this.props.handleLoader();
      console.log("result created...", res);

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

    // add current form data in trust list with keeping old data
    this.setState({
      trust_subform_list: [...this.state.trust_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.trust_subform_list)
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


  getTrustSubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={7}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Trust Name</span>
            <span className="custom-table-value-text">{data.name}</span>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Beneficiaries</span>
            <span className="custom-table-value-text">{data.firstName} {data.lastName}</span>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Percent</span>
            <span className="custom-table-value-text">{data.percentage}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { trust_subform_list } = this.state;
                  this.getSelectedRow(index, trust_subform_list);

                  this.setTrustSubformUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { trust_subform_list } = this.state;
                  const name = "trust_subform";
                  this.deleteSelectedRow(index, trust_subform_list, name, data.id);
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
    const trustSubformFields = [
      {
        title: "Trust Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index: "name"
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
        title: "Percent",
        type: "input",
        index: "percentage"
      },
    ];

    const updateTrustSubformFields = [
      {
        title: "Trust Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index: "name"
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
        title: "Percent",
        type: "input",
        index: "percentage"
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

        {/* Trust Subform Modal */}
        <AddModal
          title={"Add Trust Information"}
          fields={trustSubformFields}
          isVisible={this.state.isTrustSubformAddModalVisible}
          cbClose={this.setTrustSubformAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createTrustSubform}
        />

        <UpdateModal
          title={"Update Trust Information"}
          fields={updateTrustSubformFields}
          isVisible={this.state.isTrustSubformUpdateModalVisible}
          cbClose={this.setTrustSubformUpdateModalVisible}
          cbUpdate={this.updateTrustSubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />

        <Header image={support} title={"Trust Information"} />

        <Add
          title={"Trust Information"}
          button={"Add Trust Subform"}
          cbAdd={this.setTrustSubformAddModalVisible}
        />

        {
          // get trust subform row
          this.state.trust_subform_list.map((data, index) =>
            this.getTrustSubformRow({ data, index: index + 1 })
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


export default connect(mapStateToProps, mapDispatchToProps)(TrustInformationSubForm);
