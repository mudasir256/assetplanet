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


const formID = 'StudentLoanDetails';

class StudentLoanDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Student Loan Details',
            fields: [
                {
                    id: 'loan_nickname',
                    title: 'Nickname of Loan',
                    value: data['loan_nickname'],
                },
                {
                    id: 'loan_amount',
                    title: 'Amount',
                    value: data['loan_amount']
                },
                {
                    id: 'loan_apr',
                    title: 'APR',
                    value: data['loan_apr']
                },
                {
                    id: 'loan_type',
                    title: 'What type of loan is this?',
                    value: data['loan_type']
                }, 
                {
                    id: 'loan_federal',
                    title: 'Federal Loans',
                    value: data['loan_federal']
                },
                {
                    id: 'loan_private_nickname',
                    title: 'Nickname Private Loan',
                    value: data['loan_private_nickname']
                },
                {
                    id: 'loan_cosigner',
                    title: 'Cosigner',
                    value: data['loan_cosigner']
                },
                {
                    id: 'loan_first_due',
                    title: 'First Payment Due',
                    value: data['loan_first_due']
                }, 
                {
                    id: 'loan_payment_amount',
                    title: 'Amount of Payment',
                    value: data['loan_payment_amount']
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
                loan_nickname: '',
                loan_amount: '',
                loan_apr: '',
                loan_type: '',
                loan_federal: '',
                loan_private_nickname:'',
                loan_cosigner:'',
                loan_first_due:'',
                loan_payment_amount:''
               
            },
            
            size: 'large'
        }
        
     //   this.goNextForm = this.goNextForm.bind(this);
     //   this.goPreviousForm = this.goPreviousForm.bind(this);

     //   this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

   //     this.setConditionValue = this.setConditionValue.bind(this);
//
    }

    componentDidMount() {
       // this.updateFormData(this.props.subFormData);
    }


//    updateFormData(newFormData){
//        let formData = this.state.formData;
//        if(newFormData.hasOwnProperty('fields')){
//            for(var findex = 0; findex < newFormData.fields.length; findex++){
//                if(newFormData.fields[findex]['id'] == 'basisCost'){
//                    formData['basisCost'] = newFormData.fields[findex]['value'];
//                }
//                if(newFormData.fields[findex]['id'] == 'costBasisDate'){
//                    formData['costBasisDate'] = newFormData.fields[findex]['value'];
//                }
//                if(newFormData.fields[findex]['id'] == 'taxability'){
//                    formData['taxability'] = newFormData.fields[findex]['value'];
//                }
//                if(newFormData.fields[findex]['id'] == 'assetLiquid'){
//                    formData['assetLiquid'] = newFormData.fields[findex]['value'];
//                }
//                if(newFormData.fields[findex]['id'] == 'partialSaleAbility'){
//                    formData['partialSaleAbility'] = newFormData.fields[findex]['value'];
//                }
//                if(newFormData.fields[findex]['id'] == 'distributionTaxability'){
//                    formData['distributionTaxability'] = newFormData.fields[findex]['value'];
//                }
//            }
//
//            formData = this.setConditionValue(formData);
//    
//            let enableNext = false;
//            if(formData['basisCost'] != '' && formData['costBasisDate'] != '' && formData['taxability'] != '' && formData['assetLiquid'] != '' && formData['partialSaleAbility'] != '' && formData['distributionTaxability'] != ''){
//                enableNext = true;
//            }
//
//            this.setState({
//                formData: formData,
//                enableNext: enableNext
//            })
//        }
//        
//    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['loan_nickname'] != '' && formData['loan_amount'] != '' && formData['loan_apr'] != '' && formData['loan_type'] != '' && formData['loan_federal'] != '' && formData['loan_private_nickname'] != '' && formData['loan_cosigner'] != '' && formData['loan_first_due'] != '' && formData['loan_payment_amount'] != '' ){
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
       
        let formData = StudentLoanDetailsSubForm.FnCreateFormData({
            loan_nickname: this.state.formData['loan_nickname'],
            loan_amount: this.state.formData['loan_amount'],
            loan_apr: this.state.formData['loan_apr'],
            loan_type: this.state.formData['loan_type'],
            loan_federal: this.state.formData['loan_federal'],
            loan_private_nickname: this.state.formData['loan_private_nickname'],
            loan_cosigner: this.state.formData['loan_cosigner'],
            loan_first_due: this.state.formData['loan_first_due'],
            loan_payment_amount: this.state.formData['loan_payment_amount'],

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm('SLQuestionLoopAdd');
                

    }

    goPreviousForm(){
        this.props.cbGoSubForm("TuitionCosts");
        // this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Student Loan Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                         <Col span={16}>
                            <Form.Item label="Nickname of Loan">
                                <Input size={size} value={this.state.formData.loan_nickname} name="loan_nickname" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
            <Col span={16}>
                            <Form.Item label="Amount">
                                <Currency 
                                    value={this.state.formData.loan_amount} 
                                    name="loan_amount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="APR">
                                <Input value={this.state.formData.loan_apr} name="loan_apr" onChange={(value) => this.handleFormInputChange("loan_apr", value)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="What Type of Loan is this?">
                                <Radio.Group name="loan_type" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.loan_type}>
                                    <Radio.Button value="Federal">Federal</Radio.Button>
                                    <Radio.Button value="Private">Private</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        
            <Col span={16} type="flex" justify="center">    
                            <Form.Item label="Federal Loans">
                                    <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.frequency}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("loan_federal", value)}
                                >
                                {
                                    FREQUNCIES.map((loan_federal, index) => <Option key={index} value={loan_federal}>{loan_federal}</Option>)
                                }
                                </Select>
                            </Form.Item>  
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Nickname of Private Loan">
                                <Input size={size} value={this.state.formData.loan_private_nickname} name="loan_private_nickname" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                
                <Col span={16}>
                            <Form.Item label="Cosigner">
                                <Input size={size} value={this.state.formData.loan_cosigner} name="loan_cosigner" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>


                <Col span={16}>
                            <Form.Item label="First Payment Due Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('loan_first_due', date, dateString)}
                                    value={this.state.formData.loan_first_due == '' ? null : moment(this.state.formData.loan_first_due, dateFormat)}
                                />
                            </Form.Item>
                            
                        </Col>

                <Col span={16}>
                           <Form.Item label="Amount of Payment">
                                <Currency 
                                    value={this.state.formData.loan_payment_amount} 
                                    name="loan_payment_amount" 
                                    onChange={(event) => this.handleInputChange(event)}
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


export default connect()(StudentLoanDetailsSubForm);