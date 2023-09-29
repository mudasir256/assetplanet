import React, { Component } from 'react';
import { Row, Col, Form, Radio, Button, Icon } from 'antd';

const formName = 'CurrentFutureForm';

class CurrentFutureForm extends Component {
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
              <h2 className='text-center font-weight-bold mb-4'>
                Current or Future
              </h2>
            </Col>
          </Row>

          <Row gutter={18} type='flex' justify='center'>
            <Col span={8.5}>
              <Form.Item label='Is this Current Assistance or Future Inheritance ? '>
                <Radio.Group
                  name={`type`}
                  size={'large'}
                  defaultValue={assistanceObject[formName].type}
                  onChange={(event) => {
                    handleFormInputChange(formName, 'type', event.target.value);
                  }}
                >
                  <Radio.Button value='Future Inheritance'>
                    Future Inheritance
                  </Radio.Button>
                  <Radio.Button value='Current Assistance'>
                    Current Assistance
                  </Radio.Button>
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
                  this.props.assistanceObject['CurrentFutureForm'].type &&
                  this.props.assistanceObject['CurrentFutureForm'].type ===
                    'Future Inheritance'
                )
                  this.props.isFutureInheritance();
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

export default CurrentFutureForm;
