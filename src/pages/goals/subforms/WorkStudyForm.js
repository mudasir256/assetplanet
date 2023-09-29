import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'WorkStudyForm';
class WorkStudyForm extends Component {
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
    // let formData = AssistanceReceivedSubForm.FnCreateFormData({
    //   recipient_first_name: this.state.formData['recipient_first_name'],
    //   recipient_last_name: this.state.formData['recipient_last_name'],
    //   person_first_name: this.state.formData['person_first_name'],
    //   person_last_name: this.state.formData['person_last_name'],
    //   relationship: this.state.formData['relationship'],
    //   total_amount_gift_received: this.state.formData[
    //     'total_amount_gift_received'
    //   ],
    // });

    // this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm('QuestionAssignAssetSubForm');
  }

  goPreviousForm() {
    this.props.cbGoSubForm('GoalFinancingInformationSubForm');
  }

  formChange(rows) {
    formData = rows;
  }

  render() {
    const colsFormat = [
      {
        title: 'Amount Allocated to Work-Study',
        dataIndex: 'amount_allocated_to_work_study',
        key: 'amount_allocated_to_work_study',
        fields: [
          {
            type: 'Currency',
            name: 'amount_allocated_to_work_study',
          },
        ],
      },
      {
        title: `Name of Business`,
        dataIndex: 'name_of_business',
        key: 'name_of_business',
        fields: [
          {
            type: 'Input',
            name: 'name_of_business',
          },
        ],
      },
      {
        title: 'Job Title',
        dataIndex: 'job_title',
        key: 'job_title',
        fields: [
          {
            type: 'Input',
            name: 'job_title',
          },
        ],
      },
      {
        title: 'On Campus or Off Campus',
        dataIndex: 'on_off_campus',
        key: 'on_off_campus',
        fields: [
          {
            type: 'Select',
            name: 'on_off_campus',
            placeholder: '-Select-',
            values: ['On', 'Off'],
          },
        ],
      },
    ];

    const { size } = this.state;
    return (
      <React.Fragment>
        <SubFormTable
          title='Work Study'
          rows={this.state.rows}
          colsFormat={colsFormat}
          addNewButton={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'work_study', rows)
          }
        ></SubFormTable>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={size}
              onClick={() => {
                this.props.dynamicFormsMovePrevious('WorkStudyForm');
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
                this.props.dynamicFormsMoveNext('WorkStudyForm');
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

export default connect()(WorkStudyForm);
