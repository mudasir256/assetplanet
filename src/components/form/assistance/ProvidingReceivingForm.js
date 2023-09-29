import React, { Component } from 'react';
import { Row, Col, Form, Radio, Button, Icon } from 'antd';
import contributions from '../../../assets/images/contributions.png'
import Distributions from '../../../assets/images/Distributions.png'

const formName = 'ProvidingReceivingForm';

class ProvidingReceivingForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { assistanceObject, handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>Assistance</h2>
            </Col>
          </Row>

          <Row gutter={18} type='flex' justify='center'>
            <Col span={12}>
              <div className='buttons-container'>
                <React.Fragment>
                  <div
                    className={assistanceObject[formName].assistance === 'Providing' ? 'button-wrap selected' : 'button-wrap'}
                    onClick={() => {
                      handleFormInputChange(
                        formName,
                        'assistance',
                        'Providing'
                      );
                    }}
                  >
                    <div style={{ flexDirection: 'column' }}>
                      <div className='col-12 mt-2'>
                        <img src={contributions} height='40px' width='40px' />
                      </div>
                      <div className='col-12 mb-2 mt-2'>Providing</div>
                    </div>
                  </div>
                </React.Fragment>
                <React.Fragment>
                  <div
                    className={assistanceObject[formName].assistance === 'Receiving' ? 'button-wrap selected' : 'button-wrap'}
                    onClick={() => {
                      handleFormInputChange(
                        formName,
                        'assistance',
                        'Receiving'
                      );
                    }}
                  >
                    <div style={{ flexDirection: 'column' }}>
                      <div className='col-12 mt-2'>
                        <img src={Distributions} height='40px' width='40px' />
                      </div>
                      <div className='col-12 mb-2 mt-2'>Receiving</div>
                    </div>
                  </div>
                </React.Fragment>

              </div>

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
                if (
                  this.props.assistanceObject['ProvidingReceivingForm']
                    .assistance &&
                  this.props.assistanceObject['ProvidingReceivingForm']
                    .assistance === 'Providing'
                )
                  this.props.isProviding();
                else this.props.nextForm();
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

export default ProvidingReceivingForm;
