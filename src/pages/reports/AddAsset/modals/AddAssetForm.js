import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker ,
  } from 'antd';

const { Option } = Select;

class AddAssetFormWrap extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
         
        return (
            <div className="form-wrapper">
                <Form>
                    <div className="info-form-block">
                        <h4 className="form-section-title">Clients and Plans</h4>
                        <Row gutter={[24,16]}>
                            <Col span={12}>
                                <Form.Item label="Client Name">
                                    <Row gutter={[16,8]}>
                                        <Col span={12}>
                                            {getFieldDecorator('first_name', {
                                                rules: [
                                                    {
                                                        type: 'text',
                                                        message: 'First Name',
                                                    },
                                                    { required: true, message: 'Please input the captcha you got!' }
                                                ],
                                            })(<Input placeholder="First Name"/>)}
                                        </Col>
                                        <Col span={12}>
                                            {getFieldDecorator('First Name', {
                                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                            })(<Input placeholder="Last Name"/>)}
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Spouse/Partner Name">
                                    <Row gutter={[16,8]}>
                                        <Col span={12}>
                                            {getFieldDecorator('first_name', {
                                                rules: [
                                                    {
                                                        type: 'text',
                                                        message: 'First Name',
                                                    },
                                                    { required: true, message: 'Please input the captcha you got!' }
                                                ],
                                            })(<Input placeholder="First Name"/>)}
                                        </Col>
                                        <Col span={12}>
                                            {getFieldDecorator('First Name', {
                                                rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                            })(<Input placeholder="Last Name"/>)}
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24,16]}>
                            <Col span={12}>
                                <Form.Item label="Plan Nickname">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="All Assets">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className="info-form-block">
                        <h4 className="form-section-title">Asset Details</h4>
                        <Row gutter={[24,16]}>
                            <Col span={8}>
                                <Form.Item label="Name of Asset">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Account Type">
                                    <Select showSearch placeholder="Select Account Type">
                                        <Option value="">Account A</Option>
                                        <Option value="">Account B</Option>
                                        <Option value="">Account C</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Held Where">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24,16]}>
                            <Col span={8}>
                                <Form.Item label="Monetary Value">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Value As of Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="This Asset is Liquid">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[24,16]}>
                            <Col span={8}>
                                <Form.Item label="Taxability">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Taxability on Distribution">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className="info-form-block">
                        <Button type="primary">Submit</Button>
                    </div>
                </Form>
            </div>    
        )
    }
}

const AddAssetForm = Form.create({ name: 'register' })(AddAssetFormWrap);

export default connect()(AddAssetForm);