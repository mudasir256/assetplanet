import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal, Form, Input } from "antd";
import Casket from "../../../assets/images/latest/Casket.png";
import "../../custom/CustomSubFormTable.css";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import DEATH_API from "../../../apis/death.api";
import swal from "sweetalert";
import moment from "moment";
const formName = "prepaidBurialExpenseForm";

class PrepaidBurialExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prepaid_burial: [],
      formData: {},
      isVisible: false,
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      newData: [],
      TooltipModal: false,

    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.prepaidBurialExpenseForm &&
      this.props.checklistObject.prepaidBurialExpenseForm.hasOwnProperty(
        "prepaid_burial"
      )
    )
      this.setState({
        prepaid_burial:
          this.props.checklistObject.prepaidBurialExpenseForm.prepaid_burial,
      });
    (async () => {
      this.props.handleLoader()
      const ID = localStorage.getItem("accessId")
      let data = await DEATH_API.fetchPrepaidBurial(ID)
      this.props.handleLoader()
      if (data && data.data) {
        this.setState({
          prepaid_burial:
            data.data.map(item => {
              return {
                ...item,
                NameOfPlace: item.placeName,
                Location: item.location,
                Address: item.address,
                // ItemsPaidFor: item.paidFor,
                PaidFor: item.paidFor,
                Director: item.director,
                PhoneNumber: item.phoneNumber,
                AmountPaid: item.amount,
                DatePaid: item.paymentDate && moment(item.paymentDate).format("LL"),
                Notes: item.note
              }
            })
        })
      }
    })()
    this.props.handleChecklistObject(this.props.currentForm, this.state.prepaid_burial)
  }
  showTooltipModal = async () => {
    this.setState({
      TooltipModal: true,
    });
  };

  handleTooltipCancel = () => {
    this.setState({
      TooltipModal: false,
    });
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }


  // to handle hide and show for  add modal
  setAddModalVisible = () => this.setState({ isAddModalVisible: !this.state.isAddModalVisible })

  // to handle hide and show for update modal
  setUpdateModalVisible = () => this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible })

  // to handle hide and show for View modal
  setViewModalVisible = () => this.setState({ isViewModalVisible: !this.state.isViewModalVisible });


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
  deleteSelectedRow = async (idx) => {
    const { prepaid_burial } = this.state
    // try {
    //   this.props.handleLoader()
    //   await DEATH_API.deletePrepaidBurial(idx)
    //   const updatedRows = prepaid_burial.filter((row, index) => {
    //     return row.id != idx;
    //   });
    //   this.setState({
    //     prepaid_burial: updatedRows,
    //   }, () => {
    //     this.props.handleChecklistObject(this.props.currentForm, this.state.personal_instructions)
    //   });
    //   this.props.handleLoader()
    // } catch (error) {
    //   console.log("error deleting Prepaid Burial")
    //   console.log(error)
    //   this.props.handleLoader()
    // }
    var that = this;
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this?",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, delete it!"],
      icon: "warning",
      type: "warning",
      closeOnConfirm: false,
      closeOnCancel: false
    }).then(async function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        // that.props.handleLoader()
        try {
          that.props.handleLoader()
          await DEATH_API.deletePrepaidBurial(idx)
          that.props.handleLoader()
          const updatedRows = prepaid_burial.filter((row, index) => {
            return row.id != idx;
          });
          that.setState({
            prepaid_burial: updatedRows,
          }, () => {
            that.props.handleChecklistObject(that.props.currentForm, that.state.personal_instructions)
          });
        } catch (error) {
          console.log("error deleting Prepaid Burial")
          console.log(error)
          that.props.handleLoader()
        }
        setTimeout(async () => {
          that.props.handleLoader()
          swal("Deleted!", "Your file has been deleted.", "success");
          that.props.handleLoader()
        }, 0)
      } else {
        swal("Cancelled", "Your file is safe :)", "error");
      }
    });




  };


  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });
    const { prepaid_burial } = this.state

    // get selected row (this will return array of object)
    let selectedRow = prepaid_burial.filter((row, index) => {
      return index == idx - 1;
    });
    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


  //  function to update a specific Prepaid Burial Expense row
  updateBurialExpense = async () => {
    try {
      this.props.handleLoader()
      let obj = {
        ...this.state.updateObject,
        placeName: this.state.updateObject.NameOfPlace,
        location: this.state.updateObject.Location,
        address: this.state.updateObject.Address,
        paidFor: this.state.updateObject.PaidFor,
        director: this.state.updateObject.Director,
        phoneNumber: this.state.updateObject.PhoneNumber,
        amount: this.state.updateObject.AmountPaid,
        paymentDate: this.state.updateObject.DatePaid,
        DatePaid: this.state.updateObject.DatePaid && moment(this.state.updateObject.DatePaid).format('LL'),
        note: this.state.updateObject.Notes
      };
      let { prepaid_burial, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      prepaid_burial = [...this.state.prepaid_burial]; // important to create a copy, otherwise you'll modify state outside of setState call
      prepaid_burial[index] = obj; // replace current updated object in prepaid_burial based on index
      this.setState({ prepaid_burial }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.prepaid_burial)
      });
      console.log(obj)
      await DEATH_API.updatePrepaidBurial(obj.id, obj)
      this.props.handleLoader()
    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
  };


  // function to create prepaid burial expense row (data)
  createBurialExpense = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }
    // add current form data in prepaid_burial list with keeping old data
    this.setState({
      prepaid_burial: [{ ...currentFormData.formData, DatePaid: currentFormData.formData.DatePaid ? moment(currentFormData.formData.DatePaid).format('LL') : null }, ...this.state.prepaid_burial],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.prepaid_burial)
    });
    var arr = [currentFormData.formData];

    try {
      let data = arr
      if (Array.isArray(data) && data.length > 0) {
        this.props.handleLoader()
        let api_res = await DEATH_API.addPrepaidBurial({
          prepaidBurialExpenseForm: data.map(item => {
            return {
              placeName: item.NameOfPlace,
              location: item.Location,
              address: item.Address,
              paidFor: item.ItemsPaidFor,
              director: item.Director,
              phoneNumber: item.PhoneNumber,
              amount: item.AmountPaid,
              paymentDate: item.DatePaid,
              note: item.Notes
            }
          })
        })
        this.props.handleLoader()
        this.props.handleLoader()
        let datares = await DEATH_API.fetchPrepaidBurial()
        this.props.handleLoader()
        if (datares && datares.data) {
          this.setState({
            prepaid_burial:
              datares.data.map(item => {
                return {
                  ...item,
                  NameOfPlace: item.placeName,
                  Location: item.location,
                  Address: item.address,
                  // ItemsPaidFor: item.paidFor,
                  PaidFor: item.paidFor,
                  Director: item.director,
                  PhoneNumber: item.phoneNumber,
                  AmountPaid: item.amount,
                  DatePaid: item.paymentDate && moment(item.paymentDate).format("LL"),
                  Notes: item.note
                }
              })
          })
        }
        return api_res
      }

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }

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





  getRow = ({ data, index, id }) => {
    const { role } = this.props;
    return (
      <Row key={id} type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>
        <Col span={17}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin1">
              <span className="custom-field-heading-style">
                Items Paid for:
              </span>
              <span className="custom-field-value-style"> {data.PaidFor || 'N/A'}</span>
            </div>

          </div>
        </Col>

        <Col span={1}>
          <div className="custom-field-alignments-icons">
            <Button
              type="link"
              style={{ fontSize: "21px" }}
              icon="eye"
              onClick={() => {

                this.getSelectedRow(index);

                this.setViewModalVisible();
              }}
            ></Button>
          </div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" && (
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
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" && (
            <div className="custom-field-alignments-icons">
              <Button
                type="link"
                style={{ fontSize: "21px" }}
                icon="delete"
                onClick={() => {
                  this.deleteSelectedRow(id);
                }}
              ></Button>
            </div>
          )}
        </Col>
      </Row>
    );
  };

  render() {
    const { role } = this.props;

    const fields = [
      {
        title: "Name Of Place",
        type: "input",
        index: "NameOfPlace"
      },
      {
        title: "Location",
        type: "input",
        index: "Location"
      },
      {
        title: "Address",
        type: "input",
        index: "Address"
      },
      {
        title: "Items Paid For",
        type: "select",
        options: ["Funeral Home Services", "Casket", "Flowers", "Transportation", "Final Expense Insurance", "Cremation", "Embalming", "Body Preparation", "Facilities/Staff to manage viewing", "Hearse", "Service Car", "Memorial Printed Package", "Vault"],
        index: "ItemsPaidFor"
      },
      {
        title: "Director",
        type: "input",
        index: "Director"
      },
      {
        title: "Phone Number",
        type: "phone",
        index: "PhoneNumber"
      },
      {
        title: "Amount Paid",
        type: "currency",
        index: "AmountPaid"
      },
      {
        title: "Date Paid",
        type: "date",
        index: "DatePaid"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];


    const update_fields = [
      {
        title: "Name Of Place",
        type: "input",
        index: "NameOfPlace"
      },
      {
        title: "Location",
        type: "input",
        index: "Location"
      },
      {
        title: "Address",
        type: "input",
        index: "Address"
      },
      {
        title: "Items Paid For",
        type: "select",
        options: ["Funeral Home Services", "Casket", "Flowers", "Transportation", "Final Expense Insurance", "Cremation", "Embalming", "Body Preparation", "Facilities/Staff to manage viewing", "Hearse", "Service Car", "Memorial Printed Package", "Vault"],
        index: "PaidFor"
      },
      {
        title: "Director",
        type: "input",
        index: "Director"
      },
      {
        title: "Phone Number",
        type: "phone",
        index: "PhoneNumber"
      },
      {
        title: "Amount Paid",
        type: "currency",
        index: "AmountPaid"
      },
      {
        title: "Date Paid",
        type: "date",
        index: "DatePaid"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];

    const largeBills = [
      {
        title: "Name of Place",
        dataIndex: "name_of_place",
        key: "name_of_place",
        fields: [
          {
            type: "Input",
            name: "name_of_place",
          },
        ],
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        fields: [
          {
            type: "Input",
            name: "street",
            placeholder: "street",
          },
          // {
          //   type: "Input",
          //   name: "city",
          //   placeholder: "city",
          // },
          // {
          //   type: "Input",
          //   name: "state",
          //   placeholder: "state",
          // },
        ],
      },
      {
        title: "Location/Plot",
        dataIndex: "location_plot",
        key: "location_plot",
        fields: [
          {
            type: "Input",
            name: "location_plot",
          },
        ],
      },
      {
        title: "Items Paid For",
        dataIndex: "item_paid_for",
        key: "item_paid_for",
        fields: [
          {
            type: "Select",
            name: "item_paid_for",
            placeholder: "-Select-",
            values: ["Headstone", "Casket", "Urn", "Flowers", "Other"],
          },
        ],
      },
      {
        title: "Director",
        dataIndex: "director",
        key: "director",
        fields: [
          {
            type: "Input",
            name: "director",
          },
        ],
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        fields: [
          {
            type: "PhoneNumber",
            name: "phone_number",
          },
        ],
      },
      {
        title: "When Paid",
        dataIndex: "paid_date",
        key: "paid_date",
        fields: [
          {
            type: "DatePicker",
            name: "paid_date",
          },
        ],
      },
      {
        title: "How Much Paid",
        dataIndex: "how_much_paid",
        key: "how_much_paid",
        fields: [
          {
            type: "Currency",
            name: "how_much_paid",
          },
        ],
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        fields: [
          {
            type: "TextArea",
            name: "notes",
          },
        ],
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
      handlePhoneChange,
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Expense"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handlePhoneChange={handlePhoneChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createBurialExpense}
        />


        <UpdateModal
          title={"Update Expense"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateBurialExpense}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Expense"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          // cbUpdate={this.updateBurialExpense}
          // onLoad={this.get}
          obj={this.state.updateObject}
        // onUpdateChange={this.onUpdateChange}
        // handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />

        {/*  <Header image={Casket} title={"Prepaid Burial Expense"} /> */}
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={Casket}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Funeral Wishes
              <Icon
                style={{
                  fontSize: "27px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                  color: "#39b54a",
                }}
                onClick={async () => {
                  this.showTooltipModal()
                }}
                type="question-circle"
              ></Icon>
            </h2>
          </Col>
        </Row>
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Funeral Wishes</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                If the Plan Creator has chosen to pay or earmark certain instructions relevant to their burial
                or ceremony, it can be found in this feature.  Details include name of facility, location, items
                paid for, when paid, how much total, name of funeral home director, and personal notes.
              </h2>

            </div>
          </div>
        </Modal>

        <Add
          title={"Funeral Wishes"}
          button={"Add New Expense"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
        />



        {this.state.prepaid_burial.map((data, index) =>
          this.getRow({ data, index: index + 1, id: data.id })
        )}
        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm
          //   this.props.nextForm(async () => {
          //   try {
          //     let data = this.state.newData
          //     if (Array.isArray(data) && data.length > 0) {
          //       this.props.handleLoader()
          //       let api_res = await DEATH_API.addPrepaidBurial({
          //         prepaidBurialExpenseForm: data.map(item => {
          //           return {
          //             placeName: item.NameOfPlace,
          //             location: item.Location,
          //             address: item.Address,
          //             paidFor: item.ItemsPaidFor,
          //             director: item.Director,
          //             phoneNumber: item.PhoneNumber,
          //             amount: item.AmountPaid,
          //             paymentDate: item.DatePaid,
          //             note: item.Notes
          //           }
          //         })
          //       })
          //       this.props.handleLoader()
          //       return api_res
          //     }
          //   } catch (error) {
          //     console.log(error)
          //     throw new Error(error)
          //   }
          // })
        } />
      </React.Fragment>
    );
  }
}

export default PrepaidBurialExpenseForm;
