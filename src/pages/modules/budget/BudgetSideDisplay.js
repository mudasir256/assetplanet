import React, { Component } from "react";
import { Icon, Collapse, Timeline } from "antd";
const { Panel } = Collapse;

class BudgetSideDisplay extends Component {
  constructor(props) {
    super(props);
  }

  getRows = (item) => {
    return (
      <Timeline>
        <Timeline.Item>
          {"Subcategory"} : {item.Subcategory}
        </Timeline.Item>
        <Timeline.Item>
          {"Description"} : {item.Description}
        </Timeline.Item>
        <Timeline.Item>
          {"Budget"} : {item.Budget}
        </Timeline.Item>
        <Timeline.Item>
          {"Actual"} : {item.Actual}
        </Timeline.Item>
        <Timeline.Item>
          {"Frequency"} : {item.Frequency}
        </Timeline.Item>
        <Timeline.Item>
          {"Who"} : {item.Who}
        </Timeline.Item>
        <Timeline.Item>
          {"Start Date"} : {item.StartDate}
        </Timeline.Item>
        <Timeline.Item>
          {"End Date"} : {item.EndDate}
        </Timeline.Item>
        <Timeline.Item>
          {"Future Amount"} : {item.FutureAmount}
        </Timeline.Item>
        <Timeline.Item>
          {"Date of Change"} : {item.DateOfChange}
        </Timeline.Item>
        <Timeline.Item>
          {"Inflation Rate"} : {item.InflationRate}
        </Timeline.Item>
        <Timeline.Item>
          {"Deductible Now"} : {item.DeductibleNow}
        </Timeline.Item>
        <Timeline.Item>
          {"Deductible Retirement"} : {item.DeductibleRetirement}
        </Timeline.Item>
      </Timeline>
    );
  };
  componentDidMount() {
    
  }

