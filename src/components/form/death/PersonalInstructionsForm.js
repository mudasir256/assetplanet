import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col,Modal } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import User_Defined from "../../../assets/images/latest/User-Defined.png";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import MODULE_API from "../../../apis/module.api";
import { saveAs } from 'file-saver'
import swal from "sweetalert";
import DEATH_API from "../../../apis/death.api";
import axios from "axios";

class PersonalInstructionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

      personal_instructions: [],
      formData: {},
      newData: [],
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      TooltipModal: false,

    };
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
  componentDidMount() {
    if (
      this.props.checklistObject.personalInstructionsForm &&
      Array.isArray(this.props.checklistObject.personalInstructionsForm) &&
      this.props.checklistObject.personalInstructionsForm.length <= 0
    ) {
      this.setState({
        personal_instructions:
          this.props.checklistObject.personalInstructionsForm,
      });
    }

    (async () => {
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId")
      let data = await DEATH_API.fetchPersonalInstructions(ID);
      // console.log("personal instruction in componentdid mount..", data)
      this.props.handleLoader();
      if (data && data.data) {
        this.setState({
          personal_instructions: data.data.map((item) => {
            item = {
              ...item,
              PersonalInstructions: item.text,
              title: item.title,
              UploadFileHere: item.fileName,
            };
            return item;
          }),
        });
      }
    })();

    this.props.handleChecklistObject(
      this.props.currentForm,
      this.state.personal_instructions
    );
  }

  setVisible = () => {
    if (this.state.isVisible) this.setState({ isVisible: false });
    else this.setState({ isVisible: true });
  };

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
  // to handle hide and show for View modal
  setViewModalVisible = () => this.setState({ isViewModalVisible: !this.state.isViewModalVisible });

  // function to store updated values of all fields in updateObject
  onUpdateChange = (val, index) => {
    this.setState(
      {
        updateObject: {
          ...this.state.updateObject,
          [index]: val,
        },
      },
      () => {
        console.log("onUpdateChange state", this.state.updateObject);
      }
    );
  };

  // capture date change of datepicker of update modal
  handleDateChange = (date, dateString, index) => {
    this.onUpdateChange(dateString, index);
  };

  // Function to delete selected row
  deleteSelectedRow = async (idx) => {
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
    }).then(function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        that.props.handleLoader()
        try {
          that.props.handleLoader();
          const { personal_instructions } = that.state;
          DEATH_API.deletePersonalInstruction(idx);
          that.props.handleLoader();

          const updatedRows = personal_instructions.filter((row, index) => {
            return row.id != idx;
          });
          that.setState(
            {
              personal_instructions: updatedRows,
            },
            () => {
              that.props.handleChecklistObject(
                that.props.currentForm,
                that.state.personal_instructions
              );
            }
          );
        } catch (error) {
          // console.log("error deleting Personal Instruction");
          console.log(error);
          that.props.handleLoader()

        }
        setTimeout(async () => {
          that.props.handleLoader()
          swal("Deleted!", "Your file has been deleted.", "success");
        }, 0)
      } else {
        swal("Cancelled", "Your file is safe :)", "error");
      }
    });

    // try {
    //   this.props.handleLoader();
    //   const { personal_instructions } = this.state;
    //   await DEATH_API.deletePersonalInstruction(idx);
    //   this.props.handleLoader();

    //   const updatedRows = personal_instructions.filter((row, index) => {
    //     return row.id != idx;
    //   });
    //   this.setState(
    //     {
    //       personal_instructions: updatedRows,
    //     },
    //     () => {
    //       this.props.handleChecklistObject(
    //         this.props.currentForm,
    //         this.state.personal_instructions
    //       );
    //     }
    //   );
    // } catch (error) {
    //   // console.log("error deleting Personal Instruction");
    //   console.log(error);
    //   this.props.handleLoader()

    // }
  };

  // Function to get selected  array (row)
  getSelectedRow = (idx) => {
    this.setState({
      selectedIndex: idx,
    });

    const { personal_instructions } = this.state;
    // get selected row (this will return array of object)
    let selectedRow = personal_instructions.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };

  //  function to update a personal instructions row
  updatePersonalInstructions = async () => {
    try {
      this.props.handleLoader()
      let obj = {
        ...this.state.updateObject,
      };
      let updateBody = {
        text: obj["PersonalInstructions"],
        title: obj["title"],
        fileUrl: obj["fileUrl"],
        fileName: obj["UploadFileHere"],
      };
      if (obj["UploadFileHere"] && typeof obj["UploadFileHere"] != "string") {


        const formData = new FormData();
        formData.append("video", obj["UploadFileHere"]);

        const name = obj["UploadFileHere"].name;
        const lastDot = name.lastIndexOf('.');
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        const resdata = await MODULE_API.uploadFile({ fileExt: ext, contentType: obj["UploadFileHere"].type })
        const resupload = await axios.put(resdata.uploadUrl, obj["UploadFileHere"], { headers: { 'Content-type': obj["UploadFileHere"].type } })
        const res = resdata.uploadUrl.split("?")[0]
        console.log("resss video url", res);
        // const uploaded = await MODULE_API.uploadImage(formData);
        updateBody.fileUrl = res;
        updateBody.fileName = name;
        obj["UploadFileHere"] = name;
        // const formData = new FormData();
        // formData.append("image", obj["UploadFileHere"]);
        // const uploaded = await MODULE_API.uploadImage(formData);
        // // console.log("updated file Url", uploaded.file_url);
        // updateBody.fileUrl = uploaded.file_url;
        // updateBody.fileName = obj["UploadFileHere"].name;
        // obj["UploadFileHere"] = obj["UploadFileHere"].name;
      }
      let api_res = await DEATH_API.updatePersonalInstructions(
        obj.id,
        updateBody
      );
      this.props.handleLoader()

      if (api_res) swal("Success!", "Data updated", "success");
      let { personal_instructions, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      personal_instructions = [...this.state.personal_instructions]; // important to create a copy, otherwise you'll modify state outside of setState call
      personal_instructions[index] = obj; // replace current updated object in personal_instructions based on index
      this.setState({ personal_instructions }, () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.personal_instructions
        );
      });
    } catch (error) {
      this.props.handleLoader()
      console.log(error)
      swal('Error!!', "Not Updated", 'error')
    }
  };
  // function to create personal instructions (data)
  createPersonalInstructions = (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }
    // add current form data in personal_instructions list with keeping old data
    this.setState(
      {
        personal_instructions: [
          currentFormData.formData,
          ...this.state.personal_instructions,
        ],
      },
      () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.personal_instructions
        );
      }
    );
    this.createPerson(currentFormData.formData);
    // console.log("in personal instruction sis mount",this.state.personal_instructions);
  };

  createPerson = async (newPerson) => {
    console.log("newPerson create new", newPerson)
    console.log("data create new", this.state.newData)
    try {
      this.props.handleLoader()
      let arr = [newPerson];
      console.log("arrrrrrrr", arr)
      let data = arr;
      console.log("data on next click", data);
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


            // const formData = new FormData();
            // formData.append("image", item.file);
            // const uploaded = await MODULE_API.uploadImage(formData);
            // delete item.file;
            // return { ...item, fileUrl: uploaded.file_url };
          }
          return item;
        });
        let res = await Promise.all(allPromises);
        console.log("res>>>>", res)
        let api_res = await DEATH_API.addPersonalInstructions({
          personalInstructionsForm: res.map((item) => {
            return {
              text: item.PersonalInstructions,
              title: item.title,
              fileName: item.UploadFileHere,
              fileUrl: item.fileUrl
            };
          }),
        });
        // this.props.handleLoader();
        let datares = await DEATH_API.fetchPersonalInstructions();
        console.log("personal instruction in componentdid mount..", datares)
        this.props.handleLoader();
        if (datares && datares.data) {
          this.setState({
            personal_instructions: datares.data.map((item) => {
              item = {
                ...item,
                PersonalInstructions: item.text,
                title: item.title,
                UploadFileHere: item.fileName,
              };
              return item;
            }),
          });
        }
        return api_res;
      }


    } catch (error) {
      this.props.handleLoader()
      console.log(error);
      throw new Error(error);
    }

  }
  // store all modal data in formData state
  setFormData = (value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        ...value,
      },
    });
  };

  getRow = ({ data, id, index }) => {
    const { role } = this.props;
    // console.log("dataaaa for file instruction", data)
    // console.log("personal instruction", this.state.personal_instructions)
    return (
      <Row key={index} type="flex" className="custom-sub-container">
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Title: </span>
              <span className="custom-field-value-style">
                {data.title || "N/A"}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">File:</span>
              <span className="custom-field-value-style">{"  "}
                {data.fileUrl ?
                  <button className="custom-download-style" onClick={() => {
                    saveAs(data.fileUrl, 'imagedownload')
                  }}>
                    {data.UploadFileHere}
                  </button>
                  : <React.Fragment> {`${data.UploadFileHere || 'N/A'}`}</React.Fragment>}

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
                icon={"eye"}
                onClick={() => {
                  this.getSelectedRow(index);
                  this.setViewModalVisible();
                }}
              >

              </Button>
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
      {
        title: "Title",
        type: "input",
        index: "title",
      },
      {
        title: "Personal Instructions",
        type: "textarea",
        index: "PersonalInstructions",
      },

      {
        title: "Upload File Here",
        type: "file",
        index: "UploadFileHere",
      },
    ];

    const update_fields = [
      {
        title: "Title",
        type: "input",
        index: "title",
      },
      {
        title: "Personal Instructions",
        type: "textarea",
        index: "PersonalInstructions",
      },
      {
        title: "Upload File Here",
        type: "file",
        index: "UploadFileHere",
      },
    ];

    const largeBills = [
      {
        title: "Personal Instructions",
        dataIndex: "personal_instructions",
        key: "personal_instructions",
        fields: [
          {
            type: "TextArea",
            name: "personal_instructions",
          },
        ],
      },
      {
        title: "File Upload",
        dataIndex: "file_upload",
        key: "file_upload",
        fields: [
          {
            type: "file",
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
      handleChecklistObject,
      role,
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Add New Personal Instruction"}
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
          create={this.createPersonalInstructions}
        />

        <UpdateModal

          title={"Update Personal Instructions"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePersonalInstructions}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}
        // onConstraints={this.onConstraints}
        />
        <ViewModal

          title={"View Personal Instructions"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          // cbUpdate={this.updatePersonalInstructions}
          // onLoad={this.get}
          obj={this.state.updateObject}

        // onConstraints={this.onConstraints}
        />
        <Row gutter={16}>
        <Col span={24}>
          <h2 className="text-center font-weight-bold mb-4">
            <img
              src={User_Defined}
              height={85}
              width={85}
              style={{ marginRight: "20px" }}
            ></img>
            Personal Instructions
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
      {/*<Header image={User_Defined} title={"Personal Instructions"} /> */}

      <Modal title={<span style={{ textAlign: "center", display: "block" }} >Personal Instructions</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
      <div style={{}}>
        <div className="">
          <h2 className="otp-heading">
          The designers of this software solution have decades of experience in financial wealth 
          management and helping people, and they believe it was critical for a Plan Creator to 
          create, and possibly amend, personal notes.  These notes are the types of items that might 
          not be in a Will or Trust and can highly personal, secretive, or simple instructions.  That 
          favorite collectible item you didn’t mention in a Will or Trust but feel the need to use a 
          Personal Note for added clarity, this small note might help reduce bickering amongst those 
          in conflict over such items.  Personal notes might range from added care of a pet, or 
          something salacious such as having a secret family.   Personal Instructions is another tool to 
          help Plan Creators communicate their wishes and their intent to those they leave behind 
          when they die. 
          </h2>

        </div>
      </div>
    </Modal>

        <Add
          title={"Personal Instructions"}
          button={"Add New Instructions"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
        />



        {/* get PERSONAL INSTRUCTIONS row */}
        {this.state.personal_instructions.map((data, index) =>
          this.getRow({ data, index: index + 1, id: data.id })
        )}
        <Footer
          cbPrev={this.props.previousForm}
          cbNext={this.props.nextForm
            // this.props.nextForm(async () => {
            //   try {
            //     this.props.handleLoader()
            //     let data = this.state.newData;
            //     console.log("data on next click", data);
            //     if (Array.isArray(data) && data.length > 0) {
            //       const allPromises = data.map(async (item) => {
            //         if (item.file) {
            //           const formData = new FormData();
            //           formData.append("image", item.file);
            //           const uploaded = await MODULE_API.uploadImage(formData);
            //           delete item.file;
            //           return { ...item, fileUrl: uploaded.file_url };
            //         }
            //         return item;
            //       });
            //       let res = await Promise.all(allPromises);
            //       console.log("res>>>>", res)
            //       let api_res = await DEATH_API.addPersonalInstructions({
            //         personalInstructionsForm: res.map((item) => {
            //           return {
            //             text: item.PersonalInstructions,
            //             title: item.title,
            //             fileName: item.UploadFileHere,
            //             fileUrl: item.fileUrl
            //           };
            //         }),
            //       });
            //       return api_res;
            //     }
            //   } catch (error) {
            //     this.props.handleLoader()
            //     console.log(error);
            //     throw new Error(error);
            //   }
            // })
          }
        />

      </React.Fragment>
    );
  }
}

export default PersonalInstructionsForm;
