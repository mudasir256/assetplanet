import React, { Component } from "react";
import password2 from "../../../assets/images/latest/password2.png";
import SubFormTable from "../../SubFormTable";
import { saveAs } from 'file-saver'
import { Button, Icon, Row, Col, Modal } from "antd";
import { connect } from 'react-redux';
import { postSavedOtp } from "../../../redux/slices/loginSlice";
// import { Button } from "../../components/button/Button";
import { Input } from "../../../components/input/Input";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import swal from "sweetalert";
import "../../custom/CustomSubFormTable.css";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import DEATH_API from "../../../apis/death.api";
import Loader from "../../../components/styled-components/loader/loader";
const formName = "listOfPasswordsForm";

class ListOfPasswordsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

      list_of_passwords: [],
      formData: {},
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      isViewModalVisible: false,
      updateObject: null,
      newData: [],
      isModalOpen: false,
      userData: {},
      message: "",
      OTP_Status: false,
      TooltipModal: false,

    };
    this.fileRef = React.createRef();
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
  showModal = async () => {
    this.setState({
      isModalOpen: true,
    });
    console.log("userData", this.state.userData);
    try {
      const ID = localStorage.getItem("accessId")

      let data = await DEATH_API.configOtp(ID);
      // console.log("data.message",data.message)

    } catch (error) {
      console.log("e ", error);
    }

  };

  handleOk = async () => {

    console.log("login......", this.state.userData);

    if (this.state.userData !== undefined) {
      this.props.postSavedOtp(this.state.userData.otp)
      localStorage.setItem("otp", this.state.userData.otp)
      this.props.handleLoader()
      try {
        const ID = localStorage.getItem("accessId")

        let data = await DEATH_API.fetchPasswords(this.state.userData && this.state.userData.otp, ID);
        this.setState({ message: data })
        console.log("data passwordlist", data)

        if (data && data.data) {
          this.setState({
            list_of_passwords: data.data.map((item) => {
              return {
                ...item,
                SiteAppProgram: item.appName,
                UserName: item.userName,
                WhosPassword: item.passwordFor,
                PasswordHint: item.passwordHint,
                WebsiteURL: item.appUrl,
                TwoFA: item.twoFactor,
                Pin: item.pin,
                Notes: item.note,
                SecurityQuestion: item.securityQuestion,
                Answer: item.answer,
              };
            }),
          });
        }

        this.props.handleLoader()

        if (this.state.userData.otp) {
          this.setState({
            isModalOpen: false,
          });
        }
        else {
          swal("Oops!", "Invalid OTP", "error")
        }
      }
      catch (error) {
        console.log("here in catch", error);
      }
    }
    if (this.state.message.message === "clients.otp.misMatch") {
      swal("Oops!", "clients.otp.misMatch", "error")
      this.setState({
        isModalOpen: true,
      });

    }
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
    this.props.postSavedOtp("")
    localStorage.setItem("otp", "");
  };
  handleLogin = async () => {
    console.log("login......", this.state.userData);
  };


  isSecondPasswordGranted = async () => {
    try {
      this.props.handleLoader()
      let data = await DEATH_API.getSecondPasswordStatus();
      this.props.handleLoader()
      console.log("data.message", data.date.secondPasswordGranted)
      this.setState({
        OTP_Status: data.date.secondPasswordGranted,
      });
      if (data.date.secondPasswordGranted === 1) {

        if (!localStorage.getItem("otp")) {
          localStorage.setItem("otp", "")
        }
        if (localStorage.getItem("otp") === "") {
          this.showModal();
        }
        else {
          this.props.handleLoader()
          console.log("this.state.userData", this.state.userData)
          if (localStorage.getItem("otp")) {
            const ID = localStorage.getItem("accessId")

            let data = await DEATH_API.fetchPasswords(localStorage.getItem("otp"), ID);
            if (data.message === "clients.otp.expired") {
              this.showModal();
            }
            else {
              if (data && data.data) {
                this.setState({
                  list_of_passwords: data.data.map((item) => {
                    return {
                      ...item,
                      SiteAppProgram: item.appName,
                      UserName: item.userName,
                      WhosPassword: item.passwordFor,
                      PasswordHint: item.passwordHint,
                      WebsiteURL: item.appUrl,
                      TwoFA: item.twoFactor,
                      Pin: item.pin,
                      Notes: item.note,
                      SecurityQuestion: item.securityQuestion,
                      Answer: item.answer,
                    };
                  }),
                });
              }
            }
            this.props.handleLoader()
          }
        }
      }

      if (data.date.secondPasswordGranted === 0) {
        this.props.handleLoader()
        swal("Restricted!", "You have not been granted access to this information.", "warning");

        this.props.handleLoader()
      }



    } catch (error) {
      console.log("e ", error);
    }
  }

  componentDidMount() {
    if (
      this.props.checklistObject.listOfPasswordsForm &&
      this.props.checklistObject.listOfPasswordsForm.hasOwnProperty(
        "list_of_passwords"
      )
    )
      this.setState({
        list_of_passwords:
          this.props.checklistObject.listOfPasswordsForm.list_of_passwords,
      });
    (async () => {
      // this.setState({
      //   isModalOpen:true,
      // });
      let Role = localStorage.getItem("role") && JSON.parse(localStorage.getItem("role"));
      if (Role == "protrustee") {
        this.isSecondPasswordGranted();
      }

      if (Role !== "protrustee") {
        if (!localStorage.getItem("otp")) {
          localStorage.setItem("otp", "")
        }
        if (localStorage.getItem("otp") === "") {
          this.showModal();
        }
        else {
          this.props.handleLoader()
          console.log("this.state.userData", this.state.userData)
          if (localStorage.getItem("otp")) {
            const ID = localStorage.getItem("accessId")

            let data = await DEATH_API.fetchPasswords(localStorage.getItem("otp"), ID);
            if (data.message === "clients.otp.expired") {
              this.showModal();
            }
            else {
              if (data && data.data) {
                this.setState({
                  list_of_passwords: data.data.map((item) => {
                    return {
                      ...item,
                      SiteAppProgram: item.appName,
                      UserName: item.userName,
                      WhosPassword: item.passwordFor,
                      PasswordHint: item.passwordHint,
                      WebsiteURL: item.appUrl,
                      TwoFA: item.twoFactor,
                      Pin: item.pin,
                      Notes: item.note,
                      SecurityQuestion: item.securityQuestion,
                      Answer: item.answer,
                    };
                  }),
                });
              }
            }
            this.props.handleLoader()
          }
        }
      }

      // if (this.OTP_Status === 1) {

      //   if (!localStorage.getItem("otp")) {
      //     localStorage.setItem("otp", "")
      //   }
      //   if (localStorage.getItem("otp") === "") {
      //     this.showModal();
      //   }
      //   else {
      //     this.props.handleLoader()
      //     console.log("this.state.userData", this.state.userData)
      //     if (localStorage.getItem("otp")) {
      //       const ID = localStorage.getItem("accessId")

      //       let data = await DEATH_API.fetchPasswords(localStorage.getItem("otp"), ID);
      //       if (data.message === "clients.otp.expired") {
      //         this.showModal();
      //       }
      //       else {
      //         if (data && data.data) {
      //           this.setState({
      //             list_of_passwords: data.data.map((item) => {
      //               return {
      //                 ...item,
      //                 SiteAppProgram: item.appName,
      //                 UserName: item.userName,
      //                 WhosPassword: item.passwordFor,
      //                 PasswordHint: item.passwordHint,
      //                 WebsiteURL: item.appUrl,
      //                 TwoFA: item.twoFactor,
      //                 Pin: item.pin,
      //                 Notes: item.note,
      //                 SecurityQuestion: item.securityQuestion,
      //                 Answer: item.answer,
      //               };
      //             }),
      //           });
      //         }
      //       }
      //       this.props.handleLoader()
      //     }
      //   }
      // }

      // if (this.OTP_Status === 0) {
      //   this.props.handleLoader()
      //   console.log("this.state.userData", this.state.userData)
      //   const ID = localStorage.getItem("accessId")

      //   let data = await DEATH_API.fetchPasswords(null, ID);
      //   if (data && data.data) {
      //     this.setState({
      //       list_of_passwords: data.data.map((item) => {
      //         return {
      //           ...item,
      //           SiteAppProgram: item.appName,
      //           UserName: item.userName,
      //           WhosPassword: item.passwordFor,
      //           PasswordHint: item.passwordHint,
      //           WebsiteURL: item.appUrl,
      //           TwoFA: item.twoFactor,
      //           Pin: item.pin,
      //           Notes: item.note,
      //           SecurityQuestion: item.securityQuestion,
      //           Answer: item.answer,
      //         };
      //       }),
      //     });
      //   }
      //   this.props.handleLoader()
      // }

      // else {
      //   this.props.handleLoader()
      //   console.log("this.state.userData", this.state.userData)
      //   const ID = localStorage.getItem("accessId")

      //   let data = await DEATH_API.fetchPasswords(null, ID);
      //   if (data && data.data) {
      //     this.setState({
      //       list_of_passwords: data.data.map((item) => {
      //         return {
      //           ...item,
      //           SiteAppProgram: item.appName,
      //           UserName: item.userName,
      //           WhosPassword: item.passwordFor,
      //           PasswordHint: item.passwordHint,
      //           WebsiteURL: item.appUrl,
      //           TwoFA: item.twoFactor,
      //           Pin: item.pin,
      //           Notes: item.note,
      //           SecurityQuestion: item.securityQuestion,
      //           Answer: item.answer,
      //         };
      //       }),
      //     });
      //   }
      //   this.props.handleLoader()
      // }


      // if (!localStorage.getItem("otp")) {
      //   localStorage.setItem("otp", "")
      // }
      // if (localStorage.getItem("otp") === "") {
      //   this.showModal();
      //   // try {
      //   //   let data = await DEATH_API.configOtp();
      //   //   // console.log("data.message",data.message)

      //   // } catch (error) {
      //   //   console.log("e ", error);
      //   // }
      // }
      // else {
      //   this.props.handleLoader()
      //   console.log("this.state.userData", this.state.userData)
      //   if (localStorage.getItem("otp")) {
      //     const ID = localStorage.getItem("accessId")

      //     let data = await DEATH_API.fetchPasswords(localStorage.getItem("otp"), ID);
      //     if (data.message === "clients.otp.expired") {
      //       this.showModal();
      //     }
      //     else {
      //       if (data && data.data) {
      //         this.setState({
      //           list_of_passwords: data.data.map((item) => {
      //             return {
      //               ...item,
      //               SiteAppProgram: item.appName,
      //               UserName: item.userName,
      //               WhosPassword: item.passwordFor,
      //               PasswordHint: item.passwordHint,
      //               WebsiteURL: item.appUrl,
      //               TwoFA: item.twoFactor,
      //               Pin: item.pin,
      //               Notes: item.note,
      //               SecurityQuestion: item.securityQuestion,
      //               Answer: item.answer,
      //             };
      //           }),
      //         });
      //       }
      //     }
      //     this.props.handleLoader()
      //   }
      // }
    })();
    this.props.handleChecklistObject(
      this.props.currentForm,
      this.state.list_of_passwords
    );
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
  deleteSelectedRow = async (idx, id) => {

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
          const { list_of_passwords } = that.state;
          that.props.handleLoader()
          await DEATH_API.deletePassword(id);
          const updatedRows = list_of_passwords.filter((row, index) => {
            return index != idx - 1;
          });

          that.setState(
            {
              list_of_passwords: updatedRows,
            },
            () => {
              that.props.handleChecklistObject(
                that.props.currentForm,
                that.state.list_of_passwords
              );
            }
          );
          that.props.handleLoader()
        } catch (error) {
          that.props.handleLoader()
          console.log(error)
        }
        setTimeout(async () => {
          // that.props.handleLoader()
          swal("Deleted!", "Your file has been deleted.", "success");
        }, 0)
      } else {
        swal("Cancelled", "Your file is safe :)", "error");
      }
    });


    // try {
    //   const { list_of_passwords } = this.state;
    //   this.props.handleLoader()

    //   await DEATH_API.deletePassword(id);
    //   const updatedRows = list_of_passwords.filter((row, index) => {
    //     return index != idx - 1;
    //   });

    //   this.setState(
    //     {
    //       list_of_passwords: updatedRows,
    //     },
    //     () => {
    //       this.props.handleChecklistObject(
    //         this.props.currentForm,
    //         this.state.list_of_passwords
    //       );
    //     }
    //   );
    //   this.props.handleLoader()
    // } catch (error) {
    //   this.props.handleLoader()
    //   console.log(error)
    // }

  };

  // Function to get selected  array (row)
  getSelectedRow = (idx) => {
    this.setState({
      selectedIndex: idx,
    });

    const { list_of_passwords } = this.state;

    // get selected row (this will return array of object)
    let selectedRow = list_of_passwords.filter((row, index) => {
      return index == idx - 1;
    });

    // get first and only element from list and store it in update object
    this.setState({
      updateObject: { ...this.state.updateObject, ...selectedRow[0] },
    });
  };

  //  function to update a list of passwords row
  updatePasswords = async () => {
    try {
      let obj = {
        ...this.state.updateObject,
        appName: this.state.updateObject.SiteAppProgram,
        userName: this.state.updateObject.UserName,
        passwordFor: this.state.updateObject.WhosPassword,
        passwordHint: this.state.updateObject.PasswordHint,
        appUrl: this.state.updateObject.WebsiteURL,
        twoFactor: this.state.updateObject.TwoFA,
        pin: this.state.updateObject.Pin,
        note: this.state.updateObject.Notes,
        securityQuestion: this.state.updateObject.SecurityQuestion,
        answer: this.state.updateObject.Answer
      };

      this.props.handleLoader()
      await DEATH_API.updatePasswords(obj.id, {
        ...obj,
      });
      let { list_of_passwords, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      list_of_passwords = [...this.state.list_of_passwords]; // important to create a copy, otherwise you'll modify state outside of setState call
      list_of_passwords[index] = obj; // replace current updated object in list_of_passwords based on index
      this.setState({ list_of_passwords }, () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.list_of_passwords
        );
      });
      this.props.handleLoader()
    } catch (error) {
      this.props.handleLoader()
      console.log(error)
    }
  };

  // function to create  list of passwords (data)
  createPasswords = async (currentFormData) => {
    // checxk if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }

    // add current form data in list_of_passwords list with keeping old data
    this.setState(
      {
        list_of_passwords: [
          currentFormData.formData,
          ...this.state.list_of_passwords,
        ],
      },
      () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.list_of_passwords
        );
      }
    );
    var arr = [currentFormData.formData];
    try {
      let data = arr;
      if (Array.isArray(data) && data.length > 0) {
        this.props.handleLoader()
        let api_res = await DEATH_API.addPasswords({
          listOfPasswordsForm: data.map((item) => {
            return {
              appName: item.SiteAppProgram,
              userName: item.UserName,
              passwordFor: item.WhosPassword,
              passwordHint: item.PasswordHint,
              appUrl: item.WebsiteURL,
              twoFactor: item.TwoFA,
              pin: item.Pin,
              note: item.Notes,
              securityQuestion: item.SecurityQuestion,
              answer: item.Answer
            };
          }),
        });
        this.props.handleLoader()
        return api_res;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
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

  getRow = ({ data, index }) => {
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
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Site/App:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.SiteAppProgram || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Who's Password:
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.WhosPassword || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Website URL:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.WebsiteURL || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                Security Question:
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.SecurityQuestion || 'N/A'}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Username:</span>
              <span className="custom-field-value-style"> {data.UserName || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">
                {" "}
                Password Hint:{" "}
              </span>
              <span className="custom-field-value-style">
                {" "}
                {data.PasswordHint || 'N/A'}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> 2FA: </span>
              <span className="custom-field-value-style"> {data.TwoFA || 'N/A'}</span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Pin: </span>
              <span className="custom-field-value-style"> {data.Pin || 'N/A'}</span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style"> Notes: </span>
              <span className="custom-field-value-style"> {data.Notes || 'N/A'}</span>
            </div>
          </div>
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
                  this.deleteSelectedRow(index, data.id);
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

  openFileRef = () => {
    const files = this.fileRef.current.click();
    if (files) {
      console.log("files inside..", files);
    }
    // console.log("files.....", files)
    // console.log("fileref upload", this.fileRef.current.click());

  };

  downloadTemplate = async () => {
    try {
      this.props.handleLoader();
      const res = await DEATH_API.getPasswordTemplates("password");
      this.props.handleLoader();
      console.log("res.....", res.url);
      saveAs(res.url, 'passwordTemplate');

    } catch (error) {
      console.log(error)
    }

  };
  downloadFileRef = async () => {

    try {
      this.props.handleLoader();
      const res = await DEATH_API.exportPasswordSheet("password");
      this.props.handleLoader();
      console.log("res.....", res.url);
      saveAs(res.url, 'passwordSheet');

    } catch (error) {
      console.log(error)
    }

  };
  render() {
    const fields = [
      {
        title: "Site / App / Program",
        type: "input",
        index: "SiteAppProgram",
      },
      {
        title: "User Name",
        type: "input",
        index: "UserName",
      },
      {
        title: "Who's Password",
        type: "input",
        index: "WhosPassword",
      },
      {
        title: "Password Hint",
        type: "input",
        index: "PasswordHint",
      },
      {
        title: "Website URL",
        type: "web",
        index: "WebsiteURL",
      },
      {
        title: "2FA",
        type: "input",
        index: "TwoFA",
      },
      {
        title: "Pin",
        type: "input",
        index: "Pin",
      },
      {
        title: "Security Question",
        type: "input",
        // type: "select",
        // options: ["Abc", "Def", "Others"],
        index: "SecurityQuestion",
      },
      {
        title: "Answer",
        type: "input",
        index: "Answer",
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes",
      },
    ];

    const update_fields = [
      {
        title: "Site / App / Program",
        type: "input",
        index: "SiteAppProgram",
      },
      {
        title: "User Name",
        type: "input",
        index: "UserName",
      },
      {
        title: "Who's Password",
        type: "input",
        index: "WhosPassword",
      },
      {
        title: "Password Hint",
        type: "input",
        index: "PasswordHint",
      },
      {
        title: "Website URL",
        type: "web",
        index: "WebsiteURL",
      },
      {
        title: "2FA",
        type: "input",
        index: "TwoFA",
      },
      {
        title: "Pin",
        type: "input",
        index: "Pin",
      },
      {
        title: "Security Question",
        type: "input",
        // type: "select",
        // options: ["Abc", "Def", "Others"],
        index: "SecurityQuestion",
      },
      {
        title: "Answer",
        type: "input",
        index: "Answer",
      },
      {
        title: "Notes",
        type: "textarea",
        index: "Notes",
      },
    ];
    const largeBills = [
      {
        title: "Site/App/Program",
        dataIndex: "site",
        key: "site",
        fields: [
          {
            type: "Input",
            name: "site",
          },
        ],
      },
      {
        title: "Who's Password",
        dataIndex: "whos_password",
        key: "whos_password",
        fields: [
          {
            type: "Select",
            name: "whos_password",
            placeholder: "-Select-",
            values: ["Digital", "Physical"],
          },
        ],
      },
      {
        title: "Website URL",
        dataIndex: "website_url",
        key: "website_url",
        fields: [
          {
            type: "WebAddress",
            name: "website_url",
          },
        ],
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        fields: [
          {
            type: "Input",
            name: "username",
          },
        ],
      },
      {
        title: "Password Hint",
        dataIndex: "password_hint",
        key: "password_hint",
        fields: [
          {
            type: "Input",
            name: "password_hint",
          },
        ],
      },
      {
        title: "2FA",
        dataIndex: "fa",
        key: "fa",
        fields: [
          {
            type: "Select",
            name: "fa",
            placeholder: "-Select-",
            values: [
              "SMS",
              "Phone",
              "Email",
              "Authenticator App",
              "Physical Token",
            ],
          },
        ],
      },
      {
        title: "Security Question Answers",
        dataIndex: "security_question",
        key: "security_question",
        fields: [
          {
            type: "Input",
            name: "security_question",
          },
        ],
      },
      {
        title: "Pin",
        dataIndex: "pin",
        key: "pin",
        fields: [
          {
            type: "Input",
            name: "pin",
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
      handleWebChange,
      role,
    } = this.props;
    // console.log(this.state.list_of_passwords);
    console.log("otp", this.state.userData.otp);

    return (
      <React.Fragment>
        <input
          type="file"
          id="file"
          accept=".csv, application/vnd.ms-excel, text/csv"
          ref={this.fileRef}
          style={{ display: "none" }}
          onChange={async (event) => {
            try {
              const formData = new FormData();
              formData.append('file', event.target.files[0])
              this.props.handleLoader()
              const res = await DEATH_API.uploadPasswordSheet(formData);
              // let data = await DEATH_API.fetchPasswords();

              // if (data && data.data) {
              //   this.setState({
              //     list_of_passwords: data.data.map((item) => {
              //       return {
              //         ...item,
              //         SiteAppProgram: item.appName,
              //         UserName: item.userName,
              //         WhosPassword: item.passwordFor,
              //         PasswordHint: item.passwordHint,
              //         WebsiteURL: item.appUrl,
              //         TwoFA: item.twoFactor,
              //         Pin: item.pin,
              //         Notes: item.note,
              //         SecurityQuestion: item.securityQuestion,
              //         Answer: item.answer,
              //       };
              //     }),
              //   });
              // }

              this.props.handleLoader()


            } catch (error) {
              console.log(error)
            }
          }}

        />
        <AddModal
          title={"Add New Password"}
          fields={fields}
          isVisible={this.state.isAddModalVisible}
          cbClose={this.setAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handleWebChange={handleWebChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createPasswords}
        />
        <Modal title={"List of Passwords"} visible={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div style={{ marginTop: "20px" }}>
            {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
            <div className="">
              <h2 className="otp-heading">This passcode provides another layer of security for your list of passwords. The passcode is only valid for this session.</h2>
              <div>
                <InputGroup>
                  <label>Code that was sent to your mobile</label>
                  <Input
                    onChange={(e) => {
                      this.setState({
                        userData: { ...this.state.userData, [e.target.name]: e.target.value }
                      });
                    }}
                    id="otp"
                    type="text"
                    // pattern="[0-9]{10}"
                    pattern="[0-9.]+"
                    // pattern="[0-9]+"
                    // pattern="\d*"
                    // maxlength="4"
                    maxLength={6}
                    placeholder="***OTP***"
                    name="otp"
                  ></Input>
                </InputGroup>


                <Button
                  onClick={async () => {
                    console.log()
                    const ID = localStorage.getItem("accessId")
                    let data = await DEATH_API.configOtp(ID);

                  }}
                >
                  Resend OTP
                </Button>


              </div>
            </div>
          </div>
        </Modal>
        <UpdateModal

          title={"Update Password"}
          fields={update_fields}
          isVisible={this.state.isUpdateModalVisible}
          cbClose={this.setUpdateModalVisible}
          cbUpdate={this.updatePasswords}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}

        // onConstraints={this.onConstraints}
        />

        <ViewModal
          title={"Update Password"}
          fields={update_fields}
          isVisible={this.state.isViewModalVisible}
          cbClose={this.setViewModalVisible}
          obj={this.state.updateObject}
        />

        {/* <Header image={password2} title={"List of Passwords"} /> */}

        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={password2}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              List of Passwords
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
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >List of Passwords</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                We live in a digital age and accessing information often requires passwords.  The Plan
                Creator might leave nothing on this subject, maybe a few handwritten items, or very
                detailed listings.  Plan Creators might choose to link to a third-party password manager or
                leave a password protected PDF.  The myriad of choices is many, and this program feature
                allows for an easy repository or gateway for password accessibility after death.  The
                Passwords module is only accessible via 2FA code sent to phone via text (SMS), and only
                upon plan activation so that privacy is ensured while the Plan Creators are alive.
              </h2>

            </div>
          </div>
        </Modal>
        <Add
          title={"Passwords"}
          button={"Add Passwords"}
          cbAdd={this.setAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
          list={[
            {
              option: "Download Template",
              cb: this.downloadTemplate,
            },
            {
              option: "Upload Password Sheet",
              cb: this.openFileRef,
            },
            {
              option: "Download Password Sheet",
              cb: this.downloadFileRef,
            },
          ]}
        />
        {/* get list of passwords row */}
        {this.state.list_of_passwords.map((data, index) =>
          this.getRow({ data, index: index + 1 })
        )}

        <Footer
          cbPrev={this.props.previousForm}
          cbNext={this.props.nextForm
            // this.props.nextForm(async () => {
            //   try {
            //     let data = this.state.newData;
            //     if (Array.isArray(data) && data.length > 0) {
            //       this.props.handleLoader()
            //       let api_res = await DEATH_API.addPasswords({
            //         listOfPasswordsForm: data.map((item) => {
            //           return {
            //             appName: item.SiteAppProgram,
            //             userName: item.UserName,
            //             passwordFor: item.WhosPassword,
            //             passwordHint: item.PasswordHint,
            //             appUrl: item.WebsiteURL,
            //             twoFactor: item.TwoFA,
            //             pin: item.Pin,
            //             note: item.Notes,
            //             securityQuestion: item.SecurityQuestion,
            //             answer: item.Answer
            //           };
            //         }),
            //       });
            //       this.props.handleLoader()
            //       return api_res;
            //     }
            //   } catch (error) {
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
const mapStateToProps = (state) => ({
  savedOTP: state.rootReducer.loginUser.savedOtp
});

const mapDispatchToProps = { postSavedOtp };

export default connect(mapStateToProps, mapDispatchToProps)(ListOfPasswordsForm);