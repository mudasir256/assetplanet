import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Typography,
    Radio
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Option } = Select;
const { Title } = Typography;

class AddEmailsToSendFormWrap extends Component {
    handleChange = value => {
        console.log(`selected ${value}`);
    }
      
    render() { 
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24} style={{ marginBottom: 15 }}>
                        <Col span={12}>
                            <Form.Item label="Relationship">
                                <Radio.Group value={1}>
                                    <Radio value={1}>
                                        Family
                                    </Radio>
                                    <Radio value={2}>
                                        Friend
                                    </Radio>
                                    <Radio value={3}>
                                        Professional
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email Templates Nickname*">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="To*">
                                <Select placeholder="-Select-">
                                    <Option value="1">Email A</Option>
                                    <Option value="2">Email B</Option>
                                    <Option value="3">Email C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="CC">
                                <Select mode="multiple" placeholder="-Select-" onChange={this.handleChange}>
                                    <Option value="1">Email A</Option>
                                    <Option value="2">Email B</Option>
                                    <Option value="3">Email C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Subject of Email*">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Body of Email*">
                                <Editor />
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

const AddEmailsToSendForm = Form.create({ name: 'register' })(AddEmailsToSendFormWrap);

export default connect()(AddEmailsToSendForm);