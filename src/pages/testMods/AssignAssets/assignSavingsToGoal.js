import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Form, Radio, DatePicker, InputNumber, Icon, Input, Select } from 'antd';

import Currency from '../../../components/form/Currency';
import moment from 'moment';
import { FAMILY_RELATIONSHIPS, FREQUNCIES } from '../../../constants/types';
const { Option } = Select;
const InputGroup = Input.Group;





const dateFormat = 'MM/DD/YYYY';


const formID = 'AssignSavingsToGoal';

class AssignSavingsToGoalSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Assign Savings to Goal',
            fields: [
                {
                    id: 'account_save_to',
                    title: 'Account to Save',
                    value: data['account_save_to'],
                },
                {
                    id: 'amount_needed',
                    title: 'Amount Needed to Save to Achieve 100% Goal Success',
                    value: data['amount_needed']
                },
                {
                    id: 'monthly_savings_to_assign',
                    title: 'Monthly Saving to Assign',
                    value: data['monthly_savings_to_assign']
                },
                {
                    id: 'date_start',
                    title: 'Date to Start Contribution',
                    value: data['date_start']
                }, 
                {
                    id: 'date_end',
                    title: 'Date to End Contribution',
                    value: data['date_end']
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
                account_save_to: '',
                amount_needed: '',
                monthly_savings_to_assign: '',
                date_start: '',
                date_end: ''
               
            },
            
            size: 'large'
        }
        
     //   this.goNextForm = this.goNextForm.bind(this);
     //   this.goPreviousForm = this.goPreviousForm.bind(this);

        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

   //     this.setConditionValue = this.setConditionValue.bind(this);
//
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }


   updateFormData(newFormData){
       let formData = this.state.formData;
       if(newFormData.hasOwnProperty('fields')){
           for(var findex = 0; findex < newFormData.fields.length; findex++){
               if(newFormData.fields[findex]['id'] == 'account_save_to'){
                   formData['account_save_to'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'amount_needed'){
                   formData['amount_needed'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'monthly_savings_to_assign'){
                   formData['monthly_savings_to_assign'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'date_start'){
                   formData['date_start'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'date_end'){
                   formData['date_end'] = newFormData.fields[findex]['value'];
               }
           }

           // formData = this.setConditionValue(formData);
   
           let enableNext = false;
           if(formData['account_save_to'] != '' && formData['amount_needed'] != '' && formData['monthly_savings_to_assign'] != '' && formData['date_start'] != '' && formData['date_end'] != ''){
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

        if(formData['account_save_to'] != '' && formData['amount_needed'] != '' && formData['monthly_savings_to_assign'] != '' && formData['date_start'] != '' && formData['date_end'] != '' ){
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


    goNextForm(){

        let formData = AssignSavingsToGoalSubForm.FnCreateFormData({
            account_save_to: this.state.formData['account_save_to'],
            amount_needed: this.state.formData['amount_needed'],
            monthly_savings_to_assign: this.state.formData['monthly_savings_to_assign'],
            date_start: this.state.formData['date_start'],
            date_end: this.state.formData['date_end']

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm('AAQuestionLoopAdd');
                
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("TuitionCosts");
        //this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Assign Savings to Goal</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                         <Col span={16}>
                            <Form.Item label="Account to Save To">
                                    <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.account_save_to}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("account_save_to", value)}
                                >
                                {
                                    FREQUNCIES.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                }
                                </Select>
                            </Form.Item> 
                        </Col>
            <Col span={16}>
                        <Form.Item label="Amount Needed to Save to Achieve">
                                <Currency 
                                    value={this.state.formData.amount_needed} 
                                    name="amount_needed" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Monthly Savings to Assign">
                                <Currency 
                                    value={this.state.formData.monthly_savings_to_assign} name="monthly_savings_to_assign" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                         <Form.Item label="Date to Start Contribution">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('date_start', date, dateString)}
                                    value={this.state.formData.date_start == '' ? null : moment(this.state.formData.date_start, dateFormat)}
                                />
                            </Form.Item>   
                        </Col>
                        
            <Col span={16} type="flex" justify="center">    
                        <Form.Item label="Date to End Contribution">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('date_end', date, dateString)}
                                    value={this.state.formData.date_end == '' ? null : moment(this.state.formData.date_end, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            
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


export default connect()(AssignSavingsToGoalSubForm);