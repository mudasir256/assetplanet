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
  Card,
  Checkbox,
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = 'StartupExpenseForm';
class StartupExpenseForm extends Component {
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
    let formData = StartupExpenseForm.FnCreateFormData({
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
      if(key === 'equipment_checked' && this.props.goalsObject[formID].equipment_checked ) {
        if( this.props.goalsObject[formID].equipment) {
          total += parseInt(this.props.goalsObject[formID].equipment);
        }
      }

      if(key === 'office_space_checked' && this.props.goalsObject[formID].office_space_checked ) {
        if( this.props.goalsObject[formID].office_space) {
          total += parseInt(this.props.goalsObject[formID].office_space);
        }
      }

      if(key === 'inventory_checked' && this.props.goalsObject[formID].inventory_checked ) {
        if( this.props.goalsObject[formID].inventory) {
          total += parseInt(this.props.goalsObject[formID].inventory);
        }
      }

      if(key === 'office_furniture_checked' && this.props.goalsObject[formID].office_furniture_checked ) {
        if( this.props.goalsObject[formID].office_furniture) {
          total += parseInt(this.props.goalsObject[formID].office_furniture);
        }
      }

      if(key === 'legal_fees_checked' && this.props.goalsObject[formID].legal_fees_checked ) {
        if( this.props.goalsObject[formID].legal_fees) {
          total += parseInt(this.props.goalsObject[formID].legal_fees);
        }
      }

      if(key === 'initial_buildout_checked' && this.props.goalsObject[formID].initial_buildout_checked ) {
        if( this.props.goalsObject[formID].initial_buildout) {
          total += parseInt(this.props.goalsObject[formID].initial_buildout);
        }
      }
    }
    this.props.handleFormInputChange(formID, 'total', total);
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>Startup Expense</h2>
          <h5 className='text-center  mb-4'>
            These expenses occur BEFORE the business is open. Shown are typical
            expense costs. Select and adjust as needed
          </h5>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Equipment ($5,000 - $150,000)',
                'equipment',
                'equipment_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Office Space (Monthly $200 - $1,200/ Employee)',
                'office_space',
                'office_space_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Inventory (Up to 25% of total budget)',
                'inventory',
                'inventory_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Office Furniture and Supplies (10% of total budget)',
                'office_furniture',
                'office_furniture_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Legal Fees ($100 - $250)',
                'legal_fees',
                'legal_fees_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Initial Build-Out Costs ($1,000 - $25,000)',
                'initial_buildout',
                'initial_buildout_checked'
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
                this.props.dynamicFormsMovePrevious('StartupExpenseForm');
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
                this.props.dynamicFormsMoveNext('StartupExpenseForm');
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

export default connect()(StartupExpenseForm);
