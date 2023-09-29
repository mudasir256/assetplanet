import React, { useState, useEffect } from "react";
import * as Style from "./styles/value";
import { defaultStyles } from "../../../../../../constants/style-constants/utils";
import DropDown from "../../../../../styled-components/dropdown/dropdown";
import itemAdd from "../item-add";
import warranty from "../warranty/warranty";
import { DatePicker } from "antd";
import moment from "moment";

function value({
  handleItemsAddObject,
  nextForm,
  preForm,
  data,

  prevData,
  isUpdate,
}) {
  const title = isUpdate ? "Update Item" : "Add New Item";
  const uniqueKey = Object.keys(data.valueDetails.data)[0];
  const valueInfoJob = data.valueDetails.data[uniqueKey];
  const [appraisalStatus, setAppraisalStatus] = useState(true);
  const [valueInfoData, setValueInfoData] = useState({
    Quantity: valueInfoJob && valueInfoJob["Quantity"],
    PricePaid: valueInfoJob && valueInfoJob["PricePaid"],
    CurrentValue: valueInfoJob && valueInfoJob["CurrentValue"],
    Condition: valueInfoJob && valueInfoJob["Condition"],
    Appreciation: valueInfoJob && valueInfoJob["Appreciation"],
    AppraisalSource: valueInfoJob && valueInfoJob["AppraisalSource"],
    AppraisalDate: valueInfoJob && valueInfoJob["AppraisalDate"],
    Appraisal: valueInfoJob && valueInfoJob["Appraisal"],
  });
  useEffect(() => {
    const uniqueKey = Object.keys(data.valueDetails.data)[0];
    const valueInfoJob = data.valueDetails.data[uniqueKey];
    setValueInfoData({
      Quantity: valueInfoJob && valueInfoJob["Quantity"],
      PricePaid: valueInfoJob && valueInfoJob["PricePaid"],
      CurrentValue: valueInfoJob && valueInfoJob["CurrentValue"],
      Condition: valueInfoJob && valueInfoJob["Condition"],
      Appreciation: valueInfoJob && valueInfoJob["Appreciation"],
      AppraisalSource: valueInfoJob && valueInfoJob["AppraisalSource"],
      AppraisalDate: valueInfoJob && valueInfoJob["AppraisalDate"],
      Appraisal: valueInfoJob && valueInfoJob["Appraisal"],
    });
  }, [data]);
  console.log("valueInfoData", valueInfoData);
  const [conditionList, setConditionList] = useState(null);
  const [appreciationList, setAppreciationList] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  // useEffect(() => {
  //   if (prevData) {
  //     let key = Object.keys(prevData.valueDetails.data)[0];
  //     let valueInfoData = prevData.valueDetails.data[key];
  //     console.log("valueInfoDataaaaaa", valueInfoData);
  //     // console.log("key and generalInfoData  itemAdd>>", key, generalInfoData);

  //     setValueInfoData({
  //       Quantity: valueInfoData && valueInfoData["Quantity"],
  //       PricePaid: valueInfoData && valueInfoData["PricePaid"],
  //       CurrentValue: valueInfoData && valueInfoData["CurrentValue"],
  //       Condition: valueInfoData && valueInfoData["Condition"],
  //       Appreciation: valueInfoData && valueInfoData["Appreciation"],
  //       AppraisalSource: valueInfoData && valueInfoData["AppraisalSource"],
  //       AppraisalDate: valueInfoData && valueInfoData["AppraisalDate"],
  //       Appraisal: valueInfoData && valueInfoData["Appraisal"],
  //     });
  //   }
  //   console.log("prevData", prevData);
  // }, [prevData]);

  console.log("valueInfoData", valueInfoData);
  const appraisalDate =
    data &&
    data.valueDetails &&
    data.valueDetails.data[0] &&
    data.valueDetails.data[0].AppraisalDate &&
    moment(data.valueDetails.data[0].AppraisalDate);

  console.log(appraisalDate);

  console.log("startDate", startDate);
  let condition = [
    {
      id: 1,
      name: "Excellent",
    },
    {
      id: 2,
      name: "Good",
    },
    {
      id: 3,
      name: "Fair",
    },
  ];

  let appreciation = [
    { id: 1, name: "Yes" },
    { id: 2, name: "No" },
  ];

  React.useEffect(() => {
    fetchCondition();
    if (data && data.valueDetails.data[0].Appraisal === "No") {
      console.log("NOOOOOO", valueInfoData.Appraisal);
      setAppraisalStatus(false);
    } else {
      setAppraisalStatus(true);
    }
  }, [prevData]);

  async function fetchCondition() {
    setConditionList(condition);
    setAppreciationList(appreciation);
  }

  const submitData = () => {
    handleItemsAddObject(valueInfoData);
    // nextForm(nextComponent);
  };

  const appraisal = (status) => {
    console.log("appraisalStatus", appraisalStatus);
    console.log("status", status);

    // if (status === "Yes") {
    //   setAppraisalStatus(true);
    // } else {
    //   setAppraisalStatus(false);
    // }
  };
  console.log("data.value.data", data.valueDetails.data);
  console.log("uniquekey", uniqueKey);
  console.log("valueInfoJob", valueInfoJob);
  console.log("valueInfoData", valueInfoData);

  const handleValueInfo = (obj) => {
    console.log("obj", { ...obj });
    const { name, value, item } = obj;
    if (obj.Appraisal) {
      obj.Appraisal === "Yes"
        ? setAppraisalStatus(true)
        : setAppraisalStatus(false);
    }

    setValueInfoData({
      ...valueInfoData,
      [name]: value, //name === "Condition" || name === "Appreciation" ? item : value,
      // AppraisalDate: startDate,
      Appraisal: obj.Appraisal,
    });
    if (name == "Quantity" || name == "PricePaid")
      setValueInfoData((val) => ({
        ...val,
        CurrentValue:
          val["PricePaid"] && val["Quantity"]
            ? val["PricePaid"] * val["Quantity"]
            : 0,
      }));
    console.log("valueInfoData", valueInfoData);
  };

  const nextComponent = {
    name: "warranty",
    title: "Warranty",
    unique: "matric",
    isMulti: false,
    component: warranty,
    warranty: {},
  };

  const preComponent = {
    name: "generalInformation",
    title: "General Information",
    unique: "firstName",
    isMulti: false,
    component: itemAdd,
    generalInformation: {},
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "1.5rem",
          rowGap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <h4 style={{ fontSize: "19px" }}>{title}</h4>
        </div>

        <div style={{ borderBottom: "2px solid #d9d9d9" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>
            Value Details
          </h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2.5rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Quantity:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  type="number"
                  name="Quantity"
                  value={valueInfoData["Quantity"]}
                  onChange={(event) => {
                    handleValueInfo(event.target);
                  }}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Quantity Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Price Paid:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  type="number"
                  name="PricePaid"
                  value={valueInfoData["PricePaid"]}
                  onChange={(event) => {
                    handleValueInfo(event.target);
                  }}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Price Paid Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Current Value:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  type="number"
                  name="CurrentValue"
                  value={valueInfoData["CurrentValue"]}
                  disabled={true}
                  // onChange={() => setValueInfoData({ ...valueInfoData, CurrentValue: valueInfoData["PricePaid"] * valueInfoData["Quantity"] })}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Current Value Here"
                />
              </Style.InputBorder>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "26%%",
              }}
            >
              <div>
                <h5>Condition:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.m_smallDropdown}
                  listingStyle={{
                    ...defaultStyles.styles.dropDown.m_smallDropdown,
                    height: "auto",
                  }}
                  name="Condition"
                  title="Condition"
                  list={conditionList}
                  displayKey="name"
                  value={valueInfoData["Condition"]}
                  setSelectedItem={handleValueInfo}
                  disableSearch={true}
                  defaultValue={
                    data && data.valueDetails && data.valueDetails.data[0]
                      ? data.valueDetails.data[0].Condition
                      : ""
                  }
                />
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", width: "23%" }}
            >
              <div>
                <h5>Appreciation:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.m_smallDropdown}
                  name="Appreciation"
                  title="Appreciation"
                  list={appreciationList}
                  displayKey="name"
                  value={valueInfoData["Appreciation"]}
                  setSelectedItem={handleValueInfo}
                  defaultValue={
                    data && data.valueDetails && data.valueDetails.data[0]
                      ? data.valueDetails.data[0].Appreciation
                      : ""
                  }
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "2rem",
                width: "23%",
                rowGap: "0.4rem",
              }}
            >
              <div>
                <h5>Appraisal:</h5>
              </div>
              {appraisalStatus ? (
                <div
                  style={{
                    display: "flex",
                    height: "3.2rem",
                    justifyContent: "space-between",
                    borderRadius: "5rem",
                    padding: "0.3rem",
                    WebkitBoxShadow: "0 0 7px #c1c1c1",
                    boxShadow: "0 0 7px #c1c1c1",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "0.8rem",
                      backgroundColor: "green",
                      height: "2.5rem",
                      borderRadius: "5rem",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <p>Yes</p>
                  </div>
                  <div
                    value={appraisalStatus["true"]}
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingTop: "0.8rem",
                      // backgroundColor: "red",
                      height: "2.5rem",
                      borderRadius: "5rem",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#f9f9f9",
                        width: "50%",
                      }}
                      onClick={() => handleValueInfo({ Appraisal: "No" })}
                      value={appraisalStatus[false]}
                      name="Appraisal"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    height: "3.2rem",
                    justifyContent: "space-between",
                    borderRadius: "5rem",
                    padding: "0.3rem",
                    WebkitBoxShadow: "0 0 7px #c1c1c1",
                    boxShadow: "0 0 7px #c1c1c1",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // paddingTop: "0.8rem",
                      // backgroundColor: "green",
                      height: "2.5rem",
                      borderRadius: "5rem",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        outline: "none",
                        backgroundColor: "#f9f9f9",
                        width: "50%",
                      }}
                      onClick={() => handleValueInfo({ Appraisal: "Yes" })}
                      value={appraisalStatus[true]}
                      name="Appraisal"
                    >
                      Yes
                    </button>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      width: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "0.8rem",
                      backgroundColor: "red",
                      height: "2.5rem",
                      borderRadius: "5rem",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <p>No</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {appraisalStatus ? (
            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "26%",
                }}
              >
                <div>
                  <h5>Appraisal Source:</h5>
                </div>
                <Style.InputBorder
                  style={{
                    borderRadius: "0.5rem",
                    width: "90%",
                    height: "3.5rem",
                    display: "flex",
                    padding: "1rem",
                    marginTop: "0.3rem",
                    backgroundColor: "white",
                  }}
                >
                  <Style.Input
                    name="AppraisalSource"
                    value={valueInfoData["AppraisalSource"]}
                    onChange={(event) => handleValueInfo(event.target)}
                    style={{ outline: "none", border: "none", width: "98%" }}
                    placeholder="Enter Appraisal Source"
                  />
                </Style.InputBorder>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "26%",
                }}
              >
                <div>
                  <h5>Appraisal Date:</h5>
                </div>
                <DatePicker
                  className="ant-calendar-picker-input ant-input"
                  format={"YYYY/DD/MM hh:mm:ss"}
                  selected={startDate}
                  onChange={(date) =>
                    handleValueInfo({
                      name: "AppraisalDate",
                      value: date && date.toString(),
                    })
                  }
                  style={{
                    outline: "none",
                    border: "none",
                    width: "90%",
                    marginTop: "0.4rem",
                    borderRadius: "0.5rem",
                  }}
                  placeholder="Select Appraisal Date"
                  defaultValue={
                    appraisalDate
                      ? appraisalDate
                      : valueInfoData["AppraisalDate"] &&
                        moment(valueInfoData["AppraisalDate"])
                  }
                />
                {/* <Style.InputBorder
                  style={{
                    borderRadius: "0.5rem",
                    width: "90%",
                    height: "3.5rem",
                    display: "flex",
                    paddingLeft: "1rem",
                    marginTop: "0.3rem",
                    backgroundColor: "white",
                  }}
                >
                  <Style.Input
                    value={valueInfoData["AppraisalDate"]}
                    name="AppraisalDate"
                    onChange={(event) => haldleValueInfo(event.target)}
                    style={{ outline: "none", border: "none", width: "98%" }}
                    placeholder="Select Appraisal Date"
                  />
                </Style.InputBorder> */}
              </div>
              <div style={{ width: "26%" }}></div>
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "97%",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                width: "87.5%",
              }}
            >
              <Style.Btn
                style={{
                  border: "none",
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.6rem",
                  color: "white",
                  backgroundColor: "#39b54a",
                }}
                onClick={() => {
                  submitData();
                  preForm(preComponent);
                }}
              >
                Previous
              </Style.Btn>
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", width: "87.5%" }}
            >
              <Style.Btn
                style={{
                  border: "none",
                  width: "10rem",
                  height: "2rem",
                  borderRadius: "0.6rem",
                  color: "white",
                  backgroundColor: "#39b54a",
                }}
                onClick={() => {
                  submitData();
                  nextForm(nextComponent);
                }}
              >
                Next
              </Style.Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default value;
