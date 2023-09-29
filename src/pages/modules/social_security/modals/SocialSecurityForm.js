import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Form,
    Input,
  } from 'antd';

class SocialSecurityFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        
        return (            
            <Form>
                <Form.Item label="FRA Type">
                    <Input />
                </Form.Item>
                <Form.Item label="Enter First Age">
                    <Input />
                </Form.Item>
                <Form.Item label="Enter First Month">
                    <Input />
                </Form.Item>
            </Form>            
        )
    }
}

const SocialSecurityForm = Form.create({ name: 'register' })(SocialSecurityFormWrap);

export default connect()(SocialSecurityForm);