import React, { useEffect, Fragment } from "react";
import Loader from "../../../../components/styled-components/loader/loader";
import { MODULE_API } from "../../../../apis";
import { useState } from "react";
import DropDown from "../../../../components/styled-components/dropdown/dropdown";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import { Radio, DatePicker, Button, Collapse, Select } from "antd";
import * as Styles from "./styles/allocationSubFormStyles";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const { Option } = Select;

const InsuranceSubForm = () => {
  let tabs2;
  const AllTabs = {
    "PRODUCT INFORMATION": {
      name: "PRODUCT INFORMATION",
      enabled: false,
      priority: 1,
    },
    "ADDITIONAL INFORMATION": {
      name: "ADDITIONAL INFORMATION",
      enabled: false,
      priority: 2,
    },
    "FINANCIAL INFORMATION": {
      name: "FINANCIAL INFORMATION",
      enabled: false,
      priority: 3,
    },
    "INCOME INFORMATION": {
      name: "INCOME INFORMATION",
      enabled: false,
      priority: 4,
    },
    // "SELLING ASSET COSTS": {
    //   name: "SELLING ASSET COSTS",
    //   enabled: false,
    //   priority: 5,
    // },
    // "ASSET PERFORMANCE": {
    //   name: "ASSET PERFORMANCE",
    //   enabled: false,
    //   priority: 6,
    // },
    // "TAX AND LIQUIDITY": {
    //   name: "TAX AND LIQUIDITY",
    //   enabled: false,
    //   priority: 7,
    // },
  };

  const history = useHistory();
  const { module } = useParams();
  const { id } = useParams();
  console.log("module", module, id);
  // --------------------states---------------
  const [moduleName, setModuleName] = useState(null)
  const [moduleId, setModuleId] = useState(null)

  const [loading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({});
  const [tabs, setTabs] = useState([]);
  const [tabsControl, setTabsControl] = useState({});
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabName, setActiveTabName] = useState("PRODUCT INFORMATION");
  // const [totalTabs, setTotalTabs] = useState(0);
  const [submitBody, setSubmitBody] = useState({});
  const [fieldsData, setFieldsData] = useState({});

  //   ---------------functions----------------------
  const getAssetFields = async (assetName) => {
    setIsLoading(true);
    console.log("assetName....", assetName);
    const res = await MODULE_API.assetFiledDetails(assetName);
    setIsLoading(false);
    // console.log("result....", res);
    if (res) {
      res.attributes && res.attributes.map((attribute) => {
        setFields((prevValue) => {
          return {
            ...prevValue,
            [attribute["groupName"]]: {
              ...(prevValue[attribute["groupName"]] || {}),
              [attribute["id"]]: attribute,
            },
          };
        });
      });
    }
  };
  const getAssetFieldsData = async (id) => {
    setIsLoading(true);
    console.log("asset id....", id);
    const res = await MODULE_API.fetchDetails(id);
    if (res && res.data) {
      setFieldsData(res.data);
      console.log("result....", res);
    }
    setIsLoading(false);

  };
  function handlePreviousFormButton() {
    let temp = Object.values(tabsControl);
    let a = temp.indexOf(activeTabName);
    let b = Object.keys(tabsControl)[a - 1];
    setActiveTabName(tabsControl[b]);
  }
  function tabsPrevNextControl() {
    let temp = Object.keys(AllTabs);
    tabs2 = tabs.map((tab) => tab.toUpperCase());
    let obj = {};
    tabs2.map((name) => {
      if (temp.includes(name)) {
        obj = {
          ...obj,
          [AllTabs[name].priority]: AllTabs[name].name,
        };
      }
    });
    return obj;
  }
  useEffect(() => {
    setTabsControl(tabsPrevNextControl());
  }, [tabs]);
  function handleNextFormButton() {
    let temp = Object.values(tabsControl);
    let a = temp.indexOf(activeTabName);
    let b = Object.keys(tabsControl)[a + 1];
    setActiveTabName(tabsControl[b]);
  }

  async function handleSubmit() {
    setIsLoading(true);
    console.log("moduleName", submitBody)
    if (moduleName && moduleId === null) {
      console.log("create api")
      try {
        if (moduleName && moduleId === null)
          await MODULE_API.addAsset(moduleName, {
            clientModules: [{ ...submitBody }],
          });
        setIsLoading(false);
        history.push("/insurance");
      } catch (error) {
        setIsLoading(false);
        swal({
          title: "Error",
          text: "Error while Saving Module",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      }
    }
    if (moduleId && moduleName) {
      console.log("updateApi")
      try {
        await MODULE_API.updateClientModule(moduleId, {
          ...submitBody
        });
        setIsLoading(false);
        history.push("/insurance");
      } catch (error) {
        setIsLoading(false);
        swal({
          title: "Error",
          text: "Error while Saving Module",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      }
    }


  }

  function currentTab(tab) {
    tabs2 = tabs.map((tab) => tab.toUpperCase());
    console.log("currentTab", tab, tabs2.includes(tab));
    console.log("tabs2", tabs2, "\n", "currentTab", `'${tab}'`);

    let cond = tabs2.includes(tab);
    if (cond) {
      let ind = tabs2.indexOf(tab);
      console.log("tabs.indexOf(tab)", tabs2.indexOf(tab));
      setActiveTabIndex(ind);
      setActiveTabName(tab);
    }
  }

  useEffect(() => {
    setTabs(Object.keys(fields));
  }, [fields]);
  useEffect(() => {
    currentTab("PRODUCT INFORMATION");
  }, [tabs]);
  useEffect(() => {
    let tabs2 = tabs.map((item) => item.toUpperCase());
    let temp = tabs2.indexOf(activeTabName);
    if (temp !== -1) {
      setActiveTabIndex(temp);
    }
  }, [activeTabName]);

  //   --------------LOG useEffects-------------------
  useEffect(() => {
    console.log("fields", fields);
  }, [fields]);
  useEffect(() => {
    if (module) {
      getAssetFields(module);
      setModuleName(module || null)
    }
    if (id) {
      getAssetFieldsData(id)
      setModuleId(id || null)
    }
  }, [module, id]);

  return (
    <>
      {/* <AssetLissting/> */}
      <hr />
      <TabNavigationComponent
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        activeTabName={activeTabName}
        setActiveTabName={setActiveTabName}
        currentTab={currentTab}
        AllTabs={AllTabs}

      />
      <hr />
      <form>
        {tabs.length > 0 && (
          <FormCreator
            data={fields[tabs[activeTabIndex]]}
            values={fieldsData}
            title={tabs[activeTabIndex]}
            setSubmitBody={setSubmitBody}
            activeTabName={activeTabName}
          />
        )}
      </form>
      {console.log("tabs.length>>", tabs.length)}
      {tabs.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "3rem 0",
          }}
        >
          <Button
            onClick={handlePreviousFormButton}
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "1rem",

              width: "12rem",
              height: "3rem",
              fontSize: "24px",
              fontWeight: "450",
            }}
            disabled={activeTabName == "PRODUCT INFORMATION"}
          >
            Previous
          </Button>
          {/*

          {activeTabName === "INCOME INFORMATION" && "submit end"}
          {(activeTabName === "FINANCIAL INFORMATION" && tabs.length === 2) && "here we need submit 2" }
          {(activeTabName === "PRODUCT INFORMATION" && tabs.length === 1) && "here we need submit 1"}
          */}
          {((activeTabName === "INCOME INFORMATION") || (activeTabName === "PRODUCT INFORMATION" && tabs.length === 1) || (activeTabName === "FINANCIAL INFORMATION" && tabs.length === 2)) ? <Button
            onClick={() => {
              handleSubmit();
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "1rem",

              width: "12rem",
              height: "3rem",
              fontSize: "24px",
              fontWeight: "450",
            }}
          >
            Submit
          </Button> : <Button
            onClick={handleNextFormButton}
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "1rem",

              width: "12rem",
              height: "3rem",
              fontSize: "24px",
              fontWeight: "450",
            }}
          >
            Next
          </Button>}


          {/*  {((activeTabName !== "INCOME INFORMATION") || (activeTabName === "PRODUCT INFORMATION" && tabs.length === 1) || (activeTabName === "FINANCIAL INFORMATION" && tabs.length === 2)) ? (
            <Button
              onClick={handleNextFormButton}
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "1rem",

                width: "12rem",
                height: "3rem",
                fontSize: "24px",
                fontWeight: "450",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                handleSubmit();
              }}
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "1rem",

                width: "12rem",
                height: "3rem",
                fontSize: "24px",
                fontWeight: "450",
              }}
            >
              Submit
            </Button>
            )}  */}
        </div>
      )}

      <Loader isLoading={loading} />
    </>
  );
};

