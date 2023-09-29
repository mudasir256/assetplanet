import React, { useState, useEffect } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Safe-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import List from "./styledComponents/Table/List";
import { Modal } from "antd";
import DEATH_API from "../apis/death.api";
import MODULE_API from "../apis/module.api";

export const PasswordList = () => {
  const data = [
    {
      Name: "Testing",
      Phone: "Testing",
      Email: "Testing",
      address: "Testing",
      Director: "Testing",
      location: " Testing",
      Paidfor: "Testing",
      paid: "Testing",
      Notes: "New Testing",
    },
    {
      Name: "Testing",
      Phone: "Testing",
      Email: "Testing",
      address: "Testing",
      Director: "Testing",
      location: " Testing",
      Paidfor: "Testing",
      paid: "Testing",
      Notes: "New Testing",
    },
    {
      Name: "Testing",
      Phone: "Testing",
      Email: "Testing",
      address: "Testing",
      Director: "Testing",
      location: " Testing",
      Paidfor: "Testing",
      paid: "Testing",
      Notes: "New Testing",
    },
  ];
  const cols = [
    {
      title: "Site/App/Program",
      dataIndex: "Name",
      //   sorter: (a, b) =>
      //     a.firstName > b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1,
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "UserName",
      dataIndex: "location",
      //   sorter: (a, b) => a["lastName"] > b["lastName"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Who's Password",
      dataIndex: "address",
      // sorter: (a, b) => a["Phone"] > b["Phone"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Password Hint",
      dataIndex: "Paidfor",
      // sorter: (a, b) => a["Email"] > b["Email"],
      render: (record) => (record ? record : "N/A"),
    },

    {
      title: "Website URL",
      dataIndex: "Director",
      //   sorter: (a, b) => a["typeOfRelation"] > b["typeOfRelation"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "2FA",
      dataIndex: "Phone",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Pin",
      dataIndex: "paid",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },

    {
      title: "Security Question",
      dataIndex: "date",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Answer",
      dataIndex: "date",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Notes",
      dataIndex: "note",
      // key: "account",
      // sorter: (a, b) => a["Notes"] > b["Notes"],
      // sorter: (a, b) =>
      //   a["Notes"] > b["Notes"] ? 1 : a["Notes"] === b["Notes"] ? 0 : -1,
      render: (record) => (record ? record : "N/A"),
    },

    {
      title: "Action",
      render: (record, index) => {
        // console.log("index...>>>",record.idx);
        return (
          <div>
            {" "}
            <img
              style={{ cursor: "pointer", marginRight: "1rem" }}
              src={menuIcon}
              alt="menuIcon"
            ></img>{" "}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    console.log("calling api");
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = async () => {
    // console.log("login......", this.state.userData);
    // if (this.state.userData !== undefined) {
    //   this.props.postSavedOtp(this.state.userData.otp)
    //   localStorage.setItem("otp", this.state.userData.otp)
    //   this.props.handleLoader()
    //   try {
    //     const ID = localStorage.getItem("accessId")
    //     let data = await DEATH_API.fetchPasswords(this.state.userData && this.state.userData.otp, ID);
    //     this.setState({ message: data })
    //     console.log("data passwordlist", data)
    //     if (data && data.data) {
    //       this.setState({
    //         list_of_passwords: data.data.map((item) => {
    //           return {
    //             ...item,
    //             SiteAppProgram: item.appName,
    //             UserName: item.userName,
    //             WhosPassword: item.passwordFor,
    //             PasswordHint: item.passwordHint,
    //             WebsiteURL: item.appUrl,
    //             TwoFA: item.twoFactor,
    //             Pin: item.pin,
    //             Notes: item.note,
    //             SecurityQuestion: item.securityQuestion,
    //             Answer: item.answer,
    //           };
    //         }),
    //       });
    //     }
    //     this.props.handleLoader()
    //     if (this.state.userData.otp) {
    //       this.setState({
    //         isModalOpen: false,
    //       });
    //     }
    //     else {
    //       swal("Oops!", "Invalid OTP", "error")
    //     }
    //   }
    //   catch (error) {
    //     console.log("here in catch", error);
    //   }
    // }
    // if (this.state.message.message === "clients.otp.misMatch") {
    //   swal("Oops!", "clients.otp.misMatch", "error")
    //   this.setState({
    //     isModalOpen: true,
    //   });
    // }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    // this.props.postSavedOtp("")
    localStorage.setItem("otp", "");
  };
  const showModal = async () => {
    setIsModalOpen(true);

    // this.setState({
    //   isModalOpen: true,
    // });
    // console.log("userData", this.state.userData);
    try {
      const ID = localStorage.getItem("accessId");

      let data = await DEATH_API.configOtp(ID);
      // console.log("data.message",data.message)
    } catch (error) {
      console.log("e ", error);
    }
  };
  return (
    <div>
      {" "}
      <Modal visible={isModalOpen} footer={null} closable={false} centered>
        <div style={{ marginTop: "20px" }}>
          {/* <div style={{padding:"50px",background:"black",overflow:"hidden"}}>hellow</div> */}
          <h3 style={{ color: "#4d5e80", marginBottom: "10px" }}>
            {" "}
            List of Passwords
          </h3>
          <div className="">
            <h2 className="otp-heading" style={{ color: "#4d5e80" }}>
              This passcode provides another layer of security for your list of
              passwords. The passcode is only valid for this session.
            </h2>
            <div>
              <Style.Input
                // onChange={(e) => {
                //   this.setState({
                //     userData: {
                //       ...this.state.userData,
                //       [e.target.name]: e.target.value,
                //     },
                //   });
                // }}
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
              />

              <Style.SaveButton
                onClick={async () => {
                  console.log();
                  const ID = localStorage.getItem("accessId");
                  let data = await DEATH_API.configOtp(ID);
                }}
              >
                Resend OTP
              </Style.SaveButton>

              <Style.WrapperButtons>
                <Style.CancelButton
                  id="stop"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </Style.CancelButton>
                <Style.SaveButton onClick={handleOk}>Done</Style.SaveButton>
              </Style.WrapperButtons>
            </div>
          </div>
        </div>
      </Modal>
      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        List of Passwords
      </Style.MainHeading>
      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Passwords</Style.Title>
          <div>
            <Style.Button
            //   onClick={() => {
            //     showModal();
            //   }}
            >
              +
            </Style.Button>
          </div>
        </Style.HealthCardHeader>
        <List cols={cols} rows={data}></List>
      </Style.HealthCard>
    </div>
  );
};
