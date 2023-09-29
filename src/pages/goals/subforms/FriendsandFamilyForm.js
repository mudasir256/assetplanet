import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';
import { relations } from '../../../constants/relations';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'FriendsandFamilyForm';
class FriendsandFamilyForm extends Component {
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
      multiple_time_rows: [],
      single_time_rows: [],
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
      this.props.goalsObject.FriendsandFamilyForm &&
      this.props.goalsObject.FriendsandFamilyForm.hasOwnProperty(
        'multiple_times'
      )
    )
      this.setState({
        multiple_time_rows: this.props.goalsObject.FriendsandFamilyForm
          .multiple_times,
      });

    if (
      this.props.goalsObject.FriendsandFamilyForm &&
      this.props.goalsObject.FriendsandFamilyForm.hasOwnProperty('single_time')
    )
      this.setState({
        single_time_rows: this.props.goalsObject.FriendsandFamilyForm
          .single_time,
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
    const colsFormatMultiple = [
      {
        title: 'Person Providing Assistance',
        dataIndex: 'person_providing_assistance',
        key: 'person_providing_assistance',
        fields: [
          {
            type: 'Input',
            name: 'person_providing_assistance',
          },
        ],
      },
      {
        title: 'Relationship',
        dataIndex: 'relationship',
        key: 'relationship',
        fields: [
          {
            type: 'Select',
            name: 'relationship',
            placeholder: '-Select-',
            values: relations,
          },
        ],
      },
      {
        title: 'What are these funds for ?',
        dataIndex: 'funds',
        key: 'funds',
        fields: [
          {
            type: 'Select',
            name: 'funds',
            placeholder: '-Select-',
            values: ['Tuition', 'Room, Board, Misc', 'Any'],
          },
        ],
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        fields: [
          {
            type: 'Currency',
            name: 'amount',
          },
        ],
      },
      {
        title: 'Frequency',
        dataIndex: 'frequency',
        key: 'frequency',
        fields: [
          {
            type: 'Select',
            name: 'frequency',
            placeholder: '-Select-',
            values: ['Weekly', 'Monthly', 'Quarterly', 'Annually'],
          },
        ],
      },
      {
        title: `Start Date`,
        dataIndex: 'start_date',
        key: 'start_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'start_date',
          },
        ],
      },
      {
        title: `End Date`,
        dataIndex: 'end_date',
        key: 'end_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'end_date',
          },
        ],
      },
    ];

    const colsFormatOnetime = [
      {
        title: 'Person Providing Assistance',
        dataIndex: 'person_providing_assistance',
        key: 'person_providing_assistance',
        fields: [
          {
            type: 'Input',
            name: 'person_providing_assistance',
          },
        ],
      },
      {
        title: 'Relationship',
        dataIndex: 'relationship',
        key: 'relationship',
        fields: [
          {
            type: 'Select',
            name: 'relationship',
            placeholder: '-Select-',
            values: relations,
          },
        ],
      },
      {
        title: 'What are these funds for ?',
        dataIndex: 'funds',
        key: 'funds',
        fields: [
          {
            type: 'Select',
            name: 'funds',
            placeholder: '-Select-',
            values: ['Tuition', 'Room, Board, Misc', 'Any'],
          },
        ],
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        fields: [
          {
            type: 'Currency',
            name: 'amount',
          },
        ],
      },
      {
        title: `Date`,
        dataIndex: 'date',
        key: 'date',
        fields: [
          {
            type: 'DatePicker',
            name: 'date',
          },
        ],
      },
    ];

    const { size } = this.state;
    return (
      <React.Fragment>
        <h2 className='text-center font-weight-bold mb-4'>
          Friends and Family
        </h2>
        <SubFormTable
          title='Multiple Payments'
          rows={this.state.multiple_time_rows}
          colsFormat={colsFormatMultiple}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'multiple_times', rows)
          }
        ></SubFormTable>

        <SubFormTable
          title='One time Payment'
          rows={this.state.single_time_rows}
          colsFormat={colsFormatOnetime}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'single_time', rows)
          }
        ></SubFormTable>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={size}
              onClick={() => {
                this.props.dynamicFormsMovePrevious('FriendsandFamilyForm');
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
                this.props.dynamicFormsMoveNext('FriendsandFamilyForm');
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

export default connect()(FriendsandFamilyForm);
