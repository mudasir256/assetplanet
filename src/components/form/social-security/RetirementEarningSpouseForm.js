import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon, Row, Col, Form, DatePicker, Radio, Input } from 'antd';
import Currency from '../../../components/form/Currency';
import Percent from '../../../components/form/Percent';
import moment from 'moment';
const formName = 'RetirementEarningSpouseForm';
const dateFormat = 'MM/DD/YYYY';

class RetirementEarningSpouseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt_rows: [],
      formData: {},
    };
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  render() {
    const {
      handleFormInputChange,
      handleInputChange,
      socialSecurityObject,
      handleDatePickerChange,
    } = this.props;

    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={24}>
            <h2 className='text-center font-weight-bold mb-4'>
              Retirement Earning Calculator Spousal
            </h2>
          </Col>
          <Col span={24}>
            <h5 className='text-center  mb-4'>
              Complete if currently working AND elegible for retirement benefits
              this year (SPOUSE SECTION)
            </h5>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Enter Date You Would like to Begin Receiving Benefits'>
              <DatePicker
                defaultValue={
                  socialSecurityObject[formName].begin_receiving_benefits
                    ? moment(
                        socialSecurityObject[formName].begin_receiving_benefits,
                        dateFormat
                      )
                    : ''
                }
                style={{ width: '100%' }}
                format={dateFormat}
                size={'large'}
                onChange={(date, dateString) =>
                  handleDatePickerChange(
                    'begin_receiving_benefits',
                    date,
                    dateString,
                    formName
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Your Estimated Earning'>
              <Currency
                value={
                  socialSecurityObject[formName].estimated_earning
                    ? socialSecurityObject[formName].estimated_earning
                    : null
                }
                size={'large'}
                name='estimated_earning'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Monthly Decrease in Benefits (Retirement early, not as same year as FRA)'>
              <Currency
                value={
                  socialSecurityObject[formName].monthly_decrease_not_same
                    ? socialSecurityObject[formName].monthly_decrease_not_same
                    : null
                }
                size={'large'}
                name='monthly_decrease_not_same'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Monthly Decrease in Benefits (Retirement early, same year as FRA)'>
              <Currency
                value={
                  socialSecurityObject[formName].monthly_decrease_same
                    ? socialSecurityObject[formName].monthly_decrease_same
                    : null
                }
                size={'large'}
                name='monthly_decrease_same'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => this.props.previousForm()}
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
                console.log('FORM DATA ', this.props.divorceObject);
                this.props.nextForm();
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

export default RetirementEarningSpouseForm;
