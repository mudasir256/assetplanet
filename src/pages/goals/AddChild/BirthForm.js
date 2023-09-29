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

const formID = 'BirthForm';
class BirthForm extends Component {
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
      isChecked: false,
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
    this.props.handleFormInputChange(formID, 'home_birth', 3000);
    this.props.handleFormInputChange(formID, 'birth_center', 4000);
    this.props.handleFormInputChange(formID, 'viginal_birth', 8000);
    this.props.handleFormInputChange(formID, 'viginal_birth_without', 15000);
    this.props.handleFormInputChange(formID, 'c_section_birth', 10000);
    this.props.handleFormInputChange(formID, 'c_section_birth_without', 20000);
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
    let formData = BirthForm.FnCreateFormData({
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
                  checked={
                    this.props.goalsObject[formID][checked] === key &&
                    this.state.isChecked
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    this.props.handleFormInputChange(formID, checked, key);
                    this.setState({ isChecked: e.target.checked });
                  }}
                ></Checkbox>
              </Col>
              <Col span={21}>
                <Currency
                  disabled={
                    this.props.goalsObject[formID][checked] === key &&
                    this.state.isChecked
                      ? false
                      : true
                  }
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

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>Birth</h2>
          <h5 className='text-center  mb-4'>
            Planning a birth option is the next step. Choose one below and
            utilize the average cost, or adjust as necessary.
          </h5>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput('Home Birth', 'home_birth', 'checked')}
            </Col>

            <Col span={16}>
              {this.getCheckedInput('Birth Center', 'birth_center', 'checked')}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Viginal Birth with Health Insurance',
                'viginal_birth',
                'checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'Viginal Birth without Health Insurance',
                'viginal_birth_without',
                'checked'
              )}
            </Col>
            <Col span={16}>
              {this.getCheckedInput(
                'C-Section Birth with Health Insurance',
                'c_section_birth',
                'checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'C-Section Birth without Health Insurance',
                'c_section_birth_without',
                'checked'
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
                this.props.dynamicFormsMovePrevious('BirthForm');
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
                this.props.dynamicFormsMoveNext('BirthForm');
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

export default connect()(BirthForm);
