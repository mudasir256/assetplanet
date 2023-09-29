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


const formID = 'ScholorshipsGrantsDetails';

class ScholorshipsGrantsDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Scholorships and Grants',
            fields: [
                {
                    id: 'sg_assistance_type',
                    title: 'Nickname of Loan',
                    value: data['sg_assistance_type'],
                },
                {
                    id: 'sg_nickname',
                    title: 'Nickname of Scholarship \ Grant',
                    value: data['sg_nickname']
                },
                {
                    id: 'sg_amount',
                    title: 'Amount',
                    value: data['sg_amount']
                },
                {
                    id: 'sg_gift_aid',
                    title: 'This Gift Aid can be used for',
                    value: data['sg_gift_aid']
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
                sg_assistance_type: '',
                sg_nickname: '',
                sg_amount: '',
                sg_gift_aid: ''
                
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
               if(newFormData.fields[findex]['id'] == 'sg_assistance_type'){
                   formData['sg_assistance_type'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'sg_nickname'){
                   formData['sg_nickname'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'sg_amount'){
                   formData['sg_amount'] = newFormData.fields[findex]['value'];
               }
               if(newFormData.fields[findex]['id'] == 'sg_gift_aid'){
                   formData['sg_gift_aid'] = newFormData.fields[findex]['value'];
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

        if(formData['sg_assistance_type'] != '' && formData['sg_nickname'] != '' && formData['sg_amount'] != '' && formData['sg_gift_aid'] != '' ){
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


        let formData = ScholorshipsGrantsDetailsSubForm.FnCreateFormData({
            sg_assistance_type: this.state.formData['sg_assistance_type'],
            sg_nickname: this.state.formData['sg_nickname'],
            sg_amount: this.state.formData['sg_amount'],
            sg_gift_aid: this.state.formData['sg_gift_aid']
           

        })

        this.props.cbUpdateSubForm(formID, formData);
        this.props.cbGoSubForm('SGQuestionLoopAdd');
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
                            <h2 className="text-center font-weight-bold mb-4">Scholorships \ Grants</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
            <Col span={16}>
                         <Form.Item label="Type of Assistance">
                                <Radio.Group name="sg_assistance_type" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.sg_assistance_type}>
                                    <Radio.Button value="Taxable">Scholarship</Radio.Button>
                                    <Radio.Button value="Tax Deferred">Grant</Radio.Button>
                                </Radio.Group>
                            </Form.Item>   
                        </Col>
            <Col span={16}>
                         <Form.Item label="Nickname of Scholarship \ Grant">
                                <Input size={size} value={this.state.formData.sg_nickname} name="sg_nickname" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>   
                        </Col>
                        
            
            <Col span={16}>
                        <Form.Item label="Amount">
                                <Currency 
                                    value={this.state.formData.sg_amount} 
                                    name="sg_amount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                           <Form.Item label="This Gift Aid can be used for:">
                                <Radio.Group name="sg_gift_aid" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.sg_gift_aid}>
                                    <Radio.Button value="Taxable">Tuition Only</Radio.Button>
                                    <Radio.Button value="Tax Deferred">Any College Expense</Radio.Button>
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


export default connect()(ScholorshipsGrantsDetailsSubForm);