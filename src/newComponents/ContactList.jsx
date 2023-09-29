import React, { useState } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Safe-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import fileIcon from "../assets/images/DeathModuleNew/Icons.png";
import SearchIcon from "../assets/images/DeathModuleNew/Search.png";

import "./styledComponents/styles/checklist.css";
import { Modal } from "antd";
import Table from "./styledComponents/Table/Table";

export const ContactList = () => {
  const data = [
    {
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      "Trusted Team": "Yes",
      "Type of Relation": "Family",
      "Access of Confidential": "No",
      Notes: "New Testing",
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
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      "Trusted Team": "Yes",
      "Type of Relation": "Family",
      "Access of Confidential": "No",
      Notes: "New Testing",
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
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      "Trusted Team": "Yes",
      "Type of Relation": "Family",
      "Access of Confidential": "No",
      Notes: "New Testing",
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
  return (
    <div>
      <Modal closable={false} visible={showModal} centered footer={false}>
        <div>
          <h3 style={{ color: "#4d5e80", marginBottom: "10px" }}>
            {" "}
            Add New Contact
          </h3>
          <div
            style={{
              height: "30rem",
              overflowY: "scroll",
              paddingInline: "1rem",
            }}
          >
            <Style.Input type="text" placeholder="Name" name="Name" />{" "}
            <Style.Input type="text" placeholder="Email" name="Email" />
            <Style.Input type="text" placeholder="Phone" name="Phone" />
            <Style.SELECT name="Type of RelationShip" id="RelationShip">
              <option value="" disabled selected>
                Type of RelationShip
              </option>
              <option value="friends">Friends</option>
              <option value="Family">Family</option>
              <option value="Others">Others</option>
            </Style.SELECT>
            <Style.Input type="text" placeholder="Address" name="Address" />
            <Style.Input type="text" placeholder="City" name="City" />
            <Style.Input type="text" placeholder="State" name="State" />
            <Style.Input type="text" placeholder="ZipCode" name="ZipCode" />
            <Style.radioGroup
            //   onChange={handleRadio}
            >
              <p>Trusted Individual</p>
              <input type="radio" id="age1" name="age" value="Yes" style={{}} />
              <label for="age1" style={{ marginLeft: "8px", color: "#777699" }}>
                Yes
              </label>
              <input
                type="radio"
                id="age2"
                name="age"
                value="No"
                style={{ marginLeft: "1rem" }}
              />
              <label for="age2" style={{ marginLeft: "8px", color: "#777699" }}>
                No
              </label>
            </Style.radioGroup>
            <Style.radioGroup
            //   onChange={handleRadio}
            >
              <p>Second Password Granted</p>
              <input type="radio" id="age1" name="age" value="Yes" style={{}} />
              <label for="age1" style={{ marginLeft: "8px", color: "#777699" }}>
                Yes
              </label>
              <input
                type="radio"
                id="age2"
                name="age"
                value="No"
                style={{ marginLeft: "1rem" }}
              />
              <label for="age2" style={{ marginLeft: "8px", color: "#777699" }}>
                No
              </label>
            </Style.radioGroup>
            <Style.radioGroup
            //   onChange={handleRadio}
            >
              <p>Part of Core Team</p>
              <input type="radio" id="age1" name="age" value="Yes" style={{}} />
              <label for="age1" style={{ marginLeft: "8px", color: "#777699" }}>
                Yes
              </label>
              <input
                type="radio"
                id="age2"
                name="age"
                value="No"
                style={{ marginLeft: "1rem" }}
              />
              <label for="age2" style={{ marginLeft: "8px", color: "#777699" }}>
                No
              </label>
            </Style.radioGroup>
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
            <textarea
              placeholder="Notes"
              style={{
                width: "100%",
                border: "1px solid #D1D5DB",
                resize: "none",
                borderRadius: "5px",
                padding: "10px",
              }}
            ></textarea>
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
      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        Contact List
      </Style.MainHeading>

      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Contact List</Style.Title>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                border: "1px solid #2a3da3",
                borderRadius: "5px",
                marginRight: "1rem",
                height: "2rem",
              }}
            >
              <img
                style={{ marginTop: "6px", marginLeft: "6px" }}
                width={"20px"}
                height={"20px"}
                src={SearchIcon}
                alt="search"
              ></img>
              <Style.SearchInput
                type="text"
                name="search"
                placeholder="Search"
              ></Style.SearchInput>
            </div>
            <Style.Button
              onClick={() => {
                setShowModal(true);
              }}
            >
              +
            </Style.Button>
          </div>
        </Style.HealthCardHeader>
        <Table data={data} name={"ContactList"} />
      </Style.HealthCard>
    </div>
  );
};
