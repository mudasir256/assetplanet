import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddLitigationListsFormWrap extends Component {
    render() { 
        return (
            <div className="form-wrapper">
                <Form>
                    <Row gutter={24} style={{ marginBottom: 15 }}>
                        <Col span={12}>
                            <Form.Item label="Pending Litigation Nickname">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Potential $ Liability">
                                <Input prefix="$"  />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Litigation Notes">
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

const AddLitigationListsForm = Form.create({ name: 'register' })(AddLitigationListsFormWrap);

export default connect()(AddLitigationListsForm);