import React, { Component } from 'react';
import { Row, Col, Form, Radio, Button, Icon } from 'antd';

const formName = 'messageForm';

class MessageForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Asset Planet Message
              </h2>
            </Col>
            <Col span={24}>
              <h4 className='text-center mb-4'>
                If you are prevented from working from a serious injury or
                illness, long term disability coverage can help pay the bills.
                Planning early can secure a financial future for you and your
                family.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className='text-center mb-4'>
                There are many factors to consider when looking at Disability
                Insurance. Benefit amounts, elimination periods, benefit
                periods, own occupation or any occupation, riders and, of
                course, the premium amount you would have to pay on a monthly
                basis to maintain the policy. Also, some disability policie s
                pay only for partial disabilities while other polices pay for
                total disability. Some indicate you cannot claim disability if
                you are still on payroll with your employer.
              </h4>
            </Col>
            <Col span={24}>
              <h4 className='text-center mb-4'>
                This module will help determine if the coverages you have (or
                plan to have) will help secure your financial future in the
                event of a disability in your working years. Ensuring you have
                the correct policy for your situation will not be covered
                completely here, but these steps will get you started on the
                right path. This module will also assume the disability is
                covered in your policy. If you have disability insurance, read
                the summary plan description and upload to this software for
                future reference.
              </h4>
            </Col>
          </Row>
        </div>
        <div className='row justify-content-between'>
          <div className='col-8'></div>
          <div className='col-4 d-flex justify-content-end'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                console.log('FORM DATA ', this.props.checklistObject);
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

export default MessageForm;
