import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Form, DatePicker, Input, Button, Icon, Radio } from 'antd';
import Currency from '../../../components/form/Currency';
import QuestionRoomBoardMisc from './QuestionRoomBoardMisc';

const options = [
  'Friends / Family',
  'Savings',
  'Student Loan',
  'Scholorships / Grants',
  'Personal Loan',
  'Assign an Asset',
];
const dateFormat = 'MM/DD/YYYY';

const formID = 'RoomBoardMiscSubForm';
class RoomBoardMiscSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'How are you paying for the Tuition?',
      fields: [
        {
          id: 'howWillYouPay',
          title: 'How are you paying for the Tuition?',
          value: data['value'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      showForm: true,
      formData: {
        howWillYouPay: '',
      },
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    if (newFormData.hasOwnProperty('fields')) {
      this.setState({
        formData: {
          assetsAllocation: newFormData['fields'][0]['value'],
        },
      });
    }
  }

  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        howWillYouPay: value,
      },
    });

    let formData = RoomBoardMiscSubForm.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    let nextSubFormID = '';
    switch (value) {
      case 'Friends / Family':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Contributions / Savings':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Student Loan':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Scholorships / Grants':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Personal Loan':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Assign an Asset':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
    }

    this.props.cbGoSubForm(nextSubFormID);
  }

  goNextForm = (form) => {
    this.props.cbGoSubForm(form);
  };

  changeFormState = () => {
    this.setState({ showForm: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showForm ? (
          <QuestionRoomBoardMisc
            changeFormState={this.changeFormState}
            goNextForm={this.goNextForm}
          ></QuestionRoomBoardMisc>
        ) : (
          <React.Fragment>
            <div className='info-form-block'>
              <h2 className='text-center font-weight-bold mb-4'>
                Room, Board, Misc.
              </h2>
              <Row gutter={16} type='flex' justify='center'>
                <Col span={8}>
                  <Form.Item
                    label='Text Book and School Supplies'
                    className='text-center'
                  >
                    <Currency
                      value=''
                      name='text_book_and_school_supplies'
                      value={
                        this.props.goalsObject[formID]
                          .text_book_and_school_supplies
                          ? this.props.goalsObject[formID]
                              .text_book_and_school_supplies
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Trasportation' className='text-center'>
                    <Currency
                      name='trasportation'
                      value={
                        this.props.goalsObject[formID].trasportation
                          ? this.props.goalsObject[formID].trasportation
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} type='flex' justify='center'>
                <Col span={8}>
                  <Form.Item label='Equipment' className='text-center'>
                    <Currency
                      name='equipment'
                      value={
                        this.props.goalsObject[formID].equipment
                          ? this.props.goalsObject[formID].equipment
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label='School and Activity Fees'
                    className='text-center'
                  >
                    <Currency
                      name='school_and_activity_fees'
                      value={
                        this.props.goalsObject[formID].school_and_activity_fees
                          ? this.props.goalsObject[formID]
                              .school_and_activity_fees
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} type='flex' justify='center'>
                <Col span={8}>
                  <Form.Item label='Personal Expenses' className='text-center'>
                    <Currency
                      name='personal_expenses'
                      value={
                        this.props.goalsObject[formID].personal_expenses
                          ? this.props.goalsObject[formID].personal_expenses
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Estimated Housing' className='text-center'>
                    <Currency
                      name='estimated_housing'
                      value={
                        this.props.goalsObject[formID].estimated_housing
                          ? this.props.goalsObject[formID].estimated_housing
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} type='flex' justify='center'>
                <Col span={8}>
                  <Form.Item
                    label='Estimated Meal Plan'
                    className='text-center'
                  >
                    <Currency
                      name='estimated_meal_plan'
                      value={
                        this.props.goalsObject[formID].estimated_meal_plan
                          ? this.props.goalsObject[formID].estimated_meal_plan
                          : ''
                      }
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} type='flex' justify='center'>
                <Col span={10}>
                  <Form.Item
                    label='Inflation Rate for Room, Board, Misc'
                    className='text-center'
                  >
                    <Radio.Group
                      buttonStyle='solid'
                      size={'Large'}
                      name='inflation_rate'
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                      defaultValue={
                        this.props.goalsObject[formID].inflation_rate
                      }
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

            <div className='row justify-content-between'>
              <div className='col-8'>
                <Button
                  type='primary'
                  size={'large'}
                  onClick={() => this.goNextForm('PrivateEducationDetails')}
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
                    this.goNextForm('FundingSourcesForm');
                  }}
                >
                  Next
                  <Icon type='right' />
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect()(RoomBoardMiscSubForm);
