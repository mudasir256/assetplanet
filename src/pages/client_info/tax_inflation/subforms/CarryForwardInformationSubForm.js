import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select } from 'antd';

import TextArea from 'antd/lib/input/TextArea';

import Currency from '../../../../components/form/Currency';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const formID = "CarryForwardInformationSubForm";
class CarryForwardInformationSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Tax and Liquidity',
            fields: [
                {
                    id: 'amount',
                    title: 'Amount of Carry Forward',
                    value: data['amount']
                },
                {
                    id: 'short_term',
                    title: 'Amount of Carry Forward',
                    value: data['short_term']
                },
                {
                    id: 'updatedDate',
                    title: 'Carry Forward Updated',
                    value: data['updatedDate']
                },
                {
                    id: 'notes',
                    title: 'Carry Forward Loss Notes',
                    value: data['notes']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                amount: '',
                updatedDate: '',
                notes: ''
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
                if (newFormData.fields[findex]['id'] == 'amount') {
                    formData['amount'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'updatedDate') {
                    formData['updatedDate'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'notes') {
                    formData['notes'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['amount'] != '' && formData['updatedDate'] != '') {
                enableNext = true;
            }

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

        if (formData['amount'] != '' && formData['updatedDate'] != '') {
            newState['enableNext'] = true;
        }
        else {
            newState['enableNext'] = false;
        }

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

        let formData = CarryForwardInformationSubForm.FnCreateFormData({
            amount: this.state.formData['amount'],
            updatedDate: this.state.formData['updatedDate'],
            notes: this.state.formData['notes']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("InflationsSubForm");

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title  text-center">Carry Forward Loss Informationss</h4>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Total Carry Forward">
                                <Currency value={this.state.formData.amount} name="amount" onChange={(event) => this.handleInputChange(event)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Short Term Carry Forward">
                                <Currency value={this.state.formData.amount} name="short_term" onChange={(event) => this.handleInputChange(event)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Long Term Carry Forward">
                                <Currency value={this.state.formData.amount} name="long_term" onChange={(event) => this.handleInputChange(event)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Carry Forward Updated">
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format={dateFormat}
                                    onChange={(date, dateString) => this.handleDatePickerChange('updatedDate', date, dateString)}
                                    value={this.state.formData.updatedDate == '' ? null : moment(this.state.formData.updatedDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Carry Forward Loss Notes">
                                <TextArea value={this.state.formData.notes} name="notes" onChange={(event) => this.handleInputChange(event)} />
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


export default connect()(CarryForwardInformationSubForm);