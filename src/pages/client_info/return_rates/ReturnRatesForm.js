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

import { Link } from 'react-router-dom';
import MonteCarloRateSubForm from './MonteCarloRateSubForm';
import MonteCarloRateReport from './MonteCarloRateReport';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

class ReturnRatesFormWrap extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        
        const predictions = [
            'Asset Planet Investment Committee', 'Christopher Antoniou Pissarides', 'William Forsyth Sharpe'
        ]

        const return_cols = [
            {
              title: 'Year',
              dataIndex: 'year',
              key: 'year'
            },
            {
                title: 'Percent ( + or - )',
                dataIndex: 'percent',
                key: 'percent',
                render: (text, record) => (
                    <Input addonAfter="%" value={text}/>
                ),
            }
        ];
          
        const return_rows = [
            {
                key: '1',
                year: '2019',
                percent: -5.00,
            },
            {
                key: '1',
                year: '2020',
                percent: 4.00,
            },
        ];

        return (            
            <Form>
                <div className="info-form-block">
                    <h4 className="title">Static Rate of Return</h4>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Static">
                                <Input addonAfter="%" />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Historical Rate of Return</h4>
                    <Row>
                        <Col span={6}>
                            <Link to="">Click HERE</Link> to view the Historical Chart back to 1968.
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">Professional Prediction Rate of Return</h4>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Static">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                >
                                {
                                    predictions.map((prediction, index) => <Option key={index} value={prediction}>{prediction}</Option>)
                                }
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>
                                User Defined Return
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="info-form-block">
                    <h4 className="title">User Defined Rate of Return</h4>
                    <Row>
                        <Col span={6}>
                            <Form.Item label="How Many Years">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="subform-title">User Defined Return</div>
                            <Table bordered dataSource={return_rows} columns={return_cols} pagination={false}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Checkbox>
                                Monte Carlo Simulation
                                </Checkbox>
                                Monte Carlo simulates chaos and non-linear returns a helpful tool for forecasting various possibilities
                            </Form.Item>
                        </Col>
                    </Row>
                </div>

                <div className="info-form-block">
                    <h4 className="title">Monte Carlo Rate of Return</h4>
                    <Row>
                        <Col>
                            <MonteCarloRateSubForm></MonteCarloRateSubForm>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <MonteCarloRateReport></MonteCarloRateReport>
                        </Col>
                    </Row>
                </div>

            </Form>            
        )
    }
}

const ReturnRatesForm = Form.create({ name: 'register' })(ReturnRatesFormWrap);

export default connect()(ReturnRatesForm);