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
  Checkbox,
  Card,
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = 'GoalDetailFormChild';
class GoalDetailFormChild extends Component {
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
    this.props.handleFormInputChange(formID, 'natural', 12500);
    this.props.handleFormInputChange(formID, 'adoption', 20000);
    this.props.handleFormInputChange(formID, 'fertility', 48500);
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
    let formData = GoalDetailFormChild.FnCreateFormData({
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
    const { size } = this.state;

    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>Pre-Birth</h2>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Natural: $10,000 to $15,000',
                'natural',
                'checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Adoption: $8,000 to $40,000',
                'adoption',
                'checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Fertility: $22,000 to $75,000',
                'fertility',
                'checked'
              )}
            </Col>
          </Row>

          <h2 className='text-center font-weight-bold mb-4'>
            Goal Financial Information
          </h2>
          <Row gutter={16} type='flex' justify='center'>
            {this.props.currentFormTitle !== 'Add Child to Family' ? (
              <Col span={16}>
                <Form.Item label='Dollar Amount Needed'>
                  <Currency
                    size={size}
                    value={
                      Object.keys(this.props.goalsObject[formID]).length === 0
                        ? ''
                        : this.props.goalsObject[formID].amount_needed
                        ? this.props.goalsObject[formID].amount_needed
                        : ''
                    }
                    name='amount_needed'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Col>
              <Form.Item
                label='Inflation Rate for this Goal'
                className='text-center'
              >
                <Radio.Group
                  buttonStyle='solid'
                  size={size}
                  name='inflation_rate'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                  defaultValue={this.props.goalsObject[formID].inflation_rate}
                >
                  <Radio.Button value='general'>General %</Radio.Button>
                  <Radio.Button value='education'>Education %</Radio.Button>
                  <Radio.Button value='housing'>Housing %</Radio.Button>
                  <Radio.Button value='medical'>Medical %</Radio.Button>
                  <Radio.Button value='luxury'>Luxury %</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Amount Needed In Future with Inflation'>
                <Currency
                  size={size}
                  //   defaultValue={
                  //     this.props.goalsObject[formID].amount_needed_in_future
                  //       ? this.props.goalsObject[formID].amount_needed_in_future
                  //       : ''
                  //   }
                  value={
                    Object.keys(this.props.goalsObject[formID]).length === 0
                      ? ''
                      : this.props.goalsObject[formID].amount_needed_in_future
                      ? this.props.goalsObject[formID].amount_needed_in_future
                      : ''
                  }
                  name='amount_needed_in_future'
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
                this.props.dynamicFormsMovePrevious('GoalDetailFormChild');
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
                this.props.dynamicFormsMoveNext('GoalDetailFormChild');
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

export default connect()(GoalDetailFormChild);
