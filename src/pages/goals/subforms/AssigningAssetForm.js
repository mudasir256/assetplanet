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

const formID = 'AssigningAssetForm';
const selectedColor = '#2589D5';
const unselectedColor = '#ADD8E6';
class AssigningAssetForm extends Component {
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
        heading: '',
        text: '',
        isShow: false,
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

    let formData = AssigningAssetForm.FnCreateFormData({
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

  getRows = (firstname, secondname, information) => {
    return (
      <Row gutter={16} type='flex' justify='space-between'>
        <Col span={12}>
          <Form.Item className='text-center'>
            <Card
              size='small'
              className='card-information'
              style={{
                background:
                  this.state.heading === firstname
                    ? selectedColor
                    : unselectedColor,
              }}
              onMouseEnter={() => {
                this.setState({
                  isShow: true,
                  heading: firstname,
                  text: information,
                });
              }}
              onMouseLeave={() => {
                this.setState({ isShow: false, heading: '' });
              }}
            >
              <div className='info-wrap'>
                <div className='info-title'>{firstname}</div>
              </div>
            </Card>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className='text-center'>
            <Card
              size='small'
              className='card-information'
              style={{
                background:
                  this.state.heading === secondname
                    ? selectedColor
                    : unselectedColor,
              }}
              onMouseEnter={() => {
                this.setState({
                  isShow: true,
                  heading: secondname,
                  text: information,
                });
              }}
              onMouseLeave={() => {
                this.setState({ isShow: false, heading: '' });
              }}
            >
              <div className='info-wrap'>
                <div className='info-title'>{secondname}</div>
              </div>
            </Card>
          </Form.Item>
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className='info-form-block'>
          <h2 className='text-center font-weight-bold mb-4'>Assign an Asset</h2>

          <Row gutter={16} type='flex' justify='space-between'>
            <Col span={12}>
              {this.getRows(
                `Adam's IRA`,
                `Meyers Rental House`,
                `This account is liquid and can be used for this Goal. It
                        is Currently not been used for any other Goal. This
                        account is not subject to gains taxes if used for
                        college expenses.`
              )}
              {this.getRows(
                `Adam's House`,
                `Jhonny's 529`,
                `This account is liquid and can be used for this Goal. It
                        is Currently not been used for any other Goal. This
                        account is not subject to gains taxes if used for
                        college expenses.`
              )}
              {this.getRows(
                `Adam's Checking Account`,
                `Heather's IRA`,
                `This account is liquid and can be used for this Goal. It
                        is Currently not been used for any other Goal. This
                        account is not subject to gains taxes if used for
                        college expenses.`
              )}
              {this.getRows(
                `Heather's Checking Account`,
                `Adam's Saving Account`,
                `This account is liquid and can be used for this Goal. It
                is Currently not been used for any other Goal. This
                account is not subject to gains taxes if used for
                college expenses.`
              )}
            </Col>
            <Col span={10}>
              {this.state.isShow ? (
                <Form.Item className='text-center'>
                  <Card
                    size='small'
                    className='card-information'
                    style={{
                      background: '#98fb98',
                    }}
                  >
                    <div
                      className='info-wrap'
                      style={{ flexDirection: 'column' }}
                    >
                      <div className='info-title'>{this.state.heading}</div>
                      <div className='info-title-x'>{this.state.text}</div>
                    </div>
                  </Card>
                </Form.Item>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </div>

        <div className='row justify-content-between'>
          <div className='col-8'>
            <Button
              type='primary'
              size={'large'}
              onClick={() =>
                this.props.dynamicFormsMovePrevious('AssigningAssetForm')
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
              onClick={() => {
                console.log('Object Data ', this.props.goalsObject);
                this.props.dynamicFormsMoveNext('AssigningAssetForm');
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

export default connect()(AssigningAssetForm);
