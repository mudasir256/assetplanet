import React, { Component } from "react";
import { Icon, Collapse, Timeline } from "antd";
const { Panel } = Collapse;
// import { SmileOutlined } from '@ant-design/icons';

class DeathSideDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list1: [
        { PersonalInstructions: "here", UploadFileHere: "abc.jpeg" },
        { PersonalInstructions: "ali", UploadFileHere: "abc.jpeg" },
        { PersonalInstructions: "asghar", UploadFileHere: "abc.jpeg" },
      ],
    };
  }

  getContactListRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Contact List</p>
        </Timeline.Item>

        <Timeline.Item>
          {"Name"} : {item.Name}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.LastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Address"} : {item.Address}
        </Timeline.Item>
        <Timeline.Item>
          {"City"} : {item.City}
        </Timeline.Item>
        <Timeline.Item>
          {"State"} : {item.State}
        </Timeline.Item>
        <Timeline.Item>
          {"Country"} : {item.Country}
        </Timeline.Item>
        <Timeline.Item>
          {"Zip Code"} : {item.ZipCode}
        </Timeline.Item>
        <Timeline.Item>
          {"Phone"} : {item.Phone}
        </Timeline.Item>
        <Timeline.Item>
          {"Alternate Phone"} : {item.AlternatePhone}
        </Timeline.Item>
        <Timeline.Item>
          {"Part Of My Professional Team"} : {item.PartOfMyProfessionalTeam}
        </Timeline.Item>
        <Timeline.Item>
          {"Company"} : {item.Company}
        </Timeline.Item>
        <Timeline.Item>
          {"Type Of Relation"} : {item.TypeOfRelation}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Professional Team</p>
        </Timeline.Item>

        <Timeline.Item>
          {"Name"} : {item.tName}
        </Timeline.Item>
        <Timeline.Item>
          {"Last Name"} : {item.tLastName}
        </Timeline.Item>
        <Timeline.Item>
          {"Address"} : {item.tAddress}
        </Timeline.Item>
        <Timeline.Item>
          {"City"} : {item.tCity}
        </Timeline.Item>
        <Timeline.Item>
          {"State"} : {item.tState}
        </Timeline.Item>
        <Timeline.Item>
          {"Country"} : {item.tCountry}
        </Timeline.Item>
        <Timeline.Item>
          {"Zip Code"} : {item.tZipCode}
        </Timeline.Item>
        <Timeline.Item>
          {"Phone"} : {item.tPhone}
        </Timeline.Item>
        <Timeline.Item>
          {"Alternate Phone"} : {item.tAlternatePhone}
        </Timeline.Item>
        <Timeline.Item>
          {"Part Of My Professional Team"} : {item.tPartOfMyProfessionalTeam}
        </Timeline.Item>
        <Timeline.Item>
          {"Company"} : {item.tCompany}
        </Timeline.Item>
        <Timeline.Item>
          {"Type Of Relation"} : {item.tTypeOfRelation}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.tNotes}
        </Timeline.Item>
      </Timeline>
    );
  };

  getImportantDocumentsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Important Documents</p>
        </Timeline.Item>

        <Timeline.Item>
          {"Document Name"} : {item.DocumentName}
        </Timeline.Item>
        <Timeline.Item>
          {"Document Type"} : {item.DocumentType}
        </Timeline.Item>
        <Timeline.Item>
          {"Storage Location Of Document"} : {item.StorageLocationOfDocument}
        </Timeline.Item>
        <Timeline.Item>
          {"Reciept"} : {item.File}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Insurance Poilicies</p>
        </Timeline.Item>

        <Timeline.Item>
          {"Policy's Nickname"} : {item.PolicysNickname}
        </Timeline.Item>
        <Timeline.Item>
          {"Policy Number"} : {item.PolicyNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Carrier"} : {item.Carrier}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Name"} : {item.ContactName}
        </Timeline.Item>
        <Timeline.Item>
          {"Insurance Type"} : {item.InsuranceType}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact Phone"} : {item.ContactPhone}
        </Timeline.Item>
      </Timeline>
    );
  };

  getEmailsTextsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Emails</p>
        </Timeline.Item>

        <Timeline.Item>
          {"To"} : {item.To}
        </Timeline.Item>
        <Timeline.Item>
          {"CC"} : {item.CC}
        </Timeline.Item>
        <Timeline.Item>
          {"Subject"} : {item.Subject}
        </Timeline.Item>
        <Timeline.Item>
          {"Relationship"} : {item.Relationship}
        </Timeline.Item>
        <Timeline.Item>
          {"Template Nickname"} : {item.TemplateNickname}
        </Timeline.Item>
        <Timeline.Item>
          {"Template"} : {item.Template}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: "16px" }}>
          <p>Texts</p>
        </Timeline.Item>

        <Timeline.Item>
          {"To"} : {item.TextTo}
        </Timeline.Item>
        <Timeline.Item>
          {"Phone"} : {item.Phone}
        </Timeline.Item>
        <Timeline.Item>
          {"Relationship"} : {item.TextRelationship}
        </Timeline.Item>
        <Timeline.Item>
          {"Template Nickname"} : {item.TextTemplateNickname}
        </Timeline.Item>
        <Timeline.Item>
          {"Text Message"} : {item.TextMessage}
        </Timeline.Item>
      </Timeline>
    );
  };

  getPrepaidBurialExpensesRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Name Of Place"} : {item.NameOfPlace}
        </Timeline.Item>
        <Timeline.Item>
          {"Location / Plot"} : {item.Location}
        </Timeline.Item>
        <Timeline.Item>
          {"Address"} : {item.Address}
        </Timeline.Item>
        <Timeline.Item>
          {"Items Paid For"} : {item.ItemsPaidFor}
        </Timeline.Item>
        <Timeline.Item>
          {"Director"} : {item.Director}
        </Timeline.Item>
        <Timeline.Item>
          {"Phone Number"} : {item.PhoneNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Amount Paid"} : {item.AmountPaid}
        </Timeline.Item>
        <Timeline.Item>
          {"Date Paid"} : {item.DatePaid}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>
      </Timeline>
    );
  };

  getPersonalItemsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Personal Item"} : {item.PersonalItem}
        </Timeline.Item>
        <Timeline.Item>
          {"Location"} : {item.Location}
        </Timeline.Item>
        <Timeline.Item>
          {"Personal Wishes"} : {item.PersonalWishes}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>
      </Timeline>
    );
  };

  getLitigationRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Litigation Nickname"} : {item.LitigationNickname}
        </Timeline.Item>
        <Timeline.Item>
          {"Potential Liability"} : {item.PotentialLiability}
        </Timeline.Item>
        <Timeline.Item>
          {"Potential Win/Loss"} : {item.PotentialWinLoss}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>
        <Timeline.Item>
          {"File"} : {item.Upload}
        </Timeline.Item>
      </Timeline>
    );
  };

  getBillsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Amount"} : {item.Amount}
        </Timeline.Item>
        <Timeline.Item>
          {"Payee Name"} : {item.PayeeName}
        </Timeline.Item>
        <Timeline.Item>
          {"Category"} : {item.Category}
        </Timeline.Item>
        <Timeline.Item>
          {"Frequency"} : {item.Frequency}
        </Timeline.Item>
        <Timeline.Item>
          {"Source"} : {item.Source}
        </Timeline.Item>
        <Timeline.Item>
          {"Whose Bill"} : {item.WhoseBill}
        </Timeline.Item>
        <Timeline.Item>
          {"Due Date"} : {item.DueDate}
        </Timeline.Item>

        <Timeline.Item>
          {"Reciept"} : {item.Receipt}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes "} : {item.Notes}
        </Timeline.Item>
      </Timeline>
    );
  };

  getPersonalInstructionsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Personal Instructions"} : {item.PersonalInstructions}
        </Timeline.Item>
        <Timeline.Item>
          {"File"} : {item.UploadFileHere}
        </Timeline.Item>
      </Timeline>
    );
  };


  getAccountsAssetsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Asset Name"} : {item.AssetName}
        </Timeline.Item>
        <Timeline.Item>
          {"Held Where"} : {item.AccountType}
        </Timeline.Item>
        <Timeline.Item>
          {"Account Type"} : {item.HeldWhere}
        </Timeline.Item>
        <Timeline.Item>
          {"Monetry Value"} : {item.MonetaryValue}
        </Timeline.Item>
      </Timeline>
    );
  };

  getPasswordsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Site / App / Program"} : {item.SiteAppProgram}
        </Timeline.Item>
        <Timeline.Item>
          {"User Name"} : {item.UserName}
        </Timeline.Item>
        <Timeline.Item>
          {"Who's Password"} : {item.WhosPassword}
        </Timeline.Item>
        <Timeline.Item>
          {"Password hint"} : {item.PasswordHint}
        </Timeline.Item>
        <Timeline.Item>
          {"Website URL"} : {item.WebsiteURL}
        </Timeline.Item>
        <Timeline.Item>
          {"2FA"} : {item.TwoFA}
        </Timeline.Item>
        <Timeline.Item>
          {"Pin"} : {item.Pin}
        </Timeline.Item>
        <Timeline.Item>
          {"Security Question"} : {item.SecurityQuestion}
        </Timeline.Item>
        <Timeline.Item>
          {"Answer"} : {item.Answer}
        </Timeline.Item>
        <Timeline.Item>
          {"Notes"} : {item.Notes}
        </Timeline.Item>
      </Timeline>
    );
  };

  getDivorceDetailsRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Party 1"} : {item.percent_party_1}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 2"} : {item.percent_party_2}
        </Timeline.Item>
        <Timeline.Item>
          {"Children"} : {item.children}
        </Timeline.Item>
        <Timeline.Item>
          {"Separation Date"} : {item.separationDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Marriage Date"} : {item.marriageDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Pregnant"} : {item.pregnant}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: "18px" }}>
          <p>If in California</p>
        </Timeline.Item>

        <Timeline.Item>
          {"Case Number"} : {item.caseNumber}
        </Timeline.Item>
        <Timeline.Item>
          {"Country Of Petition"} : {item.countryOfPetition}
        </Timeline.Item>
        <Timeline.Item>
          {"Petitioner in the Case"} : {item.petitioner}
        </Timeline.Item>
      </Timeline>
    );
  };

  getChecklistRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Audio / Video Message"} : {item.audio_video_message}
        </Timeline.Item>
        <Timeline.Item>
          {"Checklist"} : {item.checklist}
        </Timeline.Item>
        <Timeline.Item>
          {"Contact List"} : {item.contact_list}
        </Timeline.Item>
        <Timeline.Item>
          {"Emails to Send "} : {item.emails_to_send}
        </Timeline.Item>
        <Timeline.Item>
          {"Important Document"} : {item.important_document}
        </Timeline.Item>
        <Timeline.Item>
          {"Personal Instructions"} : {item.personal_instructions}
        </Timeline.Item>
        <Timeline.Item>
          {"List of Large Bills"} : {item.list_of_large_bills}
        </Timeline.Item>
        <Timeline.Item>
          {"Litigation List"} : {item.litigation_list}
        </Timeline.Item>
        <Timeline.Item>
          {"Location of Personal Items"} : {item.location_of_personal_items}
        </Timeline.Item>

        <Timeline.Item>
          {"List of Passwords"} : {item.list_of_passwords}
        </Timeline.Item>
        <Timeline.Item>
          {"Prepaid Burial Expenses"} : {item.prepaid_burial_expenses}
        </Timeline.Item>
        <Timeline.Item>
          {"Will"} : {item.will}
        </Timeline.Item>
        <Timeline.Item>
          {"Trust"} : {item.trust}
        </Timeline.Item>
        <Timeline.Item>
          {"Advance Health Directives"} : {item.advance_health_directives}
        </Timeline.Item>
      </Timeline>
    );
  };

  componentDidMount() {
    // console.log("INdide bidget side display", this.props.data);
  }

  render() {
    const { data, genExtra } = this.props;

    return (
      <React.Fragment>
        <Collapse expandIconPosition="right">
          <Panel
            header={"Audio Video Message"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                {/* <Panel>{this.getPropertyListRows(divorceObject["propertyList"])}</Panel> */}
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Checklist"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>{this.getChecklistRows(data["checkList"])}</Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Personal Instructions"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {console.log("getPersonalInstructionsRows rows",data)} */}

                  {/* {this.getPersonalInstructionsRows(
                    data["personalInstructionsForm"]
                  )} */}

                  {/* {data["personalInstructionsForm"].map((data,index)=>{

return(
  <Collapse defaultActiveKey='1' key={index}>
  <Panel header={index + 1}>{this.getPersonalInstructionsRows(data)}</Panel>
</Collapse>
)

  })} */}

                  {data["personalInstructionsForm"] &&
                    data["personalInstructionsForm"].length > 0 ? (
                    <React.Fragment>
                      {data["personalInstructionsForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getPersonalInstructionsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Contact List"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getContactListRows(data["contactListForm"])} */}
                  {data["contactListForm"] &&
                    data["contactListForm"].length > 0 ? (
                    <React.Fragment>
                      {data["contactListForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getContactListRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Emails & Texts"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getEmailsTextsRows(data["emailToSendForm"])} */}
                  {data["emailToSendForm"] &&
                    data["emailToSendForm"].length > 0 ? (
                    <React.Fragment>
                      {data["emailToSendForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getEmailsTextsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Prepaid Burial Expense"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getPrepaidBurialExpensesRows(
                    data["prepaidBurialExpenseForm"]
                  )} */}

                  {data["prepaidBurialExpenseForm"] &&
                    data["prepaidBurialExpenseForm"].length > 0 ? (
                    <React.Fragment>
                      {data["prepaidBurialExpenseForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getPrepaidBurialExpensesRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"List of Passwords"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getPasswordsRows(data["listOfPasswordsForm"])} */}
                  {data["listOfPasswordsForm"] &&
                    data["listOfPasswordsForm"].length > 0 ? (
                    <React.Fragment>
                      {data["listOfPasswordsForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getPasswordsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Upcomming Bills"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getBillsRows(data["billsToPayForm"])} */}
                  {data["billsToPayForm"] &&
                    data["billsToPayForm"].length > 0 ? (
                    <React.Fragment>
                      {data["billsToPayForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getBillsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>



        <Collapse expandIconPosition="right">
          <Panel
            header={" Accounts and Assets"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getBillsRows(data["billsToPayForm"])} */}
                  {data["accountAssetForm"] &&
                    data["accountAssetForm"].length > 0 ? (
                    <React.Fragment>
                      {data["accountAssetForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getAccountsAssetsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>


        <Collapse expandIconPosition="right">
          <Panel
            header={"Important Documents"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getImportantDocumentsRows(data["documentsForm"])} */}
                  {/* {this.getLitigationRows(data["litigationForm"])} */}
                  {data["documentsForm"] &&
                    data["documentsForm"].length > 0 ? (
                    <React.Fragment>
                      {data["documentsForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getImportantDocumentsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Litigation"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getLitigationRows(data["litigationForm"])} */}
                  {data["litigationForm"] &&
                    data["litigationForm"].length > 0 ? (
                    <React.Fragment>
                      {data["litigationForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getLitigationRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Personal Items Location"}
          // extra={genExtra('InsuranceContactInfoForm')}
          >
            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getPersonalItemsRows(data["personalItemLocationForm"])} */}
                  {data["personalItemLocationForm"] &&
                    data["personalItemLocationForm"].length > 0 ? (
                    <React.Fragment>
                      {data["personalItemLocationForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getPersonalItemsRows(item)}
                            </Panel>
                          </Collapse>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </Panel>
              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default DeathSideDisplay;
