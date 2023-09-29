import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button, Row, Col, Input, Icon } from 'antd';

const formID = "ClientSpouseInformationSubForm";
class ClientSpouseInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Spouse Information',
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
                    id: 'spouseFirstName',
                    title: 'Spouse / Partner First Name',
                    value: data['spouseFirstName']
                },
                {
                    id: 'spouseLastName',
                    title: 'Spouse / Partner Last Name',
                    value: data['spouseLastName']
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
                spouseFirstName: '',
                spouseLastName: ''
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
                if(newFormData.fields[findex]['id'] == 'spouseFirstName'){
                    formData['spouseFirstName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'spouseLastName'){
                    formData['spouseLastName'] = newFormData.fields[findex]['value'];
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

    console.log("propsssssssssssssssssssssssssssssssssssssss form dfata",this.state.formData);


        let formData = ClientSpouseInformationSubForm.FnCreateFormData({
            clientFirstName: this.state.formData['clientFirstName'],
            clientLastName: this.state.formData['clientLastName'],
            spouseFirstName: this.state.formData['spouseFirstName'],
            spouseLastName: this.state.formData['spouseLastName']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("DependentsSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Spouse and Client</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Client First Name">
                                <Input value={this.state.formData.clientFirstName} size={'large'} name="clientFirstName" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Client Last Name">
                                <Input value={this.state.formData.clientLastName} size={'large'} name="clientLastName" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Spouse / Partner First Name">
                                <Input value={this.state.formData.spouseFirstName} size={'large'} name="spouseFirstName" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Spouse / Partner Last Name">
                                <Input value={this.state.formData.spouseLastName} size={'large'} name="spouseLastName" onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(ClientSpouseInformationSubForm);