import React, { Component } from "react";
import { Row, Col, Form, Radio, Button, Icon, Input, Modal } from "antd";
import form from "../../../assets/images/form.png";
import Footer from "../components/footer";
import TextArea from "antd/lib/input/TextArea";
import addNotes from "../../../assets/SVGs/add-notes.svg";
import editNotes from "../../../assets/SVGs/edit-notes.svg";
import deleteNotes from "../../../assets/SVGs/delete-notes.svg";
import { connect } from 'react-redux';
import { postaNotes, posteNotes } from "../../../redux/slices/loginSlice";

import EditNotes from "./editNotes";
import "./death.css";
import "../../custom/CustomSubFormTable.css";
import DEATH_API from "../../../apis/death.api";

const formName = "checkList";
const radioStyle = {
  borderRadius: "100px",
  marginRight: "30px",
  width: "200px",
  boxShadow: "1px 3px 1px #9E9E9E",
};

class ChecklistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListForm: {},
      checkListCustomtext: {},
      addNotes: false,
      editNotes: false,
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

  snakeToCamel = str => str.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
  camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  componentDidMount() {
    (async () => {
      try {
        this.props.handleLoader()
        const ID = localStorage.getItem("accessId")
        let data = await DEATH_API.fetchChecklist(ID)
        this.props.handleLoader()
        if (data && data.data) {
          this.setState({
            checkListForm: { ...data.data }
          })
        }
        else {
          this.setState({
            checkListForm: {
              audioVideoMessage: "Not Started",
              checklist: "Not Started",
              contactList: "Not Started",
              emailsToSend: "Not Started",
              importantDocument: "Not Started",
              personalInstructions: "Not Started",
              listOfLargeBills: "Not Started",
              litigationList: "Not Started",
              locationOfPersonalItems: "Not Started",
              listOfPasswords: "Not Started",
              prepaidBurialExpenses: "Not Started",
            }
          })
        }
        this.props.handleChecklistObject(this.props.currentForm, Object.entries(this.state.checkListForm).reduce((res, item) => {
          return { ...res, [this.camelToSnakeCase(item[0])]: item[1] }
        }, {}))
      } catch (error) {
        console.log(error)
      }

      // try {
      try {
        this.props.handleLoader()
        const ID = localStorage.getItem("accessId")

        let data = await DEATH_API.fetchChecklist(ID)
        this.props.handleLoader()
        if (data && data.data) {
          this.setState({
            checkListForm: { ...data.data }
          })
        }
        else {
          this.setState({
            checkListForm: {
              audioVideoMessage: "Not Started",
              checklist: "Not Started",
              contactList: "Not Started",
              emailsToSend: "Not Started",
              importantDocument: "Not Started",
              personalInstructions: "Not Started",
              listOfLargeBills: "Not Started",
              litigationList: "Not Started",
              locationOfPersonalItems: "Not Started",
              listOfPasswords: "Not Started",
              prepaidBurialExpenses: "Not Started",
            }
          })
        }
        this.props.handleChecklistObject(this.props.currentForm, Object.entries(this.state.checkListForm).reduce((res, item) => {
          return { ...res, [this.camelToSnakeCase(item[0])]: item[1] }
        }, {}))
      } catch (error) {
        console.log(error)
      }
      // } catch (err) {
      //   console.log("err", err);
      //   alert("error in upsert")
      //   return
      // }
    })()


  }

  getSelectedColor = (name, value) => {
    const { checklistObject } = this.props;
    if (
      checklistObject[formName][name] &&
      checklistObject[formName][name] === value
    )
      return {
        borderRadius: "5px",
        marginLeft: "10px",
        backgroundColor: "#39b54a",
      };

    return {
      borderRadius: "5px",
      marginLeft: "10px",
    };
  };

  getRadioField = (
    title,
    name,
    buttons,
    index,
    field,
  ) => {
    const {
      handleInputChange,
      handleRadioChange,
      checklistObject,
      currentForm,
    } = this.props;
    buttons = buttons || ["Not Started", "Incomplete", "Complete", "Not Applicable"]
    return (
      <React.Fragment>
        <Row key={index} gutter={16} type="flex" justify="center">
          <Col span={16} type="flex" justify="center" align="center">
            <Form.Item label={title}>

              <Radio.Group
                defaultValue={checklistObject[formName][name]}
                name={name}
                size={"large"}
                onChange={async (e) => {

                  try {
                    handleRadioChange(name, e.target.value, currentForm);
                    console.log("nameee", name);

                    if (e.target.value === "Add Notes +") {
                      console.log("nameee", name);
                      this.setState({
                        checkListCustomtext: { ...this.state.checkListCustomtext, [name]: true }
                      })
                      return
                      // console.log("value of field", document.getElementById("section").value)
                    }
                    await DEATH_API.upsertChecklist({
                      ...this.state.checkListForm,
                      [this.snakeToCamel(name)]: e.target.value
                    })
                    this.setState({
                      checkListForm: {
                        ...this.state.checkListForm,
                        [this.snakeToCamel(name)]: e.target.value
                      },
                    });
                  } catch (err) {
                    console.log("err", err);
                    alert("error in upsert")
                    return
                  }
                }}
                buttonStyle="solid"
              >
                {buttons.map((button) => {
                  return (
                    <Radio.Button
                      style={this.getSelectedColor(name, button)}
                      value={button}
                      className="checklist-hover-style"
                    >
                      {button}
                    </Radio.Button>
                  );
                })}


                {checklistObject[formName][name+"_notes"]!=="0" && checklistObject[formName][name+"_notes"] ?
                  <React.Fragment>
                    <button className="Notes" onClick={(e) => {
                      this.setState({
                        editNotes: true
                      })
                      this.setState({
                        addNotes: false
                      })
                      this.props.posteNotes(true)
                      this.setState({
                        checkListCustomtext: { ...this.state.checkListCustomtext, [name]: true }
                      })
                      return
                      // console.log("button clicked...",name);
                    }}>Edit <img style={{ marginBottom: "5px" }} src={editNotes} height={25} width={25}></img></button>

                    <button className="Notes" onClick={async (e) => {
                      try {
                        this.props.handleLoader()
                        await DEATH_API.upsertChecklist({
                          ...this.state.checkListForm,
                          [this.snakeToCamel(name+"_notes")]: null
                        })
                        this.setState({
                          checkListForm: {
                            ...this.state.checkListForm,
                            [this.snakeToCamel(name+"_notes")]: null,
                          },
                        });
                        this.props.handleLoader()
                        try {
                          this.props.handleLoader()
                          const ID = localStorage.getItem("accessId")

                          let data = await DEATH_API.fetchChecklist(ID)
                          this.props.handleLoader()
                          if (data && data.data) {
                            this.setState({
                              checkListForm: { ...data.data }
                            })
                          }
                          else {
                            this.setState({
                              checkListForm: {
                                audioVideoMessage: "Not Started",
                                checklist: "Not Started",
                                contactList: "Not Started",
                                emailsToSend: "Not Started",
                                importantDocument: "Not Started",
                                personalInstructions: "Not Started",
                                listOfLargeBills: "Not Started",
                                litigationList: "Not Started",
                                locationOfPersonalItems: "Not Started",
                                listOfPasswords: "Not Started",
                                prepaidBurialExpenses: "Not Started",
                              }
                            })
                          }
                          this.props.handleChecklistObject(this.props.currentForm, Object.entries(this.state.checkListForm).reduce((res, item) => {
                            return { ...res, [this.camelToSnakeCase(item[0])]: item[1] }
                          }, {}))
                        } catch (error) {
                          console.log(error)
                        }
                      } catch (err) {
                        console.log("err", err);
                        alert("error in upsert")
                        return
                      }
                      this.setState({
                        checkListCustomtext: { ...this.state.checkListCustomtext, [name]: false }
                      })
                      return
                    }}>Delete <img style={{ marginBottom: "5px" }} src={deleteNotes} height={25} width={25}></img></button>

                    <div>
                      <p> Notes:</p>
                      <div style={{ padding: "8px", paddingLeft: "4px", textAlign: "left", borderRadius: "5px", marginLeft: "10px", height: "auto", width: "auto", background: "white", fontSize: "16px" }}>
                        {checklistObject[formName][name+"_notes"] && checklistObject[formName][name+"_notes"]}
                      </div>
                    </div>
                  </React.Fragment>
                  :
                  <button className="Notes" onClick={(e) => {
                    this.setState({
                      editNotes: false
                    })
                    this.setState({
                      addNotes: true
                    })
                    this.props.postaNotes(true)
                    this.setState({
                      checkListCustomtext: { ...this.state.checkListCustomtext, [name]: true }
                    })
                    return

                  }}>Notes <img src={addNotes} height={25} width={25}></img>
                  </button>
                }

              </Radio.Group>
            </Form.Item>
          </Col>

        </Row>
        {this.state.checkListCustomtext && this.state.checkListCustomtext[name] && this.state.addNotes && this.props.aNotes &&
          <div className="custom-field-align">
            { }
            <TextArea
              id="section"
              // className="field-set"
              style={{ width: "350px" }}
              type="text"
              placeholder="Enter Notes"
              size={"large"}
              name="notes"
              onChange={(e) => {
                // console.log("value....", e.target.value)
              }}
            />
            <Button
              // className="button-set"
              style={{ height: "40px", marginLeft: "1rem" }}
              onClick={async () => {
                const value = document.getElementById("section").value;
                console.log("value.. saved", name+"_notes");
                try {
                  this.props.handleLoader()
                  await DEATH_API.upsertChecklist({
                    ...this.state.checkListForm,
                    [this.snakeToCamel(name+"_notes")]: value
                  })
                  this.setState({
                    checkListForm: {
                      ...this.state.checkListForm,
                      [this.snakeToCamel(name+"_notes")]: value
                    },
                  });
                  this.setState({ editNotes: false })
                  this.props.handleLoader()
                  try {
                    this.props.handleLoader()
                    const ID = localStorage.getItem("accessId")

                    let data = await DEATH_API.fetchChecklist(ID)
                    this.props.handleLoader()
                    if (data && data.data) {
                      this.setState({
                        checkListForm: { ...data.data }
                      })
                    }
                    else {
                      this.setState({
                        checkListForm: {
                          audioVideoMessage: "Not Started",
                          checklist: "Not Started",
                          contactList: "Not Started",
                          emailsToSend: "Not Started",
                          importantDocument: "Not Started",
                          personalInstructions: "Not Started",
                          listOfLargeBills: "Not Started",
                          litigationList: "Not Started",
                          locationOfPersonalItems: "Not Started",
                          listOfPasswords: "Not Started",
                          prepaidBurialExpenses: "Not Started",
                        }
                      })
                    }
                    this.props.handleChecklistObject(this.props.currentForm, Object.entries(this.state.checkListForm).reduce((res, item) => {
                      return { ...res, [this.camelToSnakeCase(item[0])]: item[1] }
                    }, {}))
                  } catch (error) {
                    console.log(error)
                  }
                } catch (err) {
                  console.log("err", err);
                  alert("error in upsert")
                  return
                }
                // this.setState({
                //   checkListForm: { ...this.state.checkListForm,[this.snakeToCamel(name)]:value }
                // })
                this.setState({
                  checkListCustomtext: { ...this.state.checkListCustomtext, [name]: false }
                })
              }

              }
            >
              Add +
            </Button>{" "}
          </div>

        }
        {this.state.checkListCustomtext && this.state.checkListCustomtext[name]  && this.state.editNotes && this.props.eNotes &&
          /* <EditNotes name={name} checkListform={this.state.checkListForm} customChecklist={this.state.checkListCustomtext} />
 */
          <div className="custom-field-align">

            <TextArea
              id="sectionEdit"
              // className="field-set"
              style={{ width: "350px" }}
              type="text"
              placeholder="Enter Notes"
              size={"large"}
              name="notes"
              // value={checklistObject[formName][name]}
              onChange={(e) => {
                // console.log("value....", e.target.value)
              }}
            />
            <Button
              // className="button-set"
              style={{ height: "40px" }}
              onClick={async () => {
                const value = document.getElementById("sectionEdit").value;
                console.log("value.. saved", value);
                try {
                  this.props.handleLoader()
                  await DEATH_API.upsertChecklist({
                    ...this.state.checkListForm,
                    [this.snakeToCamel(name+"_notes")]: value
                  })
                  this.setState({
                    checkListForm: {
                      ...this.state.checkListForm,
                      [this.snakeToCamel(name+"_notes")]: value
                    },
                  });
                  this.setState({ addNotes: false })
                  this.props.handleLoader()
                  try {
                    this.props.handleLoader()
                    const ID = localStorage.getItem("accessId")

                    let data = await DEATH_API.fetchChecklist(ID)
                    this.props.handleLoader()
                    if (data && data.data) {
                      this.setState({
                        checkListForm: { ...data.data }
                      })
                    }
                    else {
                      this.setState({
                        checkListForm: {
                          audioVideoMessage: "Not Started",
                          checklist: "Not Started",
                          contactList: "Not Started",
                          emailsToSend: "Not Started",
                          importantDocument: "Not Started",
                          personalInstructions: "Not Started",
                          listOfLargeBills: "Not Started",
                          litigationList: "Not Started",
                          locationOfPersonalItems: "Not Started",
                          listOfPasswords: "Not Started",
                          prepaidBurialExpenses: "Not Started",
                        }
                      })
                    }
                    this.props.handleChecklistObject(this.props.currentForm, Object.entries(this.state.checkListForm).reduce((res, item) => {
                      return { ...res, [this.camelToSnakeCase(item[0])]: item[1] }
                    }, {}))
                  } catch (error) {
                    console.log(error)
                  }
                } catch (err) {
                  console.log("err", err);
                  alert("error in upsert")
                  return
                }
                // this.setState({
                //   checkListForm: { ...this.state.checkListForm,[this.snakeToCamel(name)]:value }
                // })
                this.setState({
                  checkListCustomtext: { ...this.state.checkListCustomtext, [name]: false }
                })
              }

              }
            >
              Edit <img style={{ marginBottom: "5px" }} src={editNotes} height={20} width={20}></img>
            </Button>{" "}
          </div>

        }
      </React.Fragment>

    );
  };

  getCustomRadioField = (title, name, fields = []) => {
    const {
      handleInputChange,
      handleRadioChange,
      checklistObject,
      currentForm,
    } = this.props;

    return (
      <Row gutter={16} type="flex" justify="center">
        <Col span={16} type="flex" justify="center" align="center">
          <Form.Item label={title}>
            <Radio.Group
              defaultValue={checklistObject[formName][name]}
              name={name}
              size={"large"}
              buttonStyle="solid"
              onChange={async (e) => {
                // handleRadioChange(name, e.target.value, currentForm);
                try {
                  handleRadioChange(name, e.target.value, currentForm);
                  await DEATH_API.upsertChecklist({
                    ...this.state.checkListForm,
                    [this.snakeToCamel(name)]: e.target.value
                  })
                  this.setState({
                    checkListForm: {
                      ...this.state.checkListForm,
                      [this.snakeToCamel(name)]: e.target.value
                    },
                  });
                } catch (err) {
                  console.log("err", err);
                  alert("error in upsert")
                  return
                }
              }}
            >
              {fields.map((field) => {
                return (
                  <Radio.Button
                    style={this.getSelectedColor(name, field)}
                    value={field}
                    className="checklist-hover-style"
                  >
                    {field}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Col>

      </Row>
    );
  };

  render() {
    const fields = [
      { name: "Audio / Video Message", field: "audio_video_message" },
      { name: "Checklist", field: "checklist" },
      { name: "Contact List", field: "contact_list" },
      { name: "Emails to Send", field: "emails_to_send" },
      { name: "Important Document", field: "important_document" },
      { name: "Personal Instructions", field: "personal_instructions" },
      { name: "List of Large Bills", field: "list_of_large_bills" },
      { name: "Litigation List", field: "litigation_list" },
      { name: "Location of Personal Items", field: "location_of_personal_items" },
      { name: "List of Passwords", field: "list_of_passwords" },
      { name: "Prepaid Burial Expenses", field: "prepaid_burial_expenses" },
    ]
    console.log("checklistform", this.state.checkListForm, this.state.checkListCustomtext)
    console.log("custom text checklist", this.state.checkListForm["audioVideoMessage"] !== "Not Started" || "Incomplete" || "Complete" || "Not Applicable")

    let dataArray = [this.state.checkListForm]
    let array = dataArray.filter((item) => {
      console.log("item", item);
      if (item !== "Not Started" || "Incomplete" || "Complete" || "Not Applicable") return item;
    });
    console.log(array, "array filter");



    // Convert `obj` to a key/value array
    // `[['name', 'Luke Skywalker'], ['title', 'Jedi Knight'], ...]`
    const asArray = Object.entries(this.state.checkListForm);

    const filtered = asArray.filter(([key, value]) => (value !== "Not Started"));

    // Convert the key/value array back to an object:
    // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
    const justStrings = Object.fromEntries(filtered);
    console.log("justStrings", filtered)

    // let arr = [this.state.checkListForm];
    // for (let key of arr) {
    //   console.log("key", key)
    //   if (Object.values(key).some((x) => (x === "Not Started" || x === "Incomplete" || x === "Complete" || x === "Not Applicable"))) {
    //     console.log("fails", key)
    //   } else {
    //     console.log("code works", key)
    //   }
    // }

    const {
      checkList: { will, trust, advance_health_directives },
    } = this.props.checklistObject;
    const { role } = this.props;


    return (
      <React.Fragment>
        <div className="info-form-block">
          <Row gutter={16}>
            <Col span={24}>
              <h2 className="text-center font-weight-bold mb-4">
                <img
                  src={form}
                  height={85}
                  width={85}
                  style={{ marginRight: "20px" }}
                ></img>
                Checklist
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
          {role !== "protrustee" ? (
            <React.Fragment>
              {fields.map((item, index) => {
                return this.getRadioField(item.name, item.field, null, index)
              })}
              {this.getCustomRadioField("Will", "will", ["Yes", "No"])}
              {this.getCustomRadioField("Trust", "trust", ["Yes", "No"])}
              {this.getCustomRadioField("Advance Health Directives", "advance_health_directives", ["Yes", "No"])}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.getRadioField(
                "Audio / Video Message Did you play your message ?",
                "audio_video_message",
                ["Incomplete", "Complete"]
              )}
              {this.getRadioField(
                "Personal Instructions",
                "personal_instructions",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Emails and Texts to Send Click Send Button for Email and Text",
                "emails_to_send",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Contact List Click on Trusted Advisor Button to see who will be helping",
                "contact_list",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Were death certificates ordered ?",
                "certificates",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Prepaid Burial Expenses",
                "prepaid_burial_expenses",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField("Bills to Pay", "bills_to_pay", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField(
                "Was account titling changed ?",
                "title_changed",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Was cost of bill updated ?",
                "cost_updated",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField(
                "Was all medical equipment returned ?",
                "equipment_returned",
                ["Incomplete", "Complete"]
              )}

              {this.getRadioField("Important Document", "important_document", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField("Litigation List", "litigation_list", [
                "Incomplete",
                "Complete",
              ])}

              {this.getRadioField(
                "Location of Personal Items",
                "location_of_personal_items",
                ["Incomplete", "Complete"]
              )}
            </React.Fragment>

          )}

          {advance_health_directives === "No" ||
            will === "No" ||
            trust === "No" ? (
            <div className="info-form-block">
              <Row gutter={16}>
                <Col span={24}>
                  <h4 className="text-center  mb-4 ">
                    Reasons/Importance: AHD tell medical professionals your
                    personal wishes if you are incapacitated. It removes
                    guessing and delays based on your intentions and cannot be
                    overridden by others. Will may or may not be considered a
                    legal document in your state or jurisdiction. If done
                    properly, provides written intent for the creator. This
                    intent may or may not be recognized by courts and is often
                    not recognized by financial institutions. Trust is a legal
                    document that allows for specific instructions and intent
                    which is recognized by financial institutions. For assets to
                    be properly held, they must have the Trust as the owner. A
                    proper trust will avoid probate. Click HERE for DIY Click
                    HERE for introduction to Professional
                  </h4>
                </Col>
              </Row>
            </div>
          ) : null}
        </div>
        <Modal title={<span style={{ textAlign: "center", display: "block" }} >Checklist</span>} visible={this.state.TooltipModal} footer={null} onCancel={this.handleTooltipCancel} >
          <div style={{}}>
            <div className="">
              <h2 className="otp-heading">
                For Plan Creators, the checklist functions as a scorecard reflecting those items yet to be
                completed or reviewed by each user.  For Trusted Individuals the checklist functions as a
                dashboard to reflect those items in various stages of completion - or in some cases greyed-
                out - to reflect they are of no concern to this particular Plan Creator.  Sometimes simple
                items like this greyed-out feature can reduce stress because people are less confused if this
                is an item of importance or of no concern.
              </h2>

            </div>
          </div>
        </Modal>
        <Footer cbPrev={this.props.previousForm} cbNext={this.props.nextForm} />
        {/* <div className="row justify-content-between">
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
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type="right" />
            </Button>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  aNotes: state.rootReducer.loginUser.aNotes,
  eNotes: state.rootReducer.loginUser.eNotes,

});

const mapDispatchToProps = { postaNotes, posteNotes };
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistForm);
