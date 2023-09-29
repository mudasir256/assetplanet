import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
  Row,
  Col,
  Select,
  Icon,
  Checkbox,
  Card,
  Radio,
} from 'antd';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = 'FeesTaxandMonthlyForm';
class FeesTaxandMonthlyForm extends Component {
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
      dummy: false,
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
    let formData = FeesTaxandMonthlyForm.FnCreateFormData({
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

  getCheckedInput = (label, key, checked, disabled = false) => {
    return (
      <Form.Item className='text-center'>
        <Row gutter={16}>
          <Card size='small' className='card-information'>
            <h5>{label}</h5>
            <div className='info-wrap'>
              <Col>
                <Checkbox
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                  }}
                  checked={this.props.goalsObject[formID][checked]}
                  onChange={(e) => {
                    this.props.handleFormInputChange(
                      formID,
                      checked,
                      e.target.checked
                    );
                    this.calculateTotal();
                    this.setState({ dummy: true });
                  }}
                ></Checkbox>
              </Col>
              {disabled && this.props.goalsObject[formID][checked] ? (
                <Col span={10}>
                  <Form.Item
                    label='Complete details Now or Later ?'
                    className='text-center'
                  >
                    <Radio.Group
                      buttonStyle='solid'
                      size={'large'}
                      name={`now_later`}
                      defaultValue={
                        this.props.goalsObject[formID].now_later
                          ? this.props.goalsObject[formID].now_later
                          : ''
                      }
                      onChange={(e) => {
                        this.setState({ dummy: true });
                        this.props.handleInputChange(e, formID);
                      }}
                    >
                      <Radio.Button value='yes'>Now</Radio.Button>
                      <Radio.Button value='no'>Later</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}
              {!disabled ? (
                <Col span={disabled ? 12 : 21} style={{ marginTop: 27 }}>
                  <Currency
                    disabled={!this.props.goalsObject[formID][checked]}
                    size={'large'}
                    value={
                      Object.keys(this.props.goalsObject[formID]).length === 0
                        ? ''
                        : this.props.goalsObject[formID][key]
                        ? this.props.goalsObject[formID][key]
                        : ''
                    }
                    name={key}
                    onChange={(e) => {
                      this.props.handleInputChange(e, formID);
                      this.calculateTotal();
                    }}
                  />
                </Col>
              ) : (
                ''
              )}

              {disabled &&
              this.props.goalsObject[formID][checked] &&
              this.props.goalsObject[formID].now_later === 'no' ? (
                <Col span={disabled ? 12 : 21} style={{ marginTop: 27 }}>
                  <Currency
                    disabled={!this.props.goalsObject[formID][checked]}
                    size={'large'}
                    value={
                      Object.keys(this.props.goalsObject[formID]).length === 0
                        ? ''
                        : this.props.goalsObject[formID][key]
                        ? this.props.goalsObject[formID][key]
                        : ''
                    }
                    name={key}
                    onChange={(e) => {
                      this.props.handleInputChange(e, formID);
                      this.calculateTotal();
                    }}
                  />
                </Col>
              ) : (
                ''
              )}
            </div>
          </Card>
        </Row>
      </Form.Item>
    );
  };

  calculateTotal = () => {
    let total = 0;
    for (const [key, value] of Object.entries(this.props.goalsObject[formID])) {
      if (
        key === 'taxes_checked' &&
        this.props.goalsObject[formID].taxes_checked
      ) {
        if (this.props.goalsObject[formID].taxes) {
          total += parseInt(this.props.goalsObject[formID].taxes);
        }
      }

      if (
        key === 'utilities_checked' &&
        this.props.goalsObject[formID].utilities_checked
      ) {
        if (this.props.goalsObject[formID].utilities) {
          total += parseInt(this.props.goalsObject[formID].utilities);
        }
      }

      if (
        key === 'payroll_checked' &&
        this.props.goalsObject[formID].payroll_checked
      ) {
        if (this.props.goalsObject[formID].payroll) {
          total += parseInt(this.props.goalsObject[formID].payroll);
        }
      }

      if (
        key === 'insurance_checked' &&
        this.props.goalsObject[formID].insurance_checked
      ) {
        if (this.props.goalsObject[formID].insurance) {
          total += parseInt(this.props.goalsObject[formID].insurance);
        }
      }

      if (
        key === 'depriciation_scheduled_checked' &&
        this.props.goalsObject[formID].depriciation_scheduled_checked
      ) {
        if (this.props.goalsObject[formID].depriciation_scheduled) {
          total += parseInt(
            this.props.goalsObject[formID].depriciation_scheduled
          );
        }
      }
    }
    this.props.handleFormInputChange(formID, 'total', total);
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>
            Fees, Taxes and Monthly
          </h2>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Taxes (Variable. 21% corporate tax rate for 2020)',
                'taxes',
                'taxes_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Utilities ($2/square foot of office space)',
                'utilities',
                'utilities_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Payroll (35% - 50% of total budget)',
                'payroll',
                'payroll_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Insurance ($100 - 125/month)',
                'insurance',
                'insurance_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Depreciation Schedule for Real Estate (only if property owned)',
                'depriciation_scheduled',
                'depriciation_scheduled_checked',
                true
              )}
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
                this.props.dynamicFormsMovePrevious('FeesTaxandMonthlyForm');
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
                this.props.dynamicFormsMoveNext('FeesTaxandMonthlyForm');
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

export default connect()(FeesTaxandMonthlyForm);
