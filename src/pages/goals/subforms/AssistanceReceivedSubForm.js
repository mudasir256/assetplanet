import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Select, Row, Col, Input, Button } from 'antd';
import Currency from '../../../components/form/Currency';
import SubFormTable from '../../../components/SubFormTable';

const { Option } = Select;
const InputGroup = Input.Group;

var formData = [];
const formID = 'AssistanceReceivedSubForm';
class AssistanceReceivedSubForm extends Component {
  static FnCreateFormData(data) {
    let formData = {
      title: 'Assistance Received Details (Financial Gift)',
      fields: [
        {
          id: 'recipient_first_name',
          title: 'Recipient First Name',
          value: data['recipient_first_name'],
        },
        {
          id: 'recipient_last_name',
          title: 'Recipient Last Name',
          value: data['recipient_last_name'],
        },
        {
          id: 'person_first_name',
          title: 'Person Providing Assistance First Name',
          value: data['person_first_name'],
        },
        {
          id: 'person_last_name',
          title: 'Person Providing Assistance Last Name',
          value: data['person_last_name'],
        },
        {
          id: 'relationship',
          title: 'Person Providing Assistance',
          value: data['relationship'],
        },
        {
          id: 'total_amount_gift_received',
          title: 'Total Amount of Gift Received',
          value: data['total_amount_gift_received'],
        },
      ],
    };

    return formData;
  }

  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      enableNext: true,
      formData: {
        total_amount_gift_received: '',
      },
      size: 'large',
    };

    this.goNextForm = this.goNextForm.bind(this);
    this.updateFormData = this.updateFormData.bind(this);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.formChange = this.formChange.bind(this);
  }

  componentDidMount() {
    if (
      this.props.goalsObject.AssistanceReceivedSubForm &&
      this.props.goalsObject.AssistanceReceivedSubForm.hasOwnProperty(
        'assitance_recived_details'
      )
    )
      this.setState({
        rows: this.props.goalsObject.AssistanceReceivedSubForm
          .assitance_recived_details,
      });
    this.updateFormData(this.props.subFormData);
  }

  updateFormData(newFormData) {
    console.log(newFormData);
    let formData = this.state.formData;
    if (newFormData.hasOwnProperty('fields')) {
      for (var findex = 0; findex < newFormData.fields.length; findex++) {
        if (newFormData.fields[findex]['id'] == 'person_first_name') {
          formData['person_first_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'person_last_name') {
          formData['person_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_last_name') {
          formData['recipient_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_first_name') {
          formData['recipient_first_name'] =
            newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'recipient_last_name') {
          formData['recipient_last_name'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'relationship') {
          formData['relationship'] = newFormData.fields[findex]['value'];
        }
        if (newFormData.fields[findex]['id'] == 'total_amount_gift_received') {
          formData['total_amount_gift_received'] =
            newFormData.fields[findex]['value'];
        }
      }

      let enableNext = false;
      if (
        formData['committmentDate'] != '' &&
        formData['committmentAmount'] != ''
      ) {
        enableNext = true;
      }

      this.setState({
        formData: formData,
        enableNext: enableNext,
      });
    }
  }

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
    let formData = AssistanceReceivedSubForm.FnCreateFormData({
      recipient_first_name: this.state.formData['recipient_first_name'],
      recipient_last_name: this.state.formData['recipient_last_name'],
      person_first_name: this.state.formData['person_first_name'],
      person_last_name: this.state.formData['person_last_name'],
      relationship: this.state.formData['relationship'],
      total_amount_gift_received: this.state.formData[
        'total_amount_gift_received'
      ],
    });

    this.props.cbUpdateSubForm(formID, formData);

    this.props.cbGoSubForm('QuestionAssignAssetSubForm');
  }

  goPreviousForm() {
    this.props.cbGoSubForm('GoalFinancingInformationSubForm');
  }

  formChange(rows) {
    formData = rows;
  }

  render() {
    const relationships = [
      'Aunt',
      'Charity',
      'Cousin',
      'Friend',
      'Grandchild',
      'Grandparent',
      'In-Law',
      'Nephew',
      'Niece',
      'Other',
      'Parent',
      'Sibling',
      'Step-Grandparent',
      'Step-Sibling',
      'Uncle',
    ];

    const colsFormat = [
      {
        title: 'Recipient',
        dataIndex: 'recipient',
        key: 'recipient',
        fields: [
          {
            type: 'Input',
            name: 'recipient_name',
          },
        ],
      },
      {
        title: 'Person Providing Assistance',
        dataIndex: 'person_providing_assistance',
        key: 'person_providing_assistance',
        fields: [
          {
            type: 'Input',
            name: 'person_providing_assistances',
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
            values: relationships,
          },
        ],
      },
      {
        title: 'Amount Received',
        dataIndex: 'amount_reveived',
        key: 'amount_reveived',
        fields: [
          {
            type: 'Currency',
            name: 'amount_reveived',
          },
        ],
      },
    ];

    const { size } = this.state;
    return (
      <React.Fragment>
        <SubFormTable
          title='Assistance Received Details (Financial Gift)'
          rows={this.state.rows}
          colsFormat={colsFormat}
          addNewButton={true}
          cbFormChange={(rows) =>
            this.props.handleFormInputChange(
              formID,
              'assitance_recived_details',
              rows
            )
          }
          // cbFormChange={this.formChange}
        ></SubFormTable>

        {/* <h2 className="text-center font-weight-bold mb-4">Assistance Received Details (Financial Gift)z</h2> */}
        {/* <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <InputGroup>
                                    <Form.Item label="Recipient">
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Input 
                                                    value={this.state.formData.recipient_first_name}
                                                    name="recipient_first_name"
                                                    placeholder="First Name"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Input 
                                                    value={this.state.formData.recipient_last_name}
                                                    name="recipient_last_name"
                                                    placeholder="Last Name"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Item label="Person Providing Assistance">
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Input 
                                                    value={this.state.formData.person_first_name}
                                                    name="person_first_name"
                                                    placeholder="First Name"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Input 
                                                    value={this.state.formData.person_last_name}
                                                    name="person_last_name"
                                                    placeholder="Last Name"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </InputGroup>
                            </Col>
                        </Col>
                    </Row> */}
        {/* <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col span={8}>
                                <Form.Item label="Relationship">
                                    <Select
                                        showSearch
                                        placeholder="-Select-"
                                        style={{width: '100%'}}
                                        value={this.state.formData.relationship}
                                        size={size}
                                        onChange={(value) => this.handleSelectChange("relationship", value)}
                                    >
                                    {
                                        relationships.map((relation, index) => <Option key={index} value={relation}>{relation}</Option>)
                                    }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row> */}
        {/* <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col span={8}>
                                <Form.Item  label="Total Amount of Gift Received">
                                    <Currency 
                                        value={this.state.formData.total_amount_gift_received}
                                        name="total_amount_gift_received"
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row> */}
        {/* <div className="d-flex justify-content-end">
                    <Button type="primary" size={size} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div> */}

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
    );
  }
}

export default connect()(AssistanceReceivedSubForm);
