import React, { Component } from 'react';
import { Icon, Collapse, Timeline } from 'antd';
const { Panel } = Collapse;

class DeathSideDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, genExtra } = this.props;
    return (
      <React.Fragment>
        <Collapse expandIconPosition='right'>
          <Panel
            header={`Disability Information`}
            // extra={genExtra('DisabilityInformationForm')}
          >
            {data['DisabilityInformationForm'].illustration_or_actual ? (
              <Timeline>
                <Timeline.Item>
                  {'Illustration or Actual'} :{' '}
                  {data['DisabilityInformationForm'].illustration_or_actual}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['DisabilityInformationForm'].date_disability_occured ? (
              <Timeline>
                <Timeline.Item>
                  {'Date Disability Occurred'} :{' '}
                  {data['DisabilityInformationForm'].date_disability_occured}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisabilityInformationForm'].person_disabled ? (
              <Timeline>
                <Timeline.Item>
                  {'Person Disabled'} :{' '}
                  {data['DisabilityInformationForm'].person_disabled}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisabilityInformationForm'].length_of_disability ? (
              <Timeline>
                <Timeline.Item>
                  {'Length of Disability'} :{' '}
                  {data['DisabilityInformationForm'].length_of_disability}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisabilityInformationForm'].unable_to_perform_your_job ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Are you unable to perform your job? (Own Occupation Disability)'
                  }{' '}
                  :{' '}
                  {data['DisabilityInformationForm'].unable_to_perform_your_job}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisabilityInformationForm']
              .unable_to_perform_your_job_any ? (
              <Timeline>
                <Timeline.Item>
                  {
                    'Are you unable to perform your job? (Any Occupation Disability)'
                  }{' '}
                  :{' '}
                  {
                    data['DisabilityInformationForm']
                      .unable_to_perform_your_job_any
                  }
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel
            header={`Expenses and Income`}
            // extra={genExtra('ExpensesAndIncomeForm')}
          >
            {data['ExpensesAndIncomeForm'].monthly_expense_total ? (
              <Timeline>
                <Timeline.Item>
                  {'Monthly Expense Total'} :{' '}
                  {data['ExpensesAndIncomeForm'].monthly_expense_total}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
            {data['ExpensesAndIncomeForm'].monthly_income_total ? (
              <Timeline>
                <Timeline.Item>
                  {'Contact List'} :{' '}
                  {data['ExpensesAndIncomeForm'].monthly_income_total}
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

export default DeathSideDisplay;
