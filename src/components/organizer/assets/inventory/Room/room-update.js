import React, { useEffect, useState } from "react";
import * as Style from "./styles/room-add";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { MODULE_API } from "../../../../../apis";
import Loader from "../../../../styled-components/loader/loader";
import swal from "sweetalert";
import { Button } from "antd";
import { Col, Form, Icon } from "antd";

function RoomUpdate(props) {
  const { data, activeProperty, updateInventory } = props;
  const [name, setName] = useState();
  const [property, setProperty] = useState(activeProperty);
  const [details, setDetails] = useState();
  const [image, setImage] = useState(data.images && data.images[0]);
  const [video, setVideo] = useState();
  const [imagesArray, setImagesArray] = useState(data.images && data.images);
  const [videosArray, setVideosArray] = useState(data.videos && data.videos);
  useEffect(() => {
    console.log("data", data);
    if ( data && data.images && data.images.length > 0) {
      setImagesArray([...data.images]);
      console.log("imagesArray", imagesArray);
    }
  }, [props]);

  const [propertiesList, setPropertiesList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { styles } = defaultStyles;

  async function updateRoom(props) {
    console.log("props in update room", props, imagesArray);
    setIsLoading(true);
    try {
      let addRoom = await MODULE_API.updateClientModule(`${data.id}`, {
        name: name,
        detail: details,
        images: (imagesArray && [...imagesArray]) || [],
        videos: (videosArray && [...videosArray]) || [],
        // parentId: property.id,
      });
      setIsLoading(false);
      if (addRoom.messageCode === "client.module.updated") {
        swal("Success!", "Room Successfully Updated", "success").then(
          (cond) => {
            updateInventory();
          }
        );
      }
    } catch (e) {
      swal("Oops something went wrong!", e, "error");

      setIsLoading(false);
      console.log("e", e);
    }
  }
  const handleProperty = (obj) => {
    console.log("obj", obj);
    const { name, value, item } = obj;
    console.log("item", item);
    setProperty(obj.item.id);
  };

  // async function fetchRoomDetails() {
  //   setIsLoading(true);
  //   let room = await MODULE_API.fetchRooms({
  //     id: data.id
  //   });
  //   setIsLoading(false);
  //   setDetails(room.data.detail || null)
  // console.log("properties", properties);

  // properties = properties.records.map((value) => ({
  //   id: value.id,
  //   name: value.name,
  // }));
  // console.log("propertiesList", properties);
  // setPropertiesList(properties);
  // }

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
      setImage(imgUrl);
      setImagesArray((prevValue) => {
        console.log(prevValue);
        return [...prevValue, imgUrl];
      });
      setIsLoading(false);
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
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Update Room</h4>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", width: "49%" }}
            >
              <div>
                <h5>Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  height: "3.5rem",
                  display: "flex",
                  padding: "1rem",
                  marginTop: "0.3rem",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none" }}
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={data.name}
                />
              </Style.InputBorder>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", width: "49%" }}
            >
              <div>
                <h5>Property:</h5>
              </div>
              <div style={{ marginTop: "0.3rem" }}>
                <DropDown
                  style={defaultStyles.styles.dropDown.mediumDropDown}
                  name="Property"
                  title="Property"
                  setSelectedItem={handleProperty}
                  list={propertiesList}
                  displayKey="name"
                  defaultValue={
                    (activeProperty && activeProperty.name) || "Select"
                  }
                />
              </div>
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
              <h4>Room:</h4>
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
              <Style.RoomInput
                style={{
                  outline: "none",
                  border: "none",
                  width: "100%",
                  height: "11rem",
                  borderRadius: "0.5rem",
                  padding: "0rem 0 7rem 1rem",
                }}
                defaultValue={data.detail}
                onChange={(e) => setDetails(e.target.value)}
              />
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
                    <label htmlFor="file-input">
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
                  <Style.EditImageDiv key={item}>
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
                    <label htmlFor="file-input">
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
              videosArray.map((vid, index) => {
                return (
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
                );
              })}
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
            onClick={() => updateRoom()}
          >
            Update Room
          </Style.Btn>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default RoomUpdate;
