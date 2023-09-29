import React, { useEffect, useState } from "react";
import tag from "./tag/tag";
import value from "./value/value";
import warranty from "./warranty/warranty";
import itemAdd from "./item-add";
import FormHeader from "../../../../styled-components/form-header/form-header";
import RightSidebar from "../../../../styled-components/right-sidebar/right-sidebar";
import useActiveTabs from "../../../../../hooks/active-tabs";
// import { useParams } from "react-router";
import { useLocation } from "react-router-dom";

function ItemUpdate(props) {
  // const { isUpdate, editItem, data, property } = props;
  const location = useLocation();
  const { isUpdate, editItem, data, property } = location.state;
  const itemId = editItem.data.id;
  console.log(isUpdate, "isUpdate");
  console.log("propsssssssssss", props);
  console.log("data in update item>>", data);
  console.log("location", location);
  const [activeTabData, setActiveTabData] = useState({
    name: "generalInformation",
    title: "General Information",
    unique: "firstName",
    isMulti: false,
    component: itemAdd,
  });
  console.log("editItem", editItem);

  const [itemsAddData, setItemsAddData] = useState({
    generalInformation: {
      name: "generalInformation",
      title: "General Information",
      unique: "firstName",
      isMulti: false,
      dataProp: location,
      component: itemAdd,
      data: [
        {
          Name: "",
          UniversalProductCode: "",
          SerialNumber: "",
          Owner: "",
          Brand: "",
          Model: "",
          SpecialFeatures: "",
          Property: "",
          Room: "",
          UploadImage: "",
          UploadVideo: "",
        },
      ],
    },
    valueDetails: {
      name: "valueDetails",
      title: "Value",
      unique: "firstName",
      isMulti: false,
      component: value,
      data: [
        {
          Quantity: "",
          PricePaid: "",
          CurrentValue: "",
          Condition: "",
          Appreciation: "",
          AppraisalSource: "",
          AppraisalDate: "",
          Appraisal: "",
        },
      ],
    },
    warranty: {
      name: "warranty",
      title: "Warranty",
      unique: "firstName",
      component: warranty,
      isMulti: false,
      data: [
        {
          PurchaseDate: "",
          PurchaseLocation: "",
          WarrantyProviders: "",
          WarrantyPeriod: "",
          CustomerSupportPhone: "",
          WebsiteURL: "",
          ReturnDate: "",
          Receipt: "",
        },
      ],
    },
    tag: {
      name: "tag",
      title: "Tag",
      unique: "matric",
      isMulti: false,
      dataProp: location,
      component: tag,
      data: [
        {
          TagName: "",
        },
      ],
    },
  });
  useEffect(() => {
    if (isUpdate && editItem.data) {
      console.log("editItem in useEffect", editItem);
      setItemsAddData({
        generalInformation: {
          name: "generalInformation",
          title: "General Information",
          unique: "firstName",
          isMulti: false,
          dataProp: location,
          component: itemAdd,
          data: [
            {
              Name: editItem.data.name,
              UniversalProductCode: editItem.data.upc,
              SerialNumber: editItem.data.serialNumber,
              Owner: editItem.data.ownerName,
              Brand: editItem.data.brandName,
              Model: editItem.data.model,
              SpecialFeatures: editItem.data.specialFeatures,
              Property: property.name,
              Room: property.name && property.room.name,
              UploadImage: editItem.data.images && editItem.data.images,
              UploadVideo: editItem.data.videos && editItem.data.videos,
            },
          ],
        },
        valueDetails: {
          name: "valueDetails",
          title: "Value",
          unique: "firstName",
          isMulti: false,
          component: value,
          data: [
            {
              Quantity: editItem.data.quantity,
              PricePaid: editItem.data.pricePaid,
              CurrentValue: editItem.data.currentValue,
              Condition: editItem.data.condition,
              Appreciation: editItem.data.appreciationDepreciation,
              AppraisalSource: editItem.data.appraisalSource,
              AppraisalDate: editItem.data.appraisalDate,
              Appraisal: editItem.data.appraisal,
            },
          ],
        },
        warranty: {
          name: "warranty",
          title: "Warranty",
          unique: "firstName",
          component: warranty,
          isMulti: false,
          data: [
            {
              PurchaseDate: editItem.data.purchaseDate,
              PurchaseLocation: editItem.data.purchaseLocation,
              WarrantyProviders: editItem.data.warrantyProviders,
              WarrantyPeriod: editItem.data.warrantyPeriod,
              CustomerSupportPhone: editItem.data.customerSupportPhone,
              WebsiteURL: editItem.data.websiteURL,
              ReturnDate: editItem.data.returnEndDate,
              Receipt: editItem.data.reciept,
            },
          ],
        },
        tag: {
          name: "tag",
          title: "Tag",
          unique: "matric",
          isMulti: false,
          dataProp: location,
          component: tag,
          data: [
            {
              TagName: editItem.data.tags,
            },
          ],
        },
      });
    }
  }, [props, location]);
  const [rightToggleClass, setRightToggleClass] = useState(false);
  const [allFormsData, setAllFormsData] = useState(itemsAddData);
  useEffect(() => {
    console.log("hgjfdghsdhkj", JSON.stringify(itemsAddData));
    setAllFormsData(itemsAddData);
  }, [itemsAddData]);
  console.log(allFormsData, "allFormsData");
  const [activeTabsArray, setActiveTabsArray] = useState([
    "generalInformation",
  ]);

  const ActiveComponent = activeTabData.component;
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };

  const tabsArray = Object.values(itemsAddData);

  //  pass all tabs array and selected tab name to useActiveTabs hook
  //  useActiveTabs Hook will return all previous tabs with selected tab
  const handleActiveTabsArray = (name) => {
    const activeTabs = useActiveTabs(tabsArray, name);

    setActiveTabsArray([...activeTabs]);
  };

  const nextForm = (nextFormData) => {
    setActiveTabData(nextFormData);

    const activeTabs = useActiveTabs(tabsArray, nextFormData.name);

    setActiveTabsArray([...activeTabs]);
  };
  const preForm = (previousFormData) => {
    setActiveTabData(previousFormData);

    const activeTabs = useActiveTabs(tabsArray, previousFormData.name);

    setActiveTabsArray([...activeTabs]);
  };

  // pass all form data of one component and update in main object (allFormsData)
  const handleItemsAddObject = (pageData) => {
    // setAllFormsData((formData) => {
    //   return {
    //     ...formData,
    //     [activeTabData.name]: {
    //       ...formData[activeTabData.name],
    //       [activeTabData.name]: activeTabData.isMulti
    //         ? {
    //             ...formData[activeTabData.name][activeTabData.name],
    //             [pageData[activeTabData.unique]]: pageData,
    //           }
    //         : { [pageData[activeTabData.unique]]: pageData },
    //     },
    //   };
    // });

    setAllFormsData((formData) => {
      console.log("formData", formData);
      console.log("activeTabData", activeTabData);
      return {
        ...formData,
        [activeTabData.name]: {
          ...formData[activeTabData.name],
          data: activeTabData.isMulti ? pageData : [pageData],
        },
      };
    });
  };

  console.log("allFormsData", allFormsData);

  return (
    <>
      <div
        className={
          rightToggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <div>{location.id}</div>

        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <FormHeader
            headerData={itemsAddData}
            activeTabData={activeTabData}
            setActiveTabData={setActiveTabData}
            activeTabsArray={activeTabsArray}
            handleActiveTabsArray={handleActiveTabsArray}
          />
        </div>
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <ActiveComponent
            handleItemsAddObject={handleItemsAddObject}
            data={allFormsData}
            nextForm={nextForm}
            preForm={preForm}
            activeTabData={activeTabData}
            // prevData={itemsAddData}
            itemId={itemId}
            isUpdate={true}
          />
        </div>
        {/* <div className="form-page--right-side custom">
          <span
            className="right-side-collapse-icon"
            onClick={handleRightToggleClass}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            <RightSidebar data={allFormsData} />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ItemUpdate;
