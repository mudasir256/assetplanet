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

const formID = 'FeedingForm';
class FeedingForm extends Component {
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
    this.props.handleFormInputChange(formID, 'electric_breast_pump', 85);
    this.props.handleFormInputChange(formID, 'manual_breast_pump', 20);
    this.props.handleFormInputChange(formID, 'nursing_pillow', 25);
    this.props.handleFormInputChange(formID, 'bottle_nipples_brushes', 25);
    this.props.handleFormInputChange(formID, 'high_chair', 125);
    this.props.handleFormInputChange(formID, 'bottle_sterillizer', 90);
    this.props.handleFormInputChange(formID, 'bowls_plates', 20);
    this.props.handleFormInputChange(formID, 'baby_safety_items', 50);
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
    let formData = FeedingForm.FnCreateFormData({
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
        key === 'electric_breast_pump_checked' &&
        this.props.goalsObject[formID].electric_breast_pump_checked
      ) {
        if (this.props.goalsObject[formID].electric_breast_pump) {
          total += parseInt(
            this.props.goalsObject[formID].electric_breast_pump
          );
        }
      }

      if (
        key === 'manual_breast_pump_checked' &&
        this.props.goalsObject[formID].manual_breast_pump_checked
      ) {
        if (this.props.goalsObject[formID].manual_breast_pump) {
          total += parseInt(this.props.goalsObject[formID].manual_breast_pump);
        }
      }

      if (
        key === 'nursing_pillow_checked' &&
        this.props.goalsObject[formID].nursing_pillow_checked
      ) {
        if (this.props.goalsObject[formID].nursing_pillow) {
          total += parseInt(this.props.goalsObject[formID].nursing_pillow);
        }
      }

      if (
        key === 'bottle_nipples_brushes_checked' &&
        this.props.goalsObject[formID].bottle_nipples_brushes_checked
      ) {
        if (this.props.goalsObject[formID].bottle_nipples_brushes) {
          total += parseInt(
            this.props.goalsObject[formID].bottle_nipples_brushes
          );
        }
      }

      if (
        key === 'high_chair_checked' &&
        this.props.goalsObject[formID].high_chair_checked
      ) {
        if (this.props.goalsObject[formID].high_chair) {
          total += parseInt(this.props.goalsObject[formID].high_chair);
        }
      }

      if (
        key === 'bottle_sterillizer_checked' &&
        this.props.goalsObject[formID].bottle_sterillizer_checked
      ) {
        if (this.props.goalsObject[formID].bottle_sterillizer) {
          total += parseInt(this.props.goalsObject[formID].bottle_sterillizer);
        }
      }

      if (
        key === 'bowls_plates_checked' &&
        this.props.goalsObject[formID].bowls_plates_checked
      ) {
        if (this.props.goalsObject[formID].bowls_plates) {
          total += parseInt(this.props.goalsObject[formID].bowls_plates);
        }
      }

      if (
        key === 'baby_safety_items_checked' &&
        this.props.goalsObject[formID].baby_safety_items_checked
      ) {
        if (this.props.goalsObject[formID].baby_safety_items) {
          total += parseInt(this.props.goalsObject[formID].baby_safety_items);
        }
      }
    }
    this.props.handleFormInputChange(formID, 'total', total);
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block pl-5 pr-5'>
          <h2 className='text-center font-weight-bold mb-4'>Feeding</h2>
          <h5 className='text-center mb-4'>
            These are a few items most new parents need. Select and adjust cost
            as needed
          </h5>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.getCheckedInput(
                'Electric Breast Pump',
                'electric_breast_pump',
                'electric_breast_pump_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Manual Breast Pump',
                'manual_breast_pump',
                'manual_breast_pump_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Nursing Pillow',
                'nursing_pillow',
                'nursing_pillow_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Bottles, Nipples, and Brushes',
                'bottle_nipples_brushes',
                'bottle_nipples_brushes_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'High Chair',
                'high_chair',
                'high_chair_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Bottle Sterilizer',
                'bottle_sterillizer',
                'bottle_sterillizer_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Bowls, Plates, Flatware and other misc',
                'bowls_plates',
                'bowls_plates_checked'
              )}
            </Col>

            <Col span={16}>
              {this.getCheckedInput(
                'Baby Safety Items (locks, foam bumpers and etc)',
                'baby_safety_items',
                'baby_safety_items_checked'
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
                this.props.dynamicFormsMovePrevious('FeedingForm');
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
                this.props.dynamicFormsMoveNext('FeedingForm');
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

export default connect()(FeedingForm);
