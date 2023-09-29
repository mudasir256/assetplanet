import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Button, Row, Col, Input, DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const formID = "ClientInformationSubForm";
class ClientInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Client Information',
            fields: [
                {
                    id: 'clientBirthdate',
                    title: 'Client Birthdate',
                    value: data['clientBirthdate']
                },
                {
                    id: 'yearDeath',
                    title: 'Cient Estimated Year of Death',
                    value: data['yearDeath']
                },
                {
                    id: 'yearRetirement',
                    title: 'Client Estimated Year of Retirement',
                    value: data['yearRetirement']
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
                clientBirthdate: '',
                yearDeath: '',
                yearRetirement: ''
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
                if(newFormData.fields[findex]['id'] == 'clientBirthdate'){
                    formData['clientBirthdate'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'yearDeath'){
                    formData['yearDeath'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'yearRetirement'){
                    formData['yearRetirement'] = newFormData.fields[findex]['value'];
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

        let formData = ClientInformationSubForm.FnCreateFormData({
            clientBirthdate: this.state.formData['clientBirthdate'],
            yearDeath: this.state.formData['yearDeath'],
            yearRetirement: this.state.formData['yearRetirement']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("ItemsRelatedSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Client Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Birthdate">                                    
                                <DatePicker
                                    style={{ width: '100%' }} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('clientBirthdate', date, dateString)}
                                    value={this.state.formData.clientBirthdate == '' ? null : moment(this.state.formData.clientBirthdate, dateFormat)}
                                    size={'large'}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Cient Estimated Year of Death">   
                                <Input value={this.state.formData.yearDeath} name="yearDeath" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client Estimated Year of Retirement">   
                                <Input value={this.state.formData.yearRetirement} name="yearRetirement" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(ClientInformationSubForm);