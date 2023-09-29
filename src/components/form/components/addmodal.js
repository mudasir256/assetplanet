import React from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Icon,
  Button,
} from "antd";
import "../../custom/CustomSubFormTable.css";
import DEATH_API from "../../../apis/death.api";
import PhoneNumber from "../PhoneNumber";
import PhoneNum from "./Countrycode";
import Currency from "../Currency";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../WebAddress";
import swal from "sweetalert";
import Loader from "../../../components/styled-components/loader/loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      isError: false,
      errorMessage: "",
      textField: false,
      selectListCustomtext: {},
      templateDesign: "",
      loading: false,

    };
    this.formRef = React.createRef();
  }

  onSubmit = async () => {
    try {
      const { cbClose, create, formData } = this.props;


      create({
        formData,
      });
      cbClose();
    } catch (error) { }

    try {
      const { cbCreate, cbClose, onLoad, onConstraints } = this.props;

      if (onConstraints) {
        console.log("ok clicked");
        console.log(this.state.form);
        let cons = onConstraints(this.state.form);
        if (cons) {
          this.setState({ isError: true, errorMessage: cons });
          return null;
        }
      }

      let module = await cbCreate(this.state.form);
      if (module.status === 200) {
        await onLoad();
        this.setState({ isError: false, errorMessage: "", form: {} });
        cbClose();
      }
    } catch (error) { }
  };

  componentDidUpdate() {
    // console.log("in add modal comp did update");
    // console.log(this.props.formData);
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } =
      this.props.form;
    const usernameError = getFieldError("username");
    const {
      setFormData,
      formData,
      title,
      isVisible = false,
      isLoading = false,
      fields = [1],
      cbClose,
      handleCurrencyChange,
      handleSelectChange,
      handleRadioChange,
      handleInputChange,
      handleDatePickerChange,
      handlePhoneChange,
      handleDocumentChange,
      handleWebChange,
      handleRichTextChange,
      currentForm,

    } = this.props;

    return (
      <Modal
        title={<span className="custom-modal-header-title">{title}</span>}
        visible={isVisible}
        centered
        width="50%"
        onCancel={() => {
          this.setState({ isError: false, errorMessage: "" }, () => {
            cbClose();
          });
        }}
        onOk={this.onSubmit}
        // onOk={() => {
        //   console.log("REF ");
        //   this.formRef.dispatchEvent(new Event("submit"));
        // }}
        destroyOnClose={cbClose}
        okButtonProps={{
          style: {
            background: "#39b54a",
            width: "10%",
          },
        }}
      >
        <Form
          ref={(ref) => (this.formRef = ref)}
          onSubmit={(e) => {
            e.preventDefault();
            console.log("PRESSED");
          }}
        >
          <Row gutter={16}>
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
                case "email": return (
                  <Col key={idx} span={8}>
                    <Form.Item label={title}>
                      <Input
                        defaultValue={def}
                        onChange={(val) => {
                          if (currentForm) {
                            handleInputChange(val, currentForm);
                            setFormData({
                              [index]: val.target.value,
                            });
                          } else {
                            this.setState({
                              form: {
                                ...this.state.form,
                                [index]: val.target.value,
                              },
                            });
                          }
                        }}
                        size="large"
                        placeholder={`Enter ${title}`}
                      // name="client_primaryContactNumber"
                      ></Input>
                    </Form.Item>
                  </Col>
                );
                case "input":
                  return (
                    <Col key={idx} span={8}>
                      {/* <Form.Item label={title} validateStatus={"error"}> */}
                      {title === "2FA"
                        ?
                        <Form.Item label={title}>
                          <Input
                            defaultValue={def}
                            disabled={isDisabled}
                            name={index}
                            onChange={(val) => {
                              if (currentForm) {
                                handleInputChange(val, currentForm);
                                setFormData({
                                  [index]: val.target.value,
                                });
                              } else {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    [index]: val.target.value,
                                  },
                                });
                              }
                            }}
                            size="large"
                            placeholder={`Google Auth, YubiKey, SMS/Text, etc.`}
                          // name="client_primaryContactNumber"
                          ></Input>
                        </Form.Item>
                        :
                        <Form.Item label={title}>
                          <Input
                            defaultValue={def}
                            disabled={isDisabled}
                            name={index}
                            onChange={(val) => {
                              if (currentForm) {
                                handleInputChange(val, currentForm);
                                setFormData({
                                  [index]: val.target.value,
                                });
                              } else {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    [index]: val.target.value,
                                  },
                                });
                              }
                            }}
                            size="large"
                            placeholder={`Enter ${title}`}
                          // name="client_primaryContactNumber"
                          ></Input>
                        </Form.Item>

                      }

                    </Col>
                  );
                case "emails":
                  return (
                    <Col key={idx} span={8}>
                      {/* <Form.Item label={title} validateStatus={"error"}> */}
                      <Form.Item style={{ lineHeight: "0px" }} label={title}>
                        {getFieldDecorator("emails", {
                          rules: [
                            {
                              required: true,
                              type: "email",
                              message: "E-mail is not valid"
                            }
                          ]
                        })(
                          <Input
                            // className="custom-input"
                            defaultValue={def}
                            disabled={isDisabled}
                            name={index}
                            onChange={(val) => {
                              if (currentForm) {
                                handleInputChange(val, currentForm);
                                setFormData({
                                  [index]: val.target.value,
                                });
                              } else {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    [index]: val.target.value,
                                  },
                                });
                              }
                            }}
                            size="large"
                            placeholder={`Enter ${title}`}
                          // name="client_primaryContactNumber"
                          ></Input>
                        )}
                      </Form.Item>

                    </Col>
                  );
                case "phoneNumber":
                  return (
                    <Col key={idx} span={8}>
                      {/* <Form.Item label={title} validateStatus={"error"}> */}
                      <Form.Item style={{ lineHeight: "0px" }} label={title}>
                        {getFieldDecorator("phoneNumber", {
                          rules: [
                            {
                              required: true,
                              message: "Number is required"
                            }
                          ]
                        })(
                          <PhoneNum
                            defaultValue={def}
                            disabled={isDisabled}
                            name={index}
                            onChange={(val) => {
                              // console.log("phone with country code=>>", val.target.value)
                              if (currentForm) {
                                handleInputChange(val, currentForm);
                                // console.log("value phone..", val);
                                setFormData({
                                  [index]: val.target.value,
                                });
                              } else {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    [index]: val.target.value,
                                  },
                                });
                              }
                            }}
                            size="large"
                            placeholder={`Enter ${title}`}
                          // name="client_primaryContactNumber"
                          ></PhoneNum>
                        )}
                      </Form.Item>
                    </Col>
                  );
                case "multiple":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item label={title}>
                        <Input
                          required={isRequired}
                          onChange={(val) =>
                            this.setState({
                              form: {
                                ...this.state.form,
                                [index]: val.target.value,
                              },
                            })
                          }
                          size="large"
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactNumber"
                        ></Input>
                      </Form.Item>
                    </Col>
                  );

                case "select":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item id={index} label={title}>
                        <Select
                          showSearch
                          placeholder="-Select-"
                          name={title}
                          onChange={(value, id) => {
                            console.log("value", id.key)
                            if (currentForm) {
                              handleSelectChange(index, value, currentForm);
                              console.log("currentForm", currentForm)
                              if (index === "Templates") {

                                try {
                                  (async () => {
                                    this.setState({ loading: true })
                                    // isLoading=true
                                    const data = await DEATH_API.fetchEmailTemplates(id.key)
                                    // isLoading=false
                                    this.setState({ loading: false })
                                    console.log("data for template", data)
                                    if (data && data.data.template) {
                                      setFormData({
                                        ["Template"]: data.data.template,
                                      });
                                      setFormData({
                                        ["TemplateID"]: id.key,
                                      });
                                      this.setState({
                                        templateDesign:
                                          data.data.template
                                      })
                                    }
                                  })()

                                } catch (error) {
                                  this.setState({ loading: false })
                                  // this.props.handleLoader()
                                  // console.group(error)
                                }

                              }
                              if (index === "TextTemplates") {
                                console.log("value", value)
                                try {
                                  (async () => {
                                    this.setState({ loading: true })
                                    // isLoading=true
                                    const data = await DEATH_API.fetchTextTemplates(id.key)
                                    // isLoading=false
                                    this.setState({ loading: false })
                                    console.log("data for template", data.data.template)
                                    if (data && data.data.template) {
                                      setFormData({
                                        ["Template"]: data.data.template,
                                      });
                                      console.log("setting formdata", data.data.template)
                                      setFormData({
                                        ["TemplateID"]: id.key,
                                      });
                                      this.setState({
                                        templateDesign:
                                          data.data.template
                                      })
                                    }
                                  })()
                                } catch (error) {
                                  this.setState({ loading: false })
                                  // this.props.handleLoader()
                                  // console.group(error)
                                }

                              }
                              if (value === "Others") {
                                // this.setState({textField:true});
                                this.setState({
                                  selectListCustomtext: { ...this.state.selectListCustomtext, [index]: true }
                                })
                                // console.log("other is selected..",this.state.textField);
                              }
                              else {
                                setFormData({
                                  [index]: value,
                                });
                              }
                            } else {
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  [index]: value,
                                },
                              });
                              setFormData({
                                ["TemplateID"]: id.key,
                              });
                            }
                          }}

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

                            options && (
                              options.map((item, index) => {
                                return <Option key={item.id} value={item.name}>{item.name}</Option>;
                              })
                            )
                          }
                          {index === "Templates" &&
                            // console.log("options email", options)
                            options && (
                              options.map((item, index) => {
                                return <Option key={item.id} value={item.name}>{item.name}</Option>;
                              })
                            )
                          }
                          {index !== "Templates" && index !== "TextTemplates" &&
                            // console.log("options", options)
                            options && (
                              options.map((item, index) => {
                                return <Option key={index} value={item}>{item}</Option>;
                              })
                            )

                          }


                        </Select>
                        {this.state.selectListCustomtext && this.state.selectListCustomtext[index] && <div className="custom-field-align">

                          <Input
                            id={`section${index}`}
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
                              setFormData({
                                [index]: value,
                              });
                              this.setState({
                                selectListCustomtext: { ...this.state.selectListCustomtext, [index]: false }
                              })
                            }

                            }
                          >
                            OK
                          </Button>{" "}
                        </div>}
                        {/*      {this.state.textField && <div className="custom-field-align">

                          <Input
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
                      </Form.Item>
                    </Col>
                  );

                case "currency":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item label={title}>
                        <Currency
                          id={index}
                          value={null}
                          placeholder={`Enter ${title}`}
                          name="client_primaryContactCurrency"
                          onChange={(event) => {
                            handleCurrencyChange(
                              index,
                              event.target.value,
                              currentForm
                            );
                            setFormData({
                              [index]: event.target.value,
                            });
                          }}
                        ></Currency>
                      </Form.Item>
                    </Col>
                  );

                case "phone":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item label={title}>
                        <PhoneNumber
                          id={index}
                          value={formData[index] || null}
                          placeholder={`Enter ${title}`}

                          name="client_primaryContactNumber"
                          onChange={(event) => {
                            event.preventDefault()
                            console.log(event.target.value)
                            handlePhoneChange(
                              index,
                              event.target.value,
                              currentForm
                            );
                            setFormData({
                              [index]: event.target.value,
                            });
                          }}
                          disabled={isDisabled}
                        ></PhoneNumber>
                      </Form.Item>
                    </Col>
                  );

                case "date":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item label={title}>
                        <DatePicker
                          size="large"
                          // style={{ width: "100%" }}
                          format={"MM/DD/YYYY"}
                          onChange={(date, dateString) => {
                            handleDatePickerChange(
                              index,
                              date,
                              dateString,
                              currentForm
                            );
                            setFormData({
                              [index]: dateString,
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "textarea":
                  return (
                    <Col key={idx} span={24}>
                      <Form.Item label={title}>
                        <TextArea
                          id={index}
                          placeholder="Enter Notes"
                          name={index}
                          onChange={(e) => {
                            handleInputChange(e, currentForm);
                            setFormData({
                              [index]: e.target.value,
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "richtext1":
                  return (
                    <Col span={24}>
                      <Form.Item label={title}>
                        <ReactQuill

                          readOnly={false}
                          // value={formData[index] || null}
                          value={formData.Template || null}
                          onChange={(e) => {
                            handleRichTextChange(index, e, currentForm);
                            setFormData({
                              [index]: e
                            });

                            console.log('background', e);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );
                case "richtext":
                  return (
                    <Col span={24}>
                      <Form.Item label={title}>
                        <ReactQuill
                          value={formData.Template || null}
                          onChange={(e) => {
                            handleRichTextChange(index, e, currentForm);
                            setFormData({
                              [index]: e
                            });

                            console.log('background', e);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  );

                case "radio":
                  return (
                    <Col key={idx} span={8}>
                      <Form.Item label={title}>
                        <Radio.Group
                          onChange={(e) => {
                            if (currentForm) {
                              handleRadioChange(
                                index,
                                e.target.value,
                                currentForm
                              );
                              setFormData({
                                [index]: e.target.value,
                              });
                            } else {
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  [index]:
                                    e.target.value === "Yes" ? true : false,
                                },
                              });
                            }
                          }}
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
                      </Form.Item>
                    </Col>
                  );

                case "web":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <WebAddress
                          placeholder={`Enter ${title}`}
                          value={formData[index] || null}
                          onChange={(event) => {
                            // console.log("phone",event.target.name);
                            // handleWebChange(
                            //   index,
                            //   event.target.value,
                            //   currentForm
                            // );
                            setFormData({
                              [index]: event.target.value,
                            });
                          }}
                          disabled={isDisabled}

                        />
                      </Form.Item>
                    </Col>
                  );

                case "document":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <div className="custom-upload-style">
                          <input
                            id="file-input"
                            type="file"
                            onChange={(event) => {
                              // console.log("document", event.target.files[0]);
                              console.log("document size", event.target.files[0].size);
                              const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                              console.log("fileSize in mb", fileSize)
                              if (fileSize < 100) {
                                if (currentForm) {
                                  handleDocumentChange(
                                    index,
                                    event.target.files[0],
                                    currentForm
                                  );
                                  setFormData({
                                    [index]: event.target.files[0].name,
                                    file: event.target.files[0]
                                  });
                                } else {
                                  this.setState({
                                    form: {
                                      ...this.state.form,
                                      [index]: event.target.files[0],
                                    },
                                  });
                                }
                              }
                              else {
                                swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                              }
                            }}
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
                      </Form.Item>
                    </Col>
                  );
                case "file":
                  return (
                    <Col span={8}>
                      <Form.Item label={title}>
                        <div className="custom-upload-style">
                          <input
                            id="file-input"
                            type="file"
                            onChange={(event) => {
                              // console.log("document", event.target.files[0]);
                              console.log("document size", event.target.files[0].size);
                              const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                              console.log("fileSize in mb", fileSize)
                              if (fileSize < 100) {
                                if (currentForm) {
                                  handleDocumentChange(
                                    index,
                                    event.target.files[0],
                                    currentForm
                                  );
                                  setFormData({
                                    [index]: event.target.files[0].name,
                                    file: event.target.files[0]
                                  });
                                } else {
                                  this.setState({
                                    form: {
                                      ...this.state.form,
                                      [index]: event.target.files[0],
                                    },
                                  });
                                }
                              }
                              else {
                                swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                              }
                            }}
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
                      </Form.Item>
                    </Col>
                  );
              }
            })}
          </Row>
          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
        </Form>

        {
          this.state.isError ? (
            <div>
              {/* <p style={{ color: "red" }}>Can't create, constraints Failed</p> */}
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            </div>
          ) : null
        }
        <Loader isLoading={this.state.loading} />

      </Modal >
    );
  }
}

export default Form.create({ name: "add_modal" })(AddModal);