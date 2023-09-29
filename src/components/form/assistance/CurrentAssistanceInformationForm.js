import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon } from 'antd';
import { relations } from '../../../constants/relations';

const formName = 'CurrentAssistanceInformationForm';

class CurrentAssistanceInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_assistance_information: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.assistanceObject.CurrentAssistanceInformationForm &&
      this.props.assistanceObject.CurrentAssistanceInformationForm.hasOwnProperty(
        'current_assistance_information'
      )
    )
      this.setState({
        current_assistance_information: this.props.assistanceObject
          .CurrentAssistanceInformationForm.current_assistance_information,
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
    const currentAssistanceInformation = [
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
        title: 'Assistance Ends At',
        dataIndex: 'assistance_ends',
        key: 'assistance_ends',
        fields: [
          {
            type: 'Select',
            name: 'assistance_ends',
            placeholder: '-Select-',
            values: [
              'Death',
              'Retirement',
              'Spouse Retirement',
              'Another Date',
            ],
          },
        ],
      },
      {
        title: 'Total Amount Received',
        dataIndex: 'total_amount',
        key: 'total_amount',
        fields: [
          {
            type: 'Currency',
            name: 'total_amount',
          },
        ],
      },
    ];

    const { handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        <SubFormTable
          title='Current Assistance Information'
          rows={this.state.current_assistance_information}
          colsFormat={currentAssistanceInformation}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(
              formName,
              'current_assistance_information',
              rows
            )
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
                if (
                  this.props.assistanceObject['CurrentFutureForm'].type &&
                  this.props.assistanceObject['CurrentFutureForm'].type ===
                    'Current Assistance'
                )
                  this.props.isCurrentInheritance();
                else this.props.nextForm();
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

export default CurrentAssistanceInformationForm;
