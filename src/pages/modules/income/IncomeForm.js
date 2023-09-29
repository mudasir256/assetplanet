import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio,
    DatePicker
} from 'antd';
import { Link } from 'react-router-dom';

import Country from '../../../components/form/Country';
import PhoneNumber from '../../../components/form/PhoneNumber';
import Email from '../../../components/form/Email';
import TextArea from 'antd/lib/input/TextArea';
import Currency from '../../../components/form/Currency';

const { Option } = Select;

class IncomeFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const professions = [
            'Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate'
        ]

        const income_types = [
            'Annuity', 'Bonus from Work', 'Business Proceeds - Ordinary'
        ]

        const owners = [
            'Frank Jones', 'Tracy Jones', 'Joint'
        ]

        const frequencies = [
            'Annually', 'Bi-Weekly', 'Monthly', 'One-Time', 'Quarterly'
        ]
        return (            
            <Form>
                <p className="form-label">
                    <Link>Click Here</Link> to add new person(s)/entity. CLICKING WILL RESET THIS FORM.
                </p>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Income Type">
                                <Select
                                    showSearch
                                    placeholder="-Frank Jones-"
                                >
                                {
                                    income_types.map((income_type, index) => <Option key={index} value={income_type}>{income_type}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Nickname Income">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Owner">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                {
                                    owners.map((owner, index) => <Option key={index} value={owner}>{owner}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Frequency of Pay Periods">
                                <Select
                                    showSearch
                                    placeholder="-Frank Jones-"
                                >
                                {
                                    frequencies.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Gross Wages">
                                <Currency />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Est. Amt. Remaining First Year">
                                <Currency />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Already Receiving Income?">
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="% Yearly Increase">
                                <Input addonAfter="%" />
                            </Form.Item>
                            <Form.Item label="Date Income Starts">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Income Source From Asset">
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Income Ends at">
                                <Radio.Group>
                                    <Radio value="death">Death</Radio>
                                    <Radio value="spouse death">Spouse Death</Radio>
                                    <Radio value="other">Other</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Date Income Ends">
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Income Source From Insurance Policy">
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Notes">
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Income Taxation</h4>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Federal Taxation Type">
                                <Radio.Group>
                                    <Radio value="Ordinary Income">Ordinary Income</Radio>
                                    <Radio value="Tax Free">Tax Free</Radio>
                                    <Radio value="Qualified Income">Qualified Income</Radio>
                                    <Radio value="Capital Gains">Capital Gains</Radio>
                                </Radio.Group>
                                <p className="form-desc">Ordinary is added income to your St/Fed tax rate. Most income from working/jobs taxed at Ordinary. Qualified is taxed at the Cap Gains rate - example stock dividends not REIT's</p>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="State Taxation Type">
                                <Radio.Group>
                                    <Radio value="Ordinary Income">Ordinary Income</Radio>
                                    <Radio value="Tax Free">Tax Free</Radio>
                                    <Radio value="Qualified Income">Qualified Income</Radio>
                                    <Radio value="Capital Gains">Capital Gains</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="Adjusted Gross Income (AGI)">
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Passive or Earned">
                                <Radio.Group>
                                    <Radio value="Passive">Passive</Radio>
                                    <Radio value="Earned">Earned</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Amount Subject to Federal Taxation">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <p className="form-label">
                        Some income is not federally taxed at 100%. For example, depending upon income, 50% or 85% of Social Security benefits could subject to Federal Tax. <Link>CLICK HERE</Link> for resource.
                    </p>
                </div>
            </Form>            
        )
    }
}

const IncomeForm = Form.create({ name: 'register' })(IncomeFormWrap);

export default connect()(IncomeForm);