import React, { useState, useEffect } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Sandglass&Bitcoin-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import fileIcon from "../assets/images/DeathModuleNew/Icons.png";
import DEATH_API from "../apis/death.api";
import { Modal } from "antd";
import Table from "./styledComponents/Table/Table";
import List from "./styledComponents/Table/List";
import TitleImg from "../assets/images/DeathModuleNew/Ellipse 105.png";

export const EmailandText = (props) => {
  const [emailData, setEmailData] = useState([]);
  const [textResponse, setTextResponse] = useState([]);
  const [templateResponse, setTemplateResponse] = useState([]);
  const [textTemplateData, setTextTemplateData] = useState([]);
  const [emailCountResponse, setEmailCountResponse] = useState([]);


  // const emailData = [
  //   {
  //     To: "test@gmail.com",
  //     Subject: "New Testing",
  //     "Email Status": "Sent",
  //     Action: (
  //       <div>
  //         {" "}
  //         <img
  //           style={{ cursor: "pointer", marginRight: "1rem" }}
  //           src={menuIcon}
  //           alt="menuIcon"
  //         ></img>{" "}
  //       </div>
  //     ),
  //   },
  //   {
  //     To: "test@gmail.com",
  //     Subject: "New Testing",
  //     "Email Status": "Sent",
  //     Action: (
  //       <div>
  //         {" "}
  //         <img
  //           style={{ cursor: "pointer", marginRight: "1rem" }}
  //           src={menuIcon}
  //           alt="menuIcon"
  //         ></img>{" "}
  //       </div>
  //     ),
  //   },
  //   {
  //     To: "test@gmail.com",
  //     Subject: "New Testing",
  //     "Email Status": "Sent",
  //     Action: (
  //       <div>
  //         {" "}
  //         <img
  //           style={{ cursor: "pointer", marginRight: "1rem" }}
  //           src={menuIcon}
  //           alt="menuIcon"
  //         ></img>{" "}
  //       </div>
  //     ),
  //   },
  // ];
  // const textData = [
  //   {
  //     To: "test@gmail.com",
  //     Text: "New Testing",
  //     "Text Status": "Sent",
  //     "Phone Number": "04322323423",
  //   },
  //   {
  //     To: "test@gmail.com",
  //     Text: "New Testing",
  //     "Text Status": "Sent",
  //     "Phone Number": "04322323423",
  //   },
  //   {
  //     To: "test@gmail.com",
  //     Text: "New Testing",
  //     "Text Status": "Sent",
  //     "Phone Number": "04322323423",
  //   },
  // ];
  const emailStats = [
    {
      "No. of Email Sent": "01",
      "No. of Email Rejected": "02",
      "Email of Rejected": "test@gmail.com",
      "Email Opened": "01",
    },
    {
      "No. of Email Sent": "01",
      "No. of Email Rejected": "02",
      "Email of Rejected": "test@gmail.com",
      "Email Opened": "01",
    },
    {
      "No. of Email Sent": "01",
      "No. of Email Rejected": "02",
      "Email of Rejected": "test@gmail.com",
      "Email Opened": "01",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const handelCloseModal = () => {
    setShowModal(false);
  };
  const [showTextModal, setTextShowModal] = useState(false);
  const handelCloseTextModal = () => {
    setTextShowModal(false);
  };

  useEffect(() => {
   
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const ID = localStorage.getItem("accessId");
      // let Role =
      //   localStorage.getItem("role") &&
      //   JSON.parse(localStorage.getItem("role"));

      if (props.role == "protrustee") {
        const funeralData = await DEATH_API.getFuneralInfo(ID);
        console.log("data funeral info", funeralData);
        // Update state with funeralData if needed
      }

      const emailResponse = await DEATH_API.fetchEmail(ID);
      console.log("erghjhgfdsdfgh=====", emailResponse);
      if (emailResponse && emailResponse.data) {
        setEmailData(emailResponse.data);
      }

      const textResponse = await DEATH_API.fetchText(ID);
      console.log("erghjhgfdsdfgh#######", textResponse);
      if (textResponse && textResponse.data) {
        setTextResponse(textResponse.data);
      }

      const templateResponse = await DEATH_API.getTemplate();
      console.log("erghjhgfdsdfgh******", templateResponse);
      if (templateResponse && templateResponse.data) {
        setTemplateResponse(templateResponse.data);
      }

      const textTemplateResponse = await DEATH_API.getTextTemplate();
      console.log("erghjhgfdsdfgh%%%%%%", textTemplateResponse);
      if (textTemplateResponse && textTemplateResponse.data) {
        setTextTemplateData(textTemplateResponse.data);
      }

      const emailCountResponse = await DEATH_API.getEmailCounts();
      console.log("data in death status", emailCountResponse);
      if (emailCountResponse && emailCountResponse.countEmailLogs) {
        console.log("here in email table fetching", emailCountResponse.countEmailLogs);

        const statusCountObject = {};
        emailCountResponse.countEmailLogs.forEach((item) => {
          statusCountObject[item.status] = item.count;
        });
        let wrapper = [statusCountObject];
        console.log("wrapper", wrapper);
        setEmailCountResponse(wrapper)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cols = [
    {
      title: "To",
      dataIndex: "to",
      render: (record, index) => {
        // console.log("index...>>>",record.idx);
        return (
          <div>
            {" "}
            {record ?
            <>
  {record}
            </>
            :
            "N/A"
            }
          </div>
        );
      },
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Email Status",
      dataIndex: "sendStatus",
      render: (record) => (record ? record : "N/A"),
    },


    {
      title: "Action",
      render: (record, index) => {
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
  const emailcols = [
    {
      title: "No of Email Sent",
      dataIndex: "Bounce",
      render: (record, index) => {
        // console.log("index...>>>",record.idx);
        return (
          <div>
            {" "}
            {record ?
            <>
           {record}
            </>
            :
            "N/A"
            }
          </div>
        );
      },
    },
    {
      title: "No of Email Bounced",
      dataIndex: "Bounce",
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Email of Delever",
      dataIndex: "Delivery",
      render: (record) => (record ? record : "N/A"),
    },


    {
      title: "Email Opened",
      dataIndex: "Open",
      render: (record) => (record ? record : "N/A"),
    },
  ];
  const Textcols = [
    {
      title: "To",
      dataIndex: "to",
      render: (record, index) => {
        // console.log("index...>>>",record.idx);
        return (
          <div>
            {" "}
            {record ?
            <>
  {record}
            </>
            :
            "N/A"
            }
          </div>
        );
      },
    },
        {
      title: "Text",
      render: (record, index) => {
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
    {
      title: "Text Status",
      dataIndex: "sendStatus",
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (record) => (record ? record : "N/A"),
    },

  ];
  return (
    <div>
      <Modal closable={false} visible={showModal} centered footer={false}>
        <div>
          <h3 style={{ color: "#4d5e80", marginBottom: "10px" }}>
            {" "}
            Add New Email
          </h3>
          <Style.Input placeholder="To" name="To" />{" "}
          <Style.Input placeholder="Template" name="Template" />
          <Style.Input placeholder="Subject" name="Subject" />
          <Style.Input placeholder="Body of Email" name="Body of Email" />
          <Style.WrapperButtons>
            <Style.CancelButton
              id="stop"
              onClick={() => {
                handelCloseModal();
              }}
            >
              Cancel
            </Style.CancelButton>
            <Style.SaveButton id="stop" onClick={handelCloseModal}>
              Save
            </Style.SaveButton>
          </Style.WrapperButtons>
        </div>
      </Modal>
      <Modal closable={false} visible={showTextModal} centered footer={false}>
        <div>
          <h3 style={{ color: "#4d5e80", marginBottom: "10px" }}>
            {" "}
            Add New Text
          </h3>
          <Style.Input placeholder="To" name="To" />{" "}
          <Style.Input placeholder="Template" name="Template" />
          <Style.Input placeholder="Phone" name="Phone" />
          <Style.Input placeholder="Body of Text" name="Body of Text" />
          <Style.WrapperButtons>
            <Style.CancelButton
              id="stop"
              onClick={() => {
                handelCloseTextModal();
              }}
            >
              Cancel
            </Style.CancelButton>
            <Style.SaveButton id="stop" onClick={handelCloseTextModal}>
              Save
            </Style.SaveButton>
          </Style.WrapperButtons>
        </div>
      </Modal>
      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        Email & Text to Send
      </Style.MainHeading>
<Style.HealthCard>
  <Style.HealthCardHeader>
    <Style.Title style={{}}>Emails</Style.Title>
    <div>
      <Style.Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        +
      </Style.Button>
    </div>
  </Style.HealthCardHeader>
  {emailData.length > 0 ? (
    <List
      data={emailData} // Pass the array directly
      name={"email"}
      cols={cols}
      rows={emailData} // Pass the array directly
    ></List>
  ) : (
    <p>No email data available</p>
  )}
</Style.HealthCard>

      
      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Texts</Style.Title>
          <div>
            <Style.Button
              onClick={() => {
                setTextShowModal(true);
              }}
            >
              +
            </Style.Button>
          </div>
        </Style.HealthCardHeader>
        {textResponse.length > 0 ? (
          <List
            data={textResponse}
            name={"text"}
            cols={Textcols}
            rows={textResponse}
           ></List>
          ) : (
          <p>No text data available</p>
        )}
      </Style.HealthCard>
      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Email Stats</Style.Title>
        </Style.HealthCardHeader>
        {emailCountResponse.length > 0 ? (
          <List
          data={emailCountResponse}
            name={"stats"}
            cols={emailcols}
            rows={emailCountResponse}
           ></List>
          ) : (
          <p>No email status available</p>
        )}
      </Style.HealthCard>
    </div>
  );
};