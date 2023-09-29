import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon, Row, Col, Form, DatePicker, Radio, Input } from 'antd';
import Currency from '../../../components/form/Currency';
import Percent from '../../../components/form/Percent';
import moment from 'moment';
const formName = 'CustomScenariosForm';
const dateFormat = 'MM/DD/YYYY';

class CustomScenariosForm extends Component {
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
              Create Custom Scenarios
            </h2>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Enter age (with Months) to compare taking early benefits to Full Retirement Age benefits'>
              <Input
                value={
                  socialSecurityObject[formName].retirement_age_full
                    ? socialSecurityObject[formName].retirement_age_full
                    : null
                }
                size={'large'}
                name='retirement_age_full'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Enter age (with Months) to compare taking benefits to age 70'>
              <Input
                value={
                  socialSecurityObject[formName].retirement_age_70
                    ? socialSecurityObject[formName].retirement_age_70
                    : null
                }
                size={'large'}
                name='retirement_age_70'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='For Spouse: Enter age (with Months) to compare taking benefits to Full Retirement Age'>
              <Input
                value={
                  socialSecurityObject[formName].retirement_age_full_spouse
                    ? socialSecurityObject[formName].retirement_age_full_spouse
                    : null
                }
                size={'large'}
                name='retirement_age_full_spouse'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Compare Social Security benefits using any two ages'>
              <Input
                value={
                  socialSecurityObject[formName].comparison
                    ? socialSecurityObject[formName].comparison
                    : null
                }
                size={'large'}
                name='comparison'
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

export default CustomScenariosForm;
