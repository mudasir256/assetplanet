import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import swal from "sweetalert";

const formName = "InsuranceForm";

class InsuranceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurance_rows: [
        {Subcategory:"ABC",StartDate:"10/6/2022",EndDate:"12/8/2022",Frequency:"ABC",Budget:"1200",Actual:"1287",
        FutureAmount:"4500",DeductibleNow:"No",DateOfChange:"08/02/2022",Who:"ABC",Description:"This is descroption"
        ,InflationRate:"DEF",DeductibleRetirement:"Yes"}
      ],
      formData: {Actual:"",Budget:"",FutureAmount:""},
      isUpdate: false,
      updateObject: null,
      isVisible: false,
      selectedIndex:null
    };
  }

  componentDidMount() {
    if (
      this.props.budgetObject.InsuranceForm &&
      this.props.budgetObject.InsuranceForm.hasOwnProperty("insurance_rows")
    )
      this.setState({
        insurance_rows: this.props.budgetObject.InsuranceForm.insurance_rows,
      });

      this.props.handleBudgetObject(this.props.currentForm,this.state.insurance_rows)

  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // display all charity data 
  getRow = ({ data,index }) => {
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
              <span className="custom-field-heading-style">Subcategory:</span>
              <span className="custom-field-value-style"> {data.Subcategory}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Description:</span>
              <span className="custom-field-value-style"> {data.Description}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Start Date:</span>
              <span className="custom-field-value-style"> {data.StartDate}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Date of Change:
              </span>
              <span className="custom-field-value-style"> {data.DateOfChange}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Deductible Retirement:
              </span>
              <span className="custom-field-value-style"> {data.DeductibleRetirement}</span>
            </div>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Budget:</span>
              <span className="custom-field-value-style"> {data.Budget}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Who:</span>
              <span className="custom-field-value-style"> {data.Who}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">End Date:</span>
              <span className="custom-field-value-style"> {data.EndDate}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Inflation Rate:
              </span>
              <span className="custom-field-value-style"> {data.InflationRate}</span>
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Actual:</span>
              <span className="custom-field-value-style"> {data.Actual}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Frequency:</span>
              <span className="custom-field-value-style"> {data.Frequency}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Future Amount:</span>
              <span className="custom-field-value-style"> {data.FutureAmount}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Deductible Now:
              </span>
              <span className="custom-field-value-style"> {data.DeductibleNow}</span>
            </div>
          </div>
        </Col>

        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="edit"
                    onClick={()=>{
                      this.getSelectedCharityRow(index)

                    this.setUpdate();

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
              onClick={()=>{this.deleteSelectedCharityRow(index)}}
            ></Button>
          </div>
        </Col>
      </Row>
    );
  };


  // to handle hide and show for add modal
  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

  // to handle hide and show for update modal
  setUpdate = () => {
    if (this.state.isUpdate) this.setState({ isUpdate: false });
    else this.setState({ isUpdate: true });
  };

 // function to store updated values of all fields in updateObject 
 onUpdateChange = (val,index) => {
  this.setState({
    updateObject:{
      ...this.state.updateObject,
      [index]:val
    }
  })
 }
 
 // capture date chnage in update modal
 handleDateChange = ( date, dateString, index) => {
   this.onUpdateChange( dateString,index);
 };

// Function to get selected charity row
 getSelectedCharityRow = (idx) => {

  this.setState({
    selectedIndex:idx
  })

  // get selected row (this will return array of object)
  const {insurance_rows} = this.state
  let selectedRow = insurance_rows.filter((row,index)=>{
    return index == idx-1
  })

// get first and only element and store it in update object
  this.setState({
    updateObject:{...this.state.updateObject,
      ...selectedRow[0]     
    }
  })

 }


//  function to update a specific charity row
updateCharityRow = () => {
let obj = {
  ...this.state.updateObject
}

let { insurance_rows,selectedIndex } = this.state;
let index = selectedIndex -1 

insurance_rows = [...this.state.insurance_rows] // important to create a copy, otherwise you'll modify state outside of setState call
insurance_rows[index] = obj;        // replace current updated object in insurance_rows based on index
this.setState({insurance_rows},()=>{
  this.props.handleBudgetObject(this.props.currentForm,this.state.insurance_rows)

});


}

  // Function to delete selected row
  deleteSelectedCharityRow = (idx) =>{

    swal({
      title: "Are you sure?",
      text: "You want to delete this message.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const {insurance_rows} = this.state
    const updatedRows = insurance_rows.filter((row,index)=>{
      return index != idx-1
    })

    this.setState({
      insurance_rows: updatedRows
    },()=>{
      this.props.handleBudgetObject(this.props.currentForm,this.state.insurance_rows)

    })
      } else {
        // swal("Your imaginary file is safe!");
      }
    });

  }


 
  // function to display charity rows(all data)
  create = (currentFormData) => {

    // checxk if already formData contains some data then initialize it with empty
    if(Object.keys(this.state.formData).length>0){
      this.setState({
        formData:{}
      })
    }
    // console.log("currentFormdata",currentFormData.formData);

    // add current form data in charity_rowss list with keeping old data
    this.setState({
      insurance_rows:[...this.state.insurance_rows,
      currentFormData.formData
      ]},()=>{
      this.props.handleBudgetObject(this.props.currentForm,this.state.insurance_rows)

      })

  }


  setFormData = (value) => {
    this.setState({
     formData:{
      ...this.state.formData,
      ...value 
     }
    })

  }
  render() {


    
    const fields = [
      {
        title: "Sub Category",
        type: "select",
        options: ["Abc", "Def"],
        index:"Subcategory"
      },
      {
        title: "Start Date",
        type: "date",
        index:"StartDate"
      },
      {
        title: "End Date",
        type: "date",
        index:"EndDate"
      },

      {
        title: "Frequency",
        type: "select",
        options: ["Abc", "Def"],
        index:"Frequency"
      },
      {
        title: "Who",
        type: "select",
        options: ["Abc", "Def"],
        index:"Who"
      },
      {
        title: "Inflation Rate",
        type: "select",
        options: ["Abc", "Def"],
        index:"InflationRate"
      },

      {
        title: "Actual",
        type: "currency",
        index:"Actual"
      },
      {
        title: "Budget",
        type: "currency",
        index:"Budget"
      },
      {
        title: "Future Amount",
        type: "currency",
        index:"FutureAmount"
      },
      {
        title: "Description",
        type: "textarea",
        index:"Description"
      },

      {
        title: "Deductible Now",
        type: "radio",
        index:"DeductibleNow"
      },
      {
        title: "Deductible Retirement",
        type: "radio",
        index:"DeductibleRetirement"
      },
      {
        title: "Date Of Change",
        type: "date",
        index:"DateOfChange"
      },
    ];



    const fields_update = [
      {
        title: "Sub Category",
        type: "select",
        options: ["Abc", "Def"],
        index:"Subcategory"
      },
      {
        title: "Start Date",
        type: "date",
        index:"StartDate"
      },
      {
        title: "End Date",
        type: "date",
        index:"EndDate"
      },

      {
        title: "Frequency",
        type: "select",
        options: ["Abc", "Def"],
        index:"Frequency"
      },
      {
        title: "Who",
        type: "select",
        options: ["Abc", "Def"],
        index:"Who"
      },
      {
        title: "Inflation Rate",
        type: "select",
        options: ["Abc", "Def"],
        index:"InflationRate"
      },

      {
        title: "Actual",
        type: "currency",
        index:"Actual"
      },
      {
        title: "Budget",
        type: "currency",
        index:"Budget"
      },
      {
        title: "Future Amount",
        type: "currency",
        index:"FutureAmount"
      },
      {
        title: "Description",
        type: "textarea",
        index:"Description"
      },

      {
        title: "Deductible Now",
        type: "radio",
        index:"DeductibleNow"
      },
      {
        title: "Deductible Retirement",
        type: "radio",
        index:"DeductibleRetirement"
      },
      {
        title: "Date Of Change",
        type: "date",
        index:"DateOfChange"
      },
    ];

    // destructure props
    const { handleCurrencyChange,handleRadioChange,handleFormInputChange,handleInputChange,currentForm,handleSelectChange,handleDatePickerChange } = this.props;


    return (
      <React.Fragment>
        <AddModal
          title={"Add New Insurance"}
          fields={fields}
          isVisible={this.state.isVisible}
          cbClose={this.setVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleRadioChange={handleRadioChange}
          handleCurrencyChange={handleCurrencyChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.create}
        />

        <Header title={"Insurance Details"} />

        <Add title={"Insurance"} button={"Add New Insurance"} cbAdd={this.setVisible} />

        <UpdateModal
            title={"Update Charity"}
            fields={fields_update}
            isVisible={this.state.isUpdate}
            cbClose={this.setUpdate}
            cbUpdate={this.updateCharityRow}
            // onLoad={this.get}
            obj={this.state.updateObject}
            onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

            // onConstraints={this.onConstraints}
          />


       
      {this.state.insurance_rows.map((data,index)=>(
          this.getRow({ data,index: index+1})

        ))}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
      </React.Fragment>
    );
  }
}

export default InsuranceForm;
