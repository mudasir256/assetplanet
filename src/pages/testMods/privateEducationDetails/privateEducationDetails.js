import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Form, Radio, DatePicker, InputNumber, Icon, Input, Select } from 'antd';
import Percent from '../../../components/form/PercentV2';
import Currency from '../../../components/form/Currency';
import moment from 'moment';
import { FAMILY_RELATIONSHIPS, FREQUNCIES, SCHOOL_LEVEL } from '../../../constants/types';
const { Option } = Select;
const InputGroup = Input.Group;

const dateFormat = 'MM/DD/YYYY';

// var formData = [];
const formID = 'PrivateEducationDetails';
class PrivateEducationDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Private Education',
            fields: [
                {
                    id: 'pe_person_attending',
                    title: 'Person Attending School',
                    value: data['pe_person_attending'],
                },
                {
                    id: 'pe_institution_name',
                    title: 'Name of Instituion',
                    value: data['pe_institution_name']
                },
                {
                    id: 'pe_education_level',
                    title: 'Level of Education',
                    value: data['pe_education_level']
                },
                {
                    id: 'pe_numb_years',
                    title: 'For how many years?',
                    value: data['pe_numb_years']
                },
                {
                    id: 'pe_tuition_cost',
                    title: 'Estimated Annual Tuition Cost',
                    value: data['pe_tuition_cost']
                },
                {
                    id: 'pe_inflation_rate',
                    title: 'Inflation Rate',
                    value: data['pe_inflation_rate']
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
                pe_person_attending: '',
                pe_institution_name: '',
                pe_education_level: '',
                pe_numb_years: '',
                pe_tuition_cost: '',
                pe_inflation_rate: ''
                
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
                if(newFormData.fields[findex]['id'] == 'pe_person_attending'){
                    formData['pe_person_attending'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'pe_institution_name'){
                    formData['pe_institution_name'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'pe_education_level'){
                    formData['pe_education_level'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'pe_numb_years'){
                    formData['pe_numb_years'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'pe_tuition_cost'){
                    formData['pe_tuition_cost'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'pe_inflation_rate'){
                    formData['pe_inflation_rate'] = newFormData.fields[findex]['value'];
                }
            }

          //  formData = this.setConditionValue(formData);
    
            let enableNext = false;
            if(formData['pe_person_attending'] != '' && formData['pe_institution_name'] != '' && formData['pe_education_level'] != '' && formData['pe_numb_years'] != '' && formData['pe_tuition_cost'] != '' && formData['pe_inflation_rate'] != ''){
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

        if(formData['pe_person_attending'] != '' && formData['pe_institution_name'] != '' && formData['pe_education_level'] != '' && formData['pe_numb_years'] != '' && formData['pe_tuition_cost'] != '' && formData['pe_inflation_rate'] != '' ){
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

        let formData = PrivateEducationDetailsSubForm.FnCreateFormData({
            pe_person_attending: this.state.formData['pe_person_attending'],
            pe_institution_name: this.state.formData['pe_institution_name'],
            pe_education_level: this.state.formData['pe_education_level'],
            pe_numb_years: this.state.formData['pe_numb_years'],
            pe_tuition_cost: this.state.formData['pe_tuition_cost'],
            pe_inflation_rate: this.state.formData['pe_inflation_rate']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        if(this.state.formData.pe_education_level === 'K-12'){
            this.props.cbGoSubForm("PrivateEducationK12Details"); 
        } else {
            this.props.cbGoSubForm("QuestionOtherCosts");
        }
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
                            <h2 className="text-center font-weight-bold mb-4">Private Education Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
                         <Form.Item label="Person Attending School">
                                <Input 
                                size={size} 
                                value={this.state.formData.pe_person_attending} 
                                name="pe_person_attending" 
                                onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
            <Col span={16}>
                           <Form.Item label="Name of Institution">
                                <Input size={size} value={this.state.formData.pe_institution_name} name="pe_institution_name" onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Level of Education">
                                    <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.pe_education_level}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("pe_education_level", value)}
                                >
                                {
                                    SCHOOL_LEVEL.map((pe_education_level, index) => <Option key={index} value={pe_education_level}>{pe_education_level}</Option>)
                                }
                                </Select>
                            </Form.Item> 
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="For How Many Years">
                                <Input size={size} value={this.state.formData.pe_numb_years} name="pe_numb_years" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                           <Form.Item label="Estimated Annual Tuition Cost">
                                <Currency 
                                    value={this.state.formData.pe_tuition_cost} 
                                    name="pe_tuition_cost" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={16}>
                           <Form.Item label="Inflation Rate">
                                <Percent value={this.state.formData.pe_inflation_rate} name="pe_inflation_rate" onChange={(value) => this.handleFormInputChange("pe_inflation_rate", value)}/>
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
   
export default connect()(PrivateEducationDetailsSubForm);