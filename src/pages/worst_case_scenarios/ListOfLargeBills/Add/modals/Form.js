import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker
  } from 'antd';

const { Option } = Select;

class AddListOfLargeBillsFormWrap extends Component {
    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Large Bill">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Dollar Amount">
                                <Select showSearch placeholder="-Select-">
                                    <Option value="">Occurrence A</Option>
                                    <Option value="">Occurrence B</Option>
                                    <Option value="">Occurrence C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="When Due">
                                <DatePicker style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Occurrence">
                                <Select showSearch placeholder="-Select-">
                                    <Option value="">Occurrence A</Option>
                                    <Option value="">Occurrence B</Option>
                                    <Option value="">Occurrence C</Option>
                                </Select>
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

const AddListOfLargeBillsForm = Form.create({ name: 'register' })(AddListOfLargeBillsFormWrap);

export default connect()(AddListOfLargeBillsForm);