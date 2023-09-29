import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon } from 'antd';
import { relations } from '../../../constants/relations';

const formName = 'FutureInheritanceInformationForm';

class FutureInheritanceInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      future_inheritance_information: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.assistanceObject.FutureInheritanceInformationForm &&
      this.props.assistanceObject.FutureInheritanceInformationForm.hasOwnProperty(
        'future_inheritance_information'
      )
    )
      this.setState({
        future_inheritance_information: this.props.assistanceObject
          .FutureInheritanceInformationForm.future_inheritance_information,
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
    const futureInheritanceInformation = [
      {
        title: 'Expected Inheritance Amount',
        dataIndex: 'inheritance_amount',
        key: 'inheritance_amount',
        fields: [
          {
            type: 'Currency',
            name: 'inheritance_amount',
          },
        ],
      },
      {
        title: 'Year of Expected Inheritance',
        dataIndex: 'expected_inheritance',
        key: 'expected_inheritance',
        fields: [
          {
            type: 'Input',
            name: 'expected_inheritance',
          },
        ],
      },
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
    ];

    const { handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        <SubFormTable
          title='Future Inhertiance Information'
          rows={this.state.future_inheritance_information}
          colsFormat={futureInheritanceInformation}
          addNewButton={true}
          customWidth={true}
          cbFormChange={(rows) =>
            handleFormInputChange(
              formName,
              'future_inheritance_information',
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
                  this.props.assistanceObject['CurrentFutureForm'].type &&
                  this.props.assistanceObject['CurrentFutureForm'].type ===
                    'Future Inheritance'
                )
                  this.props.isFutureInheritanceBack();
                else this.props.previousForm();
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

export default FutureInheritanceInformationForm;
