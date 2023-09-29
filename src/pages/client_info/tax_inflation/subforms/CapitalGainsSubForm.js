import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Icon } from 'antd';

const formID = "CapitalGainsSubForm";
class CapitalGainsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Capital Gains & Carry Forward Loss Information',
            fields: [
                {
                    id: 'amount',
                    title: 'Amount Withdrawn Subject to Cap Gains',
                    value: data['amount']
                },
                {
                    id: 'rateFederal',
                    title: 'Cap Gains Rate Federal',
                    value: data['rateFederal']
                },
                {
                    id: 'rateState',
                    title: 'Cap Gains Rate State',
                    value: data['rateState']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                amount: '',
                rateFederal: '',
                rateState: ''
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
                if(newFormData.fields[findex]['id'] == 'amount'){
                    formData['amount'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rateFederal'){
                    formData['rateFederal'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'rateState'){
                    formData['rateState'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['amount'] != '' && formData['rateFederal'] != '' && formData['rateState'] != ''){
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

        if(formData['amount'] != '' && formData['rateFederal'] != '' && formData['rateState'] != ''){
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
        if(!this.state.enableNext){
            return;
        }

        let formData = CapitalGainsSubForm.FnCreateFormData({
            amount: this.state.formData['amount'],
            rateFederal: this.state.formData['rateFederal'],
            rateState: this.state.formData['rateState']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("QuestionCarryForwardLossSubForm");
               
    }
    goPreviousForm(){
        this.props.cbGoSubForm("NewTaxCreditSubForm");
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Capital Gains &amp; Carry Forward Loss Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Amount Withdrawn Subject to Cap Gains">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.amount} 
                                    name="amount" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Cap Gains Rate Federal">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.rateFederal} 
                                    name="rateFederal" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Cap Gains Rate State">
                                <Input 
                                    addonAfter="%" 
                                    value={this.state.formData.rateState} 
                                    name="rateState" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
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


export default connect()(CapitalGainsSubForm);