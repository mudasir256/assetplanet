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
            header={`Illustration Or Actual`}
            extra={genExtra('IllustrationOrActualForm')}
          >
            {data['IllustrationOrActualForm'].illustration_or_actual ? (
              <Timeline>
                <Timeline.Item>
                  {'Is this an illustration or actual event?'} :{' '}
                  {data['IllustrationOrActualForm'].illustration_or_actual}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['IllustrationOrActualForm'].illustration_disaster ? (
              <Timeline>
                <Timeline.Item>
                  {'Illustration Disaster'} :{' '}
                  {data['IllustrationOrActualForm'].illustration_disaster}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['IllustrationOrActualForm'].actual_disaster ? (
              <Timeline>
                <Timeline.Item>
                  {'Actual Disaster'} :{' '}
                  {data['IllustrationOrActualForm'].actual_disaster}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel
            header={`Disaster Basics`}
            extra={genExtra('DisasterBasiscsForm')}
          >
            {data['DisasterBasiscsForm'].date_of_disaster ? (
              <Timeline>
                <Timeline.Item>
                  {'Date of Disaster'} :{' '}
                  {data['DisasterBasiscsForm'].date_of_disaster}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisasterBasiscsForm'].time_of_disaster ? (
              <Timeline>
                <Timeline.Item>
                  {'Time of Disaster'} :{' '}
                  {data['DisasterBasiscsForm'].time_of_disaster}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisasterBasiscsForm'].location ? (
              <Timeline>
                <Timeline.Item>
                  {'Location'} : {data['DisasterBasiscsForm'].location}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['DisasterBasiscsForm'].notes ? (
              <Timeline>
                <Timeline.Item>
                  {'Notes'} : {data['DisasterBasiscsForm'].notes}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel
            header={'Emergency Response Contact Info'}
            extra={genExtra('EmergencyResponseContactInfoForm')}
          >
            {data['EmergencyResponseContactInfoForm']
              .emergency_response_contact &&
            data['EmergencyResponseContactInfoForm'].emergency_response_contact
              .length > 0 ? (
              <React.Fragment>
                {data[
                  'EmergencyResponseContactInfoForm'
                ].emergency_response_contact.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel
                        header={index + 1}
                        // extra={this.genExtra(subForm.id)}
                      >
                        <Timeline>
                          <Timeline.Item>
                            {'Name'} : {item.name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Phone Number'} : {item.phone_number}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Date of Contact'} : {item.date_of_contact}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Department'} : {item.department}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Report Number'} : {item.report_number}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Notes'} : {item.notes}
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
          <Panel
            header={`Police Report Information`}
            extra={genExtra('PoliceReportInformationForm')}
          >
            {data['EmergencyResponseContactInfoForm']
              .emergency_response_contact &&
            data['EmergencyResponseContactInfoForm'].emergency_response_contact
              .length > 0
              ? data[
                  'EmergencyResponseContactInfoForm'
                ].emergency_response_contact.map((item,index) => {
                  return (
                    <React.Fragment>
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel header={index + 1}>
                          <Timeline>
                            <Timeline.Item>
                              {'Date Report '} : {data['PoliceReportInformationForm'][`date_report_field_${item.name}`]}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Online InPerson'} :  {data['PoliceReportInformationForm'][`online_inperson_${item.name}`]}
                            </Timeline.Item>
                            { data['PoliceReportInformationForm'][`online_inperson_${item.name}`] === 'In Person' ? (
                              <React.Fragment>
                                 <Timeline.Item>
                              {'Name of person'} :  {data['PoliceReportInformationForm'][`person_taking_report_${item.name}`]}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Phone'} :  {data['PoliceReportInformationForm'][`phone_number_${item.name}`]}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Department'} :  {data['PoliceReportInformationForm'][`department_${item.name}`]}
                            </Timeline.Item>
                              </React.Fragment>
                            ) : ''

                            }
                            <Timeline.Item>
                              {'Notes'} :  {data['PoliceReportInformationForm'][`notes_${item.name}`]}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    </React.Fragment>
                  );
                })
              : ''}

            {/* {data['PoliceReportInformationForm'].date_report_field ? (
              <Timeline>
                <Timeline.Item>
                  {'Date Report'} :{' '}
                  {data['PoliceReportInformationForm'].date_report_field}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['PoliceReportInformationForm'].online_inperson ? (
              <Timeline>
                <Timeline.Item>
                  {'Online or InPerson'} :{' '}
                  {data['PoliceReportInformationForm'].online_inperson}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['PoliceReportInformationForm'].person_taking_report ? (
              <Timeline>
                <Timeline.Item>
                  {'Person Taking Report'} :{' '}
                  {data['PoliceReportInformationForm'].person_taking_report}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['PoliceReportInformationForm'].phone_number ? (
              <Timeline>
                <Timeline.Item>
                  {'Phone Number'} :{' '}
                  {data['PoliceReportInformationForm'].phone_number}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['PoliceReportInformationForm'].department ? (
              <Timeline>
                <Timeline.Item>
                  {'Department'} :{' '}
                  {data['PoliceReportInformationForm'].department}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )}

            {data['PoliceReportInformationForm'].department ? (
              <Timeline>
                <Timeline.Item>
                  {'Notes'} : {data['PoliceReportInformationForm'].notes}
                </Timeline.Item>
              </Timeline>
            ) : (
              ''
            )} */}
          </Panel>

          {/* <Panel
            header={'Police Report'}
            extra={genExtra('PoliceReportInformationForm')}
          >
            {data['PoliceReportInformationForm'].police_report &&
            data['PoliceReportInformationForm'].police_report.length > 0 ? (
              <React.Fragment>
                {data['PoliceReportInformationForm'].police_report.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Date of FollowUp'} : {item.follow_up}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Person Spoke With'} : {item.person_spoke_with}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Follow Up Notes'} : {item.notes}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ''
            )}
          </Panel> */}
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel
            header={'Insurance Contact Info'}
            extra={genExtra('InsuranceContactInfoForm')}
          >
            {data['InsuranceContactInfoForm'].insurance_contact_info &&
            data['InsuranceContactInfoForm'].insurance_contact_info.length >
              0 ? (
              <React.Fragment>
                {data['InsuranceContactInfoForm'].insurance_contact_info.map(
                  (item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Name'} : {item.name}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Phone Number'} : {item.phone_number}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Date of Contact'} : {item.date_of_contact}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Department'} : {item.department}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Claim Number'} : {item.claim_number}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Notes'} : {item.notes}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  }
                )}
              </React.Fragment>
            ) : (
              ''
            )}
          </Panel>
        </Collapse>

        <Collapse expandIconPosition='right'>
          <Panel
            header={'Urgent Repairs and Other Expenses'}
            extra={genExtra('UrgentRepairsAndOtherExpensesForm')}
          >
            {data['UrgentRepairsAndOtherExpensesForm'].urgent_repair_expenses &&
            data['UrgentRepairsAndOtherExpensesForm'].urgent_repair_expenses
              .length > 0 ? (
              <React.Fragment>
                {data[
                  'UrgentRepairsAndOtherExpensesForm'
                ].urgent_repair_expenses.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel
                        header={index + 1}
                        // extra={this.genExtra(subForm.id)}
                      >
                        <Timeline>
                          <Timeline.Item>
                            {'Repair Made'} : {item.name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Cost of Repair'} : {item.cost_of_repair}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Upload Receipt'} : {item.upload_recipt}
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
          <Panel
            header={'Hotel Meal and Related Expenses'}
            extra={genExtra('HotelMealAndRelatedExpensesForm')}
          >
            {data['HotelMealAndRelatedExpensesForm'].hotel_meal_expenses &&
            data['HotelMealAndRelatedExpensesForm'].hotel_meal_expenses.length >
              0 ? (
              <React.Fragment>
                {data[
                  'HotelMealAndRelatedExpensesForm'
                ].hotel_meal_expenses.map((item, index) => {
                  return (
                    <Collapse defaultActiveKey='1' key={index}>
                      <Panel
                        header={index + 1}
                        // extra={this.genExtra(subForm.id)}
                      >
                        <Timeline>
                          <Timeline.Item>
                            {'Name of Hotel, Resturant, Related Expense'} :{' '}
                            {item.name}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Cost of Visit'} : {item.cost_of_visit}
                          </Timeline.Item>
                          <Timeline.Item>
                            {'Upload Receipt'} : {item.upload_recipt}
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

export default DeathSideDisplay;
