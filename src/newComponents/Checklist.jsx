import React, { useState } from "react";
import * as Style from "./styledComponents/checklist";
import Bitcoin from "../assets/images/DeathModuleNew/Mining Bitcoin-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import editPen from "../assets/images/DeathModuleNew/edit.png";
import { Modal } from "antd";

import "./styledComponents/styles/checklist.css";
export const Checklist = () => {
  const CheckList = [
    {
      id: 1,
      Name: "Audio/Video Message",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 2,
      Name: "Checklist",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 3,
      Name: "Personal Instruction",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 4,
      Name: "Contact list",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 5,
      Name: "Important Documnet",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 6,
      Name: "Email to Send",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 11,
      Name: "List of Large Bills",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 7,
      Name: "Litigation List",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 8,
      Name: "Location of Personal items",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 9,
      Name: "List Password",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
    {
      id: 10,
      Name: "Prepaid Burial Expense",
      Radio: [
        { label: "Not Started" },
        { label: "Incomplete" },
        { label: "Complete" },
        { label: "Not Applicable" },
      ],
      showNotes: false,
    },
  ];
  const CheckListYes = [
    {
      id: 1,
      Name: "Will",
      Radio: [{ label: "Yes" }, { label: "No" }],
      showNotes: false,
    },
    {
      id: 2,
      Name: "Trust",
      Radio: [{ label: "Yes" }, { label: "No" }],
      showNotes: false,
    },
    {
      id: 3,
      Name: "Advance Health Directive",
      Radio: [{ label: "Yes" }, { label: "No" }],
      showNotes: false,
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const handelCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {" "}
      <Modal closable={false} visible={showModal} centered footer={false}>
        <div>
          <h3 style={{ color: "#4d5e80" }}> Add Notes</h3>
          <textarea
            placeholder="Notes"
            style={{
              width: "100%",
              border: "1px solid #D1D5DB",
              resize: "none",
              borderRadius:"5px",
              padding:"10px",
            }}
          ></textarea>

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
      <Style.MainHeading>
        <Style.HeaderImg src={Bitcoin} alt="Bitcoin"></Style.HeaderImg>
        Checklist
      </Style.MainHeading>
      <Style.ChecklistCard>
        <Style.ChecklistCardHeader>
          <Style.Title style={{}}>Checklist</Style.Title>
          <div>
            <img
              style={{ cursor: "pointer", marginLeft: "8px" }}
              src={SeeMore}
              alt="seemore"
            ></img>{" "}
          </div>
        </Style.ChecklistCardHeader>
        {CheckList.map((item, index) => (
          <Style.FileHeader key={index}>
            <Style.FileTitle style={{ width: "20%" }}>
              {item.Name}:
            </Style.FileTitle>
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              {item.Radio &&
                item.Radio.map((item, index) => (
                  <label class="container1" key={index}>
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                    {item.label}
                  </label>
                  /*  <Style.Lable key={index}>
                    <input
                      type="radio"
                      // type="checkbox"
                      //   value={item.label}
                      name={item.label}
                      //   onClick={() => checkAnswer(answer)}
                    />
                    &nbsp;
                    {item.label}
                  </Style.Lable>
                  */
                ))}
              <div
                style={{
                  borderRadius: "50%",
                  background: "#F4F7FE",
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                }}
              >
                {" "}
                <img
                  style={{
                    marginLeft: "6px",
                    marginTop: "6px",
                    marginRight: "6px",
                  }}
                  onClick={() => {
                    setShowModal(true);
                  }}
                  src={editPen}
                  alt="editPen"
                ></img>
              </div>
            </div>
          </Style.FileHeader>
        ))}
      </Style.ChecklistCard>
      <Style.ChecklistCard>
        {CheckListYes.map((item, index) => (
          <Style.FileHeaderYes key={index}>
            <Style.FileTitle style={{ width: "20%" }}>
              {item.Name}:
            </Style.FileTitle>
            <div
              style={{
                display: "flex",
                width: "40%",
                // justifyContent: "space-between",
              }}
            >
              {item.Radio &&
                item.Radio.map((item, index) => (
                  <label class="container1" key={index}>
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                    {item.label}
                  </label>
                ))}
            </div>
          </Style.FileHeaderYes>
        ))}
      </Style.ChecklistCard>
    </div>
  );
};
