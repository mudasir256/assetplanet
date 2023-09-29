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

const relationships = [
    "Aunt", "Charity", "Child", "Cousin", "Friend", "Grandchild", "Grandparent", "In-Law", "Nephew", "Niece", "Other", "Parent", "Sibling", "Step-Grandparent", "Step-Parent", "Step-Sibling", "Uncle"
]

const formID = "CurrentAssistanceSubForm";
class CurrentAssistanceSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Current Assistance',
            fields: [
                {
                    id: 'recipientFirstName',
                    title: 'Recipient First Name',
                    value: data['recipientFirstName']
                },
                {
                    id: 'recipientLastName',
                    title: 'Recipient Last Name',
                    value: data['recipientLastName']
                },
                {
                    id: 'assistanceFirstName',
                    title: 'Person Providing Assistance First Name',
                    value: data['assistanceFirstName']
                },
                {
                    id: 'assistanceLastName',
                    title: 'Person Providing Assistance Last Name',
                    value: data['assistanceLastName']
                },
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
                },
                {
                    id: 'amountRecieved',
                    title: 'Amount Received',
                    value: data['amountRecieved']
                },
                {
                    id: 'frequency',
                    title: 'Frequency',
                    value: data['frequency']
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
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                recipientFirstName: '',
                recipientLastName: '',
                assistanceFirstName: '',
                assistanceLastName: '',
                relationship: '',
                amountRecieved: '',
                frequency: '',
                estimatedStartDate: '',
                assistanceEnds: '',
                estimatedEndDate: ''
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
                if(newFormData.fields[findex]['id'] == 'recipientFirstName'){
                    formData['recipientFirstName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'recipientLastName'){
                    formData['recipientLastName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'assistanceFirstName'){
                    formData['assistanceFirstName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'assistanceLastName'){
                    formData['assistanceLastName'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'relationship'){
                    formData['relationship'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'amountRecieved'){
                    formData['amountRecieved'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'frequency'){
                    formData['frequency'] = newFormData.fields[findex]['value'];
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

        let formData = CurrentAssistanceSubForm.FnCreateFormData({
            recipientFirstName: this.state.formData['recipientFirstName'],
            recipientLastName: this.state.formData['recipientLastName'],
            assistanceFirstName: this.state.formData['assistanceFirstName'],
            assistanceLastName: this.state.formData['assistanceLastName'],
            relationship: this.state.formData['relationship'],
            amountRecieved: this.state.formData['amountRecieved'],
            frequency: this.state.formData['frequency'],
            estimatedStartDate: this.state.formData['estimatedStartDate'],
            assistanceEnds: this.state.formData['assistanceEnds'],
            estimatedEndDate: this.state.formData['estimatedEndDate']
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
                            <h2 className="text-center font-weight-bold mb-4">Current Assistance</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Recipient First Name">   
                                <Input value={this.state.formData.recipientFirstName} name="recipientFirstName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Recipient Last Name">   
                                <Input value={this.state.formData.recipientLastName} name="recipientLastName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Person Providing Assistance First Name">   
                                <Input value={this.state.formData.assistanceFirstName} name="assistanceFirstName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Person Providing Assistance Last Name">   
                                <Input value={this.state.formData.assistanceLastName} name="assistanceLastName" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
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
                            <Form.Item label="Amount Received">   
                                <Currency 
                                    value={this.state.formData.amountRecieved} 
                                    name="amountRecieved" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
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
                                <Radio.Group name="assistanceEnds" value={this.state.formData.assistanceEnds} size={'large'} onChange={this.handleInputChange}>
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


export default connect()(CurrentAssistanceSubForm);