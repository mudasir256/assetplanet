import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Select, Radio, Icon } from 'antd';

import Country from '../../../../components/form/Country';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select

const professions = [
    'Bookkeeper', 'CPA', 'Financial Advisor', 'Insurance Agent', 'Lawyer - Corporate'
]

const relationships = [
    'Family', 'Friend', 'Professional'
]
const formID = "ContactInformationSubForm";
class ContactInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Contact List',
            fields: [
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
                    id: 'company',
                    title: 'Company',
                    value: data['company']
                },
                {
                    id: 'addressLine1',
                    title: 'Address Line 1',
                    value: data['addressLine1']
                },
                {
                    id: 'addressLine2',
                    title: 'Address Line 2',
                    value: data['addressLine2']
                },
                {
                    id: 'cityDistrict',
                    title: 'City / District',
                    value: data['cityDistrict']
                },
                {
                    id: 'stateProvince',
                    title: 'State / Province',
                    value: data['stateProvince']
                },
                {
                    id: 'postalCode',
                    title: 'Postal Code',
                    value: data['postalCode']
                },
                {
                    id: 'country',
                    title: 'Country',
                    value: data['country']
                },
                {
                    id: 'phone',
                    title: 'Phone',
                    value: data['phone']
                },
                {
                    id: 'alternatePhone',
                    title: 'Alternate Phone',
                    value: data['alternatePhone']
                },
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
                },
                {
                    id: 'profession',
                    title: 'Profession',
                    value: data['profession']
                },
                {
                    id: 'partTeam',
                    title: 'Part of My Professional Team',
                    value: data['partTeam']
                },
                {
                    id: 'email',
                    title: 'Email',
                    value: data['email']
                },
                {
                    id: 'notes',
                    title: 'Notes',
                    value: data['notes']
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
                firstName: '',
                lastName: '',
                company: '',
                addressLine1: '',
                addressLine2: '',
                cityDistrict: '',
                stateProvince: '',
                postalCode: '',
                country: '',
                phone: '',
                alternatePhone: '',
                relationship: '',
                profession: '',
                partTeam: '',
                email: '',
                notes: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        // this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    // componentDidMount() {
    //     this.updateFormData(this.props.subFormData);
    // }

    // updateFormData(newFormData){
    //     let formData = this.state.formData;
    //     if(newFormData.hasOwnProperty('fields')){
    //         for(var findex = 0; findex < newFormData.fields.length; findex++){
    //             if(newFormData.fields[findex]['id'] == 'firstName'){
    //                 formData['firstName'] = newFormData.fields[findex]['value'];
    //             }         
    //             if(newFormData.fields[findex]['id'] == 'lastName'){
    //                 formData['lastName'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'company'){
    //                 formData['company'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'addressLine1'){
    //                 formData['addressLine1'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'addressLine2'){
    //                 formData['addressLine2'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'cityDistrict'){
    //                 formData['cityDistrict'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'stateProvince'){
    //                 formData['stateProvince'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'postalCode'){
    //                 formData['postalCode'] = newFormData.fields[findex]['value'];
    //             }       
    //             if(newFormData.fields[findex]['id'] == 'country'){
    //                 formData['country'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'postalCode'){
    //                 formData['postalCode'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'phone'){
    //                 formData['phone'] = newFormData.fields[findex]['value'];
    //             } 
    //             if(newFormData.fields[findex]['id'] == 'alternatePhone'){
    //                 formData['alternatePhone'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'relationship'){
    //                 formData['relationship'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'profession'){
    //                 formData['profession'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'partTeam'){
    //                 formData['partTeam'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'email'){
    //                 formData['email'] = newFormData.fields[findex]['value'];
    //             }   
    //             if(newFormData.fields[findex]['id'] == 'notes'){
    //                 formData['notes'] = newFormData.fields[findex]['value'];
    //             } 
    //         }
    
    //         let enableNext = false;
    //         // if(formData['stateTaxation'] != '' && formData['stateTaxation'] != '' && formData['stateTaxation'] != '' && ){
    //             enableNext = true;
    //         // }

    //         this.setState({
    //             formData: formData,
    //             enableNext: enableNext
    //         })
    //     }
        
    // }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        // if(formData['static'] != ''){
        //     newState['enableNext'] = true;
        // }
        // else{
        //     newState['enableNext'] = false;
        // }
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


        console.log("formdataaaaaaa",formData);

        let formData = ContactInformationSubForm.FnCreateFormData({
            firstName: this.state.formData['firstName'],
            lastName: this.state.formData['lastName'],
            company: this.state.formData['company'],
            addressLine1: this.state.formData['addressLine1'],
            addressLine2: this.state.formData['addressLine2'],
            cityDistrict: this.state.formData['cityDistrict'],
            stateProvince: this.state.formData['stateProvince'],
            postalCode: this.state.formData['postalCode'],
            country: this.state.formData['country'],
            phone: this.state.formData['phone'],
            alternatePhone: this.state.formData['alternatePhone'],
            relationship: this.state.formData['relationship'],
            profession: this.state.formData['profession'],
            partTeam: this.state.formData['partTeam'],
            email: this.state.formData['email'],
            notes: this.state.formData['notes'],
        })

        // this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("QuestionAddContactSubForm");


        console.log("formdataaaaaaa",formData);

               
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Contact Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="First Name">
                                <Input 
                                    placeholder="First Name" 
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
                                placeholder="Last Name" 
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
                            <Form.Item label="Company">
                                <Input 
                                    value={this.state.formData.company} 
                                    name="company" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Address">
                                <Row>
                                    <Col>
                                        <Input 
                                            placeholder="Address Line 1" 
                                            value={this.state.formData.addressLine1} 
                                            name="addressLine1" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input 
                                            placeholder="Address Line 2" 
                                            value={this.state.formData.addressLine2} 
                                            name="addressLine2" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input 
                                            placeholder="City / District" 
                                            value={this.state.formData.cityDistrict} 
                                            name="cityDistrict"
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                    <Col>
                                        <Input 
                                            placeholder="State / Province" 
                                            value={this.state.formData.stateProvince} 
                                            name="stateProvince" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Input 
                                            placeholder="Postal Code" 
                                            value={this.state.formData.postalCode} 
                                            name="postalCode" 
                                            size={'large'}
                                            onChange={(event) => this.handleInputChange(event)}
                                        />
                                    </Col>
                                    <Col>
                                        <Country 
                                            value={this.state.formData.country} 
                                            onChange={(value) => this.handleSelectChange("country", value)}
                                        >
                                        </Country>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Phone">
                                <PhoneNumber 
                                    value={this.state.formData.phone} 
                                    name="phone" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                >
                                </PhoneNumber>    
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Alternate Phone">
                                <PhoneNumber 
                                    value={this.state.formData.alternatePhone} 
                                    name="alternatePhone" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                >
                                </PhoneNumber>    
                            </Form.Item>
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
                                    relationships.map((relationship, index) => <Radio key={index} value={relationship}>{relationship}</Radio>)
                                }
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Profession">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.profession}
                                    onChange={(value) => this.handleSelectChange("profession", value)}
                                >
                                {
                                    professions.map((profession, index) => <Option key={index} value={profession}>{profession}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Part of My Professional Team">
                                <Radio.Group 
                                    name="partTeam" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)} 
                                    value={this.state.formData.partTeam}
                                >
                                    <Radio value="Yes">Yes</Radio>
                                    <Radio value="No">No</Radio>
                                </Radio.Group>
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
                                >
                                </Email>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Notes">
                                <TextArea 
                                    value={this.state.formData.notes} 
                                    name="notes" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                >
                                </TextArea>
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


export default connect()(ContactInformationSubForm);