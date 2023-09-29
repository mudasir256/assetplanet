import React, { Component } from 'react';
import { Row, Col, Form, Radio, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

const formName = 'programmingStatusForm';

class ProgrammingStatusForm extends Component {
  constructor(props) {
    super(props);
  }

  getRadioField = (title, name) => {
    const { handleInputChange, checklistObject } = this.props;
    return (
      <Row gutter={16} type='flex' justify='center'>
        <Col span={16} type='flex' justify='center'>
          <Form.Item label={title}>
            <Radio.Group
              defaultValue={checklistObject[formName][name]}
              name={name}
              size={'large'}
              onChange={(event) => handleInputChange(event, formName)}
            >
              <Radio.Button value='Not Started'>Not Started</Radio.Button>
              <Radio.Button value='Incomplete'>Incomplete</Radio.Button>
              <Radio.Button value='Complete'>Complete</Radio.Button>
              <Radio.Button value='Not Applicable'>Not Applicable</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Programming Status
              </h2>
            </Col>
          </Row>
          {this.getRadioField('Audio / Video Message', 'audio_video_message')}
          {this.getRadioField('Contact List', 'contact_list')}
          {this.getRadioField('Emails to Send', 'emails_to_send')}
          {this.getRadioField('Important Document', 'important_document')}
          {this.getRadioField('Personal Instructions', 'personal_instructions')}
          {this.getRadioField('List of Large Bills', 'list_of_large_bills')}
          {this.getRadioField('Litigation List', 'litigation_list')}
          {this.getRadioField(
            'Location of Personal Items',
            'location_of_personal_items'
          )}
          {this.getRadioField('List of Passwords', 'list_of_passwords')}
          {this.getRadioField(
            'Prepaid Burial Expenses',
            'prepaid_burial_expenses'
          )}
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
              onClick={() => this.props.history.push('/death')}
            >
              Finish
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ProgrammingStatusForm);
