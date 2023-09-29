import React, { Component } from "react";
import { Button, Row, Col, Modal, Icon } from "antd";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import income_tax from "../../../assets/images/latest/Income-tax-3.png";
import { withRouter } from "react-router-dom";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import DEATH_API from "../../../apis/death.api";
import MODULE_API from "../../../apis/module.api";
import swal from "sweetalert";
import moment from "moment";
import Calander from "../components/calander";
import CalanderFull from "../components/calanderfull";
import axios from "axios";

const formName = "billsToPayForm";

class BillsToPayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills_to_pay: [],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      newData: [],
      events: [],
      TooltipModal: false,

    };

  }

  componentDidMount() {
    if (
      this.props.checklistObject.billsToPayForm &&
      this.props.checklistObject.billsToPayForm.hasOwnProperty("bills_to_pay")
    )
      this.setState({
        bills_to_pay: this.props.checklistObject.billsToPayForm.bills_to_pay,
      });
    (async () => {
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId")
      let data = await DEATH_API.fetchBills(ID)
      this.props.handleLoader();
      if (data && data.data) {
        this.setState({
          bills_to_pay:
            data.data.map(item => {
              return {
                ...item,
                id: item.id,
                Amount: item.amount,
                PayeeName: item.payeeName,
                Category: item.category,
                DueDate: item.dueDate,
                // WhoseBill: item.billFor,
                // Source: item.source,
                Receipt: item.fileUrl,
                Notes: item.note,
                Frequency: item.frequency
              }
            })
        })
        this.setState({
          events:
            data.data.map(item => {
              return {
                ...item,
                id: item.id,
                title: item.payeeName,
                start: item.dueDate,
                end: item.dueDate,
                Amount: item.amount,
                desc: item.note,
              }
            })
        })
      }
    })()
    this.props.handleChecklistObject(this.props.currentForm, this.state.bills_to_pay)
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
    const { bills_to_pay } = this.state
    // try {
    //   this.props.handleLoader();
    //   await DEATH_API.deleteBills(idx)
    //   this.props.handleLoader();
    //   const updatedRows = bills_to_pay.filter((row) => {
    //     return row.id != idx;
    //   });
    //   this.setState({
    //     bills_to_pay: updatedRows,
    //   }, () => {
    //     this.props.handleChecklistObject(this.props.currentForm, this.state.bills_to_pay)
    //   });
    //   this.props.handleLoader();
    //   let data = await DEATH_API.fetchBills()
    //   this.props.handleLoader();
    //   if (data && data.data) {
    //     this.setState({
    //       bills_to_pay:
    //         data.data.map(item => {
    //           return {
    //             ...item,
    //             id: item.id,
    //             Amount: item.amount,
    //             PayeeName: item.payeeName,
    //             Category: item.category,
    //             DueDate: item.dueDate,
    //             // WhoseBill: item.billFor,
    //             // Source: item.source,
    //             Receipt: item.fileUrl,
    //             Notes: item.note,
    //             Frequency: item.frequency
    //           }
    //         })
    //     })
    //     this.setState({
    //       events:
    //         data.data.map(item => {
    //           return {
    //             ...item,
    //             id: item.id,
    //             title: item.payeeName,
    //             start: item.dueDate,
    //             end: item.dueDate,
    //             Amount: item.amount,
    //             desc: item.note,
    //           }
    //         })
    //     })
    //   }
    // } catch (error) {
    //   console.log("error deleting Bills to pay")
    //   console.log(error)
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
          that.props.handleLoader();
          await DEATH_API.deleteBills(idx)
          that.props.handleLoader();
          const updatedRows = bills_to_pay.filter((row) => {
            return row.id != idx;
          });
          that.setState({
            bills_to_pay: updatedRows,
          }, () => {
            that.props.handleChecklistObject(that.props.currentForm, that.state.bills_to_pay)
          });
          that.props.handleLoader();
          let data = await DEATH_API.fetchBills()
          that.props.handleLoader();
          if (data && data.data) {
            that.setState({
              bills_to_pay:
                data.data.map(item => {
                  return {
                    ...item,
                    id: item.id,
                    Amount: item.amount,
                    PayeeName: item.payeeName,
                    Category: item.category,
                    DueDate: item.dueDate,
                    // WhoseBill: item.billFor,
                    // Source: item.source,
                    Receipt: item.fileUrl,
                    Notes: item.note,
                    Frequency: item.frequency
                  }
                })
            })
            that.setState({
              events:
                data.data.map(item => {
                  return {
                    ...item,
                    id: item.id,
                    title: item.payeeName,
                    start: item.dueDate,
                    end: item.dueDate,
                    Amount: item.amount,
                    desc: item.note,
                  }
                })
            })
          }
        } catch (error) {
          console.log("error deleting Bills to pay")
          console.log(error)
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
    const { bills_to_pay } = this.state

    // get selected row (this will return array of object)
    let selectedRow = bills_to_pay.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };

  //  function to update a bills to pay (upcoming bills) row
  updateBills = async () => {
    try {
      this.props.handleLoader()
      console.log(obj)
      let uploaded = {}
      if (this.state.updateObject.Receipt) {

        console.log("this.state.updateObject.Receipt", this.state.updateObject.Receipt)

        const formData = new FormData();
        formData.append("file", this.state.updateObject.Receipt);

        const name = this.state.updateObject.Receipt.name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: this.state.updateObject.Receipt.type })
        const resupload = await axios.put(resdata.uploadUrl, this.state.updateObject.Receipt, { headers: { 'Content-type': this.state.updateObject.Receipt.type } })
        const res = resdata.uploadUrl.split("?")[0]
        console.log("resss file url", res);
        uploaded.file_url = res;
        // const uploaded = await MODULE_API.uploadImage(formData);
        // updateBody.fileUrl = res;
        // updateBody.fileName = name;
        // obj["UploadFileHere"] = name;


        // const formData = new FormData()
        // formData.append("image", this.state.updateObject.Receipt);
        // uploaded = await MODULE_API.uploadImage(formData)
      }
      console.log("update object 1", obj)

      let obj = {
        ...this.state.updateObject,
        amount: parseInt(this.state.updateObject.Amount) || null,
        payeeName: this.state.updateObject.PayeeName,
        category: this.state.updateObject.Category,
        dueDate: this.state.updateObject.DueDate,
        // billFor: this.state.updateObject.WhoseBill,
        // source: this.state.updateObject.Source,
        DueDate: this.state.updateObject.DueDate && moment(this.state.updateObject.DueDate).format('LL'),
        receiptUrl: uploaded ? uploaded.file_url || null : null,
        note: this.state.updateObject.Notes
      };
      delete obj.Receipt;
      console.log("update object 2", obj)
      await DEATH_API.updateBills(obj.id, obj)
      this.props.handleLoader()

      let { bills_to_pay, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      bills_to_pay = [...this.state.bills_to_pay]; // important to create a copy, otherwise you'll modify state outside of setState call
      bills_to_pay[index] = obj; // replace current updated object in bills_to_pay based on index
      this.setState({ bills_to_pay }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.bills_to_pay)
      });
      this.props.handleLoader();
      let data = await DEATH_API.fetchBills()
      this.props.handleLoader();
      if (data && data.data) {
        this.setState({
          bills_to_pay:
            data.data.map(item => {
              return {
                ...item,
                id: item.id,
                Amount: item.amount,
                PayeeName: item.payeeName,
                Category: item.category,
                DueDate: item.dueDate,
                // WhoseBill: item.billFor,
                // Source: item.source,
                Receipt: item.fileUrl,
                Notes: item.note,
                Frequency: item.frequency
              }
            })
        })
        this.setState({
          events:
            data.data.map(item => {
              return {
                ...item,
                id: item.id,
                title: item.payeeName,
                start: item.dueDate,
                end: item.dueDate,
                Amount: item.amount,
                desc: item.note,
              }
            })
        })
      }
    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
  };


  // function to create  bills to pay (upcoming bills) (data)
  createBills = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [...this.state.newData, currentFormData.formData],
        formData: {},
      });
    }
    // add current form data in bills_to_pay list with keeping old data
    this.setState({
      bills_to_pay: [...this.state.bills_to_pay, { ...currentFormData.formData, DueDate: currentFormData.formData.DueDate ? moment(currentFormData.formData.DueDate).format('LL') : null }],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.bills_to_pay)
    });

    var arr = [currentFormData.formData];
    try {
      let data = arr
      if (Array.isArray(data) && data.length > 0) {
        const allPromises = data.map(async (item) => {
          if (item.file) {
            const formData = new FormData();
            formData.append("file", item.file);
            console.log("item.file", item.file)
            const name = item.file.name;
            const lastDot = name.lastIndexOf('.');
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: item.file.type })
            const resupload = await axios.put(resdata.uploadUrl, item.file, { headers: { 'Content-type': item.file.type } })
            const res = resdata.uploadUrl.split("?")[0]
            console.log(res);
            delete item.file;
            return { ...item, fileUrl: res, fileName: name };

            // const formData = new FormData()
            // formData.append("image", item.file);
            // const uploaded = await MODULE_API.uploadImage(formData)
            // delete item.file;
            // return ({ ...item, fileUrl: uploaded.file_url })
          }
          return item
        })
        this.props.handleLoader()
        let res = await Promise.all(allPromises)
        let api_res = await DEATH_API.addBills({
          billsToPayForm: res.map(item => {
            console.log("item in bill to pay", item);
            return {
              amount: item.Amount,
              payeeName: item.PayeeName,
              frequency: item.Frequency,
              category: item.Category,
              dueDate: item.DueDate,
              // billFor: item.WhoseBill,
              // source: item.Source,
              receiptUrl: item.fileUrl || null,
              note: item.Notes,
            }
          })
        })
        this.props.handleLoader()
        this.props.handleLoader();
        let datares = await DEATH_API.fetchBills()
        this.props.handleLoader();
        if (datares && datares.data) {
          this.setState({
            bills_to_pay:
              datares.data.map(item => {
                return {
                  ...item,
                  id: item.id,
                  Amount: item.amount,
                  PayeeName: item.payeeName,
                  Category: item.category,
                  DueDate: item.dueDate,
                  // WhoseBill: item.billFor,
                  // Source: item.source,
                  Receipt: item.fileUrl,
                  Notes: item.note,
                  Frequency: item.frequency
                }
              })
          })
          this.setState({
            events:
              datares.data.map(item => {
                return {
                  ...item,
                  id: item.id,
                  title: item.payeeName,
                  start: item.dueDate,
                  end: item.dueDate,
                  Amount: item.amount,
                  desc: item.note,
                }
              })
          })
        }
        return api_res;
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

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Due Date:</span>
              <span className="custom-field-value-style"> {data.DueDate && moment(data.DueDate).format('LL') || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Payee Name:</span>
              <span className="custom-field-value-style"> {data.PayeeName || 'N/A'}</span>
            </div>

            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes:</span>
              <span className="custom-field-value-style">
                {data.Notes || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Amount:</span>
              <span className="custom-field-value-style"> {data.Amount || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Category: </span>
              <span className="custom-field-value-style"> {data.Category || 'N/A'}</span>
            </div>
            {/*
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Source: </span>
              <span className="custom-field-value-style"> {data.Source || 'N/A'}</span>
            </div>
    */}
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            {/*
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Whose Bill: </span>
              <span className="custom-field-value-style"> {data.WhoseBill || 'N/A'}</span>
            </div>
            */}
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Receipt: </span>
              <span className="custom-field-value-style">{data.receiptUrl ? <a target="_blank" href={data.receiptUrl}>Click Me</a> : <React.Fragment>{data.Receipt || 'N/A'}</React.Fragment>}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Frequency:</span>
              <span className="custom-field-value-style"> {data.Frequency || 'N/A'}</span>
            </div>
          </div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" && (
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
          )}
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
      </Row >
    );
  };

  render() {
    const { role } = this.props;
    const fields = [
      {
        title: "Amount",
        type: "input",
        index: "Amount"
      },
      {
        title: "Payee Name",
        type: "input",
        index: "PayeeName"
      },
      {
        title: "Category",
        type: "select",
        options: ["Auto & Transport", "Bills & Utilities", "Business Services", "Education", "Entertainment", "Fees & Charges", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Income", "Investments", "Kids", "Miscellaneous", "Personal Care", "Shopping", "Taxes", "Travel", "Others"],
        index: "Category"
      },
      {
        title: "Frequency",
        type: "select",
        options: ["Weekly", "biweekly", "semimonthly", "monthly", "quarterly", "semi-annually", "annually"],
        index: "Frequency"
      },
      // {
      //   title: "Source",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "Source"
      // },
      // {
      //   title: "Whose Bill",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "WhoseBill"

      // },
      {
        title: "Due Date",
        type: "date",
        index: "DueDate"
      },
      {
        title: "Receipt",
        type: "document",
        index: "Receipt"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];


    const update_fields = [
      {
        title: "Amount",
        type: "input",
        index: "Amount"
      },
      {
        title: "Payee Name",
        type: "input",
        index: "PayeeName"
      },
      {
        title: "Category",
        type: "select",
        options: ["Auto & Transport", "Bills & Utilities", "Business Services", "Education", "Entertainment", "Fees & Charges", "Food & Dining", "Gifts & Donations", "Health & Fitness", "Income", "Investments", "Kids", "Miscellaneous", "Personal Care", "Shopping", "Taxes", "Travel", "Others"],
        index: "Category"
      },
      {
        title: "Frequency",
        type: "select",
        options: ["Weekly", "biweekly", "semimonthly", "monthly", "quarterly", "semi-annually", "annually"],
        index: "frequency"
      },
      // {
      //   title: "Source",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "Source"
      // },
      // {
      //   title: "Whose Bill",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "WhoseBill"

      // },
      {
        title: "Due Date",
        type: "date",
        index: "DueDate"
      },
      {
        title: "Receipt",
        type: "document",
        index: "Receipt"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];

    const bills_to_pay = [
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        fields: [
          {
            type: "DatePicker",
            name: "due_date",
          },
        ],
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        fields: [
          {
            type: "Currency",
            name: "amount",
          },
        ],
      },
      {
        title: "Payee",
        dataIndex: "payee",
        key: "payee",
        fields: [
          {
            type: "Input",
            name: "payee",
          },
        ],
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        fields: [
          {
            type: "Select",
            name: "category",
            placeholder: "-Select-",
            values: [
              "Charity",
              "Child and Family Care",
              "Debt Payments",
              "Entertainment",
              "Professional Services",
              "Home",
              "Insurance",
              "Personal Care",
              "Pets",
              "Shopping",
              "Transportation",
              "Utilities",
              "Finance",
              "Business",
              "Saving for Goal",
            ],
          },
        ],
      },
      {
        title: "Whose Bill",
        dataIndex: "whose_bill",
        key: "whose_bill",
        fields: [
          {
            type: "Select",
            name: "whose_bill",
            placeholder: "-Select-",
            values: ["Charity", "Debt Payments", "Entertainment"],
          },
        ],
      },
      {
        title: "Frequency",
        dataIndex: "frequency",
        key: "frequency",
        fields: [
          {
            type: "Select",
            name: "frequency",
            placeholder: "-Select-",
            values: [
              "Annually",
              "Bi-Monthly",
              "Bi-Weekly",
              "Monthly",
              "One-Time",
              "Quaterly",
              "Semi-Annually",
              "Weekly",
            ],
          },
        ],
      },
      {
        title: "Source",
        dataIndex: "source",
        key: "source",
        fields: [
          {
            type: "Select",
            name: "source",
            placeholder: "-Select-",
            values: [
              "Bank TFR",
              "Credit Card",
              "Hand Check",
              "Digital Pay (Venmo, Paypal)",
            ],
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
      {
        title: "Receipt",
        dataIndex: "receipt",
        key: "receipt",
        fields: [
          {
            type: "Document",
            name: "receipt",
          },
        ],
      },
    ];

    // const { handleFormInputChange } = this.props;
    const {
      currentForm,
      handleInputChange,
      divorceObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
      handleCurrencyChange,
      handleDocumentChange,
    } = this.props;
    console.log(this.state.bills_to_pay)

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Bill"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createBills}
        />
        {/* {console.log("new Date(2023, 7, 6)",new Date(2023, 5, 6))}
    <Calander/> */}
        {/* <Header image={income_tax} title={"Upcoming Bills"} /> */}

        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={income_tax}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Upcoming Bills
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
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Upcoming Bills</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                Often, one of the most pressing concerns for friends and loved ones is how to pay bills for
                the deceased and which ones are coming up.  Added features might also denote which bills
                are paid auto-pay from a bank account or credit card, along with other details that may
                prove to be helpful.
              </h2>

            </div>
          </div>
        </Modal>

        <CalanderFull props={this.state.events} />
        <UpdateModal
          title={"Update Bill"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateBills}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}
        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Bill"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          obj={this.state.updateObject}
        />

        {/*  
        {role !== "ROLE" ? (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10%",
              }}
            >
              <h2 className="text-center font-weight-bold">
                Complete the budget module now ?
              </h2>
              <div
                style={{
                  marginLeft: "10%",
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <div style={{ marginRight: "3%" }}>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "#39b54a",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                    onClick={() => {
                      this.props.history.push("/budget");
                    }}
                  >
                    <span className="custom-footer-text">Yes</span>
                  </Button>
                </div>
                <div>
                  {/* <Button
                    type="primary"
                    size={"large"}
                    style={{
                      background: "white",
                      borderRadius: "100px",
                      width: "100px",
                    }}
                  >
                    <span
                      className="custom-footer-text"
                      style={{ color: "black" }}
                    >
                      No
                    </span>
                  </Button> 
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}

      */}
        <div style={{ marginTop: "2.25rem" }}><br /></div>
        <Add
          title={"Bills"}
          button={"Add New Bills"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}

        />
        {/* get bills row */}
        {this.state.bills_to_pay.map((data, index) => this.getRow({ data, index: index + 1, id: data.id })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm
          //   this.props.nextForm(async () => {
          //   try {
          //     let data = this.state.newData
          //     if (Array.isArray(data) && data.length > 0) {
          //       const allPromises = data.map(async (item) => {
          //         if (item.file) {
          //           const formData = new FormData()
          //           formData.append("image", item.file);
          //           const uploaded = await MODULE_API.uploadImage(formData)
          //           delete item.file;
          //           return ({ ...item, fileUrl: uploaded.file_url })
          //         }
          //         return item
          //       })
          //       this.props.handleLoader()
          //       let res = await Promise.all(allPromises)
          //       let api_res= await DEATH_API.addBills({
          //         billsToPayForm: res.map(item => {
          //           console.log("item in bill to pay",item);
          //           return {
          //             amount: item.Amount,
          //             payeeName: item.PayeeName,
          //             frequency:item.Frequency,
          //             category: item.Category,
          //             dueDate: item.DueDate,
          //             billFor: item.WhoseBill,
          //             source: item.Source,
          //             receiptUrl: item.fileUrl || null,
          //             note: item.Notes,
          //           }
          //         })
          //       })
          //       this.props.handleLoader()
          //       return api_res;
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

export default withRouter(BillsToPayForm);
