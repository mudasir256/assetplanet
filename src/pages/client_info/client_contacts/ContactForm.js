import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Radio
} from 'antd';

import Country from '../../../components/form/Country';
import PhoneNumber from '../../../components/form/PhoneNumber';
import Email from '../../../components/form/Email';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

class ContactFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {

        const professions = [
            'Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate'
        ]
        return (            
            <Form>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Client">
                                <Select
                                    showSearch
                                    placeholder="-Frank Jones-"
                                >
                                    <Option value="Frank Jones">Frank Jones</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Contact List</h4>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Name">
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="First Name"/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="Last Name"/>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Company">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Address">
                                <Row>
                                    <Col>
                                        <Input placeholder="Address Line 1"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input placeholder="Address Line 2"/>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="City / District"/>
                                    </Col>
                                    <Col span={12}>
                                        <Input placeholder="State / Province"/>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input placeholder="Postal Code"/>
                                    </Col>
                                    <Col span={12}>
                                        <Country></Country>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Phone">
                                <PhoneNumber></PhoneNumber>    
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Alternate Phone">
                                <PhoneNumber></PhoneNumber>    
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Relationship">
                                <Radio.Group>
                                    <Radio value="family">Family</Radio>
                                    <Radio value="friend">Friend</Radio>
                                    <Radio value="professional">Professiona</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Profession">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                {
                                    professions.map((profession, index) => <Option key={index} value={profession}>{profession}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Part of My Professional Team">
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Part of My Professional Team">
                                <Email></Email>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item label="Notes">
                                <TextArea></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Form>            
        )
    }
}

const ContactForm = Form.create({ name: 'register' })(ContactFormWrap);

export default connect()(ContactForm);