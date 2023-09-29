import React, { Component } from 'react';
import { Collapse, Timeline } from 'antd';
const { Panel } = Collapse;

class AssistanceSideDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Collapse expandIconPosition='right'>
          <Panel header={`Providing or Receiving`}>
            {data['ProvidingReceivingForm'].assistance ? (
              <Timeline>
                <Timeline.Item>
                  {'Are you providing or receiving assistance ?'} :{' '}
                  {data['ProvidingReceivingForm'].assistance}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={`Current or Future`}>
            {data['CurrentFutureForm'].type ? (
              <Timeline>
                <Timeline.Item>
                  {'Is this Current Assistance or Future Inheritance ?'} :{' '}
                  {data['CurrentFutureForm'].type}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel header={'Current Assistance Information'}>
            {data['CurrentAssistanceInformationForm']
              .current_assistance_information &&
            data['CurrentAssistanceInformationForm']
              .current_assistance_information.length > 0 ? (
              <React.Fragment>
                {data[
                  'CurrentAssistanceInformationForm'
                ].current_assistance_information.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel header={index + 1}>
                        <Timeline>
                          <Timeline.Item>
                            {'First Name'} : {item.first_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Last Name'} : {item.last_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Relationship'} : {item.relationship}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Person Providing Assistance'} : {item.providing}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Estimated Start Date'} : {item.start_date}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Assistance Ends At'} : {item.assistance_ends}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Total Amount Received'} : {item.total_amount}
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
          <Panel header={'Future Inheritance Information'}>
            {data['FutureInheritanceInformationForm']
              .future_inheritance_information &&
            data['FutureInheritanceInformationForm']
              .future_inheritance_information.length > 0 ? (
              <React.Fragment>
                {data[
                  'FutureInheritanceInformationForm'
                ].future_inheritance_information.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel header={index + 1}>
                        <Timeline>
                          <Timeline.Item>
                            {'Expected Inheritance Amount'} :{' '}
                            {item.inheritance_amount}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Year of Expected Inheritance'} :{' '}
                            {item.expected_inheritance}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'First Name'} : {item.first_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Last Name'} : {item.last_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Relationship'} : {item.relationship}
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
          <Panel header={'Providing Assistance Information'}>
            {data['ProvidingAssistanceInformationForm']
              .providing_assistance_information &&
            data['ProvidingAssistanceInformationForm']
              .providing_assistance_information.length > 0 ? (
              <React.Fragment>
                {data[
                  'ProvidingAssistanceInformationForm'
                ].providing_assistance_information.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel header={index + 1}>
                        <Timeline>
                          <Timeline.Item>
                            {'First Name'} : {item.first_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Last Name'} : {item.last_name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Person Providing Assistance'} : {item.providing}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Estimated Start Date'} : {item.start_date}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Estimated End Date'} : {item.end_date}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Assistance Ends at Death'} : {item.end_at}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Annual Gifting Amount'} : {item.gifting_amount}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Add to Monthly Budget'} : {item.monthly_budget}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Budget Item'} : {item.budget_item}
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
      </React.Fragment>
    );
  }
}

export default AssistanceSideDisplay;
