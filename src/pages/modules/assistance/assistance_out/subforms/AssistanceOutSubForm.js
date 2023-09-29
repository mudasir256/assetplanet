import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, Input, DatePicker, Select, Radio, Collapse } from 'antd';
import Currency from '../../../../../components/form/Currency';
import moment from 'moment';
import { FREQUNCIES } from 'constants/types';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
const { Panel } = Collapse;

const budgetItems = [
    "Alimony", "Camp", "Child Support", "Clothing", "Family Support (other than child)", "Hobbies & Activities", "Kid Sitting", "Misc", "Nanny", "Room, Board, Monthly Expense", "School Tuition", "Tutor"
]

const relationships = [
    "Aunt", "Charity", "Child", "Cousin", "Friend", "Grandchild", "Grandparent", "In-Law", "Nephew", "Niece", "Other", "Parent", "Sibling", "Step-Grandparent", "Step-Parent", "Step-Sibling", "Uncle"
]

const persons = [
    "John  Smith", "Jane Smith", "Joint", "Mark Smith"
]

const formID = "AssistanceOutSubForm";
class AssistanceOutSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Assistance Out',
            fields: [
                {
                    id: 'firstName',
                    title: 'Recipient First Name',
                    value: data['firstName']
                },
                {
                    id: 'lastName',
                    title: 'Recipient Last Name',
                    value: data['lastName']
                },
                {
                    id: 'person',
                    title: 'Person Providing Assitance',
                    value: data['person']
                },
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
                },
                {
                    id: 'estimatedStartDate',
                    title: 'Estimated Start Date',
                    value: data['estimatedStartDate']
                },
                {
                    id: 'assistanceEnds',
                    title: 'Assistance Ends',
                    value: data['assistanceEnds']
                },
                {
                    id: 'estimatedEndDate',
                    title: 'Estimated End Date',
                    value: data['estimatedEndDate']
                },
                {
                    id: 'frequency',
                    title: 'Frequency',
                    value: data['frequency']
                },
                {
                    id: 'annualGiftingAmount',
                    title: 'Amount Gifting',
                    value: data['annualGiftingAmount']
                },
                {
                    id: 'budgetItem',
                    title: 'Budget Item',
                    value: data['budgetItem']
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
                firstName: '',
                lastName: '',
                person: '',
                relationship: '',
                estimatedStartDate: '',
                assistanceEnds: '',
                estimatedEndDate: '',
                frequency: '',
                annualGiftingAmount: '',
                budgetItem: '',
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
                if(newFormData.fields[findex]['id'] == 'firstName'){
                    formData['firstName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'lastName'){
                    formData['lastName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'person'){
                    formData['person'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'relationship'){
                    formData['relationship'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'estimatedStartDate'){
                    formData['estimatedStartDate'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'assistanceEnds'){
                    formData['assistanceEnds'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'estimatedEndDate'){
                    formData['estimatedEndDate'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'frequency'){
                    formData['frequency'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'annualGiftingAmount'){
                    formData['annualGiftingAmount'] = newFormData.fields[findex]['value'];
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

        let formData = AssistanceOutSubForm.FnCreateFormData({
            firstName: this.state.formData['firstName'],
            lastName: this.state.formData['lastName'],
            person: this.state.formData['person'],
            relationship: this.state.formData['relationship'],
            estimatedStartDate: this.state.formData['estimatedStartDate'],
            assistanceEnds: this.state.formData['assistanceEnds'],
            estimatedEndDate: this.state.formData['estimatedEndDate'],
            frequency: this.state.formData['frequency'],
            annualGiftingAmount: this.state.formData['annualGiftingAmount'],
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
                            <h2 className="text-center font-weight-bold mb-4">Assistance Out</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Recipient First Name">   
                                <Input value={this.state.formData.firstName} name="firstName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Recipient Last Name">   
                                <Input value={this.state.formData.lastName} name="lastName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Person Providing Assitance">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.person}
                                    onChange={(value) => this.handleSelectChange("person", value)}
                                    size={'large'}
                                >
                                {
                                    persons.map((person, index) => <Option key={index} value={person}>{person}</Option>)
                                }
                                </Select>
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
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Estimated Start Date">                                    
                                <DatePicker
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('estimatedStartDate', date, dateString)}
                                    value={this.state.formData.estimatedStartDate == '' ? null : moment(this.state.formData.estimatedStartDate, dateFormat)}
                                    size={'large'}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Assistance Ends">
                                <Radio.Group name="assistanceEnds" onChange={this.handleInputChange} size={'large'} value={this.state.formData.assistanceEnds}>
                                    <Radio value="At Retirement">At Retirement</Radio>
                                    <Radio value="At Spouse Retirement">At Spouse Retirement</Radio>
                                    <Radio value="At Death">At Death</Radio>
                                    <Radio value="Another Date">Another Date</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    {
                        this.state.formData.assistanceEnds == 'Another Date' &&
                        <Row gutter={16} type="flex" justify="center">
                            <Col span={8}>
                                <Form.Item label="">
                                    <DatePicker
                                        style={{ width: '100%' }} 
                                        format={dateFormat} 
                                        onChange={(date, dateString) => this.handleDatePickerChange('estimatedEndDate', date, dateString)}
                                        value={this.state.formData.estimatedEndDate == '' ? null : moment(this.state.formData.estimatedEndDate, dateFormat)}
                                        size={'large'}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Frequency">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.frequency}
                                    onChange={(value) => this.handleSelectChange("frequency", value)}
                                    size={'large'}
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
                            <Form.Item label="Amount Gifting">   
                                <Currency 
                                    value={this.state.formData.annualGiftingAmount} 
                                    name="annualGiftingAmount" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
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


export default connect()(AssistanceOutSubForm);