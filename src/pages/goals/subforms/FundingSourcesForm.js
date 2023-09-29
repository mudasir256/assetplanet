import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Form,
  DatePicker,
  Input,
  Button,
  Icon,
  Radio,
  Card,
  Checkbox,
} from 'antd';
import Currency from '../../../components/form/Currency';
import QuestionRoomBoardMisc from './QuestionRoomBoardMisc';
import './FundingSourcesForm.css';

const options = [
  'Friends / Family',
  'Savings',
  'Student Loan',
  'Scholorships / Grants',
  'Personal Loan',
  'Assign an Asset',
];
const dateFormat = 'MM/DD/YYYY';

const formID = 'FundingSourcesForm';
class FundingSourcesForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'How are you paying for the Tuition?',
      fields: [
        {
          id: 'howWillYouPay',
          title: 'How are you paying for the Tuition?',
          value: data['value'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      showForm: true,
      formData: {
        howWillYouPay: '',
        dummy: false,
        selected: [],
      },
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }

  componentDidMount() {
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    if (newFormData.hasOwnProperty('fields')) {
      this.setState({
        formData: {
          assetsAllocation: newFormData['fields'][0]['value'],
        },
      });
    }
  }

  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        howWillYouPay: value,
      },
    });

    let formData = FundingSourcesForm.FnCreateFormData({
      value: value,
    });

    this.props.cbUpdateSubForm(formID, formData);

    let nextSubFormID = '';
    switch (value) {
      case 'Friends / Family':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Contributions / Savings':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Student Loan':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Scholorships / Grants':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Personal Loan':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
      case 'Assign an Asset':
        nextSubFormID = 'SellingAssetCostsSubForm';
        break;
    }

    this.props.cbGoSubForm(nextSubFormID);
  }

  changeFormState = () => {
    this.setState({ showForm: false });
  };

  goNextForm(form) {
    this.props.cbGoSubForm(form);
  }

  getChecklistRows = (text, cardName, formName, formIDs, index) => {
    return (
      <Row gutter={16} type='flex' justify='space-between'>
        <Col span={6}>
          <Form.Item className='text-center'>{text}</Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item className='text-center'>
            <Card size='small' className='card-information'>
              <div className='info-wrap'>
                <Checkbox
                  checked={this.props.goalsObject[formID][formName]}
                  onChange={(e) => {
                    this.props.handleFormInputChange(
                      formID,
                      formName,
                      e.target.checked
                    );
                    this.setState({ dummy: true });
                  }}
                ></Checkbox>

                <div className='info-title'>{cardName}</div>
              </div>
            </Card>
          </Form.Item>
        </Col>
        <Col span={4}>
          {this.props.goalsObject[formID] &&
          this.props.goalsObject[formID][formName] ? (
            <Form.Item
              label='Complete details Now or Later ?'
              className='text-center'
            >
              <Radio.Group
                buttonStyle='solid'
                size={'large'}
                name={`${formName}_rad`}
                defaultValue={
                  this.props.goalsObject[formID][`${formName}_rad`]
                    ? this.props.goalsObject[formID][`${formName}_rad`]
                    : ''
                }
                onChange={(e) => {
                  this.setState({ dummy: true });
                  this.props.handleInputChange(e, formID);
                  if (e.target.value === 'yes')
                    this.props.insertFormDynamically(index, formIDs);
                  else if (e.target.value === 'no')
                    this.props.removeFormDynamically(formName);
                }}
              >
                <Radio.Button value='yes'>Now</Radio.Button>
                <Radio.Button value='no'>Later</Radio.Button>
              </Radio.Group>
            </Form.Item>
          ) : (
            ''
          )}
        </Col>
        <Col span={4}>
          {this.props.goalsObject[formID] &&
          this.props.goalsObject[formID][`${formName}_rad`] === 'no' ? (
            <Form.Item label='Total Amount' className='text-center'>
              <Currency
                name={`${formName}_total_amount`}
                value={
                  this.props.goalsObject[formID][`${formName}_total_amount`]
                    ? this.props.goalsObject[formID][`${formName}_total_amount`]
                    : ''
                }
                onChange={(e) => this.props.handleInputChange(e, formID)}
              />
            </Form.Item>
          ) : (
            ''
          )}
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <h2 className='text-center font-weight-bold mb-4'>
            You have determined that will cost:<br></br>
            Tution: $100,000<br></br> Room and Board: $20,000<br></br> Let's
            determine how it will be paid.
          </h2>
          <h4 className='text-center mb-4'>
            *Any option where "Now" is selected will show the detailed forms in
            order upon clicking Next.
          </h4>
          <h4 className='text-center mb-4'>
            *Any option where "Later" is selected will allow for a single field
            to provide a dollar value that will be received from that option.
            There will be an Checklist later within this module to give the
            opportunity to add more details for that option if desired.
          </h4>

          {this.getChecklistRows(
            'You will receive income from Friends and Family to assist in payment',
            'Friends / Family',
            'FriendsandFamilyForm',
            30,
            4
          )}

          {this.getChecklistRows(
            'You will use your personal savings or contribute monthly',
            'Contribution / Savings',
            'ContributionSavingForm',
            26,
            4
          )}

          {this.getChecklistRows(
            'A Student Loan(s) will be taken to apply to tution',
            'Student Loan',
            'StudentLoanForm',
            25,
            4
          )}

          {this.getChecklistRows(
            'A Scholarship(s) or Grant(s) will be applied to tution',
            'Scholarship / Grant',
            'ScholarshopAndGrantForm',
            23,
            4
          )}

          {this.getChecklistRows(
            'A Personal Loan or HELOC will be used to pay for tution',
            'Personal Loan / HELOC',
            'PersonalLoanHelocForm',
            29,
            4
          )}

          {this.getChecklistRows(
            'A Current Asset will be used to pay for tution',
            'Assign an Asset',
            'AssigningAssetForm',
            32,
            4
          )}

          {this.getChecklistRows(
            'A Work Study program will be applied to tution',
            'Work Study',
            'WorkStudyForm',
            24,
            4
          )}
        </div>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => this.goNextForm('RoomBoardMiscSubForm')}
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
                console.log('Object Data ', this.props.goalsObject);
                // this.goNextForm('FundingSourcesForm');
                this.props.dynamicFormsMoveNext('FundingSourcesForm');
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

export default connect()(FundingSourcesForm);
