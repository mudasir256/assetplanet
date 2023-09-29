import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import {
    Form,
    Row,
    Col,
    Button,
    Typography,
    Icon
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const { Text } = Typography;

class AddImportantDocumentFormWrap extends Component {
    render() { 
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24} style={{ marginBottom: 15 }}>
                        <Col span={24}>
                            <Row gutter={24}>
                                <Col span={24} style={{ marginBottom: 15 }}>
                                    <Text>Instructions not indicated in Trust or any other document where Planner can provide more clarity on next steps.</Text>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Personal Instructions">
                                        <Editor />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="File upload">
                                        <Button block>
                                            <Icon type="upload" /> Click to Upload
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
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