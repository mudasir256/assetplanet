import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button,
    DatePicker,
  } from 'antd';

const { Option } = Select;
const InputGroup = Input.Group;
const { TextArea } = Input;

class AddPrepaidBurialExpensesFormWrap extends Component {
    render() {         
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item label="Location/Plot">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Items Paid For">
                                <Select showSearch placeholder="Select">
                                    <Option value="">Items Paid A</Option>
                                    <Option value="">Items Paid B</Option>
                                    <Option value="">Items Paid C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Director">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Phone Number">
                                <InputGroup compact>
                                    <Select defaultValue="+1" style={{ width: '20%' }}>
                                        <Option value="+1">+1</Option>
                                        <Option value="+2">+2</Option>
                                    </Select>
                                    <Input style={{ width: '80%' }} />
                                </InputGroup>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="When Paid">
                                <DatePicker block />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="How Much Paid">
                                <Input prefix="$"  />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Notes">
                                <TextArea rows={3} />
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

const AddPrepaidBurialExpensesForm = Form.create({ name: 'register' })(AddPrepaidBurialExpensesFormWrap);

export default connect()(AddPrepaidBurialExpensesForm);