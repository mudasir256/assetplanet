import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, Modal } from "antd";
import law from "../../../assets/images/latest/law.png";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import swal from "sweetalert";
import DEATH_API from "../../../apis/death.api";
import MODULE_API from "../../../apis/module.api";
import axios from "axios";

const formName = "litigationForm";

class LitigationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      litigation_list: [],
      formData: {},
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
      this.props.checklistObject.litigationForm &&
      this.props.checklistObject.litigationForm.hasOwnProperty(
        "litigation_list"
      )
    )
      this.setState({
        litigation_list:
          this.props.checklistObject.litigationForm.litigation_list,
      });
    try {
      (async () => {
        this.props.handleLoader()
        const ID = localStorage.getItem("accessId")

        let data = await DEATH_API.fetchLitigation(ID)
        this.props.handleLoader()
        if (data && data.data) {
          this.setState({
            litigation_list:
              data.data.map(item => {
                return {
                  ...item,
                  LitigationNickname: item.name,
                  PotentialLiability: item.liability,
                  PotentialWinLoss: item.result === true ? "Yes" : item.result === false ? "No" : null,
                  Notes: item.note,
                  Upload: item.fileName,
                }
              })
          })
        }
      })()
    } catch (error) {
      console.log(error)
      this.props.handleLoader()
    }
    this.props.handleChecklistObject(this.props.currentForm, this.state.litigation_list)

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
  handleDateChange = (date, dateString, index) => this.onUpdateChange(dateString, index)


  // Function to delete selected row
  deleteSelectedRow = async (idx) => {
    // try {
    //   const { litigation_list } = this.state
    //   this.props.handleLoader()
    //   await DEATH_API.deleteLitigation(idx)
    //   this.props.handleLoader()
    //   const updatedRows = litigation_list.filter((row, index) => {
    //     return row.id != idx;
    //   });
    //   this.setState({
    //     litigation_list: updatedRows,
    //   }, () => {
    //     this.props.handleChecklistObject(this.props.currentForm, this.state.litigation_list)
    //   });
    // } catch (error) {
    //   console.log("error deleting Personal Instruction")
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
          const { litigation_list } = that.state
          that.props.handleLoader()
          await DEATH_API.deleteLitigation(idx)
          that.props.handleLoader()
          const updatedRows = litigation_list.filter((row, index) => {
            return row.id != idx;
          });
          that.setState({
            litigation_list: updatedRows,
          }, () => {
            that.props.handleChecklistObject(that.props.currentForm, that.state.litigation_list)
          });
        } catch (error) {
          console.log("error deleting Personal Instruction")
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
  }
  // Function to get selected  array (row)
  getSelectedRow = (idx,) => {
    this.setState({
      selectedIndex: idx,
    });
    const { litigation_list } = this.state
    // get selected row (this will return array of object)
    let selectedRow = litigation_list.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    console.log("selectedRow", selectedRow)
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };


  //  function to update a litigation row
  updateLitigation = async () => {
    try {
      this.props.handleLoader()
      let result = null
      if (this.state.updateObject.PotentialWinLoss && typeof this.state.updateObject.PotentialWinLoss === "string") {
        result = this.state.updateObject.PotentialWinLoss.toLowerCase() === "yes" ? true : this.state.updateObject.PotentialWinLoss.toLowerCase() === "no" && false
      }
      let uploaded = {}

      console.log("this.state.updateObject.Upload", this.state.updateObject.Upload)
      // if(this.state.updateObject.Upload){

      const formData = new FormData();
      formData.append("file", this.state.updateObject.Upload);

      const name = this.state.updateObject.Upload.name;
      const lastDot = name.lastIndexOf('.');
      const fileName = name.substring(0, lastDot);
      const ext = name.substring(lastDot + 1);
      const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: this.state.updateObject.Upload.type })
      const resupload = await axios.put(resdata.uploadUrl, this.state.updateObject.Upload, { headers: { 'Content-type': this.state.updateObject.Upload.type } })
      const res = resdata.uploadUrl.split("?")[0]
      console.log("resss file url", res);
      uploaded.file_url = res;
      uploaded.fileName = name;

      // const formData = new FormData()
      // formData.append("image", this.state.updateObject.Upload);
      // const uploaded = await MODULE_API.uploadImage(formData)
      // console.log("uploaded", uploaded);


      // }

      let obj = {
        ...this.state.updateObject,
        name: this.state.updateObject.LitigationNickname,
        liability: parseInt(this.state.updateObject.PotentialLiability) || null,
        result,
        note: this.state.updateObject.Notes,
        fileName: uploaded ? uploaded.fileName : (this.state.updateObject.Upload.name ? this.state.updateObject.Upload.name : ""),
        fileUrl: uploaded ? uploaded.file_url : (this.state.updateObject.fileUrl ? this.state.updateObject.fileUrl : "")
      };
      delete obj.Upload;
      console.log("obj in playload update", obj);
      await DEATH_API.updateLitigation(obj.id, obj)
      this.props.handleLoader()

      let { litigation_list, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      litigation_list = [...this.state.litigation_list]; // important to create a copy, otherwise you'll modify state outside of setState call
      litigation_list[index] = obj; // replace current updated object in litigation_list based on index
      this.setState({ litigation_list }, () => {
        this.props.handleChecklistObject(this.props.currentForm, this.state.litigation_list)
      });
      this.props.handleLoader()
      let datares = await DEATH_API.fetchLitigation()
      this.props.handleLoader()
      if (datares && datares.data) {
        this.setState({
          litigation_list:
            datares.data.map(item => {
              return {
                ...item,
                LitigationNickname: item.name,
                PotentialLiability: item.liability,
                PotentialWinLoss: item.result === true ? "Yes" : item.result === false ? "No" : null,
                Notes: item.note,
                Upload: item.fileName,
              }
            })
        })
      }
      this.setState({
        updateObject: null,
      });
    } catch (error) {
      console.log("error in update", error)
      this.props.handleLoader()
    }
  };


  // function to create  litigation (data)
  createLitigation = async (currentFormData) => {

    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }

    // add current form data in litigation_list list with keeping old data
    this.setState({
      litigation_list: [currentFormData.formData, ...this.state.litigation_list],
    }, () => {
      this.props.handleChecklistObject(this.props.currentForm, this.state.litigation_list)
    });
    var arr = [currentFormData.formData]
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
            return { ...item, fileUrl: res, uploaded: name };

            // const formData = new FormData()
            // formData.append("image", item.file);
            // const uploaded = await MODULE_API.uploadImage(formData)
            // // delete item.file;
            // return ({ ...item, fileUrl: uploaded.file_url, uploaded:item.file.name })
          }
          return item
        })
        this.props.handleLoader()
        let res = await Promise.all(allPromises)
        console.log("res>>> litigation", res);
        let api_res = await DEATH_API.addLitigation({
          litigationForm: res.map(item => {
            let result = null
            if (item.PotentialWinLoss && typeof item.PotentialWinLoss === "string") {
              result = item.PotentialWinLoss.toLowerCase() === "yes" ? true : item.PotentialWinLoss.toLowerCase() === "no" && false
            }
            return {
              name: item.LitigationNickname,
              liability: item.PotentialLiability,
              result,
              note: item.Notes,
              fileUrl: item.fileUrl,
              fileName: item.Upload,
            }
          })
        })
        this.props.handleLoader()
        let datares = await DEATH_API.fetchLitigation()
        this.props.handleLoader()
        if (datares && datares.data) {
          this.setState({
            litigation_list:
              datares.data.map(item => {
                return {
                  ...item,
                  LitigationNickname: item.name,
                  PotentialLiability: item.liability,
                  PotentialWinLoss: item.result === true ? "Yes" : item.result === false ? "No" : null,
                  Notes: item.note,
                  Upload: item.fileName,
                }
              })
          })
        }
        this.props.handleLoader()
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
    console.log("litigation data>>", data)
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
              <span className="custom-field-heading-style">Nickname:</span>
              <span className="custom-field-value-style"> {data.LitigationNickname || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Potential Liability:
              </span>
              <span className="custom-field-value-style"> {data.PotentialLiability || 'N/A'}</span>
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
              <span className="custom-field-heading-style">Are we Likely to win?:</span>
              <span className="custom-field-value-style"> {data.PotentialWinLoss || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style"> {data.fileUrl ? <a target="_blank" href={data.fileUrl} >{data.Upload}</a> : data.Upload && data.Upload.filename || 'N/A'}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments"></div>
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
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
          ) : (
            ""
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
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
          ) : (
            ""
          )}
        </Col>
        <Col span={1}>
          {role !== "protrustee" ? (
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
          ) : (
            ""
          )}
        </Col>
      </Row>
    );
  };

  render() {
    console.log(this.state.litigation_list)
    const fields = [
      {
        title: "Litigation Nickname",
        type: "input",
        index: "LitigationNickname"
      },
      {
        title: "Potential Liability",
        type: "currency",
        index: "PotentialLiability"
      },
      {
        title: "Are we likely to win?",
        type: "radio",
        index: "PotentialWinLoss"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
      {
        title: "Upload",
        type: "document",
        index: "Upload"
      },
    ];


    const update_fields = [
      {
        title: "Litigation Nickname",
        type: "input",
        index: "LitigationNickname"
      },
      {
        title: "Potential Liability",
        type: "currency",
        index: "PotentialLiability"
      },
      {
        title: "Are we likely to win?",
        type: "radio",
        index: "PotentialWinLoss"
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes"
      },
      {
        title: "Upload",
        type: "document",
        index: "Upload"
      },
    ];

    const litigation = [
      {
        title: "Pending Litigation Nickname",
        dataIndex: "pending_litigation_name",
        key: "pending_litigation_name",
        fields: [
          {
            type: "Input",
            name: "pending_litigation_name",
          },
        ],
      },
      {
        title: "Potential $ Liability",
        dataIndex: "potential_liability",
        key: "potential_liability",
        fields: [
          {
            type: "Currency",
            name: "potential_liability",
          },
        ],
      },
      {
        title: "Potential Win/Loss",
        dataIndex: "potential_win_loss",
        key: "potential_win_loss",
        fields: [
          {
            type: "Radio",
            name: "potential_win_loss",
            values: ["Win", "Loss"],
          },
        ],
      },
      {
        title: "Litigation Notes",
        dataIndex: "litigation_notes",
        key: "litigation_notes",
        fields: [
          {
            type: "TextArea",
            name: "litigation_notes",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload",
        key: "file_upload",
        fields: [
          {
            type: "Document",
            name: "file_upload",
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
      handleRadioChange,
      role
    } = this.props;
    console.log(this.state.updateObject)
    return (
      <React.Fragment>
        <AddModal
          title={"Add New Litigation"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handleRadioChange={handleRadioChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createLitigation}
        />

        <UpdateModal
          title={"Update Litigation"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updateLitigation}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />

        <ViewModal
          title={"View Litigation"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          obj={this.state.updateObject}

        />

        {/* <Header image={law} title={"Litigation"} /> */}
        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={law}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Litigation
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

        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Litigation</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                Litigation List is not applicable to each person that dies but having the ability to convey
                details of pending litigation might be very beneficial to those the Plan Creator leaves behind.
                If the person that died spent years fighting for their day in court, then they would want
                those left behind to gain access to the maximum amount of information, so that they can
                pursue the case to benefit those chosen by the Plan Creator.  Knowing that a Plan Creator is
                not losing a litigation case because they didn’t share notes and details is an honest comfort
                for many people as it addresses the need to not feel like a victim.  The opposite can also be
                true if the Plan Creator is in litigation against them, and they would want the maximum
                information available to the Trusted Individuals so that they can find ways to protect the
                estate in civil court.
              </h2>

            </div>
          </div>
        </Modal>

        <Add
          title={"Litigation"}
          button={"Add New Litigation"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
        />

        {/* get litigation row */}
        {this.state.litigation_list.map((data, index) =>
          this.getRow({ data, index: index + 1, id: data.id })
        )}

        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm
          //    this.props.nextForm(async () => {
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
          //       let res = await Promise.all(allPromises)
          //       let api_res = await DEATH_API.addLitigation({
          //         litigationForm: res.map(item => {
          //           let result = null
          //           if (item.PotentialWinLoss && typeof item.PotentialWinLoss === "string") {
          //             result = item.PotentialWinLoss.toLowerCase() === "yes" ? true : item.PotentialWinLoss.toLowerCase() === "no" && false
          //           }
          //           return {
          //             name: item.LitigationNickname,
          //             liability: item.PotentialLiability,
          //             result,
          //             note: item.Notes,
          //             fileUrl: item.fileUrl
          //           }
          //         })
          //       })
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

export default LitigationForm