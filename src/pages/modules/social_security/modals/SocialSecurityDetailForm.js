import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Form,
    Input,
    DatePicker,
    Row,
    Col
  } from 'antd';
import Currency from '../../../../components/form/Currency';

class SocialSecurityDetailFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        
        return (            
            <Form>
                <p className="form-label">
                    <strong>Abbreviations</strong>:   FRA is Full Retirement Age   TVM is Time Value of Money   COLA is Cost of Living Adjustment
                </p>
                
                <div className="info-form-block">
                    <h4 className="title">Items Related to Time</h4>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Client Birthdate">
                                <DatePicker style={{width: '100%'}}/>
                                <p className="form-desc">
                                    Autofill, Asset Planet will solve from information you entered in Name and Information.
                                </p>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Client Estimated Year of Retirement">
                                <Input />
                                <p className="form-desc">
                                Please enter the year you estimate retiring.
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Client Estimated Year of Death">
                                <Input />
                                <p className="form-desc">
                                Autofill, Asset Planet will solve from information you entered in Name and Information, but can be overridden here.
                                </p>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Time until Full Retirement Age">
                                <Input />
                                <p className="form-desc">
                                Autofill, Asset Planet will solve based on your birthdate and information provided by the Social Security Administration.
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Items Related to Money</h4>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Client Monthly Benefit at Full Retirement Age">
                                <Currency />
                                <p className="form-desc">
                                Full Retirement Age is the age at which you are eligible to receive your "full" amount of Social Security benefits, found on https://www.ssa.gov/myaccount (link below).
                                </p>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Time Value of Money Interest Rate">
                                <Input addonAfter="%" />
                                <p className="form-desc">
                                Time value of money (TVM) is the idea that money that is available at the present time is worth more than the same amount in the future, due to its potential earning capacity. This percentage is the rate at which money received today will grow.
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Cost of Living Adjustment*">
                                <Input addonAfter="%" />
                                <p className="form-desc">
                                The cost of living adjustment is an increase in income that keeps up with the cost of living. It's often applied to wages, salaries, and benefits.
                                </p>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <p className="form-desc color-red">
                                If your Monthly Benefit at Full Retirement Age is unknown, please visit mySocial Security <Link >HERE</Link>.
                            </p>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Retirement Earnings Calculator</h4>
                    <p className="subform-title">Complete if currently working AND eligible for retirement benefits this year.</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Enter date you would like to begin receiving benefits:">
                                <Currency />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Monthly decrease in benefit">
                                <Currency />
                                <p className="form-desc">
                                Retiring early, not same year as FRA
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Your estimated earnings:">
                                <Currency />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Monthly decrease in benefit">
                                <Currency />
                                <p className="form-desc">
                                Retiring early, same year as FRA
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>

                    <p className="subform-title">Spouse Section</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Spouse Birthdate">
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Spouse Estimated Year of Retirement">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Spouse Time until Full Retirement Age">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <p className="subform-title">Spouse Section2</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Spouse Monthly Benefit at Full Retirement Age">
                                <Currency />
                            </Form.Item>
                            <Form.Item label="Spouse Cost of Living Adjustment">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Spouse Time Value of Money Interest Rate">
                                <Input addonAfter="%"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <p className="title">Spouse Retirement Earnings Calculator</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Enter date you would like to begin receiving benefits">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Monthly decrease in benefit">
                                <Currency />
                                <p className="form-desc">
                                Retiring early, same year as FRA
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Your estimated earnings">
                                <Currency />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Monthly decrease in benefit">
                                <Currency />
                                <p className="form-desc">
                                Retiring early, same year as FRA
                                </p>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form>            
        )
    }
}

const SocialSecurityDetailForm = Form.create({ name: 'register' })(SocialSecurityDetailFormWrap);

export default connect()(SocialSecurityDetailForm);