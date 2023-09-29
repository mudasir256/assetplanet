import React, { useEffect, useState } from "react";
import * as Style from "./styledComponents/StartMessage";
import ExecutorTrusteeStart from "../assets/images/DeathModuleNew/People-2.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import setting from "../assets/SVGs/setting.svg";
import { Modal, Select, Col } from "antd";
import { Messages, HiddenMessages } from "./MessageConstant";
import DEATH_API from "../apis/death.api";
import MODULE_API from "../apis/module.api";
import Timer from "./Timer";
import { Link } from "react-router-dom";
import { Row } from "antd";
import swal from "sweetalert";
const { Option } = Select;

export const StartMessage = (props) => {
  const [hiddenMessage, setHiddenMessage] = useState(HiddenMessages);
  const [clientStatus, setClientStatus] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [apiTime, setApiTime] = useState("");
  const [newRole, setNewRole] = useState("");
  const [timer, setTimer] = useState("");
  const [timerState, setTimerState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessModal, setaccessModal] = useState(false);
  const [uploaded, setUploaded] = useState({});
  const [show, setShow] = useState(false);
  console.log("props in messages", props.role);
  const filesList = [
    { id: 1, fileName: "file name234567890-" },
    { id: 2, fileName: "file name234567891-" },
    { id: 3, fileName: "file name234567892-" },
  ];
  const handleClick = (id) => {
    console.log("id", id);
    hiddenMessage.map((item) => {
      if (item.id === id) {
        if (item.show === true) {
          item.show = false;
        } else {
          item.show = true;
        }
        setShow(!show);
      }
    });
    setHiddenMessage(hiddenMessage);
    console.log("hiddenMessage", hiddenMessage);
  };

  useEffect(() => {
    getClientStatus();
  }, []);

  const getClientStatus = async () => {
    const ID = localStorage.getItem("accessId");

    if (
      (props.role === "protrustee" || props.role === "trustee") &&
      ID === null
    ) {
      console.log("here to show modal");
      showAccessModal();
    }
    try {
      (async () => {
        // this.setState({ isLoading: true })
        // this.props.handleLoader();
        const ID = localStorage.getItem("accessId");
        const role =
          localStorage.getItem("role") != "undefined" &&
          JSON.parse(localStorage.getItem("role"));
        console.log("role death", role);
        const data = await DEATH_API.getDeathStatus(ID);
        console.log("data in death status for client", data);
        if (data && data.clientStatus) {
          console.log("data setting", data);
          setClientStatus(data);
          setTimer(data.clientStatus.deathStatusRevertTime);
          // this.setState({ DeathStatus: data.clientStatus.deathStatus });
          // this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
          // this.setState({ clientName: data.clientName });
          // this.setState({ trusteeName: data.trusteeName });
          // this.setState({ TrusteeStatus: data.clientStatus.deathStatus });
          // this.setState({ timer: data.clientStatus.deathStatusRevertTime });

          if (props.role == "trustee" || props.role == "protrustee") {
            console.log("here in trusteee");
            localStorage.setItem(
              "role",
              JSON.stringify(data.clientStatus.roleName)
            );
            console.log(
              "data.clientStatus.roleName",
              data.clientStatus.roleName
            );
            setTimer(data.clientStatus.deathStatusRevertTime);
            setNewRole(data.clientStatus.roleName);
            // this.setState({ NewRole: data.clientStatus.roleName });
            // this.setState({ timer: data.clientStatus.deathStatusRevertTime });
          }
          if (data.clientStatus.deathStatusDate !== null) {
            setStartTime(data.clientStatus.deathStatusDate);
            // this.setState({
            //   StartTime: data.clientStatus.deathStatusDate,
            // });
          }
          setApiTime(data.clientStatus.deathStatusRevertTime);
          // this.setState({
          //   ApiTime: data.clientStatus.deathStatusRevertTime,
          // });
        }

        let dataFile = await DEATH_API.getAdvanceHealth(ID);
        console.log("dataFile", dataFile);
        if (dataFile && dataFile.data) {
          setFileUpload(dataFile.data.advanceHealthCareDirectiveDocument);
          // this.setState({
          //   FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
          // });
        }

        // this.props.handleLoader();
        // this.setState({ isLoading: false })
      })();
    } catch (error) {
      // this.props.handleLoader();
      console.group(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    // this.setState({
    //   isModalOpen: true,
    // });
  };

  const showAccessModal = () => {
    setaccessModal(true);
    // this.setState({
    //   AccessModal: true,
    // });
  };

  const handleAccessCancel = () => {
    setaccessModal(false);
    // this.setState({
    //   AccessModal: false,
    // });
  };


  const getFile = async () => {
    const ID = localStorage.getItem("accessId");
    // this.props.handleLoader();

    let dataFile = await DEATH_API.getAdvanceHealth(ID);
    if (dataFile && dataFile.data) {
      setFileUpload(dataFile.data.advanceHealthCareDirectiveDocument);
      // this.setState({
      //   FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
      // });
    }
    // this.props.handleLoader();
  };
  const activateDeath = async () => {
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
          // that.props.handleLoader();
          const ID = localStorage.getItem("accessId");

          let api_res = await DEATH_API.confirmDeath(ID);
          // that.props.handleLoader();

          // that.props.handleLoader();
          const data = await DEATH_API.getDeathStatus(ID);
          console.log("data in death status", data);
          if (data && data.clientStatus) {
            setClientStatus(data);
            // that.setState({
            //   DeathStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({
            //   TrusteeStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({ clientName: data.clientName });
            // that.setState({ trusteeName: data.trusteeName });
            if (props.role == "trustee" || props.role == "protrustee") {
              localStorage.setItem(
                "role",
                JSON.stringify(data.clientStatus.roleName)
              );
              console.log(
                "data.clientStatus.roleName",
                data.clientStatus.roleName
              );
              setNewRole(data.clientStatus.roleName);
              // that.setState({
              //   NewRole: data.clientStatus.roleName,
              // });
            }
            if (data.clientStatus.deathStatusDate !== null) {
              setStartTime(data.clientStatus.deathStatusDate);
              // that.setState({
              //   StartTime: data.clientStatus.deathStatusDate,
              // });
            }
            setApiTime(data.clientStatus.deathStatusRevertTime);
            // that.setState({
            //   ApiTime:
            //     data.clientStatus.deathStatusRevertTime,
            // });
          }
          // that.props.handleLoader();
          // window.location.reload();
          // return api_res;
          // console.log("api_res",api_res)
        } catch (error) {
          console.log("error");
          // throw new Error(error);
        }
        setTimeout(() => {
          // that.props.handleLoader();
          swal(
            "Activated!",
            "Access will be given to you with in specified time :)",
            "success"
          );
          // that.props.handleLoader();
        }, 0);
      } else {
        swal("Cancelled", " You have No Access to If I Die Module :)", "error");
      }
    });
  };
  const cancelDeathClient = async () => {
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
          // that.props.handleLoader();
          const ID = localStorage.getItem("accessId");
          let api_res = await DEATH_API.revertDeath(ID);
          // that.props.handleLoader();

          // that.props.handleLoader();

          const data = await DEATH_API.getDeathStatus(ID);
          console.log("data in death status", data);
          if (data && data.clientStatus) {
            setClientStatus(data);

            // that.setState({
            //   DeathStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({
            //   TrusteeStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({ clientName: data.clientName });
            // that.setState({
            //   trusteeName: data.trusteeName,
            // });
            if (props.role == "trustee" || props.role == "protrustee") {
              localStorage.setItem(
                "role",
                JSON.stringify(data.clientStatus.roleName)
              );
              console.log(
                "data.clientStatus.roleName",
                data.clientStatus.roleName
              );
              setNewRole(data.clientStatus.roleName);
              // that.setState({
              //   NewRole: data.clientStatus.roleName,
              // });
            }
            if (data.clientStatus.deathStatusDate !== null) {
              setStartTime(data.clientStatus.deathStatusDate);
              // that.setState({
              //   StartTime:
              //     data.clientStatus.deathStatusDate,
              // });
            }
            setApiTime(data.clientStatus.deathStatusRevertTime);
            // that.setState({
            //   ApiTime:
            //     data.clientStatus.deathStatusRevertTime,
            // });
          }
          // that.props.handleLoader();

          // return api_res;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
        setTimeout(() => {
          // that.props.handleLoader();
          swal("Canceled!", "Trusted Individual Access Canceled.", "success");
          // that.props.handleLoader();
        }, 0);
      } else {
        swal(
          "Cancelled",
          "Access will be given to trusted with in specified time :)",
          "error"
        );
      }
    });
  };
  const cancelDeathtrustee = async () => {
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
          // that.props.handleLoader();
          const ID = localStorage.getItem("accessId");
          let api_res = await DEATH_API.revertDeath(ID);
          // that.props.handleLoader();

          // that.props.handleLoader();

          const data = await DEATH_API.getDeathStatus(ID);
          console.log("data in death status", data);
          if (data && data.clientStatus) {
            setClientStatus(data);
            // that.setState({
            //   DeathStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({
            //   TrusteeStatus: data.clientStatus.deathStatus,
            // });
            // that.setState({ clientName: data.clientName });
            // that.setState({
            //   trusteeName: data.trusteeName,
            // });
            if (props.role == "trustee" || props.role == "protrustee") {
              localStorage.setItem(
                "role",
                JSON.stringify(data.clientStatus.roleName)
              );
              console.log(
                "data.clientStatus.roleName",
                data.clientStatus.roleName
              );
              setNewRole(data.clientStatus.roleName);
              // that.setState({
              //   NewRole: data.clientStatus.roleName,
              // });
            }
            if (data.clientStatus.deathStatusDate !== null) {
              setStartTime(data.clientStatus.deathStatusDate);
              // that.setState({
              //   StartTime:
              //     data.clientStatus.deathStatusDate,
              // });
            }
            setApiTime(data.clientStatus.deathStatusRevertTime);
            // that.setState({
            //   ApiTime:
            //     data.clientStatus.deathStatusRevertTime,
            // });
          }
          // that.props.handleLoader();

          // return api_res;
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
        setTimeout(() => {
          // that.props.handleLoader();
          swal("Canceled!", "Trusted Individual Access Canceled.", "success");
          // that.props.handleLoader();
        }, 0);
      } else {
        swal(
          "Cancelled",
          "Access will be given to trusted with in specified time :)",
          "error"
        );
      }
    });
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    // this.setState({
    //   isModalOpen: false,
    // });

    try {
      // this.props.handleLoader();
      const res = await DEATH_API.setRevertTime(timer);
      console.log("res.....", res);
      // this.props.handleLoader();

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
    console.log("timer>>>", timer);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    // this.setState({
    //   isModalOpen: false,
    // });
  };
  const handleRemoveFile = async () => {
    // this.props.handleLoader();
    console.log("remove");
    let api_res = await DEATH_API.addAdvanceHealth({
      advanceHealthCareDirectiveDocument: "",
    });
    console.log("res", api_res);
    const ID = localStorage.getItem("accessId");

    let dataFile = await DEATH_API.getAdvanceHealth(ID);
    if (dataFile && dataFile.data) {
      setFileUpload(dataFile.data.advanceHealthCareDirectiveDocument);
      // this.setState({
      //   FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
      // });
    }
    // this.props.handleLoader();
  };
  const handleUploadFile = async (formData) => {
    const ID = localStorage.getItem("accessId");

    // this.props.handleLoader();
    const uploaded = await MODULE_API.uploadImage(formData);
    console.log("uploaded", uploaded);
    if (uploaded && uploaded.status === 200) {
      let api_res = await DEATH_API.addAdvanceHealth({
        advanceHealthCareDirectiveDocument: uploaded.file_url,
      });

      let dataFile = await DEATH_API.getAdvanceHealth(ID);
      if (dataFile && dataFile.data) {
        setFileUpload(dataFile.data.advanceHealthCareDirectiveDocument);
        // this.setState({
        //   FileUploaded: dataFile.data.advanceHealthCareDirectiveDocument,
        // });
      }

      // this.props.handleLoader();
      // swal("Success!", api_res.message, "success");
      console.log("api_res", api_res);
      setUploaded(uploaded);
      // this.setState({
      //   Uploaded: uploaded,
      // });
    } else {
      // this.props.handleLoader();
    }
  };

  return (
    <div>
      <Style.MainHeading>
        <Style.HeaderImg
          src={ExecutorTrusteeStart}
          alt="ExecutorTrusteeStart"
        ></Style.HeaderImg>
        Executer/Trustee Start Here
      </Style.MainHeading>

      {/* trustee and protrustee work in for client death status*/}

      <div>
      {props.role !== "trustee" && props.role !== "protrustee" ? (
        <React.Fragment>
          <div style={{display:"flex",justifyContent:"end"}}>
            <button
              className="setting"
              // type='primary'
              onClick={async () => {
                showModal();
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
      <Modal
      title={
        <span style={{ textAlign: "center", display: "block" }}>
          Delegate Access Modal
        </span>
      }
      visible={accessModal}
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
              <Style.SaveButton >
                Go to Delegate Access
              </Style.SaveButton>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
    <Modal
      // title={"Settings"}
      visible={isModalOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
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
            <div>
              <label>
                Set Timer for Trusted Individual for full access:
              </label>
              <Select
                showSearch
                placeholder="-Select-"
                defaultValue={timer}
                onChange={(value) => {
                  setTimer(value)
                  // this.setState({
                  //   timer: value,
                  // });
                }}
              >
                <Option value="4">4 hours</Option>
                <Option value="8">8 hours</Option>
                <Option value="12">12 hours</Option>
                <Option value="24">24 hours</Option>
              </Select>
            </div>
          </div>
        </div>
        <Style.WrapperButtons>
        <Style.CancelButton
          id="stop"
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </Style.CancelButton>
        <Style.SaveButton id="stop" onClick={handleOk}>
          Save
        </Style.SaveButton>
      </Style.WrapperButtons>
      </div>
    </Modal>
      {clientStatus &&
      clientStatus.clientStatus.deathStatus === "PARTIAL_DEATH" &&
      props.role != "trustee" &&
      props.role != "protrustee" ? (
        <div className="info-form-block" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <h3 className="text-center font-weight-bold">
                {clientStatus.trusteeName && clientStatus.trusteeName} has
                activated your If I Die module.
              </h3>
              <h4 className="text-center font-weight-bold">
                Time Remaining until They have full access:
              </h4>
            </Col>
            <Col span={24}>
              <h4 className="text-center font-weight-bold">
                {apiTime && startTime && (
                  <Timer
                    timerState={
                      (time) => setTimerState(time)
                      // this.setState({
                      //   timerState: time,
                      // })
                    }
                    Time={apiTime}
                    startTime={startTime}
                  />
                )}
              </h4>
              <h4 className="text-center font-weight-bold">
                {timerState &&
                  timerState <= 0 &&
                  `Trusted Individuals now have access to your's information.`}
              </h4>
              <div
                className="text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {timerState && timerState >= 0 && (
                  <Style.SaveButton
                    onClick={() => {
                      cancelDeathClient();
                    }}
                  >
                    <span className="custom-footer-text">Cancel Timer</span>
                  </Style.SaveButton>
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {clientStatus &&
      clientStatus.clientStatus.deathStatus === "ALIVE" &&
      props.role == "trustee" ? (
        <div className="info-form-block" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <h3 className="text-center font-weight-bold">
                {clientStatus.clientName && clientStatus.clientName} has Passed
                Away.
              </h3>
              <h4 className="text-center font-weight-bold ">
                Click This Button to Activate If I Die module:
              </h4>
              {apiTime && (
                <h4 className="text-center font-weight-bold">
                  You Will have access in hours: {apiTime && apiTime}
                </h4>
              )}
            </Col>
            <Col span={24}>
              <h4 className="text-center font-weight-bold mb-4"></h4>
              <div
                className="text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Style.SaveButton
                  // disabled={true}
                  onClick={async () => {
                    activateDeath();
                  }}
                >
                  <span className="custom-footer-text">Activate</span>
                </Style.SaveButton>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      {clientStatus &&
      clientStatus.clientStatus.deathStatus === "PARTIAL_DEATH" &&
      props.role == "trustee" ? (
        <div className="info-form-block" style={{ marginTop: "30px" }}>
          <Row gutter={16}>
            <Col span={24}>
              <h3 className="text-center font-weight-bold">
                {clientStatus.clientName && clientStatus.clientName} has Passed
                Away.
              </h3>

              {apiTime && (
                <h4 className="text-center font-weight-bold">
                  You Will have access in hours: {apiTime && apiTime}
                </h4>
              )}
            </Col>
            <Col span={24}>
              <h4 className="text-center font-weight-bold mb-4">
                {apiTime && startTime && props.role === "trustee" && (
                  <Timer
                    timerState={
                      (time) => setTimerState(time)
                      // this.setState({
                      //   timerState: time,
                      // })
                    }
                    Time={apiTime}
                    startTime={startTime}
                  />
                )}
              </h4>
              <h4 className="text-center font-weight-bold mb-4">
                {" "}
                {timerState &&
                  timerState <= 0 &&
                  `You and the other Trusted Individuals now have access to ${this.state.clientName}'s information.`}
              </h4>
              <div
                className="text-center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* {this.state.timerState} */}
                {timerState && timerState >= 0 && (
                  <Style.SaveButton
                    onClick={() => {
                      // var that = this;
                      cancelDeathtrustee();
                    }}
                  >
                    <span className="custom-footer-text">
                      Cancel Activation
                    </span>
                  </Style.SaveButton>
                )}
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <React.Fragment></React.Fragment>
      )}

      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>
            Upload Advance HealthCare Directives
          </Style.Title>
          <div>
            <input
              type="file"
              id="upload"
              hidden
              onChange={async (event) => {
                console.log("document size", event.target.files[0].size);
                const fileSize = event.target.files[0].size / (1024 * 1000); // in MB
                console.log("fileSize in mb", fileSize);
                const formData = new FormData();
                formData.append("image", event.target.files[0]);
                handleUploadFile(formData);
              }}
              accept="image/jpeg, .pdf, .xlsx, .doc"
            />
            <Style.Button for="upload">+</Style.Button>
            {/*<Style.Button>+</Style.Button> */}
            <img
              style={{ cursor: "pointer", marginLeft: "8px" }}
              src={SeeMore}
              alt="seemore"
            ></img>{" "}
          </div>
        </Style.HealthCardHeader>
        <Style.FileHeader>
          <Style.FileTitle style={{}}>
            {fileUpload && fileUpload}
          </Style.FileTitle>
          {fileUpload && <Style.CancelButton style={{width:"fit-content"}} onClick={handleRemoveFile}>Remove</Style.CancelButton>}
        </Style.FileHeader>
        {/*filesList.map((item, index) => (
          <Style.FileHeader key={index}>
            <Style.FileTitle style={{}}>{item.fileName}</Style.FileTitle>
          </Style.FileHeader>
        )) */}
      </Style.HealthCard>

      <Style.MessageCard>
        <Style.Title style={{}}>Asset Planet Message</Style.Title>
        <div style={{ marginTop: "1rem" }}>
          {Messages.map((item, index) => (
            <Style.Messages key={index}>{item.message}</Style.Messages>
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          {hiddenMessage.map((item, index) => (
            <div key={index}>
              <Style.MessageTitle
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                {item.title}
              </Style.MessageTitle>
              {item.show === true && (
                <Style.HiddenMessages>{item.message}</Style.HiddenMessages>
              )}
            </div>
          ))}
        </div>
      </Style.MessageCard>
    </div>
  );
};
