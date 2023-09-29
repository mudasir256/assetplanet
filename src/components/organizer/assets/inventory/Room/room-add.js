import React, { useState } from "react";
import * as Style from "./styles/room-add";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { MODULE_API } from "../../../../../apis";
import Loader from "../../../../styled-components/loader/loader";
import swal from "sweetalert";
import { Col, Form, Icon, Button } from "antd";

function roomAdd({ activeProperty, updateInventory }) {
  const [name, setName] = useState("");
  const [property, setProperty] = useState(activeProperty);
  const [details, setDetails] = useState();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [propertiesList, setPropertiesList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { styles } = defaultStyles;

  async function addRoom() {
    try {
      if (name === "") {
        swal("Error!", "Room Name Cannot be Empty!", "error");
        return false;
      }
      setIsLoading(true);
      let addRoom = await MODULE_API.addProperty({
        moduleName: "ROOM",
        body: {
          clientModules: [
            {
              name: name,
              detail: details,
              images: images,
              videos: videos,
              parentId: property.id,
            },
          ],
        },
      });
      setIsLoading(false);
      if (addRoom.messageCode === "client.module.created") {
        swal("Success!", "Room Created Updated", "success");
        updateInventory();
      }
    } catch (e) {
      setIsLoading(false);
      swal("Oops something went wrong!", e, "error");
      console.log("e", e);
    }
  }

  // React.useEffect(() => {
  //   fetchProperties();
  // }, []);

  const handleProperty = (obj) => {
    console.log("obj", obj);
    const { name, value, item } = obj;
    console.log("item", item);
    setProperty(obj.item.id);
  };

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

    properties = properties.records.map((value) => ({
      id: value.id,
      name: value.name,
    }));
    console.log("propertiesList", properties);
    setPropertiesList(properties);
  }

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
      setIsLoading(false);
      let imgUrl = img && img.file_url;
      console.log("image url", imgUrl);
      setImages([...images, imgUrl]);
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
      setIsLoading(true);
      let vid = await MODULE_API.uploadImage(formData);
      setIsLoading(false);
      console.log(`vid ${vid}`);
      let vidUrl = vid.file_url;
      console.log("vid url", vidUrl);
      setVideos([...videos, vidUrl]);
    }
  };

  const deleteImage = (index) => {
    let tempImages = [...images];
    console.log(`deleting from ${tempImages}`);
    console.log(`deleting image ${tempImages[index]} index ${index}`);
    const tem = tempImages.splice(index, 1);
    console.log(`tem ${tempImages} index ${index}`);

    setImages([...tempImages]);
  };
  const deleteVideos = (index) => {
    let tempVideos = [...videos];
    console.log(`deleting from ${tempVideos}`);
    console.log(`deleting video ${tempVideos[index]} index ${index}`);
    const tem = tempVideos.splice(index, 1);
    console.log(`tem ${tempVideos} index ${index}`);

    setVideos([...tempVideos]);
  };
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", rowGap: "2.5rem" }}
      >
        <div>
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Add New Room</h4>
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
                  placeholder="Enter Room Name"
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
                  list={propertiesList}
                  displayKey="name"
                  defaultValue={activeProperty.name || "Select"}
                  // value={property["Property"]}
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
                placeholder="Enter Room Details Here"
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
                      onChange={handleFileChange}
                      accept="image/png, image/gif, image/jpeg"
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
            <div>
              {images.map((img, index) => {
                return (
                  <Style.EditImageDiv key={img}>
                    <img
                      style={{ height: "40px", width: "40px", margin: "5px" }}
                      src={img}
                    />
                    <p></p>
                    <Button
                      onClick={() => deleteImage(index)}
                      icon="delete"
                      style={{ margin: "3px" }}
                    ></Button>
                  </Style.EditImageDiv>
                );
              })}
            </div>
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
                      onChange={handleVideoUpload}
                      accept="video/mp4,video/x-m4v,video/*"
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
            <div>
              {videos.map((vid, index) => {
                return (
                  <Style.EditImageDiv key={vid}>
                    <video height="50px" width="50px">
                      <source src={vid} type="video/mp4" />
                    </video>
                    <p></p>
                    <Button
                      onClick={() => deleteVideos(index)}
                      icon="delete"
                      style={{ margin: "3px" }}
                    ></Button>
                  </Style.EditImageDiv>
                );
              })}
            </div>
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
            onClick={() => addRoom()}
          >
            Add Room
          </Style.Btn>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default roomAdd;
