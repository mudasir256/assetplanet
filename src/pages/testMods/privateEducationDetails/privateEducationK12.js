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


const formID = 'PrivateEducationK12Details';
class PrivateEducationK12DetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'K-12 Details',
            fields: [
                {
                    id: 'k12_date',
                    title: 'Date',
                    value: data['k12_date'],
                },
                {
                    id: 'k12_additional_costs',
                    title: 'Additional Non-Tuition Costs',
                    value: data['k12_additional_costs']
                },
                {
                    id: 'k12_remaining',
                    title: 'Remaining Years',
                    value: data['k12_remaining']
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
                k12_date: '',
                k12_additional_costs: '',
                k12_remaining: ''
                
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
               if(newFormData.fields[findex]['id'] == 'k12_date'){
                   formData['k12_date'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'k12_additional_costs'){
                   formData['k12_additional_costs'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'k12_remaining'){
                   formData['k12_remaining'] = newFormData.fields[findex]['value'];
               }
           }

           // formData = this.setConditionValue(formData);
   
           let enableNext = false;
           if(formData['k12_date'] != '' && formData['k12_additional_costs'] != '' && formData['k12_remaining'] != ''){
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

        if(formData['k12_date'] != '' && formData['k12_additional_costs'] != '' && formData['k12_remaining'] != '' ){
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

        let formData = PrivateEducationK12DetailsSubForm.FnCreateFormData({
            k12_date: this.state.formData['k12_date'],
            k12_additional_costs: this.state.formData['k12_additional_costs'],
            k12_remaining: this.state.formData['k12_remaining']
           

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm("QuestionOtherCosts");
    
               
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("AssetPerformanceSubForm");
        this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Private Education K12 Section</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
                        <Form.Item label="Date">
                                <DatePicker
                                    size={'large'}
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('k12_date', date, dateString)}
                                    value={this.state.formData.k12_date == '' ? null : moment(this.state.formData.k12_date, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
            <Col span={16}>
                           <Form.Item label="Additional Non-Tuition Costs">
                                <Currency 
                                    value={this.state.formData.k12_additional_costs} 
                                    name="k12_additional_costs" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Remaining Years">
                                <Input size={size} value={this.state.formData.k12_remaining} name="k12_remaining" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(PrivateEducationK12DetailsSubForm);