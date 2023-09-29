import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Radio,
  Button,
  Icon,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { Button as AccessButton } from "../../styled-components/button";
import DEATH_API from "../../../apis/death.api";
import MODULE_API from "../../../apis/module.api";
import Loader from "../../../components/styled-components/loader/loader";
import { Input } from "../../../components/input/Input";
import { InputGroup } from "../../../components/inputGroup/InputGroup";
import setting from "../../../assets/SVGs/setting.svg";
import Timer from "./Timer";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const { Option } = Select;
const formName = "messageForm";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false,
      showPrivacy: false,
      showTrusted: false,
      showAudio: false,
      showText: false,
      showPlan: false,
      showRefral: false,
      showKnowledge: false,
      DeathStatus: null,
      isLoading: false,
      isModalOpen: false,
      TrusteeStatus: null,
      timer: "",
      ApiTime: "",
      StartTime: "",
      clientName: "",
      trusteeName: "",
      NewRole: "",
      Uploaded: {},
      FileUploaded: "",
      AccessModal: false,
      TooltipModal: false,
      timerState: null,
    };
  }

  componentDidMount() {
    // this.setState({
    //   ApiTime: 28800,
    // });
    // const role =
    //   localStorage.getItem("role") != "undefined" &&
    //   JSON.parse(localStorage.getItem("role"));
    // const ID = localStorage.getItem("accessId");

    // if ((role === "protrustee" || role === "trustee") && ID === null) {
    //   console.log("here to show modal");
    //   this.showAccessModal();
    // }
    // try {
    //   (async () => {
    //     // this.setState({ isLoading: true })
    //     this.props.handleLoader();
    //     const ID = localStorage.getItem("accessId");
    //     const role =
    //       localStorage.getItem("role") != "undefined" &&
    //       JSON.parse(localStorage.getItem("role"));
    //     console.log("role death", role);
    //     const data = await DEATH_API.getDeathStatus(ID);
    //     console.log("data in death status for client", data);
    //     if (data && data.clientStatus) {
    //       this.setState({ DeathStatus: data.clientStatus.deathStatus });
    //       this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
    //       this.setState({ clientName: data.clientName });
    //       this.setState({ trusteeName: data.trusteeName });
    //       this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
    //       this.setState({ timer: data.clientStatus.deathStatusRevertTime });

    //       if (role == "trustee" || role == "protrustee") {
    //         console.log("here in trusteee");
    //         localStorage.setItem(
    //           "role",
    //           JSON.stringify(data.clientStatus.roleName)
    //         );
    //         console.log(
    //           "data.clientStatus.roleName",
    //           data.clientStatus.roleName
    //         );
    //         this.setState({ NewRole: data.clientStatus.roleName });
    //         this.setState({ timer: data.clientStatus.deathStatusRevertTime });
    //       }
    //       if (data.clientStatus.deathStatusDate !== null) {
    //         this.setState({
    //           StartTime: data.clientStatus.deathStatusDate,
    //         });
    //       }
    //       this.setState({
    //         ApiTime: data.clientStatus.deathStatusRevertTime,
    //       });
    //     }

    //     let dataFile = await DEATH_API.getAdvanceHealth(ID);
    //     console.log("dataFile", dataFile);
    //     if (dataFile && dataFile.data) {
    //       this.setState({
    //         FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
    //       });
    //     }

    //     this.props.handleLoader();
    //     // this.setState({ isLoading: false })
    //   })();
    // } catch (error) {
    //   this.props.handleLoader();
    //   console.group(error);
    // }
    this.getClientStatus();
  }
  getClientStatus = async () => {
    const role =
      localStorage.getItem("role") != "undefined" &&
      JSON.parse(localStorage.getItem("role"));
    const ID = localStorage.getItem("accessId");

    if ((role === "protrustee" || role === "trustee") && ID === null) {
      console.log("here to show modal");
      this.showAccessModal();
    }
    try {
      (async () => {
        // this.setState({ isLoading: true })
        this.props.handleLoader();
        const ID = localStorage.getItem("accessId");
        const role =
          localStorage.getItem("role") != "undefined" &&
          JSON.parse(localStorage.getItem("role"));
        console.log("role death", role);
        const data = await DEATH_API.getDeathStatus(ID);
        console.log("data in death status for client", data);
        if (data && data.clientStatus) {
          this.setState({ DeathStatus: data.clientStatus.deathStatus });
          this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
          this.setState({ clientName: data.clientName });
          this.setState({ trusteeName: data.trusteeName });
          this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
          this.setState({ timer: data.clientStatus.deathStatusRevertTime });

          if (role == "trustee" || role == "protrustee") {
            console.log("here in trusteee");
            localStorage.setItem(
              "role",
              JSON.stringify(data.clientStatus.roleName)
            );
            console.log(
              "data.clientStatus.roleName",
              data.clientStatus.roleName
            );
            this.setState({ NewRole: data.clientStatus.roleName });
            this.setState({ timer: data.clientStatus.deathStatusRevertTime });
          }
          if (data.clientStatus.deathStatusDate !== null) {
            this.setState({
              StartTime: data.clientStatus.deathStatusDate,
            });
          }
          this.setState({
            ApiTime: data.clientStatus.deathStatusRevertTime,
          });
        }

        let dataFile = await DEATH_API.getAdvanceHealth(ID);
        console.log("dataFile", dataFile);
        if (dataFile && dataFile.data) {
          this.setState({
            FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
          });
        }

        this.props.handleLoader();
        // this.setState({ isLoading: false })
      })();
    } catch (error) {
      this.props.handleLoader();
      console.group(error);
    }
  };
  showModal = async () => {
    this.setState({
      isModalOpen: true,
    });
  };

  showAccessModal = async () => {
    this.setState({
      AccessModal: true,
    });
  };

  handleAccessCancel = () => {
    this.setState({
      AccessModal: false,
    });
  };

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

  getFile = async () => {
    const ID = localStorage.getItem("accessId");
    this.props.handleLoader();

    let dataFile = await DEATH_API.getAdvanceHealth(ID);
    if (dataFile && dataFile.data) {
      this.setState({
        FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
      });
    }
    this.props.handleLoader();
  };
  handleOk = async () => {
    this.setState({
      isModalOpen: false,
    });

    try {
      this.props.handleLoader();
      const res = await DEATH_API.setRevertTime(this.state.timer);
      console.log("res.....", res);
      this.props.handleLoader();

      // this.props.handleLoader();
      // const data = await DEATH_API.getDeathStatus();
      // console.log("data in death status", data);
      // if (data) {
      //   this.setState({ DeathStatus: data.clientStatus })
      // }
      // this.props.handleLoader();
    } catch (error) {
      console.log(error);
    }
    console.log("timer>>>", this.state.timer);
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  handleRemoveFile = async () => {
    this.props.handleLoader();
    console.log("remove");
    let api_res = await DEATH_API.addAdvanceHealth({
      advanceHealthCareDirectiveDocument: "",
    });
    console.log("res", api_res);
    const ID = localStorage.getItem("accessId");

    let dataFile = await DEATH_API.getAdvanceHealth(ID);
    if (dataFile && dataFile.data) {
      this.setState({
        FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
      });
    }
    this.props.handleLoader();
  };
  handleUploadFile = async (formData) => {
    const ID = localStorage.getItem("accessId");

    this.props.handleLoader();
    const uploaded = await MODULE_API.uploadImage(formData);
    console.log("uploaded", uploaded);
    if (uploaded && uploaded.status === 200) {
      let api_res = await DEATH_API.addAdvanceHealth({
        advanceHealthCareDirectiveDocument: uploaded.file_url,
      });

      let dataFile = await DEATH_API.getAdvanceHealth(ID);
      if (dataFile && dataFile.data) {
        this.setState({
          FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
        });
      }

      this.props.handleLoader();
      swal("Success!", api_res.message, "success");
      console.log("api_res", api_res);
      this.setState({
        Uploaded: uploaded,
      });
    } else {
      this.props.handleLoader();
    }
  };
  onButtonClickHandler = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };
  onButtonClickHandlerPrivacy = () => {
    this.setState({ showPrivacy: !this.state.showPrivacy });
  };
  onButtonClickHandlerTrusted = () => {
    this.setState({ showTrusted: !this.state.showTrusted });
  };
  onButtonClickHandlerAudio = () => {
    this.setState({ showAudio: !this.state.showAudio });
  };
  onButtonClickHandlerText = () => {
    this.setState({ showText: !this.state.showText });
  };
  onButtonClickHandlerPlan = () => {
    this.setState({ showPlan: !this.state.showPlan });
  };
  onButtonClickHandlerRefral = () => {
    this.setState({ showRefral: !this.state.showRefral });
  };
  onButtonClickHandlerKnowledge = () => {
    this.setState({ showKnowledge: !this.state.showKnowledge });
  };

  componentDidUpdate(nextProps, nextState) {
    console.log("Component will be updated soon", nextState.timerState);
    if (nextState.timerState === 0) {
      this.getClientStatus();
      this.setState({ timerState: -1 });
    }
  }

  render() {
    const { role, changeRole } = this.props;
    const userRole =
      localStorage.getItem("role") != "undefined" &&
      JSON.parse(localStorage.getItem("role"));

    // console.log("userRole parse", userRole);
    console.log("role", role);

    return (
      <React.Fragment>
        {/*   {userRole.hasOwnProperty("trustee") || userRole.hasOwnProperty("protrustee")?
          ""
          :
          <Button onClick={changeRole}>
            {role === "ROLE" ? "Viewer" : "Client"}
          </Button>
        }
      
        {role !== "ROLE" ? (
          <Row>
            <Col span={24}>
              <h3
                className="font-weight-bold"
                style={{ color: "#39b54a", marginTop: "30px" }}
              >
                This is what the Viewer will see
              </h3>
            </Col>
          </Row>
        ) : (
          ""
        )}
         */}
        {this.state.DeathStatus === "PARTIAL_DEATH" &&
        userRole != "trustee" &&
        userRole != "protrustee" ? (
          <div className="info-form-block" style={{ marginTop: "30px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <h3 className="text-center font-weight-bold">
                  {this.state.trusteeName && this.state.trusteeName} has
                  activated your If I Die module.
                </h3>
                <h4 className="text-center font-weight-bold">
                  Time Remaining until They have full access:
                </h4>
              </Col>
              <Col span={24}>
                <h4 className="text-center font-weight-bold">
                  {this.state.ApiTime && this.state.StartTime && (
                    <Timer
                      timerState={(time) =>
                        this.setState({
                          timerState: time,
                        })
                      }
                      Time={this.state.ApiTime}
                      startTime={this.state.StartTime}
                    />
                  )}
                </h4>
                <h4 className="text-center font-weight-bold">
                  {this.state.timerState &&
                    this.state.timerState <= 0 &&
                    `Trusted Individuals now have access to your's information.`}
                </h4>
                <div className="text-center">
                  {this.state.timerState && this.state.timerState >= 0 && (
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={() => {
                        var that = this;
                        swal({
                          title: "Are you sure?",
                          text: "Are you sure you want to cancel this?",
                          dangerMode: true,
                          buttons: ["No!", "Yes, cancel it!"],
                          icon: "warning",
                          type: "warning",
                          closeOnConfirm: false,
                          closeOnCancel: false,
                        }).then(async function (isConfirm) {
                          // Redirect the user
                          if (isConfirm) {
                            console.log("inside confirm status");
                            try {
                              that.props.handleLoader();
                              const ID = localStorage.getItem("accessId");
                              let api_res = await DEATH_API.revertDeath(ID);
                              that.props.handleLoader();

                              that.props.handleLoader();

                              const data = await DEATH_API.getDeathStatus(ID);
                              console.log("data in death status", data);
                              if (data && data.clientStatus) {
                                that.setState({
                                  DeathStatus: data.clientStatus.deathStatus,
                                });
                                that.setState({
                                  TrusteeStatus: data.clientStatus.deathStatus,
                                });
                                that.setState({ clientName: data.clientName });
                                that.setState({
                                  trusteeName: data.trusteeName,
                                });
                                if (role == "trustee" || role == "protrustee") {
                                  localStorage.setItem(
                                    "role",
                                    JSON.stringify(data.clientStatus.roleName)
                                  );
                                  console.log(
                                    "data.clientStatus.roleName",
                                    data.clientStatus.roleName
                                  );
                                  that.setState({
                                    NewRole: data.clientStatus.roleName,
                                  });
                                }
                                if (
                                  data.clientStatus.deathStatusDate !== null
                                ) {
                                  that.setState({
                                    StartTime:
                                      data.clientStatus.deathStatusDate,
                                  });
                                }
                                that.setState({
                                  ApiTime:
                                    data.clientStatus.deathStatusRevertTime,
                                });
                              }
                              that.props.handleLoader();

                              // return api_res;
                            } catch (error) {
                              console.log(error);
                              throw new Error(error);
                            }
                            setTimeout(() => {
                              that.props.handleLoader();
                              swal(
                                "Canceled!",
                                "Trusted Individual Access Canceled.",
                                "success"
                              );
                              that.props.handleLoader();
                            }, 0);
                          } else {
                            swal(
                              "Cancelled",
                              "Access will be given to trusted with in specified time :)",
                              "error"
                            );
                          }
                        });
                      }}
                      style={{
                        background: "#39b54a",
                        borderRadius: "16px",
                        padding: "5px",
                        paddingInline: "15px",
                        width: "auto",
                        border: "none",
                      }}
                    >
                      <span className="custom-footer-text">Cancel Timer</span>
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
        {this.state.DeathStatus === "ALIVE" && userRole == "trustee" ? (
          <div className="info-form-block" style={{ marginTop: "30px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <h3 className="text-center font-weight-bold">
                  {this.state.clientName && this.state.clientName} has Passed
                  Away.
                </h3>
                <h4 className="text-center font-weight-bold ">
                  Click This Button to Activate If I Die module:
                </h4>
                {this.state.ApiTime && (
                  <h4 className="text-center font-weight-bold">
                    You Will have access in hours:{" "}
                    {this.state.ApiTime && this.state.ApiTime}
                  </h4>
                )}
              </Col>
              <Col span={24}>
                <h4 className="text-center font-weight-bold mb-4"></h4>
                <div className="text-center">
                  <Button
                    type="primary"
                    size={"large"}
                    // disabled={true}
                    onClick={async () => {
                      var that = this;
                      swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to Activate this?",
                        dangerMode: true,
                        buttons: ["No, don't activate!", "Yes, Activate it!"],
                        icon: "warning",
                        type: "warning",
                        closeOnConfirm: false,
                        closeOnCancel: false,
                      }).then(async function (isConfirm) {
                        // Redirect the user
                        if (isConfirm) {
                          console.log("inside confirm status");
                          try {
                            that.props.handleLoader();
                            const ID = localStorage.getItem("accessId");

                            let api_res = await DEATH_API.confirmDeath(ID);
                            that.props.handleLoader();

                            that.props.handleLoader();
                            const data = await DEATH_API.getDeathStatus(ID);
                            console.log("data in death status", data);
                            if (data && data.clientStatus) {
                              that.setState({
                                DeathStatus: data.clientStatus.deathStatus,
                              });
                              that.setState({
                                TrusteeStatus: data.clientStatus.deathStatus,
                              });
                              that.setState({ clientName: data.clientName });
                              that.setState({ trusteeName: data.trusteeName });
                              if (role == "trustee" || role == "protrustee") {
                                localStorage.setItem(
                                  "role",
                                  JSON.stringify(data.clientStatus.roleName)
                                );
                                console.log(
                                  "data.clientStatus.roleName",
                                  data.clientStatus.roleName
                                );
                                that.setState({
                                  NewRole: data.clientStatus.roleName,
                                });
                              }
                              if (data.clientStatus.deathStatusDate !== null) {
                                that.setState({
                                  StartTime: data.clientStatus.deathStatusDate,
                                });
                              }
                              that.setState({
                                ApiTime:
                                  data.clientStatus.deathStatusRevertTime,
                              });
                            }
                            that.props.handleLoader();
                            // window.location.reload();
                            // return api_res;
                            // console.log("api_res",api_res)
                          } catch (error) {
                            console.log("error");
                            // throw new Error(error);
                          }
                          setTimeout(() => {
                            that.props.handleLoader();
                            swal(
                              "Activated!",
                              "Access will be given to you with in specified time :)",
                              "success"
                            );
                            that.props.handleLoader();
                          }, 0);
                        } else {
                          swal(
                            "Cancelled",
                            " You have No Access to If I Die Module :)",
                            "error"
                          );
                        }
                      });
                    }}
                    style={{
                      background: "#39b54a",
                      borderRadius: "16px",
                      padding: "5px",
                      paddingInline: "15px",
                      width: "auto",
                      border: "none",
                    }}
                  >
                    <span className="custom-footer-text">Activate</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
        {this.state.DeathStatus === "PARTIAL_DEATH" && userRole == "trustee" ? (
          <div className="info-form-block" style={{ marginTop: "30px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <h3 className="text-center font-weight-bold">
                  {this.state.clientName && this.state.clientName} has Passed
                  Away.
                </h3>

                {this.state.ApiTime && (
                  <h4 className="text-center font-weight-bold">
                    You Will have access in hours:{" "}
                    {this.state.ApiTime && this.state.ApiTime}
                  </h4>
                )}
              </Col>
              <Col span={24}>
                  <h4 className="text-center font-weight-bold mb-4">
                    {this.state.ApiTime &&
                      this.state.StartTime &&
                      userRole === "trustee" && (
                        <Timer
                          timerState={(time) =>
                            this.setState({
                              timerState: time,
                            })
                          }
                          Time={this.state.ApiTime}
                          startTime={this.state.StartTime}
                        />
                      )}
                  </h4>
                <h4 className="text-center font-weight-bold mb-4">
                  {" "}
                  {this.state.timerState &&
                    this.state.timerState <= 0 &&
                    `You and the other Trusted Individuals now have access to ${this.state.clientName}'s information.`}
                </h4>
                <div className="text-center">
                  {/* {this.state.timerState} */}
                  {this.state.timerState && this.state.timerState >= 0 && (
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={() => {
                        var that = this;
                        swal({
                          title: "Are you sure?",
                          text: "Are you sure you want to cancel this?",
                          dangerMode: true,
                          buttons: ["No!", "Yes, cancel it!"],
                          icon: "warning",
                          type: "warning",
                          closeOnConfirm: false,
                          closeOnCancel: false,
                        }).then(async function (isConfirm) {
                          // Redirect the user
                          if (isConfirm) {
                            console.log("inside confirm status");
                            try {
                              that.props.handleLoader();
                              const ID = localStorage.getItem("accessId");
                              let api_res = await DEATH_API.revertDeath(ID);
                              that.props.handleLoader();

                              that.props.handleLoader();

                              const data = await DEATH_API.getDeathStatus(ID);
                              console.log("data in death status", data);
                              if (data && data.clientStatus) {
                                that.setState({
                                  DeathStatus: data.clientStatus.deathStatus,
                                });
                                that.setState({
                                  TrusteeStatus: data.clientStatus.deathStatus,
                                });
                                that.setState({ clientName: data.clientName });
                                that.setState({
                                  trusteeName: data.trusteeName,
                                });
                                if (role == "trustee" || role == "protrustee") {
                                  localStorage.setItem(
                                    "role",
                                    JSON.stringify(data.clientStatus.roleName)
                                  );
                                  console.log(
                                    "data.clientStatus.roleName",
                                    data.clientStatus.roleName
                                  );
                                  that.setState({
                                    NewRole: data.clientStatus.roleName,
                                  });
                                }
                                if (
                                  data.clientStatus.deathStatusDate !== null
                                ) {
                                  that.setState({
                                    StartTime:
                                      data.clientStatus.deathStatusDate,
                                  });
                                }
                                that.setState({
                                  ApiTime:
                                    data.clientStatus.deathStatusRevertTime,
                                });
                              }
                              that.props.handleLoader();

                              // return api_res;
                            } catch (error) {
                              console.log(error);
                              throw new Error(error);
                            }
                            setTimeout(() => {
                              that.props.handleLoader();
                              swal(
                                "Canceled!",
                                "Trusted Individual Access Canceled.",
                                "success"
                              );
                              that.props.handleLoader();
                            }, 0);
                          } else {
                            swal(
                              "Cancelled",
                              "Access will be given to trusted with in specified time :)",
                              "error"
                            );
                          }
                        });
                      }}
                      style={{
                        background: "#39b54a",
                        borderRadius: "16px",
                        padding: "5px",
                        paddingInline: "15px",
                        width: "auto",
                        border: "none",
                      }}
                    >
                      <span className="custom-footer-text">
                        Cancel Activation
                      </span>
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {userRole == "trustee" ||
          (userRole == "protrustee" && (
            <Col span={8}>
              <label style={{ marginBottom: "1rem" }}>
                Advance HealthCare Directive
              </label>
              <div className="custom-upload-style">
                {this.state.FileUploaded ? (
                  <a
                    id="file-input"
                    style={{ width: "80%" }}
                    href={this.state.FileUploaded}
                    target="_blank"
                  >
                    Download file
                  </a>
                ) : (
                  "No File Uploaded yet by Client"
                )}
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
          ))}

        {userRole != "trustee" && userRole != "protrustee" && (
          <Col span={8}>
            <label style={{ marginBottom: "1rem" }}>
              Upload Advance HealthCare Directive
            </label>
            <div className="custom-upload-style">
              {this.state.FileUploaded ? (
                <div style={{ width: "90%", display: "flex" }}>
                  <a
                    id="file-input"
                    style={{ width: "80%" }}
                    href={this.state.FileUploaded}
                    target="_blank"
                  >
                    Uploaded file
                  </a>
                  <Button
                    type="primary"
                    style={{
                      background: "#39b54a",
                      // borderRadius: "16px",
                      color: "white",
                      padding: "5px",
                      width: "auto",
                      border: "none",
                    }}
                    onClick={this.handleRemoveFile}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <input
                  id="file-input"
                  type="file"
                  style={{ width: "90%", display: "flex" }}
                  onChange={async (event) => {
                    // console.log("document", event.target.files[0]);
                    console.log("document size", event.target.files[0].size);
                    const fileSize = event.target.files[0].size / (1024 * 1000); // in MB
                    console.log("fileSize in mb", fileSize);
                    const formData = new FormData();
                    formData.append("image", event.target.files[0]);
                    this.handleUploadFile(formData);
                    // const uploaded = await MODULE_API.uploadImage(formData);
                  }}
                  accept="image/jpeg, .pdf, .xlsx, .doc"
                />
              )}

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
        )}
        {/*  {this.state.DeathStatus === "DEATH" && userRole.hasOwnProperty("protrustee") ?
        <div className="info-form-block" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={24} >
              <h2 className="text-center font-weight-bold mb-4">
                This If i Die Module has been activated.
              </h2>
              <h2 className="text-center font-weight-bold mb-4">
                You Will have access in hours {"hours"}:
              </h2>
            </Col>
            <Col span={24} >
              <h4 className="text-center font-weight-bold mb-4">
                Timer is here
              </h4>
              <div className="text-center">
                <Button
                  type="primary"
                  size={"large"}
                  // onClick={async () => {
                  //   var that = this;
                  //   swal({
                  //     title: "Are you sure?",
                  //     text: "Are you sure you want to cancel this?",
                  //     dangerMode: true,
                  //     buttons: ["No!", "Yes, cancel it!"],
                  //     icon: "warning",
                  //     type: "warning",
                  //     closeOnConfirm: false,
                  //     closeOnCancel: false,
                  //   }).then(async function (isConfirm) {
                  //     // Redirect the user
                  //     if (isConfirm) {
                  //       console.log("inside confirm status");
                  //       try {
                  //         that.props.handleLoader();
                  //         let api_res = await DEATH_API.confirmDeath();
                  //         that.props.handleLoader();
                  //         // return api_res;
                  //       } catch (error) {
                  //         console.log(error);
                  //         throw new Error(error);
                  //       }
                  //       setTimeout(() => {
                  //         that.props.handleLoader()
                  //         swal("Deleted!", "Access will be given to you with in specified time :)", "success");
                  //         that.props.handleLoader()
                  //       }, 0)
                  //     } else {
                  //       swal("Cancelled", " You have No Access to If I Die Module :)", "error");
                  //     }
                  //   });

                  // }}
                  style={{
                    background: "#39b54a",
                    borderRadius: "16px",
                    padding: "5px",
                    width: "auto",
                    border: "none",
                  }}
                >
                  <span className="custom-footer-text">Cancel Activation</span>
                </Button>
              </div>
            </Col>

          </Row>
        </div>
        : ""
      }  */}

        <React.Fragment>
          {/* <div style={{
            marginTop: '40px'
          }}></div>
           <BreadCrumb /> */}
          <div className="top-btns-container">
            {/* <Button
            type='primary'
            onClick={() => this.props.history.push('/death/create')}
          >
            Add Death
          </Button>*/}

            <div>
              {/*
              {this.state.DeathStatus === "PARTIAL_DEATH" && !userRole.hasOwnProperty("trustee") ?
                <React.Fragment>
                  <Button
                    type='primary'
                    onClick={() => {
                      console.log("Api hit....i'm dead");
                      // this.props.history.push('/death/create')
                      // try {
                      //   this.props.handleLoader()
                      //   let api_res = await DEATH_API.revertDeath();
                      //   this.props.handleLoader()

                      //   this.props.handleLoader()
                      //   const data = await DEATH_API.getDeathStatus();
                      //   console.log("data in death status", data);
                      //   if (data) {
                      //     this.setState({ DeathStatus: data.clientStatus })
                      //   }
                      //   this.props.handleLoader()

                      //   return api_res;
                      // } catch (error) {
                      //   console.log(error);
                      //   throw new Error(error);
                      // }

                      var that = this;
                      swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to cancel this?",
                        dangerMode: true,
                        buttons: ["No!", "Yes, cancel it!"],
                        icon: "warning",
                        type: "warning",
                        closeOnConfirm: false,
                        closeOnCancel: false,
                      }).then(async function (isConfirm) {
                        // Redirect the user
                        if (isConfirm) {
                          console.log("inside confirm status");
                          try {
                            that.props.handleLoader()
                            let api_res = await DEATH_API.revertDeath();
                            that.props.handleLoader()

                            that.props.handleLoader()
                            const data = await DEATH_API.getDeathStatus();
                            console.log("data in death status", data);
                            if (data) {
                              that.setState({ DeathStatus: data.clientStatus })
                            }
                            that.props.handleLoader()

                            // return api_res;
                          } catch (error) {
                            console.log(error);
                            throw new Error(error);
                          }
                          setTimeout(() => {
                            that.props.handleLoader()
                            swal("Deleted!", "Trusted Individual Access Canceled.", "success");
                            that.props.handleLoader()
                          }, 0)
                        } else {
                          swal("Cancelled", "Access is given to trusted with in specified time :)", "error");
                        }
                      });


                    }}
                  >
                    Revert
                  </Button>
                </React.Fragment>
                : ""
              }

            */}
            </div>

            <div>
              {userRole !== "trustee" && userRole !== "protrustee" ? (
                <React.Fragment>
                  <div>
                    <button
                      className="setting"
                      // type='primary'
                      onClick={async () => {
                        this.showModal();
                      }}
                    >
                      <img
                        style={{ marginBottom: "5px" }}
                        src={setting}
                        height={25}
                        width={25}
                      ></img>
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
            {/*
            {this.state.DeathStatus === "ALIVE" && userRole.hasOwnProperty("trustee") ?

              <div>
                <Button
                  type='primary'
                  onClick={async () => {
                    // this.props.history.push('/death/create')
                    var that = this;
                    swal({
                      title: "Are you sure?",
                      text: "Are you sure you want to cancel this?",
                      dangerMode: true,
                      buttons: ["No!", "Yes, cancel it!"],
                      icon: "warning",
                      type: "warning",
                      closeOnConfirm: false,
                      closeOnCancel: false,
                    }).then(async function (isConfirm) {
                      // Redirect the user
                      if (isConfirm) {
                        console.log("inside confirm status");
                        try {
                          that.props.handleLoader();
                          let api_res = await DEATH_API.confirmDeath();
                          that.props.handleLoader();
                          // return api_res;
                        } catch (error) {
                          console.log(error);
                          throw new Error(error);
                        }
                        setTimeout(() => {
                          that.props.handleLoader()
                          swal("Deleted!", "Access will be given to you with in specified time :)", "success");
                          that.props.handleLoader()
                        }, 0)
                      } else {
                        swal("Cancelled", " You have No Access to If I Die Module :)", "error");
                      }
                    });

                    // try {
                    //   this.props.handleLoader();
                    //   let api_res = await DEATH_API.confirmDeath();
                    //   this.props.handleLoader();
                    //   return api_res;
                    // } catch (error) {
                    //   console.log(error);
                    //   throw new Error(error);
                    // }
                  }}
                >
                  I'm Dead
                </Button>
              </div>
              : ""
            }
*/}
          </div>

          <div className="info-form-block" style={{ marginTop: "10px" }}>
            <Row gutter={16}>
              <Col span={24}>
                <h2 className="text-center font-weight-bold mb-4">
                  Asset Planet Message
                  {/*<Tooltip placement="topLeft" color={"red"} style={{color:"red"}} trigger="click" title={"hello"}>*/}
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
                  {/* </Tooltip>*/}
                </h2>
              </Col>
              <Col span={24} className="text-justify">
                <h4 className=" mb-4">
                  This program was created for people just like yourself because
                  you are someone who takes action and prepares. We understand
                  the topic of death or disability is not pleasant. Still, the
                  discipline and care you put into this plan will help reduce
                  the pain of others you care about while also creating a
                  positive legacy for yourself.
                </h4>
              </Col>
              <Col span={24} className="text-justify">
                <h4 className=" mb-4">
                  Asset Planet programs such as this "If I Die" module were
                  created by wealth managers with decades of experience helping
                  many individuals and families navigate the process of death or
                  medical emergencies. As humans, we don’t get a warning when
                  bad news is coming, so the best we can do is prepare, and this
                  program does that and much more. We have put details into this
                  process to help address each person's concerns and customize
                  their needs.
                </h4>
              </Col>
              <Col span={24} className="text-justify">
                <h4 className=" mb-4">
                  Creating a video message for someone you care about if you die
                  is an emotionally complex process. So is trusting someone with
                  access to your personal files or preparing written messages
                  for friends and co-workers. By completing your checklist and
                  paying attention to the details, you will have accomplished a
                  tremendous task that most people struggle with: the ability to
                  write and articulate a plan to benefit others.
                </h4>
              </Col>
              <Col span={24} className="text-justify">
                <h4 className=" mb-4">
                  Click here to see the landing message page for those you
                  identified as your inner circle: "Trusted Individual." They
                  will see this first when they activate the plan from any
                  web-interface device. This website is best viewed on larger
                  devices other than phones.
                </h4>
              </Col>
              <Col span={24} className="text-justify">
                <h4 className="mb-4">
                  A question often asked is, "How do we make the process easy
                  for those who are not technology savvy?" After a Trusted
                  Individual logs in, they cannot break or damage anything. They
                  don’t have to worry about making mistakes. They are already
                  stressed enough, so our company's mission is to lower that
                  angst and bring comfort to them through a linear and
                  straightforward process. Once the plan is triggered, our
                  internal mechanism will convert certain items to "view only"
                  status. The exceptions are the checklist and notes fields,
                  which allow everyone to see progress and share in that
                  knowledge. Also, your Trusted Individual will be able to
                  upload any important documents so all your trusted people can
                  view and share them.
                  <div style={{ fontWeight: "bolder", fontSize: "18px" }}>
                    {" "}
                    Each page has a help section. Here are some FAQs.{" "}
                  </div>
                </h4>
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandler}
                >
                  Cost for Disaster Module
                </div>
                {this.state.showMessage && (
                  <h4 className=" mb-4">
                    There is a one-time setup and initiation fee, and this price
                    will vary based on promotions at the time of sign-up. After
                    the first year, there is a yearly maintenance fee. Click
                    here for your account features and payment levels. Upon your
                    death or disability, one of your designated Trusted
                    Individuals activates the process to begin. At this
                    activation point, your credit card on file will be charged a
                    one-time fee of $149, which pays for every one of your
                    Trusted Individuals to gain access to the plan. This
                    one-time cost pays for all the emails and other server costs
                    that will go into sending out video messages and other
                    support. There is only one upgrade available, which is
                    access to fast email support with a target of 4 hours or
                    less, depending upon the host country and normal business
                    hours of operation. Priority email support is another $99
                    and includes access for all your Trusted Individuals. The
                    normal email support time is 24 hours. This initial fee and
                    annual maintenance fee also include access to the entire
                    Disaster module from Asset Planet. Our users also get access
                    to our applications for Assets, Liabilities, Income and much
                    more. Asset Planet is actively developing software for
                    Helping Everyone, Everywhere Who Earns An Income, Pays a
                    Bill, Or Dreams Of A Better Tomorrow™. You should receive
                    special promotions for any new services we add once you are
                    an existing client of Asset Planet.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerPrivacy}
                >
                  Privacy
                </div>
                {this.state.showPrivacy && (
                  <h4 className=" mb-4">
                    Your information is stored on a secure server with limited
                    access by employees and contractors of Asset Planet. Click
                    here for complete details of our privacy policy. Protecting
                    access by people on your contact list or those whom you have
                    designated as Trusted Individual is accomplished in multiple
                    ways. People on your contact list are there for the purposes
                    of e-mailing and connecting in the event of your demise or
                    serious disability. The contact list is also a simple tool
                    for those who want to gain access to others in your personal
                    universe. A Trusted Individual is different than an ordinary
                    contact because you have empowered them with different
                    levels of access to your plan. In your setup process for
                    Trusted Individual, you can designate access to various plan
                    modules. You may want your Spouse/Partner to have access at
                    any time, but your best friend will only have access once
                    the plan is triggered. You may want a child or other Trusted
                    Individual to now have access to your Assets module to
                    protect the knowledge of your wealth. There are a variety of
                    scenarios where privacy is paramount, and Asset Planet
                    provides the ultimate experience for users and their needs.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerTrusted}
                >
                  Contacts and Trusted Individual(s)
                </div>
                {this.state.showTrusted && (
                  <h4 className=" mb-4">
                    Contacts are people on your email and phone list that you
                    want notified in case something happens to you. Contacts do
                    not have access to your plan. A Trusted Individual is a
                    contact that has been elevated by a user to have access to
                    the plan. As the User, you have control over which modules
                    can be viewed by each person you deem a Trusted Individual.
                    Once you identify those you deem a Trusted Individual, those
                    people will be given a special link to your plan and method
                    to activate it should they be the first to know about your
                    death or disability. Think of Trusted People as your team
                    that you want to fulfill your wishes and help make the
                    process easier from a collaborative viewpoint. You can add
                    or remove Trusted People easily from the Contact list, and
                    you can add or remove permissions for Trusted People using
                    the same Contact list.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerAudio}
                >
                  Audio Video Messages
                </div>
                {this.state.showAudio && (
                  <h4 className=" mb-4">
                    Each user has the ability to custom craft an audio or video
                    message that will be sent via email or text to your
                    distribution lists assigned. As a plan creator, you might
                    want to have a different message for each group or
                    individual contact. For example, a message to your
                    co-workers might be different than the one you leave your
                    friends, and they may also be different for family and loved
                    ones. You may choose a third-party provider like Cameo and
                    hire a celebrity to deliver your message to a specific
                    group. These messages can be changed anytime a user wants,
                    but they cannot be altered once a plan is activated due to
                    death or disability by a Trusted Individual. This failsafe
                    ensures that the wishes of our users are fulfilled and not
                    altered. From the family at Asset Planet, we realize this
                    process can be very emotional, and we honor you for taking
                    these steps to bring solace and comfort to those you care
                    about.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerText}
                >
                  Text and E-mails
                </div>
                {this.state.showText && (
                  <h4 className=" mb-4">
                    The contact list is where the program will pull from when
                    sending out emails or texts, so the user needs to verify
                    that these contacts are kept updated. A future feature will
                    be the ability to access your preferred address books, and
                    then the user can manually choose which contacts to
                    import/link. Once a plan is activated, our program will
                    generate a list of those who have been notified and in what
                    manner, and you can track if e-mails were opened or not.
                    This extra reporting process will help your Trusted People
                    identify those who might also need a phone call or more
                    personal contact to ensure they receive the notifications.
                    Your Trusted People cannot alter your email messages that
                    you created, as they are locked once the plan is activated.
                    The only modifications allowed by your Trusted People are
                    the inclusion of details about what happened to you and the
                    location of funeral services.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerPlan}
                >
                  Once Plan is Activated
                </div>
                {this.state.showPlan && (
                  <h4 className=" mb-4">
                    A Trusted Individual is given the ability to activate the
                    plan, which in turn will notify everybody on your contact
                    list you deem eligible for email and text alerts. At Asset
                    Planet, we consider being named a Trusted Individual a great
                    honor and responsibility, so we think users should carefully
                    choose who you empower with this ability. Maybe it's not
                    best to choose a friend with a warped sense of humor who
                    might think it a funny prank to announce you died. Our
                    programmers thought about this possibility and have included
                    a special delay that will first alert our user that a plan
                    has been activated, allowing them time to stop the process
                    if it is a false alarm. By default, the delay is set for 8
                    hours, at which time the user will get an email and text
                    notifying them of activation and the time to override. {" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerRefral}
                >
                  Referral Program
                </div>
                {this.state.showRefral && (
                  <h4 className=" mb-4">
                    Asset Planet may have opportunities for our users to earn
                    free credits and other benefits by referring people you
                    know. Click here for current promotions and to view your
                    track record.{" "}
                  </h4>
                )}
              </Col>
              <Col span={24} className="text-justify">
                <div
                  className="CollapsableHeading"
                  onClick={this.onButtonClickHandlerKnowledge}
                >
                  Knowledgebase and Blog
                </div>
                {this.state.showKnowledge && (
                  <h4 className=" mb-4">
                    Click here to learn more about how you can use our programs
                    to help yourself and your loved ones. Click here for other
                    Asset Planet programs for Helping Everyone, Everywhere Who
                    Earns An Income, Pays a Bill, Or Dreams Of A Better Tomorrow
                    ™.
                  </h4>
                )}
              </Col>
            </Row>
          </div>

          <Modal
            title={
              <span style={{ textAlign: "center", display: "block" }}>
                Delegate Access Modal
              </span>
            }
            visible={this.state.AccessModal}
            footer={null}
            closable={false}
          >
            <div style={{}}>
              {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
              <div className="">
                <h2 className="otp-heading">
                  Please Select Client before Accessing this Module
                </h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Link to="/delgateAccess">
                    <AccessButton style={{ width: "auto" }}>
                      Go to Delegate Access
                    </AccessButton>
                  </Link>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            title={
              <span style={{ textAlign: "center", display: "block" }}>
                Asset Planet Message
              </span>
            }
            visible={this.state.TooltipModal}
            footer={null}
            onCancel={this.handleTooltipCancel}
          >
            <div style={{}}>
              <div className="">
                <h2 className="otp-heading">
                  How can a landing page be a feature? When you base it on
                  empathy and understanding that people might be going through
                  one of the most traumatic experiences of their lives and how
                  the first words they read convey – “It will be OK, there is a
                  process in place, and you have been taken care of - here are
                  the next steps.”
                </h2>
              </div>
            </div>
          </Modal>

          <Modal
            title={"Settings"}
            visible={this.state.isModalOpen}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{}}>
              {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
              <div className="">
                <h2 className="otp-heading">
                  {" "}
                  This module allows a Trusted Individual to gain access to your
                  information in the event of your death...but only if you have
                  died! If your Trusted Individual logs in and clicks the "
                  {localStorage.getItem("User")
                    ? localStorage.getItem("User")
                    : ""}{" "}
                  has died, start process" button, a timer will start allowing
                  you to stop the process. You can select the duration of that
                  timer here.
                </h2>
                <div>
                  <InputGroup>
                    <label>
                      Set Timer for Trusted Individual for full access:
                    </label>
                    <Select
                      showSearch
                      placeholder="-Select-"
                      defaultValue={this.state.timer}
                      onChange={(value) => {
                        this.setState({
                          timer: value,
                        });
                      }}
                    >
                      <Option value="4">4 hours</Option>
                      <Option value="8">8 hours</Option>
                      <Option value="12">12 hours</Option>
                      <Option value="24">24 hours</Option>
                    </Select>
                  </InputGroup>
                </div>
              </div>
            </div>
          </Modal>
        </React.Fragment>

        <div className="row justify-content-between">
          <div className="col-8"></div>
          <div className="col-4 d-flex justify-content-end">
            {userRole === "trustee" ? (
              ""
            ) : (
              <Button
                type="primary"
                size={"large"}
                onClick={() => {
                  console.log("FORM DATA ", this.props.checklistObject);
                  this.props.nextForm();
                }}
                style={{ background: "#39b54a", width: "30%" }}
              >
                {/* <Icon type="left" /> */}
                <span className="custom-footer-text">Next</span>
              </Button>
            )}

            {/* <Button
              type="primary"
              size={"large"}
              onClick={() => {
                console.log("FORM DATA ", this.props.checklistObject);
                this.props.nextForm();
              }}
            >
              Next
              <Icon type="right" />
            </Button> */}
          </div>
        </div>
        {/*  <Loader isLoading={this.state.isLoading}></Loader> */}
      </React.Fragment>
    );
  }
}

export default MessageForm;
