import React, { Component } from 'react';
import SubFormTable from '../../SubFormTable';
import { Button, Icon } from 'antd';

const formName = 'largeBillsForm';

class LargeBillsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large_bills: [],
      formData: {},
    };
  }

  componentDidMount() {
    if (
      this.props.checklistObject.largeBillsForm &&
      this.props.checklistObject.largeBillsForm.hasOwnProperty('large_bills')
    )
      this.setState({
        large_bills: this.props.checklistObject.largeBillsForm.large_bills,
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
    const largeBills = [
      {
        title: 'Large Bills',
        dataIndex: 'large_bills',
        key: 'large_bills',
        fields: [
          {
            type: 'Input',
            name: 'large_bills',
          },
        ],
      },
      {
        title: 'Dollar Amount',
        dataIndex: 'dollar_amount',
        key: 'dollar_amount',
        fields: [
          {
            type: 'Currency',
            name: 'dollar_amount',
          },
        ],
      },
      {
        title: 'When Due',
        dataIndex: 'due_date',
        key: 'due_date',
        fields: [
          {
            type: 'DatePicker',
            name: 'due_date',
          },
        ],
      },
      {
        title: 'Occurence',
        dataIndex: 'occurence',
        key: 'occurence',
        fields: [
          {
            type: 'Select',
            name: 'occurence',
            placeholder: '-Select-',
            values: [
              'One-Time',
              'Monthly',
              'Quaterly',
              'Semi-Annual',
              'Annual',
              'Other',
            ],
          },
        ],
      },
    ];

    const { handleFormInputChange } = this.props;

    return (
      <React.Fragment>
        <SubFormTable
          title='List of Large Bills'
          rows={this.state.large_bills}
          colsFormat={largeBills}
          addNewButton={true}
          cbFormChange={(rows) =>
            handleFormInputChange(formName, 'large_bills', rows)
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
                console.log('FORM DATA ', this.props.checklistObject);
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

export default LargeBillsForm;
