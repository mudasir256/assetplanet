import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Currency from '../../../../components/form/Currency';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
const { Panel } = Collapse;

const plans = [
    '3', '4', '5', '6', '7', '8', '9', '10'
]

const formID = "PlanInformationSubForm";
class PlanInformationSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Client Information',
            fields: [
                {
                    id: 'planNumber',
                    title: 'Select New Plan Number',
                    value: data['planNumber']
                },
                {
                    id: 'nickName',
                    title: 'Pick NickName',
                    value: data['nickName']
                },
                {
                    id: 'planDescription',
                    title: 'Further Description of this Plan',
                    value: data['planDescription']
                },
                {
                    id: 'replicatePlan',
                    title: 'Do You Want To Replicate Plan',
                    value: data['replicatePlan']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                planNumber: '',
                nickName: '',
                planDescription: '',
                replicatePlan: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'planNumber') {
                    formData['planNumber'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'nickName') {
                    formData['nickName'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'planDescription') {
                    formData['planDescription'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'replicatePlan') {
                    formData['replicatePlan'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            // if(formData['insuranceProduct'] != ''){
            //     enableNext = true;
            // }

            enableNext = true;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if (formData['insuranceProduct'] != '') {
            newState['enableNext'] = true;
        }
        else {
            newState['enableNext'] = false;
        }

        newState['enableNext'] = true;

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
        if (!this.state.enableNext) {
            return;
        }

        let formData = PlanInformationSubForm.FnCreateFormData({
            planNumber: this.state.formData['planNumber'],
            nickName: this.state.formData['nickName'],
            planDescription: this.state.formData['planDescription'],
            replicatePlan: this.state.formData['replicatePlan']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("EndSubForm");

    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Create New Plan</h4>

                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item label="Clients">
                                <Select
                                    disabled
                                    showSearch
                                    placeholder="Frank Jones"
                                >
                                    <Option value="Frank Jones">Frank Jones</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item label="Select New Plan Number">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.planNumber}
                                    onChange={(value) => this.handleSelectChange("planNumber", value)}
                                >
                                    {
                                        plans.map((plan, index) => (<Option key={index} value={plan}>{plan}</Option>))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item label="Pick NickName">
                                <Input value={this.state.formData.nickName} name="nickName" onChange={(event) => this.handleInputChange(event)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item label="Further Description of this Plan">
                                <Input value={this.state.formData.planDescription} name="planDescription" onChange={(event) => this.handleInputChange(event)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16} type='flex'>
                        <Col span={16}>
                            <Form.Item label="Do You Want To Replicate Plan">
                                <Radio.Group
                                    name="replicatePlan"
                                    size={'large'}
                                    value={this.state.formData.replicatePlan}
                                    onChange={this.handleInputChange}
                                >
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Button type="primary" disabled={!this.state.enableNext} onClick={() => this.goNextForm()}>Next</Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PlanInformationSubForm);