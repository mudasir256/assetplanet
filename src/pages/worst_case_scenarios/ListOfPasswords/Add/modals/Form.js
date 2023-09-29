import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    Icon
  } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class AddListOfPasswordsFormWrap extends Component {
    render() {
        const selectBefore = (
            <Select defaultValue="Http://" style={{ width: 90 }}>
              <Option value="Http://">Http://</Option>
              <Option value="Https://">Https://</Option>
            </Select>
        );
         
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Password For">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Password Location">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Type of Password">
                                <Select showSearch placeholder="--Select--">
                                    <Option value="">Digital</Option>
                                    <Option value="">Physical</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Password Hint">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Password Manager URL">
                                <Input addonBefore={selectBefore} />
                            </Form.Item>
                        </Col>
                        <Col span={24} style={{ marginBottom: 16 }}>
                            <a href="/">Click Here</a> To Download Password Worksheet
                        </Col>
                        <Col span={12}>
                            <Form.Item label="File upload">
                                <Button block>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="File upload 2">
                                <Button block>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
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

const AddListOfPasswordsForm = Form.create({ name: 'register' })(AddListOfPasswordsFormWrap);

export default connect()(AddListOfPasswordsForm);