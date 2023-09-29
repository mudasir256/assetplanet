import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, DatePicker, Radio, Icon } from 'antd';
import moment from 'moment';
const dateFormat = 'MM/DD/YYYY';



const formID = "MyInformationSubForm";
class MyInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'My Information',
            fields: [
                {
                    id: 'clientFirstName',
                    title: 'Client First Name',
                    value: data['clientFirstName']
                },
                {
                    id: 'clientLastName',
                    title: 'Client Last Name',
                    value: data['clientLastName']
                },
                {
                    id: 'clientBirthdate',
                    title: 'Client Date of Birth',
                    value: data['clientBirthdate']
                },
                {
                    id: 'clientGender',
                    title: 'Gender',
                    value: data['clientGender']
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
                clientFirstName: '',
                clientLastName: '',
                clientBirthdate: '',
                clientGender: ''
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
                if(newFormData.fields[findex]['id'] == 'clientFirstName'){
                    formData['clientFirstName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'clientLastName'){
                    formData['clientLastName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientBirthdate'){
                    formData['clientBirthdate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'clientGender'){
                    formData['clientGender'] = newFormData.fields[findex]['value'];
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

        let formData = MyInformationSubForm.FnCreateFormData({
            clientFirstName: this.state.formData['clientFirstName'],
            clientLastName: this.state.formData['clientLastName'],
            clientBirthdate: this.state.formData['clientBirthdate'],
            clientGender: this.state.formData['clientGender']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionSpousePartnerHasSubForm");

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">My Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client First Name">
                                <Input 
                                    value={this.state.formData.clientFirstName}
                                    name="clientFirstName"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Last Name">
                                <Input 
                                    value={this.state.formData.clientLastName} 
                                    name="clientLastName" 
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Date of Birth">
                                <DatePicker 
                                    style={{ width: '100%' }}
                                    size={'large'}
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('clientBirthdate', date, dateString)}
                                    value={this.state.formData.clientBirthdate == null || this.state.formData.clientBirthdate == '' ? null : moment(this.state.formData.clientBirthdate, dateFormat)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Gender">
                                <Radio.Group 
                                    name="clientGender"
                                    size={'large'}
                                    onChange={this.handleInputChange} 
                                    value={this.state.formData.clientGender}
                                >
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
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


export default connect()(MyInformationSubForm);