import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Button, Row, Col, DatePicker } from 'antd';
import Currency from '../../../../components/form/Currency';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';


const formID = "SpouseRetirementCalculatorSubForm";
class SpouseRetirementCalculatorSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Spouse Retirement Earnings Calculator',
            fields: [
                {
                    id: 'dateReceivingBenefits',
                    title: 'Enter date you would like to begin receiving benefits',
                    value: data['dateReceivingBenefits']
                },
                {
                    id: 'estimatedEarnings',
                    title: 'Your estimated earnings',
                    value: data['estimatedEarnings']
                },
                {
                    id: 'monthlyDecreaseBenefit1',
                    title: 'Monthly decrease in benefit',
                    value: data['monthlyDecreaseBenefit1']
                },
                {
                    id: 'monthlyDecreaseBenefit2',
                    title: 'Monthly decrease in benefit',
                    value: data['monthlyDecreaseBenefit2']
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
                dateReceivingBenefits: '',
                estimatedEarnings: '',
                monthlyDecreaseBenefit1: '',
                monthlyDecreaseBenefit2: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'dateReceivingBenefits'){
                    formData['dateReceivingBenefits'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'estimatedEarnings'){
                    formData['estimatedEarnings'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'monthlyDecreaseBenefit1'){
                    formData['monthlyDecreaseBenefit1'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'monthlyDecreaseBenefit2'){
                    formData['monthlyDecreaseBenefit2'] = newFormData.fields[findex]['value'];
                }  
                
            }
    
            let enableNext = false;
            // if(formData['insuranceProduct'] != ''){
            //     enableNext = true;
            // }

            enableNext = true;

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

        if(formData['insuranceProduct'] != ''){
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
        if(!this.state.enableNext){
            return;
        }

        let formData = SpouseRetirementCalculatorSubForm.FnCreateFormData({
            dateReceivingBenefits: this.state.formData['dateReceivingBenefits'],
            estimatedEarnings: this.state.formData['estimatedEarnings'],
            monthlyDecreaseBenefit1: this.state.formData['monthlyDecreaseBenefit1'],
            monthlyDecreaseBenefit2: this.state.formData['monthlyDecreaseBenefit2']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("EndSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Spouse Retirement Earnings Calculator</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Enter date you would like to begin receiving benefits">                                    
                                <DatePicker
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateReceivingBenefits', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.dateReceivingBenefits == '' ? null : moment(this.state.formData.dateReceivingBenefits, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Your estimated earnings">   
                                <Currency value={this.state.formData.estimatedEarnings} name="estimatedEarnings" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly decrease in benefit">   
                                <Currency value={this.state.formData.monthlyDecreaseBenefit1} name="monthlyDecreaseBenefit1" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly decrease in benefit">   
                                <Currency value={this.state.formData.monthlyDecreaseBenefit2} name="monthlyDecreaseBenefit2" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(SpouseRetirementCalculatorSubForm);