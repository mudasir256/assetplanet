import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon, Row, Col, Form, DatePicker, Radio } from 'antd';
import Currency from '../../../components/form/Currency';
import moment from 'moment';
const formName = 'DebtPayoffForm';
const dateFormat = 'MM/DD/YYYY';

class DebtPayoffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debt_rows: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.debtObject.DebtPayoffForm &&
      this.props.debtObject.DebtPayoffForm.hasOwnProperty('debt_rows')
    )
      this.setState({
        debt_rows: this.props.debtObject.DebtPayoffForm.debt_rows,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  render() {
    const emptyCols1 = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fields: [
          {
            type: 'Input',
            name: 'name',
          },
        ],
      },
      {
        title: 'Name of Liability',
        dataIndex: 'liability',
        key: 'liability',
        fields: [
          {
            type: 'Input',
            name: 'liability',
          },
        ],
      },

      {
        title: 'Interest Rate',
        dataIndex: 'interest_rate',
        key: 'interest_rate',
        fields: [
          {
            type: 'Input',
            name: 'interest_rate',
          },
        ],
      },
      {
        title: 'Credit Balance',
        dataIndex: 'credit_balance',
        key: 'credit_balance',
        fields: [
          {
            type: 'Input',
            name: 'credit_balance',
          },
        ],
      },
      {
        title: 'Current Monthly Payment',
        dataIndex: 'current_monthly_payment',
        key: 'current_monthly_payment',
        fields: [
          {
            type: 'Input',
            name: 'current_monthly_payment',
          },
        ],
      },
      {
        title: 'Original Maturity Date',
        dataIndex: 'maturity_date',
        key: 'maturity_date',
        fields: [
          {
            type: 'Input',
            name: 'maturity_date',
          },
        ],
      },
      {
        title: 'Date of Current Balance',
        dataIndex: 'current_balance',
        key: 'current_balance',
        fields: [
          {
            type: 'Input',
            name: 'current_balance',
          },
        ],
      },
    ];

    const emptyCols2 = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        fields: [
          {
            type: 'Input',
            name: 'name',
          },
        ],
      },
      {
        title: 'Name of Liability',
        dataIndex: 'liability',
        key: 'liability',
        fields: [
          {
            type: 'Input',
            name: 'liability',
          },
        ],
      },

      {
        title: 'Interest Rate',
        dataIndex: 'interest_rate',
        key: 'interest_rate',
        fields: [
          {
            type: 'Input',
            name: 'interest_rate',
          },
        ],
      },
      {
        title: 'Credit Balance',
        dataIndex: 'credit_balance',
        key: 'credit_balance',
        fields: [
          {
            type: 'Input',
            name: 'credit_balance',
          },
        ],
      },
      {
        title: 'Current Monthly Payment',
        dataIndex: 'current_monthly_payment',
        key: 'current_monthly_payment',
        fields: [
          {
            type: 'Input',
            name: 'current_monthly_payment',
          },
        ],
      },
      {
        title: 'Original Maturity Date',
        dataIndex: 'maturity_date',
        key: 'maturity_date',
        fields: [
          {
            type: 'Input',
            name: 'maturity_date',
          },
        ],
      },
      {
        title: 'Date of Current Balance',
        dataIndex: 'current_balance',
        key: 'current_balance',
        fields: [
          {
            type: 'Input',
            name: 'current_balance',
          },
        ],
      },
    ];

    const debtCols = [
      {
        title: 'Name of Liability',
        dataIndex: 'name_of_liability',
        key: 'name_of_liability',
        fields: [
          {
            type: 'Select',
            name: 'name_of_liability',
            placeholder: '-Select-',
            values: [
              'Alarm System',
              'Association Dues',
              'Cleaning',
              'Decoration',
              'Furnishings',
              'Gardening',
              'Improvement Misc',
              'Mortgage Pest Control',
              'Pool Maintenance',
              'Property Taxes',
              'Rent',
              'Repairs and Maintenance',
              'Vacation & 2nd Home Cost',
            ],
          },
        ],
      },
      {
        title: 'Original Months to Payoff',
        dataIndex: 'original_months',
        key: 'original_months',
        fields: [
          {
            type: 'Input',
            name: 'original_months',
          },
        ],
      },
      {
        title: 'Original Cumulative Interest',
        dataIndex: 'cumulative_interest',
        key: 'cumulative_interest',
        fields: [
          {
            type: 'Input',
            name: 'cumulative_interest',
          },
        ],
      },
      {
        title: 'Original Payment',
        dataIndex: 'original_payment',
        key: 'original_payment',
        fields: [
          {
            type: 'Currency',
            name: 'original_payment',
          },
        ],
      },
      {
        title: 'New Months to Payoff',
        dataIndex: 'new_months',
        key: 'new_months',
        fields: [
          {
            type: 'Input',
            name: 'new_months',
          },
        ],
      },
      {
        title: 'New Cumulative Interest',
        dataIndex: 'new_cumulative_interest',
        key: 'new_cumulative_interest',
        fields: [
          {
            type: 'Input',
            name: 'new_cumulative_interest',
          },
        ],
      },
      {
        title: 'New Payment',
        dataIndex: 'new_payment',
        key: 'new_payment',
        fields: [
          {
            type: 'Currency',
            name: 'new_payment',
          },
        ],
      },
      {
        title: 'Interest Saved',
        dataIndex: 'interest_saved',
        key: 'interest_saved',
        fields: [
          {
            type: 'Currency',
            name: 'interest_saved',
          },
        ],
      },
      {
        title: 'Current Monthly Payment',
        dataIndex: 'current_monthly_payment',
        key: 'current_monthly_payment',
        fields: [
          {
            type: 'Currency',
            name: 'current_monthly_payment',
          },
        ],
      },
      {
        title: 'Addl Monthly Payment',
        dataIndex: 'addl_monthly_payment',
        key: 'addl_monthly_payment',
        fields: [
          {
            type: 'Currency',
            name: 'addl_monthly_payment',
          },
        ],
      },
      {
        title: 'Last Payment Amount',
        dataIndex: 'last_payment_amount',
        key: 'last_payment_amount',
        fields: [
          {
            type: 'Currency',
            name: 'last_payment_amount',
          },
        ],
      },
      {
        title: 'Total Amount to Pay',
        dataIndex: 'total_amount_pay',
        key: 'total_amount_pay',
        fields: [
          {
            type: 'Currency',
            name: 'total_amount_pay',
          },
        ],
      },
      {
        title: 'Access Push for Debt Free',
        dataIndex: 'access_push',
        key: 'access_push',
        fields: [
          {
            type: 'Currency',
            name: 'access_push',
          },
        ],
      },
      {
        title: 'Next Payment Date',
        dataIndex: 'next_payment',
        key: 'next_payment',
        fields: [
          {
            type: 'DatePicker',
            name: 'next_payment',
          },
        ],
      },
    ];

    const {
      handleFormInputChange,
      handleInputChange,
      debtObject,
      handleDatePickerChange,
    } = this.props;

    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col span={24}>
            <h2 className='text-center font-weight-bold mb-4'>
              Loan Payoff Calculator
            </h2>
          </Col>
        </Row>
        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Would you like to Apply Additional Monthly Principle or Choose Date to be Debt Free'>
              <Radio.Group
                name={`date_or_dollar`}
                size={'large'}
                defaultValue={debtObject[formName].date_or_dollar}
                onChange={(event) => {
                  handleFormInputChange(
                    formName,
                    'date_or_dollar',
                    event.target.value
                  );
                }}
              >
                <Radio.Button value='Apply Additional Monthly Principle'>
                  Apply Additional Monthly Principle
                </Radio.Button>
                <Radio.Button value='Choose Date to be Debt Free'>
                  Choose Date to be Debt Free
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Choose a Debt free Date'>
              <DatePicker
                defaultValue={
                  debtObject[formName].debt_free_date_first
                    ? moment(
                        debtObject[formName].debt_free_date_first,
                        dateFormat
                      )
                    : ''
                }
                style={{ width: '100%' }}
                format={dateFormat}
                size={'large'}
                onChange={(date, dateString) =>
                  handleDatePickerChange(
                    'debt_free_date_first',
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
            <Form.Item label='Extra Principal Payments'>
              <Currency
                value={
                  debtObject[formName].principle_payments
                    ? debtObject[formName].principle_payments
                    : null
                }
                size={'large'}
                name='principle_payments'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={6}>
            <Form.Item label='Sort Table By'>
              <Radio.Group
                name={`sort_table`}
                size={'large'}
                defaultValue={debtObject[formName].sort_table}
                onChange={(event) => {
                  handleFormInputChange(
                    formName,
                    'sort_table',
                    event.target.value
                  );
                }}
              >
                <Radio.Button value='Highest Interest First'>
                  Highest Interest First
                </Radio.Button>
                <Radio.Button value='Lowest Balance First'>
                  Lowest Balance First
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <SubFormTable
          title='Credit Card Information'
          rows={this.state.debt_rows}
          colsFormat={emptyCols1}
          addNewButton={false}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(formName, 'debt_rows', rows)
          }
        ></SubFormTable>

        <SubFormTable
          title='Loan Information'
          rows={this.state.debt_rows}
          colsFormat={emptyCols2}
          addNewButton={false}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(formName, 'debt_rows', rows)
          }
        ></SubFormTable>

        <SubFormTable
          title='Loan Payoff Information'
          rows={this.state.debt_rows}
          colsFormat={debtCols}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(formName, 'debt_rows', rows)
          }
        ></SubFormTable>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Total Months Saved'>
              <Currency
                value={
                  debtObject[formName].total_months_saved
                    ? debtObject[formName].total_months_saved
                    : null
                }
                size={'large'}
                name='total_months_saved'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Total Interest Saved'>
              <Currency
                value={
                  debtObject[formName].interest_saved_total
                    ? debtObject[formName].interest_saved_total
                    : null
                }
                size={'large'}
                name='interest_saved_total'
                onChange={(event) => handleInputChange(event, formName)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Debt Free Date'>
              <DatePicker
                defaultValue={
                  debtObject[formName].debt_free_date
                    ? moment(debtObject[formName].debt_free_date, dateFormat)
                    : ''
                }
                style={{ width: '100%' }}
                format={dateFormat}
                size={'large'}
                onChange={(date, dateString) =>
                  handleDatePickerChange(
                    'debt_free_date',
                    date,
                    dateString,
                    formName
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <div className='row justify-content-between'>
          <div className='col-8'></div>
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

export default DebtPayoffForm;
