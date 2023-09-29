import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Icon,
    Select,
    Row,
    Col,
    Input,
    Button,
    DatePicker
} from 'antd';
import Currency from '../../../components/form/Currency';
import moment from 'moment';

const { Option } = Select;
const InputGroup = Input.Group;
const dateFormat = 'MM/DD/YYYY';



var formData = [];
const formID = "AssistanceReceivedEducationSubForm";
class AssistanceReceivedEducationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Assistance Received Details (Financial Gift)',
            fields: [
                {
                    id: 'recipient_first_name',
                    title: 'Recipient First Name',
                    value: data['recipient_first_name']
                },
                {
                    id: 'recipient_last_name',
                    title: 'Recipient Last Name',
                    value: data['recipient_last_name']
                },
                {
                    id: 'person_first_name',
                    title: 'Person Providing Assistance First Name',
                    value: data['person_first_name']
                },
                {
                    id: 'person_last_name',
                    title: 'Person Providing Assistance Last Name',
                    value: data['person_last_name']
                },
                {
                    id: 'frequency',
                    title: 'Frequency',
                    value: data['frequency']
                },
                {
                    id: 'relationship',
                    title: 'Person Providing Assistance',
                    value: data['relationship']
                },
                {
                    id: 'startDate',
                    title: 'Start Date',
                    value: data['startDate']
                },
                {
                    id: 'endDate',
                    title: 'End Date',
                    value: data['endDate']
                },
                {
                    id: 'total_amount_gift_received',
                    title: 'Total Amount of Gift Received',
                    value: data['total_amount_gift_received']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                total_amount_gift_received: '',
                startDate: null,
                endDate: null
            },
            size: 'large',
            endOpen: false
        }

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
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
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
                    formData['recipient_first_name'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'recipient_last_name') {
                    formData['recipient_last_name'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'relationship') {
                    formData['relationship'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'frequency') {
                    formData['frequency'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'startDate') {
                    formData['startDate'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'endDate') {
                    formData['endDate'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'total_amount_gift_received') {
                    formData['total_amount_gift_received'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['committmentDate'] != '' && formData['committmentAmount'] != '') {
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }

    disabledStartDate = startDate => {
        const endDate = moment(this.state.formData['endDate'], dateFormat);
        if (!startDate || !endDate) {
            return false;
        }
        return startDate.valueOf() > endDate.valueOf();
    };

    disabledEndDate = endDate => {
        const startDate = moment(this.state.formData['startDate'], dateFormat);
        if (!endDate || !startDate) {
            return false;
        }
        return endDate.valueOf() <= startDate.valueOf();
    };

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
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
        let formData = AssistanceReceivedEducationSubForm.FnCreateFormData({
            recipient_first_name: this.state.formData['recipient_first_name'],
            recipient_last_name: this.state.formData['recipient_last_name'],
            person_first_name: this.state.formData['person_first_name'],
            person_last_name: this.state.formData['person_last_name'],
            relationship: this.state.formData['relationship'],
            frequency: this.state.formData['frequency'],
            startDate: this.state.formData['startDate'],
            endDate: this.state.formData['endDate'],
            total_amount_gift_received: this.state.formData['total_amount_gift_received']
        })

        this.props.cbUpdateSubForm(formID, formData);


        this.props.cbGoSubForm("QuestionAssignAssetSubForm");
    }

    formChange(rows) {
        formData = rows;
    }

    render() {
        const relationships = [ 
            'Aunt', 'Charity', 'Cousin', 'Friend', 'Grandchild', 'Grandparent' ,'In-Law', 'Nephew', 'Niece', 'Other', 'Parent', 'Sibling', 'Step-Grandparent', 'Step-Sibling', 'Uncle'
        ];
        const frequencies = ['Monthly', 'Quarterly', 'Annually', 'One-Time'];
        const { size } = this.state;
        return (
            <React.Fragment>
                    <h2 className="text-center font-weight-bold mb-4">Assistance Received Details (Financial Gift)</h2>
                    <Row gutter={16} type="flex" justify="center">
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
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
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
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Frequency">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.frequency}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("frequency", value)}
                                >
                                {
                                    frequencies.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item  label="Total Amount of Gift Received">
                                <Currency 
                                    value={this.state.formData.total_amount_gift_received}
                                    name="total_amount_gift_received"
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item  label="Start Date">
                                <DatePicker
                                    disabledDate={this.disabledStartDate}
                                    format="MM/DD/YYYY"
                                    onChange={(date, dateString) => this.handleDatePickerChange('startDate', date, dateString)}
                                    value={this.state.formData.startDate == null || this.state.formData.startDate == '' ? null : moment(this.state.formData.startDate, dateFormat)}
                                    placeholder="Start"
                                    size={size}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item  label="End Date">
                                <DatePicker
                                    disabledDate={this.disabledEndDate}
                                    format="MM/DD/YYYY"
                                    onChange={(date, dateString) => this.handleDatePickerChange('endDate', date, dateString)}
                                    value={this.state.formData.endDate == null || this.state.formData.endDate == '' ? null : moment(this.state.formData.endDate, dateFormat)}
                                    placeholder="End"
                                    size={size}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={size} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(AssistanceReceivedEducationSubForm);