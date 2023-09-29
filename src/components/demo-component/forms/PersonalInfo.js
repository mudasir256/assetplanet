import React, { useState } from "react";
import EducationalInfo from "./EducationalInfo";

function PersonalInfo({ handleDemoObject, data,nextForm,activeTabData }) {
  const uniqueKey = Object.keys(data.PersonalInfo.PersonalInfo)[0];
  const personalInfoObj = data.PersonalInfo.PersonalInfo[uniqueKey];
  const activeTab = activeTabData.name

  const personalInformation = {
    // firstName: personalInfoObj && personalInfoObj.firstName,
    firstName: "name",
    lastName: personalInfoObj && personalInfoObj.lastName,
  };

  const [personalInfo, setPersonalInfo] = useState({
    firstName:"asghar",
    lastName:"afzal"
  });

  const handlePersonalInformation = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };


  const nextComponent = {
    name: "EducationalInfo",
        title: "Educational Info",
        unique: "matric",
        isMulti: false,
        component: EducationalInfo,
  }
  const getData = () => {
    handleDemoObject(personalInfo);
    nextForm(nextComponent)
  };


  // useEffect(() => {
  //   setActiveTabData({
  //     name: "PersonalInfo",
  //     title: "Personal Info",
  //     unique: "firstName",
  //     isMulti: false,
  //     component: PersonalInfo,
  //   })
  // })

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
      <div>Personal Information</div>

      <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
        <input
          name="firstName"
          onChange={(event) => handlePersonalInformation(event)}
          value={personalInfo.firstName}
        />
        <input
          name="lastName"
          onChange={(event) => handlePersonalInformation(event)}
          value={personalInfo.lastName}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
         
          

          <button onClick={getData}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
