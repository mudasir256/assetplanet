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
  Select,
} from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';

const dateFormat = 'MM/DD/YYYY';
const formName = 'DisabilityInformationForm';

class DisabilityInformationForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleInputChange,
      disabilityObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
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
            <Col span={6}>
              <Form.Item label='Is this an illustration or actual event?'>
                <Radio.Group
                  name={`illustration_or_actual`}
                  size={'large'}
                  defaultValue={
                    disabilityObject[formName].illustration_or_actual
                  }
                  onChange={(event) => {
                    handleFormInputChange(
                      formName,
                      'illustration_or_actual',
                      event.target.value
                    );
                  }}
                >
                  <Radio.Button value='Illustration'>Illustration</Radio.Button>
                  <Radio.Button value='Actual Event'>Actual Event</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Date Disability Occurred'>
                <DatePicker
                  defaultValue={
                    disabilityObject[formName].date_disability_occured
                      ? moment(
                          disabilityObject[formName].date_disability_occured,
                          dateFormat
                        )
                      : ''
                  }
                  style={{ width: '100%' }}
                  format={dateFormat}
                  size={'large'}
                  onChange={(date, dateString) =>
                    handleDatePickerChange(
                      'date_disability_occured',
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
              <Form.Item label='Person Disabled'>
                <Select
                  showSearch
                  placeholder='-Select-'
                  defaultValue={disabilityObject[formName].person_disabled}
                  onChange={(value) =>
                    handleSelectChange('person_disabled', value, formName)
                  }
                  size={'large'}
                >
                  <Select.Option value='Plan'>Plan</Select.Option>
                  {/* {counties.map((county, index) => {
                    return (
                      <Select.Option value={county}>{county}</Select.Option>
                    );
                  })} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={16}>
              <Form.Item label='Length of Disability'>
                <Input
                  value={
                    disabilityObject[formName].length_of_disability
                      ? disabilityObject[formName].length_of_disability
                      : null
                  }
                  size={'large'}
                  name='length_of_disability'
                  onChange={(event) => handleInputChange(event, formName)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={6}>
              <Form.Item label='Are you unable to perform your job? (Own Occupation Disability)'>
                <Radio.Group
                  name={`unable_to_perform_your_job`}
                  size={'large'}
                  defaultValue={
                    disabilityObject[formName].unable_to_perform_your_job
                  }
                  onChange={(event) => {
                    handleFormInputChange(
                      formName,
                      'unable_to_perform_your_job',
                      event.target.value
                    );
                  }}
                >
                  <Radio.Button value='Yes'>Yes</Radio.Button>
                  <Radio.Button value='No'>No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {disabilityObject[formName].unable_to_perform_your_job &&
          disabilityObject[formName].unable_to_perform_your_job === 'No' ? (
            <Row gutter={16} type='flex' justify='center'>
              <Col span={6}>
                <Form.Item label='Are you unable to perform your job? (Any Occupation Disability)'>
                  <Radio.Group
                    name={`unable_to_perform_your_job_any`}
                    size={'large'}
                    defaultValue={
                      disabilityObject[formName].unable_to_perform_your_job_any
                    }
                    onChange={(event) => {
                      handleFormInputChange(
                        formName,
                        'unable_to_perform_your_job_any',
                        event.target.value
                      );
                    }}
                  >
                    <Radio.Button value='Yes'>Yes</Radio.Button>
                    <Radio.Button value='No'>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ''
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

export default DisabilityInformationForm;
