import React, { useState } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Safe-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import List from "./styledComponents/Table/List";
import { Modal } from "antd";
import Table from "./styledComponents/Table/Table";

export const Funeralwishes = () => {
  const data = [
    {
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      address: "newuser address",
      Director: "John",
      location: " here",
      Paidfor: "12323",
      paid: "No",
      Notes: "New Testing",
    },
    {
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      address: "newuser address",
      Director: "John",
      location: " here",
      Paidfor: "12323",
      paid: "No",
      Notes: "New Testing",
    },
    {
      Name: "New User",
      Phone: "030012345678",
      Email: "newuser@gmail.com",
      address: "newuser address",
      Director: "John",
      location: " here",
      Paidfor: "12323",
      paid: "No",
      Notes: "New Testing",
    },
  ];
  const cols = [
    {
      title: "Name of Place",
      dataIndex: "Name",
      //   sorter: (a, b) =>
      //     a.firstName > b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1,
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Location",
      dataIndex: "location",
      //   sorter: (a, b) => a["lastName"] > b["lastName"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "address",
      // sorter: (a, b) => a["Phone"] > b["Phone"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Items Paid For",
      dataIndex: "Paidfor",
      // sorter: (a, b) => a["Email"] > b["Email"],
      render: (record) => (record ? record : "N/A"),
    },

    {
      title: "Director",
      dataIndex: "Director",
      //   sorter: (a, b) => a["typeOfRelation"] > b["typeOfRelation"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Phone Number",
      dataIndex: "Phone",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Amount Paid",
      dataIndex: "paid",
      //   sorter: (a, b) => a["secondPasswordGranted"] > b["secondPasswordGranted"],
      render: (record) => (record ? record : "N/A"),
    },

    {
      title: "Date of Paid",
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

  return (
    <div>
      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        Funeral Wishes
      </Style.MainHeading>

      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Funeral Wishes</Style.Title>
          <div>
            <Style.Button
            // onClick={() => {
            //   setShowModal(true);
            // }}
            >
              +
            </Style.Button>
          </div>
        </Style.HealthCardHeader>
        <List
          // loading={this.state.report_rows ? false : true}
          // loading={
          //   this.state.contact_list ? this.state.contact_list <= 0 : false
          // }
          cols={cols}
          rows={data}
          // onChange={this.handleChange}
        ></List>
        {/* <Table data={data} name={"FuneralWishes"} /> */}
      </Style.HealthCard>
    </div>
  );
};
