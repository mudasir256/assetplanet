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


const formID = 'TuitionSummary';

class TuitionSummarySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Work Study',
            fields: [
                {
                    id: 'ws_amount',
                    title: 'Amount allocated for Work Study',
                    value: data['ws_amount'],
                },
                {
                    id: 'ws_business_name',
                    title: 'Name of Business',
                    value: data['ws_business_name']
                },
                {
                    id: 'ws_job_title',
                    title: 'Amount',
                    value: data['ws_job_title']
                },
                {
                    id: 'ws_on_off_campus',
                    title: 'On Campus or Off Campus',
                    value: data['ws_on_off_campus']
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
                ws_amount: '',
                ws_business_name: '',
                ws_job_title: '',
                ws_on_off_campus: ''
                
            },
            
            size: 'large'
        }
        
     //   this.goNextForm = this.goNextForm.bind(this);
     //   this.goPreviousForm = this.goPreviousForm.bind(this);

     //   this.updateFormData = this.updateFormData.bind(this);

//        this.handleFormInputChange = this.handleFormInputChange.bind(this);
//        this.handleInputChange = this.handleInputChange.bind(this);
//        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
//        this.handleSelectChange = this.handleSelectChange.bind(this);

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

        if(formData['ws_amount'] != '' && formData['ws_business_name'] != '' && formData['ws_job_title'] != '' && formData['ws_on_off_campus'] != '' ){
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


    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let formData = TuitionSummarySubForm.FnCreateFormData({
            ws_amount: this.state.formData['ws_amount'],
            ws_business_name: this.state.formData['ws_business_name'],
            ws_job_title: this.state.formData['ws_job_title'],
            ws_on_off_campus: this.state.formData['ws_on_off_campus']
           

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm("EndSubForm");

               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("TuitionChecklist");
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Work Study</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
                         <Form.Item label="Amount allocated for Work Study">
                                <Currency 
                                    value={this.state.formData.ws_amount} 
                                    name="ws_amount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
            <Col span={16}>
                         <Form.Item label="Name of Business">
                                <Input size={size} value={this.state.formData.ws_business_name} name="ws_business_name" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>   
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Job Title">
                                <Input size={size} value={this.state.formData.ws_job_title} name="ws_job_title" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="On Campus or Off Campus">
                                <Radio.Group name="ws_on_off_campus" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.ws_on_off_campus}>
                                    <Radio.Button value="On Campus">On Campus</Radio.Button>
                                    <Radio.Button value="Off Campus">Off Campus</Radio.Button>
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


export default connect()(TuitionSummarySubForm);