import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col, Input, Select, Form, Collapse, DatePicker, Icon } from 'antd';
import Currency from '../../../../components/form/Currency';
import Percent from '../../../../components/form/PercentV2';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const { Panel } = Collapse;
const associatedAssetes = [
]
const formID = 'LoanInformationSubForm';
class LoanInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Loan Information',
            fields: [
                {
                    id: 'initialAmount',
                    title: 'Initial Loan Amount',
                    value: data['initialAmount'],
                    type: 'currency'
                },
                {
                    id: 'maturityDate',
                    title: 'Maturity Date',
                    value: data['maturityDate']
                },
                {
                    id: 'startDate',
                    title: 'Start Date',
                    value: data['startDate']
                },
                {
                    id: 'interestRate',
                    title: 'Interest Rate',
                    value: data['interestRate'],
                    type: 'percent'
                },
                {
                    id: 'monthlyPayment',
                    title: 'Monthly Payment',
                    value: data['monthlyPayment'],
                    type: 'currency'
                },
                {
                    id: 'accountDigits',
                    title: 'Account Number',
                    value: data['accountDigits']
                },
                {
                    id: 'financialName',
                    title: 'Name of Financial Institution',
                    value: data['financialName']
                },
                {
                    id: 'associatedAsset',
                    title: 'Associated Asset',
                    value: data['associatedAsset']
                }
            ]
        }

        return formData;
    }
    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                initialAmount: '',
                maturityDate: '',
                startDate: '',
                interestRate: '',
                monthlyPayment: '',
                accountDigits: '',
                financialName: '',
                associatedAsset: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
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
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'initialAmount'){
                    formData['initialAmount'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'maturityDate'){
                    formData['maturityDate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'startDate'){
                    formData['startDate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'interestRate'){
                    formData['interestRate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'monthlyPayment'){
                    formData['monthlyPayment'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'accountDigits'){
                    formData['accountDigits'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'financialName'){
                    formData['financialName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'associatedAsset'){
                    formData['associatedAsset'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['maturityDate'] != ''){
                enableNext = true;
            }

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

        if(formData['maturityDate'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

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
        this.handleFormInputChange(name, dateString);
    }

    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let formData = LoanInformationSubForm.FnCreateFormData({
            initialAmount: this.state.formData['initialAmount'],
            maturityDate: this.state.formData['maturityDate'],
            startDate: this.state.formData['startDate'],
            interestRate: this.state.formData['interestRate'],
            monthlyPayment: this.state.formData['monthlyPayment'],
            accountDigits: this.state.formData['accountDigits'],
            financialName: this.state.formData['financialName'],
            associatedAsset: this.state.formData['associatedAsset']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("LoanPaybackSubForm");
            this.props.cbGoNext(formID);
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("MainSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Loan Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Initial Loan Amount">
                                <Currency 
                                    value={this.state.formData.initialAmount} 
                                    name="initialAmount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Start Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('startDate', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.startDate == null || this.state.formData.startDate == '' ? null : moment(this.state.formData.startDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Maturity Date">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('maturityDate', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.maturityDate == null || this.state.formData.maturityDate == '' ? null : moment(this.state.formData.maturityDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Interest Rate">
                                <Percent value={this.state.formData.interestRate} name="interestRate" onChange={(value) => this.handleFormInputChange("interestRate", value)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly Payment">
                                <Currency 
                                    value={this.state.formData.monthlyPayment} 
                                    name="monthlyPayment" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Collapse accordion>
                                <Panel header="Additional Loan Information" key="1">
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Account Number">
                                                <Input value={this.state.formData.accountDigits} name="accountDigits" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Name of Financial Institution">
                                                <Input value={this.state.formData.financialName} name="financialName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Associated Asset">
                                                <Select
                                                    showSearch
                                                    placeholder="-Select-"
                                                    value={this.state.formData.associatedAsset}
                                                    onChange={(value) => this.handleSelectChange("associatedAsset", value)}
                                                    size={'large'}
                                                >
                                                {
                                                    associatedAssetes.map((associatedAsset, index) => <Option key={index} value={associatedAsset}>{associatedAsset}</Option>)
                                                }
                                                </Select>
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
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
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

export default connect()(LoanInformationSubForm);