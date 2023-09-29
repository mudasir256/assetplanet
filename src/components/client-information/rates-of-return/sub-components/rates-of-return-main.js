import React, { useState } from "react";
import useActiveTabs from "../../../../hooks/active-tabs";
import RightSidebar from "../../../styled-components/right-sidebar/right-sidebar";
import FormHeader from "../../../styled-components/form-header/form-header";
import StaticReturnRate from "./static-return-rate/static-return-rate";
import ProfessionalPredictions from "./professional-prediction/professional-predictions";
import UserDefined from "./user-defined/user-defined";
import MonteCarlo from "./monte-carlo/monte-carlo";

function TaxInflationMain() {
  const [activeTabData, setActiveTabData] = useState({
    name: "staticReturnRate",
    title: "Static Rate of Return",
    isMulti: false,
    component: StaticReturnRate,
  });

  const ActiveComponent = activeTabData.component;

  const [rightToggleClass, setRightToggleClass] = useState(false);
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };

  const ratesOfReturnData = {
    staticReturnRate: {
      name: "staticReturnRate",
      title: "Static Rate of Return",
      isMulti: false,
      component: StaticReturnRate,
      data: [
        {
          Static: 345,
        },
      ],
    },
    professionalPredictions: {
      name: "professionalPredictions",
      title: "Professional Predictions",
      isMulti: false,
      component: ProfessionalPredictions,
      data: [
        {
          "Professional Predictions": "William Forsyth Sharpe",
          "Prediction File": "abc.doc",
        },
      ],
    },
    userDefined: {
      name: "userDefined",
      title: "User Defined",
      component: UserDefined,
      isMulti: true,
      data: [],
    },
    monteCarlo: {
      name: "monteCarlo",
      title: "Monte Carlo",
      isMulti: true,
      component: MonteCarlo,
      data: [
        {
          "Description": "sample",
          "How Many Years": "15",
          "High Band": "8",
          "Low Band": "6",
          "Expected Average": "80",
          "Start Year": "2019",
          "Average": "85",
        },{
          "Description": "sample",
          "How Many Years": "15",
          "High Band": "9",
          "Low Band": "6",
          "Expected Average": "85",
          "Start Year": "2019",
          "Average": "90",
        }
      ],
    },
    
  };

  const [allFormsData, setAllFormsData] = useState(ratesOfReturnData);

  const tabsArray = Object.values(ratesOfReturnData);
  const [activeTabsArray, setActiveTabsArray] = useState(["staticReturnRate"]);

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
  const handleRatesOfReturnObject = (pageData) => {

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
            headerData={ratesOfReturnData}
            activeTabData={activeTabData}
            setActiveTabData={setActiveTabData}
            activeTabsArray={activeTabsArray}
            handleActiveTabsArray={handleActiveTabsArray}
          />
        </div>
        <div style={{ paddingRight: rightToggleClass ? "400px" : "0px" }}>
          <ActiveComponent
            handleRatesOfReturnObject={handleRatesOfReturnObject}
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
