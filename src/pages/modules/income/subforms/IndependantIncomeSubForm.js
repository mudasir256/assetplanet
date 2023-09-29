import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col } from 'antd';
import Currency from '../../../../components/form/Currency';

const formID = "IndependantIncomeSubForm";
class IndependantIncomeSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Independent Contractor Income Section',
            fields: [
                {
                    id: 'lessAdjustment',
                    title: 'Less Self-Employment Adjustment',
                    value: data['lessAdjustment']
                },
                {
                    id: 'taxableEarnings',
                    title: 'Taxable Self-Employment Earnings',
                    value: data['taxableEarnings']
                },
                {
                    id: 'annualAdditional',
                    title: ' Annual Additional Medicare Tax',
                    value: data['annualAdditional']
                },
                {
                    id: 'annualSocial',
                    title: 'Annual Social Security Tax',
                    value: data['annualSocial']
                },
                {
                    id: 'annualMedicare',
                    title: 'Annual Medicare Tax',
                    value: data['annualMedicare']
                },
                {
                    id: 'totalSelf',
                    title: 'Total Self-Employment Tax',
                    value: data['totalSelf']
                },
                {
                    id: 'totalDeduction',
                    title: 'Total Deduction Portion',
                    value: data['totalDeduction']
                },
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                lessAdjustment: '',
                taxableEarnings: '',
                annualAdditional: '',
                annualSocial: '',
                annualMedicare: '',
                totalSelf: '',
                totalDeduction: '',
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
                if(newFormData.fields[findex]['id'] == 'lessAdjustment'){
                    formData['lessAdjustment'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'taxableEarnings'){
                    formData['taxableEarnings'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'annualAdditional'){
                    formData['annualAdditional'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'annualSocial'){
                    formData['annualSocial'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'annualMedicare'){
                    formData['annualMedicare'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'totalSelf'){
                    formData['totalSelf'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'totalDeduction'){
                    formData['totalDeduction'] = newFormData.fields[findex]['value'];
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

        let formData = IndependantIncomeSubForm.FnCreateFormData({
            lessAdjustment: this.state.formData['lessAdjustment'],
            taxableEarnings: this.state.formData['taxableEarnings'],
            annualAdditional: this.state.formData['annualAdditional'],
            annualSocial: this.state.formData['annualSocial'],
            annualMedicare: this.state.formData['annualMedicare'],
            totalSelf: this.state.formData['totalSelf'],
            totalDeduction: this.state.formData['totalDeduction']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("IncomeTaxationSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Independent Contractor Income Section</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Less Self-Employment Adjustment">   
                                <Currency value={this.state.formData.lessAdjustment} name="lessAdjustment" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Taxable Self-Employment Earnings">   
                                <Currency value={this.state.formData.taxableEarnings} name="taxableEarnings" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label=" Annual Additional Medicare Tax">   
                                <Currency value={this.state.formData.annualAdditional} name="annualAdditional" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Annual Social Security Tax">   
                                <Currency value={this.state.formData.annualSocial} name="annualSocial" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Annual Medicare Tax">   
                                <Currency value={this.state.formData.annualMedicare} name="annualMedicare" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Total Self-Employment Tax">   
                                <Currency value={this.state.formData.totalSelf} name="totalSelf" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Total Deduction Portion">   
                                <Currency value={this.state.formData.totalDeduction} name="totalDeduction" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(IndependantIncomeSubForm);