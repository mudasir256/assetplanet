import React, { useState } from "react";
import { Button } from "../../../../styled-components/button";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import UserDefined from "../user-defined/user-defined";
import StaticReturnRate from "../static-return-rate/static-return-rate";
import * as Style from "./styles/professional-prediction";
import { InputGroup } from "../../../../styled-components/input/styles/input";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { Text } from "../../../../styled-components/text";
import Input  from "../../../../styled-components/input/input";

function ProfessionalPredictions({
  handleRatesOfReturnObject,
  nextForm,
  preForm,
  data,
}) {
  const { styles } = defaultStyles;
  const uniqueKey = Object.keys(data.professionalPredictions.data)[0];
  const professionalPredictionsObj =
    data.professionalPredictions.data[uniqueKey];

  const [professionalPredictionsData, setProfessionalPredictionsData] =
    useState({
      "Professional Predictions":
        professionalPredictionsObj &&
        professionalPredictionsObj["Professional Predictions"],
      "Prediction File":
        professionalPredictionsObj &&
        professionalPredictionsObj["Prediction File"],
    });

  const handleProfessionalPredictionsInfo = (obj) => {
    const { name, value } = obj;

    setProfessionalPredictionsData({
      ...professionalPredictionsData,
      [name]: value,
    });
  };
  const preComponent = {
    name: "staticReturnRate",
    title: "Static Return Rate",
    isMulti: false,
    component: StaticReturnRate,
  };

  const nextComponent = {
    name: "userDefined",
    title: "User Defined",
    isMulti: false,
    component: UserDefined,
  };

  const submitData = () => {
    handleRatesOfReturnObject(professionalPredictionsData);
    nextForm(nextComponent);
  };

  const professionalPredictionList = [
    { id: 1, name: "Asset Planet Investment Committee" },
    { id: 1, name: "Christopher Antoniou Pissarides" },
    { id: 1, name: "Williams Forsyth Sharpe" },
  ];

  const fields = [
    {
      Component: DropDown,
      value: {
        name: "Professional Predictions",
        title: "Professional Predictions",
        value: professionalPredictionsData["Professional Predictions"],
        setSelectedItem: handleProfessionalPredictionsInfo,
        list: professionalPredictionList,
        displayKey: "name",
      },
    },
    {
      Component: Input,
      name: "Prediction File",
      title: "Prediction File",
      value: professionalPredictionsData["Prediction File"],
      type: "file",
      onChange: (event) => handleProfessionalPredictionsInfo(event.target),
    },
  ];

  return (
    <Style.MainContainer>
      <Text style={styles.text.formHeaderText} padding="2rem 0">
        Choose Professional Prediction
      </Text>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component, name, title, type, onChange } = data;
            return (
              <InputGroup key={index}>
                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                  {title || value.title}
                </Text>

                <Component
                  key={index}
                  value={value}
                  name={name}
                  onChange={onChange}
                  type={type}
                />
              </InputGroup>
            );
          })}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
        <Button onClick={() => preForm(preComponent)}>Previuos</Button>
        <Button onClick={submitData}>Next</Button>
      </Style.ButtonsContainer>
    </Style.MainContainer>
  );
}

export default ProfessionalPredictions;
