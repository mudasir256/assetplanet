import React, { useState, useEffect } from "react";
import * as Style from "./styles/warranty";
import { defaultStyles } from "../../../../../../constants/style-constants/utils";
import DropDown from "../../../../../styled-components/dropdown/dropdown";
import Upload from "../../../../../../assets/images/upload.png";
import value from "../value/value";
import tag from "../tag/tag";
import { MODULE_API } from "../../../../../../apis";
import { DatePicker } from "antd";
import moment from "moment";
import { Col, Form, Icon } from "antd";
import { Button } from "antd";
import Loader from "../../../../../styled-components/loader/loader";

function warranty({
  handleItemsAddObject,
  nextForm,
  preForm,
  data,
  isUpdate,
  // prevData
}) {
  const title = isUpdate ? "Update Item" : "Add New Item";

  const uniqueKey = Object.keys(data.warranty.data)[0];
  const generalInfoJob = data.warranty.data[uniqueKey];
  const [multipleImage, setMultipleImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("data", data);
  // console.log("prevvvvdata", prevData);
  const PurchaseDate =
    data &&
    data.warranty &&
    data.warranty.data[0] &&
    data.warranty.data[0].PurchaseDate
      ? moment(data.warranty.data[0].PurchaseDate)
      : moment(new Date());
  const ReturnDate =
    data &&
    data.warranty &&
    data.warranty.data[0] &&
    data.warranty.data[0].ReturnDate
      ? moment(data.warranty.data[0].ReturnDate)
      : moment(new Date());
  console.log("DATESSSS", PurchaseDate, ReturnDate);
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [date, setDate] = useState(new Date());
  const [validator, setValidator] = useState(false);

  const [warrantyData, setWarrantyData] = useState({
    PurchaseDate: generalInfoJob && generalInfoJob["PurchaseDate"],
    PurchaseLocation: generalInfoJob && generalInfoJob["PurchaseLocation"],
    WarrantyProviders: generalInfoJob && generalInfoJob["WarrantyProviders"],
    WarrantyPeriod: generalInfoJob && generalInfoJob["WarrantyPeriod"],
    CustomerSupportPhone:
      generalInfoJob && generalInfoJob["CustomerSupportPhone"],
    WebsiteURL: generalInfoJob && generalInfoJob["WebsiteURL"],
    ReturnDate: generalInfoJob && generalInfoJob["ReturnDate"],
    Receipt: generalInfoJob && generalInfoJob["Receipt"],
  });

  // useEffect(() => {
  //   if (prevData) {
  //     let key = Object.keys(prevData.warranty.data)[0];
  //     let warrentyInfoData = prevData.warranty.data[key];
  //     // console.log("key and generalInfoData  itemAdd>>", key, generalInfoData);

  //     setWarrantyData({
  //       PurchaseDate: warrentyInfoData && warrentyInfoData["PurchaseDate"],
  //       PurchaseLocation:
  //         warrentyInfoData && warrentyInfoData["PurchaseLocation"],
  //       WarrantyProviders:
  //         warrentyInfoData && warrentyInfoData["WarrantyProviders"],
  //       WarrantyPeriod: warrentyInfoData && warrentyInfoData["WarrantyPeriod"],
  //       CustomerSupportPhone:
  //         warrentyInfoData && warrentyInfoData["CustomerSupportPhone"],
  //       WebsiteURL: warrentyInfoData && warrentyInfoData["WebsiteURL"],
  //       ReturnDate: warrentyInfoData && warrentyInfoData["ReturnDate"],
  //       Receipt: warrentyInfoData && warrentyInfoData["Receipt"],
  //     });
  //   }
  //   if (prevData && prevData.warranty.data[0].Receipt) {
  //     setMultipleImage([...prevData.warranty.data[0].Receipt]);
  //   }
  //   console.log("warrantyData", warrantyData);
  // }, [prevData]);

  const submitData = () => {
    console.log("submit ran", warrantyData, nextComponent);
    handleItemsAddObject(warrantyData);
    // nextForm(nextComponent);
  };

  const handleFileUpload = async (e) => {
    setIsLoading(true);
    console.log("file", e.target.files);
    e.preventDefault();
    e.stopPropagation();
    console.log("e", e);
    if (e.target.files) {
      console.log("file exist");
      let abc = e.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("image", abc);
      let img = await MODULE_API.uploadImage(formData);
      console.log("img", img);
      let imgUrl = img && img.file_url;
      console.log("image url", imgUrl);
      // setFile(imgUrl);
      setWarrantyData((val) => ({
        ...val,
        Receipt: val.Receipt ? [...val.Receipt, imgUrl] : [imgUrl],
      }));
      setMultipleImage([...multipleImage, imgUrl]);
    }
    // console.log("warrantyData", warrantyData);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("warrantyData", warrantyData);
  }, [warrantyData]);

  function handleImageDelete(e, item, i) {
    console.log("setMultipleImage", multipleImage, item, i);
    setMultipleImage((prevValues) => {
      let arr = prevValues.filter((img, index) => {
        if (i !== index) return img;
      });
      console.log(arr, "arr");
      typeof warrantyData["Receipt"] === "object" &&
        setWarrantyData((obj) => ({ ...obj, Receipt: [...arr] }));
      return arr;
    });
  }

  const handleWarranty = (obj) => {
    console.log("obj", obj);
    const { name, value } = obj;
    if (name === "WebsiteURL") {
      let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(value);
      valid ? setValidator(true) : setValidator(false);

      console.log("valid", valid);
    }
    setWarrantyData({
      ...warrantyData,
      [name]: value,
    });
    console.log("warrantyData", warrantyData, name, value);
  };

  useEffect(() => {
    console.log(warrantyData);
  }, [warrantyData]);

  const nextComponent = {
    name: "tag",
    title: "Tag",
    unique: "matric",
    isMulti: false,
    component: tag,
    tag: {},
  };

  const preComponent = {
    name: "valueDetails",
    title: "Value",
    unique: "firstName",
    isMulti: false,
    component: value,
    value: {},
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
            Warranty Details
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
                <h5>Purchase Date:</h5>
              </div>
              <DatePicker
                className="ant-calendar-picker-input ant-input"
                format={"YYYY/DD/MM hh:mm:ss"}
                selected={startDate}
                onChange={(date) =>
                  handleWarranty({
                    name: "PurchaseDate",
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
                placeholder="Select Purchase Date"
                defaultValue={
                  PurchaseDate
                    ? PurchaseDate
                    : warrantyData["PurchaseDate"] &&
                      moment(warrantyData["PurchaseDate"] || new Date())

                }
              />
              {/* <Style.InputBorder
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
                  name="PurchaseDate"
                  value={warrantyData["PurchaseDate"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Select Purchase Date"
                />
              </Style.InputBorder> */}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Purchase Location:</h5>
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
                  name="PurchaseLocation"
                  value={warrantyData["PurchaseLocation"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Purchase Location Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Warranty Providers:</h5>
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
                  name="WarrantyProviders"
                  value={warrantyData["WarrantyProviders"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Warranty Providers Here"
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
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Warranty Period:</h5>
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
                  name="WarrantyPeriod"
                  value={warrantyData["WarrantyPeriod"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Warranty Period Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Customer Support Phone:</h5>
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
                  name="CustomerSupportPhone"
                  value={warrantyData["CustomerSupportPhone"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Phone Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Website URL:</h5>
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
                  name="WebsiteURL"
                  value={warrantyData["WebsiteURL"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Website URL Here"
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
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Return Date:</h5>
              </div>
              <DatePicker
                className="ant-calendar-picker-input ant-input"
                format={"YYYY/DD/MM hh:mm:ss"}
                selected={date}
                onChange={(date) =>
                  handleWarranty(
                    {
                      name: "ReturnDate",
                      value: date && date.toString(),
                    }
                    // { ReturnDate: date }
                  )
                }
                style={{
                  outline: "none",
                  border: "none",
                  width: "90%",
                  marginTop: "0.4rem",
                  borderRadius: "0.5rem",
                }}
                placeholder="Enter Return Date"
                defaultValue={
                  ReturnDate
                    ? ReturnDate
                    : warrantyData["ReturnDate"] &&
                    moment(warrantyData["ReturnDate"] || null)
                }
              />
              {/* <Style.InputBorder
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
                  name="ReturnDate"
                  value={warrantyData["ReturnDate"]}
                  onChange={(event) => handleWarranty(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Return Date"
                />
              </Style.InputBorder> */}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                width: "26%",
              }}
            >
              <div>
                <h5>Receipt:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "90%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Form.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "1rem",
                      }}
                    >
                      <input
                        style={{ width: "14rem" }}
                        id="file-input"
                        type="file"
                        onChange={handleFileUpload}
                      />
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
                  </Form.Item>
                </Col>
              </Style.InputBorder>
              {warrantyData.Receipt &&
                warrantyData.Receipt.length > 0 &&
                warrantyData.Receipt.map((item, i) => {
                  console.log("item=>", item);
                  return (
                    <Style.EditImageDiv>
                      <img
                        key={i}
                        style={{ height: "40px", width: "40px", margin: "5px" }}
                        src={item}
                      />
                      <p></p>
                      <Button
                        onClick={(e) => {
                          handleImageDelete(e, item, i);
                        }}
                        icon="delete"
                        style={{ margin: "3px" }}
                      ></Button>
                    </Style.EditImageDiv>
                  );
                })}
            </div>
            <div style={{ width: "26%" }}></div>
          </div>
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
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default warranty;
