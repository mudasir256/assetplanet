import React, { useEffect, useState } from "react";
import * as Style from "./styles/items";
// import { useLocation } from "react-router-dom";
import { MODULE_API } from "../../../../../apis";
import { Button } from "../../../../styled-components/button";
import "../../../../../components/form/inventory/inventory.style.css";
import StyledRow from "../../../../styled-components/styled-row/styled-row";
import { useSelector } from "react-redux";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { Text } from "../../../../styled-components/text";
import AddSimpleModal from "../../../../styled-components/modal/add-simple-modal/add-simple-modal";
import IconInput from "../../../../styled-components/input/icon-input";
import swal from "sweetalert";
import Loader from "../../../../styled-components/loader/loader";

function Items() {
  const [isLoading, setIsLoading] = useState(false);
  const [itemsToshow, setItemsToShow] = useState();
  const [allItems, setAllItems] = useState();
  const [message, setMessage] = useState("");
  const [parentId, setParentId] = useState();
  const [selectedItemId, setSelectedItemId] = useState();
  const [collectibleValue, setCollectibleValue] = useState();
  const [itemsData, setItemsData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState("");
  const [attributesFields, setAttributesFields] = useState();
  const [selectedRowData, setSelectedRowData] = useState({});

  const { styles } = defaultStyles;

  //   const location = useLocation();
  const selectedModuleName = useSelector(
    (state) => state.rootReducer.inventory.selectedModuleName
  );
  //   console.log("location mdoule name", location.moduleName);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      let itemsResponce = await MODULE_API.fetchItems({
        moduleName: `${selectedModuleName}_item`,
        pageNum: 1,
        limit: 10,
        body: {},
      });
      console.log("item", itemsResponce);

      if (itemsResponce.status === 200) {
        setIsLoading(false);
        setMessage(itemsResponce.messageCode);
        setAllItems(itemsResponce.records);
        let itemsRecodsToShow = itemsResponce.records.map((itemsRecord) => ({
          "Item Name": itemsRecord["Item Name"],
          Quantity: itemsRecord.Quantity,
          "Price Paid (each)": itemsRecord["Price Paid (each)"],
          "Storage Loaction": itemsRecord["Storage Location"],
          "Updated Value":
            itemsRecord["Update Value (Appraisal or other method, each)"],
          "Est. Total Current value":
            itemsRecord["Estimated Total Current Value"],
        }));
        console.log("itemsRecodsToShow", itemsRecodsToShow);
        const paginationData = itemsResponce.pagination;
        setItemsToShow({
          ["pagination"]: { ...paginationData },
          ["itemsRecords"]: [...itemsRecodsToShow],
        });
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const fetchItemsWithoutUnderscore = async () => {
    try {
      setIsLoading(true);
      let itemsResponce = await MODULE_API.fetchItems({
        moduleName: `${selectedModuleName}`,
        pageNum: 1,
        limit: 10,
        body: {},
      });
      console.log("item without underscore", itemsResponce.status);

      if (itemsResponce.status == 200) {
        console.log("abcccc");
        // setIsLoading(false);
        setParentId(itemsResponce.records[0].id);
        fetchRecordTotal(itemsResponce.records[0].id);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleItemsInfo = (obj) => {
    console.log("in func");

    const { name, value } = obj;

    if (name === "Price Paid (each)") {
      const totalPaid = itemsData["Quantity"] * value;
      // console.log("totalPaid",totalPaid);
      // setItemsData({
      //   ...itemsData,
      //   ["Total Paid"]: totalPaid,
      // });
      itemsData["Total Paid"] = totalPaid;
      selectedRowData["Total Paid"] = totalPaid;
      // setSelectedRowData({
      //   ...selectedRowData,
      //   ["Total Paid"]: totalPaid,
      // });
      const estimatedCurrentValue =
        itemsData["Quantity"] * itemsData["Total Paid"];
      itemsData["Estimated Total Current Value"] = estimatedCurrentValue;
      selectedRowData["Estimated Total Current Value"] = estimatedCurrentValue;

    } else if (name === "Update Value (Appraisal or other method, each)") {
      let estimatedCurrentValue = null;
      if (value === "" || value === 0) {
        estimatedCurrentValue = itemsData["Quantity"] * itemsData["Total Paid"];
      } else {
        estimatedCurrentValue = itemsData["Quantity"] * value;
      }

      itemsData["Estimated Total Current Value"] = estimatedCurrentValue;

      selectedRowData["Estimated Total Current Value"] = estimatedCurrentValue;
    }

    setItemsData({
      ...itemsData,
      [name]: value,
    });
    setSelectedRowData({
      ...selectedRowData,
      [name]: value,
    });
  };
  const handleItemsInfoSelect = (name,value) => {
    // console.log("in func");

    // const { name, value } = obj;

    if (name === "Price Paid (each)") {
      const totalPaid = itemsData["Quantity"] * value;
      // console.log("totalPaid",totalPaid);
      // setItemsData({
      //   ...itemsData,
      //   ["Total Paid"]: totalPaid,
      // });
      itemsData["Total Paid"] = totalPaid;
      selectedRowData["Total Paid"] = totalPaid;
      // setSelectedRowData({
      //   ...selectedRowData,
      //   ["Total Paid"]: totalPaid,
      // });
      const estimatedCurrentValue =
        itemsData["Quantity"] * itemsData["Total Paid"];
      itemsData["Estimated Total Current Value"] = estimatedCurrentValue;
      selectedRowData["Estimated Total Current Value"] = estimatedCurrentValue;

    } else if (name === "Update Value (Appraisal or other method, each)") {
      let estimatedCurrentValue = null;
      if (value === "" || value === 0) {
        estimatedCurrentValue = itemsData["Quantity"] * itemsData["Total Paid"];
      } else {
        estimatedCurrentValue = itemsData["Quantity"] * value;
      }

      itemsData["Estimated Total Current Value"] = estimatedCurrentValue;

      selectedRowData["Estimated Total Current Value"] = estimatedCurrentValue;
    }

    setItemsData({
      ...itemsData,
      [name]: value,
    });
    setSelectedRowData({
      ...selectedRowData,
      [name]: value,
    });
  };
  const handleItemsInfoImageChange = async (obj) => {
    try {
      setIsLoading(true);
      const imageName = obj.files[0];
      let uploadImg = null;
      let formData = new FormData();
      formData.append("image", imageName);

      let img = await MODULE_API.uploadImage(formData);
      if (img && img.status === 200) {
        uploadImg = img.file_url;
        // setItemsData({
        //   ...itemsData,
        //   [imageName]: uploadImg,
        // });
        itemsData[obj.name] = [uploadImg];
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const fetchAttributes = async () => {
    try {
      setIsLoading(true);
      let attributesResponce = await MODULE_API.fetchAttributes(
        `${selectedModuleName}_item`
      );
      console.log("attributes responce", attributesResponce);
      setAttributesFields(attributesResponce);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const fetchRecordTotal = async (recordId) => {
    try {
      setIsLoading(true);
      const recordTotalPayload = {
        attributes: ["Estimated Total Current Value"],
      };
      const recordTotalResponce = await MODULE_API.getRecordTotal(
        recordId,
        recordTotalPayload
      );
      if (recordTotalResponce.status === 200) {
        setCollectibleValue(recordTotalResponce.data.total);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchItemsWithoutUnderscore();
    fetchAttributes();
  }, []);

  const handelCloseModal = () => {
    setShowModal(false);
  };

  const submitData = async () => {
    try {
      console.log("in items submit data");
      setIsLoading(true);
      let itemsDataCopy = { ...itemsData };
      itemsDataCopy["parentId"] = parentId;
      const payload = {
        clientModules: [itemsDataCopy],
      };
      console.log("payload", payload);

      if (modal === "Add Modal") {
        const res = await MODULE_API.createClientItem(
          `${selectedModuleName}_item`,
          payload
        );
        if (res.messageCode === "client.module.created") {
          setIsLoading(false);
          setShowModal(false);
          fetchItems();
          fetchItemsWithoutUnderscore();
          // fetchRecordTotal(parentId);
        }
      } else if (modal === "Update Modal") {
        const res = await MODULE_API.updateClientItem(
          selectedItemId,
          itemsData
        );

        if (res.status === 200) {
          setIsLoading(false);
          setShowModal(false);
          fetchItems();
          fetchItemsWithoutUnderscore();

          // fetchRecordTotal(parentId);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleAddItem = async () => {
    setShowModal(true);
    setSelectedRowData({});
    setItemsData({});
    setModal("Add Modal");
    // try {
    //   setIsLoading(true);
    //   let attributesResponce = await MODULE_API.fetchAttributes(
    //     `${selectedModuleName}_item`
    //   );
    //   console.log("attributes responce", attributesResponce);
    //   setAttributesFields(attributesResponce);
    //   setShowModal(true);
    //   setIsLoading(false);
    // } catch (e) {
    //   setIsLoading(false);
    // }
  };

  const getSelectedRow = async (id) => {
    try {
      setModal("Update Modal");

      const selectedRow =
        allItems &&
        allItems.filter((data, index) => {
          if (index === id) {
            return data;
          }
        });

      setSelectedItemId(selectedRow[0].id);

      delete selectedRow[0].id;
      delete selectedRow[0].isShared;
      delete selectedRow[0].module;

      // const pd = selectedRow[0]["Purchase Date"];
      // const date = new Date(pd);
      // /* Date converted to YYYY-MM-DD format */
      // const pdDateMDY = `${date.getFullYear()}-${date.getDate()}-${
      //   date.getMonth() + 1
      // }`;
      // selectedRow[0]["Purchase Date"] = pdDateMDY;

      setSelectedRowData(selectedRow[0]);
      // setSelectedRowData((current) => {
      //   // 👇️ remove id,isShared,module key from object
      //   const { id, isShared, module, ...rest } = current;

      //   return rest;
      // });
      setShowModal(true);
      setItemsData(selectedRow[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteRow = async (id) => {
    try {
      const selectedRow =
        allItems &&
        allItems.filter((data, index) => {
          if (index === id) {
            return data;
          }
        });

      console.log("selectedRow to delete", selectedRow);
      const payload = {
        clientModules: [selectedRow[0].id],
      };

      swal({
        title: "Are you sure?",
        text: "You want to delete this item.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          setIsLoading(true);
          let res = await MODULE_API.deleteItem(payload);
          if (res.status === 200) {
            setIsLoading(false);
            fetchItems();
            fetchRecordTotal(parentId);
          }
        } else {
          // swal("Your imaginary file is safe!");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log("itemsData", itemsData);
  console.log("selected row data", selectedRowData);
  console.log("parentId", parentId);
  console.log("allItems", allItems);
  return (
    <>
      {/* {isLoading ? <div class="loader" ng-hide="data.length > 0"></div> : null} */}
      <Loader isLoading={isLoading} />

      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //   rowGap: "1rem",
            marginTop: "2rem",
          }}
        >
          <p style={{ fontSize: "1.5rem", backgroundColor: "#4cba5b", color: "white", padding: "0.5rem 2rem", borderTopLeftRadius: "50%" }}>{selectedModuleName}</p>
          <div style={{ fontSize: "1.2rem" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
              Total Items :{" "}
            </span>{" "}
            {itemsToshow && itemsToshow.pagination.total}
          </div>
          <div style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
              Collectible Value :{" "}
            </span>
            {/* 57.000 */}
            {collectibleValue && collectibleValue}
          </div>

          <Style.FieldsContainer>
            <Text>Add New {selectedModuleName}</Text>
            <Button style={styles.button.sqaureButton} onClick={handleAddItem}>
              +
            </Button>
          </Style.FieldsContainer>

          {message &&
            (itemsToshow === undefined ||
              itemsToshow.itemsRecords.length === 0) ? (
            <div
              style={{ fontSize: "1.7rem", marginTop: "2rem", color: "black" }}
            >
              {" "}
               No Data Found
            </div>
          ) : null}

          {/* <Style.Title>Items</Style.Title> */}
          {/* <Button>Add Item</Button> */}
        </div>

        <Style.CardContainer>
          {itemsToshow &&
            itemsToshow.itemsRecords.map((item, index) => (
              <StyledRow
                key={index}
                item={item}
                allItems={allItems}
                getSelectedRow={getSelectedRow}
                deleteRow={deleteRow}
                index={index}
                image="required"
              />
            ))}
        </Style.CardContainer>
      </div>
      <AddSimpleModal
        show={showModal}
        close={handelCloseModal}
        modalTitle={modal === "Add Modal" ? "Add Item" : "Update Item"}
        fields={attributesFields}
        onChange={handleItemsInfo}
        onSelectChange={handleItemsInfoSelect}
        submitData={submitData}
        selectedRowData={selectedRowData}
        handleItemsInfoImageChange={handleItemsInfoImageChange}
      />
    </>
  );
}

export default Items;
