import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal } from "antd";
import target from "../../../assets/images/latest/target.png";
import CustomSubFormTable from "../../custom/CustomSubFormTable";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import swal from 'sweetalert';
import DEATH_API from "../../../apis/death.api";


const formName = "personalItemLocationForm";

class PersonalItemLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal_items: [],
      formData: {},
      newData: [],
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      TooltipModal: false,
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.personalItemLocationForm &&
      this.props.checklistObject.personalItemLocationForm.hasOwnProperty(
        "personal_items"
      )
    )
      this.setState({
        personal_items:
          this.props.checklistObject.personalItemLocationForm.personal_items,
      });
    try {
      (async () => {
        this.props.handleLoader();
        const ID = localStorage.getItem("accessId")
        let data = await DEATH_API.fetchPersonalItemLocation(ID)
        this.props.handleLoader();
        if (data && data.data) {
          this.setState({
            personal_items:
              data.data.map(item => {
                return {
                  ...item,
                  // PersonalItem: item.name,
                  Location: item.location,
                  PersonalWishes: item.wish,
                  Notes: item.note
                }
              })
          })
        }
      })()
    } catch (error) {
      console.log(error)
      this.props.handleLoader();
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.personal_items)
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
  setAddModalVisible = () => this.setState({ isAddModalVisible: !this.state.isAddModalVisible });

  // to handle hide and show for update modal
  setUpdateModalVisible = () => this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });

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
    // try {
    //   const { personal_items } = this.state
    //   this.props.handleLoader();
    //   await DEATH_API.deletePersonalItemLocation(idx)
    //   this.props.handleLoader();
    //   const updatedRows = personal_items.filter((row, index) => {
    //     return index != idx - 1;
    //   });
    //   this.setState({
    //     personal_items: updatedRows,
    //   }, () => {
    //     this.props.handleChecklistObject(this.props.currentForm, this.state.personal_items)
    //   });
    // } catch (error) {
    //   console.log("error in deleting Account asset form")
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
          const { personal_items } = that.state
          that.props.handleLoader();
          await DEATH_API.deletePersonalItemLocation(idx)
          that.props.handleLoader();
          const updatedRows = personal_items.filter((row, index) => {
            return index != idx - 1;
          });
          that.setState({
            personal_items: updatedRows,
          }, () => {
            that.props.handleChecklistObject(that.props.currentForm, that.state.personal_items)
          });
        } catch (error) {
          console.log("error in deleting Account asset form")
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

    const { personal_items } = this.state

    // get selected row (this will return array of object)
    let selectedRow = personal_items.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


  //  function to update a personal item row
  updatePersonalItem = async () => {
    try {
      this.props.handleLoader()
      let obj = {
        ...this.state.updateObject,
        // name: this.state.updateObject.PersonalItem,
        location: this.state.updateObject.Location,
        wish: this.state.updateObject.PersonalWishes,
        note: this.state.updateObject.Notes
      };

      await DEATH_API.updatePersonalItemLocation(obj.id, obj)
      let { personal_items, selectedIndex } = this.state;
      this.props.handleLoader()
      let index = selectedIndex - 1;
      personal_items = [...this.state.personal_items]; // important to create a copy, otherwise you'll modify state outside of setState call
      personal_items[index] = obj; // replace current updated object in personal_items based on index
      this.setState({ personal_items }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.personal_items)
      });
    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
  };

  // function to create  personal item (data)
  createPersonalItem = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }
    // add current form data in personal_items list with keeping old data
    this.setState({
      personal_items: [currentFormData.formData, ...this.state.personal_items],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.personal_items)
    });

    var arr = [currentFormData.formData]
    try {
      let data = arr
      this.props.handleLoader()
      if (Array.isArray(data) && data.length > 0) {
        await DEATH_API.addPersonalItemLocation({
          personalItemLocationForm: data.map(item => {
            return {
              // name: item.PersonalItem,
              location: item.Location,
              wish: item.PersonalWishes,
              note: item.Notes
            }
          })
        })
      }

      this.props.handleLoader()
      let datares = await DEATH_API.fetchPersonalItemLocation()
      this.props.handleLoader();
      if (datares && datares.data) {
        this.setState({
          personal_items:
            datares.data.map(item => {
              return {
                ...item,
                // PersonalItem: item.name,
                Location: item.location,
                PersonalWishes: item.wish,
                Notes: item.note
              }
            })
        })
      }
      this.props.handleLoader();
      // swal("Success!", "You data has been saved!", "success").then(() =>
      //    this.props.navigate("/death")
      // )
    } catch (error) {
      console.log(error)
      swal("Error!", "You data has not been saved!", "error")
      this.props.handleLoader()
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
      <Row type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            {/*  <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Personal Item:</span>
              <span className="custom-field-value-style"> {data.PersonalItem || 'N/A'}</span>
    </div> */}
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Personal Item:
              </span>
              <span className="custom-field-value-style"> {data.PersonalWishes || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Notes</span>
              <span className="custom-field-value-style">
                {data.Notes || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Location:</span>
              <span className="custom-field-value-style">
                {data.Location || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments"></div>
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
      </Row>
    );
  };

  render() {
    const fields = [
      // {
      //   title: "Personal Item",
      //   type: "select",
      //   options: ["Abc", "Def","Others"],
      //   index: "PersonalItem"
      // },
      {
        title: "Location",
        type: "input",
        index: "Location"
      },
      {
        title: "Personal Item",
        type: "textarea",
        index: "PersonalWishes"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];


    const update_fields = [
      // {
      //   title: "Personal Item",
      //   type: "select",
      //   options: ["Abc", "Def","Others"],
      //   index: "PersonalItem"
      // },
      {
        title: "Location",
        type: "input",
        index: "Location"
      },
      {
        title: "Personal Item",
        type: "textarea",
        index: "PersonalWishes"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
    ];

    const personal_items = [
      {
        title: "Personal Item",
        dataIndex: "personal_item",
        key: "personal_item",
        fields: [
          {
            type: "Select",
            name: "personal_item",
            placeholder: "-Select-",
            values: ["Asset 1", "Asset 2"],
          },
        ],
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        fields: [
          {
            type: "TextArea",
            name: "location",
          },
        ],
      },
      {
        title: "Personal Wishes",
        dataIndex: "personal_wishes",
        key: "personal_wishes",
        fields: [
          {
            type: "TextArea",
            name: "personal_wishes",
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
      role
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Personal Item"}
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
          create={this.createPersonalItem}
        />

        <UpdateModal
          title={"Update Bill"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePersonalItem}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />
        <ViewModal
          title={"View Personal Item"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          obj={this.state.updateObject}

        />
        {/* <Header image={target} title={"Personal Items Location"} /> */}

        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={target}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Personal Items Location
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
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Personal Items Location</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                OK, we are not talking about buried treasure! -- - or are we?  The point of this program
                feature is for the Plan Creator to be given an opportunity to list personal items that might
                not be found on a balance sheet.  Comic books, gold bullion, heirloom jewelry, collectible
                car stored in a friend’s garage, are all potential candidates for secrecy and a desire to list
                separately.
              </h2>

            </div>
          </div>
        </Modal>
        <Add
          title={"Personal Items"}
          button={"Add New Item Location"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
        />

        {/* get personal item row */}
        {this.state.personal_items.map((data, index) =>
          this.getRow({ data, index: index + 1, id: data.id })
        )}

        <div className="row justify-content-between">
          <div className="col-8">
            <Button
              type="primary"
              size={"large"}
              onClick={() => this.props.previousForm()}
            >
              <Icon type="left" />
              Previous
            </Button>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <Button
              type="primary"
              size={"large"}
              onClick={async () => {
                this.props.navigate("/protector")
                // try {
                //   let data = this.state.newData
                //   this.props.handleLoader()
                //   if (Array.isArray(data) && data.length > 0) {
                //     await DEATH_API.addPersonalItemLocation({
                //       personalItemLocationForm: data.map(item => {
                //         return {
                //           name: item.PersonalItem,
                //           location: item.Location,
                //           wish: item.PersonalWishes,
                //           note: item.Notes
                //         }
                //       })
                //     })
                //   }
                //   this.props.handleLoader()
                //   swal("Success!", "You data has been saved!", "success").then(() =>
                //     this.props.navigate("/death")
                //   )
                // } catch (error) {
                //   console.log(error)
                //   swal("Error!", "You data has not been saved!", "error")
                //   this.props.handleLoader()
                // }
              }}
            >
              Finish
              <Icon type="right" />
            </Button>
          </div>
        </div>

        {/* <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} /> */}
      </React.Fragment>
    );
  }
}

export default PersonalItemLocationForm;
