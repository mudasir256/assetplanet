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

const formID = 'AddlCostThroughoutYearForm';
class AddlCostThroughoutYearForm extends Component {
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
    this.props.handleFormInputChange(formID, 'disposable_diapers', 500);
    this.props.handleFormInputChange(formID, 'disposible_wipes', 200);
    this.props.handleFormInputChange(formID, 'formula_feeding', 1500);
    this.props.handleFormInputChange(formID, 'second_hand_clothes', 150);
    this.props.handleFormInputChange(formID, 'health_insurance', 600);
    this.props.handleFormInputChange(formID, 'new_clothes', 700);
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
    let formData = AddlCostThroughoutYearForm.FnCreateFormData({
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
                  onChange={(e) => this.props.handleInputChange(e, formID)}
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
        key === 'disposable_diapers_checked' &&
        this.props.goalsObject[formID].disposable_diapers_checked
      ) {
        if (this.props.goalsObject[formID].disposable_diapers) {
          total += parseInt(this.props.goalsObject[formID].disposable_diapers);
        }
      }

      if (
        key === 'disposible_wipes_checked' &&
        this.props.goalsObject[formID].disposible_wipes_checked
      ) {
        if (this.props.goalsObject[formID].disposible_wipes) {
          total += parseInt(this.props.goalsObject[formID].disposible_wipes);
        }
      }

      if (
        key === 'formula_feeding_checked' &&
        this.props.goalsObject[formID].formula_feeding_checked
      ) {
        if (this.props.goalsObject[formID].formula_feeding) {
          total += parseInt(this.props.goalsObject[formID].formula_feeding);
        }
      }

      if (
        key === 'new_clothes_checked' &&
        this.props.goalsObject[formID].new_clothes_checked
      ) {
        if (this.props.goalsObject[formID].new_clothes) {
          total += parseInt(this.props.goalsObject[formID].new_clothes);
        }
      }

      if (
        key === 'second_hand_clothes_checked' &&
        this.props.goalsObject[formID].second_hand_clothes_checked
      ) {
        if (this.props.goalsObject[formID].second_hand_clothes) {
          total += parseInt(this.props.goalsObject[formID].second_hand_clothes);
        }
      }

      if (
        key === 'health_insurance_checked' &&
        this.props.goalsObject[formID].health_insurance_checked
      ) {
        if (this.props.goalsObject[formID].health_insurance) {
          total += parseInt(this.props.goalsObject[formID].health_insurance);
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
            Additional Costs Throughtout Year
          </h2>
          <h5 className='text-center mb-4'>
            These are a few items most new parents need. Select and adjust cost
            as needed
          </h5>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Disposable diapers',
                'disposable_diapers',
                'disposable_diapers_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Disposible Wipes',
                'disposible_wipes',
                'disposible_wipes_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Formula Feeding (if needed)',
                'formula_feeding',
                'formula_feeding_checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'New Clothes',
                'new_clothes',
                'new_clothes_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Second-hand clothes',
                'second_hand_clothes',
                'second_hand_clothes_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Health Insurance',
                'health_insurance',
                'health_insurance_checked'
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
                this.props.dynamicFormsMovePrevious(
                  'AddlCostThroughoutYearForm'
                );
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
                this.props.dynamicFormsMoveNext('AddlCostThroughoutYearForm');
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

export default connect()(AddlCostThroughoutYearForm);
