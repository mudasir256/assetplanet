import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import { ASSETS } from 'constants/types';
import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;

var formData = [];
const formID = 'AssetsToGoalSubForm';
class AssetsToGoalSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Assistance Received Details (Financial Gift)',
      fields: [
        {
          id: 'assets_goal',
          title: 'Assets to Assign to Goal',
          value: data['assets_goal'],
        },
        {
          id: 'amount_goal',
          title: 'Amount to Use for this Goal',
          value: data['amount_goal'],
        },
        {
          id: 'amount_other_goal',
          title: 'Amount Used In Other Goals',
          value: data['amount_other_goal'],
        },
        {
          id: 'taxes',
          title: 'Taxes',
          value: data['taxes'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      isCheck: false,
      current_liquid_assets: [],
      rows: [],
      enableNext: true,
      formData: {
        amount_goal: '',
        amount_other_goal: '',
        taxes: '',
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
      this.props.goalsObject.AssetsToGoalSubForm &&
      this.props.goalsObject.AssetsToGoalSubForm.hasOwnProperty(
        'asset_to_assign_to_goal'
      )
    )
      this.setState({
        rows: this.props.goalsObject.AssetsToGoalSubForm
          .asset_to_assign_to_goal,
      });

    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] === 'assets_goal') {
          formData['assets_goal'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] === 'amount_goal') {
          formData['amount_goal'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] === 'amount_other_goal') {
          formData['amount_other_goal'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] === 'taxes') {
          formData['taxes'] = newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;
      if (
        formData['committmentDate'] !== '' &&
        formData['committmentAmount'] !== ''
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
    let formData = AssetsToGoalSubForm.FnCreateFormData({
      assets_goal: this.state.formData['assets_goal'],
      value_goal_date: this.state.formData['value_goal_date'],
      loan_goal_date: this.state.formData['loan_goal_date'],
      amount_goal: this.state.formData['amount_goal'],
      amount_other_goal: this.state.formData['amount_other_goal'],
      taxes: this.state.formData['taxes'],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm('QuestionApplySavingSubForm');
  }

  goPreviousForm() {
    this.props.cbGoSubForm('QuestionFinancialAssitanceSubForm');
  }

  formChange(rows) {
    formData = rows;
  }

  render() {
    const colsCurrentFormat = [
      {
        title: 'Asset',
        dataIndex: 'asset',
        key: 'asset',
        fields: [
          {
            type: 'Input',
            name: 'asset',
          },
        ],
      },
      {
        title: 'Available Amount For This Goal',
        dataIndex: 'available_amount_for_this_goal',
        key: 'available_amount_for_this_goal',
        fields: [
          {
            type: 'Input',
            name: 'available_amount_for_this_goal',
          },
        ],
      },
      {
        title: 'Previous Goals Asset Used For',
        dataIndex: 'previous_goal_asset_used_for',
        key: 'previous_goal_asset_used_for',
        fields: [
          {
            type: 'Input',
            name: 'previous_goal_asset_used_for',
          },
        ],
      },
      {
        title: 'Previous Goals Date',
        dataIndex: 'previous_goals_date',
        key: 'previous_goals_date',
        fields: [
          {
            type: 'Input',
            name: 'previous_goals_date',
          },
        ],
      },

      {
        title: 'Previous Goals Amount',
        dataIndex: 'previous_goals_amount',
        key: 'previous_goals_amount',
        fields: [
          {
            type: 'Input',
            name: 'previous_goals_amount',
          },
        ],
      },

      {
        title: 'Value Before Previous Goal Distribution',
        dataIndex: 'value_before_previous_goal_distribution',
        key: 'value_before_previous_goal_distribution',
        fields: [
          {
            type: 'Input',
            name: 'value_before_previous_goal_distribution',
          },
        ],
      },
      {
        title: 'Amount Used For Previous Goal',
        dataIndex: 'amount_used_for_previous_goal',
        key: 'amount_used_for_previous_goal',
        fields: [
          {
            type: 'Input',
            name: 'amount_used_for_previous_goal',
          },
        ],
      },
      {
        title: 'Tax On Gains',
        dataIndex: 'tax_on_gains',
        key: 'tax_on_gains',
        fields: [
          {
            type: 'Input',
            name: 'tax_on_gains',
          },
        ],
      },
      {
        title: 'Unfunded Previous Goal Amount',
        dataIndex: 'unfunded_previous_goal_amount',
        key: 'unfunded_previous_goal_amount',
        fields: [
          {
            type: 'Input',
            name: 'unfunded_previous_goal_amount',
          },
        ],
      },
    ];

    const colsAssetToAssignFormat = [
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        fields: [
          {
            type: 'Input',
            name: 'priority',
          },
        ],
      },
      {
        title: 'Assets',
        dataIndex: 'assets',
        key: 'assets',
        fields: [
          {
            type: 'Input',
            name: 'assets',
          },
        ],
      },
      {
        title: 'Value of Asset at Goal Date',
        dataIndex: 'value_of_asset_at_goal_date',
        key: 'value_of_asset_at_goal_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'value_of_asset_at_goal_date',
          },
        ],
      },
      {
        title: 'Loan Value at Goal Date',
        dataIndex: 'loan_value_at_goal_date',
        key: 'loan_value_at_goal_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'loan_value_at_goal_date',
          },
        ],
      },
      {
        title: 'Amount to Use for this Goal',
        dataIndex: 'amount_to_use_for_this_goal',
        key: 'amount_to_use_for_this_goal',
        fields: [
          {
            type: 'Currency',
            name: 'amount_to_use_for_this_goal',
          },
        ],
      },
      {
        title: 'Amount Used in Other Goals',
        dataIndex: 'amount_used_in_other_goals',
        key: 'amount_used_in_other_goals',
        fields: [
          {
            type: 'Currency',
            name: 'amount_used_in_other_goals',
          },
        ],
      },
      {
        title: 'Taxes',
        dataIndex: 'taxes',
        key: 'taxes',
        fields: [
          {
            type: 'Input',
            name: 'taxes',
          },
        ],
      },
      {
        title: 'Net After Tax Applied to Goal',
        dataIndex: 'net_after_tax_applied_to_goal',
        key: 'net_after_tax_applied_to_goal',
        fields: [
          {
            type: 'Currency',
            name: 'net_after_tax_applied_to_goal',
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        {!this.state.isCheck ? (
          <Row gutter={16}>
            <Col span={24}>
              {this.props.currentFormTitle === 'Start a Business' ? (
                <h2 className='text-center font-weight-bold mb-4'>
                  Would you like to assign an asset to this goal ?
                </h2>
              ) : (
                <h2 className='text-center font-weight-bold mb-4'>
                  Are you getting Financial Assistance From Friend and Family ?
                </h2>
              )}
            </Col>
            <Col
              span={12}
              className='d-flex align-items-center justify-content-end'
            >
              <Button
                className='pl-4 pr-4 mr-5'
                type='primary'
                size={'large'}
                onClick={() => this.setState({ isCheck: true })}
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
                  this.props.dynamicFormsMoveNext('AssetsToGoalSubForm');
                }}
              >
                No
              </Button>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <h2 className='text-center font-weight-bold mb-4'>
              Assets to Assign to Goal
            </h2>

            <SubFormTable
              title='Current Liquid Assets in Plan'
              rows={this.state.current_liquid_assets}
              colsFormat={colsCurrentFormat}
              addNewButton={false}
            ></SubFormTable>

            <SubFormTable
              title='Asset to Assign to Goal'
              rows={this.state.rows}
              colsFormat={colsAssetToAssignFormat}
              addNewButton={true}
              cbFormChange={(rows) =>
                this.props.handleFormInputChange(
                  formID,
                  'asset_to_assign_to_goal',
                  rows
                )
              }
            ></SubFormTable>

            <div className='row justify-content-between'>
              <div className='col-8'>
                <Button
                  type='primary'
                  size={'large'}
                  onClick={() =>
                    this.props.dynamicFormsMovePrevious('AssetsToGoalSubForm')
                  }
                >
                  <Icon type='left' />
                  Previous
                </Button>
              </div>
              <div className='col-4 d-flex justify-content-end'>
                <Button
                  type='primary'
                  size={'large'}
                  onClick={() =>
                    this.props.dynamicFormsMoveNext('AssetsToGoalSubForm')
                  }
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

export default connect()(AssetsToGoalSubForm);
