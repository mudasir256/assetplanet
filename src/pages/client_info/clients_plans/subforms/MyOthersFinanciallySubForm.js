import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Select, Radio, Collapse, Icon } from 'antd';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import WebAddress from 'components/form/WebAddress';

import { RELATIONSHIPS } from 'constants/types';




const formID = "MyOthersFinanciallySubForm";
class MyOthersFinanciallySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Others Financially Impcated Details',
            fields: [
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
                },
                {
                    id: 'firstName',
                    title: 'First Name',
                    value: data['firstName']
                },
                {
                    id: 'lastName',
                    title: 'Last Name',
                    value: data['lastName']
                },
                {
                    id: 'phoneNumber',
                    title: 'Phone Number',
                    value: data['phoneNumber']
                },
                {
                    id: 'webAddress',
                    title: 'Web Address',
                    value: data['webAddress']
                },
                {
                    id: 'email',
                    title: 'Email',
                    value: data['email']
                },
                {
                    id: 'contactPersonFirstName',
                    title: 'Contact Person - First Name',
                    value: data['contactPersonFirstName']
                },
                {
                    id: 'contactPersonLastName',
                    title: 'Contact Person - Last Name',
                    value: data['contactPersonLastName']
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
                relationship: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                webAddress: '',
                email: '',
                contactPersonFirstName: '',
                contactPersonLastName: '',
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
                if(newFormData.fields[findex]['id'] == 'relationship'){
                    formData['relationship'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'firstName'){
                    formData['firstName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'lastName'){
                    formData['lastName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'phoneNumber'){
                    formData['phoneNumber'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'webAddress'){
                    formData['webAddress'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'email'){
                    formData['email'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'contactPersonFirstName'){
                    formData['contactPersonFirstName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'contactPersonLastName'){
                    formData['contactPersonLastName'] = newFormData.fields[findex]['value'];
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

        let formData = MyOthersFinanciallySubForm.FnCreateFormData({
            relationship: this.state.formData['relationship'],
            firstName: this.state.formData['firstName'],
            lastName: this.state.formData['lastName'],
            phoneNumber: this.state.formData['phoneNumber'],
            webAddress: this.state.formData['webAddress'],
            email: this.state.formData['email'],
            contactPersonFirstName: this.state.formData['contactPersonFirstName'],
            contactPersonLastName: this.state.formData['contactPersonLastName']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionFinanciallyOthersSubForm");

    }
    goPreviousForm(){
        this.props.cbGoSubForm("MyCharityInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Others Financially Impacted Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Relationship">
                                <Radio.Group 
                                    name="relationship" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)} 
                                    value={this.state.formData.relationship}
                                >
                                {
                                    RELATIONSHIPS.map((relationship, index) => <Radio key={index} value={relationship}>{relationship}</Radio>)
                                }
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="First Name">
                                <Input 
                                    value={this.state.formData.firstName} 
                                    name="firstName" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Last Name">
                                <Input 
                                    value={this.state.formData.lastName} 
                                    name="lastName" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Phone Number">
                                <PhoneNumber 
                                    value={this.state.formData.phoneNumber} 
                                    name="phoneNumber" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Web Address">
                                <WebAddress 
                                    value={this.state.formData.webAddress} 
                                    name="webAddress" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Email">
                                <Email 
                                    value={this.state.formData.email} 
                                    name="email" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Contact Person - First Name">
                                <Input 
                                    value={this.state.formData.contactPersonFirstName} 
                                    name="contactPersonFirstName" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Contact Person - Last Name">
                                <Input 
                                    value={this.state.formData.contactPersonLastName} 
                                    name="contactPersonLastName" 
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


export default connect()(MyOthersFinanciallySubForm);