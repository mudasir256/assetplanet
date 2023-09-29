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
    Radio ,
    Table
  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import DependentsSubForm from './DependentsSubForm';
import TrustSubForm from './TrustSubForm';
import CorporateSubForm from './CorporateSubForm';
import CharitySubForm from './CharitySubForm';
import OtherFinancialSubForm from './OtherFinancialSubForm';
import ProfessionalContactSubForm from './ProfessionalContactSubForm';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class PlanFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
          })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>,
          );

        const plans = [
            3, 4, 5, 6, 7, 8, 9, 10
        ]
        
        return (            
            <Form>
                <Form.Item label="Clients">
                    <Select
                        showSearch
                        placeholder="Frank Jones"
                    >
                        <Option value="Frank Jones">Frank Jones</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Select New Plan Number">
                    <Select
                        showSearch
                        placeholder="-Select-"
                    >
                    {
                        plans.map((plan, index) => (<Option key={index} value={plan}>{plan}</Option>))
                    }
                    </Select>
                </Form.Item>

                <Form.Item label="Pick NickName">
                    <Input />
                </Form.Item>

                <Form.Item label="Further Description of this Plan">
                    <Input />
                </Form.Item>

                <Form.Item label="Do You Want To Replicate Plan">
                    <Radio.Group>
                        <Radio value={"yes"}>Yes</Radio>
                        <Radio value={"no"}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>            
        )
    }
}

const PlanForm = Form.create({ name: 'register' })(PlanFormWrap);

export default connect()(PlanForm);