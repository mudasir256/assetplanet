import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import Add from "../components/add";
import AddModal from "../components/addmodal";
import insurance from "../../../assets/images/insurance.png";
import UpdateModal from "../components/updatemodal";

const formName = "childCustody";

class CustodyDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custody_rows: [],
      formData: {},
      isVisible: false,
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
  const {custody_rows} = this.state

      const updatedRows = custody_rows.filter((row, index) => {
        return index != idx - 1;
      });
  
     
        this.setState({
          custody_rows: updatedRows,
        });
 
    };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });

  const {custody_rows} = this.state


    // get selected row (this will return array of object)
    let selectedRow = custody_rows.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


    //  function to update a specific custody details row
    updateCustodyDetails = () => {
      let obj = {
        ...this.state.updateObject,
      };
  
      let { custody_rows, selectedIndex } = this.state;
      let index = selectedIndex - 1;
  
      custody_rows = [...this.state.custody_rows]; // important to create a copy, otherwise you'll modify state outside of setState call
      custody_rows[index] = obj; // replace current updated object in custody_rows based on index
      this.setState({ custody_rows });
    };


      // function to create custody details row (data)
  createCustodyDetails = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        formData: {},
      });
    }

    // add current form data in custody_rows list with keeping old data
    this.setState({
      custody_rows: [...this.state.custody_rows, currentFormData.formData],
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
              <span className="custom-field-heading-style">Child Name:</span>
              <span className="custom-field-value-style"> {data.ChildName}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Legal Custody:</span>
              <span className="custom-field-value-style"> {data.LegalCustody}</span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Physical Custody:{" "}
              </span>
              <span className="custom-field-value-style">  {data.PhysicalCustody}</span>
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

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

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
        title: "Child Name",
        type: "input",
        index:"ChildName"
      },
      {
        title: "Legal Custody",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"LegalCustody"
      },
      {
        title: "Physical Custody",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"PhysicalCustody"
      },
    ];


    const update_fields = [
      {
        title: "Child Name",
        type: "input",
        index:"ChildName"
      },
      {
        title: "Legal Custody",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"LegalCustody"
      },
      {
        title: "Physical Custody",
        type: "select",
        options: ["Joint", "Party 1", "Party 2"],
        index:"PhysicalCustody"
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

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Child"}
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
          create={this.createCustodyDetails}
        />


<UpdateModal
          title={"Update New Child"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateCustodyDetails}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />

        <Header image={insurance} title={"Custody Details"} />
        <Add
          title={"Child Custody"}
          button={"Add New Custody"}
          cbAdd={this.setAddModalVisible}
        />

        {this.state.custody_rows.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default CustodyDetailsForm;
