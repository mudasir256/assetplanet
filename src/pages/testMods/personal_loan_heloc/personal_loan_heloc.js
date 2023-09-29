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


const formID = 'PersonalLoanHelocDetails';

class PersonalLoanHelocSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Student Loan Details',
            fields: [
                {
                    id: 'plh_initial_amount',
                    title: 'Initial Loan Amount',
                    value: data['plh_initial_amount'],
                },
                {
                    id: 'plh_start_date',
                    title: 'Amount',
                    value: data['plh_start_date']
                },
                {
                    id: 'plh_maturity',
                    title: 'Maturity Date',
                    value: data['plh_maturity']
                },
                {
                    id: 'plh_apr',
                    title: 'Interest Rate (APR)',
                    value: data['plh_apr']
                }, 
                {
                    id: 'plh_monthly_payment',
                    title: 'Monthly Payment',
                    value: data['plh_monthly_payment']
                },
                {
                    id: 'plh_inst_name',
                    title: 'Nickname Private Loan',
                    value: data['plh_inst_name']
                },
                {
                    id: 'plh_account_numb',
                    title: 'Account Number',
                    value: data['plh_account_numb']
                },
                {
                    id: 'plh_loan_length',
                    title: 'First Payment Due',
                    value: data['plh_loan_length']
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
                plh_initial_amount: '',
                plh_start_date: '',
                plh_maturity: '',
                plh_apr: '',
                plh_monthly_payment: '',
                plh_inst_name:'',
                plh_account_numb:'',
                plh_loan_length:''
               
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
               if(newFormData.fields[findex]['id'] == 'plh_initial_amount'){
                   formData['plh_initial_amount'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_start_date'){
                   formData['plh_start_date'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_maturity'){
                   formData['plh_maturity'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_apr'){
                   formData['plh_apr'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_monthly_payment'){
                   formData['plh_monthly_payment'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_inst_name'){
                   formData['plh_inst_name'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_account_numb'){
                formData['plh_account_numb'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'plh_loan_length'){
                formData['plh_loan_length'] = newFormData.fields[findex]['value'];
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

        if(formData['plh_initial_amount'] != '' && formData['plh_start_date'] != '' && formData['plh_maturity'] != '' && formData['plh_apr'] != '' && formData['plh_monthly_payment'] != '' && formData['plh_inst_name'] != '' && formData['plh_account_numb'] != '' && formData['plh_loan_length'] != ''){
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
        
        let formData = PersonalLoanHelocSubForm.FnCreateFormData({
            plh_initial_amount: this.state.formData['plh_initial_amount'],
            plh_start_date: this.state.formData['plh_start_date'],
            plh_maturity: this.state.formData['plh_maturity'],
            plh_apr: this.state.formData['plh_apr'],
            plh_monthly_payment: this.state.formData['plh_monthly_payment'],
            plh_inst_name: this.state.formData['plh_inst_name'],
            plh_account_numb: this.state.formData['plh_account_numb'],
            plh_loan_length: this.state.formData['plh_loan_length'],


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
                            <h2 className="text-center font-weight-bold mb-4">Personal Loan \ HELOC</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                         <Col span={16}>
                            <Form.Item label="Initial Loan Amount">
                                <Currency 
                                    value={this.state.formData.plh_initial_amount} 
                                    name="plh_initial_amount" 
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
                                    onChange={(date, dateString) => this.handleDatePickerChange('plh_start_date', date, dateString)}
                                    value={this.state.formData.plh_start_date == '' ? null : moment(this.state.formData.plh_start_date, dateFormat)}
                                />
                            </Form.Item>  
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Maturity Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('plh_maturity', date, dateString)}
                                    value={this.state.formData.plh_maturity == '' ? null : moment(this.state.formData.plh_maturity, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Interest Rate (APR)">
                                <Percent value={this.state.formData.plh_apr} name="plh_apr" onChange={(value) => this.handleFormInputChange("plh_apr", value)}/>
                            </Form.Item>
                        </Col>
                        
            <Col span={16} type="flex" justify="center">    
                           <Form.Item label="Monthly Payment">
                                <Currency 
                                    value={this.state.formData.plh_monthly_payment} 
                                    name="plh_monthly_payment" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item> 
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="Name of Financial Institution">
                                <Input size={size} value={this.state.formData.plh_inst_name} name="plh_inst_name" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                
                <Col span={16}>
                            <Form.Item label="Account Number">
                                <Input size={size} value={this.state.formData.plh_account_numb} name="plh_account_numb" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                <Col span={16}>
                            <Form.Item label="Length of Loan (# of years remaining)">
                                <Input size={size} value={this.state.formData.plh_loan_length} name="plh_loan_length" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(PersonalLoanHelocSubForm);