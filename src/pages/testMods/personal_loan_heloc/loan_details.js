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


const formID = 'PersonalLoanHeloc';

class PersonalLoanHelocSubform extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Student Loan Details',
            fields: [
                {
                    id: 'ph_loan_type',
                    title: 'What Type of Loan is this?',
                    value: data['ph_loan_type'],
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
                ph_loan_type: ''
                
               
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
               if(newFormData.fields[findex]['id'] == 'ph_loan_type'){
                   formData['ph_loan_type'] = newFormData.fields[findex]['value'];
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

        if(formData['ph_loan_type'] != ''  ){
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

        let formData = PersonalLoanHelocSubform.FnCreateFormData({
            ph_loan_type: this.state.formData['ph_loan_type']

        })

        this.props.cbUpdateSubForm(formID, formData);
        if (this.state.formData.ph_loan_type === 'Parent Plus Loan' ){
            this.props.cbGoSubForm('Parent_plus_loan');
        } else {
        this.props.cbGoSubForm('Personal_loan_heloc');
        }
       
    }

    goPreviousForm(){
         this.props.cbGoSubForm("TuitionCosts");
        //this.props.cbGoPrev(formID);
    }


                
                
    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Loan Details</h2>
                        </Col>
                    </Row>
                   
            
            <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="What Type of Loan is this?">
                                <Radio.Group name="ph_loan_type" size={'large'} onChange={(event) => this.handleInputChange(event)} value={this.state.formData.ph_loan_type}>
                                    <Radio.Button value="Parent Plus Loan">Parent Plus Loan</Radio.Button>
                                    <Radio.Button value="Private Loan">Private Loan</Radio.Button>
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


export default connect()(PersonalLoanHelocSubform);