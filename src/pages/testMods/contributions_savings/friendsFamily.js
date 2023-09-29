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


const formID = 'FriendsAndFamily';

class FriendsAndFamilySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Friends and Family',
            fields: [
                 {
                    id: 'providing_assitance',
                    title: 'Person Providing Assistance',
                    value: data['providing_assitance']
                },
                {
                    id: 'frequency',
                    title: 'Frquency',
                    value: data['frequency'],
                },
                {
                    id: 'funds_for',
                    title: 'What are the funds for?',
                    value: data['funds_for']
                },
                {
                    id: 'multiple_one',
                    title: 'Multiple Payments or One-Time',
                    value: data['multiple_one']
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
                providing_assitance: '',
                frequency: '',
                funds_for: '',
                multiple_one: '',
                
               
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
               if(newFormData.fields[findex]['id'] == 'providing_assitance'){
                   formData['providing_assitance'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'frequency'){
                   formData['frequency'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'funds_for'){
                   formData['funds_for'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'multiple_one'){
                   formData['multiple_one'] = newFormData.fields[findex]['value'];
               }

           }

           formData = this.setConditionValue(formData);
   
           let enableNext = false;
           if(formData['frequency'] != '' && formData['funds_for'] != '' && formData['multiple_one'] != '' && formData['providing_assitance'] != ''){
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

        if(formData['frequency'] != '' && formData['funds_for'] != '' && formData['multiple_one'] != '' && formData['providing_assitance'] != '' ){
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


        let formData = FriendsAndFamilySubForm.FnCreateFormData({
            providing_assitance: this.state.formData['providing_assitance'],
            frequency: this.state.formData['frequency'],
            funds_for: this.state.formData['funds_for'],
            multiple_one: this.state.formData['multiple_one']
    

        })

        this.props.cbUpdateSubForm(formID, formData);

        if(this.state.formData.multiple_one === 'Multiple'){
            this.props.cbGoSubForm("MultiplePayments"); 
        } else {
            this.props.cbGoSubForm("OneTimePayments");
        }
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("AssetPerformanceSubForm");
        //this.props.cbGoPrev(formID);
         this.props.cbGoSubForm("TuitionCosts");
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Friends and Family</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        
            
                        <Col span={16}>
                            <Form.Item label="Person Providing Assistance">
                                <Input 
                                    size={size} 
                                    value={this.state.formData.providing_assitance} 
                                    name="providing_assitance" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>    
                        </Col>
                        
            
                        <Col span={16}>
                            <Form.Item label="Relationship">           
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    style={{width: '100%'}}
                                    value={this.state.formData.frequency}
                                    size={size}
                                    onChange={(value) => this.handleSelectChange("frequency", value)}
                                >
                                {
                                    FREQUNCIES.map((frequency, index) => <Option key={index} value={frequency}>{frequency}</Option>)
                                }
                                </Select>  
                            </Form.Item> 
                        </Col>
                    </Row>
                    
            
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="What are these funds for?">
                                <Radio.Group 
                                    name="funds_for" 
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    value={this.state.formData.funds_for}>
                                    <Radio.Button value="Tuition">Tuition</Radio.Button>
                                    <Radio.Button value="Room, Board, Misc">Room, Board, Misc</Radio.Button>
                                    <Radio.Button value="Any">Any</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        
            <Col span={16} type="flex" justify="center">
                            <Form.Item label="Multiple or One Time?">
                                <Radio.Group 
                                    name="multiple_one" 
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)} 
                                    value={this.state.formData.multiple_one}>
                                    <Radio.Button value="Multiple">Multiple</Radio.Button>
                                    <Radio.Button value="One Time">One Time</Radio.Button>
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


export default connect()(FriendsAndFamilySubForm);