import React, { useState } from "react";
import IconInput from "../../../../styled-components/input/icon-input";
import DropDown from "../../../../styled-components/dropdown/dropdown";
import { InputGroup } from "../../../../styled-components/input/styles/input";
import * as Style from "./styles/inflation-rates";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { Text } from "../../../../styled-components/text";
import { Button } from "../../../../styled-components/button";
import CarryForward from "../carry-forward/carry-forward";

function InflationRates({ handleTaxInflationObject,preForm,data }) {

  const uniqueKey = Object.keys(data.inflationRates.data)[0];
  const inflationRatesObj = data.inflationRates.data[uniqueKey];
  // const inflationRatesObj = {
  //   "General Inflation": "",
  //   "General Inflation Rate": "",
  //   "Medical Inflation": "",
  //   "Medical Inflation Rate": "",
  //   "Education Inflation": "",
  //   "Education Inflation Rate": "",
  //   "Luxury Inflation": "",
  //   "Luxury Inflation Rate": "",
  //   "Housing Inflation": "",
  //   "Housing Infaltion Rate": "",
  // };

  const [inflationRatesData, setInflationRatesData] =
    useState(
      {
        "General Inflation": inflationRatesObj && inflationRatesObj["General Inflation"],
        "General Inflation Rate": inflationRatesObj && inflationRatesObj["General Inflation Rate"],
        "Medical Inflation": inflationRatesObj && inflationRatesObj["Medical Inflation"],
        "Medical Inflation Rate": inflationRatesObj && inflationRatesObj["Medical Inflation Rate"],
        "Education Inflation": inflationRatesObj && inflationRatesObj["Education Inflation"],
        "Education Inflation Rate": inflationRatesObj && inflationRatesObj["Education Inflation Rate"],
        "Luxury Inflation": inflationRatesObj && inflationRatesObj["Luxury Inflation"],
        "Luxury Inflation Rate": inflationRatesObj && inflationRatesObj["Luxury Inflation Rate"],
        "Housing Inflation": inflationRatesObj && inflationRatesObj["Housing Inflation"],
        "Housing Infaltion Rate": inflationRatesObj && inflationRatesObj["Housing Infaltion Rate"],
      }
    );

  const { styles } = defaultStyles;

  const handleInflationRatesInfo = (obj) => {
    const { name, value } = obj;

    setInflationRatesData({
      ...inflationRatesData,
      [name]: value,
    });
  };

  const professionList = [
    { id: 1, name: "Bookkeeper" },
    { id: 2, name: "CPA" },
    { id: 3, name: "Financial Advisor" },
  ];


  const preComponent = {
    name: "carryForward",
    title: "Carry Forward",
    unique: "matric",
    isMulti: false,
    component: CarryForward,
    carryForward: {},
  }

  const fields = [
    {
      Component: DropDown,
      value: {
        name: "General Inflation",
        title: "General Inflation",
        value: inflationRatesData["General Inflation"],
        setSelectedItem: handleInflationRatesInfo,
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        name: "General Inflation Rate",
        title: "Rate",
        icon: "%",
        value: inflationRatesData["General Inflation Rate"],
        iconPosition: "end",
        onChange: (event) => handleInflationRatesInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        name: "Medical Inflation",
        title: "Medical Inflation",
        setSelectedItem: handleInflationRatesInfo,
        value: inflationRatesData["Medical Inflation"],
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Medical Inflation Rate",
        title: "Rate",
        icon: "%",
        value: inflationRatesData["Medical Inflation Rate"],
        iconPosition: "end",
        onChange: (event) => handleInflationRatesInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        name: "Education Inflation",
        title: "Education Inflation",
        setSelectedItem: handleInflationRatesInfo,
        value: inflationRatesData["Education Inflation"],
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Education Inflation Rate",
        title: "Rate",
        icon: "%",
        value: inflationRatesData["Education Inflation Rate"],
        iconPosition: "end",
        onChange: (event) => handleInflationRatesInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        name: "Luxury Inflation",
        title: "Luxury Inflation",
        setSelectedItem: handleInflationRatesInfo,
        value: inflationRatesData["Luxury Inflation"],
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Luxury Inflation Rate",
        icon: "%",
        title: "Rate",
        value: inflationRatesData["Luxury Inflation Rate"],
        iconPosition: "end",
        onChange: (event) => handleInflationRatesInfo(event.target),
      },
    },
    {
      Component: DropDown,
      value: {
        name: "Housing Inflation",
        title: "Housing Inflation",
        setSelectedItem: handleInflationRatesInfo,
        value: inflationRatesData["Housing Inflation"],
        list: professionList,
        displayKey: "name",
      },
    },
    {
      Component: IconInput,
      value: {
        name: "Housing Infaltion Rate",
        title: "Rate",
        icon: "%",
        value: inflationRatesData["Housing Infaltion Rate"],
        iconPosition: "end",
        onChange: (event) => handleInflationRatesInfo(event.target),
      },
    },
  ];

  return (
    <Style.MainContainer>
      <Text style={styles.text.formHeaderText} padding="2rem 0">
        Inflation Rates
      </Text>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component } = data;
            return (
              <InputGroup key={index}>
                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                  {value.title}
                </Text>

                <Component key={index} value={value} />
              </InputGroup>
            );
          })}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
        <Button
        onClick={()=>preForm(preComponent)}
        >Previous</Button>
        <Button onClick={() => handleTaxInflationObject(inflationRatesData)}>
          Submit
        </Button>
      </Style.ButtonsContainer>
    </Style.MainContainer>
  );
}

export default InflationRates;
