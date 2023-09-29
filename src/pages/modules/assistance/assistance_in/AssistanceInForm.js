import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    DatePicker ,
    Switch,
    Radio
  } from 'antd';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class AssistanceInFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (            
            <Form>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Recipient">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('first_name', {
                                        rules: [
                                            {
                                                type: 'text',
                                                message: 'First Name',
                                            },
                                            { required: true, message: 'Please input the captcha you got!' }
                                        ],
                                    })(<Input placeholder="First Name"/>)}
                                </Col>
                                <Col span={12}>
                                    {getFieldDecorator('First Name', {
                                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                    })(<Input placeholder="Last Name"/>)}
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Person Providing Assistance">
                            <Row gutter={8}>
                                <Col span={12}>
                                    {getFieldDecorator('first_name', {
                                        rules: [
                                            {
                                                type: 'text',
                                                message: 'First Name',
                                            },
                                            { required: true, message: 'Please input the captcha you got!' }
                                        ],
                                    })(<Input placeholder="First Name"/>)}
                                </Col>
                                <Col span={12}>
                                    {getFieldDecorator('First Name', {
                                        rules: [{ required: true, message: 'Please input the captcha you got!' }],
                                    })(<Input placeholder="Last Name"/>)}
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Relationship">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="Aunt">Aunt</Option>
                                <Option value="Charity">Charity</Option>
                                <Option value="Child">Child</Option>
                                <Option value="Cousin">Cousin</Option>
                                <Option value="Friend">Friend</Option>
                                <Option value="Grandchild">Grandchild</Option>
                                <Option value="Grandparent">Grandparent</Option>
                                <Option value="In-Law">In-Law</Option>
                                <Option value="Nephew">Nephew</Option>
                                <Option value="Niece">Niece</Option>
                                <Option value="Other">Other</Option>
                                <Option value="Parent">Parent</Option>
                                <Option value="Sibling">Sibling</Option>
                                <Option value="Step-Grandparent">Step-Grandparent</Option>
                                <Option value="Step-Parent">Step-Parent</Option>
                                <Option value="Step-Sibling">Step-Sibling</Option>
                                <Option value="Uncle">Ule</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Amount Received">   
                            <Input addonBefore="$"  defaultValue="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Frequency">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="Monthly">Monthly</Option>
                                <Option value="Quarterly">Quarterly</Option>
                                <Option value="Annually">Annually</Option>
                                <Option value="One-Time">One-Time</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Goal Being Funded">   
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Estimated Start and End Date">                                    
                            <RangePicker
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Annual Gifting Amount">   
                            <Radio.Group>
                                <Radio value="a">At Retirement</Radio>
                                <Radio value="b">At Spouse Retirement</Radio>
                                <Radio value="c">At Death</Radio>
                                <Radio value="d">Another Date</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Total Amount Received">   
                            <Input addonBefore="$"  defaultValue="" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>            
        )
    }
}

const AssistanceInForm = Form.create({ name: 'register' })(AssistanceInFormWrap);

export default connect()(AssistanceInForm);