import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Button, Col, Form, DatePicker, Icon } from 'antd';
import moment from 'moment';
import Currency from '../../../components/form/Currency';
import { ASSETS } from 'constants/types';
import SubFormTable from '../../../components/SubFormTable';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

var formData = [];
const formID = 'AssignSavingsToGoalSubForm';
class AssignSavingsToGoalSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Assign Savings to Goal',
      fields: [
        {
          id: 'assetGoal',
          title: 'Assets to Assign to Goal',
          value: data['assetGoal'],
        },
        {
          id: 'monthlySavingstoAssign',
          title: 'Monthly Saving to Assign',
          value: data['monthlySavingstoAssign'],
        },
        {
          id: 'startContributionDate',
          title: 'Date to Start Contribution',
          value: data['startContributionDate'],
        },
        {
          id: 'endContributionDate',
          title: 'Date to End Contribution',
          value: data['endContributionDate'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      isCheck: false,
      rows: [],
      assignSavingToGoal: [],
      enableNext: true,
      formData: {
        monthlySavingstoAssign: '',
      },
      size: 'large',
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);

    this.formChange = this.formChange.bind(this);
  }

  componentDidMount() {
    if (
      this.props.goalsObject.AssignSavingsToGoalSubForm &&
      this.props.goalsObject.AssignSavingsToGoalSubForm.hasOwnProperty(
        'assign_saving_to_goal'
      )
    )
      this.setState({
        rows: this.props.goalsObject.AssignSavingsToGoalSubForm
          .assign_saving_to_goal,
      });

    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] == 'assetGoal') {
          formData['assetGoal'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'monthlySavingstoAssign') {
          formData['monthlySavingstoAssign'] =
            newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'startContributionDate') {
          formData['startContributionDate'] =
            newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'endContributionDate') {
          formData['endContributionDate'] = newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

  disabledStartDate = (startDate) => {
    const endDate = moment(
      this.state.formData['endContributionDate'],
      dateFormat
    );
    if (!startDate || !endDate) {
      return false;
    }
    return startDate.valueOf() > endDate.valueOf();
  };

  disabledEndDate = (endDate) => {
    const startDate = moment(
      this.state.formData['startContributionDate'],
      dateFormat
    );
    if (!endDate || !startDate) {
      return false;
    }
    return endDate.valueOf() <= startDate.valueOf();
  };

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
    let formData = AssignSavingsToGoalSubForm.FnCreateFormData({
      assetGoal: this.state.formData['assetGoal'],
      monthlySavingstoAssign: this.state.formData['monthlySavingstoAssign'],
      startContributionDate: this.state.formData['startContributionDate'],
      endContributionDate: this.state.formData['endContributionDate'],
    });

    this.props.cbUpdateSubForm(formID, formData);
    this.props.cbGoSubForm('QuestionLoanSubForm');
  }

  formChange(rows) {
    formData = rows;
  }

  goPreviousForm() {
    this.props.cbGoSubForm('QuestionAssignAssetSubForm');
  }

  render() {
    const colsAssignSavingFormat = [
      {
        title: 'Asset To Assign Goal',
        dataIndex: 'asset_to_assign_goal',
        key: 'asset_to_assign_goal',
        fields: [
          {
            type: 'Select',
            name: 'asset_to_assign_goal',
            placeholder: '-Select-',
            values: ASSETS,
          },
        ],
      },
      {
        title: 'Monthly Saving to Assign',
        dataIndex: 'monthly_saving_to_assign',
        key: 'monthly_saving_to_assign',
        fields: [
          {
            type: 'Currency',
            name: 'monthly_saving_to_assign',
          },
        ],
      },
      {
        title: 'Date to Start Contribution',
        dataIndex: 'date_to_start_contribution',
        key: 'date_to_start_contribution',
        fields: [
          {
            type: 'DatePicker',
            name: 'date_to_start_contribution',
          },
        ],
      },
      {
        title: 'Date to End Contribution',
        dataIndex: 'date_to_end_contribution',
        key: 'date_to_end_contribution',
        fields: [
          {
            type: 'DatePicker',
            name: 'date_to_end_contribution',
          },
        ],
      },
      {
        title: 'Future Value of Asset with Saving',
        dataIndex: 'future_value_of_asset_with_savings',
        key: 'future_value_of_asset_with_savings',
        fields: [
          {
            type: 'Currency',
            name: 'future_value_of_asset_with_savings',
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        {!this.state.isCheck ? (
          <Row gutter={16}>
            <Col span={24}>
              <h2 className='text-center font-weight-bold mb-4'>
                Would you like to apply savings to this goal ?
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
                  this.props.dynamicFormsMoveNext('AssignSavingsToGoalSubForm');
                }}
              >
                No
              </Button>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
            <SubFormTable
              title='Assign Savings to Goal'
              rows={this.state.rows}
              colsFormat={colsAssignSavingFormat}
              addNewButton={true}
              cbFormChange={(rows) =>
                this.props.handleFormInputChange(
                  formID,
                  'assign_saving_to_goal',
                  rows
                )
              }
            ></SubFormTable>

            <h2 className='text-center font-weight-bold mb-4'>
              Current Information
            </h2>

            <Row gutter={16} type='flex' justify='center'>
              <Col span={16}>
                <Form.Item label='Current Monthly Saving Capacity'>
                  <Currency
                    value={
                      this.props.goalsObject[formID]
                        .current_monthly_saving_capacity
                        ? this.props.goalsObject[formID]
                            .current_monthly_saving_capacity
                        : ''
                    }
                    name='current_monthly_saving_capacity'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='Total Monthly Saving'>
                  <Currency
                    value={
                      this.props.goalsObject[formID].total_monthly_saving
                        ? this.props.goalsObject[formID].total_monthly_saving
                        : ''
                    }
                    name='total_monthly_saving'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='Monthly Needed to Fund Goal'>
                  <Currency
                    value={
                      this.props.goalsObject[formID].monthly_needed_to_fund_goal
                        ? this.props.goalsObject[formID]
                            .monthly_needed_to_fund_goal
                        : ''
                    }
                    name='monthly_needed_to_fund_goal'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item label='Total Saving Including Rate of Return'>
                  <Currency
                    value={
                      this.props.goalsObject[formID].monthlySavingstoAssign
                        ? this.props.goalsObject[formID].monthlySavingstoAssign
                        : ''
                    }
                    name='monthlySavingstoAssign'
                    onChange={(e) => this.props.handleInputChange(e, formID)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className='row justify-content-between'>
              <div className='col-8'>
                <Button
                  type='primary'
                  size={'large'}
                  onClick={() => {
                    this.props.dynamicFormsMovePrevious(
                      'AssignSavingsToGoalSubForm'
                    );
                  }}
                  // onClick={() => this.goPreviousForm()}
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
                    this.props.dynamicFormsMoveNext(
                      'AssignSavingsToGoalSubForm'
                    );
                  }}
                  // onClick={() => this.goNextForm()}
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

export default connect()(AssignSavingsToGoalSubForm);
