import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Form, Input } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import retirement from "../../../assets/images/latest/retirement2.png";
import UpdateModal from "../components/updatemodal";

const formName = "childCustody";

class SeparatePropertyAccountDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retirement_details: [],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      updateObject: null,
    };
  }

  componentDidMount() {
    if (
      this.props.divorceObject.childCustody &&
      this.props.divorceObject.childCustody.hasOwnProperty("child_custody")
    )
      this.setState({
        custody_rows: this.props.divorceObject.childCustody.child_custody,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }



    // to handle hide and show for  add modal
    setAddModalVisible = () => {
      if (this.state.isAddModalVisible)
        this.setState({ isAddModalVisible: false });
      else this.setState({ isAddModalVisible: true });
    };
  
    // to handle hide and show for update modal
    setUpdateModalVisible = () => {
      if (this.state.isUpdateModalVisible)
        this.setState({ isUpdateModalVisible: false });
      else this.setState({ isUpdateModalVisible: true });
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
    deleteSelectedRow = (idx) => {
  const {retirement_details} = this.state

      const updatedRows = retirement_details.filter((row, index) => {
        return index != idx - 1;
      });
  
     
        this.setState({
          retirement_details: updatedRows,
        });
 
    };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });

  const {retirement_details} = this.state


    // get selected row (this will return array of object)
    let selectedRow = retirement_details.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


    //  function to update a specific retirement details row
    updateRetirementDetails = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { retirement_details, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      retirement_details = [...this.state.retirement_details]; // important to create a copy, otherwise you'll modify state outside of setState call
      retirement_details[index] = obj; // replace current updated object in retirement_details based on index
      this.setState({ retirement_details });
    };


      // function to create retirement details row (data)
  createRetirementDetails = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in retirement_details list with keeping old data
    this.setState({
      retirement_details: [...this.state.retirement_details, currentFormData.formData],
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


  getRow = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Name of Asset:</span>
              <span className="custom-field-value-style"> {data.AssetName}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Owner:</span>
              <span className="custom-field-value-style"> {data.AccountOwner}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Type:</span>
              <span className="custom-field-value-style"> {data.AssetType}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Account Value:</span>
              <span className="custom-field-value-style"> {data.AccountValue}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Value as of Date:{" "}
              </span>
              <span className="custom-field-value-style">{data.ValueAsOfDate}</span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
              onClick={() => {

                this.getSelectedRow(index);

                this.setUpdateModalVisible();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="delete"
              onClick={() => {
                this.deleteSelectedRow(index);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  // setAddModalVisible = () => {
  //   if (this.state.isAddModalVisible) this.setState({ isAddModalVisible: false });
  //   else this.setState({ isAddModalVisible: true });
  // };

  render() {
    const childCustody = [
      {
        title: "Child Name",
        dataIndex: "childName",
        key: "childName",
        fields: [
          {
            type: "Input",
            name: "child_name",
          },
        ],
      },
      {
        title: "Legal Custody",
        dataIndex: "legalCustody",
        key: "legalCustody",
        fields: [
          {
            type: "Select",
            name: "legal_custody",
            placeholder: "-Select-",
            values: ["Joint", "Party 1", "Party 2"],
          },
        ],
      },
      {
        title: "Physical Custody",
        dataIndex: "physicalCustody",
        key: "physicalCustody",
        fields: [
          {
            type: "Select",
            name: "physical_custody",
            placeholder: "-Select-",
            values: ["Joint", "Party 1", "Party 2"],
          },
        ],
      },
    ];

    const fields = [
      {
        title: "Asset Name",
        type: "input",
        index:"AssetName"
      },
      {
        title: "Account Owner",
        type: "input",
        index:"AccountOwner"
      },
      {
        title: "Account Value",
        type: "input",
        index:"AccountValue"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"AccountType"
      },
      {
        title: "Value As Of Date",
        type: "date",
        index:"ValueAsOfDate"
      },
    ];


        const update_fields = [
      {
        title: "Asset Name",
        type: "input",
        index:"AssetName"
      },
      {
        title: "Account Owner",
        type: "input",
        index:"AccountOwner"
      },
      {
        title: "Account Value",
        type: "input",
        index:"AccountValue"
      },
      {
        title: "Account Type",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"AccountType"
      },
      {
        title: "Value As Of Date",
        type: "date",
        index:"ValueAsOfDate"
      },
    ];

    const {
      currentForm,

      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
    } = this.props;

    const suffix = (
      <div>
        <span style={{ fontSize: 20 }}>%</span>
      </div>
    );

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Retirement Account Details"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createRetirementDetails}

        />


<UpdateModal
          title={"Update Retriement Details"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateRetirementDetails}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={retirement} title={"Retirement Details"} />
        <Add
          title={"Retirement Account Details"}
          button={"Add New Retirement Account Details"}
          cbAdd={this.setAddModalVisible}
        />

{this.state.retirement_details.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <h2 className="font-weight-bold mb-4">Education Account Details</h2>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Party 1" style={{ fontSize: 17 }}>
              <Input
                placeholder="Enter Percentage Here"
                type={"number"}
                suffix={suffix}
                size={"large"}
                name="percent_party_1"
                onChange={(val) => {
                  handleInputChange(val, currentForm);
                  this.setFormData({
                    [val.target.name]: val.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Party 1" style={{ fontSize: 17 }}>
              <Input
                placeholder="Enter Percentage Here"
                type={"number"}
                suffix={suffix}
                size={"large"}
                name="percent_party_2"
                onChange={(val) => {
                  handleInputChange(val, currentForm);
                  this.setFormData({
                    [val.target.name]: val.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default SeparatePropertyAccountDetailsForm;
