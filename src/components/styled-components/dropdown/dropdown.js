import React, { useState, useEffect, useRef } from "react";
import useComponentVisible from "../../../hooks/onclick-listner";
import downArrow from "../../../assets/SVGs/down-arow.svg";
import {
  DropDownInput,
  DropDownList,
  DropDownValue,
  DropDownListItems,
} from "./styles/dropdown";
import { defaultStyles } from "../../../constants/style-constants/utils";
export default function DropDown(props) {
  const {
    defaultValue,
    setSelectedItem,
    list,
    style,
    displayKey,
    name,
    placeholderName,
    value,
    disableSearch,
    listingStyle
  } = typeof props.value === "object" && props.value  || props;

  console.log("props", props,defaultValue);
  const { ref, isComponentVisible, handleClose, setIsComponentVisible } =
    useComponentVisible(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    value && setSearchValue(value);
    console.log("list", list);
    defaultValue && setSearchValue(defaultValue);
    console.log("defaultvalue", defaultValue);
    if (defaultValue) {
      console.log("defaultValue", defaultValue);
      setDisable(true);
    }
  }, [list]);

  const filteredItems = (disableSearch && list) || 
    (list &&
    list.filter((item) => {
      return (
        item[displayKey] &&
        item[displayKey]
          .toLowerCase()
          .includes(searchValue && searchValue.toLowerCase())
      );
    }));

  const selectItem = (item) => {
    console.log("itemmm", item);
    console.log("setSelectedItem", setSelectedItem);
    setSelectedItem({ name: name, value: item[displayKey], item: item });
    handleClose();
    // setShowDropdown(false);
  };
  return (
    <div ref={ref}>
      <DropDownInput
        disabled={disable}
        style={style}
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
          // setShowDropdown(!showDropdown);
        }}
      >
        <DropDownValue
          disabled={disable}
          placeholder={placeholderName || "Select"}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          value={searchValue}
        ></DropDownValue>

        <img src={downArrow} height={15} width={15}></img>
      </DropDownInput>
      {isComponentVisible && (
        <DropDownList disabled={disable} style={listingStyle || style}>
          {filteredItems  && filteredItems.map((item, index) => (
              <DropDownListItems
                key={index}
                onClick={() => {
                  setSearchValue(item[displayKey]);

                  selectItem(item);
                }}
              >
                {item[displayKey]}
              </DropDownListItems>
            ))}
        </DropDownList>
      )}
    </div>
  );
}
