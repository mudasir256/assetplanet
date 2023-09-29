import React, { Component } from 'react';
import { connect } from 'react-redux';
/**
 * Antd Components
 */
import {
    Form,
    Row,
    Col,
    Button,
    DatePicker ,
    Radio ,
  } from 'antd';

class AddCheckListFormWrap extends Component {

    render() {
        return (
            <div className="form-wrapper">
                <Form>
                    <div className="info-form-block" style={{ marginBottom: 0 }}>
                        <Row gutter={[24,16]}>
                            <Col span={16}>
                                <Form.Item label="Video Message">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Checklist">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Contact List">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Emails to Send">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Important Documents">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Personal Instructions">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="List of Large Bills">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Litigation List">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Location of Personal Items">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="List of Passwords">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Prepaid Burial Expenses">
                                    <Radio.Group value={1}>
                                        <Radio value={1}>
                                            Not Started
                                        </Radio>
                                        <Radio value={2}>
                                            Incomplete
                                        </Radio>
                                        <Radio value={3}>
                                            Complete
                                        </Radio>
                                        <Radio value={4}>
                                            Not Applicable
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Date">
                                    <DatePicker style={{ width: '100%' }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
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

const AddCheckListForm = Form.create({ name: 'add_check_list' })(AddCheckListFormWrap);

export default connect()(AddCheckListForm);