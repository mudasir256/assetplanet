import React, { useState } from "react";
import * as Style from "./styledComponents/PersonalInstruction";
import Safe from "../assets/images/DeathModuleNew/Safe-1.png";
import SeeMore from "../assets/images/DeathModuleNew/more_horiz.png";
import TitleImg from "../assets/images/DeathModuleNew/Ellipse 105.png";

import menuIcon from "../assets/images/DeathModuleNew/Menu.png";
import List from "./styledComponents/Table/List";
import { Modal } from "antd";
import Table from "./styledComponents/Table/Table";

export const BillsToPay = () => {
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
      title: "Amount",
      dataIndex: "Name",
      //   sorter: (a, b) =>
      //     a.firstName > b.firstName ? 1 : a.firstName === b.firstName ? 0 : -1,
    //   render: (record) => (record ? record : "N/A"),
      render: (record, index) => {
        // console.log("index...>>>",record.idx);
        return (
          <div>
            {" "}
            {record ?
            <>
            <img
              style={{ cursor: "pointer", marginRight: "8px" }}
              src={TitleImg}
              alt="TitleImg"
            ></img>  {record}
            </>
            :
            "N/A"
            }
          </div>
        );
      },
    },
    {
      title: "Payee Name",
      dataIndex: "location",
      //   sorter: (a, b) => a["lastName"] > b["lastName"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Category",
      dataIndex: "address",
      // sorter: (a, b) => a["Phone"] > b["Phone"],
      render: (record) => (record ? record : "N/A"),
    },
    {
      title: "Frequency",
      dataIndex: "Paidfor",
      // sorter: (a, b) => a["Email"] > b["Email"],
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
      {" "}
      <Style.MainHeading>
        <Style.HeaderImg src={Safe} alt="Safe"></Style.HeaderImg>
        Bills to Pay
      </Style.MainHeading>
      <Style.HealthCard>
        <Style.HealthCardHeader>
          <Style.Title style={{}}>Bills</Style.Title>
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
