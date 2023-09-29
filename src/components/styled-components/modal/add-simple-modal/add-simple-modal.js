import React, { useEffect } from "react";
import { Text } from "../../text";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import Modal from "../modal";
import { Button } from "../../button";
import * as Style from "./styles/add-simple-modal";
import { Icon } from "antd";
import { Input } from "../../../input/Input";
import { InputGroup1 } from "../../input/styles/input";
import DropDown from "../../dropdown/dropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Select } from "antd";
const { Option } = Select;

function AddSimpleModal({
  show,
  close,
  fields,
  submitData,
  modalTitle,
  obj,
  onChange,
  selectedRowData,
  onSelectChange,
  handleItemsInfoImageChange
}) {
  const { styles } = defaultStyles;

  const handleSubmit = () => {
    submitData();
    // close();
  };
  const history = useHistory();
  let DropDownValues = [
    { id: 1, value: "Bookkeeper" },
    { id: 2, value: "CPA" },
    { id: 3, value: "Financial Advisor" },
  ];
  useEffect(() => {
    if (fields) {
      !fields.attributes &&
        history.push({
          pathname: "/collectibles_new"
        })
    }
  }, [fields])

  return (
    <Modal show={show}>
      <Style.HeaderConatiner>
        <Text style={styles.text.formHeaderText}>{modalTitle}</Text>
        <Icon type="close" onClick={close}></Icon>
      </Style.HeaderConatiner>

      <Style.FieldsContainer>
        {fields && fields.attributes &&
          fields.attributes.map((input, index) => {
            if (
              input.dataType.toLowerCase() === "string" ||
              input.dataType.toLowerCase() === "int" ||
              input.dataType.toLowerCase() === "float" ||
              input.dataType.toLowerCase() === "formula"
            ) {
              return (
                <InputGroup1 key={index}>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {input.name}
                  </Text>
                  <Input
                    placeholder={input.name}
                    name={input.name}
                    type="text"
                    disabled={input.dataType.toLowerCase() === "formula" ? true : false}
                    value={selectedRowData && selectedRowData[input.name]}
                    // onChange={(event) => handleContactInfo(event)}
                    onChange={(event) => onChange(event.target)}
                  />
                </InputGroup1>
              );
            } else if (
              input.dataType.toLowerCase() == "calender" ||
              input.dataType.toLowerCase() == "date"
            ) {
              return (
                <InputGroup1 key={index}>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {input.name}
                  </Text>
                  <Input
                    placeholder={input.name}
                    name={input.name}
                    type="date"
                    value={selectedRowData && selectedRowData[input.name]}
                    // onChange={(event) => handleContactInfo(event)}
                    onChange={(event) => { onChange(event.target) }}
                  />
                </InputGroup1>
              );
            } else if (
              input.dataType.toLowerCase() === "image" &&
              !input.button
            ) {
              return (
                <InputGroup1 key={index}>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {input.name}
                  </Text>
                  <Input
                    placeholder={input.name}
                    name={input.name}
                    type="file"
                    // onChange={(event) => handleContactInfo(event)}
                    onChange={(event) => handleItemsInfoImageChange(event.target)}
                  />
                </InputGroup1>
              );
            } else if (input.dataType.toLowerCase() === "dropdown") {
              {console.log("input in dropdown",selectedRowData[input.name])}
              return (
                <InputGroup1>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {input.name}
                  </Text>
                  <Select
                    showSearch
                    name={input.name}
                    title={input.name}
                    id={input.name}
                    placeholder="-Select-"
                    // defaultValue={
                    //   payload && payload[item.name] ? payload[item.name] : ""
                    // }
                    defaultValue={selectedRowData && selectedRowData[input.name]}
                    onChange={(value) => { onSelectChange(input.name, value); }}
                  // size={size}
                  >
                    {input.attribute_default_values.map((states, index) => (
                      <Option key={index} value={states.value}>
                        {states.value}
                      </Option>
                    ))}
                  </Select>
                  {/*  <DropDown
                    style={defaultStyles.styles.dropDown.m_smallDropdown}
                    listingStyle={{
                      ...defaultStyles.styles.dropDown.m_smallDropdown,
                      height: "auto",
                    }}
                    name={input.name}
                    title={input.name}
                    list={[
                      { id: 1, value: "Bookkeeper" },
                      { id: 2, value: "CPA" },
                      { id: 3, value: "Financial Advisor" },
                    ]}
                    displayKey="value"
                    disableSearch={false}
                    setSelectedItem={(event) => onChange(event.target)}

                  // setSelectedItem={({ name, value }) => {
                  //   handleInputFields(name, value);
                  // }}
                  // defaultValue={
                  //   payload && payload[item.name] ? payload[item.name] : ""
                  // }
                  />
                  <DropDown
                    style={defaultStyles.styles.dropDown.largeDropDown}
                    name={input.name}
                    title={input.name}
                    // setSelectedItem={onChange}
                    // list={states}
                    list={[
                      { id: 1, value: "Bookkeeper" },
                      { id: 2, value: "CPA" },
                      { id: 3, value: "Financial Advisor" },
                    ]}
                    displayKey="name"
                  />
                  */}
                </InputGroup1>
              );
            }
          })}
        {/* <InputGroup>
          <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
            First Name
          </Text>
          <Input
            placeholder="First Name"
            name="fistName"
            type="text"
            // onChange={(event) => handleContactInfo(event)}
          />
        </InputGroup>
        <InputGroup>
          <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
            First Name
          </Text>
          <Input
            placeholder="First Name"
            name="fistName"
            type="date"
            // onChange={(event) => handleContactInfo(event)}
          />
        </InputGroup>
        <InputGroup>
          <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
            First Name
          </Text>
          <Input
            placeholder="First Name"
            name="fistName"
            type="file"
            // onChange={(event) => handleContactInfo(event)}
          />
        </InputGroup>

        <InputGroup>
          <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
            First Name
          </Text>
          <DropDown
            style={defaultStyles.styles.dropDown.largeDropDown}
            name="test"
            title="test"
            // setSelectedItem= handleTaxCreditInfo,

            list={[
              { id: 1, name: "Bookkeeper" },
              { id: 2, name: "CPA" },
              { id: 3, name: "Financial Advisor" },
            ]}
            displayKey="name"
          />
        </InputGroup> */}

        {/* {fields &&
          fields.map((data, index) => {
            const { value, Component, title, name, onChange, style } = data;
            return (
              <InputGroup>
                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                  {title || value.title}
                </Text>

                <Component
                  key={index}
                  value={value}
                  name={name}
                  onChange={onChange}
                  style={style}
                />
              </InputGroup>
            );
          })} */}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
        <Button style={styles.button.smallButton} onClick={close}>
          Cancel
        </Button>
        <Button style={styles.button.smallButton} onClick={submitData}>
          {modalTitle === "Add Item" ? "Add" : "Update"}
        </Button>
      </Style.ButtonsContainer>
    </Modal>
  );
}

export default AddSimpleModal;
