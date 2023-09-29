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
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const formID = 'PrivateEducationDetails';
class PrivateEducationDetails extends Component {
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
        showkTab: false,
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
    let formData = PrivateEducationDetails.FnCreateFormData({
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
      this.props.cbGoSubForm('RoomBoardMiscSubForm');
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
            Private Education Details
          </h2>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Person Attending School'>
                <Select
                  size={size}
                  showSearch
                  onChange={(value) =>
                    this.props.handleSelectChange(
                      'person_attending_school',
                      value,
                      formID
                    )
                  }
                  defaultValue={
                    this.props.goalsObject[formID].person_attending_school
                  }
                >
                  <Option value='Ava Jones'>Ava Jones</Option>
                  <Option value='Frank Jones'>Frank Jones</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Name of Institution'>
                <Input
                  size={size}
                  name='name_of_institution'
                  defaultValue={
                    this.props.goalsObject[formID].name_of_institution
                  }
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='Level Of Education'>
                <Select
                  size={size}
                  showSearch
                  onChange={(value) => {
                    if (value === 'K12') this.setState({ showkTab: true });
                    else this.setState({ showkTab: false });
                    this.props.handleSelectChange(
                      'level_of_education',
                      value,
                      formID
                    );
                  }}
                  defaultValue={
                    this.props.goalsObject[formID].level_of_education
                  }
                >
                  <Option value='K12'>K-12</Option>
                  <Option value='Undergraduate'>Undergraduate</Option>
                  <Option value='Masters'>Masters</Option>
                  <Option value='Doctoral'>Doctoral</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label='For how many years ?'>
                <Input
                  size={size}
                  name='how_many_years'
                  defaultValue={this.props.goalsObject[formID].how_many_years}
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Estimated Annual Tution Cost'>
                <Currency
                  value=''
                  size={size}
                  name='estimated_annual_tution_cost'
                  value={
                    this.props.goalsObject[formID].estimated_annual_tution_cost
                      ? this.props.goalsObject[formID]
                          .estimated_annual_tution_cost
                      : ''
                  }
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label='Inflation Rate'>
                <Radio.Group
                  buttonStyle='solid'
                  size={size}
                  name='inflation_rate'
                  onChange={(e) => this.props.handleInputChange(e, formID)}
                  defaultValue={this.props.goalsObject[formID].inflation_rate}
                >
                  <Radio.Button value='General'>General %</Radio.Button>
                  <Radio.Button value='Education'>Education %</Radio.Button>
                  <Radio.Button value='Housing'>Housing %</Radio.Button>
                  <Radio.Button value='Medical'>Medical %</Radio.Button>
                  <Radio.Button value='Luxury'>Luxury %</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {this.props.goalsObject[formID].level_of_education &&
        this.props.goalsObject[formID].level_of_education === 'K12' ? (
          <div className='info-form-block pl-5 pr-5'>
            <h2 className='text-center font-weight-bold mb-4'>
              Private Education K-12 Section
            </h2>
            <Row gutter={16} type='flex' justify='center'>
              <Col span={16}>
                <Form.Item label='Start Date'>
                  <DatePicker
                    style={{ width: '100%' }}
                    format={dateFormat}
                    size={size}
                    onChange={(date, dateString) =>
                      this.handleDatePickerChange(
                        'k_start_date',
                        date,
                        dateString
                      )
                    }
                    value={
                      this.state.formData.k_start_date == null ||
                      this.state.formData.k_start_date == ''
                        ? null
                        : moment(this.state.formData.k_start_date, dateFormat)
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='Additional Non-Tution Cost'>
                  <Currency
                    value=''
                    size={size}
                    name='additional_non_tution_cost'
                    value={
                      this.props.goalsObject[formID].additional_non_tution_cost
                        ? this.props.goalsObject[formID]
                            .additional_non_tution_cost
                        : ''
                    }
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='Remaining Years (If Aleady Attending)'>
                  <Input
                    size={size}
                    name='remaining_years'
                    defaultValue={
                      this.props.goalsObject[formID].remaining_years
                    }
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ) : null}

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('FORM ', this.props.goalsObject);
                this.props.dynamicFormsMovePrevious('PrivateEducationDetails');
                // this.props.goToSelectionPage();
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
                this.goNextForm();
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

export default connect()(PrivateEducationDetails);
