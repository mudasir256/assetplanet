import React, { Component } from 'react';
import { Select, Row, Button, Col, Form, DatePicker, Icon } from 'antd';
import Currency from '../../../components/form/Currency';

var formData = [];
const formID = 'LoanGoalForm';
class LoanGoalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enableNext: true,
      formData: {
        totalLoan: '',
      },
    };
  }

  goPreviousForm() {
    this.props.cbGoSubForm('QuestionApplySavingSubForm');
  }

  render() {
    return (
      <React.Fragment>
        <h2 className='text-center font-weight-bold mb-4'>Loan</h2>

        <Row gutter={16} type='flex' justify='center'>
          <Col span={16}>
            <Form.Item label='Total Loan Assigned to Goal'>
              <Currency
                value={
                  this.props.goalsObject[formID].current_monthly_saving_capacity
                    ? this.props.goalsObject[formID]
                        .current_monthly_saving_capacity
                    : ''
                }
                name='current_monthly_saving_capacity'
                onChange={(e) => this.props.handleInputChange(e, formID)}
                //   onChange={(event) => this.handleInputChange(event)}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => this.goPreviousForm()}
            >
              <Icon type='left' />
              Previous
            </Button>
          </div>
          <div className='col-4 d-flex justify-content-end'>
            <Button type='primary' size={'large'}>
              Next
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoanGoalForm;
