import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import budget from "../../../assets/images/budget.png";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";

const formName = "budgetChanges";

class BudgetChangesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget_party_1: [{BudgetItem:"Car",CurrentValue:"50",NewValue:"70",BudgetAmount:"100",ResponsibleAmountParty:"600"}],
      budget_party_2: [{BudgetItem:"Car",CurrentValue:"50",NewValue:"70",BudgetAmount:"100",ResponsibleAmountParty:"600"}],
      formData: {},
      isParty1AddModalVisible: false,
      isParty2AddModalVisible: false,
      isParty1UpdateModalVisible: false,
      isParty2UpdateModalVisible: false,
      updateObject: null,
      selectedIndex:null

    };
  }

  componentDidMount() {
    if (
      this.props.divorceObject.budgetChanges &&
      this.props.divorceObject.budgetChanges.hasOwnProperty("budget_party_1")
    )
      this.setState({
        budget_party_1: this.props.divorceObject.budgetChanges.budget_party_1,
      });

    if (
      this.props.divorceObject.budgetChanges &&
      this.props.divorceObject.budgetChanges.hasOwnProperty("budget_party_2")
    )
      this.setState({
        budget_party_2: this.props.divorceObject.budgetChanges.budget_party_2,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for Budget Party 1 add modal
  setParty1AddModalVisible = () => {
    if (this.state.isParty1AddModalVisible)
      this.setState({ isParty1AddModalVisible: false });
    else this.setState({ isParty1AddModalVisible: true });
  };

  // to handle hide and show for Budget Party 2  add modal
  setParty2AddModalVisible = () => {
    if (this.state.isParty2AddModalVisible)
      this.setState({ isParty2AddModalVisible: false });
    else this.setState({ isParty2AddModalVisible: true });
  };

  // to handle hide and show for Budget Party 1 update modal
  setParty1UpdateModalVisible = () => {
    if (this.state.isParty1UpdateModalVisible)
      this.setState({ isParty1UpdateModalVisible: false });
    else this.setState({ isParty1UpdateModalVisible: true });
  };

  // to handle hide and show for Budget Party 2 update modal
  setParty2UpdateModalVisible = () => {
    if (this.state.isParty2UpdateModalVisible)
      this.setState({ isParty2UpdateModalVisible: false });
    else this.setState({ isParty2UpdateModalVisible: true });
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
          return index != idx - 1;
        });
    
        if (name == "party_1") {
          this.setState({
            budget_party_1: updatedRows,
          });
        } else {
          this.setState({
            budget_party_2: updatedRows,
          });
        }
      };
  
  
    // Function to get selected  array (row)
    getSelectedRow = (idx, rows, name) => {
      this.setState({
        selectedIndex: idx,
      });
  
      // get selected row (this will return array of object)
      let selectedRow = rows.filter((row, index) => {
        return index == idx - 1;
      });
  
      // get first and only element from list and store it in update object
      this.setState({
        updateObject: { ...this.state.updateObject, ...selectedRow[0] },
      });
    };


//  function to update a specific Budget Party 1 row
updateParty1Row = () => {
  let obj = {
    ...this.state.updateObject,
  };

  let { budget_party_1, selectedIndex } = this.state;
  let index = selectedIndex - 1;

  budget_party_1 = [...this.state.budget_party_1]; // important to create a copy, otherwise you'll modify state outside of setState call
  budget_party_1[index] = obj; // replace current updated object in budget_party_1 based on index
  this.setState({ budget_party_1 });
};


  //  function to update a specific Budget Party 2 row
  updateParty2Row = () => {
    let obj = {
      ...this.state.updateObject,
    };

    let { budget_party_2, selectedIndex } = this.state;
    let index = selectedIndex - 1;

    budget_party_2 = [...this.state.budget_party_2]; // important to create a copy, otherwise you'll modify state outside of setState call
    budget_party_2[index] = obj; // replace current updated object in budget_party_2 based on index
    this.setState({ budget_party_2 });
  };


// function to create Budget Party 1 row (data)
createParty1 = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in budget_party_1 list with keeping old data
  this.setState({
    budget_party_1: [...this.state.budget_party_1, currentFormData.formData],
  });
};

