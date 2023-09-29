import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Table, Divider, Tag, Button, Row, Col, Input, DatePicker, Select, Radio, Icon, Collapse } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Currency from '../../../../components/form/Currency';
import PhoneNumber from '../../../../components/form/PhoneNumber';
import Email from '../../../../components/form/Email';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
const { Panel } = Collapse;


const formID = "MyDetailsInformationSubForm";
class MyDetailsInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'My Details',
            fields: [
                {
                    id: 'clientPrimaryContactNumber',
                    title: 'Client Phone Number - Primary',
                    value: data['clientPrimaryContactNumber']
                },
                {
                    id: 'clientSecondaryContactNumber',
                    title: 'Client Phone Number - Secondary',
                    value: data['clientSecondaryContactNumber']
                },
                {
                    id: 'clientWorkContactNumber',
                    title: 'Client Phone Number - Work',
                    value: data['clientWorkContactNumber']
                },
                {
                    id: 'clientEmailAddress',
                    title: 'Client Email Address - Primary',
                    value: data['clientEmailAddress']
                },
                {
                    id: 'clientSecondaryEmailAddress',
                    title: 'Client Email Address - Other',
                    value: data['clientSecondaryEmailAddress']
                },
                {
                    id: 'clientAddressFirstLine',
                    title: 'Address Line1',
                    value: data['clientAddressFirstLine']
                },
                {
                    id: 'clientAddressSecondLine',
                    title: 'Address Line2',
                    value: data['clientAddressSecondLine']
                },
                {
                    id: 'clientAddressCity',
                    title: 'City / District',
                    value: data['clientAddressCity']
                },
                {
                    id: 'clientAddressPostalCode',
                    title: 'Postal Code',
                    value: data['clientAddressPostalCode']
                },
                {
                    id: 'clientAddressCountry',
                    title: 'Country',
                    value: data['clientAddressCountry']
                },
                {
                    id: 'clientAddressState',
                    title: 'State',
                    value: data['clientAddressState']
                },
                {
                    id: 'clientRetirementDate',
                    title: 'Date of Retirement',
                    value: data['clientRetirementDate']
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
                clientPrimaryContactNumber: '',
                clientSecondaryContactNumber: '',
                clientWorkContactNumber: '',
                clientEmailAddress: '',
                clientSecondaryEmailAddress: '',
                clientAddressFirstLine: '',
                clientAddressSecondLine: '',
                clientAddressCity: '',
                clientAddressPostalCode: '',
                clientAddressCountry: '',
                clientAddressState: '',
                clientRetirementDate: ''
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
                if(newFormData.fields[findex]['id'] == 'clientPrimaryContactNumber'){
                    formData['clientPrimaryContactNumber'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'clientSecondaryContactNumber'){
                    formData['clientSecondaryContactNumber'] = newFormData.fields[findex]['value'];
                }     
                if(newFormData.fields[findex]['id'] == 'clientWorkContactNumber'){
                    formData['clientWorkContactNumber'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientEmailAddress'){
                    formData['clientEmailAddress'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientSecondaryEmailAddress'){
                    formData['clientSecondaryEmailAddress'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressFirstLine'){
                    formData['clientAddressFirstLine'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressSecondLine'){
                    formData['clientAddressSecondLine'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressCity'){
                    formData['clientAddressCity'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressPostalCode'){
                    formData['clientAddressPostalCode'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressCountry'){
                    formData['clientAddressCountry'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientAddressState'){
                    formData['clientAddressState'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientRetirementDate'){
                    formData['clientRetirementDate'] = newFormData.fields[findex]['value'];
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
        /*if(!this.state.enableNext){
            return;
        }*/

        let formData = MyDetailsInformationSubForm.FnCreateFormData({
            clientPrimaryContactNumber: this.state.formData['clientPrimaryContactNumber'],
            clientSecondaryContactNumber: this.state.formData['clientSecondaryContactNumber'],
            clientWorkContactNumber: this.state.formData['clientWorkContactNumber'],
            clientEmailAddress: this.state.formData['clientEmailAddress'],
            clientSecondaryEmailAddress: this.state.formData['clientSecondaryEmailAddress'],
            clientAddressFirstLine: this.state.formData['clientAddressFirstLine'],
            clientAddressSecondLine: this.state.formData['clientAddressSecondLine'],
            clientAddressCity: this.state.formData['clientAddressCity'],
            clientAddressPostalCode: this.state.formData['clientAddressPostalCode'],
            clientAddressCountry: this.state.formData['clientAddressCountry'],
            clientAddressState: this.state.formData['clientAddressState'],
            clientRetirementDate: this.state.formData['clientRetirementDate']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionSpousePartnerHasSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("ClientInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Client Details</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Phone Number - Primary">
                                <PhoneNumber value={this.state.formData.clientPrimaryContactNumber} name="clientPrimaryContactNumber" onChange={(event) => this.handleInputChange(event)}></PhoneNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Phone Number - Secondary">
                                <PhoneNumber value={this.state.formData.clientSecondaryContactNumber} name="clientSecondaryContactNumber" onChange={(event) => this.handleInputChange(event)}></PhoneNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Phone Number - Work">
                                <PhoneNumber value={this.state.formData.clientWorkContactNumber} name="clientWorkContactNumber" onChange={(event) => this.handleInputChange(event)}></PhoneNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Email Address - Primary">
                                <Email value={this.state.formData.clientEmailAddress} name="clientEmailAddress" onChange={(event) => this.handleInputChange(event)}></Email>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Email Address - Other">
                                <Email value={this.state.formData.clientSecondaryEmailAddress} name="clientSecondaryEmailAddress" onChange={(event) => this.handleInputChange(event)}></Email>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Address">
                                <Input placeholder="Address Line1" size={'large'} value={this.state.formData.clientAddressFirstLine} name="clientAddressFirstLine" onChange={(event) => this.handleInputChange(event)}/>
                                <Input placeholder="Address Line2" size={'large'} value={this.state.formData.clientAddressSecondLine} name="clientAddressSecondLine" onChange={(event) => this.handleInputChange(event)}/>
                                <Input placeholder="City / District" size={'large'} value={this.state.formData.clientAddressCity} name="clientAddressCity" onChange={(event) => this.handleInputChange(event)}/>
                                <Input placeholder="Postal Code" size={'large'} value={this.state.formData.clientAddressPostalCode} name="clientAddressPostalCode" onChange={(event) => this.handleInputChange(event)}/>
                                <Select
                                    showSearch
                                    placeholder="Select Country"
                                    value={this.state.formData.clientAddressCountry}
                                    onChange={(value) => this.handleSelectChange("clientAddressCountry", value)}
                                    size={'large'}
                                >
                                    <Option value="Aunt">Alabama</Option>
                                    <Option value="Charity">Arkansas</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date of Retirement">
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('clientRetirementDate', date, dateString)}
                                    size={'large'}
                                    value={this.state.formData.clientRetirementDate == null || this.state.formData.clientRetirementDate == '' ? null : moment(this.state.formData.clientRetirementDate, dateFormat)}
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
                        <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(MyDetailsInformationSubForm);