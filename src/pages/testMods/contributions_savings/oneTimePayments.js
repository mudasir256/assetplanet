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


const formID = 'OneTimeFriendsAndFamily';

class OneTimeFriendsAndFamilySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'One-Time Payments from Friends and Family',
            fields: [
                {
                    id: 'payment_amount',
                    title: 'Amount',
                    value: data['payment_amount'],
                },
                {
                    id: 'payment_date',
                    title: 'Date',
                    value: data['payment_date']
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
                payment_amount: '',
                payment_date: '',

               
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
               if(newFormData.fields[findex]['id'] == 'payment_amount'){
                   formData['payment_amount'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'payment_date'){
                   formData['payment_date'] = newFormData.fields[findex]['value'];
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

        if(formData['payment_amount'] != '' && formData['payment_date'] != '') {
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
        
        let formData = OneTimeFriendsAndFamilySubForm.FnCreateFormData({
            payment_amount: this.state.formData['payment_amount'],
            payment_date: this.state.formData['payment_date']


        })

        this.props.cbUpdateSubForm(formID, formData);
         this.props.cbGoSubForm("CSQuestionLoopAdd");
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("FriendsFamily");
        // this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">One-Time Payments from Friends and Family</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        
            
            <Col span={16}>
                        <Form.Item label="Amount">
                                <Input size={size} value={this.state.formData.payment_amount} name="payment_amount" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>    
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Payment Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('payment_date', date, dateString)}
                                    value={this.state.formData.payment_date == '' ? null : moment(this.state.formData.payment_date, dateFormat)}
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


export default connect()(OneTimeFriendsAndFamilySubForm);