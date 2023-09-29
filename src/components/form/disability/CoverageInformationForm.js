import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon } from 'antd';

const formName = 'CoverageInformationForm';

class CoverageInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budget_party_1: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.disabilityObject.budgetChanges &&
      this.props.disabilityObject.budgetChanges.hasOwnProperty('budget_party_1')
    )
      this.setState({
        budget_party_1: this.props.disabilityObject.budgetChanges.budget_party_1,
      });
  }

  handleFormChange(key, rows) {
    let formData = this.state.formData;

    formData[key] = rows;
    this.setState({
      formData: formData,
    });
  }

  render() {
    const budgetParty1 = [
      {
        title: 'Policy Name',
        dataIndex: 'policy_name',
        key: 'policy_name',
        fields: [
          {
            type: 'Input',
            name: 'policy_name',
          },
        ],
      },
      {
        title: '% of Pre-disability Wage Covered',
        dataIndex: 'wage_covered',
        key: 'wage_covered',
        fields: [
          {
            type: 'Currency',
            name: 'wage_covered',
          },
        ],
      },
      {
        title: 'Monthly Cap',
        dataIndex: 'monthly_cap',
        key: 'monthly_cap',
        fields: [
          {
            type: 'Currency',
            name: 'monthly_cap',
          },
        ],
      },
      {
        title: 'Length of Coverage',
        dataIndex: 'length_of_coverage',
        key: 'length_of_coverage',
        fields: [
          {
            type: 'Currency',
            name: 'length_of_coverage',
          },
        ],
      },
      {
        title: 'Accident Only or Illness?',
        dataIndex: 'accident_or_illness',
        key: 'accident_or_illness',
        fields: [
          {
            type: 'Input',
            name: 'accident_or_illness',
          },
        ],
      },
      {
        title: 'Own Occupation or Any Occupation?',
        dataIndex: 'own_or_any_occupation',
        key: 'own_or_any_occupation',
        fields: [
          {
            type: 'Input',
            name: 'own_or_any_occupation',
          },
        ],
      },
      {
        title: 'Click to Update Policy',
        dataIndex: 'click_to_update_policy',
        key: 'click_to_update_policy',
        fields: [
          {
            type: 'Input',
            name: 'click_to_update_policy',
          },
        ],
      },
    ];

    const {
      handleInputChange,
      disabilityObject,
      handleDatePickerChange,
      handleSelectChange,
      handleFormInputChange,
    } = this.props;

    return (
      <React.Fragment>
        <SubFormTable
          title='These are insurance policies that maybe used for this disability'
          rows={this.state.budget_party_1}
          colsFormat={budgetParty1}
          addNewButton={false}
          cbFormChange={(rows) =>
            handleFormInputChange(formName, 'budget_party_1', rows)
          }
        ></SubFormTable>

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
                console.log('FORM DATA ', this.props.divorceObject);
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

export default CoverageInformationForm;