const FormCreator = ({ data, title, setSubmitBody, activeTabName, values }) => {
  const { Panel } = Collapse;
  // ------------------HOOKS--------------
  const [inputFields, setInputFields] = useState([]);
  const [groupedFields, setGroupedFields] = useState({});
  const [payload, setPayload] = useState({});
  const [attributeValues, setAttributeValues] = useState({});

  useEffect(() => {
    setInputFields(Object.keys(data));
  }, [data]);
  useEffect(() => {
    setSubmitBody(payload);
  }, [payload]);
  useEffect(() => {
    // setSubmitBody(values);
    setAttributeValues(values);
  }, [values]);
  useEffect(() => {
    inputFields.map((item) => {
      // console.log("data[item]", data[item]);
      if (data[item] && data[item]["formGroupName"]) {
        // console.log("formGroupName", data[item].formGroupName);
        setGroupedFields((prevValue) => {
          // console.log(
          //   "prevValue",
          //   prevValue,
          //   "item ",
          //   item,
          //   "prevValue[data[item].groupName]",
          //   prevValue[data[item].formGroupName]
          // );
          return {
            ...prevValue,
            [data[item].formGroupName]: {
              ...prevValue[data[item].formGroupName],
              [data[item].id]: data[item],
            },
          };
        });
      }
    });
  }, [data, inputFields]);

  function handleInputFields(inputName, value) {
    // console.log("inputName,", inputName, "value", value);
    setPayload((prevValue) => {
      return { ...prevValue, [inputName]: value };
    });
    // setAttributeValues((prevValue) => {
    //   return { ...prevValue, [inputName]: value };
    // });
  }

  const DynamicComponentGenerator = (item) => {
    {
      // console.log("item in DynamicComponentGenerator", item);
      // console.log("data[item]....", data[item]);
      if (data[item]) {
        // console.log("in first if");
        if (data[item]["formGroupName"]) {
          return (
            <>
              {/* <Styles.SubFormDiv>
                <h1>here was a Group</h1>
              </Styles.SubFormDiv> */}
            </>
          );
        } else {
          // console.log(
          //   "in //second if::::data[item].dataType",
          //   data[item].dataType
          // );
          return SubFieldGenerator(data[item]);
        }
      }
    }
  };
  const SubFieldGenerator = (item) => {
    // console.log("item in SubFieldGenerator", item);

    switch (item.dataType) {
      case "boolean":
        return (
          <>
            <Styles.SubFormDiv style={{
              marginTop: "0.5rem",
            }}>
              <label style={{ display: "flex", flexDirection: "column", }}>
                {item.name}
                <Radio.Group
                  style={{ marginTop: "0.5rem" }}
                  defaultValue={payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""}
                  size="large"
                  onChange={(e) => {
                    handleInputFields(item.name, e.target.value);
                  }}
                >
                  <Radio.Button value="true">Yes</Radio.Button>
                  <Radio.Button value="false">No</Radio.Button>
                </Radio.Group>
              </label>
            </Styles.SubFormDiv>
          </>
        );

        break;
      case "string":
        return (
          <>
            {item.name === "Name" ?
              <Styles.SubFormDiv style={{
                marginTop: "0.5rem",
              }}>
                <label
                  style={{
                    // marginTop: "20px",
                  }}
                >
                  {item.name}
                </label>
                <Styles.InputBorder>
                  <input
                    type="text"
                    style={{
                      outline: "none",
                      border: "none",
                      width: "98%",
                      // marginTop:"0.5rem"
                    }}
                    onChange={(e) => {
                      handleInputFields(item.name, [e.target.value]);
                    }}
                    value={payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""}
                  />
                </Styles.InputBorder>
              </Styles.SubFormDiv>
              :
              <Styles.SubFormDiv style={{
                marginTop: "0.5rem",
              }}>
                <label
                  style={{
                    // marginTop: "20px",
                  }}
                >
                  {item.name}
                </label>
                <Styles.InputBorder>
                  <input
                    type="text"
                    style={{
                      outline: "none",
                      border: "none",
                      width: "98%",
                      // marginTop:"0.5rem"
                    }}
                    onChange={(e) => {
                      handleInputFields(item.name, e.target.value);
                    }}
                    value={payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""}
                  />
                </Styles.InputBorder>
              </Styles.SubFormDiv>}
          </>
        );

        break;
      case "int":
        return (
          <>
            {item.name === "Percent" ?
              <Styles.SubFormDiv style={{
                marginTop: "0.5rem",
              }}>
                <label>{item.name}</label>
                <Styles.InputBorder>
                  <input
                    // type="number"
                    // pattern="[0-9]*"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    style={{
                      outline: "none",
                      border: "none",
                      width: "98%",
                    }}
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, '');
                      handleInputFields(item.name, [result]);
                    }}
                    value={payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""}
                  />
                </Styles.InputBorder>
              </Styles.SubFormDiv>
              :
              <Styles.SubFormDiv style={{
                marginTop: "0.5rem",
              }}>
                <label>{item.name}</label>
                <Styles.InputBorder>
                  <input
                    // type="number"
                    // pattern="[0-9]*"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    style={{
                      outline: "none",
                      border: "none",
                      width: "98%",
                    }}
                    onChange={(e) => {
                      const result = e.target.value.replace(/\D/g, '');
                      handleInputFields(item.name, result);
                    }}
                    value={payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""}
                  />
                </Styles.InputBorder>
              </Styles.SubFormDiv>
            }
          </>
        );

        break;
      case "dropdown":
        { console.log("dropdown item", item) }
        return (
          <>
            <Styles.SubFormDiv style={{
              marginTop: "0.5rem",
            }}>
              <label>{item.name}</label>

              <DropDown
                style={defaultStyles.styles.dropDown.m_smallDropdown}
                listingStyle={{
                  ...defaultStyles.styles.dropDown.m_smallDropdown,
                  height: "auto",
                }}
                name={item.name}
                title={item.name}
                list={item.attribute_default_values}
                displayKey="value"
                disableSearch={false}
                setSelectedItem={({ name, value }) => {
                  handleInputFields(name, value);
                }}
                defaultValue={
                  payload && payload[item.name] ? payload[item.name] : attributeValues[item.name] ? attributeValues[item.name] : ""
                }
              />
            </Styles.SubFormDiv>
          </>
        );

        break;
      case "date":
        return (
          <>
            <Styles.SubFormDiv style={{
              marginTop: "0.5rem",
            }}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                {item.name}

                <DatePicker
                  className="ant-calendar-picker-input ant-input"
                  format={"YYYY/DD/MM hh:mm:ss"}
                  style={{
                    outline: "none",
                    border: "none",
                    width: "20rem",
                    marginTop: "0.4rem",
                    borderRadius: "0.5rem",
                  }}
                  placeholder="Select Purchase Date"
                  onChange={(e) => {
                    if (e !== null) handleInputFields(item.name, e.toString());
                  }}
                  defaultValue={
                    payload[item.name]
                      ? moment(payload[item.name])
                      : moment(payload[item.name] || new Date())
                  }
                />
              </label>
            </Styles.SubFormDiv>
          </>
        );

        break;

      default:
        console.error("invalid DataType Detected :::: ", item.dataType);
        // return <h1>invalid DataType Detected :::: {item.dataTyp  e}</h1>;
        break;
    }

    // -----------if based conditions -----------
    // {{
    // if (data[item].dataType == "boolean") {
    //   return (
    //     <>
    //       <h1>boolean DataType Detected</h1>
    //       <label>
    //         {item.name}
    //         <input placeholder={item.placeHolder} type="radio" />
    //       </label>
    //     </>
    //   );
    // } else if (data[item].dataType == "string") {
    //   return (
    //     <>
    //       <h1>string DataType Detected</h1>
    //       <label>
    //         {item.name}
    //         <input type="text" />
    //       </label>
    //     </>
    //   );
    // } else if (data[item].dataType == "int") {
    //   return (
    //     <>
    //       <h1>int DataType Detected</h1>
    //       <label>
    //         {item.name}
    //         <input type="number" />
    //       </label>
    //     </>
    //   );
    // } else if (data[item].dataType == "dropdown") {
    //   return (
    //     <>
    //       <h1>dropdown DataType Detected</h1>

    //       <DropDown
    //         //   style={defaultStyles.styles.dropDown.m_smallDropdown}
    //         //   listingStyle={{
    //         //     ...defaultStyles.styles.dropDown.m_smallDropdown,
    //         //     height: "auto",
    //         //   }}
    //         name={item.name}
    //         title={item.name}
    //         list={item.attribute_default_values}
    //         displayKey="value"
    //         //   value={valueInfoData["Condition"]}
    //         //   setSelectedItem={handleValueInfo}
    //         disableSearch={true}
    //         //   defaultValue={
    //         //     data && data.valueDetails && data.valueDetails.data[0]
    //         //       ? data.valueDetails.data[0].Condition
    //         //       : ""
    //         //   }
    //       />
    //     </>
    //   );
    // } else if (data[item].dataType == "date") {
    //   return <h1>date DataType Detected</h1>;
    // } else {
    //   return <h1>invalid DataType Detected :::: {data[item].dataType}</h1>;
    // }
    // }}
  };
  const groupedFieldsPage = (fieldss) => {
    let temp = Object.values(fieldss)[0];
    let temmp = temp && Object.values(temp)[0].groupName.toUpperCase();
    console.log("Object.values(fieldss)", temmp);
    return temmp;
  };

  //   --------------LOG useEffects-------------------
  // useEffect(() => {
  //   console.log("data in FromCreator::", data);
  // }, [data]);
  // useEffect(() => {
  //   console.log("data in groupedFields::", groupedFields);
  //   let temp = Object.values(groupedFields)[0];
  //   let temmp = temp && Object.values(temp)[0].groupName.toUpperCase();
  //   console.log("Object.values(groupedFields)", temmp);
  // }, [groupedFields]);
  // -------------------------------------------------------
  return (
    <>
      <div style={{ textAlign: "center", margin: " 0 3rem" }}>
        <h1>{title}</h1>
      </div>
      <Styles.FormDiv>
        {inputFields.map((item, indx) => {
          // console.log("item in mappppp", item);
          return DynamicComponentGenerator(item);
        })}
      </Styles.FormDiv>
      <div>
        {groupedFieldsPage(groupedFields) == activeTabName &&
          Object.keys(groupedFields).map((grpField, index) => {
            const groupedFieldsItemKeys = Object.keys(groupedFields[grpField]);
            // console.log("groupedFieldsItemKeys;;", groupedFieldsItemKeys);
            groupedFieldsItemKeys.map((ItemKey) => {
              // console.log(
              //   "groupedFields[grpField][ItemKey]",
              //   groupedFields[grpField][ItemKey]
              // );

              // console.log(
              //   "groupedFields[grpField][ItemKey][subType]",
              //   groupedFields[grpField][ItemKey]["subType"]
              // );
              switch (groupedFields[grpField][ItemKey]["subType"]) {
                case "array":
                  // console.log("type arayyyyyyyyyyyyyyyy");
                  return (
                    <>
                      <h1>array type Detected</h1>
                    </>
                  );
                  break;
                case "single":
                  // console.log("type singleeeeeeeee");

                  return (
                    <>
                      <h1>single type Detected</h1>
                    </>
                  );
                  break;

                default:
                  return <h1>default type Detected</h1>;
                  break;
              }
            });

            return (
              <>
                <h1 style={{ textAlign: "center", margin: " 2rem  3rem" }}>
                  {Object.keys(groupedFields)[index]}
                </h1>
                <div style={{ margin: " 0 auto", width: "50rem" }}>
                  <Collapse>
                    <Panel header={Object.keys(groupedFields)[index]}>
                      {groupedFieldsItemKeys.map((ItemKey) => {
                        // console.log(
                        //   "groupedFields[grpField][ItemKey]",
                        //   groupedFields[grpField][ItemKey]
                        // );

                        // console.log(
                        //   "groupedFields[grpField][ItemKey][subType]",
                        //   groupedFields[grpField][ItemKey]["subType"]
                        // );
                        switch (groupedFields[grpField][ItemKey]["subType"]) {
                          case "array":
                            return SubFieldGenerator(
                              groupedFields[grpField][ItemKey]
                            );

                            break;
                          case "single":
                            return SubFieldGenerator(
                              groupedFields[grpField][ItemKey]
                            );
                            break;

                          default:
                            return <h1>default type Detected</h1>;
                            break;
                        }
                      })}
                    </Panel>
                  </Collapse>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

const TabNavigationComponent = ({
  tabs,
  activeTabIndex,
  currentTab,
  activeTabName,
  setActiveTabName,
  AllTabs,
  module
}) => {
  const [alltabs, setAllTabs] = useState(AllTabs);
  const [tabNames, setTabNames] = useState([]);

  useEffect(() => {
    let temp = tabs.map((tab) => tab.toUpperCase());
    setTabNames(temp);
  }, [tabs]);
  useEffect(() => {
    let temp2 = Object.keys(alltabs);
    temp2.map((tab) => {
      if (tabNames.includes(tab)) {
        setAllTabs((prevValue) => ({
          ...prevValue,
          [tab]: { ...prevValue[tab], enabled: true },
        }));
      }
    });
  }, [tabs]);

  useEffect(() => {
    console.log("alltabs", alltabs);
  }, [alltabs]);
  useEffect(() => {
    console.log("tabs", tabs);
  }, [tabs]);
  // console.log("activeTabs", activeTabs);
  return (
    <div>
      <Styles.TabContainer>
        {Object.keys(alltabs).map((tabName, tabIndex) => {
          return (
            <Fragment key={tabIndex}>
              {tabIndex > 0 && <Styles.SpacerLine></Styles.SpacerLine>}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "105px",
                }}
              >
                <Styles.TabBox
                  onClick={() => {
                    if (alltabs[tabName].enabled) {
                      currentTab(alltabs[tabName].name);
                      setActiveTabName(alltabs[tabName].name);
                    }
                  }}
                  isActive={alltabs[tabName].name == activeTabName}
                  isEnabled={alltabs[tabName].enabled}
                >
                  {/* {console.log(
                    "  activeTabIndex >= tabIndex && alltabs[tabName].enabled",
                    activeTabIndex,
                    tabIndex,
                    alltabs[tabName].enabled
                  )} */}
                  <Styles.TabBoxNumber>
                    {alltabs[tabName].priority}
                  </Styles.TabBoxNumber>
                </Styles.TabBox>
                <p style={{ margin: "10px 0", textAlign: "center" }}>
                  {alltabs[tabName].name}
                </p>
              </div>
            </Fragment>
          );
        })}
      </Styles.TabContainer>
    </div>
  );
};

export default InsuranceSubForm;
