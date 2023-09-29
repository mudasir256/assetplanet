import React, { useEffect, useState } from "react";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import * as Style from "./styles/item-add";
import Upload from "../../../../../assets/images/upload.png";
import value from "./value/value";
import { MODULE_API } from "../../../../../apis";
import Loader from "../../../../styled-components/loader/loader";
import { Col, Form, Icon } from "antd";
import { Button } from "antd";
import { lang } from "moment/moment";
import swal from "sweetalert";

function itemAdd({ handleItemsAddObject, nextForm, data, prevData, isUpdate }) {
  // const title = prevData ? "Update Item" : "Add New Item";
  const title = isUpdate ? "Update Item" : "Add New Item";

  console.log("propssss itemAdd>>", {
    handleItemsAddObject,
    nextForm,
    data,
    prevData,
  });
  useEffect(() => {
    // console.log("object in itemAdd>> ", prevData);

    console.log("data in itemAdd>>", data);
  }, [
    data,
    // prevData
  ]);
  const uniqueKey = Object.keys(data.generalInformation.data)[0];
  const generalInfoJob = data.generalInformation.data[uniqueKey];
  console.log(generalInfoJob, "generalInfoJob");
  const [generalInformationData, setGeneralInformationData] = useState({
    Property: generalInfoJob && generalInfoJob["Property"],
    Room: generalInfoJob && generalInfoJob["Room"],
    Name: generalInfoJob && generalInfoJob["Name"],
    UniversalProductCode: generalInfoJob && generalInfoJob["UniversalProductCode"],
    SerialNumber: generalInfoJob && generalInfoJob["SerialNumber"],
    Owner: generalInfoJob && generalInfoJob["Owner"],
    Brand: generalInfoJob && generalInfoJob["Brand"],
    Model: generalInfoJob && generalInfoJob["Model"],
    SpecialFeatures: generalInfoJob && generalInfoJob["SpecialFeatures"],
    UploadImage:
      (generalInfoJob &&
        generalInfoJob["UploadImage"] && [...generalInfoJob["UploadImage"]]) ||
      [],
    UploadVideo:
      (generalInfoJob &&
        generalInfoJob["UploadVideo"] && [...generalInfoJob["UploadVideo"]]) ||
      [],
  });
  useEffect(() => {
    const uniqueKey = Object.keys(data.generalInformation.data)[0];
    const generalInfoJob = data.generalInformation.data[uniqueKey];
    console.log(generalInfoJob, "generalInfoJob use");
    setGeneralInformationData({
      Property: generalInfoJob && generalInfoJob["Property"],
      Room: generalInfoJob && generalInfoJob["Room"],
      Name: generalInfoJob && generalInfoJob["Name"],
      UniversalProductCode: generalInfoJob && generalInfoJob["UniversalProductCode"],
      SerialNumber: generalInfoJob && generalInfoJob["SerialNumber"],
      Owner: generalInfoJob && generalInfoJob["Owner"],
      Brand: generalInfoJob && generalInfoJob["Brand"],
      Model: generalInfoJob && generalInfoJob["Model"],
      SpecialFeatures: generalInfoJob && generalInfoJob["SpecialFeatures"],
      UploadImage: (generalInfoJob && generalInfoJob["UploadImage"]) || [],
      UploadVideo: (generalInfoJob && generalInfoJob["UploadVideo"]) || [],
    });
    setMultipleImage((generalInfoJob && generalInfoJob.UploadImage) || []);
    setMultipleVideo((generalInfoJob && generalInfoJob.UploadImage) || []);
    console.log(
      "new images",
      (generalInfoJob && generalInfoJob.UploadImage) || []
    );
  }, [data, prevData]);
  const [isLoading, setIsLoading] = useState(false);
  const [propertiesList, setPropertiesList] = useState(null);
  const [roomsList, setRoomsList] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [multipleImage, setMultipleImage] = useState([]);
  const [multipleVideo, setMultipleVideo] = useState([]);
  console.log("generalInformationData", generalInformationData);
  console.log("data.generalInformation.dataProp.state", data.generalInformation.dataProp.state)
  const [file, setFile] = useState();
  useEffect(() => {
    // if (!prevData) {
    //   data.generalInformation.dataProp.state &&
    //     console.log(
    //       "data change",
    //       data.generalInformation.dataProp.state.property
    //     );
    //   if (generalInformationData.UploadImage.length !== 0) {
    //     setMultipleImage([...generalInformationData.UploadImage]);
    //   }
    //   if (generalInformationData.UploadVideo.length !== 0) {
    //     setMultipleVideo([...generalInformationData.UploadVideo]);
    //   }
    // }
  }, [data]);

  // useEffect(() => {
  //   console.log("image", prevData.generalInformation.data[0].UploadImage);
  //   if (prevData.generalInformation.data[0].UploadImage) {
  //     setMultipleImage([...prevData.generalInformation.data[0].UploadImage]);
  //   }
  // }, [prevData]);

  // useEffect(() => {
  //   if (prevData) {
  //     let key = Object.keys(prevData.generalInformation.data)[0];
  //     let generalInfoData = prevData.generalInformation.data[key];
  //     console.log("key and generalInfoData  itemAdd>>", key, generalInfoData);
  //     console.log("abcdef", generalInfoData["Property"]);

  //     setGeneralInformationData({
  //       Property: generalInfoData && generalInfoData["Property"],
  //       Room: generalInfoData && generalInfoData["Room"],
  //       Name: generalInfoData && generalInfoData["Name"],
  //       UniversalProductCode:
  //         generalInfoData && generalInfoData["UniversalProductCode"],
  //       SerialNumber: generalInfoData && generalInfoData["SerialNumber"],
  //       Owner: generalInfoData && generalInfoData["Owner"],
  //       Brand: generalInfoData && generalInfoData["Brand"],
  //       Model: generalInfoData && generalInfoData["Model"],
  //       SpecialFeatures: generalInfoData && generalInfoData["SpecialFeatures"],
  //       UploadImage: generalInfoData && generalInfoData["UploadImage"],
  //       UploadVideo: generalInfoData && generalInfoData["UploadVideo"],
  //     });
  //   }
  //   if (prevData && prevData.generalInformation.data[0].UploadImage) {
  //     setMultipleImage([...prevData.generalInformation.data[0].UploadImage]);
  //   }
  //   if (prevData && prevData.generalInformation.data[0].UploadVideo) {
  //     setMultipleVideo([...prevData.generalInformation.data[0].UploadVideo]);
  //   }
  // }, [prevData]);
  console.log("multipleImage", multipleImage);

  const nextComponent = {
    name: "valueDetails",
    title: "Value",
    unique: "firstName",
    isMulti: false,
    component: value,
    value: {},
  };

  let img = {};

  function handleImageDelete(e, item, i) {
    console.log(e);
    setMultipleImage((prevValues) => {
      console.log("leftout", JSON.stringify(prevValues));
      prevValues.splice(i, 1);
      console.log("leftout", JSON.stringify(prevValues));
      setGeneralInformationData((obj) => ({
        ...obj,
        UploadImage: [...prevValues],
      }));
      return [...prevValues];
      // return prevValues.filter((img) => {
      //   console.log("in filler >> ", e, item, img);
      //   return item !== img;
      // });
    });
  }

  function handleVideoDelete(e, item, i) {
    console.log(e);
    setMultipleVideo((prevValues) => {
      console.log("new videos", prevValues);
      // prevValues.splice(i, 1);
      let arr = prevValues.filter((vid) => {
        return item !== vid;
      });
      console.log("new videos", JSON.stringify(arr));
      setGeneralInformationData((obj) => ({
        ...obj,
        UploadVideo: [...arr],
      }));
      return [...arr];
      // return prevValues.filter((vid) => {
      //   return item !== vid;
      // });
    });
  }

  const handleFileChange = async (e) => {
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
      img = await MODULE_API.uploadImage(formData);
      console.log("img", img);
      let imgUrl = img && img.file_url;
      console.log("image url", imgUrl);
      if (!img) {
        swal({
          title: "Error",
          text: "Error while uploading image, try uploading small images",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
      }
      // setFile(imgUrl);
      console.log("prevData", prevData);
      setGeneralInformationData((val) => ({
        ...val,
        UploadImage: [...val.UploadImage, imgUrl],
      }));
      setMultipleImage([...multipleImage, imgUrl]);
    }
    setIsLoading(false);

    console.log("file", file);
    console.log("generalInformationData", generalInformationData);
  };

  const handleFileUpload = async (event) => {
    setIsLoading(true);
    console.log("file", event.target.files);
    event.preventDefault();
    event.stopPropagation();
    console.log("e", event);
    if (event.target.files) {
      console.log("file exist");
      let abc = event.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("image", abc);
      let img = await MODULE_API.uploadImage(formData);
      setIsLoading(false);
      if (!img) {
        swal({
          title: "Error",
          text: "Error while uploading video, try uploading small video",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
        return;
      }
      let vidUrl = img && img.file_url;
      console.log("image url", vidUrl);
      // setFile(imgUrl);
      setGeneralInformationData((val) => ({
        ...val,
        UploadVideo: [...val.UploadVideo, vidUrl],
      }));
      setMultipleVideo([...multipleVideo, vidUrl]);
    }

    console.log("file", file);
    console.log("generalInformationData", generalInformationData);
  };

  const submitData = () => {
    handleItemsAddObject(generalInformationData);
    nextForm(nextComponent);
  };
  console.log("data.generalInformation.data", data.generalInformation.data);

  console.log("uniqueKey", uniqueKey);
  console.log("generalInfoJob", generalInfoJob);
  console.log("generalInformationData", generalInformationData);

  const handleGeneralInformation = (obj) => {
    console.log("obj", obj);
    const { name, value, item } = obj;

    setGeneralInformationData({
      ...generalInformationData,
      [name]: name === "Property" || name === "Room" ? item : value,
    });
    console.log("item", item);
    console.log("generalInformationData", generalInformationData);
  };

  React.useEffect(() => {
    console.log("multipleVideo", multipleVideo);
    // fetchProperties();
    // fetchRooms();
  }, [multipleVideo]);

  async function fetchProperties() {
    setIsLoading(true);
    let properties = await MODULE_API.fetchItems({
      moduleName: "PROPERTY",
      pageNum: 1,
      limit: 100,
      body: {},
    });

    setIsLoading(false);

    console.log("properties", properties);

    properties =
      properties &&
      properties.records.map((value) => ({
        id: value.id,
        name: value.name,
      }));
    console.log("propertiesList", properties);
    setPropertiesList(properties);
  }

  async function fetchRooms() {
    setIsLoading(true);
    let rooms = await MODULE_API.fetchItems({
      id: 96,
      pageNum: 1,
      limit: 100,
      moduleName: "ROOM",
      body: {},
    });

    setIsLoading(false);

    console.log("rooms", rooms);

    rooms =
      rooms &&
      rooms.records.map((value) => ({
        id: value.id,
        name: value.name,
      }));
    console.log("rooms", rooms);
    setRoomsList(rooms);
  }

  console.log("rooms", data.generalInformation.dataProp.state.property);

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
            General Information
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
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div>
                <h5>Property:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumDropDown}
                  name="Property"
                  title="Property"
                  setSelectedItem={handleGeneralInformation}
                  list={propertiesList}
                  displayKey="name"
                  value={generalInformationData["Property"]}
                  defaultValue={
                    (data.generalInformation.dataProp.state &&
                      data.generalInformation.dataProp.state.property.name) ||
                    "Select"
                  }
                />
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <div>
                <h5>Room:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumDropDown}
                  name="Room"
                  title="Room"
                  setSelectedItem={handleGeneralInformation}
                  list={roomsList}
                  displayKey="room_name"
                  value={generalInformationData["Room"]}
                  defaultValue={
                    (data.generalInformation.dataProp.state &&
                      data.generalInformation.dataProp.state.property.room && data.generalInformation.dataProp.state.property.room
                        .room) ||
                    "Select"
                  }
                />
              </div>
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
                <h5>Name:</h5>
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
                  name="Name"
                  // value={generalInfoJob["Name"]}
                  value={generalInformationData["Name"]}
                  onChange={(event) => handleGeneralInformation(event.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Item name"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Universal Product Code:</h5>
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
                  name="UniversalProductCode"
                  value={generalInformationData["UniversalProductCode"]}
                  // value={generalInfoJob["UniversalProductCode"]}
                  onChange={(e) => handleGeneralInformation(e.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Universal Product Code"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Serial Number:</h5>
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
                  name="SerialNumber"
                  value={generalInformationData["SerialNumber"]}
                  // value={generalInfoJob["SerialNumber"]}
                  onChange={(e) => handleGeneralInformation(e.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Serial Number here"
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
                <h5>Owner:</h5>
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
                  name="Owner"
                  value={generalInformationData["Owner"]}
                  // value={generalInfoJob["Owner"]}
                  onChange={(e) => handleGeneralInformation(e.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Owner name"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Brand:</h5>
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
                  name="Brand"
                  value={generalInformationData["Brand"]}
                  // value={generalInfoJob["Brand"]}
                  onChange={(e) => handleGeneralInformation(e.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Brand Name Here"
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "26%" }}
            >
              <div>
                <h5>Model:</h5>
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
                  name="Model"
                  value={generalInformationData["Model"]}
                  // value={generalInfoJob["Model"]}
                  onChange={(e) => handleGeneralInformation(e.target)}
                  style={{ outline: "none", border: "none", width: "98%" }}
                  placeholder="Enter Model Number here"
                />
              </Style.InputBorder>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "78%",
            marginLeft: "9.5rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <Style.Heading>
              <h4>Special Features</h4>
            </Style.Heading>
            <Style.RoomInput>
              <Style.Inputs
                name="SpecialFeatures"
                value={generalInformationData["SpecialFeatures"]}
                // value={generalInfoJob["SpecialFeatures"]}
                onChange={(e) => handleGeneralInformation(e.target)}
                placeholder="Enter Special Features Here"
              />
            </Style.RoomInput>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "28%",
              marginLeft: "6.5rem",
              rowGap: "1rem",
            }}
          >
            <Style.FileDiv
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "88%",
              }}
            >
              <div>
                <h4 style={{ paddingBottom: "1.3rem" }}>Upload Images:</h4>
              </div>
              <Col>
                <Form.Item>
                  <div>
                    <input
                      style={{ width: "6rem", display: "none" }}
                      id="file-input"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      onChange={handleFileChange}
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
                          cursor: "pointer"
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Form.Item>
              </Col>
            </Style.FileDiv>
            {generalInformationData.UploadImage &&
              generalInformationData.UploadImage.length >= 0 &&
              generalInformationData.UploadImage.map((item, i) => {
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "28%",
              marginLeft: "6.5rem",
              rowGap: "1rem",
            }}
          >
            <Style.FileDiv
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "88%",
              }}
            >
              <div>
                <h4 style={{ paddingBottom: "1.3rem" }}>Upload Videos:</h4>
              </div>
              <Col>
                <Form.Item>
                  <div>
                    <input
                      style={{ width: "6rem", display: "none" }}
                      id="video-input"
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={handleFileUpload}
                    />
                    <label for="video-input">
                      <Icon
                        className="mt-1"
                        style={{
                          fontSize: "23px",
                          background: "#39b54a",
                          padding: "8px",
                          borderRadius: "5px",
                          color: "white",
                          cursor: "pointer"
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Form.Item>
                {generalInformationData.UploadVideo &&
                  generalInformationData.UploadVideo.length > 0 &&
                  generalInformationData.UploadVideo.map((item, index) => {
                    return (
                      <Style.EditImageDiv key={index}>
                        <video style={{ height: "4rem", width: "4rem" }}>
                          <source src={item} type="video/mp4" />
                        </video>
                        <p></p>
                        <Button
                          onClick={(e) => {
                            handleVideoDelete(e, item, index);
                          }}
                          icon="delete"
                          style={{ margin: "3px" }}
                        ></Button>
                      </Style.EditImageDiv>
                    );
                  })}
              </Col>
            </Style.FileDiv>
            {/* {multipleVideo &&
              multipleVideo.length > 0 &&
              multipleVideo.map((videoItem, index) => {
                console.log("item=>", videoItem);
                return (
                  <Style.EditImageDiv>
                    <img
                      key={index}
                      style={{ height: "40px", width: "40px", margin: "5px" }}
                      src={videoItem}
                    />
                    <p></p>
                    <Button
                      onClick={(e) => {
                        handleVideoDelete(e, videoItem);
                      }}
                      icon="delete"
                      style={{ margin: "3px" }}
                    ></Button>
                  </Style.EditImageDiv>
                );
              })} */}
          </div>

          {/* <Style.FileDiv
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "32%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "25%",
                rowGap: "1rem",
              }}
            >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingLeft: "0.5rem",
                marginLeft: "6rem",
              }}
            >
              <div>
                <h4 style={{ paddingBottom: "1.3rem" }}>Upload Videos:</h4>
              </div>
              <Col>
                <Form.Item>
                  <div>
                    <input
                      style={{ width: "6rem" }}
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
            </div>
              {multipleVideo &&
              multipleVideo.length > 0 &&
              multipleVideo.map((item) => {
                console.log("item=>", item);
                return (
                  <Style.EditImageDiv>
                    <img
                      style={{ height: "40px", width: "40px", margin: "5px" }}
                      src={item}
                    />
                    <p></p>
                    <Button
                      onClick={(e) => {
                        handleVideoDelete(e, item);
                      }}
                      icon="delete"
                      style={{ margin: "3px" }}
                    ></Button>
                  </Style.EditImageDiv>
                );
              })}
            </div>
          </Style.FileDiv> */}
        </div>
        <div style={{ display: "flex", justifyContent: "end", width: "88%" }}>
          <Style.Btn
            style={{
              border: "none",
              width: "10rem",
              height: "2rem",
              borderRadius: "0.6rem",
              color: "white",
              backgroundColor: "#39b54a",
            }}
            onClick={submitData}
          >
            Next
          </Style.Btn>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default itemAdd;
