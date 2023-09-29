import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
} from 'antd';

import { Link } from 'react-router-dom';
import State from '../../../components/form/State';
import TaxCreditSubForm from './TaxCreditSubForm';

const { Option } = Select;

class TaxInflationFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
                 
        const general_inflations = [
            'Static', 'Professional Prediction', 'User Defined'
        ]

        function GeneralInflation(props) {
            return (
                <Select
                    showSearch
                    placholder="-Select-"
                >
                {
                    general_inflations.map((inflation, index) => (<Option key={index} value={inflation}>{inflation}</Option>))
                }
                </Select>
            )
        }
        return (            
            <Form>
                <div className="info-form-block">
                    <h4 className="title">Tax Information</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="State Taxation">
                                <State></State>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Tax Filing Election">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                    <Option value="Single">Single</Option>
                                    <Option value="Head of Household">Head of Household</Option>
                                    <Option value="Married Filing Jointly">Married Filing Jointly</Option>
                                    <Option value="Married Filing Separately">Married Filing Separately</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Deductions">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                    <Option value="Itemized">Itemized</Option>
                                    <Option value="Standard">Standard</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="State Tax Effective Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Federal Tax Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Total Tax Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span className="form-label">For the State Tax ranges, <Link to="">Click HERE</Link></span>
                        </Col>
                        <Col span={12}>
                            <span className="form-label">For the Federal Tax ranges, <Link to="">Click HERE</Link></span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Total Adjusted Gross Income">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Federal Collectible Tax Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col>
                            <TaxCreditSubForm></TaxCreditSubForm>
                            <span className="form-label">For details all of these Tax Credits, <Link to="">Click HERE.</Link> </span>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Capital Gains &amp; Carry Forward Loss Information</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Amount Withdrawn Subject to Cap Gains">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Cap Gains Rate Federal">
                                <Input addonAfter="%" />
                            </Form.Item>
                            <Form.Item label="Cap Gains Rate State">
                                <Input addonAfter="%" />
                            </Form.Item>
                            <span className="form-label">Information on Capital Gains from the Tax Policy Center:<Link to="">HERE.</Link> </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Do You Have Carry Forward Loss?">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                    <Option value="yes">Yes</Option>
                                    <Option value="no">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">General Inflation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="General Inflation">
                                <GeneralInflation></GeneralInflation>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Medical Inflation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Medical Inflation">
                                <GeneralInflation></GeneralInflation>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Education Inflation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Education Inflation">
                                <GeneralInflation></GeneralInflation>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Luxury Inflation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Luxury Inflation">
                                <GeneralInflation></GeneralInflation>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Housing Inflation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Housing Inflation">
                                <GeneralInflation></GeneralInflation>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form>            
        )
    }
}

const TaxInflationForm = Form.create({ name: 'register' })(TaxInflationFormWrap);

export default connect()(TaxInflationForm);