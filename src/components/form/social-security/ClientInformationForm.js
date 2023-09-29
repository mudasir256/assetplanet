import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon, Row, Col, Form, DatePicker, Radio, Input } from 'antd';
import Currency from '../../../components/form/Currency';
import Percent from '../../../components/form/Percent';
import moment from 'moment';
const formName = 'ClientInformationForm';
const dateFormat = 'MM/DD/YYYY';

class ClientInformationForm extends Component {
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
              Client Information - General
            </h2>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Client Birthdate'>
              <DatePicker
                defaultValue={
                  socialSecurityObject[formName].client_birthdate
                    ? moment(
                        socialSecurityObject[formName].client_birthdate,
                        dateFormat
                      )
                    : ''
                }
                style={{ width: '100%' }}
                format={dateFormat}
                size={'large'}
                onChange={(date, dateString) =>
                  handleDatePickerChange(
                    'client_birthdate',
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
            <Form.Item label='Client Retirement Year'>
              <Input
                value={
                  socialSecurityObject[formName].retirement_year
                    ? socialSecurityObject[formName].retirement_year
                    : null
                }
                size={'large'}
                name='retirement_year'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Client Monthly Benefit at Full Retirement Age'>
              <Currency
                value={
                  socialSecurityObject[formName].monthly_benefit
                    ? socialSecurityObject[formName].monthly_benefit
                    : null
                }
                size={'large'}
                name='monthly_benefit'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Full Retirement Age'>
              <Input
                value={
                  socialSecurityObject[formName].full_retirement
                    ? socialSecurityObject[formName].full_retirement
                    : null
                }
                size={'large'}
                name='full_retirement'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Cost of Living Adjustment'>
              <Percent
                value={
                  socialSecurityObject[formName].cost_of_living_adjustment
                    ? socialSecurityObject[formName].cost_of_living_adjustment
                    : null
                }
                size={'large'}
                name='cost_of_living_adjustment'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Time Value of Money Interest Rate'>
              <Percent
                value={
                  socialSecurityObject[formName].value_of_money
                    ? socialSecurityObject[formName].value_of_money
                    : null
                }
                size={'large'}
                name='value_of_money'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Time Until Full Retirement Age'>
              <Input
                value={
                  socialSecurityObject[formName].time_full_retirement
                    ? socialSecurityObject[formName].time_full_retirement
                    : null
                }
                size={'large'}
                name='time_full_retirement'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className='row justify-content-between'>
          <div className='col-8'></div>
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

export default ClientInformationForm;
