import React, { Component } from 'react';
import { Icon, Collapse, Timeline } from 'antd';
const { Panel } = Collapse;

class DebtSideDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, genExtra } = this.props;
    return (
      <React.Fragment>
        <Collapse expandIconPosition='right'>
          <Panel header={`Date or Dollar`}>
            {data['DebtPayoffForm'].date_or_dollar ? (
              <Timeline>
                <Timeline.Item>
                  {'Date or Dollar'} : {data['DebtPayoffForm'].date_or_dollar}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['DebtPayoffForm'].debt_free_date_first ? (
              <Timeline>
                <Timeline.Item>
                  {'Extra Principle Payments'} :{' '}
                  {data['DebtPayoffForm'].debt_free_date_first}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['DebtPayoffForm'].principle_payments ? (
              <Timeline>
                <Timeline.Item>
                  {'Choose Debt Free Date'} :{' '}
                  {data['DebtPayoffForm'].principle_payments}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Sort Table By`}>
            {data['DebtPayoffForm'].sort_table ? (
              <Timeline>
                <Timeline.Item>
                  {'Sort Table'} : {data['DebtPayoffForm'].sort_table}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={'Future Inheritence Information'}>
            {data['DebtPayoffForm'].debt_rows &&
            data['DebtPayoffForm'].debt_rows.length > 0 ? (
              <React.Fragment>
                {data['DebtPayoffForm'].debt_rows.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel header={index + 1}>
                        <Timeline>
                          <Timeline.Item>
                            {'Name of Liability'} : {item.name_of_liability}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Original Months to Payoff'} :{' '}
                            {item.original_months}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Original Cummulative Interest'} :{' '}
                            {item.cumulative_interest}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Original Payment'} : {item.original_payment}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'New Months to Payoff'} : {item.new_months}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'New Cummulative Interest'} :{' '}
                            {item.new_cumulative_interest}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'New Payment'} : {item.new_payment}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Interest Saved'} : {item.interest_saved}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Current Monthly Payment'} :{' '}
                            {item.current_monthly_payment}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Addl Monthly Payment'} :{' '}
                            {item.addl_monthly_payment}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Last Payment Amount'} : {item.last_payment_amount}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Total Amount to Pay'} : {item.total_amount_pay}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Access push for Debt Free'} : {item.access_push}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Next Payment Date'} : {item.next_payment}
                          </Timeline.Item>
                        </Timeline>
                      </Panel>
                    </Collapse>
                  );
                })}
              </React.Fragment>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Total`}>
            {data['DebtPayoffForm'].total_months_saved ? (
              <Timeline>
                <Timeline.Item>
                  {'Total Months Saved'} :{' '}
                  {data['DebtPayoffForm'].total_months_saved}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DebtPayoffForm'].interest_saved_total ? (
              <Timeline>
                <Timeline.Item>
                  {'Total Interest Saved'} :{' '}
                  {data['DebtPayoffForm'].interest_saved_total}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DebtPayoffForm'].debt_free_date ? (
              <Timeline>
                <Timeline.Item>
                  {'Debt Free Date'} : {data['DebtPayoffForm'].debt_free_date}
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

export default DebtSideDisplay;
