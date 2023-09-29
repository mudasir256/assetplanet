import { Button } from "antd";
import React, { useEffect, useState } from "react";
import warranty from "../warranty/warranty";
import * as Style from "./styles/tag";
import { MODULE_API } from "../../../../../../apis";
import Loader from "../../../../../styled-components/loader/loader";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import crossIcn from "../../../../../../assets/images/crossIcin.png";
import { useSelector } from "react-redux";

function tag({
  handleItemsAddObject,
  preForm,
  data,
  // prevData,
  itemId,
  isUpdate,
}) {
  const { roomsInfo } = useSelector((state) => state.rootReducer);
  // console.log("roomsInfo", roomsInfo);
  // console.log("prevData", prevData);
  // console.log(
  //   "data in tagssss",
  //   data.generalInformation,
  //   data.valueDetails,
  //   data.warranty,
  //   data.tags
  // );
  const history = useHistory();
  const title = isUpdate ? "Update Item" : "Add New Item";
  const uniqueKey = Object.keys(data.tag.data)[0];
  const generalInfoJob = data.tag.data[uniqueKey];
  const [oldTags, setOldTags] = useState([]);
  const [tagsArray, setTagsArray] = useState([]);
  const [tagVal, setTagVal] = useState("");
  // setOldTags([]);

  console.log("data", data);
  useEffect(() => {
    showPill(true);
    setTagsArray((data && data.tag.data && data.tag.data[0].TagName) || []);
  }, [data]);
  // console.log("oldTags", oldTags);

  const [tagsData, setTagsData] = useState({
    TagName: generalInfoJob && generalInfoJob["TagName"],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [tagName, setTagName] = useState("");
  const [pill, showPill] = useState(false);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      showPill(true);
      // setTagName(tagsData.TagName);
      // console.log("tagsDatas", tagsData.TagName);
      // if (tagsData.TagName.length !== 0) {
      //   console.log(tagsArray);
      //   setTagsArray([...tagsArray, tagsData.TagName]);

      //   tagsData.TagName = [];
      // }
      createTag();
    }
  };

  const deleteTag = (i) => {
    console.log("index", i);
    setTagsArray((tags) => {
      tags.splice(i, 1);
      console.log("hgg", JSON.stringify(tags));
      handleItemsAddObject({ TagName: [...tags] });
      return [...tags];
    });
    console.log("tagsArray", tagsArray);
  };

  async function submitForm() {
    setIsLoading(true);
    try {
      console.log("data.tag.data", data);
      handleItemsAddObject(tagsData);
      console.log("tagsData", tagsData);

      let addItem = await MODULE_API.addProperty({
        moduleName: "ITEM",
        body: {
          clientModules: [
            {
              property: data.generalInformation.data[0]["Property"]["id"],
              room: data.generalInformation.data[0]["Room"]["id"],
              name: data.generalInformation.data[0]["Name"],
              ownerName: data.generalInformation.data[0]["Owner"],
              brandName: data.generalInformation.data[0]["Brand"],
              model: data.generalInformation.data[0]["Model"],
              upc: data.generalInformation.data[0]["UniversalProductCode"],
              serialNumber: data.generalInformation.data[0]["SerialNumber"],
              specialFeatures:
                data.generalInformation.data[0]["SpecialFeatures"],
              images: data.generalInformation.data[0]["UploadImage"],
              videos: data.generalInformation.data[0]["UploadVideo"]
                ? data.generalInformation.data[0]["UploadVideo"]
                : [],
              documents: [],
              appraisal: data.valueDetails.data[0]["Appraisal"],
              appraisalDate: data.valueDetails.data[0]["AppraisalDate"],
              appraisalSource: data.valueDetails.data[0]["AppraisalSource"],
              appreciationDepreciation:
                data.valueDetails.data[0]["Appreciation"],
              condition: data.valueDetails.data[0]["Condition"],
              currentValue: data.valueDetails.data[0]["CurrentValue"],
              pricePaid: data.valueDetails.data[0]["PricePaid"],
              quantity: data.valueDetails.data[0]["Quantity"],
              customerSupportPhone:
                data.warranty.data[0]["CustomerSupportPhone"],
              purchaseDate: data.warranty.data[0]["PurchaseDate"],
              purchaseLocation: data.warranty.data[0]["PurchaseLocation"],
              returnEndDate: data.warranty.data[0]["ReturnDate"],
              warrantyPeriod: data.warranty.data[0]["WarrantyPeriod"],
              warrantyProviders: data.warranty.data[0]["WarrantyProviders"],
              websiteURL: data.warranty.data[0]["WebsiteURL"],
              reciept: data.warranty.data[0]["Receipt"]
                ? [...data.warranty.data[0]["Receipt"]]
                : [],
              parentId: roomsInfo.activeRoom.id
                ? roomsInfo.activeRoom.id
                : data.tag.dataProp.state.property.room.id,
              isLoan: false,
              tags: tagsArray,
            },
          ],
        },
      });
      await MODULE_API.getRecordTotal(
        data.tag.dataProp.state.property.room.id,
        { attributes: ["currentValue"] }
      );
      await MODULE_API.getRecordTotal(data.tag.dataProp.state.property.id, {
        attributes: ["total"],
      });
      setIsLoading(false);
      swal("Success!", addItem.messageCode, "success").then((ok) => {
        if (ok) history.push(`/inventory_new`);
      });
    } catch (e) {
      setIsLoading(false);
      console.log("e", e);
    }
  }

  async function submitUpdateForm() {
    console.log("inupdate");
    setIsLoading(true);
    try {
      console.log("data.tag.data", data.tag.data[0]["TagName"]);
      handleItemsAddObject(tagsData);
      console.log("tagsData", tagsData);
      // try {
      //   let addRoom = await MODULE_API.updateClientModule(`${data.id}`, {
      //     name: name,
      //     detail: details,
      //     images: image,
      //     videos: video,
      //     parentId: property,
      //   });
      let updateItem = await MODULE_API.updateClientModule(`${itemId}`, {
        property:
          data.generalInformation.data[0]["Property"] &&
          data.generalInformation.data[0]["Property"]["id"],
        room:
          data.generalInformation.data[0]["Room"] &&
          data.generalInformation.data[0]["Room"]["id"],
        name:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["Name"],
        ownerName:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["Owner"],
        brandName:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["Brand"],
        model:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["Model"],
        upc:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["UniversalProductCode"],
        serialNumber:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["SerialNumber"],
        specialFeatures:
          data.generalInformation.data[0] &&
          data.generalInformation.data[0]["SpecialFeatures"],
        images: data.generalInformation.data[0] && [
          ...data.generalInformation.data[0]["UploadImage"],
        ],
        videos: data.generalInformation.data[0] && [
          ...data.generalInformation.data[0]["UploadVideo"],
        ],
        documents: [],
        appraisal:
          data.valueDetails.data[0] && data.valueDetails.data[0]["Appraisal"],
        appraisalDate:
          data.valueDetails.data[0] &&
          data.valueDetails.data[0]["AppraisalDate"],
        appraisalSource:
          data.valueDetails.data[0] &&
          data.valueDetails.data[0]["AppraisalSource"],
        appreciationDepreciation:
          data.valueDetails.data[0]["Appreciation"] &&
          data.valueDetails.data[0]["Appreciation"],
        condition:
          data.valueDetails.data[0]["Condition"] &&
          data.valueDetails.data[0]["Condition"],
        currentValue:
          data.valueDetails.data[0] &&
          data.valueDetails.data[0]["CurrentValue"],
        pricePaid:
          data.valueDetails.data[0] && data.valueDetails.data[0]["PricePaid"],
        quantity:
          data.valueDetails.data[0] && data.valueDetails.data[0]["Quantity"],
        customerSupportPhone:
          data.warranty.data[0] &&
          data.warranty.data[0]["CustomerSupportPhone"],
        purchaseDate:
          data.warranty.data[0] && data.warranty.data[0]["PurchaseDate"],
        purchaseLocation:
          data.warranty.data[0] && data.warranty.data[0]["PurchaseLocation"],
        returnEndDate:
          data.warranty.data[0] && data.warranty.data[0]["ReturnDate"],
        warrantyPeriod:
          data.warranty.data[0] && data.warranty.data[0]["WarrantyPeriod"],
        warrantyProviders:
          data.warranty.data[0] && data.warranty.data[0]["WarrantyProviders"],
        websiteURL:
          data.warranty.data[0] && data.warranty.data[0]["WebsiteURL"],
        reciept: data.warranty.data[0] &&
          data.warranty.data[0]["Receipt"] && [
            ...data.warranty.data[0]["Receipt"],
          ],
        parentId: data.tag.dataProp.state.property.room.id,
        isLoan: false,
        tags: tagsArray ? tagsArray : [],
      });
      await MODULE_API.getRecordTotal(
        data.tag.dataProp.state.property.room.id,
        { attributes: ["currentValue"] }
      );
      await MODULE_API.getRecordTotal(data.tag.dataProp.state.property.id, {
        attributes: ["total"],
      });
      setIsLoading(false);
      swal("Success!", updateItem.messageCode, "success").then((ok) => {
        if (ok) history.push(`/inventory_new`);
      });
    } catch (e) {
      // console.log("====================================");
      // console.log("error in update API call", e);
      // console.log("====================================");
      setIsLoading(false);
      // console.log("e", e);
    }
  }

  const preComponent = {
    name: "warranty",
    title: "Warranty",
    unique: "firstName",
    isMulti: false,
    component: warranty,
    warranty: {},
  };
  const handleTag = (obj) => {
    console.log("obj", obj);
    const { name, value } = obj;
    setTagVal(() => value);
    // setTagsData({
    //   ...tagsData,
    //   [name]: value,
    // });
    // console.log("setTagsData", setTagsData);
  };
  const createTag = () => {
    console.log("in tag");
    showPill(true);
    // console.log("tagsData", tagsData);
    // setTagName(tagsData.TagName);
    // console.log("tagName", tagName);
    // if (tagsData.TagName.length !== 0) {
    //   setTagsArray([...tagsArray, tagsData.TagName]);
    //   tagsData.TagName = [];
    // }
    if (tagVal) {
      setTagsArray((tags) => {
        handleItemsAddObject({ TagName: [...tags, tagVal] });
        return [...tags, tagVal];
      });
      setTagVal(() => "");
    }
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
          <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Add Tags</h4>
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
              style={{ display: "flex", flexDirection: "column", width: "97%" }}
            >
              <div>
                <h5>Tag Name:</h5>
              </div>
              <Style.InputBorder
                style={{
                  borderRadius: "0.5rem",
                  width: "100%",
                  height: "3.5rem",
                  display: "flex",
                  paddingLeft: "1rem",
                  marginTop: "0.3rem",
                  backgroundColor: "white",
                }}
              >
                <Style.Input
                  style={{ outline: "none", border: "none", width: "97%" }}
                  placeholder="Enter Tag Name"
                  onChange={(event) => handleTag(event.target)}
                  name="TagName"
                  value={tagVal}
                  onKeyPress={handleKeypress}
                />
                <Button
                  onClick={createTag}
                  style={{
                    backgroundColor: "#39b54a",
                    borderRadius: "0.5rem",
                    width: "3.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "32px",
                    height: "3.5rem",
                  }}
                >
                  +
                </Button>
              </Style.InputBorder>
            </div>
          </div>
          {pill ? (
            <div
              style={{
                display: "flex",
                // flexDirection: "column",
                justifyContent: "flex-start",
                flexDirection: "column",
                width: "80%",
                rowGap: "1rem",
              }}
            >
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: "19px" }}>Tags</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  columnGap: "1rem",
                }}
              >
                {/* {console.log("tagsArraysss", tagsArray)} */}
                {tagsArray &&
                  tagsArray.map((tag, index) => (
                    <div
                      style={{
                        display: "flex",
                        columnGap: "1rem",
                      }}
                      key={index}
                    >
                      <div
                        style={{
                          backgroundColor: "#39b54a",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.6rem",
                          color: "white",
                        }}
                      >
                        {tag}
                        <img
                          style={{
                            padding: "0 0 0.1rem 1rem",
                            width: "1.6rem",
                          }}
                          src={crossIcn}
                          onClick={() => deleteTag(index)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
        {/* <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            columnGap: "1rem",
          }}
        >
          {oldTags.length > 0 &&
            oldTags.map((item) => (
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  marginLeft: "7rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#39b54a",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.6rem",
                    color: "white",
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
        </div> */}

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
                onClick={() => preForm(preComponent)}
              >
                Previous
              </Style.Btn>
            </div>

            <div
              style={{ display: "flex", justifyContent: "end", width: "87.5%" }}
            >
              {isUpdate ? (
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
                    // console.log("====================================");
                    // console.log("hehehehe");
                    // console.log("====================================");
                    submitUpdateForm();
                  }}
                >
                  Update
                </Style.Btn>
              ) : (
                <Style.Btn
                  style={{
                    border: "none",
                    width: "10rem",
                    height: "2rem",
                    borderRadius: "0.6rem",
                    color: "white",
                    backgroundColor: "#39b54a",
                  }}
                  onClick={() => submitForm()}
                >
                  Save
                </Style.Btn>
              )}
            </div>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
}

export default tag;
