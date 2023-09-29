import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, DatePicker, Radio, Icon } from 'antd';
import Email from '../../../../components/form/Email';
import moment from 'moment';
const dateFormat = 'MM/DD/YYYY';



const formID = "MySpouseInformationSubForm";
class MySpouseInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Spouse/Partner Information',
            fields: [
                {
                    id: 'spouseFirstName',
                    title: 'Spouse First Name',
                    value: data['spouseFirstName']
                },
                {
                    id: 'spouseLastName',
                    title: 'Spouse Last Name',
                    value: data['spouseLastName']
                },
                {
                    id: 'spouseBirthdate',
                    title: 'Spouse Date of Birth',
                    value: data['spouseBirthdate']
                },
                {
                    id: 'spouseGender',
                    title: 'Gender',
                    value: data['spouseGender']
                },
                {
                    id: 'spouseEmailAddress',
                    title: 'Spouse/Partner Email Address - Primary',
                    value: data['spouseEmailAddress']
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
                spouseFirstName: '',
                spouseLastName: '',
                spouseBirthdate: '',
                spouseGender: '',
                spouseEmailAddress: ''
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
                if(newFormData.fields[findex]['id'] == 'spouseFirstName'){
                    formData['spouseFirstName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'spouseLastName'){
                    formData['spouseLastName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'spouseBirthdate'){
                    formData['spouseBirthdate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'spouseGender'){
                    formData['spouseGender'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'spouseEmailAddress'){
                    formData['spouseEmailAddress'] = newFormData.fields[findex]['value'];
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

        let formData = MySpouseInformationSubForm.FnCreateFormData({
            spouseFirstName: this.state.formData['spouseFirstName'],
            spouseLastName: this.state.formData['spouseLastName'],
            spouseBirthdate: this.state.formData['spouseBirthdate'],
            spouseGender: this.state.formData['spouseGender'],
            spouseEmailAddress: this.state.formData['spouseEmailAddress']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("MyDetailsInformationSubForm");

    }

    goPreviousForm(){
        this.props.cbGoSubForm("MyInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Spouse/Partner Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center"> 
                        <Col span={16}>
                            <Form.Item label="Spouse/Partner First Name">
                                <Input 
                                    value={this.state.formData.spouseFirstName} 
                                    name="spouseFirstName" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse/Partner Last Name">
                                <Input 
                                    value={this.state.formData.spouseLastName} 
                                    name="spouseLastName"
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse/Partner Date of Birth">
                                <DatePicker 
                                    style={{ width: '100%' }}
                                    size={'large'} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('spouseBirthdate', date, dateString)}
                                    value={this.state.formData.spouseBirthdate == null || this.state.formData.spouseBirthdate == '' ? null : moment(this.state.formData.spouseBirthdate, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Gender">
                                <Radio.Group 
                                    name="spouseGender"
                                    size={'large'} 
                                    onChange={this.handleInputChange} 
                                    value={this.state.formData.spouseGender}
                                >
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse/Partner Email Address - Primary">
                                <Email 
                                    value={this.state.formData.spouseEmailAddress} 
                                    name="spouseEmailAddress"
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


export default connect()(MySpouseInformationSubForm);