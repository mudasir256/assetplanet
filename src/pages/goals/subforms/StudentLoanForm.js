import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'StudentLoanForm';
class StudentLoanForm extends Component {
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
      federal_rows: [],
      private_rows: [],
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
      this.props.goalsObject.StudentLoanForm &&
      this.props.goalsObject.StudentLoanForm.hasOwnProperty('federal_loans')
    )
      this.setState({
        federal_rows: this.props.goalsObject.StudentLoanForm.federal_loans,
      });

    if (
      this.props.goalsObject.StudentLoanForm &&
      this.props.goalsObject.StudentLoanForm.hasOwnProperty('private_loans')
    )
      this.setState({
        private_rows: this.props.goalsObject.StudentLoanForm.private_loans,
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
    const colsFormatFedral = [
      {
        title: 'Nick Name of Loan',
        dataIndex: 'loan_nickname',
        key: 'loan_nickname',
        fields: [
          {
            type: 'Input',
            name: 'loan_nickname',
          },
        ],
      },
      {
        title: `Amount`,
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
        title: 'APR (year loan taken)',
        dataIndex: 'apr',
        key: 'apr',
        fields: [
          {
            type: 'Percent',
            name: 'apr',
          },
        ],
      },
      {
        title: 'Federal Loans',
        dataIndex: 'federal_loans',
        key: 'federal_loans',
        fields: [
          {
            type: 'Select',
            name: 'federal_loans',
            placeholder: '-Select-',
            values: ['Direct Subsidized', 'Direct Unsubsidized', 'Direct PLUS'],
          },
        ],
      },
      {
        title: 'Cosigner',
        dataIndex: 'cosigner',
        key: 'cosigner',
        fields: [
          {
            type: 'Input',
            name: 'cosigner',
          },
        ],
      },
      {
        title: 'First Payment Due',
        dataIndex: 'first_payment_due',
        key: 'first_payment_due',
        fields: [
          {
            type: 'DatePicker',
            name: 'first_payment_due',
          },
        ],
      },
      {
        title: 'Amount of Payment',
        dataIndex: 'amount_of_payment',
        key: 'amount_of_payment',
        fields: [
          {
            type: 'Currency',
            name: 'amount_of_payment',
          },
        ],
      },
    ];

    const colsFormatPrivate = [
      {
        title: 'Nick Name of Loan',
        dataIndex: 'loan_nickname',
        key: 'loan_nickname',
        fields: [
          {
            type: 'Input',
            name: 'loan_nickname',
          },
        ],
      },
      {
        title: `Amount`,
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
        title: 'APR (year loan taken)',
        dataIndex: 'apr',
        key: 'apr',
        fields: [
          {
            type: 'Percent',
            name: 'apr',
          },
        ],
      },
      {
        title: 'Cosigner',
        dataIndex: 'cosigner',
        key: 'cosigner',
        fields: [
          {
            type: 'Input',
            name: 'cosigner',
          },
        ],
      },
      {
        title: 'First Payment Due',
        dataIndex: 'first_payment_due',
        key: 'first_payment_due',
        fields: [
          {
            type: 'DatePicker',
            name: 'first_payment_due',
          },
        ],
      },
      {
        title: 'Amount of Payment',
        dataIndex: 'amount_of_payment',
        key: 'amount_of_payment',
        fields: [
          {
            type: 'Currency',
            name: 'amount_of_payment',
          },
        ],
      },
    ];

    const { size } = this.state;
    return (
      <React.Fragment>
        <SubFormTable
          title='Federal Loans'
          rows={this.state.federal_rows}
          colsFormat={colsFormatFedral}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'federal_loans', rows)
          }
        ></SubFormTable>

        <SubFormTable
          title='Private Loans'
          rows={this.state.private_rows}
          colsFormat={colsFormatPrivate}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'private_loans', rows)
          }
        ></SubFormTable>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={size}
              onClick={() => {
                this.props.dynamicFormsMovePrevious('StudentLoanForm');
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
                this.props.dynamicFormsMoveNext('StudentLoanForm');
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

export default connect()(StudentLoanForm);
