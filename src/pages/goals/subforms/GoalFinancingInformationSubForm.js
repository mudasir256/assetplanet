import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Radio, Icon, Input, Select } from 'antd';
import Currency from '../../../components/form/Currency';
import { countries } from '../../../constants/moving_countries';
import { counties } from '../../../constants/county';
import { states } from '../../../constants/moving_states';

const { Option } = Select;

const formID = 'GoalFinancingInformationSubForm';
class GoalFinancingInformationSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Goal Financing Information',
      fields: [
        {
          id: 'dollar_amount_needed',
          title: 'Dollar Amount Needed',
          value: data['dollar_amount_needed'],
        },
        {
          id: 'inflation_rate',
          title: 'Inflation Rate for this Goal',
          value: data['inflation_rate'],
        },
        {
          id: 'moving_to',
          title: 'Country Moving To',
          value: data['moving_to'],
        },
        {
          id: 'moving_cost',
          title: 'One-Time Moving Cost',
          value: data['moving_cost'],
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
        dollar_amount_needed: '',
      },
      temp: false,

      size: 'large',
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] === 'dollar_amount_needed') {
          formData['dollar_amount_needed'] =
            newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] === 'inflation_rate') {
          formData['inflation_rate'] = newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;

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

  goNextForm() {
    let formData = GoalFinancingInformationSubForm.FnCreateFormData({
      dollar_amount_needed: this.state.formData['dollar_amount_needed'],
      inflation_rate: this.state.formData['inflation_rate'],
      moving_to: this.state.formData['moving_to'],
      moving_cost: this.state.formData['moving_cost'],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm('QuestionFinancialAssitanceSubForm');
  }

  goPreviousForm() {
    this.props.cbGoSubForm('GoalInformationSubForm');
  }

  render() {
    const { size } = this.state;
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <h2 className='text-center font-weight-bold mb-4'>
            Goal Financing Information
          </h2>
          {this.props.currentFormTitle &&
          (this.props.currentFormTitle === 'Moving State' ||
            this.props.currentFormTitle === 'Moving Country') ? (
            <React.Fragment>
              {this.props.currentFormTitle === 'Moving State' ? (
                <h3 className='text-center font-weight-bold mb-4'>
                  Moving State Information
                </h3>
              ) : (
                <h3 className='text-center font-weight-bold mb-4'>
                  Moving Country Information
                </h3>
              )}
              <Row gutter={16} type='flex' justify='center'>
                <Col span={16}>
                  <Col>
                    <Form.Item
                      label={`${
                        this.props.currentFormTitle === 'Moving State'
                          ? 'State'
                          : 'Country'
                      } Moving To`}
                      className='text-center'
                    >
                      <Select
                        size={size}
                        showSearch
                        onChange={(value) =>
                          this.props.handleSelectChange(
                            'moving_to',
                            value,
                            formID
                          )
                        }
                        defaultValue={
                          this.props.goalsObject[formID].state_moving_to
                        }
                      >
                        {this.props.currentFormTitle === 'Moving Country'
                          ? countries.map((country, index) => {
                              return (
                                <Option key={index} value={country}>
                                  {country}
                                </Option>
                              );
                            })
                          : ''}

                        {this.props.currentFormTitle === 'Moving State'
                          ? states.map((state, index) => {
                              return (
                                <Option key={index} value={state}>
                                  {state}
                                </Option>
                              );
                            })
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      label='One-Time Moving Cost'
                      className='text-center'
                    >
                      <Currency
                        value={
                          this.props.goalsObject[formID].moving_cost
                            ? this.props.goalsObject[formID].moving_cost
                            : ''
                        }
                        name='moving_cost'
                        onChange={(e) =>
                          this.props.handleInputChange(e, formID)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            ''
          )}

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              {this.props.currentFormTitle !== 'Moving State' &&
              this.props.currentFormTitle !== 'Moving Country' &&
              this.props.currentFormTitle !== 'Start a Business' ? (
                <Col>
                  <Form.Item
                    label='Dollar Amount Needed'
                    className='text-center'
                  >
                    <Currency
                      value={
                        this.props.goalsObject[formID].dollar_amount_needed
                          ? this.props.goalsObject[formID].dollar_amount_needed
                          : ''
                      }
                      name='dollar_amount_needed'
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}

              {this.props.currentFormTitle === 'Start a Business' ? (
                <Col>
                  <Form.Item label={`Type of Business`} className='text-center'>
                    <Select
                      size={size}
                      showSearch
                      onChange={(value) =>
                        this.props.handleSelectChange(
                          'type_of_business',
                          value,
                          formID
                        )
                      }
                      defaultValue={
                        this.props.goalsObject[formID].type_of_business
                      }
                    >
                      <Option value='Manufacturing'>Manufacturing</Option>
                      <Option value='Retail'>Retail</Option>
                      <Option value='Wholesale'>Wholesale</Option>
                      <Option value='Service'>Service</Option>
                      <Option value='Other'>Other</Option>
                    </Select>
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
            </Col>
          </Row>
          {!this.props.currentFormTitle === 'Start a Business' ? (
            <Row gutter={16} type='flex' justify='center'>
              <Col span={16}>
                <Form.Item
                  label='Amount Needed in Future with Inflation'
                  className='text-center'
                >
                  <Currency
                    value={
                      this.props.goalsObject[formID].amount_needed_in_future
                        ? this.props.goalsObject[formID].amount_needed_in_future
                        : ''
                    }
                    name='amount_needed_in_future'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                    // onChange={(event) => this.handleInputChange(event)}
                  />
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ''
          )}
        </div>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() =>
                this.props.dynamicFormsMovePrevious(
                  'GoalFinancingInformationSubForm'
                )
              }
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
                // this.goNextForm();
                this.props.dynamicFormsMoveNext(
                  'GoalFinancingInformationSubForm'
                );
                console.log('x ', this.props.goalsObject);
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

export default connect()(GoalFinancingInformationSubForm);
