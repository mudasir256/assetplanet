import React, { useState } from "react";
import ExperienceInfo from "./ExperienceInfo";
import PersonalInfo from "./PersonalInfo";

function EducationalInfo({
  handleDemoObject,
  nextForm,
  preForm,
  setActiveTabData,
}) {
  const educationalInformation = {
    matric: "",
    inter: "",
  };

  const [educationalInfo, setEducationalInfo] = useState(
    educationalInformation
  );

  const handleEducationalInformation = (e) => {
    setEducationalInfo({ ...educationalInfo, [e.target.name]: e.target.value });
  };

  const nextComponent = {
    name: "ExperienceInfo",
    title: "Experience Info",
    unique: "matric",
    isMulti: false,
    component: ExperienceInfo,
  };

  const preComponent = {
    name: "PersonalInfo",
    title: "Personal Info",
    unique: "matric",
    isMulti: false,
    component: PersonalInfo,
  };

  const getData = () => {
    handleDemoObject(educationalInfo);
    nextForm(nextComponent);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
        rowGap: "1rem",
      }}
    >
      <div>Educational Information</div>

      <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
        <input
          name="matric"
          onChange={(event) => handleEducationalInformation(event)}
        />
        <input
          name="inter"
          onChange={(event) => handleEducationalInformation(event)}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              preForm(preComponent);
            }}
          >
            Previous
          </button>

          <button onClick={getData}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default EducationalInfo;
