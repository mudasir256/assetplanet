import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon, Row, Col, Form, DatePicker, Radio, Input } from 'antd';
import Currency from '../../../components/form/Currency';
import Percent from '../../../components/form/Percent';
import moment from 'moment';
const formName = 'ResultsForm';
const dateFormat = 'MM/DD/YYYY';

class ResultsForm extends Component {
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
              Client Benefits
            </h2>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age 62'>
              <Currency
                value={
                  socialSecurityObject[formName].lifetime_benefits
                    ? socialSecurityObject[formName].lifetime_benefits
                    : null
                }
                size={'large'}
                name='lifetime_benefits'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age Full Retirement Age'>
              <Currency
                value={
                  socialSecurityObject[formName].full_retirement_age
                    ? socialSecurityObject[formName].full_retirement_age
                    : null
                }
                size={'large'}
                name='full_retirement_age'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age 70'>
              <Currency
                value={
                  socialSecurityObject[formName].at_age_70
                    ? socialSecurityObject[formName].at_age_70
                    : null
                }
                size={'large'}
                name='at_age_70'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <h2 className='text-center font-weight-bold mb-4'>
              Spouse Benefits
            </h2>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age 62'>
              <Currency
                value={
                  socialSecurityObject[formName].lifetime_benefits_spouse
                    ? socialSecurityObject[formName].lifetime_benefits_spouse
                    : null
                }
                size={'large'}
                name='lifetime_benefits_spouse'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age Full Retirement Age'>
              <Currency
                value={
                  socialSecurityObject[formName].full_retirement_age_spouse
                    ? socialSecurityObject[formName].full_retirement_age_spouse
                    : null
                }
                size={'large'}
                name='full_retirement_age_spouse'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Lifetime Benefits At Age 70'>
              <Currency
                value={
                  socialSecurityObject[formName].at_age_70_spouse
                    ? socialSecurityObject[formName].at_age_70_spouse
                    : null
                }
                size={'large'}
                name='at_age_70_spouse'
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
            <Button type='primary' size={'large'}>
              Finish
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResultsForm;
