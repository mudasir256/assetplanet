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

const formID = 'CheckListPrivateEducation';
class CheckListPrivateEducation extends Component {
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

  goNextForm() {
    this.props.cbGoSubForm('SummaryPagePrivateEducation');
  }

  goToSelectedForm() {
    this.props.cbGoSubForm('FundingSourcesForm');
  }

  handleFormInputChange(name, value) {
    this.setState({
      formData: {
        howWillYouPay: value,
      },
    });

    let formData = CheckListPrivateEducation.FnCreateFormData({
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

  getChecklistRows = (text, cardName) => {
    return (
      <Row gutter={16} type='flex' justify='center'>
        <Col span={7}>
          <Form.Item className='text-center'>
            <Card size='small' className='card-information'>
              <div className='info-wrap'>
                <div className='info-title'>{cardName}</div>
              </div>
            </Card>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <h5
              onClick={() => {
                this.goToSelectedForm();
              }}
            >
              {text}
            </h5>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <h2 className='text-center font-weight-bold mb-4'>
            Checklist of methods you selected to pay for Education<br></br>
          </h2>

          {this.props.goalsObject['FundingSourcesForm'].FriendsandFamilyForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'FriendsandFamilyForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .FriendsandFamilyForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Friends / Family'
              )
            : ''}

          {this.props.goalsObject['FundingSourcesForm'].ContributionSavingForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'ContributionSavingForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .ContributionSavingForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Contribution / Savings'
              )
            : ''}

          {this.props.goalsObject['FundingSourcesForm'].StudentLoanForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'StudentLoanForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .StudentLoanForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Student Loan'
              )
            : ''}

          {this.props.goalsObject['FundingSourcesForm'].ScholarshopAndGrantForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'ScholarshopAndGrantForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .ScholarshopAndGrantForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Scholarship / Grant'
              )
            : ''}

          {this.props.goalsObject['FundingSourcesForm'].PersonalLoanHelocForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'PersonalLoanHelocForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .PersonalLoanHelocForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Personal Loan / HELOC'
              )
            : ''}

          {this.props.goalsObject['FundingSourcesForm'].WorkStudyForm
            ? this.getChecklistRows(
                this.props.goalsObject['FundingSourcesForm'] &&
                  this.props.goalsObject['FundingSourcesForm'][
                    'WorkStudyForm'
                  ] &&
                  this.props.goalsObject['FundingSourcesForm']
                    .WorkStudyForm_rad === 'yes'
                  ? 'Details completed. Congratulations !'
                  : 'Details not Completed. Click HERE to complete',
                'Work Study'
              )
            : ''}
        </div>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() => {
                this.props.dynamicFormsMovePrevious(
                  'CheckListPrivateEducation'
                );
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
                console.log('Object Data ', this.props.goalsObject);
                this.goNextForm();
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

export default connect()(CheckListPrivateEducation);
