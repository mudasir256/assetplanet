import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse } from 'antd';
import Currency from '../../../../components/form/Currency';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';

import { FREQUNCIES, ASSETS } from 'constants/types';

const { Option } = Select;
const { Panel } = Collapse;
const dateFormat = 'MM/DD/YYYY';

const owners = [
    'Frank Jones', 'Tracy Jones', 'Joint'
]

const formID = "IncomeDetailsSubForm";
class IncomeDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Income Details',
            fields: [
                {
                    id: 'nicknameIncome',
                    title: 'Nickname Income',
                    value: data['nicknameIncome']
                },
                {
                    id: 'owner',
                    title: 'Owner',
                    value: data['owner']
                },
                {
                    id: 'frequencyPayPeriod',
                    title: 'Frequency of Pay Periods',
                    value: data['frequencyPayPeriod']
                },
                {
                    id: 'grossWages',
                    title: 'Gross Income Amount',
                    value: data['grossWages']
                },
                {
                    id: 'dateIncomeStarts',
                    title: 'Date Income Starts',
                    value: data['dateIncomeStarts']
                },
                {
                    id: 'dateIncomeEnds',
                    title: 'Date Income Ends',
                    value: data['dateIncomeEnds']
                },
                {
                    id: 'yearlyIncrease',
                    title: '% Yearly Increase',
                    value: data['yearlyIncrease']
                },
                {
                    id: 'hasIncomeSourceFromAssets',
                    title: 'Has Income Source From Asset',
                    value: data['hasIncomeSourceFromAssets']
                },
                {
                    id: 'incomeSourceFromAssets',
                    title: 'Income Source From Asset',
                    value: data['incomeSourceFromAssets']
                },
                {
                    id: 'notes',
                    title: 'Notes',
                    value: data['notes']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                nicknameIncome: '',
                owner: '',
                frequencyPayPeriod: '',
                grossWages: '',
                dateIncomeStarts: '',
                dateIncomeEnds: '',
                yearlyIncrease: '',
                hasIncomeSourceFromAssets: '',
                incomeSourceFromAssets: '',
                notes: '',
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        console.log('updateFormdata');
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){ 
                if(newFormData.fields[findex]['id'] == 'nicknameIncome'){
                    formData['nicknameIncome'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'owner'){
                    formData['owner'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'frequencyPayPeriod'){
                    formData['frequencyPayPeriod'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'grossWages'){
                    formData['grossWages'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'dateIncomeStarts'){
                    formData['dateIncomeStarts'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'dateIncomeEnds'){
                    formData['dateIncomeEnds'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'yearlyIncrease'){
                    formData['yearlyIncrease'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'hasIncomeSourceFromAssets'){
                    formData['hasIncomeSourceFromAssets'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'incomeSourceFromAssets'){
                    formData['incomeSourceFromAssets'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'notes'){
                    formData['notes'] = newFormData.fields[findex]['value'];
                } 
            }
    
            let enableNext = false;
            // if(formData['insuranceProduct'] != ''){
            //     enableNext = true;
            // }

            enableNext = true;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['insuranceProduct'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        newState['enableNext'] = true;

        this.setState(newState);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString){
        //this.handleFormInputChange(name, moment(date).format(dateFormat));
        this.handleFormInputChange(name, dateString);
    }


    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        let formData = IncomeDetailsSubForm.FnCreateFormData({
            nicknameIncome: this.state.formData['nicknameIncome'],
            owner: this.state.formData['owner'],
            frequencyPayPeriod: this.state.formData['frequencyPayPeriod'],
            grossWages: this.state.formData['grossWages'],
            dateIncomeStarts: this.state.formData['dateIncomeStarts'],
            dateIncomeEnds: this.state.formData['dateIncomeEnds'],
            yearlyIncrease: this.state.formData['yearlyIncrease'],
            hasIncomeSourceFromAssets: this.state.formData['hasIncomeSourceFromAssets'],
            incomeSourceFromAssets: this.state.formData['incomeSourceFromAssets'],
            notes: this.state.formData['notes']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        var incomeTypeField = this.props.cbGetSubFormField('IncomeTypeSubForm', 'incomeType');

        if(incomeTypeField != null){
            switch(incomeTypeField.value){
                case "Military Benefits":
                    this.props.cbGoSubForm("MilitaryBenefitsSubForm");    
                    break;
                case "Pension":
                    this.props.cbGoSubForm("PensionDetailsSubForm");    
                    break;
                case "Annuity":
                    this.props.cbGoSubForm("AnnuityDetailsSubForm");    
                    break;
                case "Other":
                    this.props.cbGoSubForm("OtherIncomeDetailsSubForm");    
                    break;
                case "Bonus from Work":
                case "Earned Income From Work":
                case "Sales Commision from Work":
                    this.props.cbGoSubForm("QuestionIncomeTypeSubForm");    
                    break;
                default:
                    this.props.cbGoSubForm("IncomeTaxationSubForm");    
                    break;
    
            }
        }
    }

    goPreviousForm(){
        this.props.cbGoSubForm("IncomeTypeSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Income Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Nickname Income">
                                <Input value={this.state.formData.nicknameIncome} name="nicknameIncome" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Owner">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.owner}
                                    onChange={(value) => this.handleSelectChange("owner", value)}
                                    size={'large'}
                                >
                                {
                                    owners.map((owner, index) => <Option key={index} value={owner}>{owner}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Gross Wages">
                                <Currency value={this.state.formData.grossWages} name="grossWages" onChange={(value) => this.handleFormInputChange("grossWages", value)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Frequency of Pay Periods">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.frequencyPayPeriod}
                                    size={'large'}
                                    onChange={(value) => this.handleSelectChange("frequencyPayPeriod", value)}
                                >
                                {
                                    FREQUNCIES.map((frequencyPayPeriod, index) => <Option key={index} value={frequencyPayPeriod}>{frequencyPayPeriod}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date Income Starts">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateIncomeStarts', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.dateIncomeStarts == null || this.state.formData.dateIncomeStarts == '' ? null : moment(this.state.formData.dateIncomeStarts, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date Income Ends">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateIncomeEnds', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.dateIncomeEnds == null || this.state.formData.dateIncomeEnds == '' ? null : moment(this.state.formData.dateIncomeEnds, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Collapse accordion>
                                <Panel header="Advanced Details" key="1">
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="% Yearly Increase">
                                                <Input addonAfter="%" value={this.state.formData.yearlyIncrease} name="yearlyIncrease" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Income Source From Asset">
                                                <Radio.Group name="hasIncomeSourceFromAssets" size={'large'} onChange={this.handleInputChange} value={this.state.formData.hasIncomeSourceFromAssets}>
                                                    <Radio value="Yes">Yes</Radio>
                                                    <Radio value="No">No</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {
                                        this.state.formData.hasIncomeSourceFromAssets == 'Yes' && 
                                        <Row gutter={16}>
                                            <Col>
                                                <Form.Item label="">
                                                    <Select
                                                        showSearch
                                                        placeholder="-Select-"
                                                        value={this.state.formData.incomeSourceFromAssets}
                                                        size={'large'}
                                                        onChange={(value) => this.handleSelectChange("incomeSourceFromAssets", value)}
                                                    >
                                                    {
                                                        ASSETS.map((asset, index) => <Option key={index} value={asset}>{asset}</Option>)
                                                    }
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    }                                    
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Notes">
                                                <TextArea value={this.state.formData.notes} name="notes" onChange={(event) => this.handleInputChange(event)}></TextArea>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>                        
                            </Collapse>
                        </Col>
                    </Row>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(IncomeDetailsSubForm);