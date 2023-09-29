import React,{useState} from "react";
import IconInput from "../../../../styled-components/input/icon-input";
import { Button } from "../../../../styled-components/button";
import ProfessionalPredictions from "../professional-prediction/professional-predictions";
import * as Style from "./styles/static-return-rate";
import { InputGroup } from "../../../../styled-components/input/styles/input";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { Text } from "../../../../styled-components/text";


function StaticReturnRate({ handleRatesOfReturnObject, nextForm, data }) {


  const {styles} = defaultStyles
  const uniqueKey = Object.keys(data.staticReturnRate.data)[0];
  const staticReturnRateObj = data.staticReturnRate.data[uniqueKey];

  const [staticReturnRateData, setStaticReturnRateData] = useState({
    Static: staticReturnRateObj && staticReturnRateObj["Static"],
  });

  const handleStaticReturnRateInfo = (obj) => {
    const { name, value } = obj;

    setStaticReturnRateData({
      ...staticReturnRateData,
      [name]: value,
    });
  };


  const nextComponent = {
    name: "professionalPredictions",
    title: "Professional Predictions",
    isMulti: false,
    component: ProfessionalPredictions,
  };

  const submitData = () => {
    handleRatesOfReturnObject(staticReturnRateData);
    nextForm(nextComponent);
  };

  const fields = [
   
    {
      Component: IconInput,
      value: {
        name: "Static",
        title: "Static",
        icon: "%",
        iconPosition: "end",
        value: staticReturnRateData["Static"],
        onChange: (event) => handleStaticReturnRateInfo(event.target),
      },
    
    
    },
  ];

  return (
    <Style.MainContainer>
      <Text style={styles.text.formHeaderText} padding="2rem 0">
      Static Rate of Return
      </Text>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component } = data;
            return (
              <InputGroup>
                <Text style={styles.text.labelBoldText} padding="2rem 0 1rem 0 ">
                  {value.title}
                </Text>

                <Component key={index} value={value} />
              </InputGroup>
            );
          })}

      </Style.FieldsContainer>

      <Style.ButtonContainer>
        <Button onClick={submitData}>Next</Button>
      </Style.ButtonContainer>
    </Style.MainContainer>
  );
}

export default StaticReturnRate;
