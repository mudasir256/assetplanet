import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';
import { relations } from '../../../constants/relations';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'LoanQuestionForm';
class LoanQuestionForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Assistance Received Details (Financial Gift)',
      fields: [
        {
          id: 'recipient_first_name',
          title: 'Recipient First Name',
          value: data['recipient_first_name'],
        },
        {
          id: 'recipient_last_name',
          title: 'Recipient Last Name',
          value: data['recipient_last_name'],
        },
        {
          id: 'person_first_name',
          title: 'Person Providing Assistance First Name',
          value: data['person_first_name'],
        },
        {
          id: 'person_last_name',
          title: 'Person Providing Assistance Last Name',
          value: data['person_last_name'],
        },
        {
          id: 'relationship',
          title: 'Person Providing Assistance',
          value: data['relationship'],
        },
        {
          id: 'total_amount_gift_received',
          title: 'Total Amount of Gift Received',
          value: data['total_amount_gift_received'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      isTrue: false,
      rows: [],
      enableNext: true,
      formData: {
        total_amount_gift_received: '',
      },
      size: 'large',
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.formChange = this.formChange.bind(this);
  }

  componentDidMount() {
    if (
      this.props.goalsObject.WorkStudyForm &&
      this.props.goalsObject.WorkStudyForm.hasOwnProperty('work_study')
    )
      this.setState({
        rows: this.props.goalsObject.WorkStudyForm.work_study,
      });
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    console.log(newFormData);
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] == 'person_first_name') {
          formData['person_first_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'person_last_name') {
          formData['person_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_last_name') {
          formData['recipient_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_first_name') {
          formData['recipient_first_name'] =
            newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_last_name') {
          formData['recipient_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'relationship') {
          formData['relationship'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'total_amount_gift_received') {
          formData['total_amount_gift_received'] =
            newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;
      if (
        formData['committmentDate'] != '' &&
        formData['committmentAmount'] != ''
      ) {
        enableNext = true;
      }

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

  handleFormInputChange(name, value) {
    let formData = this.state.formData;
    formData[name] = value;

    let newState = {
      formData: formData,
    };
    this.setState(newState);
  }

  handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(name, value);
  }

  handleSelectChange(name, value) {
    this.handleFormInputChange(name, value);
  }

  handleDatePickerChange(name, date, dateString) {
    this.handleFormInputChange(name, dateString);
  }

  goNextForm() {
    this.props.cbGoSubForm('QuestionAssignAssetSubForm');
  }

  goPreviousForm() {
    this.props.cbGoSubForm('GoalFinancingInformationSubForm');
  }

  formChange(rows) {
    formData = rows;
  }

  render() {
    const { size } = this.state;
    return (
      <React.Fragment>
        {!this.state.isTrue ? (
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Will you need a loan for this goal ?
              </h2>
            </Col>
            <Col
              span={12}
              className='d-flex align-items-center justify-content-end'
            >
              <Button
                className='pl-4 pr-4 mr-5'
                type='primary'
                size={'large'}
                onClick={() => this.setState({ isTrue: true })}
              >
                Yes
              </Button>
            </Col>
            <Col span={12}>
              <Button
                className='pl-4 pr-4'
                type='primary'
                size={'large'}
                onClick={() => {
                  this.props.cbGoSubForm('EndSubForm');
                }}
              >
                No
              </Button>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <div className='info-form-block pl-5 pr-5'>
              <h2 className='text-center font-weight-bold mb-4'>Loan</h2>
              <Row gutter={16} type='flex' justify='center'>
                <Col span={16}>
                  <Form.Item label='Total Loan Assigned to Goal'>
                    <Currency
                      size={size}
                      value={
                        Object.keys(this.props.goalsObject[formID]).length === 0
                          ? ''
                          : this.props.goalsObject[formID]
                              .total_loan_assigned_to_goal
                          ? this.props.goalsObject[formID]
                              .total_loan_assigned_to_goal
                          : ''
                      }
                      name='total_loan_assigned_to_goal'
                      onChange={(e) => this.props.handleInputChange(e, formID)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className='row justify-content-between'>
              <div className='col-8'>
                <Button
                  type='primary'
                  size={size}
                  onClick={() => {
                    this.props.dynamicFormsMovePrevious('LoanQuestionForm');
                  }}
                >
                  <Icon type='left' />
                  Previous
                </Button>
              </div>
              <div className='col-4 d-flex justify-content-end'>
                <Button
                  type='primary'
                  size={size}
                  onClick={() => {
                    console.log('FORM ', this.props.goalsObject);
                    this.props.cbGoSubForm('EndSubForm');
                  }}
                >
                  Next
                  <Icon type='right' />
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default connect()(LoanQuestionForm);
