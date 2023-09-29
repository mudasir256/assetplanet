import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Icon,
  Radio,
  Card,
  Checkbox,
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = 'NewArrivalForm';
class NewArrivalForm extends Component {
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
    this.props.handleFormInputChange(formID, 'crib_mattress', 500);
    this.props.handleFormInputChange(formID, 'bassinet', 200);
    this.props.handleFormInputChange(formID, 'changing_table', 185);
    this.props.handleFormInputChange(formID, 'blanket_bedding', 50);
    this.props.handleFormInputChange(formID, 'baby_monitor', 40);
    this.props.handleFormInputChange(formID, 'rocking_chair_gliding', 350);
    this.props.handleFormInputChange(formID, 'dresser', 100);
    this.props.handleFormInputChange(formID, 'decorations', 50);
    this.props.handleFormInputChange(formID, 'diaper_pail', 30);
    this.setState({ dummy: true });
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
    let formData = NewArrivalForm.FnCreateFormData({
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

  getCheckedInput = (label, key, checked) => {
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
              <Col span={21}>
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
        key === 'crib_mattress_checked' &&
        this.props.goalsObject[formID].crib_mattress_checked
      ) {
        if (this.props.goalsObject[formID].crib_mattress) {
          total += parseInt(this.props.goalsObject[formID].crib_mattress);
        }
      }

      if (
        key === 'changing_table_checked' &&
        this.props.goalsObject[formID].changing_table_checked
      ) {
        if (this.props.goalsObject[formID].changing_table) {
          total += parseInt(this.props.goalsObject[formID].changing_table);
        }
      }

      if (
        key === 'blanket_bedding_checked' &&
        this.props.goalsObject[formID].blanket_bedding_checked
      ) {
        if (this.props.goalsObject[formID].blanket_bedding) {
          total += parseInt(this.props.goalsObject[formID].blanket_bedding);
        }
      }

      if (
        key === 'baby_monitor_checked' &&
        this.props.goalsObject[formID].baby_monitor_checked
      ) {
        if (this.props.goalsObject[formID].baby_monitor) {
          total += parseInt(this.props.goalsObject[formID].baby_monitor);
        }
      }

      if (
        key === 'rocking_chair_gliding_checked' &&
        this.props.goalsObject[formID].rocking_chair_gliding_checked
      ) {
        if (this.props.goalsObject[formID].rocking_chair_gliding) {
          total += parseInt(
            this.props.goalsObject[formID].rocking_chair_gliding
          );
        }
      }

      if (
        key === 'dresser_checked' &&
        this.props.goalsObject[formID].dresser_checked
      ) {
        if (this.props.goalsObject[formID].dresser) {
          total += parseInt(this.props.goalsObject[formID].dresser);
        }
      }

      if (
        key === 'decorations_checked' &&
        this.props.goalsObject[formID].decorations_checked
      ) {
        if (this.props.goalsObject[formID].decorations) {
          total += parseInt(this.props.goalsObject[formID].decorations);
        }
      }

      if (
        key === 'diaper_pail_checked' &&
        this.props.goalsObject[formID].diaper_pail_checked
      ) {
        if (this.props.goalsObject[formID].diaper_pail) {
          total += parseInt(this.props.goalsObject[formID].diaper_pail);
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
            Preparing for the New Arrival
          </h2>
          <h5 className='text-center mb-4'>
            {' '}
            These are a few items most new parents need. Select and adjust cost
            as needed
          </h5>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Crib and Mattress',
                'crib_mattress',
                'crib_mattress_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput('Bassinet', 'bassinet', 'bassinet_checked')}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Changing Table',
                'changing_table',
                'changing_table_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Blankets / Bedding',
                'blanket_bedding',
                'blanket_bedding_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Baby Monitor',
                'baby_monitor',
                'baby_monitor_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Rocking Chair / Glider',
                'rocking_chair_gliding',
                'rocking_chair_gliding_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput('Dresser', 'dresser', 'dresser_checked')}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Decorations and Other Misc',
                'decorations',
                'decorations_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Diaper Pail',
                'diaper_pail',
                'diaper_pail_checked'
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
                this.props.dynamicFormsMovePrevious('NewArrivalForm');
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
                console.log('Object Data ', this.props.goalsObject[formID]);
                // this.props.dynamicFormsMoveNext('NewArrivalForm');
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

export default connect()(NewArrivalForm);
