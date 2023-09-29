import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Select, Icon } from 'antd';

import State from '../../../../components/form/State';

const { Option } = Select

const taxFilingElections = [
    "Single", "Head of Household", "Married Filing Jointly", "Married Filing Separately"
]

const deductions = [
    "Itemized", "Standard"
]
const formID = "TaxInformationSubForm";
class TaxInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'State Rate of Return',
            fields: [
                {
                    id: 'stateTaxation',
                    title: 'State Taxation',
                    value: data['stateTaxation']
                },
                {
                    id: 'taxFilingElection',
                    title: 'Tax Filing Election',
                    value: data['taxFilingElection']
                },
                {
                    id: 'deduction',
                    title: 'Deductions',
                    value: data['deduction']
                },
                {
                    id: 'stateTax',
                    title: 'State Tax Effective Rate',
                    value: data['stateTax']
                },
                {
                    id: 'federalTax',
                    title: 'Federal Tax Rate',
                    value: data['federalTax']
                },
                {
                    id: 'totalTax',
                    title: 'Total Tax Rate',
                    value: data['totalTax']
                },
                {
                    id: 'federalCollectibleTax',
                    title: 'Federal Collectible Tax Rate',
                    value: data['federalCollectibleTax']
                },
                {
                    id: 'totalAdjustedIncome',
                    title: 'Total Adjusted Gross Income',
                    value: data['totalAdjustedIncome']
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
                stateTaxation: '',
                taxFilingElection: '',
                deduction: '',
                stateTax: '',
                federalTax: '',
                totalTax: '',
                federalCollectibleTax: '',
                totalAdjustedIncome: '',
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
                if(newFormData.fields[findex]['id'] == 'stateTaxation'){
                    formData['stateTaxation'] = newFormData.fields[findex]['value'];
                }         
                if(newFormData.fields[findex]['id'] == 'taxFilingElection'){
                    formData['taxFilingElection'] = newFormData.fields[findex]['value'];
                } 
                if(newFormData.fields[findex]['id'] == 'deduction'){
                    formData['deduction'] = newFormData.fields[findex]['value'];
                } 
                if(newFormData.fields[findex]['id'] == 'stateTax'){
                    formData['stateTax'] = newFormData.fields[findex]['value'];
                } 
                if(newFormData.fields[findex]['id'] == 'federalTax'){
                    formData['federalTax'] = newFormData.fields[findex]['value'];
                } 
                if(newFormData.fields[findex]['id'] == 'totalTax'){
                    formData['totalTax'] = newFormData.fields[findex]['value'];
                } 
                if(newFormData.fields[findex]['id'] == 'federalCollectibleTax'){
                    formData['federalCollectibleTax'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'totalAdjustedIncome'){
                    formData['totalAdjustedIncome'] = newFormData.fields[findex]['value'];
                }       
            }
    
            let enableNext = false;
            // if(formData['stateTaxation'] != '' && formData['stateTaxation'] != '' && formData['stateTaxation'] != '' && ){
                enableNext = true;
            // }

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

        // if(formData['static'] != ''){
        //     newState['enableNext'] = true;
        // }
        // else{
        //     newState['enableNext'] = false;
        // }
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

        let formData = TaxInformationSubForm.FnCreateFormData({
            stateTaxation: this.state.formData['stateTaxation'],
            taxFilingElection: this.state.formData['taxFilingElection'],
            deduction: this.state.formData['deduction'],
            stateTax: this.state.formData['stateTax'],
            federalTax: this.state.formData['federalTax'],
            totalTax: this.state.formData['totalTax'],
            federalCollectibleTax: this.state.formData['federalCollectibleTax'],
            totalAdjustedIncome: this.state.formData['totalAdjustedIncome'],
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("NewTaxCreditSubForm");
               
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Tax Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center"> 
                        <Col span={16}>
                            <Form.Item label="State Taxation">
                                <State 
                                    value={this.state.formData.stateTaxation}
                                    size={'large'}
                                    onChange={(value) => this.handleSelectChange("stateTaxation", value)}></State
                                >
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Tax Filing Election">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.taxFilingElection}
                                    onChange={(value) => this.handleSelectChange("taxFilingElection", value)}
                                >
                                {
                                    taxFilingElections.map((taxFilingElection, index) => <Option key={index} value={taxFilingElection}>{taxFilingElection}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Deductions">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.deduction}
                                    onChange={(value) => this.handleSelectChange("deduction", value)}
                                >
                                {
                                    deductions.map((deduction, index) => <Option key={index} value={deduction}>{deduction}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center"> 
                        <Col span={16}>
                            <Form.Item label="State Tax Effective Rate">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.stateTax} 
                                    name="stateTax" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Federal Tax Rate">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.federalTax} 
                                    name="federalTax" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Total Tax Rate">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.totalTax} 
                                    name="totalTax" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Federal Collectible Tax Rate">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.federalCollectibleTax} 
                                    name="federalCollectibleTax" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Total Adjusted Gross Income">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.totalAdjustedIncome} 
                                    name="totalAdjustedIncome" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(TaxInformationSubForm);