// function to create Budget Party 2 row(data)
createParty2 = (currentFormData) => {

  // checxk if already formData contains some data then initialize it with empty
  if (Object.keys(this.state.formData).length > 0) {
    this.setState({
      formData: {},
    });
  }

  // add current form data in budget_party_2 list with keeping old data
  this.setState({
    budget_party_2: [...this.state.budget_party_2, currentFormData.formData],
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
  getParty1Row = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Budget Item:</span>
              <span className="custom-field-value-style"> {data.BudgetItem}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Budget Amount:</span>
              <span className="custom-field-value-style"> {data.BudgetAmount}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
        <div className="custom-field-alignments">
        <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Current Value:</span>
              <span className="custom-field-value-style"> {data.CurrentValue}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Responsible Amount:</span>
              <span className="custom-field-value-style"> {data.ResponsibleAmountParty}</span>
            </div>



          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
          <div className="custom-filed-margin">
              <span className="custom-field-heading-style">New Value:</span>
              <span className="custom-field-value-style"> {data.NewValue}</span>
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
                const { budget_party_1 } = this.state;
                this.getSelectedRow(index, budget_party_1);

                this.setParty1UpdateModalVisible();
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
                const { budget_party_1 } = this.state;
                const name = "party_1";
                this.deleteSelectedRow(index, budget_party_1, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };



  getParty2Row = ({data,index}) => {
    return (
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Budget Item:</span>
              <span className="custom-field-value-style"> {data.BudgetItem}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Budget Amount:</span>
              <span className="custom-field-value-style"> {data.BudgetAmount}</span>
            </div>
          </div>
        </Col>
        <Col span={7}>
        <div className="custom-field-alignments">
        <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Current Value:</span>
              <span className="custom-field-value-style"> {data.CurrentValue}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Responsible Amount:</span>
              <span className="custom-field-value-style"> {data.ResponsibleAmountParty}</span>
            </div>



          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
          <div className="custom-filed-margin">
              <span className="custom-field-heading-style">New Value:</span>
              <span className="custom-field-value-style"> {data.NewValue}</span>
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
                const { budget_party_2 } = this.state;
                this.getSelectedRow(index, budget_party_2);

                this.setParty2UpdateModalVisible();
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
                const { budget_party_2 } = this.state;
                const name = "party_2";
                this.deleteSelectedRow(index, budget_party_2, name);
              }}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const budgetParty1 = [
      {
        title: "Budget Item",
        dataIndex: "budgetItem",
        key: "budgetItem",
        fields: [
          {
            type: "Input",
            name: "budget_item",
          },
        ],
      },
      {
        title: "Budget Amount",
        dataIndex: "budgetAmount",
        key: "budgetAmount",
        fields: [
          {
            type: "Currency",
            name: "budget_amount",
          },
        ],
      },
      {
        title: "Current Value",
        dataIndex: "currentValue",
        key: "currentValue",
        fields: [
          {
            type: "Currency",
            name: "current_value",
          },
        ],
      },
      {
        title: "New Value",
        dataIndex: "newValue",
        key: "newValue",
        fields: [
          {
            type: "Currency",
            name: "new_value",
          },
        ],
      },
      {
        title: "Amount Party 2 is Responsible For",
        dataIndex: "amountOfParty",
        key: "amountOfParty",
        fields: [
          {
            type: "Input",
            name: "amount_of_party",
          },
        ],
      },
    ];

    const budgetParty2 = [
      {
        title: "Budget Item",
        dataIndex: "budgetItem",
        key: "budgetItem",
        fields: [
          {
            type: "Input",
            name: "budget_item",
          },
        ],
      },
      {
        title: "Budget Amount",
        dataIndex: "budgetAmount",
        key: "budgetAmount",
        fields: [
          {
            type: "Currency",
            name: "budget_amount",
          },
        ],
      },
      {
        title: "Current Value",
        dataIndex: "currentValue",
        key: "currentValue",
        fields: [
          {
            type: "Currency",
            name: "current_value",
          },
        ],
      },
      {
        title: "New Value",
        dataIndex: "newValue",
        key: "newValue",
        fields: [
          {
            type: "Currency",
            name: "new_value",
          },
        ],
      },
      {
        title: "Amount Party 1 is Responsible For",
        dataIndex: "amountOfParty",
        key: "amountOfParty",
        fields: [
          {
            type: "Input",
            name: "amount_of_party",
          },
        ],
      },
    ];

    const fields_party_1 = [
      {
        title: "Budget Item",
        type: "input",
        index:"BudgetItem"
      },

      {
        title: "Current Value",
        type: "input",
        index:"CurrentValue"
      },
      {
        title: "New Value",
        type: "input",
        index:"NewValue"
      },
      {
        title: "Budget Amount",
        type: "currency",
        index:"BudgetAmount"
      },
      {
        title: "Responsible Amount Party",
        type: "currency",
        index:"ResponsibleAmountParty"
      },
    ];

    const fields_party_2 = [
      {
        title: "Budget Item",
        type: "input",
        index:"BudgetItem"
      },

      {
        title: "Current Value",
        type: "input",
        index:"CurrentValue"
      },
      {
        title: "New Value",
        type: "input",
        index:"NewValue"
      },
      {
        title: "Budget Amount",
        type: "currency",
        index:"BudgetAmount"
      },
      {
        title: "Responsible Amount Party",
        type: "currency",
        index:"ResponsibleAmountParty"
      },
    ];

    const update_fields_party_1 = [
      {
        title: "Budget Item",
        type: "input",
        index:"BudgetItem"
      },

      {
        title: "Current Value",
        type: "input",
        index:"CurrentValue"
      },
      {
        title: "New Value",
        type: "input",
        index:"NewValue"
      },
      {
        title: "Budget Amount",
        type: "currency",
        index:"BudgetAmount"
      },
      {
        title: "Responsible Amount Party",
        type: "currency",
        index:"ResponsibleAmountParty"
      },
    ];

    const update_fields_party_2 = [
      {
        title: "Budget Item",
        type: "input",
        index:"BudgetItem"
      },

      {
        title: "Current Value",
        type: "input",
        index:"CurrentValue"
      },
      {
        title: "New Value",
        type: "input",
        index:"NewValue"
      },
      {
        title: "Budget Amount",
        type: "currency",
        index:"BudgetAmount"
      },
      {
        title: "Responsible Amount Party",
        type: "currency",
        index:"ResponsibleAmountParty"
      },
    ];
    

    const {
      currentForm,

      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Budget Change"}
          fields={fields_party_1}
          isVisible={this.state.isParty1AddModalVisible}
          cbClose={this.setParty1AddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createParty1}
        />

          <UpdateModal
          title={"Update Budget Part 1"}
          fields={update_fields_party_1}
          isVisible={this.state.isParty1UpdateModalVisible}
          cbClose={this.setParty1UpdateModalVisible}
          cbUpdate={this.updateParty1Row}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />


        <AddModal
          title={"Add New Budget Change"}
          fields={fields_party_2}
          isVisible={this.state.isParty2AddModalVisible}
          cbClose={this.setParty2AddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createParty2}
        />



<UpdateModal
          title={"Update Budget Part 2"}
          fields={update_fields_party_2}
          isVisible={this.state.isParty2UpdateModalVisible}
          cbClose={this.setParty1UpdateModalVisible}
          cbUpdate={this.updateParty2Row}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

          // onConstraints={this.onConstraints}
        />
        <Header image={budget} title={"Budget Changes"} />

        <Add
          title={"Budget Party 1"}
          button={"Add New Budget Change"}
          cbAdd={this.setParty1AddModalVisible}
        />

        {/* {this.getRow(1)}
        {this.getRow(2)} */}

        {this.state.budget_party_1.map((data, index) =>
          this.getParty1Row({ data, index: index + 1 })
        )}

        <Add
          title={"Budget Party 2"}
          button={"Add New Budget Change"}
          cbAdd={this.setParty2AddModalVisible}
        />

        {/* {this.getRow(1)}
        {this.getRow(2)} */}

        {this.state.budget_party_2.map((data, index) =>
          this.getParty2Row({ data, index: index + 1 })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default BudgetChangesForm;