  render() {
    const { data, genExtra } = this.props;
    
    return (
      <React.Fragment>
        <Collapse expandIconPosition="right">
          <Panel
            header={"Charity"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data['CharityForm'] &&
            data['CharityForm'] > 0 ? ( */}
            <React.Fragment>
              {/* {data['CharityForm'].map((item, index) => {
                  console.log("inside right bvar loop", item);
                  return ( */}
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["CharityForm"])} */}
                  {data["CharityForm"] &&
                  data["CharityForm"].length > 0 ? (
                    <React.Fragment>
                      {data["CharityForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
              {/* );
                })} */}
            </React.Fragment>
            {/* ) : (
              ''
            )} */}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition="right">
          <Panel
            header={"Child and Family Care"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data['ChildandFamilyCareForm'].child_family_rows &&
            data['ChildandFamilyCareForm'].child_family_rows.length > 0 ? ( */}
            <React.Fragment>
              {/* {data['ChildandFamilyCareForm'].child_family_rows.map(
                  (item, index) => {
                    return ( */}
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["ChildandFamilyCareForm"])} */}
                  {data["ChildandFamilyCareForm"] &&
                  data["ChildandFamilyCareForm"].length > 0 ? (
                    <React.Fragment>
                      {data["ChildandFamilyCareForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
              {/* );
                  }
                )} */}
            </React.Fragment>
            {/* ) : (
              ''
            )} */}
          </Panel>
        </Collapse>


        <Collapse expandIconPosition="right">
          <Panel
            header={"Debt Payments"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data['DebtPaymentForm'].debt_payment_rows &&
            data['DebtPaymentForm'].debt_payment_rows.length > 0 ? (
              <React.Fragment>
                {data['DebtPaymentForm'].debt_payment_rows.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel header={index + 1}>{this.getRows(item)}</Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ''
            )} */}

            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["DebtPaymentForm"])} */}
                  {data["DebtPaymentForm"] &&
                  data["DebtPaymentForm"].length > 0 ? (
                    <React.Fragment>
                      {data["DebtPaymentForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Entertainment"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["EntertainmentForm"].entertainment_rows &&
            data["EntertainmentForm"].entertainment_rows.length > 0 ? (
              <React.Fragment>
                {data["EntertainmentForm"].entertainment_rows.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey="1" key={index}>
                        <Panel header={index + 1}>{this.getRows(item)}</Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ""
            )} */}


            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["EntertainmentForm"])} */}
                  {data["EntertainmentForm"] &&
                  data["EntertainmentForm"].length > 0 ? (
                    <React.Fragment>
                      {data["EntertainmentForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Professional Services"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["ProfessionalForm"].professional_rows &&
            data["ProfessionalForm"].professional_rows.length > 0 ? (
              <React.Fragment>
                {data["ProfessionalForm"].professional_rows.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey="1" key={index}>
                        <Panel header={index + 1}>{this.getRows(item)}</Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ""
            )} */}


            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["ProfessionalForm"])} */}
                  {data["ProfessionalForm"] &&
                  data["ProfessionalForm"].length > 0 ? (
                    <React.Fragment>
                      {data["ProfessionalForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Home"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["HomeForm"].home_rows &&
            data["HomeForm"].home_rows.length > 0 ? (
              <React.Fragment>
                {data["HomeForm"].home_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}


            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["HomeForm"])} */}
                    {/* {this.getRows(data["ProfessionalForm"])} */}
                    {data["HomeForm"] &&
                  data["HomeForm"].length > 0 ? (
                    <React.Fragment>
                      {data["HomeForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Insurance"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["InsuranceForm"].insurance_rows &&
            data["InsuranceForm"].insurance_rows.length > 0 ? (
              <React.Fragment>
                {data["InsuranceForm"].insurance_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}

            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["InsuranceForm"])} */}
                  {data["InsuranceForm"] &&
                  data["InsuranceForm"].length > 0 ? (
                    <React.Fragment>
                      {data["InsuranceForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Personal Care"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["PersonalCareForm"].personal_care_rows &&
            data["PersonalCareForm"].personal_care_rows.length > 0 ? (
              <React.Fragment>
                {data["PersonalCareForm"].personal_care_rows.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey="1" key={index}>
                        <Panel header={index + 1}>{this.getRows(item)}</Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ""
            )} */}

<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["PersonalCareForm"])} */}

                  {data["PersonalCareForm"] &&
                  data["PersonalCareForm"].length > 0 ? (
                    <React.Fragment>
                      {data["PersonalCareForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Pets"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["PetForm"].pet_rows && data["PetForm"].pet_rows.length > 0 ? (
              <React.Fragment>
                {data["PetForm"].pet_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}


            <React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["PetForm"])} */}

                  {data["PetForm"] &&
                  data["PetForm"].length > 0 ? (
                    <React.Fragment>
                      {data["PetForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Shopping"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["ShoppingForm"].shopping_rows &&
            data["ShoppingForm"].shopping_rows.length > 0 ? (
              <React.Fragment>
                {data["ShoppingForm"].shopping_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}


<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["ShoppingForm"])} */}
                  {data["ShoppingForm"] &&
                  data["ShoppingForm"].length > 0 ? (
                    <React.Fragment>
                      {data["ShoppingForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Transportation"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["TransportationForm"].transportation_rows &&
            data["TransportationForm"].transportation_rows.length > 0 ? (
              <React.Fragment>
                {data["TransportationForm"].transportation_rows.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey="1" key={index}>
                        <Panel header={index + 1}>{this.getRows(item)}</Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ""
            )} */}


<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["TransportationForm"])} */}
                  {data["TransportationForm"] &&
                  data["TransportationForm"].length > 0 ? (
                    <React.Fragment>
                      {data["TransportationForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Utilities"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["UtilitiesForm"].utilites_rows &&
            data["UtilitiesForm"].utilites_rows.length > 0 ? (
              <React.Fragment>
                {data["UtilitiesForm"].utilites_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}


<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["UtilitiesForm"])} */}
                  {data["UtilitiesForm"] &&
                  data["UtilitiesForm"].length > 0 ? (
                    <React.Fragment>
                      {data["UtilitiesForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Finance"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["FinanceForm"].finance_rows &&
            data["FinanceForm"].finance_rows.length > 0 ? (
              <React.Fragment>
                {data["FinanceForm"].finance_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}

<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["FinanceForm"])} */}
                  {data["FinanceForm"] &&
                  data["FinanceForm"].length > 0 ? (
                    <React.Fragment>
                      {data["FinanceForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Business"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["BusinessForm"].business_rows &&
            data["BusinessForm"].business_rows.length > 0 ? (
              <React.Fragment>
                {data["BusinessForm"].business_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}


<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["BusinessForm"])} */}
                  {data["BusinessForm"] &&
                  data["BusinessForm"].length > 0 ? (
                    <React.Fragment>
                      {data["BusinessForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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
            header={"Saving for Goal"}
            // extra={genExtra('InsuranceContactInfoForm')}
          >
            {/* {data["SavingGoalForm"].saving_goal_rows &&
            data["SavingGoalForm"].saving_goal_rows.length > 0 ? (
              <React.Fragment>
                {data["SavingGoalForm"].saving_goal_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey="1" key={index}>
                      <Panel header={index + 1}>{this.getRows(item)}</Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ""
            )} */}

<React.Fragment>
              <Collapse defaultActiveKey="1">
                <Panel>
                  {/* {this.getRows(data["SavingGoalForm"])} */}
                  {data["SavingGoalForm"] &&
                  data["SavingGoalForm"].length > 0 ? (
                    <React.Fragment>
                      {data["SavingGoalForm"].map((item, index) => {
                        return (
                          <Collapse defaultActiveKey="1" key={index}>
                            <Panel header={index + 1}>
                              {this.getRows(item)}
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

export default BudgetSideDisplay;
