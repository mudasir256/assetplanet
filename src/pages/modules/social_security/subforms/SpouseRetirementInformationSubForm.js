import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Icon } from 'antd';
import Currency from '../../../../components/form/Currency';


const formID = "SpouseRetirementInformationSubForm";
class SpouseRetirementInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Spouse Retirement Information',
            fields: [
                {
                    id: 'spouseEstimatedYearRetirement',
                    title: 'Spouse Estimated Year of Retirement',
                    value: data['spouseEstimatedYearRetirement']
                },
                {
                    id: 'spouseMonthlyBenefit',
                    title: 'Spouse Monthly Benefit at Full Retirement Age',
                    value: data['spouseMonthlyBenefit']
                },
                {
                    id: 'spouseTimeValue',
                    title: 'Spouse Time Value of Money Interest Rate',
                    value: data['spouseTimeValue']
                },
                {
                    id: 'spouseCost',
                    title: 'Spouse Cost of Living Adjustment',
                    value: data['spouseCost']
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
                spouseEstimatedYearRetirement: '',
                spouseMonthlyBenefit: '',
                spouseTimeValue: '',
                spouseCost: ''
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
                if(newFormData.fields[findex]['id'] == 'spouseEstimatedYearRetirement'){
                    formData['spouseEstimatedYearRetirement'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'spouseMonthlyBenefit'){
                    formData['spouseMonthlyBenefit'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'spouseTimeValue'){
                    formData['spouseTimeValue'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'spouseCost'){
                    formData['spouseCost'] = newFormData.fields[findex]['value'];
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

        let formData = SpouseRetirementInformationSubForm.FnCreateFormData({
            spouseEstimatedYearRetirement: this.state.formData['spouseEstimatedYearRetirement'],
            spouseMonthlyBenefit: this.state.formData['spouseMonthlyBenefit'],
            spouseTimeValue: this.state.formData['spouseTimeValue'],
            spouseCost: this.state.formData['spouseCost']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("SpouseRetirementCalculatorSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Spouse Retirement Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse Estimated Year of Retirement">   
                                <Input value={this.state.formData.spouseEstimatedYearRetirement} name="spouseEstimatedYearRetirement" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse Monthly Benefit at Full Retirement Age">   
                                <Currency value={this.state.formData.spouseMonthlyBenefit} name="spouseMonthlyBenefit" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse Time Value of Money Interest Rate">   
                                <Input addonAfter="%" value={this.state.formData.spouseTimeValue} name="spouseTimeValue" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse Cost of Living Adjustment">   
                                <Input addonAfter="%" value={this.state.formData.spouseCost} name="spouseCost" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(SpouseRetirementInformationSubForm);