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

class AddImportantDocumentFormWrap extends Component {
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
                            <Form.Item label="Document Name">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Document Type">
                                <Select showSearch placeholder="--Select--">
                                    <Option value="">Document Type A</Option>
                                    <Option value="">Document Type B</Option>
                                    <Option value="">Document Type C</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Get Death Certificate URL">
                                <Input addonBefore={selectBefore} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Approx. Number of Death Certs Needed">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="File upload">
                                <Button block>
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item label="Notes">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={9}>
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

const AddImportantDocumentForm = Form.create({ name: 'register' })(AddImportantDocumentFormWrap);

export default connect()(AddImportantDocumentForm);