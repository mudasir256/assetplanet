import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Radio,
    Typography,
  } from 'antd';

const { Option } = Select;
const InputGroup = Input.Group;
const { Text, Title } = Typography;
const { TextArea } = Input;

class AddAssetFormWrap extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
         
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Name">
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
                            <Form.Item label="Company">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label="Address">
                                <Row gutter={[16,8]}>
                                    <Col span={12}>
                                        {getFieldDecorator('address', {
                                            rules: [
                                                {
                                                    type: 'text',
                                                    message: 'Address',
                                                }
                                            ],
                                        })(<Input placeholder="Address Line 1" />)}
                                    </Col>
                                    <Col span={12}>
                                        {getFieldDecorator('address')(<Input placeholder="Address Line 2"/>)}
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="">
                                <Input placeholder="City / District" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="">
                                <Input placeholder="State / Province" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="">
                                <Input placeholder="Postal Code" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="">
                                <Select showSearch placeholder="Select Country">
                                    <Option value="">Country A</Option>
                                    <Option value="">Country B</Option>
                                    <Option value="">Country C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Phone">
                                <InputGroup compact>
                                    <Select defaultValue="+1" style={{ width: '20%' }}>
                                        <Option value="+1">+1</Option>
                                        <Option value="+2">+2</Option>
                                    </Select>
                                    <Input style={{ width: '80%' }} />
                                </InputGroup>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Alternate Phone">
                                <InputGroup compact>
                                    <Select defaultValue="+1" style={{ width: '20%' }}>
                                        <Option value="+1">+1</Option>
                                        <Option value="+2">+2</Option>
                                    </Select>
                                    <Input style={{ width: '80%' }} />
                                </InputGroup>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="Relationship">
                                <Radio.Group value={1}>
                                    <Radio value="Family">
                                        Family
                                    </Radio>
                                    <Radio value="Friend">
                                        Friend
                                    </Radio>
                                    <Radio value="Professional">
                                        Professional
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Profession">
                                <Select showSearch placeholder="-Select-">
                                    <Option value="">Profession A</Option>
                                    <Option value="">Profession B</Option>
                                    <Option value="">Profession C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Email">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Part of My Professional Team">
                                <Radio.Group value={1}>
                                    <Radio value="Yes">
                                        Yes
                                    </Radio>
                                    <Radio value="No">
                                        No
                                    </Radio>
                                </Radio.Group>
                                <Row>
                                    <Text type="secondary">Selected individuals part of inner circle used by client helpful to ID for Estate Plan Module</Text>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Notes">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="info-form-block">
                        <Row type="flex" justify="end" style={{ clear: 'both' }}>
                            <Col style={{ marginRight: 15 }}><Button>Reset</Button></Col>
                            <Col><Button type="primary">Submit</Button></Col>
                        </Row>
                    </div>
                </Form>
            </div>    
        )
    }
}

const AddAssetForm = Form.create({ name: 'register' })(AddAssetFormWrap);

export default connect()(AddAssetForm);