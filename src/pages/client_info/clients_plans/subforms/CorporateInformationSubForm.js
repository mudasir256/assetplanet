import React, { Component } from "react";
import { connect } from "react-redux";
// import { Table, Button, Card, Row, Col } from 'reactstrap';
import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse, Icon } from "antd";
import SubFormTable from "../../../../components/SubFormTable";
import { CORPORATE_TYPES, STATES } from "constants/types";
import { setClientInfoObject } from "../../../../redux/slices/clientInfoSlice";
import moment from "moment";
import Add from "../../../../components/form/components/add";
import AddModal from "../../../../components/form/components/addmodal";
import UpdateModal from "../../../../components/form/components/updatemodal";
import Header from "../../../../components/form/components/header";
import Footer from "../../../../components/form/components/footer";
import support from "../../../../assets/images/latest/support.png";
import DEATH_API from "../../../../apis/death.api";

const dateFormat = "MM/DD/YYYY";

const formName = "corporateInformationForm";
class CorporateInformationSubForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      corporate_subform_list: [],

      formData: {},

      isCorporateSubformAddModalVisible: false,
      isCorporateSubformUpdateModalVisible: false,

      updateObject: null,
      selectedIndex: null
    };

  }

  componentDidMount() {
    if (this.props.checklistObject.clientForm &&
      this.props.checklistObject.clientForm.hasOwnProperty("corporate_subform_list")
    ) {
      this.setState({ corporate_subform_list: this.props.checklistObject.clientForm.corporate_subform_list, });
    }
    try {
      (async () => {
        this.props.handleLoader();
        let data = await DEATH_API.getCorporateInfo();
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            corporate_subform_list: data.data.map((item) => {
              return {
                ...item,
                corporateName: item.name,
                corporateType: item.type,
                dateCreated: item.created,
                stateIncorporated: item.state

              }
            }),
          });
        }
      })();
    } catch (error) {
      this.props.handleLoader();
      console.log(error)
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list)
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for dependents subform add modal
  setCorporateSubformAddModalVisible = () => {
    if (this.state.isCorporateSubformAddModalVisible)
      this.setState({ isCorporateSubformAddModalVisible: false });
    else this.setState({ isCorporateSubformAddModalVisible: true });
  };

  // to handle hide and show for dependents subform update modal
  setCorporateSubformUpdateModalVisible = () => {
    if (this.state.isCorporateSubformUpdateModalVisible)
      this.setState({ isCorporateSubformUpdateModalVisible: false });
    else this.setState({ isCorporateSubformUpdateModalVisible: true });
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
      await DEATH_API.deleteCorporateInfo(id)
      this.props.handleLoader();
      const updatedRows = all_rows.filter((row, index) => {
        return index !== idx - 1;
      });

      if (name === "corporate_subform") {
        this.setState(
          { corporate_subform_list: updatedRows, },
          () => { this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list) }
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


  // function to update a specific corporate subform row
  updateCorporateSubformRow = async () => {

    try {
      this.props.handleLoader();
      let obj = {
        ...this.state.updateObject,
        corporateName: this.state.updateObject.name,
        corporateType: this.state.updateObject.type,
        dateCreated: this.state.updateObject.created,
        stateIncorporated: this.state.updateObject.state,

      };
      console.log("object after change...", obj);
      await DEATH_API.updateCorporateInfo(obj.id, obj);
      this.props.handleLoader();

      let { corporate_subform_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      corporate_subform_list = [...this.state.corporate_subform_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      corporate_subform_list[index] = obj; // replace current updated object in corporate_subform_list based on index
      this.setState({ corporate_subform_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list)

      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }

  };


  // function to create corporate subform row(data)
  createCorporateSubform = async (currentFormData) => {

    try {
      this.props.handleLoader();
      console.log("in Corporate submit data");
      let corporateDataCopy = { ...currentFormData };
      console.log("corporateDataCopy", corporateDataCopy.formData)
      const payload = {
        corporates: [corporateDataCopy.formData],
      };
      console.log("payload", payload);
      const res = await DEATH_API.addCorporateInfo(payload);
      this.props.handleLoader();
      console.log("result created...", res);

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

    // add current form data in corporate subform list with keeping old data
    this.setState({
      corporate_subform_list: [...this.state.corporate_subform_list, currentFormData.formData],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.corporate_subform_list)
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


  getCorporateSubformRow = ({ data, index }) => {
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Corporate Name</span>
            <span className="custom-table-value-text">{data.name}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Corporate Type</span>
            <span className="custom-table-value-text">{data.type}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Date Created</span>
            <span className="custom-table-value-text">{moment(data.created).format("DD/MM/YYYY")}</span>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">State Incorporated</span>
            <span className="custom-table-value-text">{data.state}</span>
          </div>
        </Col>
        <Col span={4}>
          <div className="custom-field-alignments">
            <span className="custom-table-text">Actions</span>
            <div className="custom-table-icon-align">
              <Icon style={{ fontSize: "20px" }}
                type="edit"
                onClick={() => {
                  const { corporate_subform_list } = this.state;
                  this.getSelectedRow(index, corporate_subform_list);

                  this.setCorporateSubformUpdateModalVisible();
                }}
              >
              </Icon>

              <Icon style={{ fontSize: "20px" }}
                type="delete"
                onClick={() => {
                  const { corporate_subform_list } = this.state;
                  const name = "corporate_subform";
                  this.deleteSelectedRow(index, corporate_subform_list, name, data.id);
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
    // const colsFormat = [
    //   {
    //     title: "Corporate Name",
    //     dataIndex: "corporateName",
    //     key: "corporateName",
    //     fields: [
    //       {
    //         type: "Input",
    //         name: "corporateName",
    //       },
    //     ],
    //   },
    //   {
    //     title: "Corporate Type",
    //     dataIndex: "corporateType",
    //     key: "corporateType",
    //     fields: [
    //       {
    //         type: "Select",
    //         name: "corporateType",
    //         placeholder: "-Select-",
    //         values: CORPORATE_TYPES,
    //       },
    //     ],
    //   },
    //   {
    //     title: "Date Created",
    //     dataIndex: "creationDate",
    //     key: "creationDate",
    //     fields: [
    //       {
    //         type: "DatePicker",
    //         name: "creationDate",
    //       },
    //     ],
    //   },
    //   {
    //     title: "State Incorporated",
    //     dataIndex: "stateIncorporated",
    //     key: "stateIncorporated",
    //     fields: [
    //       {
    //         type: "Select",
    //         name: "stateIncorporated",
    //         placeholder: "-Select-",
    //         values: STATES,
    //       },
    //     ],
    //   },
    // ];

    const corporateSubformFields = [
      {
        title: "Corporate Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index: "name"
      },
      {
        title: "Corporate Type",
        type: "select",
        options: CORPORATE_TYPES,
        index: "type"
      },
      {
        title: "Date Created",
        type: "date",
        index: "created"
      },
      {
        title: "State Incorporated",
        type: "select",
        options: ['Alabama', 'Alaska', 'Arizona'],
        index: "state"
      },
    ];

    const updateCorporateSubformFields = [
      {
        title: "Corporate Name",
        type: "select",
        options: ['Frank and Tracy Trust - 03/27/2019', 'Trust for test client - 03/25/2019'],
        index: "name"
      },
      {
        title: "Corporate Type",
        type: "select",
        options: CORPORATE_TYPES,
        index: "type"
      },
      {
        title: "Date Created",
        type: "date",
        index: "created"
      },
      {
        title: "State Incorporated",
        type: "select",
        options: ['Alabama', 'Alaska', 'Arizona'],
        index: "state"
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

        {/* Corporate Subform Modal */}
        <AddModal
          title={"Add Corporate Information"}
          fields={corporateSubformFields}
          isVisible={this.state.isCorporateSubformAddModalVisible}
          cbClose={this.setCorporateSubformAddModalVisible}
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
          create={this.createCorporateSubform}
        />

        <UpdateModal
          title={"Update Corporate Information"}
          fields={updateCorporateSubformFields}
          isVisible={this.state.isCorporateSubformUpdateModalVisible}
          cbClose={this.setCorporateSubformUpdateModalVisible}
          cbUpdate={this.updateCorporateSubformRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />


        <Header image={support} title={"Corporate Information"} />


        <Add
          title={"Corporate Information"}
          button={"Add Corporate Subform"}
          cbAdd={this.setCorporateSubformAddModalVisible}
        />

        {
          // get corporate subform row
          this.state.corporate_subform_list.map((data, index) =>
            this.getCorporateSubformRow({ data, index: index + 1 })
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

export default connect(mapStateToProps, mapDispatchToProps)(CorporateInformationSubForm);
