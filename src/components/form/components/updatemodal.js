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
import moment from "moment";
import "../../custom/CustomSubFormTable.css";
import PhoneNumber from "../PhoneNumber";
import PhoneNum from "./Countrycode";
import Currency from "../Currency";
import TextArea from "antd/lib/input/TextArea";
import WebAddress from "../WebAddress";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import swal from "sweetalert";
import Loader from "../../../components/styled-components/loader/loader";
import DEATH_API from "../../../apis/death.api";

const { Option } = Select;

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      isError: false,
      errorMessage: "",
      selectListCustomtext: {},
      loading: false,
      templateState: this.props.obj && this.props.obj["Template"],
      templateId: null,
      audioFile: "",
      videoFile: "",

    };
  }

  componentDidUpdate() {
    console.log("update obj;", this.props.obj);
  }
  onSubmit = async () => {
    try {
      const { cbUpdate, cbClose, onLoad, obj, onConstraints } = this.props;
      console.log("object submit", obj)
      if (obj["emailTemplateId"]) {
        obj["emailTemplateId"] = this.state.templateId && +this.state.templateId;

      }
      else if (obj["textTemplateId"]) {
        obj["textTemplateId"] = this.state.templateId && this.state.templateId;
        obj["text_template_id"] = this.state.templateId && this.state.templateId;


      }
      console.log("object on submit", obj)
      if (onConstraints) {
        let cons = onConstraints(obj);
        if (cons) {
          this.setState({ isError: true, errorMessage: cons });
          return null;
        }
      }
      cbClose();
      let module = await cbUpdate(obj.id, obj);
      this.setState({ isError: false, errorMessage: "" });
    } catch (error) { }
  };

  render() {
    const {
      title,
      isVisible = false,
      fields = [1],
      cbClose,
      obj = {},
      onUpdateChange,
      handleDateChange,
      isLoading = false,
    } = this.props;

    return (
      (
        <Modal
          title={<span className="custom-modal-header-title">{title}</span>}
          visible={isVisible}
          centered
          width="50%"
          onCancel={cbClose}
          onOk={this.onSubmit}
          destroyOnClose={cbClose}
          okButtonProps={{
            style: {
              background: "#39b54a",
              width: "10%",
            },
          }}
        >
          <Form>
            <Row gutter={16}>
              {fields.map((item, idx) => {
                const {
                  title,
                  type,
                  options = [],
                  index = null,
                  isDisabled,
                } = item;
                // if(obj)  {

                // }
                switch (type) {
                  case "email1":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          <Input
                            value={obj ? obj[index] : ""}
                            disabled={isDisabled}
                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                            size="large"
                            placeholder={`Enter ${title}`}
                            name="client_primaryContactNumber"
                          ></Input>
                        </Form.Item>
                      </Col>
                    );
                  case "input":
                    return (
                      <Col key={idx} span={8}>
                        {title === "2FA"
                          ?
                          <Form.Item label={title}>
                            <Input
                              value={obj ? obj[index] : ""}
                              disabled={isDisabled}
                              onChange={(val) =>
                                onUpdateChange(val.target.value, index)
                              }
                              size="large"
                              placeholder={`Google Auth, YubiKey, SMS/Text, etc.`}
                              name="client_primaryContactNumber"
                            ></Input>
                          </Form.Item>
                          :
                          <Form.Item label={title}>
                            <Input
                              value={obj ? obj[index] : ""}
                              disabled={isDisabled}
                              onChange={(val) =>
                                onUpdateChange(val.target.value, index)
                              }
                              size="large"
                              placeholder={`Enter ${title}`}
                              name="client_primaryContactNumber"
                            ></Input>
                          </Form.Item>
                        }
                      </Col>
                    );

                  case "email":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>

                          <Input
                            value={obj ? obj[index] : ""}
                            disabled={isDisabled}
                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                            size="large"
                            placeholder={`Enter ${title}`}
                            name="Email"
                          ></Input>
                        </Form.Item>
                      </Col>
                    );
                  case "video":
                    return (
                      <Col span={12}>
                        <Form.Item label={title}>
                          {obj && obj["videoFileName"] &&
                            <React.Fragment>
                              <span style={{ display: "block", color: "green" }}><a href={obj ? obj["videoUrl"] : ""} target="_blank"> {obj ? obj["videoFileName"] : ""}</a></span>
                            </React.Fragment>
                          }
                          <div className="custom-upload-style">
                            <input
                              id="file-input-video"
                              type="file"
                              // style={{ display: "none" }}
                              // style={{ display: (obj && obj["videoFileName"]) ? 'none' : 'line-through' }}
                              // defaultValue={obj ? obj[index] : ""}
                              // value={obj ? obj[index] : ""}
                              accept="video/*"
                              onChange={(event) => {
                                console.log("document size", event.target.files[0].size);
                                const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                console.log("fileSize in mb", fileSize)
                                if (fileSize < 100) {
                                  onUpdateChange(
                                    event.target.files[0].name,
                                    index
                                  );
                                  console.log("event.target.files[0]", event.target.files[0].name)
                                  this.setState({ videoFile: event.target.files[0].name })

                                  onUpdateChange(event.target.files[0], index);
                                }
                                else {
                                  swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                                }
                              }}
                            />
                            <label for="file-input-video" style={{ cursor: "pointer" }}>
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
                  case "audio":
                    return (
                      <Col span={12}>
                        <Form.Item label={title}>
                          {obj && obj["audioFileName"] &&
                            <React.Fragment>
                              <span style={{ display: "block", color: "green" }}><a href={obj ? obj["audioUrl"] : ""} target="_blank"> {obj ? obj["audioFileName"] : ""}</a></span>
                            </React.Fragment>
                          }
                          <div className="custom-upload-style">
                            <input
                              id="file-input-audio"
                              type="file"
                              accept="audio/*"
                              // style={{ display: "none" }}

                              // defaultValue={obj ? obj[index] : ""}
                              // value={obj ? obj[index] : ""}

                              onChange={(event) => {
                                console.log("document size", event.target.files[0].size);
                                const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                console.log("fileSize in mb", fileSize)
                                if (fileSize < 100) {

                                  onUpdateChange(
                                    event.target.files[0].name,
                                    index
                                  );
                                  this.setState({ audioFile: event.target.files[0].name })

                                  onUpdateChange(event.target.files[0], index);
                                }
                                else {
                                  swal("Oops!", "File size is large! (Max allowed 100MB)", "error");

                                }
                              }}
                            />
                            <label htmlFor="file-input-audio" style={{ cursor: "pointer" }}>
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
                  case "phoneNumber":
                    return (
                      <Col key={idx} span={8}>
                        {/* <Form.Item label={title} validateStatus={"error"}> */}
                        <Form.Item style={{ lineHeight: "0px" }} label={title}>
                          {console.log("obj>>>", obj)}
                          <PhoneNum
                            // value={obj ?
                            //   (index === "Phone") ?
                            //     obj.Phone
                            //     :
                            //     obj.AlternatePhone
                            //   :
                            //   ""
                            // }
                            value={obj ? obj[index] : ""}
                            disabled={isDisabled}
                            onChange={(val) => {

                              onUpdateChange(val.target.value, index)
                            }
                            }
                            // onChange={(obj) => {

                            // if (index === "Phone") {

                            // }
                            // else {

                            // }

                            // }}
                            placeholder={`Enter ${title}`}
                            name={index}
                            size="large"
                          ></PhoneNum>

                        </Form.Item>
                      </Col>
                    );
                  case "phoneNumberA":
                    return (
                      <Col key={idx} span={8}>
                        {/* <Form.Item label={title} validateStatus={"error"}> */}
                        <Form.Item style={{ lineHeight: "0px" }}>
                          <label htmlFor={title} className="label-style" >{title}</label>
                          {console.log("obj>>> AA", obj)}
                          <PhoneNum
                            // value={obj ?
                            //   (index === "Phone") ?
                            //     obj.Phone
                            //     :
                            //     obj.AlternatePhone
                            //   :
                            //   ""
                            // }
                            value={obj ? obj[index] : ""}
                            disabled={isDisabled}
                            onChange={(val) => {

                              onUpdateChange(val.target.value, index)
                            }
                            }
                            // onChange={(obj) => {

                            // if (index === "Phone") {

                            // }
                            // else {

                            // }

                            // }}
                            placeholder={`Enter ${title}`}
                            name={index}
                            size="large"
                          ></PhoneNum>

                        </Form.Item>
                      </Col>
                    );
                  case "select":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item id={index} label={title}>
                          <Select
                            showSearch
                            value={obj ? obj[index] : ""}
                            placeholder="-Select-"
                            onChange={
                              (val, id) => {
                                if (index === "Templates") {
                                  console.log("item in options", val, id, obj)

                                  try {
                                    (async () => {
                                      this.setState({ loading: true })
                                      const data = await DEATH_API.fetchEmailTemplates(id.key)
                                      this.setState({ loading: false })
                                      if (data && data.data.template) {

                                        this.setState({
                                          ["Template"]: data.data.template,
                                        });
                                        this.setState({
                                          ["TemplateID"]: id.key,
                                        });
                                        this.setState({
                                          templateId: id.key,
                                        });
                                        obj['emailTemplateId'] = +id.key;
                                        obj["Template"] = data.data.template;

                                        console.log("obj in email template", obj)
                                        this.setState({
                                          templateState:
                                            data.data.template,
                                        })
                                      }
                                    })()
                                  } catch (error) {

                                    console.log(error)
                                  }

                                }
                                else if (index === "TextTemplates") {

                                  try {
                                    (async () => {
                                      this.setState({ loading: true })
                                      const data = await DEATH_API.fetchTextTemplates(id.key)
                                      this.setState({ loading: false })
                                      if (data && data.data.template) {

                                        this.setState({
                                          ["Template"]: data.data.template,
                                        });
                                        this.setState({
                                          templateId: id.key,
                                        });
                                        this.setState({
                                          templateState:
                                            data.data.template,
                                        })

                                      }
                                    })()
                                  } catch (error) {

                                    console.log(error)
                                  }

                                }

                                if (val === "Others") {
                                  this.setState({
                                    selectListCustomtext: { ...this.state.selectListCustomtext, [index]: true }
                                  })
                                }
                                else {
                                  onUpdateChange(val, index)
                                }
                              }
                            }
                          >


                            {index === "Templates" || index === "TextTemplates" ?
                              (options.length > 0 ? (
                                options.map((item, index) => {
                                  return <Option key={item.id} value={item.name}>{item.name}</Option>;
                                })
                              ) : (
                                <React.Fragment>
                                  <Option value="Head Stone">Head Stone</Option>
                                  <Option value="Casket">Casket</Option>
                                  <Option value="Urn">Urn</Option>
                                  <Option value="Flowers">Flowers</Option>
                                  <Option value="Others">Others</Option>
                                </React.Fragment>
                              )) :
                              (options.length > 0 ? (
                                options.map((item, index) => {
                                  return <Option key={index} value={item}>{item}</Option>;
                                })
                              ) : (
                                <React.Fragment>
                                  <Option value="Head Stone">Head Stone</Option>
                                  <Option value="Casket">Casket</Option>
                                  <Option value="Urn">Urn</Option>
                                  <Option value="Flowers">Flowers</Option>
                                  <Option value="Others">Others</Option>
                                </React.Fragment>
                              ))
                            }

                          </Select>
                          {this.state.selectListCustomtext && this.state.selectListCustomtext[index] && <div className="custom-field-align">

                            <Input
                              id={`section${index}`}
                              name={title}
                              type="text"
                              placeholder={`Enter ${title}`}
                              size={"large"}

                            />
                            <Button
                              className="button-set"
                              onClick={() => {
                                const value = document.getElementById(`section${index}`).value;

                                onUpdateChange(value, index)
                                this.setState({
                                  selectListCustomtext: { ...this.state.selectListCustomtext, [index]: false }
                                })
                              }

                              }
                            >
                              OK
                            </Button>{" "}
                          </div>}

                        </Form.Item>
                      </Col>
                    );

                  case "currency":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          <Currency
                            id={index}
                            value={obj ? obj[index] : ""}
                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                            //   value={
                            //     this.state.form[index]
                            //       ? this.state.form[index]
                            //       : null
                            //   }
                            placeholder="#,###,###,##"
                            name="client_primaryContactCurrency"
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
                            value={index && obj && obj[index]}
                            placeholder={`Enter ${title}`}
                            name="client_primaryContactNumber"
                            onChange={(val) => {

                              onUpdateChange(val.target.value, index)
                            }
                            }
                          ></PhoneNumber>
                        </Form.Item>
                      </Col>
                    );

                  case "date":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          <DatePicker
                            defaultValue={obj && obj[index] && moment(obj[index]) || null}
                            onChange={(date, dateString) =>
                              handleDateChange(date, dateString, index)
                            }
                            size="large"
                            // style={{ width: "100%" }}
                            format={"MM/DD/YYYY"}
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
                            value={obj ? obj[index] : ""}
                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                          />
                        </Form.Item>
                      </Col>
                    );
                  case "richtext":
                    return (
                      <Col span={24}>

                        <Form.Item label={title}>
                          <ReactQuill
                            // value={obj ? obj[index] : ""}
                            value={this.state.Template ? this.state.Template : obj ? obj.template : ""}
                            // value={obj ? obj.template : this.state.Template}
                            onChange={(val) => {
                              onUpdateChange(val, index)

                            }
                            }
                          />
                        </Form.Item>
                      </Col>
                    );
                  case "richtext1":
                    return (
                      <Col span={24}>

                        <Form.Item label={title}>
                          <ReactQuill
                            // value={obj ? obj[index] : ""}
                            // value={obj ? obj.template : this.state.Template || (obj && obj["email_template"]) && obj["email_template"].template}
                            value={this.state.templateState && this.state.templateState || (obj && obj["Template"]) && obj["Template"]}
                            // defaultValue={this.state.templateState && this.state.templateState || (obj && obj["email_template"]) && obj["email_template"].template}
                            // value={this.state.templateState && this.state.templateState}
                            onChange={(val) => {
                              // console.log("onchange called", val, index);
                              this.setState({
                                templateState: val
                              })
                              onUpdateChange(val, index)

                            }
                            }
                          />
                        </Form.Item>
                      </Col>
                    );
                  case "richtext2":
                    return (
                      <Col span={24}>

                        <Form.Item label={title}>
                          <ReactQuill
                            // value={obj ? obj[index] : ""}
                            value={this.state.templateState ? this.state.templateState : "" || (obj && obj["text_template"]) && obj["text_template"].template}
                            // value={obj ? obj.template : this.state.Template}
                            onChange={(val) => {
                              onUpdateChange(val, index)

                            }
                            }
                          />
                        </Form.Item>
                      </Col>
                    );
                  case "radio":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          <Radio.Group
                            // value={
                            //   this.state.form[index]
                            //     ? this.state.form[index]
                            //     : null
                            // }
                            defaultValue={obj ? obj[index] : ""}
                            // defaultValue={obj ? obj[index] === true ? "Yes" : "NO" :""}

                            // onChange={(val) => {
                            //   this.setState({
                            //     form: {
                            //       ...this.state.form,
                            //       [index]:
                            //         val.target.value === "Yes" ? true : false,
                            //     },
                            //   });
                            // }}

                            onChange={(val) =>
                              onUpdateChange(val.target.value, index)
                            }
                          >
                            {["Yes", "No"].map((value, vindex) => (
                              <Radio.Button className="radio-center" style={{ display: 'inline-block' }} key={vindex} value={value}>
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
                            value={obj && obj[index] || null}
                            placeholder={`Enter ${title}`}
                            onChange={(event) =>
                              onUpdateChange(event.target.value, index)
                            }
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
                              // value={obj ? obj[index] : ""}

                              onChange={(event) => {
                                console.log("document size", event.target.files[0].size);
                                const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                console.log("fileSize in mb", fileSize)
                                if (fileSize < 100) {
                                  onUpdateChange(
                                    event.target.files[0].name,
                                    index
                                  );
                                  onUpdateChange(event.target.files[0], index);
                                }
                                else {
                                  swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                                }
                              }}
                            />
                            <label htmlFor="file-input">
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
                              // value={obj ? obj[index] : ""}

                              onChange={(event) => {
                                console.log("document size", event.target.files[0].size);
                                const fileSize = event.target.files[0].size / (1024 * 1000)// in MB
                                console.log("fileSize in mb", fileSize)
                                if (fileSize < 100) {
                                  onUpdateChange(
                                    event.target.files[0].name,
                                    index
                                  );
                                  onUpdateChange(event.target.files[0], index);
                                }
                                else {
                                  swal("Oops!", "File size is large! (Max allowed 100MB)", "error");
                                }
                              }}
                              accept="image/jpeg, .pdf, .xlsx, .doc"
                            />
                            <label htmlFor="file-input">
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
          </Form>

          {this.state.isError ? (
            <div>
              {/* <p style={{ color: "red" }}>Can't create, constraints Failed</p> */}
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            </div>
          ) : null}
          <Loader isLoading={this.state.loading} />
        </Modal>
      )
    );
  }
}

export default UpdateModal;
