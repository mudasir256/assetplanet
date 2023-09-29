import React, { useState } from "react";
import {
  Input,
  InputGroupFlex,
} from "../../../styled-components/input/styles/input";
import IconInput from "../../../styled-components/input/icon-input";
import { Button } from "../../../styled-components/button";
import { TextArea } from "../../../styled-components/text-area";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import DropDown from "../../../styled-components/dropdown/dropdown";

function CustomComponents() {
  const [contactInfo, setContactInfo] = useState();

  const [selectedIProfession, setSelectedProfession] = useState("");
  const [searchProfessionValue, setSearchProfessionValue] = useState("");
  const { fonts, colors, styles } = defaultStyles;

  const professionList = [
    { id: 1, name: "Bookkeeper" },
    { id: 2, name: "CPA" },
    { id: 3, name: "Financial Advisor" },
  ];

  const handleContactInfo = (name, value) => {
    setContactInfo({
      ...contactInfo,
      [name]: value,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "2rem",
      }}
    >
      <h2 className="text-center font-weight-bold ">Custom Components Demo</h2>
      <InputGroupFlex columnGap="1rem">
        <h4>Small Input</h4>
        <Input
          placeholder="First Name"
          name="fistName"
          onChange={(event) => handleContactInfo(event)}
        />
      </InputGroupFlex>

      <InputGroupFlex columnGap="1rem">
        <h4>Large Input</h4>
        <Input
          style={styles.textInput.largeTextInput}
          placeholder="Last Name"
          name="lastName"
          onChange={(event) => handleContactInfo(event)}
        />
      </InputGroupFlex>


      <InputGroupFlex columnGap="1rem">
        <div style={{fontSize:"1rem",fontWeight:"bold"}}>Radio Buttons</div>
        <Input
          type="radio"
          style={styles.radioButton.smallRadioButton}
          name="radio"
          value="Yes"
          onChange={(event) => handleContactInfo(event)}
        />
        <div style={{paddingRight:"0.6rem"}}>One Person</div>
         <Input
          type="radio"
          value="No"
          style={styles.radioButton.smallRadioButton}
          name="radio"
          onChange={(event) => handleContactInfo(event)}
        />
        <div style={{paddingRight:"0.6rem"}}>Two Persons</div>

        <Input
          type="radio"
          value="No"
          style={styles.radioButton.smallRadioButton}
          name="radio"
          onChange={(event) => handleContactInfo(event)}
        />
        <div style={{paddingRight:"0.6rem"}}>Three Persons </div>

        <Input
          type="radio"
          value="No"
          style={styles.radioButton.smallRadioButton}
          name="radio"
          onChange={(event) => handleContactInfo(event)}
        />
        <div>Four Persons</div>

      </InputGroupFlex>

      <InputGroupFlex columnGap="1rem">
        <h4>Style Input</h4>
        <IconInput
          style={styles.textInput.largeTextIconInput}
          onChange={handleContactInfo}
          name="cell"
        />
      </InputGroupFlex>

      <InputGroupFlex columnGap="1rem">
        <h4>Dropdown</h4>
        <DropDown
          style={defaultStyles.styles.dropDown.largeDropDown}
          selectedItem={selectedIProfession}
          setSelectedItem={setSelectedProfession}
          list={professionList}
          searchValue={searchProfessionValue}
          setSearchValue={setSearchProfessionValue}
          displayKey="name"
        />
      </InputGroupFlex>

      <InputGroupFlex columnGap="1rem">
        <h4>Text Areaa</h4>
        <TextArea
          style={styles.textArea.largeTextArea}
          placeholder="Text Area"
        />
      </InputGroupFlex>

      <Button>Test Button</Button>
    </div>
  );
}

export default CustomComponents;
