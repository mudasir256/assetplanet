import React, { useState } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Safe-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import fileIcon from "../assets/images/DeathModuleNew/Icons.png";
import AddModal from "./styledComponents/Modal/AddModal";
import { Modal } from "antd";
import Table from "./styledComponents/Table/Table";

export const PersonalInstructions = () => {
  const data = [
    {
      Title: "Testing",
      "Personal Instruction": "New Testing",
      Action: (
        <div>
          {" "}
          <img
            style={{ cursor: "pointer", marginRight: "1rem" }}
            src={menuIcon}
            alt="menuIcon"
          ></img>{" "}
        </div>
      ),
    },
    {
      Title: "Testing",
      "Personal Instruction": "New Testing",
      Action: (
        <div>
          {" "}
          <img
            style={{ cursor: "pointer", marginRight: "1rem" }}
            src={menuIcon}
            alt="menuIcon"
          ></img>{" "}
        </div>
      ),
    },
    {
      Title: "Testing",
      "Personal Instruction": "New Testing",
      Action: (
        <div>
          {" "}
          <img
            style={{ cursor: "pointer", marginRight: "1rem" }}
            src={menuIcon}
            alt="menuIcon"
          ></img>{" "}
        </div>
      ),
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const handelCloseModal = () => {
    setShowModal(false);
  };
  const fields = [
    {
      title: "Sub Category",
      type: "select",
      options: ["Abc", "Def"],
      index: "Subcategory",
    },
    {
      title: "Start Date",
      type: "date",
      index: "StartDate",
    },
    {
      title: "End Date",
      type: "date",
      index: "EndDate",
    },

    {
      title: "Frequency",
      type: "select",
      options: ["Abc", "Def"],
      index: "Frequency",
    },
    {
      title: "Who",
      type: "select",
      options: ["Abc", "Def"],
      index: "Who",
    },
    {
      title: "Inflation Rate",
      type: "select",
      options: ["Abc", "Def"],
      index: "InflationRate",
    },

    {
      title: "Actual",
      type: "input",
      index: "Actual",
    },
    {
      title: "Budget",
      type: "input",
      index: "Budget",
    },
    {
      title: "Future Amount",
      type: "input",
      index: "FutureAmount",
    },
    {
      title: "Description",
      type: "textarea",
      index: "Description",
    },

    {
      title: "Deductible Now",
      type: "radio",
      index: "DeductibleNow",
    },
    {
      title: "Deductible Retirement",
      type: "radio",
      index: "DeductibleRetirement",
    },
    {
      title: "Date Of Change",
      type: "date",
      index: "DateOfChange",
    },
  ];

  const handlechange = (e) => {
    console.log("e", e);
  };
  const submitData = () => {
    console.log("submit data");
  };
  return (
    <div>
      <Modal closable={false} visible={showModal} centered footer={false}>
        <div>
          <h3 style={{ color: "#4d5e80", marginBottom: "10px" }}>
            {" "}
            Add New Personal Instruction
          </h3>
          <Style.Input placeholder="Title" name="Title" />{" "}
          <Style.Input placeholder="Personal Instruction" name="Instruction" />
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Style.Input
              type="file"
              id="file"
              style={{ width: "80%", display: "none" }}
            />
            <Style.FileLabel
              htmlFor="file"
              style={{ width: "100%" }}
              class="file"
            >
              <Style.FileBlock>
                No file Choosen <img src={fileIcon} alt="fileIcon"></img>
              </Style.FileBlock>
              <Style.FileBlockButton>Browse</Style.FileBlockButton>{" "}
            </Style.FileLabel>
          </div>
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
      {/* <AddModal
        show={showModal}
        close={handelCloseModal}
        fields={fields}
        modalTitle="Add New Personal Instruction"
        handlechange={handlechange}
        submitData={submitData}
        />*/}

      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        Personal Instructions
      </Style.MainHeading>

      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Personal Instructions</Style.Title>
          <div>
            <Style.Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              +
            </Style.Button>
            <img
              style={{ cursor: "pointer", marginLeft: "8px" }}
              src={SeeMore}
              alt="seemore"
            ></img>{" "}
          </div>
        </Style.HealthCardHeader>
        <Table data={data} name={"PersonalInstruction"} />
      </Style.HealthCard>
    </div>
  );
};
