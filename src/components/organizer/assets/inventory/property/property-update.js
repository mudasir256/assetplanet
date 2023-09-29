import React, { useEffect, useState } from "react";
import * as Style from "./styles/property-add";
import Upload from "../../../../../assets/images/upload.png";
import { MODULE_API } from "../../../../../apis";
import Loader from "../../../../styled-components/loader/loader";
import swal from "sweetalert";

import DropDown from "../../../../styled-components/dropdown/dropdown";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { Icon, Form, Col } from "antd";

import { Button } from "antd";

function PropertyUpdate(props) {
  console.log("props to UpdateComponent", props);
  const propertyData = props.data;
  const [name, setName] = useState(propertyData.name);
  const [street, setStreet] = useState(propertyData.street);
  const [city, setCity] = useState(propertyData.city);
  const [state, setState] = useState(propertyData.state);
  const [zipCode, setZipCode] = useState(propertyData.zip);
  const [propertyType, setPropertyType] = useState(propertyData.type);
  const [file, setFile] = useState();
  const [video, setVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imagesArray, setImagesArray] = useState(
    (propertyData.images && propertyData.images) || []
  );
  const [videosArray, setVideosArray] = useState(
    (propertyData.videos && propertyData.videos) || []
  );
  useEffect(() => {
    console.log("propertyData", propertyData);
    if (propertyData.multiImg) {
      setImagesArray([...propertyData.multiImg]);
    }
  }, [props]);

  console.log("imagesArray", imagesArray);

  let type = [
    { id: 1, name: "House" },
    { id: 2, name: "Condominium" },
    { id: 3, name: "Appartment" },
    { id: 4, name: "Storage" },
    { id: 5, name: "Townhouse" },
    { id: 6, name: "Business" },
    { id: 7, name: "Ranch" },
    { id: 8, name: "Others" },
  ];

  let states = [
    {
      State_Name: "Alabama",
      State_Abbreviation: "AL",
      id: 1,
      name: "Alabama",
    },
    {
      State_Name: "Alaska",
      State_Abbreviation: "AK",
      id: 2,
      name: "Alaska",
    },
    {
      State_Name: "Arizona",
      State_Abbreviation: "AZ",
      id: 3,
      name: "Arizona",
    },
    {
      State_Name: "Arkansas",
      State_Abbreviation: "AR",
      id: 4,
      name: "Arkansas",
    },
    {
      State_Name: "California",
      State_Abbreviation: "CA",
      id: 5,
      name: "California",
    },
    {
      State_Name: "Colorado",
      State_Abbreviation: "CO",
      id: 6,
      name: "Colorado",
    },
    {
      State_Name: "Connecticut",
      State_Abbreviation: "CT",
      id: 7,
      name: "Connecticut",
    },
    {
      State_Name: "Delaware",
      State_Abbreviation: "DE",
      id: 8,
      name: "Delaware",
    },
    {
      State_Name: "Florida",
      State_Abbreviation: "FL",
      id: 9,
      name: "Florida",
    },
    {
      State_Name: "Georgia",
      State_Abbreviation: "GA",
      id: 10,
      name: "Georgia",
    },
    {
      State_Name: "Hawaii",
      State_Abbreviation: "HI",
      id: 11,
      name: "Hawaii",
    },
    {
      State_Name: "Idaho",
      State_Abbreviation: "ID",
      id: 12,
      name: "Idaho",
    },
    {
      State_Name: "Illinois",
      State_Abbreviation: "IL",
      id: 13,
      name: "Illinois",
    },
    {
      State_Name: "Indiana",
      State_Abbreviation: "IN",
      id: 14,
      name: "Indiana",
    },
    {
      State_Name: "Iowa",
      State_Abbreviation: "IA",
      id: 15,
      name: "Iowa",
    },
    {
      State_Name: "Kansas",
      State_Abbreviation: "KS",
      id: 16,
      name: "Kansas",
    },
    {
      State_Name: "Kentucky",
      State_Abbreviation: "KY",
      id: 17,
      name: "Kentucky",
    },
    {
      State_Name: "Louisiana",
      State_Abbreviation: "LA",
      id: 18,
      name: "Louisiana",
    },
    {
      State_Name: "Maine",
      State_Abbreviation: "ME",
      id: 19,
      name: "Maine",
    },
    {
      State_Name: "Maryland",
      State_Abbreviation: "MD",
      id: 20,
      name: "Maryland",
    },
    {
      State_Name: "Massachusetts",
      State_Abbreviation: "MA",
      id: 21,
      name: "Massachusetts",
    },
    {
      State_Name: "Michigan",
      State_Abbreviation: "MI",
      id: 22,
      name: "Michigan",
    },
    {
      State_Name: "Minnesota",
      State_Abbreviation: "MN",
      id: 23,
      name: "Minnesota",
    },
    {
      State_Name: "Mississippi",
      State_Abbreviation: "MS",
      id: 24,
      name: "Mississippi",
    },
    {
      State_Name: "Missouri",
      State_Abbreviation: "MO",
      id: 25,
      name: "Missouri",
    },
    {
      State_Name: "Montana",
      State_Abbreviation: "MT",
      id: 26,
      name: "Montana",
    },
    {
      State_Name: "Nebraska",
      State_Abbreviation: "NE",
      id: 27,
      name: "Nebraska",
    },
    {
      State_Name: "Nevada",
      State_Abbreviation: "NV",
      id: 28,
      name: "Nevada",
    },
    {
      State_Name: "New Hampshire",
      State_Abbreviation: "NH",
      id: 29,
      name: "New Hampshire",
    },
    {
      State_Name: "New Jersey",
      State_Abbreviation: "NJ",
      id: 30,
      name: "New Jersey",
    },
    {
      State_Name: "New Mexico",
      State_Abbreviation: "NM",
      id: 31,
      name: "New Mexico",
    },
    {
      State_Name: "New York",
      State_Abbreviation: "NY",
      id: 32,
      name: "New York",
    },
    {
      State_Name: "North Carolina",
      State_Abbreviation: "NC",
      id: 33,
      name: "North Carolina",
    },
    {
      State_Name: "North Dakota",
      State_Abbreviation: "ND",
      id: 34,
      name: "North Dakota",
    },
    {
      State_Name: "Ohio",
      State_Abbreviation: "OH",
      id: 35,
      name: "Ohio",
    },
    {
      State_Name: "Oklahoma",
      State_Abbreviation: "OK",
      id: 36,
      name: "Oklahoma",
    },
    {
      State_Name: "Oregon",
      State_Abbreviation: "OR",
      id: 37,
      name: "Oregon",
    },
    {
      State_Name: "Pennsylvania",
      State_Abbreviation: "PA",
      id: 38,
      name: "Pennsylvania",
    },
    {
      State_Name: "Rhode Island",
      State_Abbreviation: "RI",
      id: 39,
      name: "Rhode Island",
    },
    {
      State_Name: "South Carolina",
      State_Abbreviation: "SC",
      id: 40,
      name: "South Carolina",
    },
    {
      State_Name: "South Dakota",
      State_Abbreviation: "SD",
      id: 41,
      name: "South Dakota",
    },
    {
      State_Name: "Tennessee",
      State_Abbreviation: "TN",
      id: 42,
      name: "Tennessee",
    },
    {
      State_Name: "Texas",
      State_Abbreviation: "TX",
      id: 43,
      name: "Texas",
    },
    {
      State_Name: "Utah",
      State_Abbreviation: "UT",
      id: 44,
      name: "Utah",
    },
    {
      State_Name: "Vermont",
      State_Abbreviation: "VT",
      id: 45,
      name: "Vermont",
    },
    {
      State_Name: "Virginia",
      State_Abbreviation: "VA",
      id: 46,
      name: "Virginia",
    },
    {
      State_Name: "Washington",
      State_Abbreviation: "WA",
      id: 47,
      name: "Washington",
    },
    {
      State_Name: "Washington, DC",
      State_Abbreviation: "DC",
      id: 48,
      name: "Washington, DC",
    },
    {
      State_Name: "West Virginia",
      State_Abbreviation: "WV",
      id: 49,
      name: "West Virginia",
    },
    {
      State_Name: "Wisconsin",
      State_Abbreviation: "WI",
      id: 50,
      name: "Wisconsin",
    },
    {
      State_Name: "Wyoming",
      State_Abbreviation: "WY",
      id: 51,
      name: "Wyoming",
    },
  ];

  const setStateValue = (e) => {
    console.log("stateValue", e);
    setState(e.item.name);
    propertyData.state = e.item.name;
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      let abc = e.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("image", abc);
      setIsLoading(true);
      let img = await MODULE_API.uploadImage(formData);
      let imgUrl = img.file_url;
      console.log("image url", imgUrl);
      setFile(imgUrl);
      setImagesArray([...imagesArray, imgUrl]);
      setIsLoading(false);
    }
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      let abc = e.target.files[0];
      console.log(abc);
      let formData = new FormData();
      formData.append("video", abc);
      let vid = await MODULE_API.uploadImage(formData);
      let vidUrl = vid.file_url;
      console.log("vid url", vidUrl);
      setVideo(vidUrl);
      setVideosArray((prevValue) => [...prevValue, vidUrl]);
    }
  };

  function handleImageDelete(e, item) {
    console.log(e);
    setImagesArray((prevValues) => {
      return prevValues.filter((img) => {
        return item !== img;
      });
    });
  }
  async function updateProperty() {
    setIsLoading(true);
    try {
      let addProperty = await MODULE_API.updateClientModule(
        `${propertyData.id}`,
        {
          name: name,
          type: propertyType,
          city: city,
          state: state,
          zip: zipCode,
          street: street,
          images: imagesArray,
          videos: videosArray,
        }
      );
      setIsLoading(false);
      if (addProperty.messageCode === "client.module.updated") {
        swal("Success!", "Property Successfully Updated", "success").then(
          (cond) => {
            props.updateProperty();
          }
        );
      } else {
        setIsLoading(false);
        swal("Success!", addProperty.messageCode, "success");
      }
    } catch (e) {
      setIsLoading(false);
      swal("Oops something went wrong!", e, "error");
      console.log("e", e);
    }
  }
  const deleteVideos = (vid, index) => {
    console.log(videosArray);
    console.log("videosArray", videosArray);
    console.log("video to delete", vid);

    let arr = videosArray.filter((item) => {
      return item !== vid;
    });
    console.log(`arr ${arr}` + ` \n\n\n\n/\/n ` + `vid ${vid}`);

    setVideosArray(() => [...arr]);
    console.log("videosArray after ::", videosArray);
  };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "2.5rem" }}
      >
        <div>
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>
            Update Property
          </h4>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              width: "93%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={propertyData.name}
                />
              </Style.InputBorder>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Street:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setStreet(e.target.value)}
                  defaultValue={propertyData.street}
                />
              </Style.InputBorder>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>City:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "130%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={propertyData.city}
                />
              </Style.InputBorder>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "0.3rem",
              }}
            >
              <div>
                <h5>State:</h5>
              </div>
              <DropDown
                style={defaultStyles.styles.dropDown.m_smallDropdown}
                listingStyle={{
                  ...defaultStyles.styles.dropDown.m_smallDropdown,
                  height: "auto",
                }}
                name="State"
                title="State"
                list={states}
                displayKey="name"
                selectedItem={state}
                setSelectedItem={(e) => setStateValue(e)}
                placeholderName={propertyData.state}
                disableSearch={true}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <h5>Zip:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "126%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  marginRight: "0.5rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setZipCode(e.target.value)}
                  defaultValue={propertyData.zip}
                />
              </Style.InputBorder>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "93%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "35%",
              rowGap: "1rem",
            }}
          >
            <div>
              <h4>Type:</h4>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: "1rem",
              }}
            >
              {type.map((value, index) => (
                <Style.Type
                  key={value.id}
                  onClick={(e) => {
                    setPropertyType(value.name);
                  }}
                  isSelected={
                    value.name == propertyType ? "1px solid #39b54a" : "none"
                  }
                >
                  <p style={{ fontSize: "16px" }}>{value.name}</p>
                </Style.Type>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "33%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h4 style={{ paddingBottom: "1.3rem" }}>Upload Images:</h4>
              </div>
            <Col>
                <Form.Item>
                  <div>
                    <input
                      style={{ width: "6rem" ,display : "none" }}
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
                          cursor : "pointer"
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Form.Item>
              </Col>
            </div>
            {imagesArray &&
              imagesArray.length > 0 &&
              imagesArray.map((item) => {
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
                        handleImageDelete(e, item);
                      }}
                      icon="delete"
                      style={{ margin: "3px" }}
                    ></Button>
                  </Style.EditImageDiv>
                );
              })}
            {/* {propertyData.img && (
              <Style.EditImageDiv>
                <img
                  style={{ height: "40px", width: "40px", margin: "5px" }}
                  src={propertyData.img}
                />
                <p></p>
                <Button
                  onClick={(e) => {
                    handleImageDelete(e);
                  }}
                  icon="delete"
                  style={{ margin: "3px" }}
                ></Button>
              </Style.EditImageDiv>
            )} */}

            <div></div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "25%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "130%",
                paddingLeft: "0.5rem",
              }}
            >
              <div>
                <h4 style={{ paddingBottom: "1.3rem" }}>Upload Videos:</h4>
              </div>
              <Col>
                <Form.Item>
                  <div>
                    <input
                      style={{ width: "6rem" ,display : "none" }}
                      id="file-input"
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      onChange={handleVideoUpload}
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
                          cursor : "pointer"
                        }}
                        type="upload"
                      ></Icon>
                    </label>
                  </div>
                </Form.Item>
              </Col>
            </div>
            {videosArray &&
              videosArray.length > 0 &&
              videosArray.map((vid, index) => (
                <Style.EditImageDiv key={vid}>
                  <video height="50px" width="50px">
                    <source src={vid} type="video/mp4" />
                  </video>
                  <p></p>
                  <Button
                    onClick={() => deleteVideos(vid, index)}
                    icon="delete"
                    style={{ margin: "3px" }}
                  ></Button>
                </Style.EditImageDiv>
              ))}
            <div></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Style.Btn
            style={{
              border: "none",
              width: "10rem",
              height: "2rem",
              borderRadius: "0.6rem",
              color: "white",
              backgroundColor: "#39b54a",
            }}
            onClick={() => updateProperty()}
          >
            Update Property
          </Style.Btn>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default PropertyUpdate;
