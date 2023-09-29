import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Radio,
  Input,
  DatePicker,
  Button,
  Icon,
  TimePicker,
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const dateFormat = 'MM/DD/YYYY';
const formName = 'ExpensesAndIncomeForm';

class ExpensesAndIncomeForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleInputChange,
      disabilityObject,
      handleDatePickerChange,
      handleSelectChange,
    } = this.props;

    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Expenses and Income
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Monthly Expense Total'>
                <Currency
                  value={
                    disabilityObject[formName].monthly_expense_total
                      ? disabilityObject[formName].monthly_expense_total
                      : null
                  }
                  size={'large'}
                  name='monthly_expense_total'
                  onChange={(event) => handleInputChange(event, formName)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Monthly Income Total'>
                <Currency
                  value={
                    disabilityObject[formName].monthly_income_total
                      ? disabilityObject[formName].monthly_income_total
                      : null
                  }
                  size={'large'}
                  name='monthly_income_total'
                  onChange={(event) => handleInputChange(event, formName)}
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

export default ExpensesAndIncomeForm;
