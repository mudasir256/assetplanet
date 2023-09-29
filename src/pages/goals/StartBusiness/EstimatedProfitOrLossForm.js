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
const formID = 'EstimatedProfitOrLossForm';
class EstimatedProfitOrLossForm extends Component {
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
      this.props.goalsObject.EstimatedProfitOrLossForm &&
      this.props.goalsObject.EstimatedProfitOrLossForm.hasOwnProperty(
        'estimated_profit_loss'
      )
    )
      this.setState({
        rows: this.props.goalsObject.EstimatedProfitOrLossForm
          .estimated_profit_loss,
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
    let formData = EstimatedProfitOrLossForm.FnCreateFormData({
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
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        fields: [
          {
            type: 'Input',
            name: 'year',
          },
        ],
      },
      {
        title: 'Costs',
        dataIndex: 'costs',
        key: 'costs',
        fields: [
          {
            type: 'Currency',
            name: 'costs',
          },
        ],
      },
      {
        title: 'Gross Revenue',
        dataIndex: 'gross_revenue',
        key: 'gross_revenue',
        fields: [
          {
            type: 'Currency',
            name: 'gross_revenue',
          },
        ],
      },
      {
        title: 'Top Line Revenue Growth Rate',
        dataIndex: 'top_line_revenue',
        key: 'top_line_revenue',
        fields: [
          {
            type: 'Currency',
            name: 'top_line_revenue',
          },
        ],
      },
      {
        title: 'Profitability',
        dataIndex: 'profitability_percent',
        key: 'profitability_percent',
        fields: [
          {
            type: 'Percent',
            name: 'profitability_percent',
          },
        ],
      },
      {
        title: 'Profitability',
        dataIndex: 'profitability_currency',
        key: 'profitability_currency',
        fields: [
          {
            type: 'Currency',
            name: 'profitability_currency',
          },
        ],
      },
      {
        title: 'If Loss, Does Corp Retain Loss or Passthrough to Individual',
        dataIndex: 'retain_loss',
        key: 'retain_loss',
        fields: [
          {
            type: 'Select',
            name: 'retain_loss',
            placeholder: '-Select-',
            values: ['Corporation', 'Individual'],
          },
        ],
      },
      {
        title: 'Estimated Value of Business',
        dataIndex: 'estimated_value_business',
        key: 'estimated_value_business',
        fields: [
          {
            type: 'Currency',
            name: 'estimated_value_business',
          },
        ],
      },
      {
        title: 'Profits Added to Personal Income',
        dataIndex: 'personal_income',
        key: 'personal_income',
        fields: [
          {
            type: 'Currency',
            name: 'personal_income',
          },
        ],
      },
    ];

    return (
      <React.Fragment>
        {/* <h2 className='text-center font-weight-bold mb-4'>
          Estimated Profit and Loss Years 2 - 10
        </h2> */}
        <React.Fragment>
          <SubFormTable
            title='Estimated Profit and Loss Years 2 - 10'
            rows={this.state.rows}
            colsFormat={colsAssignSavingFormat}
            addNewButton={true}
            cbFormChange={(rows) =>
              this.props.handleFormInputChange(
                formID,
                'estimated_profit_loss',
                rows
              )
            }
          ></SubFormTable>

          <div className='row justify-content-between'>
            <div className='col-8'>
              <Button
                type='primary'
                size={'large'}
                onClick={() => this.goPreviousForm()}
              >
                <Icon type='left' />
                Previous
              </Button>
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <Button
                type='primary'
                size={'large'}
                onClick={() => this.goNextForm()}
              >
                Next
                <Icon type='right' />
              </Button>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default connect()(EstimatedProfitOrLossForm);
