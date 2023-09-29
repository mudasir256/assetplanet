import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, InputNumber, Radio } from 'antd';


const formID = "IncomeTaxationSubForm";
class IncomeTaxationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Income Taxation',
            fields: [
                {
                    id: 'federalTaxationType',
                    title: 'Federal Taxation Type',
                    value: data['federalTaxationType']
                },
                {
                    id: 'stateTaxationType',
                    title: 'State Taxation Type',
                    value: data['stateTaxationType']
                },
                {
                    id: 'adjustedGrossIncome',
                    title: 'Adjusted Gross Income (AGI)',
                    value: data['adjustedGrossIncome']
                },
                {
                    id: 'passiveEarned',
                    title: 'Passive or Earned',
                    value: data['passiveEarned']
                },
                {
                    id: 'amountFederalTaxation',
                    title: 'Amount Subject to Federal Taxation',
                    value: data['amountFederalTaxation']
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
                federalTaxationType: '',
                stateTaxationType: '',
                adjustedGrossIncome: '',
                passiveEarned: '',
                amountFederalTaxation: ''
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
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'federalTaxationType'){
                    formData['federalTaxationType'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'stateTaxationType'){
                    formData['stateTaxationType'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'adjustedGrossIncome'){
                    formData['adjustedGrossIncome'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'passiveEarned'){
                    formData['passiveEarned'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'amountFederalTaxation'){
                    formData['amountFederalTaxation'] = newFormData.fields[findex]['value'];
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
        this.handleFormInputChange(name, dateString);
    }


    goNextForm(){
        if(!this.state.enableNext){
            return;
        }

        let formData = IncomeTaxationSubForm.FnCreateFormData({
            federalTaxationType: this.state.formData['federalTaxationType'],
            stateTaxationType: this.state.formData['stateTaxationType'],
            adjustedGrossIncome: this.state.formData['adjustedGrossIncome'],
            passiveEarned: this.state.formData['passiveEarned'],
            amountFederalTaxation: this.state.formData['amountFederalTaxation']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("EndSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("IncomeDetailsSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Income Taxation</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Federal Taxation Type">
                                <Radio.Group name="federalTaxationType" onChange={this.handleInputChange} value={this.state.formData.federalTaxationType}>
                                    <Radio.Button value="Ordinary Income">Ordinary Income</Radio.Button>
                                    <Radio.Button value="Tax Free">Tax Free</Radio.Button>
                                    <Radio.Button value="Qualified Income">Qualified Income</Radio.Button>
                                    <Radio.Button value="Capital Gains">Capital Gains</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="State Taxation Type">
                                <Radio.Group name="stateTaxationType" onChange={this.handleInputChange} value={this.state.formData.stateTaxationType}>
                                    <Radio.Button value="Ordinary Income">Ordinary Income</Radio.Button>
                                    <Radio.Button value="Tax Free">Tax Free</Radio.Button>
                                    <Radio.Button value="Qualified Income">Qualified Income</Radio.Button>
                                    <Radio.Button value="Capital Gains">Capital Gains</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Adjusted Gross Income (AGI)">
                                <Radio.Group name="adjustedGrossIncome" onChange={this.handleInputChange} value={this.state.formData.adjustedGrossIncome}>
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Passive or Earned">
                                <Radio.Group name="passiveEarned" onChange={this.handleInputChange} value={this.state.formData.passiveEarned}>
                                    <Radio.Button value="Passive">Passive</Radio.Button>
                                    <Radio.Button value="Earned">Earned</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Amount Subject to Federal Taxation">
                                <InputNumber
                                    value={this.state.formData.amountFederalTaxation}
                                    size={'large'}
                                    style={{ width: '100%' }}
                                    name="amountFederalTaxation"
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    onChange={(value) => this.handleFormInputChange("amountFederalTaxation", value)}
                                />
                            </Form.Item>
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


export default connect()(IncomeTaxationSubForm);