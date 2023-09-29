import React, { useState } from "react";
import { defaultStyles } from "../../../constants/style-constants/utils";
// import Modal from "./Modal";
import { Button } from "../../../components/styled-components/button";
import * as Style from "../styles/ModalStyle";
import { Icon, Modal, Select, Row, Col, Radio, Input } from "antd";
import Currency from "../../../components/form/Currency";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PhoneNum from "../../../components/form/components/Countrycode";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../../../components/form/WebAddress";
import swal from "sweetalert";
import { DatePicker } from "antd";

const { Option } = Select;

function AddModal({
  show,
  close,
  fields,
  submitData,
  modalTitle,
  obj,
  handleChange,
}) {
  const { styles } = defaultStyles;
  const [formData, setFormData] = useState();
  const handleSubmit = () => {
    submitData();
    close();
  };
  console.log("show....", show);

  for (let i = 0; i < fields.length; i++) {
    console.log("fieldssssss", fields[i]);
  }
  return (
    <Modal footer={null} closable={false} visible={show} centered>
    {console.log("show in modal",show)}
      <Style.HeaderConatiner>
        <div style={styles.text.formHeaderText}>{modalTitle}</div>
        {/* <Icon type="close" onClick={close}></Icon> */}
      </Style.HeaderConatiner>

      <Style.FieldsContainer>
        {fields.map((item, idx) => {
          const {
            title,
            type,
            options = [],
            index = null,
            isRequired = false,
            def = null,
            isDisabled = false,
          } = item;
          switch (type) {
            case "email":
              return (
                <Col key={idx} span={8}>
                  <Style.Input
                    defaultValue={def}
                    // onChange={(val) => {
                    //   if (currentForm) {
                    //     handleInputChange(val, currentForm);
                    //     setFormData({
                    //       [index]: val.target.value,
                    //     });
                    //   } else {
                    //     this.setState({
                    //       form: {
                    //         ...this.state.form,
                    //         [index]: val.target.value,
                    //       },
                    //     });
                    //   }
                    // }}
                    size="large"
                    placeholder={`Enter ${title}`}
                    // name="client_primaryContactNumber"
                  ></Style.Input>
                </Col>
              );
            case "input":
              return (
                <Col key={idx} span={8}>
                  {/* <Form.Item label={title} validateStatus={"error"}> */}
                  {title === "2FA" ? (
                    <Style.Input
                      defaultValue={def}
                      disabled={isDisabled}
                      name={index}
                      // onChange={(val) => {
                      //   if (currentForm) {
                      //     handleInputChange(val, currentForm);
                      //     setFormData({
                      //       [index]: val.target.value,
                      //     });
                      //   } else {
                      //     this.setState({
                      //       form: {
                      //         ...this.state.form,
                      //         [index]: val.target.value,
                      //       },
                      //     });
                      //   }
                      // }}
                      size="large"
                      placeholder={`Google Auth, YubiKey, SMS/Text, etc.`}
                      // name="client_primaryContactNumber"
                    ></Style.Input>
                  ) : (
                    <Style.Input
                      defaultValue={def}
                      disabled={isDisabled}
                      name={index}
                      // onChange={(val) => {
                      //   if (currentForm) {
                      //     handleInputChange(val, currentForm);
                      //     setFormData({
                      //       [index]: val.target.value,
                      //     });
                      //   } else {
                      //     this.setState({
                      //       form: {
                      //         ...this.state.form,
                      //         [index]: val.target.value,
                      //       },
                      //     });
                      //   }
                      // }}
                      size="large"
                      placeholder={`Enter ${title}`}
                      // name="client_primaryContactNumber"
                    ></Style.Input>
                  )}
                </Col>
              );
            case "emails":
              return (
                <Col key={idx} span={8}>
                  {/* <Form.Item label={title} validateStatus={"error"}> */}

                  <Style.Input
                    // className="custom-input"
                    defaultValue={def}
                    disabled={isDisabled}
                    name={index}
                    // onChange={(val) => {
                    //   if (currentForm) {
                    //     handleInputChange(val, currentForm);
                    //     setFormData({
                    //       [index]: val.target.value,
                    //     });
                    //   } else {
                    //     this.setState({
                    //       form: {
                    //         ...this.state.form,
                    //         [index]: val.target.value,
                    //       },
                    //     });
                    //   }
                    // }}
                    size="large"
                    placeholder={`Enter ${title}`}
                    // name="client_primaryContactNumber"
                  ></Style.Input>
                </Col>
              );
            case "phoneNumber":
              return (
                <Col key={idx} span={8}>
                  {/* <Form.Item label={title} validateStatus={"error"}> */}

                  <PhoneNum
                    defaultValue={def}
                    disabled={isDisabled}
                    name={index}
                    // onChange={(val) => {
                    //   // console.log("phone with country code=>>", val.target.value)
                    //   if (currentForm) {
                    //     handleInputChange(val, currentForm);
                    //     // console.log("value phone..", val);
                    //     setFormData({
                    //       [index]: val.target.value,
                    //     });
                    //   } else {
                    //     this.setState({
                    //       form: {
                    //         ...this.state.form,
                    //         [index]: val.target.value,
                    //       },
                    //     });
                    //   }
                    // }}
                    size="large"
                    placeholder={`Enter ${title}`}
                    // name="client_primaryContactNumber"
                  ></PhoneNum>
                </Col>
              );
            case "multiple":
              return (
                <Col key={idx} span={8}>
                  <Style.Input
                    required={isRequired}
                    // onChange={(val) =>
                    //   this.setState({
                    //     form: {
                    //       ...this.state.form,
                    //       [index]: val.target.value,
                    //     },
                    //   })
                    // }
                    size="large"
                    placeholder={`Enter ${title}`}
                    name="client_primaryContactNumber"
                  ></Style.Input>
                </Col>
              );

            case "select":
              return (
                <Col key={idx} span={8}>
                  <Select
                    showSearch
                    placeholder="-Select-"
                    name={title}
                    // onChange={(value, id) => {
                    //   console.log("value", id.key)
                    //   if (currentForm) {
                    //     handleSelectChange(index, value, currentForm);
                    //     console.log("currentForm", currentForm)
                    //     if (index === "Templates") {

                    //       try {
                    //         (async () => {
                    //           this.setState({ loading: true })
                    //           // isLoading=true
                    //           const data = await DEATH_API.fetchEmailTemplates(id.key)
                    //           // isLoading=false
                    //           this.setState({ loading: false })
                    //           console.log("data for template", data)
                    //           if (data && data.data.template) {
                    //             setFormData({
                    //               ["Template"]: data.data.template,
                    //             });
                    //             setFormData({
                    //               ["TemplateID"]: id.key,
                    //             });
                    //             this.setState({
                    //               templateDesign:
                    //                 data.data.template
                    //             })
                    //           }
                    //         })()

                    //       } catch (error) {
                    //         this.setState({ loading: false })
                    //         // this.props.handleLoader()
                    //         // console.group(error)
                    //       }

                    //     }
                    //     if (index === "TextTemplates") {
                    //       console.log("value", value)
                    //       try {
                    //         (async () => {
                    //           this.setState({ loading: true })
                    //           // isLoading=true
                    //           const data = await DEATH_API.fetchTextTemplates(id.key)
                    //           // isLoading=false
                    //           this.setState({ loading: false })
                    //           console.log("data for template", data.data.template)
                    //           if (data && data.data.template) {
                    //             setFormData({
                    //               ["Template"]: data.data.template,
                    //             });
                    //             console.log("setting formdata", data.data.template)
                    //             setFormData({
                    //               ["TemplateID"]: id.key,
                    //             });
                    //             this.setState({
                    //               templateDesign:
                    //                 data.data.template
                    //             })
                    //           }
                    //         })()
                    //       } catch (error) {
                    //         this.setState({ loading: false })
                    //         // this.props.handleLoader()
                    //         // console.group(error)
                    //       }

                    //     }
                    //     if (value === "Others") {
                    //       // this.setState({textField:true});
                    //       this.setState({
                    //         selectListCustomtext: { ...this.state.selectListCustomtext, [index]: true }
                    //       })
                    //       // console.log("other is selected..",this.state.textField);
                    //     }
                    //     else {
                    //       setFormData({
                    //         [index]: value,
                    //       });
                    //     }
                    //   } else {
                    //     this.setState({
                    //       form: {
                    //         ...this.state.form,
                    //         [index]: value,
                    //       },
                    //     });
                    //     setFormData({
                    //       ["TemplateID"]: id.key,
                    //     });
                    //   }
                    // }}

                    // onChange={(val) =>
                    //   this.setState({
                    //     form: {
                    //       ...this.state.form,
                    //       [index]: val,
                    //     },
                    //   })
                    // }
                  >
                    {index === "TextTemplates" &&
                      // console.log("options text", options)

                      options &&
                      options.map((item, index) => {
                        return (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    {index === "Templates" &&
                      // console.log("options email", options)
                      options &&
                      options.map((item, index) => {
                        return (
                          <Option key={item.id} value={item.name}>
                            {item.name}
                          </Option>
                        );
                      })}
                    {
                      index !== "Templates" &&
                        index !== "TextTemplates" &&
                        console.log("options", options)
                      // options && (
                      //   options.map((item, index) => {
                      //     return <Option key={index} value={item}>{item}</Option>;
                      //   })
                      // )
                    }
                  </Select>

                  {/*      {this.state.textField && <div className="custom-field-align">

                    <Style.Input
                      // id="section"
                      id={`section${index}`}
                      // className="field-set"
                      name={title}
                      type="text"
                      placeholder={`Enter ${title}`}
                      size={"large"}
                      onChange={(e) => {
                        // console.log("value....", e.target.value)
                      }}
                    />
                    <Button
                      className="button-set"
                      onClick={() => {
                        const value = document.getElementById(`section${index}`).value;
                        console.log("value.. saved", value);
                        setFormData({
                          [index]: value,
                        });
                        this.setState({textField:false});
                      }

                      }
                    >
                      OK
                    </Button>{" "}
                    </div>}  */}
                </Col>
              );

            case "currency":
              return (
                <Col key={idx} span={8}>
                  <Currency
                    id={index}
                    value={null}
                    placeholder={`Enter ${title}`}
                    name="client_primaryContactCurrency"
                    // onChange={(event) => {
                    //   handleCurrencyChange(
                    //     index,
                    //     event.target.value,
                    //     currentForm
                    //   );
                    //   setFormData({
                    //     [index]: event.target.value,
                    //   });
                    // }}
                  ></Currency>
                </Col>
              );

            case "date":
              return (
                <Col key={idx} span={8}>
                  <DatePicker
                    size="large"
                    // style={{ width: "100%" }}
                    format={"MM/DD/YYYY"}
                    // onChange={(date, dateString) => {
                    //   handleDatePickerChange(
                    //     index,
                    //     date,
                    //     dateString,
                    //     currentForm
                    //   );
                    //   setFormData({
                    //     [index]: dateString,
                    //   });
                    // }}
                  />
                </Col>
              );

            case "textarea":
              return (
                <Col key={idx} span={24}>
                  <TextArea
                    id={index}
                    placeholder="Enter Notes"
                    name={index}
                    // onChange={(e) => {
                    //   handleInputChange(e, currentForm);
                    //   setFormData({
                    //     [index]: e.target.value,
                    //   });
                    // }}
                  />
                </Col>
              );

            case "richtext1":
              return (
                <Col span={24}>
                  <ReactQuill
                    readOnly={false}
                    // value={formData[index] || null}
                    value={formData.Template || null}
                    // onChange={(e) => {
                    //   handleRichTextChange(index, e, currentForm);
                    //   setFormData({
                    //     [index]: e
                    //   });

                    //   console.log('background', e);
                    // }}
                  />
                </Col>
              );
            case "richtext":
              return (
                <Col span={24}>
                  <ReactQuill
                    value={formData.Template || null}
                    // onChange={(e) => {
                    //   handleRichTextChange(index, e, currentForm);
                    //   setFormData({
                    //     [index]: e
                    //   });

                    //   console.log('background', e);
                    // }}
                  />
                </Col>
              );

            case "radio":
              return (
                <Col key={idx} span={8}>
                  <Radio.Group
                  // onChange={(e) => {
                  //   if (currentForm) {
                  //     handleRadioChange(
                  //       index,
                  //       e.target.value,
                  //       currentForm
                  //     );
                  //     setFormData({
                  //       [index]: e.target.value,
                  //     });
                  //   } else {
                  //     this.setState({
                  //       form: {
                  //         ...this.state.form,
                  //         [index]:
                  //           e.target.value === "Yes" ? true : false,
                  //       },
                  //     });
                  //   }
                  // }}
                  // onChange={(val) => {
                  //   this.setState({
                  //     form: {
                  //       ...this.state.form,
                  //       [index]:
                  //         val.target.value === "Yes" ? true : false,
                  //     },
                  //   });
                  // }}
                  >
                    {["Yes", "No"].map((value, vindex) => (
                      <Radio.Button key={vindex} value={value}>
                        {value}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Col>
              );

            case "web":
              return (
                <Col span={8}>
                  <WebAddress
                    placeholder={`Enter ${title}`}
                    value={formData[index] || null}
                    // onChange={(event) => {
                    //   // console.log("phone",event.target.name);
                    //   // handleWebChange(
                    //   //   index,
                    //   //   event.target.value,
                    //   //   currentForm
                    //   // );
                    //   setFormData({
                    //     [index]: event.target.value,
                    //   });
                    // }}
                    disabled={isDisabled}
                  />
                </Col>
              );

            case "document":
              return (
                <Col span={8}>
                  <div className="custom-upload-style">
                    <Style.Input
                      id="file-input"
                      type="file"
                      // onChange={(event) => {
                      //   // console.log("document", event.target.files[0]);
                      //   console.log("document size", event.target.files[0].size);
                      //   const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                      //   console.log("fileSize in mb", fileSize)
                      //   if (fileSize < 100) {
                      //     if (currentForm) {
                      //       handleDocumentChange(
                      //         index,
                      //         event.target.files[0],
                      //         currentForm
                      //       );
                      //       setFormData({
                      //         [index]: event.target.files[0].name,
                      //         file: event.target.files[0]
                      //       });
                      //     } else {
                      //       this.setState({
                      //         form: {
                      //           ...this.state.form,
                      //           [index]: event.target.files[0],
                      //         },
                      //       });
                      //     }
                      //   }
                      //   else {
                      //     swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                      //   }
                      // }}
                    />
                    <label for="file-input">
                      <Icon
                        className="mt-1"
                        style={{
                          fontSize: "23px",
                          background: "#39b54a",
                          padding: "8px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Col>
              );
            case "file":
              return (
                <Col span={8}>
                  <div className="custom-upload-style">
                    <Style.Input
                      id="file-input"
                      type="file"
                      // onChange={(event) => {
                      //   // console.log("document", event.target.files[0]);
                      //   console.log("document size", event.target.files[0].size);
                      //   const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                      //   console.log("fileSize in mb", fileSize)
                      //   if (fileSize < 100) {
                      //     if (currentForm) {
                      //       handleDocumentChange(
                      //         index,
                      //         event.target.files[0],
                      //         currentForm
                      //       );
                      //       setFormData({
                      //         [index]: event.target.files[0].name,
                      //         file: event.target.files[0]
                      //       });
                      //     } else {
                      //       this.setState({
                      //         form: {
                      //           ...this.state.form,
                      //           [index]: event.target.files[0],
                      //         },
                      //       });
                      //     }
                      //   }
                      //   else {
                      //     swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                      //   }
                      // }}
                      accept="image/jpeg, .pdf, .xlsx, .doc"
                    />
                    <label for="file-input">
                      <Icon
                        className="mt-1"
                        style={{
                          fontSize: "23px",
                          background: "#39b54a",
                          padding: "8px",
                          borderRadius: "5px",
                          color: "white",
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Col>
              );
          }
        })}
      </Style.FieldsContainer>

      <Style.WrapperButtons>
        <Style.CancelButton onClick={close}>
          Cancel
        </Style.CancelButton>
        <Style.SaveButton  onClick={handleSubmit}>
          Ok
        </Style.SaveButton>
      </Style.WrapperButtons>
    </Modal>
  );
}

export default AddModal;
