import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, Input, Select, Collapse, DatePicker } from 'antd';
import Currency from '../../../../../components/form/Currency';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
const { Panel } = Collapse;

const relationships = [
    "Aunt", "Charity", "Child", "Cousin", "Friend", "Grandchild", "Grandparent", "In-Law", "Nephew", "Niece", "Other", "Parent", "Sibling", "Step-Grandparent", "Step-Parent", "Step-Sibling", "Uncle"
]


const formID = "FutureAssistanceSubForm";
class FutureAssistanceSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Future Assistance',
            fields: [
                {
                    id: 'inheritanceAmount',
                    title: 'Monthly Amount',
                    value: data['inheritanceAmount']
                },
                {
                    id: 'yearExpectedIncome',
                    title: 'Date of Expected Inheritance',
                    value: data['yearExpectedIncome']
                },
                {
                    id: 'firstName',
                    title: 'Person Receieving from First Name',
                    value: data['firstName']
                },
                {
                    id: 'lastName',
                    title: 'Person Receieving from Last Name',
                    value: data['lastName']
                },
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
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
                inheritanceAmount: '',
                yearExpectedIncome: '',
                firstName: '',
                lastName: '',
                relationship: ''
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
                if(newFormData.fields[findex]['id'] == 'inheritanceAmount'){
                    formData['inheritanceAmount'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'yearExpectedIncome'){
                    formData['yearExpectedIncome'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'firstName'){
                    formData['firstName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'lastName'){
                    formData['lastName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'relationship'){
                    formData['relationship'] = newFormData.fields[findex]['value'];
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

        let formData = FutureAssistanceSubForm.FnCreateFormData({
            inheritanceAmount: this.state.formData['inheritanceAmount'],
            yearExpectedIncome: this.state.formData['yearExpectedIncome'],
            firstName: this.state.formData['firstName'],
            lastName: this.state.formData['lastName'],
            relationship: this.state.formData['relationship']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("EndSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("QuestionCurrentFutureSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Future Assistance</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly Amount">   
                                <Currency 
                                    value={this.state.formData.inheritanceAmount} 
                                    name="inheritanceAmount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date of Expected Inheritance">   
                                <DatePicker
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('yearExpectedIncome', date, dateString)}
                                    value={this.state.formData.yearExpectedIncome == '' ? null : moment(this.state.formData.yearExpectedIncome, dateFormat)}
                                    size={'large'}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Person Receieving from First Name">   
                                <Input value={this.state.formData.firstName} name="firstName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Person Receieving from Last Name">   
                                <Input value={this.state.formData.lastName} name="lastName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Relationship">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.relationship}
                                    onChange={(value) => this.handleSelectChange("relationship", value)}
                                    size={'large'}
                                >
                                {
                                    relationships.map((relationship, index) => <Option key={index} value={relationship}>{relationship}</Option>)
                                }
                                </Select>
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


export default connect()(FutureAssistanceSubForm);