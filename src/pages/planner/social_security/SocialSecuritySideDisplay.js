import React, { Component } from 'react';
import { Icon, Collapse, Timeline } from 'antd';
const { Panel } = Collapse;

class SocialSecuritySideDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Collapse expandIconPosition='right'>
          <Panel header={`Client Information`}>
            {data['ClientInformationForm'].client_birthdate ? (
              <Timeline>
                <Timeline.Item>
                  {'Client Birthdate'} :{' '}
                  {data['ClientInformationForm'].client_birthdate}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].retirement_year ? (
              <Timeline>
                <Timeline.Item>
                  {'Client Retirement Year'} :{' '}
                  {data['ClientInformationForm'].retirement_year}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].monthly_benefit ? (
              <Timeline>
                <Timeline.Item>
                  {'Client Monthly Benefit at Full Retirement Age'} :{' '}
                  {data['ClientInformationForm'].monthly_benefit}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].full_retirement ? (
              <Timeline>
                <Timeline.Item>
                  {'Full Retirement Age'} :{' '}
                  {data['ClientInformationForm'].full_retirement}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].cost_of_living_adjustment ? (
              <Timeline>
                <Timeline.Item>
                  {'Cost of Living Adjustment'} :{' '}
                  {data['ClientInformationForm'].cost_of_living_adjustment}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].value_of_money ? (
              <Timeline>
                <Timeline.Item>
                  {'Time Value of Money Interest Rate'} :{' '}
                  {data['ClientInformationForm'].value_of_money}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ClientInformationForm'].time_full_retirement ? (
              <Timeline>
                <Timeline.Item>
                  {'Time Until Full Retirement Age'} :{' '}
                  {data['ClientInformationForm'].time_full_retirement}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Spouse Information`}>
            {data['SpouseInformationForm'].client_birthdate ? (
              <Timeline>
                <Timeline.Item>
                  {'Spouse Birthdate'} :{' '}
                  {data['SpouseInformationForm'].client_birthdate}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].retirement_year ? (
              <Timeline>
                <Timeline.Item>
                  {'Spouse Retirement Year'} :{' '}
                  {data['SpouseInformationForm'].retirement_year}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].monthly_benefit ? (
              <Timeline>
                <Timeline.Item>
                  {'Spouse Monthly Benefit at Full Retirement Age'} :{' '}
                  {data['SpouseInformationForm'].monthly_benefit}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].full_retirement ? (
              <Timeline>
                <Timeline.Item>
                  {'Full Retirement Age'} :{' '}
                  {data['SpouseInformationForm'].full_retirement}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].cost_of_living_adjustment ? (
              <Timeline>
                <Timeline.Item>
                  {'Cost of Living Adjustment'} :{' '}
                  {data['SpouseInformationForm'].cost_of_living_adjustment}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].value_of_money ? (
              <Timeline>
                <Timeline.Item>
                  {'Time Value of Money Interest Rate'} :{' '}
                  {data['SpouseInformationForm'].value_of_money}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['SpouseInformationForm'].time_full_retirement ? (
              <Timeline>
                <Timeline.Item>
                  {'Time Until Full Retirement Age'} :{' '}
                  {data['SpouseInformationForm'].time_full_retirement}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Retirement Earning Calculator`}>
            {data['RetirementEarningForm'].begin_receiving_benefits ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter Date You Would like to Begin Receiving Benefits'} :{' '}
                  {data['RetirementEarningForm'].begin_receiving_benefits}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningForm'].estimated_earning ? (
              <Timeline>
                <Timeline.Item>
                  {'Your Estimated Earning'} :{' '}
                  {data['RetirementEarningForm'].estimated_earning}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningForm'].monthly_decrease_not_same ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Monthly Decrease in Benefits (Retirement early, not as same year as FRA)'
                  }{' '}
                  : {data['RetirementEarningForm'].monthly_decrease_not_same}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningForm'].monthly_decrease_same ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Monthly Decrease in Benefits (Retirement early, same year as FRA)'
                  }{' '}
                  : {data['RetirementEarningForm'].monthly_decrease_same}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Retirement Earning Calculator Spousal`}>
            {data['RetirementEarningSpouseForm'].begin_receiving_benefits ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter Date You Would like to Begin Receiving Benefits'} :{' '}
                  {data['RetirementEarningSpouseForm'].begin_receiving_benefits}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningSpouseForm'].estimated_earning ? (
              <Timeline>
                <Timeline.Item>
                  {'Your Estimated Earning'} :{' '}
                  {data['RetirementEarningSpouseForm'].estimated_earning}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningSpouseForm'].monthly_decrease_not_same ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Monthly Decrease in Benefits (Retirement early, not as same year as FRA)'
                  }{' '}
                  :{' '}
                  {
                    data['RetirementEarningSpouseForm']
                      .monthly_decrease_not_same
                  }
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['RetirementEarningSpouseForm'].monthly_decrease_same ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Monthly Decrease in Benefits (Retirement early, same year as FRA)'
                  }{' '}
                  : {data['RetirementEarningSpouseForm'].monthly_decrease_same}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Create Custom Scenarios`}>
            {data['CustomScenariosForm'].retirement_age_full ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Enter age (with Months) to compare taking early benefits to Full Retirement Age benefits'
                  }{' '}
                  : {data['CustomScenariosForm'].retirement_age_full}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['CustomScenariosForm'].retirement_age_70 ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Enter age (with Months) to compare taking benefits to age 70'
                  }{' '}
                  : {data['CustomScenariosForm'].retirement_age_70}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['CustomScenariosForm'].retirement_age_full_spouse ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'For Spouse: Enter age (with Months) to compare taking benefits to Full Retirement Age'
                  }{' '}
                  : {data['CustomScenariosForm'].retirement_age_full_spouse}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['CustomScenariosForm'].comparison ? (
              <Timeline>
                <Timeline.Item>
                  {'Compare Social Security benefits using any two ages'} :{' '}
                  {data['CustomScenariosForm'].comparison}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Early vs Full Retirement Age`}>
            {data['EarlyvsFullForm'].retirement_age ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter age to take benefits'} :{' '}
                  {data['EarlyvsFullForm'].retirement_age}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Early vs Age 70`}>
            {data['EarlyvsAgeForm'].retirement_age ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter age to take benefits'} :{' '}
                  {data['EarlyvsAgeForm'].retirement_age}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Spousal vs Full Retirement Age`}>
            {data['SpousevsFullForm'].retirement_age ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter age to take benefits'} :{' '}
                  {data['SpousevsFullForm'].retirement_age}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Breakeven With Full Retirement Age`}>
            {data['BreakevenFullForm'].retirement_age ? (
              <Timeline>
                <Timeline.Item>
                  {'Enter age to take benefits'} :{' '}
                  {data['BreakevenFullForm'].retirement_age}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Client Benefit`}>
            {data['ResultsForm'].lifetime_benefits ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age 62'} :{' '}
                  {data['ResultsForm'].lifetime_benefits}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['ResultsForm'].full_retirement_age ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age Full Retirement Age'} :{' '}
                  {data['ResultsForm'].full_retirement_age}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['ResultsForm'].at_age_70 ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age 70'} :{' '}
                  {data['ResultsForm'].at_age_70}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Spouse Benefit`}>
            {data['ResultsForm'].lifetime_benefits_spouse ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age 62'} :{' '}
                  {data['ResultsForm'].lifetime_benefits_spouse}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['ResultsForm'].full_retirement_age_spouse ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age Full Retirement Age'} :{' '}
                  {data['ResultsForm'].full_retirement_age_spouse}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['ResultsForm'].at_age_70_spouse ? (
              <Timeline>
                <Timeline.Item>
                  {'Lifetime Benefits At Age 70'} :{' '}
                  {data['ResultsForm'].at_age_70_spouse}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default SocialSecuritySideDisplay;
