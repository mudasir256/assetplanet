import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'PersonalLoanHelocForm';
class PersonalLoanHelocForm extends Component {
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
      parent_plus_rows: [],
      personal_rows: [],
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
      this.props.goalsObject.PersonalLoanHelocForm &&
      this.props.goalsObject.PersonalLoanHelocForm.hasOwnProperty(
        'parent_plus_loan'
      )
    )
      this.setState({
        parent_plus_rows: this.props.goalsObject.PersonalLoanHelocForm
          .parent_plus_loan,
      });

    if (
      this.props.goalsObject.PersonalLoanHelocForm &&
      this.props.goalsObject.PersonalLoanHelocForm.hasOwnProperty(
        'personal_loans'
      )
    )
      this.setState({
        personal_rows: this.props.goalsObject.PersonalLoanHelocForm
          .personal_loans,
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
    const colsFormatParentLoan = [
      {
        title: 'Initial Loan Amount',
        dataIndex: 'initial_loan_amount',
        key: 'initial_loan_amount',
        fields: [
          {
            type: 'Currency',
            name: 'initial_loan_amount',
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
        title: `Monthly Payment`,
        dataIndex: 'monthly_payment',
        key: 'monthly_payment',
        fields: [
          {
            type: 'Currency',
            name: 'monthly_payment',
          },
        ],
      },
      {
        title: `Origination Fee`,
        dataIndex: 'origination_fee',
        key: 'origination_fee',
        fields: [
          {
            type: 'Currency',
            name: 'origination_fee',
          },
        ],
      },
      {
        title: 'Interest Rate (or APR)',
        dataIndex: 'interest_rate',
        key: 'interest_rate',
        fields: [
          {
            type: 'Percent',
            name: 'interest_rate',
          },
        ],
      },
      {
        title: `Name of Financial Institution`,
        dataIndex: 'name_financial_institution',
        key: 'name_financial_institution',
        fields: [
          {
            type: 'Input',
            name: 'name_financial_institution',
          },
        ],
      },
      {
        title: `Account Number`,
        dataIndex: 'account_number',
        key: 'account_number',
        fields: [
          {
            type: 'Input',
            name: 'account_number',
          },
        ],
      },
      {
        title: `Number of year for Replacement Plan`,
        dataIndex: 'replacement_plan',
        key: 'replacement_plan',
        fields: [
          {
            type: 'Input',
            name: 'replacement_plan',
          },
        ],
      },
      {
        title: 'Deferring Payments until Graduation',
        dataIndex: 'deferring_payment',
        key: 'deferring_payment',
        fields: [
          {
            type: 'Select',
            name: 'deferring_payment',
            placeholder: '-Select-',
            values: ['Yes', 'No'],
          },
        ],
      },
      {
        title: 'Interest only until Graduation',
        dataIndex: 'interested_only_graduation',
        key: 'interested_only_graduation',
        fields: [
          {
            type: 'Select',
            name: 'interested_only_graduation',
            placeholder: '-Select-',
            values: ['Yes', 'No'],
          },
        ],
      },
    ];

    const colsFormatPrivateLoan = [
      {
        title: 'Initial Loan Amount',
        dataIndex: 'initial_loan_amount',
        key: 'initial_loan_amount',
        fields: [
          {
            type: 'Currency',
            name: 'initial_loan_amount',
          },
        ],
      },
      {
        title: 'Start Date',
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
        title: `Maturity Date`,
        dataIndex: 'maturity_date',
        key: 'maturity_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'maturity_date',
          },
        ],
      },
      {
        title: 'Interest Rate (APR)',
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
        title: `Monthly Payment`,
        dataIndex: 'monthly_payment',
        key: 'monthly_payment',
        fields: [
          {
            type: 'Currency',
            name: 'monthly_payment',
          },
        ],
      },
      {
        title: `Name of Financial Institution`,
        dataIndex: 'name_financial_institution',
        key: 'name_financial_institution',
        fields: [
          {
            type: 'Input',
            name: 'name_financial_institution',
          },
        ],
      },
      {
        title: `Account Number`,
        dataIndex: 'account_number',
        key: 'account_number',
        fields: [
          {
            type: 'Input',
            name: 'account_number',
          },
        ],
      },
      {
        title: `Length of Loan (Years)`,
        dataIndex: 'length_of_loan',
        key: 'length_of_loan',
        fields: [
          {
            type: 'Input',
            name: 'length_of_loan',
          },
        ],
      },
    ];

    const { size } = this.state;
    return (
      <React.Fragment>
        <SubFormTable
          title='Parent PLUS Loan'
          rows={this.state.parent_plus_rows}
          colsFormat={colsFormatParentLoan}
          addNewButton={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'parent_plus_loan', rows)
          }
        ></SubFormTable>

        <SubFormTable
          title='Personal Loan / HELOC'
          rows={this.state.personal_rows}
          colsFormat={colsFormatPrivateLoan}
          addNewButton={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(formID, 'personal_loans', rows)
          }
        ></SubFormTable>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={size}
              onClick={() => {
                this.props.dynamicFormsMovePrevious('PersonalLoanHelocForm');
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
                this.props.dynamicFormsMoveNext('PersonalLoanHelocForm');
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

export default connect()(PersonalLoanHelocForm);
