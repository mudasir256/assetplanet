import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col } from 'antd';
import Currency from '../../../../components/form/Currency';


const formID = "W2IncomeSubForm";
class W2IncomeSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'W2 Income Section',
            fields: [
                {
                    id: 'federalTaxes',
                    title: 'Federal Taxes',
                    value: data['federalTaxes']
                },
                {
                    id: 'stateTaxes',
                    title: 'State Taxes',
                    value: data['stateTaxes']
                },
                {
                    id: 'employmentRetirmentContributions',
                    title: 'Employment Retirement Contributions',
                    value: data['employmentRetirmentContributions']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                federalTaxes: '',
                stateTaxes: '',
                employmentRetirmentContributions: '',
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
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
                if(newFormData.fields[findex]['id'] == 'federalTaxes'){
                    formData['federalTaxes'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'stateTaxes'){
                    formData['stateTaxes'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'employmentRetirmentContributions'){
                    formData['employmentRetirmentContributions'] = newFormData.fields[findex]['value'];
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

        let formData = W2IncomeSubForm.FnCreateFormData({
            federalTaxes: this.state.formData['federalTaxes'],
            stateTaxes: this.state.formData['stateTaxes'],
            employmentRetirmentContributions: this.state.formData['employmentRetirmentContributions']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("IncomeTaxationSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("QuestionIncomeTypeSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">W2 Income Section</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Federal Taxes">   
                                <Currency value={this.state.formData.federalTaxes} name="federalTaxes" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="State Taxes">   
                                <Currency value={this.state.formData.stateTaxes} name="stateTaxes" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Employment Retirement Contributions">   
                                <Currency value={this.state.formData.employmentRetirmentContributions} name="employmentRetirmentContributions" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(W2IncomeSubForm);