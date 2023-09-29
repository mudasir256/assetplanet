import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Select, Icon, Collapse, Timeline } from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const { Panel } = Collapse;

const formID = 'OperatingExpenseForm';
class OperatingExpenseForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Goal Information',
      fields: [
        {
          id: 'goal_description',
          title: 'Goal Information',
          value: data['goal_description'],
        },
        {
          id: 'goal_date',
          title: 'Start a Business Date',
          value: data['goal_date'],
        },
        {
          id: 'goal_assigned_to',
          title: 'Goal Assigned To',
          value: data['goal_assigned_to'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);
    this.state = {
      enableNext: false,
      formData: {
        goal_description: '',
        goal_date: '',
        goal_assigned_to: '',
      },
      size: 'large',
    };
    this.goNextForm = this.goNextForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] == 'goal_description') {
          formData['goal_description'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'goal_date') {
          formData['goal_date'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'goal_assigned_to') {
          formData['goal_assigned_to'] = newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;
      if (formData['goal_description'] != '') {
        enableNext = true;
      }

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

  handleFormInputChange(name, value) {
    let formData = this.state.formData;
    formData[name] = value;

    let newState = {
      formData: formData,
    };

    if (formData['goal_description'] != '') {
      newState['enableNext'] = true;
    } else {
      newState['enableNext'] = false;
    }

    this.setState(newState);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(name, value);
  }

  handleSelectChange(name, value) {
    this.handleFormInputChange(name, value);
  }

  handleDatePickerChange(name, date, dateString) {
    this.handleFormInputChange(name, dateString);
  }

  getFormValue(name) {
    if (this.state.formData.length) {
      return this.state.formData[name];
    } else {
      return null;
    }
  }

  goNextForm() {
    let formData = OperatingExpenseForm.FnCreateFormData({
      goal_description: this.state.formData['goal_description'],
      goal_date: this.state.formData['goal_date'],
      goal_assigned_to: this.state.formData['goal_assigned_to'],
    });

    this.props.cbUpdateSubForm(formID, formData);

    if (this.props.selectedGoal === 'Retirement') {
      this.props.cbGoSubForm('RetirementSubForm');
    } else if (this.props.selectedGoal === 'Rental / Investment Property') {
      this.props.cbGoSubForm('RentalPropertySubForm');
    } else if (this.props.selectedGoal === 'Private Education') {
      this.props.cbGoSubForm('PrivateEducationSubForm');
    } else {
      this.props.cbGoSubForm('GoalFinancingInformationSubForm');
    }
  }

  render() {
    const { size } = this.state;

    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>
            Operating Expense
          </h2>
          <h5 className='text-center  mb-4'>Operation Costs Year 1</h5>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Payroll'>
                <Currency
                  size={size}
                  size={'large'}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].payroll
                      ? this.props.goalsObject[formID].payroll
                      : ''
                  }
                  name='payroll'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Legal'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].legal
                      ? this.props.goalsObject[formID].legal
                      : ''
                  }
                  name='legal'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Rent / Lease'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].rent_lease
                      ? this.props.goalsObject[formID].rent_lease
                      : ''
                  }
                  name='rent_lease'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Taxes'>
                <Collapse expandIconPosition='right'>
                  <Panel header={`Menu`}>
                    <Timeline>
                      <Timeline.Item>
                        <Form.Item label='Local'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].local
                                ? this.props.goalsObject[formID].local
                                : ''
                            }
                            name='local'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='State'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].state
                                ? this.props.goalsObject[formID].state
                                : ''
                            }
                            name='state'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Federal'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].federal
                                ? this.props.goalsObject[formID].federal
                                : ''
                            }
                            name='federal'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                    </Timeline>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Utilities'>
                <Collapse expandIconPosition='right'>
                  <Panel header={`Menu`}>
                    <Timeline>
                      <Timeline.Item>
                        <Form.Item label='Telecom'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].telecom
                                ? this.props.goalsObject[formID].telecom
                                : ''
                            }
                            name='telecom'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Electricity'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].electricity
                                ? this.props.goalsObject[formID].electricity
                                : ''
                            }
                            name='electricity'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Water'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].water
                                ? this.props.goalsObject[formID].water
                                : ''
                            }
                            name='water'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Waste'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].waste
                                ? this.props.goalsObject[formID].waste
                                : ''
                            }
                            name='waste'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Gas'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].gas
                                ? this.props.goalsObject[formID].gas
                                : ''
                            }
                            name='gas'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                      <Timeline.Item>
                        <Form.Item label='Other'>
                          <Currency
                            size={size}
                            size={'large'}
                            value={
                              Object.keys(this.props.goalsObject[formID])
                                .length === 0
                                ? ''
                                : this.props.goalsObject[formID].other
                                ? this.props.goalsObject[formID].other
                                : ''
                            }
                            name='other'
                            onChange={(e) =>
                              this.props.handleInputChange(e, formID)
                            }
                          />
                        </Form.Item>
                      </Timeline.Item>
                    </Timeline>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Supplies'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].supplies
                      ? this.props.goalsObject[formID].supplies
                      : ''
                  }
                  name='supplies'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Marketing'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].marketing
                      ? this.props.goalsObject[formID].marketing
                      : ''
                  }
                  name='marketing'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Travel'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].travel
                      ? this.props.goalsObject[formID].travel
                      : ''
                  }
                  name='travel'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Service / Repairs'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].service_repairs
                      ? this.props.goalsObject[formID].service_repairs
                      : ''
                  }
                  name='service_repairs'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Outside Contractors'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].outside_contractors
                      ? this.props.goalsObject[formID].outside_contractors
                      : ''
                  }
                  name='outside_contractors'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Other'>
                <Currency
                  size={size}
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].Other
                      ? this.props.goalsObject[formID].Other
                      : ''
                  }
                  name='Other'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('FORM ', this.props.goalsObject);
                // this.props.goToSelectionPage();
                this.props.dynamicFormsMovePrevious('OperatingExpenseForm');
              }}
            >
              <Icon type='left' />
              Previous
            </Button>
          </div>
          <div className='col-4 d-flex justify-content-end'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('Object Data ', this.props.goalsObject);
                this.props.dynamicFormsMoveNext('OperatingExpenseForm');
              }}
            >
              Next
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(OperatingExpenseForm);
