import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Form, Radio, DatePicker, InputNumber, Icon, Input, Select } from 'antd';
import Percent from '../../../components/form/PercentV2';
import Currency from '../../../components/form/Currency';
import moment from 'moment';
import { FAMILY_RELATIONSHIPS, FREQUNCIES } from '../../../constants/types';
const { Option } = Select;
const InputGroup = Input.Group;





const dateFormat = 'MM/DD/YYYY';


const formID = 'ParentPlusLoanDetails';

class ParentPlusLoanSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Parent PLUS Loan Details',
            fields: [
                {
                    id: 'pp_initial_amount',
                    title: 'Initial Loan Amount',
                    value: data['pp_initial_amount'],
                },
                {
                    id: 'pp_start_date',
                    title: 'Start Date',
                    value: data['pp_start_date']
                },
                {
                    id: 'pp_monthly_payment',
                    title: 'Monthly Payment',
                    value: data['pp_monthly_payment']
                },
                {
                    id: 'pp_organization_fee',
                    title: 'Organization Fee',
                    value: data['pp_organization_fee']
                }, 
                {
                    id: 'pp_apr',
                    title: 'Interest Rate (APR)',
                    value: data['pp_apr']
                },
                {
                    id: 'pp_inst_name',
                    title: 'Name of Financial Institution',
                    value: data['pp_inst_name']
                },
                {
                    id: 'pp_account_numb',
                    title: 'Account Number',
                    value: data['pp_account_numb']
                },
                {
                    id: 'pp_number_years',
                    title: 'First Payment Due',
                    value: data['pp_number_years']
                }, 
                {
                    id: 'pp_deferring',
                    title: 'Deferring Payments until Graduation?',
                    value: data['pp_deferring']
                },
                {
                    id: 'pp_interest_only',
                    title: 'Interest Only until Graduation?',
                    value: data['pp_interest_only']
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
                pp_initial_amount: '',
                pp_start_date: '',
                pp_monthly_payment: '',
                pp_organization_fee: '',
                pp_apr: '',
                pp_inst_name:'',
                pp_account_numb:'',
                pp_number_years:'',
                pp_deferring:'',
                pp_interest_only:''
               
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
               if(newFormData.fields[findex]['id'] == 'pp_initial_amount'){
                   formData['pp_initial_amount'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_start_date'){
                   formData['pp_start_date'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_monthly_payment'){
                   formData['pp_monthly_payment'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_organization_fee'){
                   formData['pp_organization_fee'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_apr'){
                   formData['pp_apr'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_inst_name'){
                   formData['pp_inst_name'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_account_numb'){
                formData['pp_account_numb'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_number_years'){
                formData['pp_number_years'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_deferring'){
                formData['pp_deferring'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'pp_interest_only'){
                formData['pp_interest_only'] = newFormData.fields[findex]['value'];
               }
           }

           // formData = this.setConditionValue(formData);
   
           let enableNext = false;
           if(formData['basisCost'] != '' && formData['costBasisDate'] != '' && formData['taxability'] != '' && formData['assetLiquid'] != '' && formData['partialSaleAbility'] != '' && formData['distributionTaxability'] != ''){
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

        if(formData['pp_initial_amount'] != '' && formData['pp_start_date'] != '' && formData['pp_monthly_payment'] != '' && formData['pp_organization_fee'] != '' && formData['pp_apr'] != '' && formData['pp_inst_name'] != '' && formData['pp_account_numb'] != '' && formData['pp_number_years'] != '' && formData['pp_deferring'] != '' && formData['pp_interest_only'] != '' ){
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

        let formData = ParentPlusLoanSubForm.FnCreateFormData({
            pp_initial_amount: this.state.formData['pp_initial_amount'],
            pp_start_date: this.state.formData['pp_start_date'],
            pp_monthly_payment: this.state.formData['pp_monthly_payment'],
            pp_organization_fee: this.state.formData['pp_organization_fee'],
            pp_apr: this.state.formData['pp_apr'],
            pp_inst_name: this.state.formData['pp_inst_name'],
            pp_account_numb: this.state.formData['pp_account_numb'],
            pp_number_years: this.state.formData['pp_number_years'],
            pp_deferring: this.state.formData['pp_deferring'],
            pp_interest_only: this.state.formData['pp_interest_only'],

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm("PLHQuestionLoopAdd");        
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("Loan_details");
        //this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Parent PLUS Loan</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                         <Col span={16}>
                            <Form.Item label="Initial Loan Amount">
                                <Currency 
                                    value={this.state.formData.pp_initial_amount} 
                                    name="pp_initial_amount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
            <Col span={16}>
                           <Form.Item label="Start Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('pp_start_date', date, dateString)}
                                    value={this.state.formData.pp_start_date == '' ? null : moment(this.state.formData.pp_start_date, dateFormat)}
                                />
                            </Form.Item> 
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Monthly Payment">
                                <Currency 
                                    value={this.state.formData.pp_monthly_payment} 
                                    name="pp_monthly_payment" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="Origination Fee">
                                <Currency 
                                    value={this.state.formData.pp_organization_fee} 
                                    name="pp_organization_fee" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item> 
                        </Col>
                        
            <Col span={16} type="flex" justify="center">    
                            <Form.Item label="Interest Rate (APR)">
                                <Percent value={this.state.formData.pp_apr} name="pp_apr" onChange={(value) => this.handleFormInputChange("pp_apr", value)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Name of Financial Institution">
                                <Input size={size} value={this.state.formData.pp_inst_name} name="pp_inst_name" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                
                <Col span={16}>
                            <Form.Item label="Account Number">
                                <Input size={size} value={this.state.formData.pp_account_numb} name="pp_account_numb" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>


                <Col span={16}>
                            <Form.Item label="Number of Years for Repayment Plan">
                                <Input size={size} value={this.state.formData.pp_number_years} name="pp_number_years" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>

                <Col span={16}>
                           <Form.Item label="Deferring Payments until Graduation">
                                <Radio.Group name="pp_deferring" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.pp_deferring}>
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                <Col span={16}>
                           <Form.Item label="Interest only until Graduation">
                                <Radio.Group name="pp_interest_only" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.pp_interest_only}>
                                    <Radio.Button value="Yes">Yes</Radio.Button>
                                    <Radio.Button value="No">No</Radio.Button>
                                </Radio.Group>
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


export default connect()(ParentPlusLoanSubForm);