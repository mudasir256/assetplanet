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


const formID = 'MultiPayFriendsAndFamily';
class MultiPayFriendsAndFamilySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Multiple Payments',
            fields: [
                {
                    id: 'mult_payment_amount',
                    title: 'Amount',
                    value: data['mult_payment_amount'],
                },
                {
                    id: 'mult_frequency',
                    title: 'Frequency',
                    value: data['mult_frequency']
                },
                {
                    id: 'mult_startDate',
                    title: 'Start Date',
                    value: data['mult_startDate'],
                },
                {
                    id: 'mult_endDate',
                    title: 'End Date',
                    value: data['mult_endDate']
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
                mult_payment_amount: '',
                mult_frequency: '',
                mult_startDate: '',
                mult_endDate: ''
            },
            
            size: 'large'
        }
        
        this.goNextForm = this.goNextForm.bind(this);
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
               if(newFormData.fields[findex]['id'] == 'mult_payment_amount'){
                   formData['mult_payment_amount'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'mult_frequency'){
                   formData['mult_frequency'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'mult_startDate'){
                   formData['mult_startDate'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'mult_endDate'){
                   formData['mult_endDate'] = newFormData.fields[findex]['value'];
               }
           }

   
           let enableNext = false;
           if(formData['mult_payment_amount'] != '' && formData['mult_frequency'] != '' && formData['mult_startDate'] != '' && formData['mult_endDate'] != ''){
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

        if(formData['mult_payment_amount'] != '' && formData['mult_frequency'] != '' && formData['mult_startDate'] != '' && formData['mult_endDate'] != '') {
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

        let formData = MultiPayFriendsAndFamilySubForm.FnCreateFormData({
            mult_payment_amount: this.state.formData['mult_payment_amount'],
            mult_frequency: this.state.formData['mult_frequency'],
            mult_startDate: this.state.formData['mult_startDate'],
            mult_endDate: this.state.formData['mult_endDate']


        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm("CSQuestionLoopAdd");
       
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("FriendsFamily");
        //this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Multiple Payments from Friends and Family</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        
            
            <Col span={16}>
                         <Form.Item label="Amount">
                            <Currency 
                                value={this.state.formData.mult_payment_amount} 
                                name="mult_payment_amount" 
                                onChange={(event) => this.handleInputChange(event)}>
                            </Currency>
                        </Form.Item>
                    </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Frequency">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.mult_frequency}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("mult_frequency", value)}
                                >
                                    {
                                    FREQUNCIES.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
            
             <Col span={16}>
                        <Form.Item label="Start Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('mult_startDate', date, dateString)}
                                    value={this.state.formData.mult_startDate == '' ? null : moment(this.state.formData.mult_startDate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
            
             <Col span={16}>
                        <Form.Item label="End Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('mult_endDate', date, dateString)}
                                    value={this.state.formData.mult_endDate == '' ? null : moment(this.state.formData.mult_endDate, dateFormat)}
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
                        <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(MultiPayFriendsAndFamilySubForm);