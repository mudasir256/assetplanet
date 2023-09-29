import React from "react";
import {
  Row,
  Col,
  Modal,
  Form,
  Select,
  DatePicker,

} from "antd";
import moment from "moment";
import "../../custom/CustomSubFormTable.css";
import speaker from "../../../assets/images/speaker.png"
import { saveAs } from 'file-saver'
import "react-quill/dist/quill.snow.css";
import Loader from "../../../components/styled-components/loader/loader";

const { Option } = Select;

class ViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      isError: false,
      errorMessage: "",
    };
  }
  onSubmit = async () => {
    try {
      const { cbUpdate, cbClose, onLoad, obj, onConstraints } = this.props;

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
                // console.log("in view modal",obj);
                switch (type) {
                  case "email":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );
                  case "phoneNumber":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {obj ?
                            (
                              title === "Phone" ?

                                <React.Fragment>{obj[index]}</React.Fragment>
                                :
                                <React.Fragment>{obj[index]}</React.Fragment>
                            ) :
                            ""
                          }

                        </Form.Item>
                      </Col>
                    );
                  case "input":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );
                  case "audio":
                    return (
                      <Col span={12}>
                        <Form.Item >
                          <label htmlFor={title} className="label-style">{title}</label>
                          <div style={{
                            display: "flex", height: "fit-content",
                            margin: "0px",
                            width: "20rem",
                            backgroundImage: `url('${speaker}')`,
                            backgroundSize: "15rem",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }} >
                            <audio style={{ height: "20rem", width: "20rem" }} controls>
                              <source src={obj ? obj[index] : ""} type="audio/mpeg" />
                            </audio>
                          </div>
                        </Form.Item>
                      </Col>
                    );
                  case "video":
                    return (
                      <Col span={12}>
                        <Form.Item >
                          <label htmlFor={title} className="label-style">{title}</label>
                          <div style={{
                            display: "flex", height: "fit-content",
                            margin: "0px",
                            width: "20rem",
                            justifyContent: "space-between",
                            alignItems: "center"
                          }} >
                            <video style={{ height: "20rem", width: "20rem" }} controls>
                              <source src={obj ? obj[index] : ""} type="video/mp4" />
                            </video>
                          </div>
                        </Form.Item>
                      </Col>
                    );
                  case "select":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item id={index} label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );

                  case "currency":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );

                  case "phone":
                    // console.log(`${index} value is =>`, index && obj && obj[index])
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {index && obj && obj[index]}

                        </Form.Item>
                      </Col>
                    );

                  //   case "date":
                  //     return (
                  //       <Col key={idx} span={8}>
                  //         <Form.Item label={title}>
                  //         {obj && obj[index] && moment(obj[index]) || null}

                  //         </Form.Item>
                  //       </Col>
                  //     );
                  case "date":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          <DatePicker
                            disabled
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
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );
                  case "richtext":
                    return (
                      <Col span={24}>
                        <Form.Item label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );

                  case "radio":
                    return (
                      <Col key={idx} span={8}>
                        <Form.Item label={title}>
                          {obj ? obj[index] : ""}

                        </Form.Item>
                      </Col>
                    );

                  case "web":
                    return (
                      <Col span={8}>
                        <Form.Item label={title}>
                          {obj && obj[index] || null}

                        </Form.Item>
                      </Col>
                    );

                  case "document":
                    return (
                      <Col span={8}>
                        <Form.Item label={title}>
                          <div className="custom-upload-style">
                            {obj ?
                              <button className="custom-download-style" onClick={() => {
                                saveAs(obj.fileUrl, 'Documentdownload')
                              }}>
                                Document Receipt
                              </button>
                              : "N/A"}

                          </div>
                        </Form.Item>
                      </Col>
                    );
                  case "file":
                    return (
                      <Col span={8}>
                        <Form.Item label={title}>
                          <div className="custom-upload-style">
                            {obj ? <a target="_blank" href={`${obj.fileUrl}`} download>
                              {obj[index]}
                            </a>
                              : "N/A"}
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
          <Loader isLoading={isLoading} />
        </Modal>
      )
    );
  }
}

export default ViewModal;
