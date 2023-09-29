import React, { useState, useEffect, useCallback } from "react";
import * as Style from "../inventory/styles/details";
import addIcon from "../../../../assets/SVGs/android-chrome-512x512.png";
import { Button } from "antd";
import { MODULE_API } from "../../../../apis";
import tableimg from "../../../../assets/images/big/img1.jpg";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "../../../styled-components/loader/loader";
import { Modal, Form } from "antd";
import PropertyAdd from "./property/property-add";
import RoomAdd from "./Room/room-add";
import PropertyUpdate from "./property/property-update";
import RoomUpdate from "./Room/room-update";
import colors from "../../../../constants/style-constants/colors";
import swal from "sweetalert";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveActiveProperty } from "../../../../redux/slices/propertiesSlice";
import { saveActiveRoom } from "../../../../redux/slices/roomsSlice";

export default function Detail() {
  const history = useHistory();
  const params = useParams();
  console.log("paramssss::", params.id);
  const [isLoading, setIsLoading] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [detail, setDetails] = useState({});
  const [id, setId] = useState(params && params.id);
  const [isModal, setModal] = useState(false);
  const [activeImg, setActiveImg] = useState("");
  const [showUpdateProperty, setShowUpdateProperty] = useState(false);
  const [updateProperty, setUpdateProperty] = useState({});
  const [showUpdateItem, setShowUpdateItem] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showPropertyAdd, setShowPropertyAdd] = useState(false);
  const [showRoomAdd, setShowRoomAdd] = useState(false);
  // const [showItemAdd, setShowItemAdd] = useState(false);
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [parentId, setParentId] = useState();
  const [updateRoom, setUpdateRoom] = useState({});
  const [activeRoom, setActiveRoom] = useState();
  const { propertiesInfo, roomsInfo, itemsInfo } = useSelector(
    (state) => state.rootReducer
  );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(
  //     "propertiesInfo",
  //     propertiesInfo,
  //     "\n\n\n roomsInfo",
  //     roomsInfo,
  //     "\n\n\nitemsInfo",
  //     itemsInfo
  //   );
  // }, [propertiesInfo, roomsInfo, itemsInfo]);

  let dummyDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare suspendisse sed nisi lacus sed viverra tellus in. Nunc sed velit dignissim sodales ut eu sem integer vitae. Urna condimentum mattis pellentesque id nibh tortor. Lorem donec massa sapien faucibus et. Varius sit amet mattis vulputate enim nulla aliquet porttitor. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Ut faucibus pulvinar elementum integer enim. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Fringilla urna porttitor rhoncus dolor purus non. Non enim praesent elementum facilisis leo vel fringilla est. 
  Dui nunc mattis enim ut tellus elementum sagittis vitae. Sed elementum tempus egestas sed. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Vitae et leo duis ut. Justo laoreet sit amet cursus sit amet. Sit amet justo donec enim. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Quam lacus suspendisse faucibus interdum posuere. Vulputate dignissim suspendisse in est. Tellus pellentesque eu tincidunt tortor aliquam nulla. Nibh sed pulvinar proin gravida hendrerit. Nec sagittis aliquam malesuada bibendum arcu vitae. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Vitae auctor eu augue ut lectus arcu. Arcu dui vivamus arcu felis. Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin. Posuere ac ut consequat semper viverra nam libero. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Volutpat blandit aliquam etiam erat velit. Eros in cursus turpis massa tincidunt dui. Massa ultricies mi quis hendrerit. Fermentum iaculis eu non diam phasellus vestibulum lorem. Donec ultrices tincidunt arcu non sodales neque. Cras adipiscing enim eu turpis egestas pretium. Tempus quam pellentesque nec nam aliquam sem et. Faucibus interdum posuere lorem ipsum dolor. Vitae congue eu consequat ac. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Quam lacus suspendisse faucibus interdum posuere lorem. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Erat nam at lectus urna. Duis convallis convallis tellus id. Egestas congue quisque egestas diam in arcu.
Ornare lectus sit amet est placerat in. Euismod lacinia at quis risus sed vulputate. Mauris cursus mattis molestie a. Mauris augue neque gravida in fermentum et sollicitudin ac orci. Consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus. Diam maecenas ultricies mi eget mauris pharetra. In fermentum et sollicitudin ac orci phasellus egestas. Odio ut enim blandit volutpat maecenas volutpat. A diam sollicitudin tempor id eu nisl nunc mi. Quis commodo odio aenean sed adipiscing diam. Tempus egestas sed sed risus pretium quam vulputate. Justo donec enim diam vulputate ut pharetra sit amet. Aliquam sem fringilla ut morbi tincidunt augue. Est ultricies integer quis auctor. Lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis. Aliquam sem fringilla ut morbi. Curabitur gravida arcu ac tortor dignissim convallis aenean.
`;

  const updateProperties = useCallback(() => {
    inventoryReport();
    handleModalCancel();
  }, []);

  const updateInventory = useCallback((item) => {
    fetchRoom(item);
    handleModalCancel();
  }, []);

  function handleEditProperty() {
    setModal(true);
    setShowUpdateProperty(true);
    setUpdateProperty(detail);
  }

  async function handleModalCancel() {
    setShowPropertyAdd(false);
    setShowRoomAdd(false);
    // setShowItemAdd(false);
    setShowUpdateProperty(false);
    setShowUpdateRoom(false);
    setShowUpdateItem(false);
    setModal(false);
  }

  async function inventoryReport() {
    setIsLoading(true);
    await fetchRoom();
    setIsLoading(false);
  }

  function handleDelete(type) {
    console.log("delete", detail);
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this Property?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then(async (doDelete) => {
      setIsLoading(true);
      doDelete &&
        (await MODULE_API.removeClientModule({
          clientModules: [detail.id],
        }));

      if (type == "property") {
        updateProperties();
        setActiveItem("");
        return;
      } else if (type == "room") {
        await MODULE_API.getRecordTotal(detail.id, {
          attributes: ["total"],
        });

        // setShowItemAdd(false);
      } else {
        await MODULE_API.getRecordTotal(activeRoom, {
          attributes: ["currentValue"],
        });
        await MODULE_API.getRecordTotal(detail.id, {
          attributes: ["total"],
        });
      }
      updateInventory(activeItem);
    });
  }
  function handleDeleteItem(event, item, type) {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete this Item?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then(async (doDelete) => {
      doDelete &&
        (await MODULE_API.removeClientModule({
          clientModules: [item.id],
        }));
    });
  }
  async function addRoom() {
    setShowRoomAdd(true);
    setModal(true);
  }

  async function fetchRoom(item) {
    setIsLoading(true);
    const res = await MODULE_API.fetchRooms({ id: id });
    let body = res.data;

    setParentId(item);

    if (body) {
      if (body.module == "ITEM") {
        setDetails(body);
      } else {
        setDetails({
          name: body.name && body.name,
          images: body.images && body.images,
          detail: body.detail && body.detail,
          total: body.total && body.total,
          children: body.children && body.children,
          zip: body.zip && body.zip,
          city: body.city && body.city,
          state: body.state && body.state,
          type: body.type && body.type,
          id: body.id && body.id,
          module: body.module && body.module,
          street: body.street && body.street,
        });
      }
      console.log("api res ::", res);
      setActiveImg(body.images ? body.images[0] : tableimg);
      setIsLoading(false);
      switch (body.module) {
        case "PROPERTY":
          dispatch(
            saveActiveProperty({
              id: body.id,
              children: body.children,
              name: body.name,
            })
          );

          break;
        case "ROOM":
          dispatch(
            saveActiveRoom({
              id: body.id,
              children: body.children,
              name: body.name,
            })
          );
          break;
      }
    } else {
      alert("data not found");
    }
  }
  useEffect(() => {
    fetchRoom();
  }, [id, params.id]);

  async function handleEditItem(e, item) {
    // setUpdateItem(item);
    let itemDetails = await MODULE_API.fetchRooms({
      id: item.id,
      body: {},
    });
    // setEditItemDetails(itemDetails);
    const bodyyy = {
      property: { id: detail.id, room: detail.id },
      data: { ...item },
      isUpdate: true,
      editItem: { ...itemDetails },
    };
    if (itemDetails) {
      setTimeout(() => {
        history.push(`/update_item/`, bodyyy);
      }, 200);
    }
  }

  async function addItem() {
    history.push(`/add_item/`, { property: { room: detail.id } });
  }
  function handleEditRoom(item) {
    // console.log("item in update room", item);
    setUpdateRoom(item);

    setModal(true);

    setShowUpdateRoom(true);
    // console.log("event", e, "item", item);
  }

  // fetchRoom();
  // useEffect(() => fetchRoom(), []);

  return (
    <div>
      <Loader isLoading={isLoading} />
      <Style.Main>
        {/* <Button onClick={fetchRoom} >get</Button> */}
        {detail.module && detail.module == "PROPERTY" && (
          <Style.SubMain>
            <div>
              <h2 style={{ fontWeight: "bold" }}>Property Details</h2>
            </div>
            <Style.Rightmain>
              <Style.Lefttmain>
                <Style.Image>
                  <img
                    src={activeImg}
                    style={{
                      width: "33rem",
                      height: "35rem",
                      borderRadius: "2rem",
                    }}
                  />

                  <ul>
                    <Style.Li>
                      {/* <li>
                        <img
                          src={detail.images ? detail.images[0] : tableimg}
                          style={{
                            width: "8rem",
                            height: "8rem",
                            borderRadius: "1rem",
                          }}
                        />
                      </li> */}
                      {detail.images &&
                        detail.images.length > 0 &&
                        detail.images.map((img, index) => {
                          return (
                            <li>
                              <img
                                onClick={(e) => {
                                  setActiveImg(img);
                                }}
                                src={img}
                                style={{
                                  width: "8rem",
                                  height: "8rem",
                                  borderRadius: "1rem",
                                  cursor: "pointer",
                                }}
                              />
                            </li>
                          );
                        })}
                    </Style.Li>
                  </ul>
                </Style.Image>
              </Style.Lefttmain>

              <Style.SubRight>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h2 style={{ fontWeight: "bold" }}>{detail.name}</h2>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="edit"
                        onClick={(e) => {
                          // handleEditProperty(e, item);
                          handleEditProperty();
                        }}
                      ></Button>
                    </div>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="delete"
                        onClick={(e) => {
                          handleDelete();
                        }}
                      ></Button>
                    </div>
                  </div>
                </div>
                <Style.Container>
                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Owner: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text
                        alignCenter={true}
                        style={{
                          display: "inline-block",
                          width: "10rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {detail.name}
                      </Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Type: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.type}</Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                </Style.Container>

                <Style.Container>
                  <Style.SubContainer style={{ justifyContent: "flex-start" }}>
                    <Style.Title>
                      <Style.Text alignCenter={true}>Room: </Style.Text>
                    </Style.Title>
                    <Style.Datas style={{ width: "6rem" }}>
                      <Style.Text alignCenter={true}>4</Style.Text>
                    </Style.Datas>
                  </Style.SubContainer>

                  <Style.SubContainer>
                    <Style.Title>
                      <Style.Text alignCenter={true}>
                        Inventory Values{" "}
                      </Style.Text>
                    </Style.Title>
                    <Style.Heading>
                      <Style.Count>
                        <div style={{ width: "100%", display: "flex" }}>
                          <Style.Sign>
                            <Style.Text
                              style={{ color: "white", paddingTop: "0.5rem" }}
                              alignCenter={true}
                            >
                              $
                            </Style.Text>
                          </Style.Sign>
                          <div
                            style={{
                              width: "90%",
                              display: "flex",
                              justifyContent: "center",
                              paddingRight: "1rem",
                            }}
                          >
                            <Style.Text
                              alignCenter={true}
                              style={{
                                paddingTop: "0.7rem",
                                color: "#39b54a",
                                fontWeight: "bold",
                              }}
                            >
                              {detail.total}
                            </Style.Text>
                          </div>
                        </div>
                      </Style.Count>
                    </Style.Heading>
                  </Style.SubContainer>
                </Style.Container>

                <Style.Container>
                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Address: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.street}</Style.Text>
                    </Style.Data>
                  </Style.SubContainer>

                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Zip: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text
                        alignCenter={true}
                        style={{ textAlign: "center" }}
                      >
                        {detail.zip}
                      </Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                </Style.Container>

                <Style.Container>
                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>City: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.city}</Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                  <Style.SubContainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>State: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.state}</Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                </Style.Container>
              </Style.SubRight>
            </Style.Rightmain>
          </Style.SubMain>
        )}
        {detail.module && detail.module == "ROOM" && (
          <Style.SubMain>
            <div>
              <h2 style={{ fontWeight: "bold" }}>Room Details</h2>
            </div>
            <Style.Rightmain>
              <Style.Lefttmain>
                <Style.Image>
                  <img
                    src={activeImg}
                    style={{
                      width: "24rem",
                      height: "35rem",
                      borderRadius: "2rem",
                    }}
                  />

                  <ul>
                    <Style.Li>
                      {detail.images &&
                        detail.images.length > 0 &&
                        detail.images.map((img, index) => {
                          return (
                            <li>
                              <img
                                onClick={(e) => {
                                  setActiveImg(img);
                                }}
                                src={img}
                                style={{
                                  width: "8rem",
                                  height: "8rem",
                                  borderRadius: "1rem",
                                  cursor: "pointer",
                                }}
                              />
                            </li>
                          );
                        })}
                    </Style.Li>
                  </ul>
                </Style.Image>
              </Style.Lefttmain>
              <Style.SubRight>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h2 style={{ fontWeight: "bold" }}>{detail.name}</h2>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="edit"
                        onClick={() => handleEditProperty()}
                      ></Button>
                    </div>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="delete"
                        onClick={(e) => {
                          handleDelete();
                        }}
                      ></Button>
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Style.SubContainer>
                    <Style.Title style={{ width: "6rem" }}>
                      <Style.Text alignCenter={true}>Items: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>
                        {detail.children.length}
                      </Style.Text>
                    </Style.Data>
                  </Style.SubContainer>
                  <Style.Count>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign>
                        <Style.Text
                          style={{ color: "white", paddingTop: "0.5rem" }}
                          alignCenter={true}
                        >
                          $
                        </Style.Text>
                      </Style.Sign>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          paddingRight: "1rem",
                        }}
                      >
                        <Style.Text
                          alignCenter={true}
                          style={{
                            paddingTop: "0.7rem",
                            color: "#39b54a",
                            fontWeight: "bold",
                          }}
                        >
                          {detail.total}
                        </Style.Text>
                      </div>
                    </div>
                  </Style.Count>
                </div>
                <div style={{ textAlign: "justify" }}>
                  <h1>Description</h1>
                  <p> {dummyDescription}</p>
                </div>
              </Style.SubRight>
            </Style.Rightmain>
          </Style.SubMain>
        )}

        {detail.module && detail.module == "ITEM" && (
          <Style.SubMain>
            <div>
              <h2 style={{ fontWeight: "bold" }}>Item Details</h2>
            </div>
            <Style.Rightmain>
              <Style.Lefttmain>
                <Style.Image>
                  <img
                    src={activeImg}
                    style={{
                      width: "21rem",
                      height: "17rem",
                      borderRadius: "2rem",
                    }}
                  />

                  <ul>
                    <Style.Li>
                      {detail.images &&
                        detail.images.length > 0 &&
                        detail.images.map((img, index) => {
                          return (
                            <li>
                              <img
                                onClick={(e) => {
                                  setActiveImg(img);
                                }}
                                src={img}
                                style={{
                                  width: "5rem",
                                  height: "5rem",
                                  borderRadius: "1rem",
                                  cursor: "pointer",
                                }}
                              />
                            </li>
                          );
                        })}
                    </Style.Li>
                  </ul>
                </Style.Image>
              </Style.Lefttmain>

              <Style.SubRight>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h2 style={{ fontWeight: "bold" }}>{detail.name}</h2>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="edit"
                        onClick={(e) => {
                          // handleEditProperty(e, item);
                          handleEditItem(e, { id: detail.id });
                        }}
                      ></Button>
                    </div>
                    <div className="custom-field-alignments-icons">
                      <Button
                        type="link"
                        style={{ fontSize: "21px" }}
                        icon="delete"
                        onClick={(e) => {
                          handleDeleteItem(e, { id: detail.id });
                        }}
                      ></Button>
                    </div>
                  </div>
                </div>
                <Style.Container>
                  <Style.MainSubcontainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Owner: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>
                        {detail.ownerName}
                      </Style.Text>
                    </Style.Data>
                  </Style.MainSubcontainer>
                  <Style.MainSubcontainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Brand: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>
                        {detail.brandName}
                      </Style.Text>
                    </Style.Data>
                  </Style.MainSubcontainer>
                </Style.Container>

                <Style.Container>
                  <Style.MainSubcontainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Model: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.model}</Style.Text>
                    </Style.Data>
                  </Style.MainSubcontainer>
                  <Style.MainSubcontainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>UPC: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>{detail.upc}</Style.Text>
                    </Style.Data>
                  </Style.MainSubcontainer>
                </Style.Container>

                <Style.Container>
                  <Style.MainSubcontainer>
                    <Style.Title style={{ width: "10rem" }}>
                      <Style.Text alignCenter={true}>Serial: </Style.Text>
                    </Style.Title>
                    <Style.Data>
                      <Style.Text alignCenter={true}>
                        {detail.serialNumber}
                      </Style.Text>
                    </Style.Data>
                  </Style.MainSubcontainer>
                </Style.Container>
                <div style={{ textAlign: "justify", paddingTop: "3rem" }}>
                  <h1>Special Features:</h1>
                  <p> {dummyDescription}</p>
                </div>
              </Style.SubRight>
            </Style.Rightmain>
          </Style.SubMain>
        )}
        {/*----------- this section is for module == property 
                we will put a condition like this

                detail.module && detail.module == "PROPERTY/ROOM/ITEM"

                and then we will write its structure....

                according to API response of stored in detail variable 

                required sections will be rendered
                
                */}
        {detail.module && detail.module == "PROPERTY" && (
          <Style.Cards>
            <Style.SubCards
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Style.CardsHead>
                <h3 style={{ fontWeight: "bold" }}>Rooms</h3>
              </Style.CardsHead>
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "11rem",
                }}
              >
                <div>
                  <h3>Add Rooms</h3>
                </div>
                <Style.AddBtn onClick={() => addRoom()}>
                  {/* <h3 style={{ color: "white" }}>+</h3> */}
                  <img src={addIcon} />
                </Style.AddBtn>
              </Style.PropertyAdd>
            </Style.SubCards>

            <Style.CardsMain
              style={{
                width: "auto",
                display: "flex",
                // justifyContent: "space-between",
                flexDirection: "start",
                columnGap: "3.9rem",
                overflow: "hidden",
                overflowX: "auto",
                paddingBottom: 40,
                marginBottom: -20,
                paddingLeft: "0.21rem",
                paddingRight: "1rem",
                paddingTop: "1rem",
              }}
            >
              {detail.children &&
                detail.children.map((item, index) => {
                  {
                  }
                  return (
                    <Style.Card

                    // style={{
                    //   // borderColor: activeItem !== item.id ? colors.green : "none",
                    // }}
                    // active={item.id == activeItem}
                    >
                      <div>
                        <Style.Img
                          src={item.images ? item.images[0] : tableimg}
                          style={{
                            width: "22rem",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "1rem",
                            height: "15rem",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "1rem 0.5rem 0 1rem",
                        }}
                      >
                        <div
                          style={{
                            paddingTop: "1rem",
                          }}
                        >
                          <h3
                            style={{
                              fontWeight: "bold",
                              display: "inline-block",
                              width: "5rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            CardsMain
                          </h3>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div className="custom-field-alignments-icons">
                            <Button
                              type="link"
                              style={{ fontSize: "21px" }}
                              icon="edit"
                              onClick={(e) => {
                                // handleEditProperty(e, item);
                                handleEditRoom(item);
                              }}
                            ></Button>
                          </div>

                          {/* <Link
                          to={{
                            pathname: `/property-detail/${item.id}`,
                            query: `id=${item.id}`,
                            state: item,
                          }}
                        > */}


                        <Link
                        to={{
                          pathname: `/room-detail/${item.id}`,
                          query: `id=${item.id}`,
                          state: item
                        }}>
                          <div className="custom-field-alignments-icons">
                            <Link
                              to={{
                                pathname: `/room-detail/${item.id}`,
                                query: `id=${item.id}`,
                                state: item,
                              }}
                            >
                              <Button
                                type="link"
                                style={{ fontSize: "16px" }}
                                icon="eye"
                                onClick={(e) => {
                                  setId(item.id);
                                }}
                              ></Button>
                            </Link>
                            {/* <Button
                              type="link"
                              style={{ fontSize: "16px" }}
                              icon="eye"
                              onClick={(e) => {
                                setId(item.id);
                              }}
                            ></Button> */}
                          </div>
                          </Link>

                          <div className="custom-field-alignments-icons">
                            <Button
                              type="link"
                              style={{ fontSize: "21px" }}
                              icon="delete"
                              onClick={(e) => {
                                handleDelete();
                              }}
                            ></Button>
                          </div>
                        </div>
                      </div>
                      <Style.Desc>
                        <div style={{ display: "flex" }}>
                          <div>
                            <p>Room:</p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: "bold",
                                color: "black",
                                paddingLeft: "0.4rem",
                              }}
                            >
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div>
                            <p>Property:</p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: "bold",
                                color: "black",
                                paddingLeft: "0.4rem",
                              }}
                            >
                              {detail.name}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: "flex", width: "90%" }}>
                          <div style={{ display: "flex", width: "100%" }}>
                            <div>
                              <p>Detail:</p>
                            </div>
                            <div>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  color: "black",
                                  paddingLeft: "0.4rem",
                                }}
                              >
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Style.Desc>
                      <Style.Counts1>
                        <div style={{ width: "100%", display: "flex" }}>
                          <Style.Sign1>
                            <h3
                              style={{ color: "white", paddingTop: "0.5rem" }}
                            >
                              $
                            </h3>
                          </Style.Sign1>
                          <div
                            style={{
                              width: "90%",
                              display: "flex",
                              justifyContent: "center",
                              paddingRight: "1rem",
                            }}
                          >
                            <h3
                              style={{
                                paddingTop: "0.5rem",
                                color: "#39b54a",
                                fontWeight: "bold",
                              }}
                            >
                              {item.total ? item.total : "0"}
                            </h3>
                          </div>
                        </div>
                      </Style.Counts1>
                    </Style.Card>
                  );
                })}
            </Style.CardsMain>
          </Style.Cards>
        )}

        {/* section for module = room    (kashan) 
        
        detail.module && detail.module == "ROOM"
        */}

        {detail.module && detail.module == "ROOM" && (
          <>
            <Style.SubCards
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Style.CardsHead>
                <h3 style={{ fontWeight: "bold" }}>Items</h3>
              </Style.CardsHead>
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "11rem",
                }}
              >
                <div>
                  <h3>Add Items</h3>
                </div>
                <Style.AddBtn onClick={() => addItem()}>
                  {/* <h3 style={{ color: "white" }}>+</h3> */}
                  <img src={addIcon} />
                </Style.AddBtn>
              </Style.PropertyAdd>
            </Style.SubCards>
            <div>
              {detail.children && detail.children.length > 0 ? (
                detail.children.map((item, index) => {
                  return (
                    <Style.MainCard
                      key={item.id}
                      // style={{
                      //   borderColor: activeRoom !== item.id ? colors.green : "none",
                      // }}
                      // active={item.id == activeRoom}
                      style={{ marginBottom: "20px" }}
                    >
                      <Style.CardImg>
                        <img
                          style={{
                            width: "10rem",
                            borderRadius: "1rem",
                            height: "9rem",
                          }}
                          src={item.images ? item.images[0] : tableimg}
                        />
                      </Style.CardImg>
                      <Style.CardDetails>
                        <Style.CardDetailsColumn>
                          <Style.CardItemsLarge>
                            <Style.RoomCardP>Name:</Style.RoomCardP>
                            <p
                            // style={{
                            //   alignSelf: "center",
                            // }}
                            >
                              {item.name}
                            </p>
                          </Style.CardItemsLarge>
                          <Style.CardItemsLarge>
                            <Style.RoomCardP>quantity: </Style.RoomCardP>
                            <p
                            // style={{
                            //   alignSelf: "center",
                            //   paddingLeft: "5px",
                            // }}
                            >
                              {item.quantity}
                            </p>
                          </Style.CardItemsLarge>
                        </Style.CardDetailsColumn>
                        <Style.CardDetailsColumn>
                          <Style.CardItemsLarge>
                            <Style.RoomCardP>Current Value:</Style.RoomCardP>
                            <p
                            // style={{
                            //   alignSelf: "center",
                            // }}
                            >
                              {item.currentValue}
                            </p>
                          </Style.CardItemsLarge>
                          <Style.CardItemsLarge>
                            <Style.RoomCardP>Room: </Style.RoomCardP>
                            <p
                            // style={{
                            //   alignSelf: "center",
                            //   paddingLeft: "5px",
                            // }}
                            >
                              {detail.name}
                            </p>
                          </Style.CardItemsLarge>
                        </Style.CardDetailsColumn>
                        <Style.CardDetailsColumn>
                          <Style.CardItemsLarge style={{ marginRight: "10px" }}>
                            <Style.RoomCardP>Tags:</Style.RoomCardP>
                            <Style.TagsContainer>
                              {item.tags && item.tags.length > 0 ? (
                                item.tags.map((tag) => (
                                  <Style.TagPill>{tag}</Style.TagPill>
                                ))
                              ) : (
                                <p>no tags</p>
                              )}
                            </Style.TagsContainer>
                            {/* <p
                            // style={{
                            //   alignSelf: "center",
                            // }}
                            >
                              {activeItem.name}
                            </p> */}
                          </Style.CardItemsLarge>
                          {/* <Style.CardItemsLarge style={{ marginRight: "10px" }}>
                            <Style.RoomCardP>Total Value:</Style.RoomCardP>
                            <p
                            // style={{
                            //   alignSelf: "center",
                            // }}
                            >
                              {item.value}
                            </p>
                          </Style.CardItemsLarge> */}
                        </Style.CardDetailsColumn>
                        <Style.CardDetailsColumn
                          style={{
                            flexBasis: "10%",
                          }}
                        >
                          <Style.CardItemsSmall
                            style={{
                              // flexDirection: "column",
                              // justifyContent: "space-evenly",
                              // paddingBottom: "10px",
                              margin: "auto 0 ",
                            }}
                          >
                            <Button
                              type="link"
                              style={{ fontSize: "16px" }}
                              icon="edit"
                              onClick={(e) => {
                                handleEditItem(e, item);
                              }}
                            ></Button>
                          </Style.CardItemsSmall>
                          <Style.CardItemsSmall
                            style={{
                              margin: "auto 0 ",
                            }}
                          >
                            <Button
                              type="link"
                              style={{ fontSize: "16px" }}
                              icon="delete"
                              onClick={(e) => {
                                handleDeleteItem(e, item);
                              }}
                            ></Button>
                          </Style.CardItemsSmall>
                          <Style.CardItemsSmall
                            style={{
                              margin: "auto 0 ",
                            }}
                          >
                            <Button
                              type="link"
                              style={{
                                fontSize: "16px",
                                backgroundColor: colors.green,
                                color: colors.white,
                              }}
                            // icon="delete"
                            // onClick={(e) => {
                            //   handleDelete(e, item);
                            // }}
                            >
                              Loan
                            </Button>
                          </Style.CardItemsSmall>
                        </Style.CardDetailsColumn>
                      </Style.CardDetails>
                    </Style.MainCard>
                  );
                })
              ) : (
                <h1>No Items</h1>
              )}
            </div>
          </>
        )}

        {/* -------------------------------------------------------------------------- */}

        {/* section for module = room    (Rohab) 
        
        detail.module && detail.module == "ITEM"
        */}

        {detail.module && detail.module == "ITEM" && (
          <>
            <div style={{ display: "flex", columnGap: "19rem" }}>
              <h2 style={{ fontWeight: "bold" }}>Value</h2>

              <h2 style={{ fontWeight: "bold" }}>Warranty</h2>
            </div>
            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Qunatity:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.quantity ? detail.quantity : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Purchase Date:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {moment(detail.purchaseDate).format("ll")
                      ? moment(detail.purchaseDate).format("ll")
                      : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text
                    alignCenter={true}
                    style={{ textAlign: "justify" }}
                  >
                    Purchase Location:
                  </Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.purchaseLocation ? detail.purchaseLocation : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
            </Style.Container>

            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "10rem" }}>
                  <Style.Text alignCenter={true}>Price Paid: </Style.Text>
                </Style.Title>
                <Style.Heading>
                  <Style.Count2>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign>
                        <Style.Text
                          style={{ color: "white", paddingTop: "0.5rem" }}
                          alignCenter={true}
                        >
                          $
                        </Style.Text>
                      </Style.Sign>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          paddingRight: "1rem",
                        }}
                      >
                        <Style.Text
                          alignCenter={true}
                          style={{
                            paddingTop: "0.7rem",
                            color: "#39b54a",
                            fontWeight: "bold",
                          }}
                        >
                          {detail.pricePaid ? detail.pricePaid : "N/A"}
                        </Style.Text>
                      </div>
                    </div>
                  </Style.Count2>
                </Style.Heading>
              </Style.SubContainer>

              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Warranty Provider:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.warrantyProviders
                      ? detail.warrantyProviders
                      : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>

              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text
                    alignCenter={true}
                    style={{ textAlign: "justify" }}
                  >
                    Warranty Period:
                  </Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.warrantyPeriod ? detail.warrantyPeriod : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
            </Style.Container>

            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "10rem" }}>
                  <Style.Text alignCenter={true}>
                    Condition Value (each):{" "}
                  </Style.Text>
                </Style.Title>
                <Style.Heading>
                  <Style.Count2>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign>
                        <Style.Text
                          style={{ color: "white", paddingTop: "0.5rem" }}
                          alignCenter={true}
                        >
                          $
                        </Style.Text>
                      </Style.Sign>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          paddingRight: "1rem",
                        }}
                      >
                        <Style.Text
                          alignCenter={true}
                          style={{
                            paddingTop: "0.7rem",
                            color: "#39b54a",
                            fontWeight: "bold",
                          }}
                        >
                          {detail.pricePaid ? detail.pricePaid : "N/A"}
                        </Style.Text>
                      </div>
                    </div>
                  </Style.Count2>
                </Style.Heading>
              </Style.SubContainer>
              <Style.SubContainer>
                <div>
                  <h2 style={{ fontWeight: "bold" }}>Support</h2>
                </div>
              </Style.SubContainer>
            </Style.Container>

            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Condition:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.condition ? detail.condition : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Phone:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.customerSupportPhone
                      ? detail.customerSupportPhone
                      : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text
                    alignCenter={true}
                    style={{ textAlign: "justify" }}
                  >
                    Website:
                  </Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.websiteURL ? detail.websiteURL : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
            </Style.Container>

            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "10rem" }}>
                  <Style.Text alignCenter={true}>Total Value: </Style.Text>
                </Style.Title>
                <Style.Heading>
                  <Style.Count2>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign>
                        <Style.Text
                          style={{ color: "white", paddingTop: "0.5rem" }}
                          alignCenter={true}
                        >
                          $
                        </Style.Text>
                      </Style.Sign>
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          paddingRight: "1rem",
                        }}
                      >
                        <Style.Text
                          alignCenter={true}
                          style={{
                            paddingTop: "0.7rem",
                            color: "#39b54a",
                            fontWeight: "bold",
                          }}
                        >
                          {detail.currentValue ? detail.currentValue : "N/A"}
                        </Style.Text>
                      </div>
                    </div>
                  </Style.Count2>
                </Style.Heading>
              </Style.SubContainer>
              <Style.SubContainer>
                <div>
                  <h2 style={{ fontWeight: "bold" }}>Appraisal</h2>
                </div>
              </Style.SubContainer>
            </Style.Container>

            <Style.Container>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>App/Dep:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.appreciationDepreciation
                      ? detail.appreciationDepreciation
                      : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text alignCenter={true}>Source:</Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {detail.appraisalSource ? detail.appraisalSource : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
              <Style.SubContainer>
                <Style.Title style={{ width: "8rem" }}>
                  <Style.Text
                    alignCenter={true}
                    style={{ textAlign: "justify" }}
                  >
                    Date:
                  </Style.Text>
                </Style.Title>
                <Style.Data>
                  <Style.Text alignCenter={true}>
                    {moment(detail.appraisalDate).format("ll")
                      ? moment(detail.appraisalDate).format("ll")
                      : "N/A"}
                  </Style.Text>
                </Style.Data>
              </Style.SubContainer>
            </Style.Container>
          </>
        )}

        <div>
          <Modal
            width={"58rem"}
            visible={isModal}
            footer={null}
            onCancel={handleModalCancel}
            style={{ width: showUpdateItem && "fit-content" }}
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          >
            {showPropertyAdd && (
              <PropertyAdd updateProperties={updateProperties} />
            )}
            {showRoomAdd && (
              <RoomAdd
                updateInventory={() => updateInventory(activeItem)}
                activeProperty={detail}
                parentId={parentId}
              />
            )}

            {showUpdateProperty && (
              <PropertyUpdate
                data={updateProperty}
                updateProperty={updateProperties}
              />
            )}
            {showUpdateRoom && (
              <RoomUpdate
                data={detail.module == "PROPERTY" ? updateRoom : detail}
                activeProperty={propertiesInfo.activeProperty}
                // updateInventory={() => updateInventory(activeItem)}
                // activeProperty={activeItem}

              />
            )}
          </Modal>
        </div>
      </Style.Main>
    </div>
  );
}
