import React, { useState, useEffect } from "react";
import PersonalInfo from "./forms/PersonalInfo";
import EducationalInfo from "./forms/EducationalInfo";
import ExperienceInfo from "./forms/ExperienceInfo";
import FormHeader from "../styled-components/form-header/form-header";
import RightSidebar from "../styled-components/right-sidebar/right-sidebar";
import useActiveTabs from "../../hooks/active-tabs";

function DemoComponent() {
  const [activeTabData, setActiveTabData] = useState({
    name: "PersonalInfo",
    title: "Personal Info",
    unique: "firstName",
    isMulti: false,
    component: PersonalInfo,
  });

  //   const [activeTab, setActiveTab] = useState(PersonalInfo)
  const [rightToggleClass, setRightToggleClass] = useState(false);
  const handleRightToggleClass = () => {
    setRightToggleClass(!rightToggleClass);
  };

  //   useEffect(() => {

  //     setActiveTab(activeTabData.component)

  //   }, [])

  const ActiveComponent = activeTabData.component;

  // const demoData = [
  //   {
  //     name: "PersonalInfo",
  //     title: "Personal Info",
  //     component: PersonalInfo,
  //     PersonalInfo: [],
  //   },
  //   {
  //     name: "EducationalInfo",
  //     title: "Educational Info",
  //     component: EducationalInfo,
  //     EducationalInfo: [],
  //   },
  //   {
  //     name: "Experience",
  //     title: "Experience",
  //     component: Form3,
  //     Experience: [
  //       { id: 1, name: "asad" },
  //       { id: 2, name: "akif" },
  //     ]
  //   },
  // ];

  const demoData = {
    PersonalInfo: {
      name: "PersonalInfo",
      title: "Personal Info",
      unique: "firstName",
      isMulti: false,
      component: PersonalInfo,
      PersonalInfo: {},
    },
    EducationalInfo: {
      name: "EducationalInfo",
      title: "Educational Info",
      unique: "matric",
      isMulti: false,
      component: EducationalInfo,
      EducationalInfo: {},
    },
    ExperienceInfo: {
      name: "ExperienceInfo",
      title: "Experience Info",
      unique: "firstName",
      component: ExperienceInfo,
      isMulti: true,
      ExperienceInfo: {
        abc: { id: 1, name: "asad" },
        abc1: { id: 2, name: "ali" },
      },
    },
  };

  const [allFormsData, setAllFormsData] = useState(demoData);
  const tabsArray = Object.values(demoData);
  let [activeTabsArray, setActiveTabsArray] = useState(["PersonalInfo"]);
  const handleActiveTabsArray = (name) => {
    const activeTabs = useActiveTabs(tabsArray, name);

    setActiveTabsArray([...activeTabs]);
  };
  const nextForm = (nextFormData) => {
    // const allFormsDataArray = Object.values(allFormsData);

    // for (let i = 0; i < allFormsDataArray.length; i++) {
    //     console.log("nextcomponent1",activeTabData.name);
    //     console.log("nextcomponent2",allFormsDataArray[i].component);

    //   if (allFormsDataArray[i].name === activeTabData.name) {
    //     console.log("nextcomponent3",allFormsDataArray[i + 1].component);
    //     activeTabData.component = allFormsDataArray[i + 1].component;
    //   }
    // }
    const activeTabs = useActiveTabs(tabsArray, nextFormData.name);

    setActiveTabsArray([...activeTabs]);

    setActiveTabData(nextFormData)
  };
   const preForm = (previousFormData) => {
    setActiveTabData(previousFormData)
    const activeTabs = useActiveTabs(tabsArray, previousFormData.name);

    setActiveTabsArray([...activeTabs]);
  };


  const handleDemoObject = (pageData) => {
    console.log("pageData", pageData);
    // for (let i = 0; i < allFormsData.length; i++) {
    //   if (allFormsData[i].name === activeTabData.name) {
    //     console.log("true1", allFormsData[i].name);
    //     console.log("true2", activeTabData.name);
    //     const activeTab = activeTabData.name;
    //     setAllFormsData([
    //       ...allFormsData,
    //       (allFormsData[i][activeTab][0] = {
    //         ...allFormsData[i][activeTab],
    //         ...pageData,
    //       }),
    //     ]);
    //   }
    // }

    setAllFormsData((formData) => {
      console.log("pagedattaa", activeTabData);
      return {
        ...formData,
        [activeTabData.name]: {
          ...formData[activeTabData.name],
          [activeTabData.name]: activeTabData.isMulti
            ? {
                ...formData[activeTabData.name][activeTabData.name],
                [pageData[activeTabData.unique]]: pageData,
              }
            : { [pageData[activeTabData.unique]]: pageData },
        },
      };
    });

  };

  console.log("allFormsData ", allFormsData);

  return (
    <>
      <div
        className={
          rightToggleClass
            ? "form-page-container-wrap right-side--opend"
            : "form-page-container-wrap right-side--collapsed"
        }
      >
        <FormHeader headerData={demoData} setActiveTabData={setActiveTabData}           activeTabsArray={activeTabsArray}
          handleActiveTabsArray={handleActiveTabsArray}/>
        <ActiveComponent
          handleDemoObject={handleDemoObject}
          data={allFormsData}
          nextForm={nextForm}
          preForm={preForm}
          activeTabData={activeTabData}
        />
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

export default DemoComponent;
