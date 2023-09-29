import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Button, Row, Col, Input } from 'antd';
import Currency from '../../../../components/form/Currency';

const formID = "ItemsRelatedSubForm";
class ItemsRelatedSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Items Related to Money',
            fields: [
                {
                    id: 'clientMonthlyBenefit',
                    title: 'Client Monthly Benefit at Full Retirement Age',
                    value: data['clientMonthlyBenefit']
                },
                {
                    id: 'costLivingAdjustment',
                    title: 'Cost of Living Adjustment',
                    value: data['costLivingAdjustment']
                },
                {
                    id: 'timeMoneyInterestRate',
                    title: 'Time Value of Money Interest Rate',
                    value: data['timeMoneyInterestRate']
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
                clientMonthlyBenefit: '',
                costLivingAdjustment: '',
                timeMoneyInterestRate: ''
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
                if(newFormData.fields[findex]['id'] == 'clientMonthlyBenefit'){
                    formData['clientMonthlyBenefit'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'costLivingAdjustment'){
                    formData['costLivingAdjustment'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'timeMoneyInterestRate'){
                    formData['timeMoneyInterestRate'] = newFormData.fields[findex]['value'];
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

        let formData = ItemsRelatedSubForm.FnCreateFormData({
            clientMonthlyBenefit: this.state.formData['clientMonthlyBenefit'],
            costLivingAdjustment: this.state.formData['costLivingAdjustment'],
            timeMoneyInterestRate: this.state.formData['timeMoneyInterestRate']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionEligibleSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Items Related to Money</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Monthly Benefit at Full Retirement Age">   
                                <Currency value={this.state.formData.clientMonthlyBenefit} name="clientMonthlyBenefit" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Cost of Living Adjustment*">   
                                <Input addonAfter="%" value={this.state.formData.costLivingAdjustment} name="costLivingAdjustment" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Time Value of Money Interest Rate">   
                                <Input addonAfter="%" value={this.state.formData.timeMoneyInterestRate} name="timeMoneyInterestRate" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(ItemsRelatedSubForm);