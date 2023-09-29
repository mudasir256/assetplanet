import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input, DatePicker, Button, Icon } from 'antd';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';
const formName = 'IllustrationOrActualForm';

class IllustrationOrActualForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleFormInputChange,
      handleInputChange,
      disasterObject,
      handleDatePickerChange,
      handleSelectChange,
    } = this.props;

    return (
      <React.Fragment>
        <div className='info-form-block'>
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Illustration or Actual
              </h2>
            </Col>
          </Row>

          <Row gutter={16} type='flex' justify='center'>
            <Col span={6}>
              <Form.Item label='Is this an illustration or actual event?'>
                <Radio.Group
                  name={`illustration_or_actual`}
                  size={'large'}
                  defaultValue={disasterObject[formName].illustration_or_actual}
                  onChange={(event) => {
                    handleFormInputChange(
                      formName,
                      'illustration_or_actual',
                      event.target.value
                    );

                    handleFormInputChange(
                      formName,
                      'illustration_disaster',
                      null
                    );
                  }}
                >
                  <Radio.Button value='Illustration'>Illustration</Radio.Button>
                  <Radio.Button value='Actual Event'>Actual Event</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Illustration */}
          {disasterObject[formName].illustration_or_actual &&
          disasterObject[formName].illustration_or_actual === 'Illustration' ? (
            <Row gutter={16} type='flex' justify='center'>
              <Col span={6}>
                <Form.Item label='Was this a Natural Disaster or Manmade Disaster?'>
                  <Radio.Group
                    name={`illustration_disaster`}
                    size={'large'}
                    defaultValue={
                      disasterObject[formName].illustration_disaster
                    }
                    onChange={(event) => {
                      handleFormInputChange(
                        formName,
                        'illustration_disaster',
                        event.target.value
                      );
                    }}
                  >
                    <Radio.Button value='Natural Disaster'>
                      Natural Disaster
                    </Radio.Button>
                    <Radio.Button value='Manmade Disaster'>
                      Manmade Disaster
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ''
          )}

          {/* Actual Event */}
          {disasterObject[formName].illustration_or_actual &&
          disasterObject[formName].illustration_or_actual === 'Actual Event' ? (
            <Row gutter={16} type='flex' justify='center'>
              <Col span={6}>
                <Form.Item label='Was this a Natural Disaster or Manmade Disaster?'>
                  <Radio.Group
                    name={`actual_disaster`}
                    size={'large'}
                    defaultValue={disasterObject[formName].actual_disaster}
                    onChange={(event) => {
                      handleFormInputChange(
                        formName,
                        'actual_disaster',
                        event.target.value
                      );
                    }}
                  >
                    <Radio.Button value='Natural Disaster'>
                      Natural Disaster
                    </Radio.Button>
                    <Radio.Button value='Manmade Disaster'>
                      Manmade Disaster
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          ) : (
            ' '
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
              disabled={
                disasterObject[formName].illustration_or_actual &&
                (disasterObject[formName].illustration_disaster ||
                  disasterObject[formName].actual_disaster)
                  ? false
                  : true
              }
              type='primary'
              size={'large'}
              onClick={() => {
                if (
                  this.props.disasterObject['IllustrationOrActualForm']
                    .illustration_disaster &&
                  (this.props.disasterObject['IllustrationOrActualForm']
                    .illustration_disaster === 'Natural Disaster' ||
                    this.props.disasterObject['IllustrationOrActualForm']
                      .illustration_disaster === 'Manmade Disaster')
                ) {
                  this.props.customNextForm();
                } else this.props.nextForm();
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

export default IllustrationOrActualForm;
