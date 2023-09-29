import React, { Component } from "react";
import { Icon, Collapse, Timeline } from "antd";
const { Panel } = Collapse;
// import { SmileOutlined } from '@ant-design/icons';

class DivorceSideBar extends Component {
  constructor(props) {
    super(props);
  }

  getPropertyListRows = (item) => {
    return (
      <Timeline>

    <Timeline.Item color="#00CCFF" style={{ fontSize: '16px' }}>
      <p>Saparate Properties</p>
    </Timeline.Item>

        <Timeline.Item>
          {"Asset Name"} : {item.AssetName}
        </Timeline.Item>
        <Timeline.Item>
          {"Owner Name"} : {item.OwnerName}
        </Timeline.Item>
        <Timeline.Item>
          {"Asset Value"} : {item.AssetValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Type Of Account"} : {item.TypeOfAccount}
        </Timeline.Item>
        <Timeline.Item>
          {"Cost Basis Date"} : {item.CostBasisDate}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: '16px' }}>
      <p>Community Properties</p>
    </Timeline.Item>

    <Timeline.Item>
          {"Asset Name"} : {item.CAssetName}
        </Timeline.Item>
        <Timeline.Item>
          {"Asset Value"} : {item.CAssetValue}
        </Timeline.Item>

        <Timeline.Item>
          {"Cost Basis Date"} : {item.CCostBasisDate}
        </Timeline.Item>
       
      </Timeline>
    );
  };




  getBudgetChangesRows = (item) => {
    return (
      <Timeline>

    <Timeline.Item color="#00CCFF" style={{ fontSize: '16px' }}>
      <p>Budget Party 1</p>
    </Timeline.Item>

        <Timeline.Item>
          {"Asset Name"} : {item.BudgetItem}
        </Timeline.Item>
        <Timeline.Item>
          {"Owner Name"} : {item.CurrentValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Asset Value"} : {item.NewValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Type Of Account"} : {item.BudgetAmount}
        </Timeline.Item>
        <Timeline.Item>
          {"Cost Basis Date"} : {item.ResponsibleAmountParty}
        </Timeline.Item>

        <Timeline.Item color="#00CCFF" style={{ fontSize: '16px' }}>
      <p>Budget Party 2</p>
    </Timeline.Item>



    <Timeline.Item>
          {"Asset Name"} : {item.BudgetItem}
        </Timeline.Item>
        <Timeline.Item>
          {"Owner Name"} : {item.CurrentValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Asset Value"} : {item.NewValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Type Of Account"} : {item.BudgetAmount}
        </Timeline.Item>
        <Timeline.Item>
          {"Cost Basis Date"} : {item.ResponsibleAmountParty}
        </Timeline.Item>
       
      </Timeline>
    );
  };



  getRetirementDetailsRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Asset Name"} : {item.AssetName}
        </Timeline.Item>
        <Timeline.Item>
          {"Account Owner"} : {item.AccountOwner}
        </Timeline.Item>
        <Timeline.Item>
          {"Account Value"} : {item.AccountValue}
        </Timeline.Item>
        <Timeline.Item>
          {"Account Type"} : {item.AccountType}
        </Timeline.Item>
        <Timeline.Item>
          {"Value As of date"} : {item.ValueAsOfDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 1"} : {item.percent_party_1}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 2"} : {item.percent_party_2}
        </Timeline.Item>
        

       
      </Timeline>
    );
  };


  getSpousalSupportDetailsRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Reserved"} : {item.reserved}
        </Timeline.Item>
        <Timeline.Item>
          {"Waived"} : {item.waived}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 1 Pays"} : {item.party_1_pays}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 1 Pays"} : {item.party_2_pay}
        </Timeline.Item>
        <Timeline.Item>
          {"Date to Start Payment - Party 1"} : {item.startPaymentParty1}
        </Timeline.Item>
        <Timeline.Item>
          {"Date to Start Payment - Party 2"} : {item.startPaymentParty2}
        </Timeline.Item>
       
        

       
      </Timeline>
    );
  };


  getUnequalResolutionDetailsRows = (item) => {
    return (
      <Timeline>


        {/* <Timeline.Item >
          {"Any payment required to satisfy unequal division of community property"} : {item.AssetName}
        </Timeline.Item> */}
        <Timeline.Item>
          {"Party 1 Payment"} : {item.payment_party_1}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 2 Payment"} : {item.payment_party_2}
        </Timeline.Item>
       
        

       
      </Timeline>
    );
  };




  getCustodyDetailsRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Child Name"} : {item.ChildName}
        </Timeline.Item>
        <Timeline.Item>
          {"Legal Custody"} : {item.LegalCustody}
        </Timeline.Item>
        <Timeline.Item>
          {"Physical Custody"} : {item.PhysicalyCustody}
        </Timeline.Item>


       
      </Timeline>
    );
  };

  getChildSupportDetailsRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Percentage with Party 1"} : {item.percent_with__party_1}
        </Timeline.Item>
        <Timeline.Item>
          {"Percentage with Party 2"} : {item.percent_with__party_2}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 1 pays"} : {item.party_1_pays}
        </Timeline.Item>
        <Timeline.Item>
          {"Child Support Reserved for Future"} : {item.supportReservedForFuture}
        </Timeline.Item>
        <Timeline.Item>
          {"Party 2 Pays"} : {item.party_2_pays}
        </Timeline.Item>
        <Timeline.Item>
          {"Payment Start Date - Party 1"} : {item.startDateParty1}
        </Timeline.Item>
        <Timeline.Item>
          {"Payment Start Date - Party 1"} : {item.startDateParty2}
        </Timeline.Item>

        <Timeline.Item>
          {"Health Insurance Policy Maintained By"} : {item.healthInsuranceMaintainedBy}
        </Timeline.Item>
        <Timeline.Item>
          {"Health Insurance Paid By "} : {item.healthInsurancePaidBy}
        </Timeline.Item>
        <Timeline.Item>
          {"Child Care Cost Paid By"} : {item.childCareCostPaidBy}
        </Timeline.Item>


       
      </Timeline>
    );
  };

  getTaxReturnDetailsRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Percent to Party 1"} : {item.percent_to__party_1}
        </Timeline.Item>
        <Timeline.Item>
          {"Percent to Party 1"} : {item.percent_to__party_2}
        </Timeline.Item>
      


       
      </Timeline>
    );
  };


  getChecklistRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"Beneficiary changes should be done now"} : {item.beneficiary}
        </Timeline.Item>
        <Timeline.Item>
          {"Will / Trust changes should be done now"} : {item.trust}
        </Timeline.Item>
        <Timeline.Item>
          {"Ensure retitling of assets done now"} : {item.retitling}
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

        <Timeline.Item color="#00CCFF" style={{ fontSize: '18px' }}>
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


  getPropertyDetailRows = (item) => {
    return (
      <Timeline>


        <Timeline.Item>
          {"When will property be listed for scale"} : {item.scale}
        </Timeline.Item>
        <Timeline.Item>
          {"List Price"} : {item.listPrice}
        </Timeline.Item>
        <Timeline.Item>
          {"Listing Agent"} : {item.listingAgent}
        </Timeline.Item>   
        <Timeline.Item>
          {"Will cash offer be accepted "} : {item.offerAccepted}
        </Timeline.Item>  
        <Timeline.Item>
          {"Who Occipies the property currently"} : {item.propertyOccupied}
        </Timeline.Item>  
        <Timeline.Item>
          {"Property Overhead Paid by"} : {item.propertyOverheadToggle}
        </Timeline.Item>  
         <Timeline.Item>
          {"Property Overhead Paid by"} : {item.propertyOverheadParty1}
        </Timeline.Item>  
          <Timeline.Item>
          {"Property Overhead Paid by"} : {item.propertyOverheadParty2}
        </Timeline.Item>
        <Timeline.Item>
          {"Distribution of Proceeds of Sale"} : {item.distProceedsSaleParty1}
        </Timeline.Item>



        <Timeline.Item>
          {"Distribution of Proceeds of Sale"} : {item.distProceedsSaleParty2}
        </Timeline.Item>
        <Timeline.Item>
          {"Capital Gain Tax Responsibility"} : {item.gainTaxParty1}
        </Timeline.Item>
        <Timeline.Item>
          {"Capital Gain Tax Responsibility"} : {item.gainTaxParty2}
        </Timeline.Item>


       
      </Timeline>
    );
  };



  componentDidMount() {
    // console.log("INdide bidget side display", this.props.data);
  }

  render() {
    const { divorceObject, genExtra } = this.props;
    // console.log("data in display",data['CharityForm'].Description);
    return (
      <React.Fragment>
        <Collapse expandIconPosition="right" >
          <Panel
            header={"Divorce Details"}
            // extra={genExtra('InsuranceContactInfoForm')}

          >
            {/* {this.getDivorceDetailsRows(divorceObject["divorceDetails"])} */}

          
            <React.Fragment>
          
              <Collapse defaultActiveKey="1">
              <Panel>{this.getDivorceDetailsRows(divorceObject["divorceDetails"])}</Panel>

              </Collapse>
          
            </React.Fragment>
           
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Propery List"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
          
            <React.Fragment>
             
              <Collapse defaultActiveKey="1">

              <Panel>{this.getPropertyListRows(divorceObject["propertyList"])}</Panel>

              </Collapse>
            
            </React.Fragment>
            
          </Panel>
        </Collapse>


        <Collapse expandIconPosition="right">
          <Panel
            header={"Property Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >


            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getPropertyDetailRows(divorceObject["propertyDetail"])}</Panel>

              </Collapse>
            </React.Fragment>

          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Retirement Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >



            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getRetirementDetailsRows(divorceObject["retirementDetails"])}</Panel>

              </Collapse>
            </React.Fragment>


          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Unequal Resolution Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >



            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getUnequalResolutionDetailsRows(divorceObject["unequalResolution"])}</Panel>

              </Collapse>
            </React.Fragment>

          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Budget CHanges"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >



            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getBudgetChangesRows(divorceObject["budgetChanges"])}</Panel>

              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Spousal Support Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >


            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getSpousalSupportDetailsRows(divorceObject["spousalDetail"])}</Panel>

              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Custody Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >


<React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getCustodyDetailsRows(divorceObject["childCustody"])}</Panel>

              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Child Support Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >



            <React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getChildSupportDetailsRows(divorceObject["childSupport"])}</Panel>

              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Tax Return Details"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >



<React.Fragment>
              <Collapse defaultActiveKey="1">
              <Panel>{this.getTaxReturnDetailsRows(divorceObject["taxReturn"])}</Panel>

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
              <Panel>{this.getChecklistRows(divorceObject["checkList"])}</Panel>

              </Collapse>
            </React.Fragment>
          </Panel>
        </Collapse>



      </React.Fragment>
    );
  }
}

export default DivorceSideBar;
