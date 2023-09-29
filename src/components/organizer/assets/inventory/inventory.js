import React, { useCallback, useEffect, useState } from "react";
import { MODULE_API } from "../../../../apis";
import * as Style from "../inventory/styles/inventory";
import asset from "../../../../assets/images/asset.png";
import tableimg from "../../../../assets/images/big/img1.jpg";
import Loader from "../../../styled-components/loader/loader";
import { Modal, Form, Button } from "antd";
import PropertyAdd from "./property/property-add";
import RoomAdd from "./Room/room-add";
import PropertyUpdate from "./property/property-update";
import swal from "sweetalert";
import RoomUpdate from "./Room/room-update";
import { Link, useHistory } from "react-router-dom";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import addIcon from "../../../../assets/SVGs/android-chrome-512x512.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  saveActiveProperty,
  saveAllProperties,
} from "../../../../redux/slices/propertiesSlice";
import {
  saveActiveRoom,
  saveAllRooms,
} from "../../../../redux/slices/roomsSlice";
import {
  saveAllItems,
  saveActiveItem,
} from "../../../../redux/slices/itemsSlice";
import moment from "moment";

function inventory(props) {
  const { colors } = defaultStyles;
  const [allProperties, setAllProperties] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [totalValues, setTotalValues] = useState(0);

  const [activeRoom, setActiveRoom] = useState();
  const [allRooms, setAllRooms] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [allHeading, setHeading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showPropertyAdd, setShowPropertyAdd] = useState(false);
  const [showRoomAdd, setShowRoomAdd] = useState(false);
  const [showItemAdd, setShowItemAdd] = useState(false);
  const [parentId, setParentId] = useState();
  const [roomId, setRoomId] = useState();
  const history = useHistory();
  const [data, setData] = useState(false);
  const [updateProperty, setUpdateProperty] = useState({});
  const [showUpdateProperty, setShowUpdateProperty] = useState(false);
  const [updateRoom, setUpdateRoom] = useState({});
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const [showUpdateItem, setShowUpdateItem] = useState(false);
  const [editItemDetails, setEditItemDetails] = useState({});
  const { propertiesInfo, roomsInfo, itemsInfo } = useSelector(
    (state) => state.rootReducer
  );

  useEffect(() => {
    if (propertiesInfo.activeProperty.id) {
      setActiveItem(propertiesInfo.allProperties.find(item => item.id === propertiesInfo.activeProperty.id))
    }
    console.log("active item", propertiesInfo.activeProperty)
  }, [propertiesInfo])
  const dispatch = useDispatch();
  const updateInventory = useCallback((item) => {
    fetchRoom(item);
    handleModalCancel();
  }, []);
  const updateProperties = useCallback(() => {
    inventoryReport();
    handleModalCancel();
  }, []);


  React.useEffect(() => {
    inventoryReport();
  }, []);
  let propertiesList = [];
  let roomsList = [];
  let rooms = [];
  const styles = {
    hidescroll: {
      width: "100%",
      overflow: "hidden",
    },
    container: {
      width: "100%",
      overflowX: "auto",
      paddingBottom: 20,
      marginBottom: -20,
    },
  };

  async function addProperty() {
    setShowPropertyAdd(true);
    setModal(true);
  }

  async function addRoom() {
    setShowRoomAdd(true);
    setModal(true);
  }

  async function addItem() {
    setShowItemAdd(true);
    history.push(`/add_item/`, { property: { ...parentId, room: roomId }, });
  }

  async function fetchItem(itemsList) {
    console.log("fetchItem", itemsList);
    setRoomId(itemsList);
    setActiveRoom(itemsList.id);
    setIsLoading(true);
    let item = await MODULE_API.fetchRooms({
      id: itemsList.id,
      body: {},
    });
    // console.log("rooms listing", item);
    setIsLoading(false);
    if (item.data.children.length === 0) {
      setData(true);
    } else {
      setData(false);
    }
    item =
      item.data &&
      item.data.children.map((items) => ({
        id: items.id,
        room: item.data ? item.data.name : "N/A",
        name: items.name ? items.name : "N/A",
        quantity: items.quantity ? items.quantity : "N/A",
        value: item.data ? item.data.total : 0,
        currentValue: items.currentValue,
        img: items.images && items.images[0] ? items.images[0] : tableimg,
      }));
    setAllItems(item);
    setShowItems(true);
    // console.log("items listing", item);
    // setTimeout(() => {
    //   getAllItems(itemsList.id);
    // }, 500);
    dispatch(saveActiveRoom({ id: itemsList.id, children: item }));
    dispatch(saveAllItems(item));
  }

  async function fetchRoom(item) {
    setAllItems([]);
    setParentId(item);
    setActiveItem(item);
    setIsLoading(true);
    let roomsData = await MODULE_API.fetchRooms({
      id: item.id,
      body: {},
    });

    setIsLoading(false);
    // console.log("active", activeItem);
    // console.log("roomsData", roomsData);
    // roomsList =
    //   room.data &&
    //   room.data.map((property) => ({
    //     propertyName: property.name,
    //     room: rooms,
    //   }));
    rooms =
      roomsData.data &&
      roomsData.data.children &&
      roomsData.data.children.map((room) => ({
        id: room.id,
        room: room ? room.name : "N/A",
        name: room.name ? room.name : "N/A",
        value: room.total ? room.total : 0,
        images: room.images ? room.images : [],
        detail: room.detail ? room.detail : "",
        img: room.images && room.images[0] ? room.images[0] : tableimg,
        videos: room.videos ? room.videos : [],
      }));
    // console.log("rooms", rooms);
    setAllRooms(rooms);
    setHeading(true);

    dispatch(
      saveActiveProperty({ id: item.id, children: roomsData.data.children })
    );
    dispatch(saveAllRooms(rooms));
  }

  async function inventoryReport() {
    if (propertiesInfo.allProperties.length === 0) {
      setIsLoading(true);
      setAllProperties([]);
      let inventories = await MODULE_API.fetchItems({
        moduleName: "PROPERTY",
        pageNum: 1,
        limit: 100,
        body: {},
      });
      setIsLoading(false);
      console.log("new report", inventories.records);
      // console.log("inventories", inventories);
      propertiesList =
        inventories &&
        inventories.records.map((properties) => ({
          id: properties.id,
          name: properties.name,
          total: properties.total ? properties.total : 0,
          img:
            properties.images && properties.images[0]
              ? properties.images[0]
              : tableimg,
          // description:
          //   "Lorem Ipsum Lorem Ipsum Lorem Ipsum, Lorem Ipsum Lorem Ipsum Lorem Ipsum",
          // setTotalValues(...totalValues + properties.total),
          // setTotalValues((totalValues) => totalValues + total)
          city: properties.city ? properties.city : "N/A",
          state: properties.state ? properties.state : "N/A",
          zip: properties.zip ? properties.zip : " N/A",
          type: properties.type,
          street: properties.street ? properties.street : "N/A",
          multiImg: properties.images,
          videos: properties.videos ? properties.videos : [],
        }));
      propertiesList.map((properties) => (
        console.log("properties", properties.total)
        // setTotalValues((prev) => prev + properties.total)
      ));
      const initialValue = 0;
      const sumWithInitial = propertiesList.reduce((accumulator, currentValue) => accumulator + currentValue.total, initialValue);
      console.log("sumWithInitial", sumWithInitial)
      setTotalValues(sumWithInitial)
      setAllProperties(propertiesList);
      dispatch(saveAllProperties(propertiesList));
    }
  }
  useEffect(() => {
    setAllProperties(propertiesInfo.allProperties);
  }, [propertiesInfo]);
  useEffect(() => {
    if (roomsInfo.allrooms.length > 0) {
      setHeading(true);
      setAllRooms(roomsInfo.allrooms);
    }
  }, [roomsInfo]);
  useEffect(() => {
    if (itemsInfo.allItems.length > 0) {
      setAllItems(itemsInfo.allItems);
      setShowItems(true);
    }
  }, [itemsInfo]);

  async function handleModalCancel() {
    setShowPropertyAdd(false);
    setShowRoomAdd(false);
    setShowItemAdd(false);
    setShowUpdateProperty(false);
    setShowUpdateRoom(false);
    setShowUpdateItem(false);
    setModal(false);
  }
  function handleDelete(event, item, type) {

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
          clientModules: [item.id],
        }));
      if (type == "property") {
        updateProperties();
        setActiveItem("");
        setAllRooms("");
        return;
      } else if (type == "room") {
        await MODULE_API.getRecordTotal(activeItem.id, {
          attributes: ["total"],
        });
        setAllItems("");
        setShowItems(false);
        setShowItemAdd(false);
      } else {
        await MODULE_API.getRecordTotal(activeRoom, {
          attributes: ["currentValue"],
        });
        await MODULE_API.getRecordTotal(activeItem.id, {
          attributes: ["total"],
        });
      }
      updateInventory(activeItem);
    });
  }

  function handleEditProperty(e, item) {
    setModal(true);
    setShowUpdateProperty(true);
    // console.log("event", e, "item", item);
    setUpdateProperty(item);
  }

  function handleEditRoom(e, item) {
    setModal(true);
    setShowUpdateRoom(true);
    console.log("event", e, "item", item);
    setUpdateRoom(item);
  }
  // const detaiRoom = () =>{
  //   <Detail/>
  // }
  async function handleEditItem(e, item) {
    setUpdateItem(item);
    let itemDetails = await MODULE_API.fetchRooms({
      id: item.id,
      body: {},
    });
    setEditItemDetails(itemDetails);
    const bodyyy = {
      property: { ...parentId, room: roomId },
      data: { ...item },
      isUpdate: true,
      editItem: { ...itemDetails },
    };
    if (updateItem && editItemDetails) {
      setTimeout(() => {
        history.push(`/update_item/`, bodyyy);
      }, 200);
    }
  }

  async function getAllItems(roomID) {
    await MODULE_API.fetchItems({
      moduleName: `ITEM`,
      pageNum: 1,
      limit: 10,
      body: {
        parentId: roomID,
      },
    });
  }

  function moneyFormatter(value) {
    // Create our number formatter.
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    let result = formatter.format(value);
    // console.log("Money :: ", result);
    return result;
  }
  return (
    <div>
      <Style.Main>
        <Style.SubMain>
          <div>
            <h3 style={{ fontWeight: "bold" }}>Inventory Report</h3>
          </div>
          <Style.Container>
            <Style.Heading>
              <Style.Subheading>
                <Style.Headingh4>All Inventory</Style.Headingh4>
              </Style.Subheading>
              <Style.Image>
                <span>
                  <img src={asset} style={{ width: "5rem" }} />
                </span>
              </Style.Image>
            </Style.Heading>
            <Style.SubContainer>
              <Style.Title
              //  style={{ width: "10rem" }}
              >
                <Style.Text alignCenter={true}>Client Name</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text alignCenter={true}>{localStorage.getItem("User") ? localStorage.getItem("User") : <React.Fragment></React.Fragment>}</Style.Text>
              </Style.Data>
            </Style.SubContainer>
            <Style.SubContainer>
              <Style.Title
              //  style={{ width: "10rem" }}
              >
                <Style.Text alignCenter={true}>Todays Date</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text alignCenter={true}>{moment().format("MM/DD/YYYY")}</Style.Text>
              </Style.Data>
            </Style.SubContainer>
          </Style.Container>
          <Style.Container>
            <Style.Heading>
              <Style.Count>
                <div style={{ width: "100%", display: "flex" }}>
                  <Style.Sign>
                    <Style.Headingh4
                      style={{
                        color: "white",
                        padding: "0.5rem ",
                        margin: "auto",
                      }}
                    >
                      {"    $    "}
                    </Style.Headingh4>
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
                      {totalValues && totalValues}
                    </Style.Text>
                  </div>
                </div>
              </Style.Count>
            </Style.Heading>
            <Style.SubContainer>
              <Style.Title style={{ width: "8rem" }}>
                <Style.Text alignCenter={true}>Spouse Name</Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text alignCenter={true}>None</Style.Text>
              </Style.Data>
            </Style.SubContainer>
            <Style.SubContainer>
              <Style.Title style={{ width: "8rem" }}>
                <Style.Text alignCenter={true} style={{ textAlign: "justify" }}>
                  Plan Nickname
                </Style.Text>
              </Style.Title>
              <Style.Data>
                <Style.Text alignCenter={true}>None</Style.Text>
              </Style.Data>
            </Style.SubContainer>
          </Style.Container>
        </Style.SubMain>

        <Style.Cards>
          <Style.SubCards
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Style.CardsHead>
              <h3 style={{ fontWeight: "bold" }}>Properties</h3>
            </Style.CardsHead>
            <Style.PropertyAdd
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "11rem",
              }}
            >
              <div>
                <h3>Add Property</h3>
              </div>
              <Style.AddBtn onClick={() => addProperty()}>
                {/* <h3 style={{ color: "white" }}>+</h3> */}
                <img src={addIcon} />
              </Style.AddBtn>
            </Style.PropertyAdd>
          </Style.SubCards>
          <Style.CardsMain>
            {allProperties &&
              allProperties.map((item, index) => (
                <Style.Card
                  key={index}
                  onClick={() => fetchRoom(item)}
                  // style={{
                  //   // borderColor: activeItem !== item.id ? colors.green : "none",
                  // }}
                  active={item.id == activeItem}
                >
                  <div style={{ overflow: "hidden" }}>
                    <Style.Img src={item.img} />
                  </div>

                  <Style.PropertyCardDetails>
                    <div style={{ paddingTop: "1rem", overflow: "hidden" }}>
                      <Style.PropertyCardH3>{item.name}</Style.PropertyCardH3>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "21px" }}
                          icon="edit"
                          onClick={(e) => {
                            handleEditProperty(e, item);
                            console.log("itemsssssssss", item);
                          }}
                        ></Button>
                      </div>
                      <Link
                        to={{
                          pathname: `/property-detail/${item.id}`,
                          query: `id=${item.id}`,
                          state: item,
                        }}
                      >
                        <div className="custom-field-alignments-icons">
                          <Button
                            type="link"
                            style={{ fontSize: "21px" }}
                            icon="eye"
                          >
                            <Link
                              to={{
                                pathname: "/room-detail",
                                state: { title: "test" },
                              }}
                            >
                              {" "}
                            </Link>
                          </Button>
                        </div>
                      </Link>

                      <div className="custom-field-alignments-icons">
                        <Button
                          type="link"
                          style={{ fontSize: "21px" }}
                          icon="delete"
                          onClick={(e) => {
                            handleDelete(e, item, "property");
                          }}
                        ></Button>
                      </div>
                    </div>
                  </Style.PropertyCardDetails>
                  <Style.Desc>
                    <div style={{ display: "flex" }}>
                      <div>
                        <p>Street:</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "0.4rem",
                          }}
                        >
                          {item.street}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <p>City:</p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "0.4rem",
                          }}
                        >
                          {item.city}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", width: "90%" }}>
                      <div style={{ display: "flex", width: "100%" }}>
                        <div>
                          <p>State:</p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              paddingLeft: "0.4rem",
                            }}
                          >
                            {item.state}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: "flex", width: "100%" }}>
                        <div>
                          <p>Zip:</p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              paddingLeft: "0.4rem",
                            }}
                          >
                            {item.zip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Style.Desc>
                  <Style.Counts1>
                    <div style={{ width: "100%", display: "flex" }}>
                      <Style.Sign1>
                        <h3 style={{ color: "white", paddingTop: "0.5rem" }}>
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
                          {moneyFormatter(item.total)}
                        </h3>
                      </div>
                    </div>
                  </Style.Counts1>
                </Style.Card>
              ))}
          </Style.CardsMain>
        </Style.Cards>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1rem 1rem 0rem 1rem",
          }}
        >
          {allHeading ? (
            <Style.SubCards
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Style.CardsHead>
                <h3 style={{ fontWeight: "bold" }}>Inventory Details</h3>
              </Style.CardsHead>
            </Style.SubCards>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "1rem",
            columnGap: "2.3rem",
          }}
        >
          <Style.Rooms>
            {activeItem || allHeading ? (
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "28rem",
                }}
              >
                <div>
                  <h3>Add Room</h3>
                </div>
                <Style.AddBtn onClick={() => addRoom()}>
                  {/* <h3 style={{ color: "white" }}>+</h3> */}
                  <img src={addIcon} />

                  {/* <div>
                    <Button onClick={addRoom}>add</Button>
                  </div> */}
                </Style.AddBtn>
              </Style.PropertyAdd>
            ) : null}
            {allRooms &&
              allRooms.map((item, index) => (
                <Style.MainCard
                  key={index}
                  onClick={() => fetchItem(item)}
                  style={{
                    borderColor: activeRoom !== item.id ? colors.green : "none",
                  }}
                  active={item.id == activeRoom}
                >
                  <Style.CardImg>
                    <img
                      style={{
                        width: "10rem",
                        borderRadius: "1rem",
                        height: "9rem",
                      }}
                      src={item.img}
                    />
                  </Style.CardImg>
                  <Style.CardDetails allowColumn={true}>
                    <Style.CardDetailsColumn>
                      <Style.CardItemsLarge>
                        <Style.RoomCardP>Room:</Style.RoomCardP>
                        <p
                          style={{
                            display: "inline-block",
                            width: "5rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.room}
                        </p>
                      </Style.CardItemsLarge>
                      <Style.CardItemsSmall>
                        <Style.RoomCardP>Value: </Style.RoomCardP>
                        <p
                          style={{
                            alignSelf: "center",
                            paddingLeft: "5px",
                          }}
                        >
                          {item.value}
                        </p>
                      </Style.CardItemsSmall>
                    </Style.CardDetailsColumn>
                    <Style.CardDetailsColumn>
                      <Style.CardItemsLarge style={{ marginRight: "10px" }}>
                        <Style.RoomCardP>Property:</Style.RoomCardP>
                        <p
                        // style={{
                        //   alignSelf: "center",
                        // }}
                        >
                          {activeItem.name}
                        </p>
                      </Style.CardItemsLarge>
                      <Style.CardItemsSmall
                        style={{
                          justifyContent: "space-evenly",
                          paddingBottom: "10px",
                        }}
                      >
                        <Button
                          type="link"
                          style={{ fontSize: "16px" }}
                          icon="edit"
                          onClick={(e) => {
                            handleEditRoom(e, item);
                          }}
                        ></Button>
                        <Link
                          to={{
                            pathname: `/property-detail/${item.id}`,
                            query: `id=${item.id}`,
                            state: item,
                          }}
                        >
                          <div>
                            <Button
                              type="link"
                              style={{ fontSize: "16px" }}
                              icon="eye"
                            ></Button>
                          </div>
                        </Link>
                        <Button
                          type="link"
                          style={{ fontSize: "16px" }}
                          icon="delete"
                          onClick={(e) => {
                            handleDelete(e, item, "room");
                          }}
                        ></Button>

                      </Style.CardItemsSmall>
                    </Style.CardDetailsColumn>
                  </Style.CardDetails>
                </Style.MainCard>
              ))}
          </Style.Rooms>

          <div
            style={{
              display: "flex",
              width: "69%",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            {showItems ? (
              <Style.PropertyAdd
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>
                  <h3>Add Item</h3>
                </div>
                <Style.AddBtn onClick={() => addItem(allItems)}>
                  {/* <h3 style={{ color: "white" }}>+</h3>
                   */}
                  <img src={addIcon} />
                </Style.AddBtn>
              </Style.PropertyAdd>
            ) : null}
            {data === false ? (
              allItems &&
              allItems.map((item, index) => (
                <Style.MainCard
                  key={item.id}
                  style={{
                    borderColor: activeRoom !== item.id ? colors.green : "none",
                  }}
                  active={item.id == activeRoom}
                >
                  <Style.CardImg>
                    <img
                      style={{
                        width: "10rem",
                        borderRadius: "1rem",
                        height: "9rem",
                      }}
                      src={item.img}
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
                          {item.room}
                        </p>
                      </Style.CardItemsLarge>
                    </Style.CardDetailsColumn>
                    <Style.CardDetailsColumn>
                      <Style.CardItemsLarge style={{ marginRight: "10px" }}>
                        <Style.RoomCardP>Property:</Style.RoomCardP>
                        <p
                        // style={{
                        //   alignSelf: "center",
                        // }}
                        >
                          {activeItem.name}
                        </p>
                      </Style.CardItemsLarge>
                      <Style.CardItemsLarge style={{ marginRight: "10px" }}>
                        <Style.RoomCardP>Total Value:</Style.RoomCardP>
                        <p
                        // style={{
                        //   alignSelf: "center",
                        // }}
                        >
                          {item.value}
                        </p>
                      </Style.CardItemsLarge>
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
                            handleDelete(e, item);
                          }}
                        ></Button>
                      </Style.CardItemsSmall>
                      <Style.CardItemsSmall
                        style={{
                          margin: "auto 0",
                        }}
                      >
                        <Link
                          to={{
                            pathname: `/item-detail/${item.id}`,
                            query: `id=${item.id}`,
                            state: item,
                          }}
                        >
                          <Button
                            type="link"
                            style={{ fontSize: "16px" }}
                            icon="eye"
                          ></Button>
                        </Link>
                      </Style.CardItemsSmall>
                    </Style.CardDetailsColumn>
                  </Style.CardDetails>
                </Style.MainCard>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>NO ITEM FOUND</h1>
              </div>
            )}
          </div>
        </div>
      </Style.Main>
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
              activeProperty={activeItem}
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
              data={updateRoom}
              updateInventory={() => updateInventory(activeItem)}
              activeProperty={activeItem}
            />
          )}
          {/* {showUpdateItem && (
            <ItemUpdate
              data={updateItem}
              property={{ ...parentId, room: roomId }}
              isUpdate={true}
              editItem={editItemDetails}
            />
          )} */}
        </Modal>
      </div>

      <Loader isLoading={isLoading} />
    </div>
  );
}

export default inventory;
