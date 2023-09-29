import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Select, Collapse, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import WebAddress from 'components/form/WebAddress';



const formID = "MyCharityInformationSubForm";
class MyCharityInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Charity Information',
            fields: [
                {
                    id: 'nameCharity',
                    title: 'Name of Charity',
                    value: data['nameCharity']
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
                    id: 'contactPerson',
                    title: 'Contact Person',
                    value: data['contactPerson']
                },
                {
                    id: 'contactPersonFirstName',
                    title: 'Contact Person First Name',
                    value: data['contactPersonFirstName']
                },
                {
                    id: 'contactPersonLastName',
                    title: 'Contact Person Last Name',
                    value: data['contactPersonLastName']
                },
                {
                    id: 'notes',
                    title: 'Notes',
                    value: data['notes']
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
                nameCharity: '',
                phoneNumber: '',
                webAddress: '',
                email: '',
                contactPersonFirstName: '',
                contactPersonLastName: '',
                notes: ''
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
                if(newFormData.fields[findex]['id'] == 'nameCharity'){
                    formData['nameCharity'] = newFormData.fields[findex]['value'];
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
                if(newFormData.fields[findex]['id'] == 'notes'){
                    formData['notes'] = newFormData.fields[findex]['value'];
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

        let formData = MyCharityInformationSubForm.FnCreateFormData({
            nameCharity: this.state.formData['nameCharity'],
            phoneNumber: this.state.formData['phoneNumber'],
            webAddress: this.state.formData['webAddress'],
            email: this.state.formData['email'],
            contactPersonFirstName: this.state.formData['contactPersonFirstName'],
            contactPersonLastName: this.state.formData['contactPersonLastName'],
            notes: this.state.formData['notes']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionCharitySubForm");

    }
    goPreviousForm(){
        this.props.cbGoSubForm("MyCorporateInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Charity Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Name of Charity">
                                <Input 
                                    value={this.state.formData.nameCharity} 
                                    name="nameCharity" 
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
                                    name="webAddress" 
                                    value={this.state.formData.webAddress} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Web Address">
                                <WebAddress 
                                    name="webAddress" 
                                    size={'large'}
                                    value={this.state.formData.webAddress} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Email">
                                <Email 
                                    name="email" 
                                    size={'large'}
                                    value={this.state.formData.email} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Contact Person">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Input 
                                            value={this.state.formData.contactPersonFirstName} 
                                            name="contactPersonFirstName" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Input 
                                            value={this.state.formData.contactPersonLastName} 
                                            name="contactPersonLastName" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Notes">
                                <TextArea 
                                    name="notes" 
                                    size={'large'}
                                    value={this.state.formData.notes} 
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


export default connect()(MyCharityInformationSubForm);