import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon } from 'antd';
import { relations } from '../../../constants/relations';

const formName = 'ProvidingAssistanceInformationForm';

class ProvidingAssistanceInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providing_assistance_information: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.assistanceObject.ProvidingAssistanceInformationForm &&
      this.props.assistanceObject.ProvidingAssistanceInformationForm.hasOwnProperty(
        'providing_assistance_information'
      )
    )
      this.setState({
        providing_assistance_information: this.props.assistanceObject
          .ProvidingAssistanceInformationForm.providing_assistance_information,
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
    const providingAssistanceInformation = [
      {
        title: 'First Name',
        dataIndex: 'first_name',
        key: 'first_name',
        fields: [
          {
            type: 'Input',
            name: 'first_name',
          },
        ],
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        fields: [
          {
            type: 'Input',
            name: 'last_name',
          },
        ],
      },

      {
        title: 'Person Providing Assistance',
        dataIndex: 'providing',
        key: 'providing',
        fields: [
          {
            type: 'Select',
            name: 'providing',
            placeholder: '-Select-',
            values: relations,
          },
        ],
      },
      {
        title: 'Estimated Start Date',
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
        title: 'Estimated End Date',
        dataIndex: 'end_date',
        key: 'end_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'end_date',
          },
        ],
      },

      {
        title: 'Assistance Ends at Death',
        dataIndex: 'end_at',
        key: 'end_at',
        fields: [
          {
            type: 'Select',
            name: 'end_at',
            placeholder: '-Select-',
            values: ['Yes', 'No'],
          },
        ],
      },
      {
        title: 'Annual Gifting Amount',
        dataIndex: 'gifting_amount',
        key: 'gifting_amount',
        fields: [
          {
            type: 'Currency',
            name: 'gifting_amount',
          },
        ],
      },

      {
        title: 'Add to Monthly Budget',
        dataIndex: 'monthly_budget',
        key: 'monthly_budget',
        fields: [
          {
            type: 'Select',
            name: 'monthly_budget',
            placeholder: '-Select-',
            values: ['Yes', 'No'],
          },
        ],
      },

      {
        title: 'Budget Item',
        dataIndex: 'budget_item',
        key: 'budget_item',
        fields: [
          {
            type: 'Select',
            name: 'budget_item',
            placeholder: '-Select-',
            values: relations,
          },
        ],
      },
    ];

    const { handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        <SubFormTable
          title='Providing Assistance Information'
          rows={this.state.providing_assistance_information}
          colsFormat={providingAssistanceInformation}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(
              formName,
              'providing_assistance_information',
              rows
            )
          }
        ></SubFormTable>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                if (
                  this.props.assistanceObject['ProvidingReceivingForm']
                    .assistance &&
                  this.props.assistanceObject['ProvidingReceivingForm']
                    .assistance === 'Providing'
                )
                  this.props.isProvidingBack();
                else if (
                  this.props.assistanceObject['CurrentFutureForm'].type &&
                  this.props.assistanceObject['CurrentFutureForm'].type ===
                    'Current Assistance'
                ) {
                  this.props.isCurrentInheritanceBack();
                } else this.props.previousForm();
              }}
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
                // this.props.nextForm();
              }}
            >
              Finish
              <Icon type='right' />
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProvidingAssistanceInformationForm;
