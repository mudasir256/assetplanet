import React, { Component } from "react";
import SubFormTable from "../../SubFormTable";
import { Button, Icon, Row, Col, DatePicker, Form, Modal } from "antd";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import { Input } from "../../../components/input/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import world from "../../../assets/images/latest/world.png";
import Header from "../components/header";
import Add from "../components/add";
import Footer from "../components/footer";
import AddModal from "../components/addmodal";
import moment from "moment";
import WebAddress from "../../../components/form/WebAddress";
import UpdateModal from "../components/updatemodal";
import ViewModal from "../components/viewmodal";
import DEATH_API from "../../../apis/death.api";
import ContactList from "../../ContactList";
import MODULE_API from "../../../apis/module.api";
const formName = "emailToSendForm";

const dateFormat = "MM/DD/YYYY";

class EmailToSendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_to_send: [],
      templateValue: [""],
      templatesName: [""],
      newData: [],
      texts: [],
      formData: {},
      newDataText: [],
      isEmailAddModalVisible: false,
      isTemplateModalVisible: false,
      isTextAddModalVisible: false,
      isEmailUpdateModalVisible: false,
      isEmailViewModalVisible: false,
      isTextViewModalVisible: false,
      isTextUpdateModalVisible: false,
      isModalOpen: false,
      isTextModalOpen: false,
      updateObject: null,
      selectedIndex: null,
      newDataTemplate: [],
      templates: [],
      textTemplates: [],
      templateValueText: [""],
      newDataTemplateText: [],
      clinetFuneralData: {},
      FuneralData: {},
      TooltipModal: false,
      isHistoryModalOpen: false,
      emailLogs: [],
      emailLogsCount: [],
      textButoon: true,
      emailButton: true,
    };
  }

  // componentDidUpdate(){
  //   console.log("fghjkl;",this.state.updateObject);
  // }

  componentDidMount() {
    try {
      if (
        this.props.checklistObject.emailToSendForm &&
        this.props.checklistObject.emailToSendForm.hasOwnProperty(
          "email_to_send"
        )
      )
        this.setState({
          email_to_send:
            this.props.checklistObject.emailToSendForm.email_to_send,
        });
      (async () => {
        this.props.handleLoader();
        const ID = localStorage.getItem("accessId");
        let Role =
          localStorage.getItem("role") &&
          JSON.parse(localStorage.getItem("role"));
        if (Role == "protrustee") {
          const data = await DEATH_API.getFuneralInfo(ID);
          console.log("data funeral info", data);
          if (data && data.data) {
            this.setState({
              FuneralData: data.data,
            });
          }
        }
        const data = await DEATH_API.fetchEmail(ID);
        const dataText = await DEATH_API.fetchText(ID);
        if (data && data.data) {
          this.setState({
            email_to_send: data.data.map((item) => {
              return {
                ...item,
                To: item.to,
                CC: item.cc,
                Subject: item.subject,
                TemplateNickName: item.email_template.templateName,
                Template: item.email_template.template,
                Templates: item.email_template.templateName,
                sendStatus: item.sendStatus,
                emailTemplateId: item.email_template.id,
              };
            }),
          });

          data.data.map((item) => {
            if (item.sendStatus === false) {
              this.setState({ emailButton: item.sendStatus });
            }
          });
        }
        const datatemp = await DEATH_API.getTemplate();
        // console.log("datatempdatatempdatatemp>>",datatemp);
        if (datatemp && datatemp.data) {
          this.setState({
            templateValue: datatemp.data.map((item) => {
              return {
                ...item,
                id: item.id,
                name: item.templateName,
              };
            }),
          });
        }
        // console.log("data.templates",data.templates)
        if (data && data.templates) {
          this.setState({
            templatesName: data.templates.map((items) => items.templateName),
          });
        }
        if (dataText && dataText.data) {
          this.setState({
            texts: dataText.data.map((item) => {
              return {
                ...item,
                TextTo: item.to,
                Phone: item.phoneNumber,
                Subject: item.subject,
                Relationship: item.relationship,
                TextTemplateNickname: item.templateName,
                TextMessage: item.message,
                Template: item.text_template.template,
                textTemplateId: item.text_template.id,
                TextTemplates: item.text_template.templateName,
              };
            }),
          });
          dataText.data.map((item) => {
            if (item.sendStatus === false) {
              this.setState({ textButoon: item.sendStatus });
              console.log("text status", item.sendStatus);
            }
          });
        }

        const datatemp1 = await DEATH_API.getTextTemplate();
        // console.log("datatempdatatempdatatemp>>",datatemp);
        if (datatemp1 && datatemp1.data) {
          this.setState({
            templateValueText: datatemp1.data.map((item) => {
              return {
                ...item,
                id: item.id,
                name: item.templateName,
              };
            }),
          });
        }

        const dataTable = await DEATH_API.getEmailCounts();
        console.log("data in death status", dataTable);
        if (dataTable && dataTable.countEmailLogs) {
          console.log("here in email table fetching", dataTable.countEmailLogs);

          const statusCountObject = {};
          dataTable.countEmailLogs.forEach((item) => {
            statusCountObject[item.status] = item.count;
          });
          let wrapper = [statusCountObject];
          console.log("wrapper", wrapper);
          this.setState({
            emailLogsCount: wrapper,
          });
          // let tableRow = dataTable.countEmailLogs.map((item, index) => (
          //   item['status'] = item.status,
          //   item['count'] = item.count
          // ))
          // console.log("tableRow", tableRow);
        }

        this.props.handleLoader();
      })();
      this.props.handleChecklistObject(
        this.props.currentForm,
        this.state.email_to_send
      );
      this.props.handleChecklistObject(
        this.props.currentForm,
        this.state.texts
      );
    } catch (error) {
      this.props.handleLoader();
      console.group(error);
    }
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

  getAllEmails = async () => {
    const ID = localStorage.getItem("accessId");
    this.props.handleLoader();

    const data = await DEATH_API.fetchEmail(ID);
    if (data && data.data) {
      this.setState({
        email_to_send: data.data.map((item) => {
          return {
            ...item,
            To: item.to,
            CC: item.cc,
            Subject: item.subject,
            TemplateNickName: item.email_template.templateName,
            Template: item.email_template.template,
            Templates: item.email_template.templateName,
            sendStatus: item.sendStatus,
            emailTemplateId: item.email_template.id,
          };
        }),
      });
      data.data.map((item) => {
        if (item.sendStatus === false) {
          this.setState({ emailButton: item.sendStatus });
        }
      });
    }
    this.props.handleLoader();
  };
  getAllText = async () => {
    const ID = localStorage.getItem("accessId");
    this.props.handleLoader();

    const dataText = await DEATH_API.fetchText(ID);

    if (dataText && dataText.data) {
      this.setState({
        texts: dataText.data.map((item) => {
          return {
            ...item,
            TextTo: item.to,
            Phone: item.phoneNumber,
            Subject: item.subject,
            Relationship: item.relationship,
            TextTemplateNickname: item.templateName,
            TextMessage: item.message,
            Template: item.text_template.template,
            TextTemplates: item.text_template.templateName,
            sendStatus: item.sendStatus,
            textTemplateId: item.text_template.id,
          };
        }),
      });
      dataText.data.map((item) => {
        if (item.sendStatus === false) {
          this.setState({ textButoon: item.sendStatus });
          console.log("text status", item.sendStatus);
        }
      });
    }
    this.props.handleLoader();
  };
  showHistoryModal = async (msgId) => {
    console.log("email to send in api", msgId);

    try {
      this.props.handleLoader();
      // const ID = localStorage.getItem("accessId")
      const data = await DEATH_API.getEmailHistory(msgId);
      console.log("data in death status", data);
      if (data && data.emailLogsGenerated) {
        console.log("here in email history fetching");
        this.setState({
          emailLogs: data.emailLogsGenerated,
        });
      }
      this.props.handleLoader();
    } catch (error) {
      this.props.handleLoader();
      console.log("error");
      // throw new Error(error);
    }

    this.setState({
      isHistoryModalOpen: true,
    });
  };

  handleHistoryCancel = () => {
    this.setState({
      isHistoryModalOpen: false,
    });
  };

  showModal = async () => {
    this.setState({
      isModalOpen: true,
    });
    console.log("newDataTemplate", this.state.newDataTemplate);
    console.log("temalte from api", this.state.templateValue);
  };

  handleOk = async () => {
    this.setState({
      isModalOpen: false,
    });
    let data = this.state.newDataTemplate;
    let arr = [data];
    console.log("data template", arr);
    // console.log("data template", Array.isArray(data));

    this.props.handleLoader();
    if (Array.isArray(arr) && arr.length > 0) {
      await DEATH_API.postTemplate({
        templates: arr.map((item) => {
          return {
            templateName: item.name,
            template: item.template,
          };
        }),
      });
      console.log("tempalte creating");
    }

    const datatemp = await DEATH_API.getTemplate();
    // console.log("datatempdatatempdatatemp>>",datatemp);
    if (datatemp && datatemp.data) {
      this.setState({
        templateValue: datatemp.data.map((item) => {
          return {
            ...item,
            id: item.id,
            name: item.templateName,
          };
        }),
      });
    }

    this.props.handleLoader();
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }
  showModalText = async () => {
    this.setState({
      isTextModalOpen: true,
    });
    console.log("newDataTemplate", this.state.newDataTemplateText);
    console.log("temalte from api", this.state.templateValueText);
  };
  handleOkText = async () => {
    this.setState({
      isTextModalOpen: false,
    });
    let data = this.state.newDataTemplateText;
    let arr = [data];
    console.log("data template", arr);
    // console.log("data template", Array.isArray(data));

    this.props.handleLoader();
    if (Array.isArray(arr) && arr.length > 0) {
      await DEATH_API.postTextTemplate({
        templates: arr.map((item) => {
          return {
            templateName: item.name,
            template: item.template,
          };
        }),
      });
      console.log("tempalte creating");
    }

    const datatemp = await DEATH_API.getTextTemplate();
    // console.log("datatempdatatempdatatemp>>",datatemp);
    if (datatemp && datatemp.data) {
      this.setState({
        templateValueText: datatemp.data.map((item) => {
          return {
            ...item,
            id: item.id,
            name: item.templateName,
          };
        }),
      });
    }

    this.props.handleLoader();
  };

  handleCancelText = () => {
    this.setState({
      isTextModalOpen: false,
    });
  };

  handleFormChange(key, rows) {
    let formData = this.state.formData;
    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  // to handle hide and show for email add modal
  setEmailAddModalVisible = () =>
    this.setState({
      isEmailAddModalVisible: !this.state.isEmailAddModalVisible,
    });

  // to handle hide and show for template add modal
  setTemplateModalVisible = () =>
    this.setState({
      isTemplateModalVisible: !this.state.isTemplateModalVisible,
    });

  // to handle hide and show for text add modal
  setTextAddModalVisible = () =>
    this.setState({ isTextAddModalVisible: !this.state.isTextAddModalVisible });

  // to handle hide and show for email update modal
  setEmailUpdateModalVisible = () =>
    this.setState({
      isEmailUpdateModalVisible: !this.state.isEmailUpdateModalVisible,
    });

  // to handle hide and show for text update modal
  setTextUpdateModalVisible = () =>
    this.setState({
      isTextUpdateModalVisible: !this.state.isTextUpdateModalVisible,
    });

  // to handle hide and show for View modal
  setEmailViewModalVisible = () =>
    this.setState({
      isEmailViewModalVisible: !this.state.isEmailViewModalVisible,
    });

  // to handle hide and show for View modal
  setTextViewModalVisible = () =>
    this.setState({
      isTextViewModalVisible: !this.state.isTextViewModalVisible,
    });

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
  handleDateChange = (date, dateString, index) =>
    this.onUpdateChange(dateString, index);

  // Function to delete selected row
  deleteSelectedRow = async (idx, all_rows, name, id) => {
    var that = this;
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this?",
      dangerMode: true,
      buttons: ["No, cancel it!", "Yes, delete it!"],
      icon: "warning",
      type: "warning",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then(async function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        that.props.handleLoader();
        try {
          that.props.handleLoader();
          const updatedRows = all_rows.filter((row, index) => {
            return index != idx - 1;
          });
          if (name == "email") {
            that.props.handleLoader();
            await DEATH_API.deleteEmail(id);
            that.setState(
              {
                email_to_send: updatedRows,
              },
              () => {
                that.props.handleChecklistObject(
                  that.props.currentForm,
                  that.state.email_to_send
                );
              }
            );
            const data = await DEATH_API.fetchEmail();
            if (data && data.data) {
              that.setState({
                email_to_send: data.data.map((item) => {
                  return {
                    ...item,
                    To: item.to,
                    CC: item.cc,
                    Subject: item.subject,
                    TemplateNickName: item.email_template.templateName,
                    Template: item.email_template.template,
                    Templates: item.email_template.templateName,
                    sendStatus: item.sendStatus,
                    emailTemplateId: item.email_template.id,
                  };
                }),
              });
            }
            console.log("data.templates", data.templates);
            if (data && data.templates) {
              that.setState({
                templatesName: data.templates.map(
                  (items) => items.templateName
                ),
              });
            }
            that.props.handleLoader();
          } else {
            that.props.handleLoader();
            await DEATH_API.deleteText(id);
            that.setState(
              {
                texts: updatedRows,
              },
              () => {
                that.props.handleChecklistObject(
                  that.props.currentForm,
                  that.state.texts
                );
              }
            );
            const dataText = await DEATH_API.fetchText();

            if (dataText && dataText.data) {
              that.setState({
                texts: dataText.data.map((item) => {
                  return {
                    ...item,
                    TextTo: item.to,
                    Phone: item.phoneNumber,
                    Subject: item.subject,
                    Relationship: item.relationship,
                    TextTemplateNickname: item.templateName,
                    TextMessage: item.message,
                    Template: item.text_template.template,
                    TextTemplates: item.text_template.templateName,
                    sendStatus: item.sendStatus,
                    textTemplateId: item.text_template.id,
                  };
                }),
              });
            }
            that.props.handleLoader();
          }

          that.props.handleLoader();
        } catch (error) {
          that.props.handleLoader();
          console.log(error);
        }
        setTimeout(async () => {
          that.props.handleLoader();
          swal("Deleted!", "Your file has been deleted.", "success");
        }, 0);
      } else {
        swal("Cancelled", "Your file is safe :)", "error");
      }
    });

    // try {
    //   this.props.handleLoader()
    //   const updatedRows = all_rows.filter((row, index) => {
    //     return index != idx - 1;
    //   });
    //   if (name == "email") {
    //     await DEATH_API.deleteEmail(id)
    //     this.setState({
    //       email_to_send: updatedRows,
    //     }, () => {
    //       this.props.handleChecklistObject(this.props.currentForm, this.state.email_to_send)
    //     });
    //     const data = await DEATH_API.fetchEmail()
    //     if (data && data.data) {
    //       this.setState({
    //         email_to_send:
    //           data.data.map(item => {
    //             return {
    //               ...item,
    //               To: item.to,
    //               CC: item.cc,
    //               Subject: item.subject,
    //               TemplateNickName: item.email_template.templateName,
    //               Template: item.email_template.template,
    //               Templates: item.email_template.templateName
    //             }
    //           })
    //       })
    //     }
    //     console.log("data.templates", data.templates)
    //     if (data && data.templates) {
    //       this.setState({
    //         templatesName:
    //           data.templates.map(items =>
    //             items.templateName,
    //           )
    //       })
    //     }

    //   } else {
    //     await DEATH_API.deleteText(id)
    //     this.setState({
    //       texts: updatedRows,
    //     }, () => {
    //       this.props.handleChecklistObject(this.props.currentForm, this.state.texts)
    //     });
    //     const dataText = await DEATH_API.fetchText()

    //     if (dataText && dataText.data) {
    //       this.setState({
    //         texts:
    //           dataText.data.map(item => {
    //             return {
    //               ...item,
    //               TextTo: item.to,
    //               Phone: item.phoneNumber,
    //               Subject: item.subject,
    //               Relationship: item.relationship,
    //               TextTemplateNickname: item.templateName,
    //               TextMessage: item.message,

    //             }
    //           })
    //       })
    //     }
    //   }

    //   this.props.handleLoader()
    // } catch (error) {
    //   this.props.handleLoader()
    //   console.log(error)
    // }
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
    console.log("this.state.object", selectedRow[0]);
  };

  getSelectedEmail = (idx, rows, name) => {
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
    console.log("this.state.object", selectedRow[0].id);
    this.showHistoryModal(selectedRow[0].msgId);
  };

  //  function to update a specific email row
  updateEmailRow = async () => {
    console.log("this.state.updateObject email", this.state.updateObject);
    try {
      this.props.handleLoader();
      this.state.updateObject.email_template.template =
        this.state.updateObject.Template && this.state.updateObject.Template;

      let obj = {
        ...this.state.updateObject,
        to: this.state.updateObject.To,
        cc: this.state.updateObject.CC,
        subject: this.state.updateObject.Subject,
        relationship: this.state.updateObject.Relationship,
        templateName: this.state.updateObject.TemplateNickName,
        template: this.state.updateObject.Template,
        emailTemplateId:
          (this.state.updateObject.emailTemplateId &&
            +this.state.updateObject.emailTemplateId) ||
          +this.state.updateObject.email_template.id,
      };
      console.log("updated email obj", obj);
      const payloadUpdate = {};
      await DEATH_API.updateEmail(obj.id, obj);
      let { email_to_send, selectedIndex } = this.state;
      let index = selectedIndex - 1;

      email_to_send = [...this.state.email_to_send]; // important to create a copy, otherwise you'll modify state outside of setState call
      email_to_send[index] = obj; // replace current updated object in email_to_send based on index
      this.setState({ email_to_send }, () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.email_to_send
        );
      });
      this.props.handleLoader();
    } catch (error) {
      console.log(error);
      this.props.handleLoader();
    }
  };

  //  function to update a specific Text row
  updateTextRow = async () => {
    console.log("this.state.updateObject", this.state.updateObject);
    try {
      this.props.handleLoader();
      this.state.updateObject.text_template.template =
        this.state.updateObject.Template && this.state.updateObject.Template;

      let obj = {
        ...this.state.updateObject,
        to: this.state.updateObject.TextTo,
        phoneNumber: this.state.updateObject.Phone,
        subject: this.state.updateObject.Subject,
        // relationship: this.state.updateObject.Relationship,
        relationship: "",
        text_template_id:
          (this.state.updateObject.textTemplateId &&
            +this.state.updateObject.textTemplateId) ||
          this.state.updateObject.text_template.id,
        textTemplateId:
          (this.state.updateObject.textTemplateId &&
            +this.state.updateObject.textTemplateId) ||
          this.state.updateObject.text_template.id,
        templateName: this.state.updateObject.TextTemplates,
        TextTemplates: this.state.updateObject.TextTemplates,
        message: this.state.updateObject.TextMessage,
      };

      console.log("update text object", obj);
      await DEATH_API.updateText(obj.id, obj);

      let { texts, selectedIndex } = this.state;
      let index = selectedIndex - 1;
      texts = [...this.state.texts]; // important to create a copy, otherwise you'll modify state outside of setState call
      texts[index] = obj; // replace current updated object in texts based on index
      this.setState({ texts }, () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.texts
        );
      });
      this.props.handleLoader();
    } catch (error) {
      console.log(error);
      this.props.handleLoader();
    }
  };

  // function to create email row (data)
  createEmailRow = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    console.log("currentFormData", currentFormData);
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newData: [currentFormData.formData, ...this.state.newData],
        formData: {},
      });
    }

    // add current form data in email_to_send list with keeping old data
    this.setState(
      {
        email_to_send: [currentFormData.formData, ...this.state.email_to_send],
      },
      () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.email_to_send
        );
      }
    );
    var arr = [currentFormData.formData];

    try {
      let data;
      data = arr;
      console.log("data in email", data);
      this.props.handleLoader();
      const ID = localStorage.getItem("accessId");
      if (Array.isArray(data) && data.length > 0) {
        await DEATH_API.addEmail({
          emailToSend: data.map((item) => {
            return {
              to: item.To,
              cc: item.CC,
              subject: item.Subject,
              relationship: item.Relationship,
              emailTemplateId: +item.TemplateID,
              // templateName: item.TemplateNickname,
              // template: item.Template
            };
          }),
        });
        const data1 = await DEATH_API.fetchEmail(ID);
        if (data1 && data1.data) {
          this.setState({
            email_to_send: data1.data.map((item) => {
              return {
                ...item,
                To: item.to,
                CC: item.cc,
                Subject: item.subject,
                TemplateNickName: item.email_template.templateName,
                Template: item.email_template.template,
                Templates: item.email_template.templateName,
                sendStatus: item.sendStatus,
                emailTemplateId: item.email_template.id,
              };
            }),
          });
        }
      }
      this.setState({
        newData: [],
      });
      this.props.handleLoader();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // function to create text row(data)
  createTextRow = async (currentFormData) => {
    // check if already formData contains some data then initialize it with empty
    if (Object.keys(this.state.formData).length > 0) {
      this.setState({
        newDataText: [currentFormData.formData, ...this.state.newDataText],
        formData: {},
      });
    }

    // add current form data in texts list with keeping old data
    this.setState(
      {
        texts: [currentFormData.formData, ...this.state.texts],
      },
      () => {
        this.props.handleChecklistObject(
          this.props.currentForm,
          this.state.texts
        );
      }
    );

    var arr = [currentFormData.formData];
    try {
      let data;
      data = arr;
      console.log("data in email", data);
      this.props.handleLoader();
      console.log("textdata", data);
      if (Array.isArray(data) && data.length > 0) {
        await DEATH_API.addText({
          textToSend: data.map((item) => {
            return {
              to: item.TextTo,
              phoneNumber: item.Phone,
              subject: item.Subject,
              relationship: item.TextRelationship,
              textTemplateId: +item.TemplateID,

              templateName: item.TextTemplateNickname,
              message: item.TextMessage,
            };
          }),
        });
      }
      this.setState({
        newDataText: [],
      });
      const ID = localStorage.getItem("accessId");
      const dataText = await DEATH_API.fetchText(ID);
      if (dataText && dataText.data) {
        this.setState({
          texts: dataText.data.map((item) => {
            return {
              ...item,
              TextTo: item.to,
              Phone: item.phoneNumber,
              Subject: item.subject,
              Relationship: item.relationship,
              TextTemplateNickname: item.templateName,
              TextMessage: item.message,
              Template: item.text_template.template,
              TextTemplates: item.text_template.templateName,
              textTemplateId: item.text_template.id,
              sendStatus: item.sendStatus,
            };
          }),
        });
      }

      this.props.handleLoader();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // function to send all email
  sendAllEmails = async () => {
    var that = this;
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to send all emails?",
      dangerMode: true,
      buttons: ["No!", "Yes"],
      icon: "warning",
      type: "warning",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then(async function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        console.log("inside confirm status");
        try {
          const ID = localStorage.getItem("accessId");
          that.props.handleLoader();
          const res = await DEATH_API.SendEmails({
            type: "email",
            clientId: +ID,
          });
          that.props.handleLoader();
          that.getAllEmails();
          // swal("Success!", res.message, "success");
          // return api_res;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
        setTimeout(() => {
          that.props.handleLoader();
          swal("Success", "Emails send successfully", "success");
          that.props.handleLoader();
        }, 0);
      } else {
        swal("Cancelled", "Emails Not Sent", "error");
      }
    });
  };
  // function to send  all text
  sendAllText = async () => {
    var that = this;
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to send all text messages?",
      dangerMode: true,
      buttons: ["No!", "Yes"],
      icon: "warning",
      type: "warning",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then(async function (isConfirm) {
      // Redirect the user
      if (isConfirm) {
        console.log("inside confirm status");
        try {
          const ID = localStorage.getItem("accessId");
          that.props.handleLoader();
          let res = await DEATH_API.SendEmails({
            type: "text",
            clientId: +ID,
          });
          that.props.handleLoader();
          that.getAllText();

          // swal("Success!", res.message, "success");
          // return res;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
        setTimeout(() => {
          that.props.handleLoader();
          swal("Success", "Text send successfully", "success");
          that.props.handleLoader();
        }, 0);
      } else {
        swal("Cancelled", "Text Not Sent", "error");
      }
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

  getEmailRow = ({ data, index, id }) => {
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
              <span className="custom-field-heading-style">To:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.To || "N/A"}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Email Status:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.sendStatus && data.sendStatus ? "Sent" : "Not Sent"}
              </span>
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className="custom-field-alignments">
            {/*  <div className="custom-filed-margin">
              <span className="custom-field-heading-style">CC:</span>
              <span className="custom-field-value-style"> {data.CC || 'N/A'}</span>
            </div> */}
            <div className="custom-filed-margin1">
              <span className="custom-field-heading-style">Subject:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.Subject || "N/A"}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="custom-field-alignments"></div>
        </Col>
        {this.props.role !== "protrustee" && (
          <React.Fragment>
            <Col span={1}>
              <div className="custom-field-alignments-icons">
                <Button
                  type="link"
                  style={{ fontSize: "21px" }}
                  icon={"history"}
                  onClick={() => {
                    console.log("this.state", index);
                    const { email_to_send } = this.state;
                    this.getSelectedEmail(index, email_to_send);
                  }}
                ></Button>
              </div>
            </Col>
            <Col span={1}>
              <div className="custom-field-alignments-icons">
                <Button
                  type="link"
                  style={{ fontSize: "21px" }}
                  icon={"eye"}
                  onClick={() => {
                    console.log("this.state", index);
                    const { email_to_send } = this.state;
                    this.getSelectedRow(index, email_to_send);
                    this.setEmailViewModalVisible();
                  }}
                ></Button>
              </div>
            </Col>
            <Col span={1}>
              <div className="custom-field-alignments-icons">
                <Button
                  type="link"
                  style={{ fontSize: "21px" }}
                  icon="edit"
                  onClick={() => {
                    const { email_to_send } = this.state;
                    this.getSelectedRow(index, email_to_send);
                    this.setEmailUpdateModalVisible();
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
                    const { email_to_send } = this.state;
                    const name = "email";
                    this.deleteSelectedRow(index, email_to_send, name, id);
                  }}
                ></Button>
              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>
    );
  };

  getTextRow = ({ data, index, id }) => {
    return (
      <Row
        key={(Math.random() + 1).toString(36).substring(2)}
        type="flex"
        className="custom-sub-container"
      >
        <Col span={2}>
          <div className="custom-sub-index">
            <span className="custom-index-format">{index}</span>
          </div>
        </Col>

        <Col span={this.props.role === "protrustee" ? 15 : 12}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">To:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.TextTo || "N/A"}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Text Body: </span>
              <span className="custom-field-value-style">
                {/* {data.Template.replace(/<\/?p>/g, "") || "N/A"} */}

                {data.Template.replace(/<\/?[^>]+(>|$)/g, "") || "N/A"}
              </span>
            </div>
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Text Status:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.sendStatus && data.sendStatus ? "Sent" : "Not Sent"}
              </span>
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="custom-field-alignments">
            <div className="custom-filed-margin">
              <span className="custom-field-heading-style">Phone:</span>
              <span className="custom-field-value-style">
                {" "}
                {data.Phone || "N/A"}
              </span>
            </div>
          </div>
        </Col>

        {this.props.role !== "protrustee" && (
          <React.Fragment>
            <Col span={1}>
              <div className="custom-field-alignments-icons">
                <Button
                  type="link"
                  style={{ fontSize: "21px" }}
                  icon={"eye"}
                  onClick={() => {
                    const { texts } = this.state;
                    this.getSelectedRow(index, texts);
                    this.setTextViewModalVisible();
                  }}
                ></Button>
              </div>
            </Col>
            <Col span={1}>
              <div className="custom-field-alignments-icons">
                <Button
                  type="link"
                  style={{ fontSize: "21px" }}
                  icon="edit"
                  onClick={() => {
                    const { texts } = this.state;
                    this.getSelectedRow(index, texts);
                    this.setTextUpdateModalVisible();
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
                    const { texts } = this.state;
                    const name = "text";
                    this.deleteSelectedRow(index, texts, name, id);
                  }}
                ></Button>
              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>
    );
  };

  handleFormDateChange(name, date, dateString) {
    console.log("name, date,", name, date, dateString);
    this.setState({
      clinetFuneralData: {
        ...this.state.clinetFuneralData,
        [name]: dateString,
      },
    });
  }

  handleFunearlChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      clinetFuneralData: {
        ...this.state.clinetFuneralData,
        [name]: value,
      },
    });
  };
  submitForm = async () => {
    console.log("", this.state.clinetFuneralData);
    let payload = {};
    if (this.state.FuneralData) {
      payload = this.state.clinetFuneralData;
      payload.clientId = +localStorage.getItem("accessId");
      payload.id = +this.state.FuneralData.id;
    } else {
      payload = this.state.clinetFuneralData;
      payload.clientId = +localStorage.getItem("accessId");
    }
    this.props.handleLoader();
    let api_res = await DEATH_API.postFuneralInfo(payload);
    this.props.handleLoader();
    console.log("api_res", api_res);
  };

  render() {
    const largeBills = [
      {
        title: "Start with Template",
        dataIndex: "start_with_template",
        key: "start_with_template",
        fields: [
          {
            type: "Radio",
            name: "start_with_template",
            values: ["Friend", "Family", "Professional", "None"],
          },
        ],
      },
      {
        title: "Relationship",
        dataIndex: "relationship",
        key: "relationship",
        fields: [
          {
            type: "Select",
            name: "relationship",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "Email Template Nickname",
        dataIndex: "email_template",
        key: "email_template",
        fields: [
          {
            type: "Input",
            name: "email_template",
          },
        ],
      },
      {
        title: "To",
        dataIndex: "to",
        key: "to",
        fields: [
          {
            type: "Select",
            name: "to",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "CC",
        dataIndex: "cc",
        key: "cc",
        fields: [
          {
            type: "Select",
            name: "cc",
            placeholder: "-Select-",
            values: ["Family", "Friend", "Professional"],
          },
        ],
      },
      {
        title: "Subject of Email",
        dataIndex: "subject_of_email",
        key: "subject_of_email",
        fields: [
          {
            type: "Input",
            name: "subject_of_email",
          },
        ],
      },
      {
        title: "Body of Email",
        dataIndex: "body_of_email",
        key: "body_of_email",
        fields: [
          {
            type: "TextArea",
            name: "body_of_email",
          },
        ],
      },
    ];

    const emailFields = [
      {
        title: "To",
        type: "emails",
        index: "To",
      },
      // {
      //   title: "CC",
      //   type: "input",
      //   index: "CC"
      // },
      {
        title: "Subject",
        type: "input",
        index: "Subject",
      },
      // {
      //   title: "Relationship",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "Relationship"
      // },

      {
        title: "Templates",
        type: "select",
        options: this.state.templateValue,
        index: "Templates",
      },
      {
        title: "Body of Email",
        type: "richtext1",
        index: "Template",
      },
    ];
    const templateFields = [
      {
        title: "Template name",
        type: "input",
        index: "Templatename",
      },
      {
        title: "Template",
        type: "richtext",
        index: "Template",
      },
    ];
    const UpdateEmailFields = [
      {
        title: "To",
        type: "input",
        index: "To",
      },
      // {
      //   title: "CC",
      //   type: "input",
      //   index: "CC"
      // },
      {
        title: "Subject",
        type: "input",
        index: "Subject",
      },
      // {
      //   title: "Relationship",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "Relationship"
      // },

      {
        title: "Templates",
        type: "select",
        options: this.state.templateValue,
        index: "Templates",
      },
      {
        title: "Body of Email",
        type: "richtext1",
        index: "Template",
      },
    ];

    const textFields = [
      {
        title: "To",
        type: "input",
        index: "TextTo",
      },
      {
        title: "Phone",
        type: "phoneNumber",
        index: "Phone",
      },
      // {
      //   title: "Relationship",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "TextRelationship"
      // },
      {
        title: "Templates",
        type: "select",
        options: this.state.templateValueText,
        index: "TextTemplates",
      },
      {
        title: "Body of Template",
        type: "richtext1",
        index: "Template",
      },
    ];

    const UpdateTextFields = [
      {
        title: "TextTo",
        type: "input",
        index: "TextTo",
      },
      {
        title: "Phone",
        type: "phoneNumber",
        index: "Phone",
      },
      // {
      //   title: "Relationship",
      //   type: "select",
      //   options: ["Abc", "Def", "Others"],
      //   index: "TextRelationship"
      // },
      {
        title: "Templates",
        type: "select",
        options: this.state.templateValueText,
        index: "TextTemplates",
      },
      {
        title: "Body of Template",
        type: "richtext2",
        index: "Template",
      },
    ];

    const rows = [
      {
        title: "No. Of Emails Sent",
        dataIndex: "Send",
        key: "Send",
        render: (record) => (record ? record : "0"),
        // fields: [
        //   {
        //     type: "Input",
        //     name: "emails_sent",
        //   },
        // ],
      },
      {
        title: "No. Of Emails Bounce",
        dataIndex: "Bounce",
        key: "Bounce",
        render: (record) => (record ? record : "0"),

        // fields: [
        //   {
        //     type: "Input",
        //     name: "emails_rejected",
        //   },
        // ],
      },
      {
        title: "No. Of Emails Delivered",
        dataIndex: "Delivery",
        key: "Delivery",
        render: (record) => (record ? record : "0"),

        // fields: [
        //   {
        //     type: "Input",
        //     name: "email_of_rejected",
        //   },
        // ],
      },
      {
        title: "Emails Opened",
        dataIndex: "Open",
        key: "Open",
        render: (record) => (record ? record : "0"),

        // fields: [
        //   {
        //     type: "Input",
        //     name: "emails_opened",
        //   },
        // ],
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
      handlePhoneChange,
      handleRichTextChange,
      role,
    } = this.props;

    return (
      <React.Fragment>
        <AddModal
          title={"Create New Email"}
          fields={emailFields}
          isVisible={this.state.isEmailAddModalVisible}
          cbClose={this.setEmailAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          handleRichTextChange={handleRichTextChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createEmailRow}
        />

        <Modal
          title={"Create New Template"}
          visible={this.state.isModalOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{ width: "45%" }}
        >
          <div>
            {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> 
          <h2 className="login-heading">OTP Required</h2>*/}
            <div className="">
              <div>
                <InputGroup>
                  <label
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    Template Name
                  </label>
                  <Input
                    onChange={(e) => {
                      // const previousV=[...this.state.newDataTemplate]
                      // previousV[0].name = e.target.value;
                      // this.setState({newDataTemplate:previousV})
                      this.setState({
                        newDataTemplate: {
                          ...this.state.newDataTemplate,
                          name: e.target.value,
                        },
                      });
                    }}
                    id="name"
                    type="text"
                    placeholder="Template Name"
                    name="name"
                  ></Input>
                </InputGroup>
                <InputGroup>
                  <label
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Enter Template
                  </label>
                  <ReactQuill
                    // value={formData.Template || null}
                    id="template"
                    placeholder="Template"
                    name="template"
                    onChange={(e) => {
                      // console.log("tempaltevael",e)
                      // const previousV=[...this.state.newDataTemplate]
                      // previousV[0].template = e;
                      // this.setState({newDataTemplate:previousV})
                      this.setState((state) => ({
                        newDataTemplate: {
                          ...this.state.newDataTemplate,
                          template: e,
                        },
                      }));
                    }}
                  />
                </InputGroup>
                {/*
              <Button
                onClick={() => {
                  this.handleLogin();
                }}
              // disabled={user.loading}
              >
                OK
              </Button>
            */}
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          title={"Create New Text Template"}
          visible={this.state.isTextModalOpen}
          onOk={this.handleOkText}
          onCancel={this.handleCancelText}
          style={{ width: "45%" }}
        >
          <div>
            {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> 
        <h2 className="login-heading">OTP Required</h2>*/}
            <div className="">
              <div>
                <InputGroup>
                  <label
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bolder",
                    }}
                  >
                    Template Name
                  </label>
                  <Input
                    onChange={(e) => {
                      // const previousV=[...this.state.newDataTemplate]
                      // previousV[0].name = e.target.value;
                      // this.setState({newDataTemplate:previousV})
                      this.setState({
                        newDataTemplateText: {
                          ...this.state.newDataTemplateText,
                          name: e.target.value,
                        },
                      });
                    }}
                    id="name"
                    type="text"
                    placeholder="Template Name"
                    name="name"
                  ></Input>
                </InputGroup>
                <InputGroup>
                  <label
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Enter Template
                  </label>
                  <ReactQuill
                    // value={formData.Template || null}
                    id="template"
                    placeholder="Template"
                    name="template"
                    onChange={(e) => {
                      // console.log("tempaltevael",e)
                      // const previousV=[...this.state.newDataTemplate]
                      // previousV[0].template = e;
                      // this.setState({newDataTemplate:previousV})
                      this.setState((state) => ({
                        newDataTemplateText: {
                          ...this.state.newDataTemplateText,
                          template: e,
                        },
                      }));
                    }}
                  />
                </InputGroup>
                {/*
            <Button
              onClick={() => {
                this.handleLogin();
              }}
            // disabled={user.loading}
            >
              OK
            </Button>
          */}
              </div>
            </div>
          </div>
        </Modal>
        <AddModal
          title={"Create New Text"}
          fields={textFields}
          isVisible={this.state.isTextAddModalVisible}
          cbClose={this.setTextAddModalVisible}
          handleFormInputChange={handleFormInputChange}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleDatePickerChange={handleDatePickerChange}
          handleCurrencyChange={handleCurrencyChange}
          handleDocumentChange={handleDocumentChange}
          handlePhoneChange={handlePhoneChange}
          handleRichTextChange={handleRichTextChange}
          currentForm={currentForm}
          setFormData={this.setFormData}
          formData={this.state.formData}
          create={this.createTextRow}
        />

        <UpdateModal
          title={"Update Email"}
          fields={UpdateEmailFields}
          isVisible={this.state.isEmailUpdateModalVisible}
          cbClose={this.setEmailUpdateModalVisible}
          cbUpdate={this.updateEmailRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          handleDateChange={this.handleDateChange}
          // onConstraints={this.onConstraints}
          handleRichTextChange={handleRichTextChange}
        />

        <UpdateModal
          title={"Update Text"}
          fields={UpdateTextFields}
          isVisible={this.state.isTextUpdateModalVisible}
          cbClose={this.setTextUpdateModalVisible}
          cbUpdate={this.updateTextRow}
          // onLoad={this.get}
          obj={this.state.updateObject}
          onUpdateChange={this.onUpdateChange}
          // onConstraints={this.onConstraints}
          handleRichTextChange={handleRichTextChange}
          handleDateChange={this.handleDateChange}
        />

        <ViewModal
          title={"View Email"}
          fields={UpdateEmailFields}
          isVisible={this.state.isEmailViewModalVisible}
          cbClose={this.setEmailViewModalVisible}
          obj={this.state.updateObject}
          handleRichTextChange={handleRichTextChange}
        />
        <ViewModal
          title={"View Text"}
          fields={UpdateTextFields}
          isVisible={this.state.isTextViewModalVisible}
          cbClose={this.setTextViewModalVisible}
          obj={this.state.updateObject}
          // cbUpdate={this.updateTextRow}
          // onLoad={this.get}
          // onUpdateChange={this.onUpdateChange}
          // onConstraints={this.onConstraints}
          // handleDateChange={this.handleDateChange}
        />

        {/*  <Header image={world} title={"Emails & Texts"} /> */}

        <Row gutter={16}>
          <Col span={24}>
            <h2 className="text-center font-weight-bold mb-4">
              <img
                src={world}
                height={85}
                width={85}
                style={{ marginRight: "20px" }}
              ></img>
              Emails & Texts
              <Icon
                style={{
                  fontSize: "27px",
                  marginLeft: "1rem",
                  cursor: "pointer",
                  color: "#39b54a",
                }}
                onClick={async () => {
                  this.showTooltipModal();
                }}
                type="question-circle"
              ></Icon>
            </h2>
          </Col>
        </Row>
        <Modal
          title={
            <span style={{ textAlign: "center", display: "block" }}>
              Emails & Texts
            </span>
          }
          visible={this.state.TooltipModal}
          footer={null}
          onCancel={this.handleTooltipCancel}
        >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                As mentioned in audio/video messages (feature step 2) the Plan
                Creator can choose to leave a custom message to one or more
                groups and to have that message delivered via email or SMS text.
                The program designers included the ability for all users to see
                how many emails are sent, rejected and details like when opened.
                These added abilities should help reduce wasted time with
                follow-ups and potentially more phone calls. This is another
                reason to make sure you allow emails from Asset Planet to go
                into your inbox and not to junk/spam.
              </h2>
            </div>
          </div>
        </Modal>
        <Modal
          title={
            <span style={{ textAlign: "center", display: "block" }}>
              Email History
            </span>
          }
          visible={this.state.isHistoryModalOpen}
          footer={null}
          onCancel={this.handleHistoryCancel}
        >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                History of{" "}
                {this.state.updateObject && this.state.updateObject.to}
              </h2>
              {this.state.emailLogs && this.state.emailLogs.length > 0 ? (
                <table id="clients">
                  <tr>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                  {this.state.emailLogs &&
                    this.state.emailLogs.map((data, index) => (
                      <tr key={index}>
                        <td>
                          {moment(data.createdAt).format("DD-MM-YYYY HH:mm")}
                        </td>
                        <td>{data.status}</td>
                      </tr>
                    ))}
                </table>
              ) : (
                "No history Found for this email."
              )}
            </div>
          </div>
        </Modal>

        {role === "protrustee" && (
          <React.Fragment>
            <Row>
              <Col span={24}>
                <h3
                  className="text-center font-weight-bold"
                  style={{ marginTop: "30px", marginBottom: "30px" }}
                >
                  Please add this information before sending Emails and Text
                  Messages
                </h3>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Funeral Date">
                  {this.state.FuneralData["funeralDate"] && (
                    <DatePicker
                      defaultValue={moment(this.state.FuneralData.funeralDate)}
                      style={{ width: "100%" }}
                      format={dateFormat}
                      size={"large"}
                      name="funeralDate"
                      onChange={(date, dateString) =>
                        this.handleFormDateChange(
                          "funeralDate",
                          date,
                          dateString
                        )
                      }
                    />
                  )}
                  {!this.state.FuneralData["funeralDate"] && (
                    <DatePicker
                      // defaultValue={moment(this.state.FuneralData.funeralDate)}
                      style={{ width: "100%" }}
                      format={dateFormat}
                      size={"large"}
                      name="funeralDate"
                      onChange={(date, dateString) =>
                        this.handleFormDateChange(
                          "funeralDate",
                          date,
                          dateString
                        )
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Funeral Location">
                  <Input
                    defaultValue={
                      this.state.FuneralData
                        ? this.state.FuneralData.funeralLocation
                        : ""
                    }
                    size={"large"}
                    onChange={this.handleFunearlChange}
                    name="funeralLocation"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Time of Arrival">
                  <Input
                    defaultValue={
                      this.state.FuneralData
                        ? this.state.FuneralData.timeOfArrival
                        : ""
                    }
                    size={"large"}
                    onChange={this.handleFunearlChange}
                    name="timeOfArrival"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Gifts / Flowers">
                  <Input
                    defaultValue={
                      this.state.FuneralData ? this.state.FuneralData.gift : ""
                    }
                    size={"large"}
                    onChange={this.handleFunearlChange}
                    name="gift"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Charity URL">
                  <Input
                    defaultValue={
                      this.state.FuneralData
                        ? this.state.FuneralData.charityUrl
                        : ""
                    }
                    onChange={this.handleFunearlChange}
                    name="charityUrl"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Passed Away From">
                  <Input
                    defaultValue={
                      this.state.FuneralData
                        ? this.state.FuneralData.passedAwayFrom
                        : ""
                    }
                    size={"large"}
                    onChange={this.handleFunearlChange}
                    name="passedAwayFrom"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <Form.Item label="Passed Away On">
                  {this.state.FuneralData["passedAwayOn"] && (
                    <DatePicker
                      style={{ width: "100%" }}
                      format={dateFormat}
                      size={"large"}
                      name="passDate"
                      defaultValue={moment(this.state.FuneralData.passedAwayOn)}
                      // defaultValue={moment(this.state.FuneralData ? this.state.FuneralData.passedAwayOn : "")}
                      // defaultValue={moment(this.state.FuneralData ? this.state.FuneralData.passedAwayOn : "", dateFormat)}
                      onChange={(date, dateString) =>
                        this.handleFormDateChange(
                          "passedAwayOn",
                          date,
                          dateString
                        )
                      }
                    />
                  )}
                  {!this.state.FuneralData["passedAwayOn"] && (
                    <DatePicker
                      style={{ width: "100%" }}
                      format={dateFormat}
                      size={"large"}
                      name="passDate"
                      onChange={(date, dateString) =>
                        this.handleFormDateChange(
                          "passedAwayOn",
                          date,
                          dateString
                        )
                      }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} type="flex" justify="center">
              <Col span={16}>
                <div
                  className="d-flex justify-content"
                  style={{ marginBottom: "1rem" }}
                >
                  <Button
                    type="primary"
                    size={"large"}
                    style={{ background: "#39b54a", width: "auto" }}
                    onClick={async () => {
                      this.submitForm();
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        )}

        <Add
          title={"Emails"}
          button={"Add New Email"}
          cbAdd={this.setEmailAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
          list={[
            {
              option: "Add Template",
              cb: this.showModal,
            },
          ]}
        />
        {role === "protrustee" && (
          <div
            className="d-flex justify-content-end"
            style={{ marginBottom: "1rem" }}
          >
            <Button
              type="primary"
              size={"large"}
              style={{ background: "#39b54a", width: "auto" }}
              disabled={this.state.emailButton}
              onClick={this.sendAllEmails}
              // onClick={async () => {
              //   const ID = localStorage.getItem("accessId");
              //   this.props.handleLoader();
              //   const res = await DEATH_API.SendEmails({
              //     type: "email",
              //     clientId: +ID,
              //   });
              //   this.props.handleLoader();
              //   swal("Success!", res.message, "success");
              // }}
            >
              Send All Emails
            </Button>
          </div>
        )}
        {/* get email row */}
        {this.state.email_to_send.map((data, index) =>
          this.getEmailRow({ data, index: index + 1, id: data.id })
        )}

        <Add
          title={"Texts"}
          button={"Add New Text"}
          cbAdd={this.setTextAddModalVisible}
          isDisabled={role !== "protrustee" ? false : true}
          list={[
            {
              option: "Add Template",
              cb: this.showModalText,
            },
          ]}
        />
        {role === "protrustee" && (
          <div
            className="d-flex justify-content-end"
            style={{ marginBottom: "1rem" }}
          >
            <Button
              type="primary"
              size={"large"}
              style={{ background: "#39b54a", width: "auto" }}
              disabled={this.state.textButoon}
              onClick={this.sendAllText}
              // onClick={async () => {
              //   const ID = localStorage.getItem("accessId");
              //   this.props.handleLoader();
              //   let res = await DEATH_API.SendEmails({
              //     type: "text",
              //     clientId: +ID,
              //   });
              //   this.props.handleLoader();
              //   swal("Success!", res.message, "success");
              // }}
            >
              Send All Text
            </Button>
          </div>
        )}
        {/* get text row */}
        {this.state.texts.map((data, index) =>
          this.getTextRow({ data, index: index + 1, id: data.id })
        )}
        {role !== "protrustee" && (
          <div style={{ marginTop: "50px" }}>
            {/*<SubFormTable
            title="Email Stats"
            rows={this.state.emailLogsCount}
            colsFormat={rows}
            addNewButton={false}
        ></SubFormTable>*/}
            <h2 className="text-center font-weight-bold mb-4">Email Stats </h2>
            <ContactList cols={rows} rows={this.state.emailLogsCount} />
          </div>
        )}
        <Footer
          cbPrev={this.props.previousForm}
          cbNext={
            this.props.nextForm
            //   this.props.nextForm(async () => {
            //   try {
            //     let data;
            //     data = this.state.newData
            //     console.log("data in email",data)
            //     this.props.handleLoader()
            //     if (Array.isArray(data) && data.length > 0) {
            //       await DEATH_API.addEmail({
            //         emailToSend: data.map(item => {
            //           return {
            //             to: item.To,
            //             cc: item.CC,
            //             subject: item.Subject,
            //             relationship: item.Relationship,
            //             emailTemplateId:+item.TemplateID
            //             // templateName: item.TemplateNickname,
            //             // template: item.Template
            //           }
            //         })
            //       })

            //     }
            //     data = this.state.newDataText
            //     console.log("textdata", data)
            //     if (Array.isArray(data) && data.length > 0) {
            //       await DEATH_API.addText({
            //         textToSend: data.map(item => {
            //           return {
            //             to: item.TextTo,
            //             phoneNumber: item.Phone,
            //             subject: item.Subject,
            //             relationship: item.TextRelationship,
            //             templateName: item.TextTemplateNickname,
            //             message: item.TextMessage
            //           }
            //         })
            //       })
            //     }
            //     this.setState({
            //       newDataText: [],
            //       newData: []
            //     })
            //     this.props.handleLoader()
            //   } catch (error) {
            //     console.log(error)
            //     throw new Error(error)
            //   }
            // })
          }
        />
      </React.Fragment>
    );
  }
}

export default EmailToSendForm;
