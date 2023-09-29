import React, { useState } from "react";
import IconInput from "../../../../styled-components/input/icon-input";
import {Button} from "../../../../styled-components/button";
import { Text } from "../../../../styled-components/text";
import AddModal from "../../../../styled-components/modal/add-modal/add-modal";
import UpdateModal from "../../../../styled-components/modal/update-modal/update-modal";
import { defaultStyles } from "../../../../../constants/style-constants/utils";
import { InputGroup } from "../../../../styled-components/input/styles/input";
import * as Style from "./styles/monte-carlo";
import UserDefined from "../user-defined/user-defined";
import { Input } from "../../../../styled-components/input/styles/input";
import StyledRow from "../../../../styled-components/styled-row/styled-row";
import { TextArea } from "../../../../styled-components/text-area";

function MonteCarlo({ handleRatesOfReturnObject, nextForm, preForm }) {
  const monteCarloObj = {
    Description: "",
    "How Many Years": "",
    "High Band": "",
    "Low Band": "",
    "Expected Average": "",
    "Start Year": "",
    Average: "",
  };

  const [monteCarloData, setMonteCarloData] = useState({ ...monteCarloObj });
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [dataList, setDataList] = useState([
    {
      Description: "sample",
      "How Many Years": "15",
      "High Band": "8",
      "Low Band": "6",
      "Expected Average": "80",
      "Start Year": "2019",
      Average: "85",
    },
    {
      Description: "sample1",
      "How Many Years": "15",
      "High Band": "9",
      "Low Band": "6",
      "Expected Average": "85",
      "Start Year": "2019",
      Average: "90",
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [updatedObject, setUpdateObject] = useState({
    Description: "",
    "How Many Years": "",
    "High Band": "",
    "Low Band": "",
    "Expected Average": "",
    "Start Year": "",
    Average: "",
  });

  const { styles } = defaultStyles;

  const handleMonteCarloInfo = (obj) => {
    const { name, value } = obj;

    setMonteCarloData({
      ...monteCarloData,
      [name]: value,
    });
  };

  const handleMonteCarloUpdatedInfo = (obj) => {
    const { name, value } = obj;

    setUpdateObject({
      ...updatedObject,
      [name]: value,
    });
  };

  const preComponent = {
    name: "userDefined",
    title: "User Defined",
    isMulti: false,
    component: UserDefined,
  };

  const submitData = () => {
    dataList.push({ ...monteCarloData });

    handleRatesOfReturnObject(dataList);
  };

  const getSelectedRow = (idx) => {
    setShowUpdateModal(true);

    setSelectedIndex(idx);

    // get selected row (this will return array of object)
    const selectedRow = dataList.filter((row, index) => {
      return index == idx;
    });

    setUpdateObject(selectedRow[0]);
  };

  const updateRow = () => {
    dataList[selectedIndex] = updatedObject;
    handleRatesOfReturnObject(dataList);
  };

  const deleteRow = (index) => {
    let newArray = [];
    for (let i = 0; i < dataList.length; i++) {
      if (i == index) {
      } else {
        newArray.push(dataList[i]);
      }
    }

    setDataList(newArray);
    handleRatesOfReturnObject(newArray);
  };

  const handelCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const fields = [
    {
      Component: Input,
      name: "How Many Years",
      title: "How Many Years",
      type: "text",
      onChange: (event) => handleMonteCarloInfo(event.target),
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "High Band",
        title: "High Band",
        icon: "%",
        iconPosition: "end",
        onChange: (event) => handleMonteCarloInfo(event.target),
      },
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Low Band",
        title: "Low Band",
        icon: "%",
        iconPosition: "end",
        onChange: (event) => handleMonteCarloInfo(event.target),
      },
    },
    {
      Component: Input,
      name: "Expected Average",
      title: "Expected Average",
      type: "text",
      onChange: (event) => handleMonteCarloInfo(event.target),
    },
    {
      Component: Input,
      name: "Average",
      title: "Average",
      type: "text",
      onChange: (event) => handleMonteCarloInfo(event.target),
    },  
    {
      Component: TextArea,
      style:styles.textArea.modalLargeTextArea,
      name: "Description",
      title: "Description",
      type: "text",
      onChange: (event) => handleMonteCarloInfo(event.target),
    },
  ];

  const update_fields = [
    {
      Component: Input,
      name: "How Many Years",
      title: "How Many Years",
      value: updatedObject["How Many Years"],
      type: "text",
      onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "High Band",
        title: "High Band",
        icon: "%",
        value: updatedObject["High Band"],
        iconPosition: "end",
        onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
      },
    },
    {
      Component: IconInput,
      value: {
        style: styles.textInput.smallTextInput,
        name: "Low Band",
        title: "Low Band",
        icon: "%",
        value: updatedObject["Low Band"],
        iconPosition: "end",
        onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
      },
    },
    {
      Component: Input,
      name: "Expected Average",
      title: "Expected Average",
      value: updatedObject["Expected Average"],
      type: "text",
      onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
    },
    {
      Component: Input,
      name: "Average",
      title: "Average",
      value: updatedObject["Average"],
      type: "text",
      onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
    },
    {
      Component: TextArea,
      style:styles.textArea.modalLargeTextArea,
      name: "Description",
      value: updatedObject["Description"],
      title: "Description",
      type: "text",
      onChange: (event) => handleMonteCarloUpdatedInfo(event.target),
    },
  ];

  return (
    <>
      <Style.MainContainer>
        <Text style={styles.text.formHeaderText} padding="2rem 0 3rem 0">
          Monte Carlo Rate of Return
        </Text>

        <Style.FieldsContainer>
          <Text style={styles.text.formHeaderText}>Add Monte Carlo</Text>
          <Button
            style={styles.button.sqaureButton}
            onClick={() => setShowModal(true)}
          >
            +
          </Button>
        </Style.FieldsContainer>

        <div
          style={{
            width: "70%",
            rowGap: "2rem",
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          {dataList &&
            dataList.map((item, index) => (
              <StyledRow
                key={index}
                item={item}
                getSelectedRow={getSelectedRow}
                deleteRow={deleteRow}
                index={index}
              />
            ))}
        </div>
        <Style.ButtonsContainer>
          <Button onClick={() => preForm(preComponent)}>Previous</Button>
          <Button>Submit</Button>
        </Style.ButtonsContainer>
      </Style.MainContainer>
      <AddModal
        show={showModal}
        close={handelCloseModal}
        fields={fields}
        modalTitle="Add New Monte Carlo"
        handleTaxCreditInfo={handleMonteCarloInfo}
        submitData={submitData}
      />
      <UpdateModal
        show={showUpdateModal}
        close={handelCloseModal}
        modalTitle="Update Monte carlo"
        fields={update_fields}
        updateRow={updateRow}
      />
    </>
  );
}

export default MonteCarlo;
