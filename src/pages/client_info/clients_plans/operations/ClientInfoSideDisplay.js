import React from "react";
import { Icon, Collapse, Timeline } from "antd";
const { Panel } = Collapse;

function ClientInfoSideDisplay({ data }) {
  // console.log("in client side display all data",Object.keys(data["DependentsForm"][0]? data["DependentsForm"][0]["0"]:{}));


  const getClientInfoRows = (item) => {
    console.log("in client side display", item);
    return (
      <Timeline>
        <Timeline.Item>
          {"First Name"} : {item.firstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.lastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Birth Date"} : {item.clientBirthdate}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Estimated Death Age"} : {item.clientEstimatedDeathAge}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Current Age"} : {item.clientCurrentAge}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Contact Number"} : {item.clientContactNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Secondary Contact Number"} :{" "}
          {item.clientSecondaryContactNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Work Contact Number"} : {item.clientWorkContactNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Email Address"} : {item.clientEmailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Secondary Email Address"} :{" "}
          {item.clientSecondaryEmailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Gender"} : {item.clientGender}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address First Line"} : {item.clientAddressFirstLine}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address Second Line"} : {item.clientAddressSecondLine}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address City"} : {item.clientAddressCity}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address Postal Code"} : {item.clientAddressPostalCode}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address Country"} : {item.clientAddressCountry}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Address State"} : {item.clientAddressState}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Investment Knowledge"} : {item.clientInvestmentKnowledge}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Retirement Date"} : {item.clientRetirementDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Client Notes"} : {item.clientNotes}
        </Timeline.Item>
      </Timeline>
    );
  };


  const getSpusePartnerInfoRows = (item) => {
    console.log("in client side display", item);
    return (
      <Timeline>
        <Timeline.Item>
          {"First Name"} : {item.spouseFirstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.spouseLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Pertner Birth Date"} : {item.spouseBirthdate}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Pertner Estimated Age at Death"} : {item.spouseEstimatedDeathAge}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Partner Email Address - Primary"} : {item.spouseEmailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Partner Email Address - Other"} : {item.spouseSecondaryEmailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Gender"} :{" "}
          {item.spouseGender}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Partner Phone Number - Primary"} : {item.spousePrimaryContactNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Spouse/Partner Phone Number - Work"} : {item.spouseWorkContactNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Investment Knowledge"} :{" "}
          {item.spouseInvestmentKnowledge}
        </Timeline.Item>
        <Timeline.Item>
          {"Date of Retirement"} : {item.spouseRetirementDate}
        </Timeline.Item>

      </Timeline>
    );
  };



  const getDepenmdentsInfoRows = (item) => {
    console.log("depenedent form item", item.dependentFirstName);
    return (
      <Timeline>
        <Timeline.Item>
          {"First Name"} : {item.dependentFirstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.dependentLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Date of Birth"} : {item.birthDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Rekationship"} : {item.relationship}
        </Timeline.Item>
        <Timeline.Item>
          {"Gender"} : {item.gender}
        </Timeline.Item>
        <Timeline.Item>
          {"Disability"} : {item.disability}
        </Timeline.Item>
        <Timeline.Item>
          {"Disability"} : {item.childTaxCreditsEndAt}
        </Timeline.Item>


      </Timeline>
    );
  };

  const getTrustInfoRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Trust Name"} : {item.trustName}
        </Timeline.Item>
        <Timeline.Item>
          {"Beneficiaries First Name"} : {item.beneficiariesFirstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Beneficiaries Last Name"} : {item.beneficiariesLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Percent"} : {item.percent}
        </Timeline.Item>


      </Timeline>
    );
  };


  const getCorporateInfoRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Corporate Name"} : {item.corporateName}
        </Timeline.Item>
        <Timeline.Item>
          {"Corporate Type"} : {item.corporateType}
        </Timeline.Item>
        <Timeline.Item>
          {"Creation Date"} : {item.creationDate}
        </Timeline.Item>
        <Timeline.Item>
          {"State Incorporated"} : {item.stateIncorporated}
        </Timeline.Item>



      </Timeline>
    );
  };



  const getCharityInfoRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Name"} : {item.name}
        </Timeline.Item>
        <Timeline.Item>
          {"Website"} : {item.website}
        </Timeline.Item>
        <Timeline.Item>
          {"Email Address"} : {item.emailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Person First Name"} : {item.contactPersonFirstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Person Last Name"} : {item.contactPersonLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.notes}
        </Timeline.Item>


      </Timeline>
    );
  };


  const getOFIRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Relationship"} : {item.relationship}
        </Timeline.Item>
        <Timeline.Item>
          {"First Name"} : {item.firstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.lastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Email Address"} : {item.emailAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Person First Name"} : {item.contactPersonFirstName}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Person Last Name"} : {item.contactPersonLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.notes}
        </Timeline.Item>


      </Timeline>
    );
  };

  return (
    <div>
      <Collapse expandIconPosition="right">
        <Panel header={"Client Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["ClientInfoForm"] && data["ClientInfoForm"].length > 0 ? (
                  <div>
                    {data["ClientInfoForm"].map((item, index) => {
                      return (
                        <Collapse defaultActiveKey="1" key={index}>
                          <Panel header={index + 1}>
                            {getClientInfoRows(item)}
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>

      <Collapse expandIconPosition="right">
        <Panel header={"Spouse / Partner Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["SpousePartnerForm"] && data["SpousePartnerForm"].length > 0 ? (
                  <div>
                    {data["SpousePartnerForm"].map((item, index) => {
                      return (
                        <Collapse defaultActiveKey="1" key={index}>
                          <Panel header={index + 1}>
                            {getSpusePartnerInfoRows(item)}
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>



      <Collapse expandIconPosition="right">
        <Panel header={"Dependents Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["DependentsForm"] && data["DependentsForm"].length > 0 ? (
                  <div>
                    {data["DependentsForm"].map((item, index) => (
                      Object.keys(item).map((subItem, index1) => {


                        // console.log("indexB"+subItem,item[index1]);

                        return (
                          <Collapse defaultActiveKey="1" key={index1}>
                            <Panel header={index1 + 1}>
                              {getDepenmdentsInfoRows(item[index1])}
                            </Panel>
                          </Collapse>
                        );
                      })


                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>


      <Collapse expandIconPosition="right">
        <Panel header={"Trust Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["TrustForm"] && data["TrustForm"].length > 0 ? (
                  <div>
                    {data["TrustForm"].map((item, index) => (
                      Object.keys(item).map((subItem, index1) => {


                        // console.log("indexB"+subItem,item[index1]);

                        return (
                          <Collapse defaultActiveKey="1" key={index1}>
                            <Panel header={index1 + 1}>
                              {getTrustInfoRows(item[index1])}
                            </Panel>
                          </Collapse>
                        );
                      })


                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>



      <Collapse expandIconPosition="right">
        <Panel header={"Corporate Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["CorporateForm"] && data["CorporateForm"].length > 0 ? (
                  <div>
                    {data["CorporateForm"].map((item, index) => (
                      Object.keys(item).map((subItem, index1) => {


                        // console.log("indexB"+subItem,item[index1]);

                        return (
                          <Collapse defaultActiveKey="1" key={index1}>
                            <Panel header={index1 + 1}>
                              {getCorporateInfoRows(item[index1])}
                            </Panel>
                          </Collapse>
                        );
                      })


                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>




      <Collapse expandIconPosition="right">
        <Panel header={"Charity Information"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["CharityForm"] && data["CharityForm"].length > 0 ? (
                  <div>
                    {data["CharityForm"].map((item, index) => (
                      Object.keys(item).map((subItem, index1) => {


                        // console.log("indexB"+subItem,item[index1]);

                        return (
                          <Collapse defaultActiveKey="1" key={index1}>
                            <Panel header={index1 + 1}>
                              {getCharityInfoRows(item[index1])}
                            </Panel>
                          </Collapse>
                        );
                      })


                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>



      <Collapse expandIconPosition="right">
        <Panel header={"Others Financially Impacted"}>
          <div>
            <Collapse defaultActiveKey="1">
              <Panel>
                {data["OthersFinanciallyImpactedForm"] && data["OthersFinanciallyImpactedForm"].length > 0 ? (
                  <div>
                    {data["OthersFinanciallyImpactedForm"].map((item, index) => (
                      Object.keys(item).map((subItem, index1) => {


                        // console.log("indexB"+subItem,item[index1]);

                        return (
                          <Collapse defaultActiveKey="1" key={index1}>
                            <Panel header={index1 + 1}>
                              {getOFIRows(item[index1])}
                            </Panel>
                          </Collapse>
                        );
                      })


                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default ClientInfoSideDisplay;
