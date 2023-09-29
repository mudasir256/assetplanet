import React, { useCallback, useEffect, useState } from "react";
import { MODULE_API } from "../../../../apis";
import * as Style from "./styles/Asset-Listing"
import tableimg from "../../../../assets/images/big/img1.jpg";
import Loader from "../../../../components/styled-components/loader/loader";
import { Modal, Form, Button } from "antd";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import addIcon from "../../../../assets/SVGs/android-chrome-512x512.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    saveActiveProperty,
    saveAllProperties,
} from "../../../../redux/slices/propertiesSlice";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
function AssetListing(props) {
    const [allProperties, setAllProperties] = useState([]);
    const [activeItem, setActiveItem] = useState("");
    const [activeRoom, setActiveRoom] = useState();
    const [allItems, setAllItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setModal] = useState(false);
    const [showItems, setShowItems] = useState(false);
    const [showItemAdd, setShowItemAdd] = useState(false);
    const history = useHistory();

    const { propertiesInfo, roomsInfo, itemsInfo } = useSelector(
        (state) => state.rootReducer
    );
    const dispatch = useDispatch();
    const updateInventory = useCallback((item) => {
    }, []);
    const updateProperties = useCallback(() => {
        airplaneReport();
    }, []);

    const { module } = useParams();

    React.useEffect(() => {
        airplaneReport();
    }, []);
    let propertiesList = [];
    let roomsList = [];
    let rooms = [];


    async function airplaneReport() {
        try {
            setIsLoading(true);
            setAllProperties([]);
            let airplane = await MODULE_API.fetchItems({
                moduleName: module,
                pageNum: 1,
                limit: 10,
                body: {},
            });
            setIsLoading(false);
            console.log("new report");

            // propertiesList=airplane&&
            propertiesList = airplane &&
                airplane.records.map((properties) => ({
                    id: properties.id,
                    Owner: properties.Owner,
                    module: properties.module,
                    type: properties.type ? properties.type : 0,
                    subType: properties.subType ? properties.subType : 0,
                    img: properties.image && properties.image[0] ? properties.image[0] : tableimg,
                    name: properties.NameofAsset,
                    total: properties.total ? properties.total : 0,
                    "Account Type/Titled": properties['Account Type/Titled']
                }));
            setAllProperties(propertiesList);
            dispatch(saveAllProperties(propertiesList));
        }
        catch (error) {
            console.log("e ", error);
        }
    }

    function handleDelete(event, item, type) {
        console.log(
            "event",
            event,
            "item",
            item,
            "active Item=>",
            activeItem,
            activeRoom
        );
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
    function handleEdit(event, item, type) {
        console.log(
            "event",
            event,
            "item",
            item,
            "active Item=>",
            activeItem,
            activeRoom
        );
        history.push(`/assets_new/attributes/${item.module}/${item.id}`);
        // history.push("/assets_edit/" + item.id);
        // `/assets_new/attributes/${record.module}/${record.id}`
        // swal({
        //     title: "Are you sure?",
        //     text: "Are you sure that you want to Delete this Property?",
        //     icon: "warning",
        //     dangerMode: true,
        //     buttons: true,
        // }).then(async (doDelete) => {
        //     setIsLoading(true);
        //     doDelete &&
        //         (await MODULE_API.removeClientModule({
        //             clientModules: [item.id],
        //         }));
        //     if (type == "property") {
        //         updateProperties();
        //         setActiveItem("");
        //         return;
        //     } else if (type == "room") {
        //         await MODULE_API.getRecordTotal(activeItem.id, {
        //             attributes: ["total"],
        //         });
        //         setAllItems("");
        //         setShowItems(false);
        //         setShowItemAdd(false);
        //     } else {
        //         await MODULE_API.getRecordTotal(activeRoom, {
        //             attributes: ["currentValue"],
        //         });
        //         await MODULE_API.getRecordTotal(activeItem.id, {
        //             attributes: ["total"],
        //         });
        //     }
        //     updateInventory(activeItem);
        // });
    }


    function moneyFormatter(value) {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

        let result = formatter.format(value);
        console.log("Money :: ", result);
        return result;
    }
    return (
        <div>
            <Style.Main>
                <Style.Cards>
                    <Style.SubCards
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Style.CardsHead>
                            <h3 style={{ fontWeight: "bold" }}>{module}</h3>
                        </Style.CardsHead>
                        <Style.PropertyAdd
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <h3>Add {module}</h3>
                            </div>
                            <Link to={`/assets_new/attributes/${module}`} >
                                <Style.AddBtn>
                                    <img src={addIcon} />
                                </Style.AddBtn>
                            </Link>
                        </Style.PropertyAdd>
                    </Style.SubCards>
                    <Style.CardsMain style={{ justifyContent: allProperties.length > 0 ? "start" : "center" }}>
                        {/* {allProperties? allProperties.length >0: <p>No record found.</p>} */}
                        {allProperties.length > 0 ?
                            allProperties.map((item, index) => (
                                <Style.Card
                                    key={index}
                                    //   onClick={() => fetchRoom(item)}

                                    active={item.id == activeItem}
                                >
                                    <div style={{ overflow: "hidden" }}>
                                        <Style.Img src={item.img} />
                                    </div>

                                    <Style.PropertyCardDetails>
                                        <div style={{ paddingTop: "1rem", overflow: "hidden" }}>
                                            <Style.PropertyCardH3>{item.Owner}</Style.PropertyCardH3>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <div className="custom-field-alignments-icons">
                                                <Button
                                                    type="link"
                                                    style={{ fontSize: "21px" }}
                                                    icon="edit"
                                                    onClick={(e) => {
                                                        handleEdit(e, item, "property");
                                                    }}
                                                ></Button>
                                            </div>
                                            <div className="custom-field-alignments-icons">
                                                <Button
                                                    type="link"
                                                    style={{ fontSize: "21px" }}
                                                    icon="eye"
                                                >
                                                </Button>
                                            </div>

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
                                        <div style={{ display: "flex", width: "100%" }}>
                                            <div>
                                                <p>Account Type:</p>
                                            </div>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: "bold",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        color: "black",
                                                        paddingLeft: "0.4rem",

                                                    }}
                                                >
                                                    {item["Account Type/Titled"]}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <p>Type:</p>
                                            </div>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "black",
                                                        paddingLeft: "0.4rem",
                                                    }}
                                                >
                                                    {item.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <div>
                                                <p>SubType:</p>
                                            </div>
                                            <div>
                                                <p
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "black",
                                                        paddingLeft: "0.4rem",
                                                    }}
                                                >
                                                    {item.subType}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", width: "90%" }}>
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
                            )) : <h1>No Data Found.</h1>}
                    </Style.CardsMain>
                </Style.Cards>

            </Style.Main>
            <div>
                <Modal
                    width={"58rem"}
                    visible={isModal}
                    footer={null}
                    // onCancel={handleModalCancel}
                    // style={{ width: showUpdateItem && "fit-content" }}
                    bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
                >
                </Modal>
            </div>

            <Loader isLoading={isLoading} />
        </div >
    );
}

export default AssetListing;
