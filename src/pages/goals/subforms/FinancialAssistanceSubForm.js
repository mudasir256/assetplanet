import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Input, Icon } from 'antd';
import Currency from '../../../components/form/Currency';

const formID = "FinancialAssistanceSubForm";
class FinancialAssistanceSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Financial Assistance',
            fields: [
                {
                    id: 'typeOfAssistance',
                    title: 'Type of Assistance',
                    value: data['typeOfAssistance']
                },
                {
                    id: 'nicknameOfScholarship',
                    title: 'NickName of  Scholarship / Grant',
                    value: data['nicknameOfScholarship']
                },
                {
                    id: 'amount',
                    title: 'Amount',
                    value: data['amount']
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
                amount: ''
            },
            size: 'large'
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] === 'typeOfAssistance'){
                    formData['typeOfAssistance'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] === 'nicknameOfScholarship'){
                    formData['nicknameOfScholarship'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] === 'amount'){
                    formData['amount'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;

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


    goNextForm(){
        let formData = FinancialAssistanceSubForm.FnCreateFormData({
            typeOfAssistance: this.state.formData['typeOfAssistance'],
            nicknameOfScholarship: this.state.formData['nicknameOfScholarship'],
            amount: this.state.formData['amount']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("QuestionFinancialAssitanceSubForm");
    }

    render() {
        const { size } = this.state;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h2 className="text-center font-weight-bold mb-4">Financial Assistance</h2>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="Type Of Asisstance">
                                    <Input 
                                        value={this.state.formData.typeOfAssistance}
                                        name="typeOfAssistance"
                                        placeholder="Type Of Assistance"
                                        size={size}
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="NickName of  Scholarship \ Grant">
                                    <Input 
                                        value={this.state.formData.nicknameOfScholarship}
                                        name="nicknameOfScholarship"
                                        placeholder="Scholarship Details"
                                        size={size}
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Col>
                                <Form.Item label="Amount">
                                    <Currency 
                                        value={this.state.formData.amount}
                                        name="amount" 
                                        onChange={(event) => this.handleInputChange(event)}
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <div className="d-flex justify-content-end">
                    <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                        Next
                        <Icon type="right" />
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(FinancialAssistanceSubForm);