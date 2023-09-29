import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Currency from '../../../../components/form/Currency';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import moment from 'moment';
import { StyledForm } from '../../../../components/new-styled-components/FormStyling'


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
                if (newFormData.fields[findex]['id'] === 'planNumber') {
                    formData['planNumber'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'nickName') {
                    formData['nickName'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'planDescription') {
                    formData['planDescription'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] === 'replicatePlan') {
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

        if (formData['insuranceProduct'] !== '') {
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
            <>
                <StyledForm>
                    <Row>
                        <Col>
                            <Row type="flex" justify="center">
                                <Col span={23}>
                                    <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                                        {/* Form Title */}
                                        <Col xs={24}>
                                            <h2>Create New Plan:</h2>
                                        </Col>
                                    </Row>

                                    <Form 
                                        name="basic"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        autoComplete="off"
                                    >
                                        <Row type="flex" justify="center">
                                            <Col xs={24}>
                                                <Row gutter={[{ xs: 24, sm:32, md: 40 }, {xs: 24, sm:32, md: 40}]} type="flex">
                                                    {/* Client Name */}
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label="Client Name:">
                                                            <Input value={this.state.formData.name} name="name" placeholder="Enter Name Here..." onChange={(event) => this.handleInputChange(event)} />
                                                        </Form.Item>
                                                    </Col>

                                                    {/* Select New Plan Number */}
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label="Select New Plan Number">
                                                            <Select
                                                                showSearch
                                                                placeholder="Select Plan Number..."
                                                                value={this.state.formData.planNumber}
                                                                onChange={(value) => this.handleSelectChange("planNumber", value)}
                                                            >
                                                                <Option key={0} value={""} disabled>Select Plan Number...</Option>
                                                                {
                                                                    plans.map((plan, index) => (<Option key={index + 1} value={plan}>{plan}</Option>))
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    {/* Pick Plan NickName */}
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label="Pick Plan NickName">
                                                            <Input value={this.state.formData.nickName} name="nickName" placeholder="Enter Plan Nickname Here..." onChange={(event) => this.handleInputChange(event)} />
                                                        </Form.Item>
                                                    </Col>

                                                    {/* Further Description of this Plan */}
                                                    <Col xs={24} md={12}>
                                                        <Form.Item label="Further Description of this Plan">
                                                            <Input value={this.state.formData.planDescription} name="planDescription" placeholder="Enter Plan Description Here..." onChange={(event) => this.handleInputChange(event)} />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24}>
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
                                            </Col>
                                        </Row>

                                        <Row className="button-items-wrap" type="flex" align='middle' justify='end'>
                                            <Col>
                                                <div className='button-items'>
                                                    <Button
                                                        type="primary"
                                                        className='btn-blue submit'
                                                        onClick={() => this.goNextForm()}
                                                        disabled={!this.state.enableNext}
                                                        size={"large"}
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </StyledForm>
            </>
        )
    }
}


export default connect()(PlanInformationSubForm);