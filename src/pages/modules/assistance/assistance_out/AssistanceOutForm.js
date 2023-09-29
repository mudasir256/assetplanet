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
    Switch
  } from 'antd';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class AssistanceOutFormWrap extends Component {

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
                                <Option value="Uncle">Uncle</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Person Providing Assistance">
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="John Smith">John  Smith</Option>
                                <Option value="Jane Smith">Jane Smith</Option>
                                <Option value="Joint">Joint</Option>
                                <Option value="Mark Smith">Mark Smith</Option>
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
                    <Col span={12}>
                        <Form.Item label="Add to Monthly Budget">
                            <Switch defaultChecked/>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item label="Annual Gifting Amount">   
                            <Input addonBefore="$"  defaultValue="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Budget Item">   
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                            >
                                <Option value="Alimony">Alimony</Option>
                                <Option value="Camp">Camp</Option>
                                <Option value="Child Support">Child Support</Option>
                                <Option value="Clothing">Clothing</Option>
                                <Option value="Family Support (other than child)">Family Support (other than child)</Option>
                                <Option value="Hobbies &amp; Activities">Hobbies &amp; Activities</Option>
                                <Option value="Kid Sitting">Kid Sitting</Option>
                                <Option value="Misc.">Misc.</Option>
                                <Option value="Nanny">Nanny</Option>
                                <Option value="Room, Board, Monthly Expense">Room, Board, Monthly Expense</Option>
                                <Option value="School Tuition">School Tuition</Option>
                                <Option value="Tutor">Tutor</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>            
        )
    }
}

const AssistanceOutForm = Form.create({ name: 'register' })(AssistanceOutFormWrap);

export default connect()(AssistanceOutForm);