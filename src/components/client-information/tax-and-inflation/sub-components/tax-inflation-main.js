import React, { useState } from "react";
import TaxInformation from "./tax-information/tax-information";
import TaxCredits from "./tax-credits/tax-credits";
import CapitalGains from "./capital-gains/capital-gains";
import CarryForward from "./carry-forward/carry-forward";
import InflationRates from "./inflation-rates/inflation-rates";
import FormHeader from "../../../styled-components/form-header/form-header";
import RightSidebar from "../../../styled-components/right-sidebar/right-sidebar";
import useActiveTabs from "../../../../hooks/active-tabs";

function TaxInflationMain() {
  const [activeTabData, setActiveTabData] = useState({
    name: "taxInformation",
    title: "Tax Information",
    unique: "firstName",
    isMulti: false,
    component: TaxInformation,
  });

  const ActiveComponent = activeTabData.component;

  const [rightToggleClass, setRightToggleClass] = useState(false);
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };

  const taxInflationData = { 
    taxInformation: {
      name: "taxInformation",
      title: "Tax Information",
      unique: "firstName",
      isMulti: false,
      component: TaxInformation,
      data: [
        {
          "State Taxation": "Alaska",
          "Tax Filling Election": "Single",
          Deductions: "Itemized",
          "State Tax Effective Rate": 19,
          "Federal Tax Rate": 50,
          "Total Tax Rate": 70,
          "Federal Collectible Tax Rate": 100,
          "Gross Income": 10,
        },
      ],
    },
    taxCredits: {
      name: "taxCredits",
      title: "Tax Credits",
      unique: "Other Tax Credit",
      isMulti: true,
      component: TaxCredits,
      data: [
        {
          "Other Tax Credit": "600",
          "Amount Of Credit": "200",
          "Whose Credit": "50",
        },
        {
          "Other Tax Credit": "20",
          "Amount Of Credit": "200",
          "Whose Credit": "560",
        },
        {
          "Other Tax Credit": "690",
          "Amount Of Credit": "200",
          "Whose Credit": "50",
        },
      ],
    },
    capitalGains: {
      name: "capitalGains",
      title: "Capital Gains",
      unique: "firstName",
      component: CapitalGains,
      isMulti: false,
      data: [
        {
          "Subject to Cap Gains": "50",
          "Gains Rate Federal": "80",
          "Gains Rate State": "10",
        },
      ],
    },
    carryForward: {
      name: "carryForward",
      title: "Carry Forward",
      unique: "matric",
      isMulti: false,
      component: CarryForward,
      data: [
        {
          "Total Carry Forward": "50",
          "Short Term Carry Forward": "80",
          "Long Term Carry Forward": "10",
          "Carry Forward Updated": "09/12/22",
          "Carry Forward Loss Notes": "Sample Notes",
        },
      ],
    },
    inflationRates: {
      name: "inflationRates",
      title: "Inflation Rates",
      unique: "firstName",
      component: InflationRates,
      isMulti: false,
      data: [
        {
          "General Inflation": "Static",
          "General Inflation Rate": "50",
          "Medical Inflation": "Federal",
          "Medical Inflation Rate": "100",
          "Education Inflation": "Static",
          "Education Inflation Rate": "Static",
          "Luxury Inflation": "Static",
          "Luxury Inflation Rate": "55",
          "Housing Inflation": "Static",
          "Housing Inflation Rate": "77",
        },
      ],
    },
  };

  const [allFormsData, setAllFormsData] = useState(taxInflationData);

  const tabsArray = Object.values(taxInflationData);
  const [activeTabsArray, setActiveTabsArray] = useState(["taxInformation"]);

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
  const handleTaxInflationObject = (pageData) => {
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
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <FormHeader
            headerData={taxInflationData}
            activeTabData={activeTabData}
            setActiveTabData={setActiveTabData}
            activeTabsArray={activeTabsArray}
            handleActiveTabsArray={handleActiveTabsArray}
          />
        </div>
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <ActiveComponent
            handleTaxInflationObject={handleTaxInflationObject}
            data={allFormsData}
            nextForm={nextForm}
            preForm={preForm}
            activeTabData={activeTabData}
          />
        </div>
        <div className="form-page--right-side custom">
          <span
            className="right-side-collapse-icon"
            onClick={handleRightToggleClass}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            <RightSidebar data={allFormsData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaxInflationMain;
