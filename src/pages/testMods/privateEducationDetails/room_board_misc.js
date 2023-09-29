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
const formID = 'RoomBoardMiscDetails';

class RoomBoardMiscDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Room, Board, Misc',
            fields: [
                {
                    id: 'rbm_school_supplies',
                    title: 'Textbooks and School Supplies',
                    value: data['rbm_school_supplies'],
                },
                {
                    id: 'rbm_equipment',
                    title: 'Equipment',
                    value: data['rbm_equipment']
                },
                {
                    id: 'rbm_personal',
                    title: 'Personal Expenses',
                    value: data['rbm_personal']
                },
                {
                    id: 'rbm_transportation',
                    title: 'Transportation',
                    value: data['rbm_transportation']
                }, 
                {
                    id: 'rbm_school_activity',
                    title: 'School and Activity Fees',
                    value: data['rbm_school_activity']
                },
                {
                    id: 'rbm_housing',
                    title: 'Estimated Housing',
                    value: data['rbm_housing']
                },
                {
                    id: 'rbm_meal',
                    title: 'Estimated Meal Plan ',
                    value: data['rbm_meal']
                },
                {
                    id: 'rbm_inflation',
                    title: 'Inflation Rate for Room, Board, Misc.',
                    value: data['rbm_inflation']
                
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
                rbm_school_supplies: '',
                rbm_equipment: '',
                rbm_personal: '',
                rbm_transportation: '',
                rbm_school_activity: '',
                rbm_housing:'',
                rbm_meal:'',
                rbm_inflation:''
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
                if(newFormData.fields[findex]['id'] == 'rbm_meal'){
                    formData['rbm_meal'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_school_supplies'){
                    formData['rbm_school_supplies'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_equipment'){
                    formData['rbm_equipment'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_transportation'){
                    formData['rbm_transportation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_personal'){
                    formData['rbm_personal'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_school_activity'){
                    formData['rbm_school_activity'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_housing'){
                    formData['rbm_housing'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_meal'){
                    formData['rbm_meal'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rbm_inflation'){
                    formData['rbm_inflation'] = newFormData.fields[findex]['value'];
                }
            }

            // formData = this.setConditionValue(formData);
    
            let enableNext = false;
            if(formData['rbm_school_supplies'] != '' && formData['rbm_equipment'] != '' && formData['rbm_transportation'] != '' && formData['rbm_personal'] != '' && formData['rbm_school_activity'] != '' && formData['rbm_housing'] != '' && formData['rbm_meal'] != '' && formData['rbm_inflation'] != ''){
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

        if(formData['rbm_school_supplies'] != '' && formData['rbm_equipment'] != '' && formData['rbm_personal'] != '' && formData['rbm_transportation'] != '' && formData['rbm_school_activity'] != '' && formData['rbm_housing'] != '' && formData['rbm_meal'] != '' && formData['rbm_inflation'] != ''){
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

        let formData = RoomBoardMiscDetailsSubForm.FnCreateFormData({
            rbm_school_supplies: this.state.formData['rbm_school_supplies'],
            rbm_equipment: this.state.formData['rbm_equipment'],
            rbm_personal: this.state.formData['rbm_personal'],
            rbm_transportation: this.state.formData['rbm_transportation'],
            rbm_school_activity: this.state.formData['rbm_school_activity'],
            rbm_housing: this.state.formData['rbm_housing'],
            rbm_meal: this.state.formData['rbm_meal'],
            rbm_inflation: this.state.formData['rbm_inflation'],
          
        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm("TuitionCosts");

               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("QuestionOtherCosts");
        // this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Room, Board, Misc.</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                         <Col span={16}>
                           <Form.Item label="Textbooks and School Supplies">
                                <Currency 
                                    value={this.state.formData.rbm_school_supplies} 
                                    name="rbm_school_supplies" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
            <Col span={16}>
                           <Form.Item label="Equipment">
                                <Currency 
                                    value={this.state.formData.rbm_equipment} 
                                    name="rbm_equipment" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
                        
            
            <Col span={16}>
                       <Form.Item label="Personal Expenses">
                                <Currency 
                                    value={this.state.formData.rbm_personal} 
                                    name="rbm_personal" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="Transportation">
                                <Currency 
                                    value={this.state.formData.rbm_transportation} 
                                    name="rbm_transportation" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
                        
            <Col span={16} type="flex" justify="center">    
                           <Form.Item label="School and Activity Fees">
                                <Currency 
                                    value={this.state.formData.rbm_school_activity} 
                                    name="rbm_school_activity" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Estimated Housing">
                                <Currency 
                                    value={this.state.formData.rbm_housing} 
                                    name="rbm_housing" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>
                
                <Col span={16}>
                            <Form.Item label="Estimated Meal Plan ">
                                <Currency 
                                    value={this.state.formData.rbm_meal} 
                                    name="rbm_meal" 
                                    onChange={(event) => this.handleInputChange(event)}>
                                </Currency>
                            </Form.Item>
                        </Col>


                <Col span={16}>
                            <Form.Item label="Inflation Rate for Room, Board, Misc.">
                                <Percent 
                                    value={this.state.formData.rbm_inflation} 
                                    name="rbm_inflation" 
                                    onChange={(value) => this.handleFormInputChange("rbm_inflation", value)}
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


export default connect()(RoomBoardMiscDetailsSubForm);