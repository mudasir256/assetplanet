import React, { useState } from "react";
import { Text } from "../../../../styled-components/text";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import * as Style from "./styles/user-defined";
import { Button } from "../../../../styled-components/button";
import IconInput from "../../../../styled-components/input/icon-input";
import {
  Input,
  InputGroup,
} from "../../../../styled-components/input/styles/input";
import AddModal from "../../../../styled-components/modal/add-modal/add-modal";
import UpdateModal from "../../../../styled-components/modal/update-modal/update-modal";
import StyledRow from "../../../../styled-components/styled-row/styled-row";

function UserDefined({ handleRatesOfReturnObject }) {
  const userDefinedPayloadRow = {
    Year: "",
    Percentage: "",
  };

  const { styles } = defaultStyles;
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [noOfYears, setNoOfYears] = useState();
  const [fieldsList, setFieldsList] = useState([]);
  const [userDefinedPayload, setUserDefinedPayload] = useState([]);
  const [userDefinedAllData, setUserDefinedAllData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();

  const [updatedObject, setUpdateObject] = useState({
    Year: "",
    Percentage: "",
  });

  const handleUserDefinedData = (index, obj) => {
    console.log("index", index);
    console.log("obj", obj);
    const { name, value } = obj;

    const copyUserDefinedPayload = [...userDefinedPayload];

    copyUserDefinedPayload[index][name] = value;

    setUserDefinedPayload(copyUserDefinedPayload);
  };

  const handleUserDefinedUpdatedData = (obj) => {
    const { name, value } = obj;

    setUpdateObject({
      ...updatedObject,
      [name]: value,
    });
  };

  const submitData = () => {
    userDefinedAllData.push(...userDefinedPayload);

    handleRatesOfReturnObject(userDefinedAllData);
  };


  const fields = {
    year: {
      Component: Input,
      name: "Year",
      title: "Year",
      type: "text",
      onChange: handleUserDefinedData,
    },
    percentage: {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Percentage",
        title: "Percentage",
        icon: "%",
        iconPosition: "end",
        onChange: handleUserDefinedData,
      },
    },
  };

  const update_fields = [
    {
      Component: Input,
      name: "Year",
      title: "Year",
      type: "text",
      value: updatedObject["Year"],

      onChange: (event) => handleUserDefinedUpdatedData(event.target),
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Percentage",
        title: "Percentage",
        icon: "%",
        value: updatedObject["Percentage"],
        iconPosition: "end",
        onChange: (event) => handleUserDefinedUpdatedData(event.target),
      },
    },
  ];

  const handelCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };




  

  const getSelectedRow = (idx) => {
    setShowUpdateModal(true);

    setSelectedIndex(idx);

    // get selected row (this will return array of object)
    const selectedRow = userDefinedAllData.filter((row, index) => {
      return index == idx;
    });

    setUpdateObject(selectedRow[0]);
  };

  const updateRow = () => {
    userDefinedAllData[selectedIndex] = updatedObject;
    handleRatesOfReturnObject(userDefinedAllData);
  };

  const deleteRow = (index) => {
    let newArray = [];
    for (let i = 0; i < userDefinedAllData.length; i++) {
      if (i == index) {
      } else {
        newArray.push(userDefinedAllData[i]);
      }
    }

    setUserDefinedAllData(newArray);
    handleRatesOfReturnObject(newArray);
  };

  const handleYearsData = () => {
    for (let i = 0; i < noOfYears; i++) {
      console.log("value", noOfYears);
      userDefinedPayload.push({ ...userDefinedPayloadRow });
      fieldsList.push({ ...fields });
    }

    setShowModal(true);
  };

  console.log("yearsPauload", userDefinedPayload);
  console.log("fieldsList", fieldsList);
  return (
    <>
      <Style.MainContainer>
        <Text style={styles.text.formHeaderText} padding="2rem 0">
          User Defined Return
        </Text>
        <InputGroup>
          <Text style={styles.text.labelBoldText} padding="0rem 0 1rem 0 ">
            How Many Years
          </Text>

          <Input
            name="howManyYears"
            onChange={(event) => setNoOfYears(event.target.value)}
          />
        </InputGroup>
        <Button onClick={() => handleYearsData()}>Apply</Button>

        <div
          style={{
            width: "70%",
            rowGap: "2rem",
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          {userDefinedAllData &&
            userDefinedAllData.map((item, index) => (
              <StyledRow
                key={index}
                item={item}
                getSelectedRow={getSelectedRow}
                deleteRow={deleteRow}
                index={index}
              />
            ))}
        </div>
      </Style.MainContainer>

      <AddModal
        show={showModal}
        close={handelCloseModal}
        fields={fieldsList}
        modalTitle="Add User Defined Result"
        obj="nestedObj"
        submitData={submitData}
      />
      <UpdateModal
        show={showUpdateModal}
        close={handelCloseModal}
        modalTitle="Update User Defined Result"
        fields={update_fields}
        updateRow={updateRow}
      />
    </>
  );
}

export default UserDefined;
