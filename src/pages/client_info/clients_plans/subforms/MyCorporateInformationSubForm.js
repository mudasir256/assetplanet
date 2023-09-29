import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, DatePicker, Select, Icon } from 'antd';
import moment from 'moment';

import { STATES } from 'constants/types';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

const formID = "MyCorporateInformationSubForm";
class MyCorporateInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Corporate Information',
            fields: [
                {
                    id: 'corporateName',
                    title: 'Corporate Name',
                    value: data['corporateName']
                },
                {
                    id: 'corporateType',
                    title: 'Corporate Type',
                    value: data['corporateType']
                },
                {
                    id: 'dateCreated',
                    title: 'Date Created',
                    value: data['dateCreated']
                },
                {
                    id: 'stateIncorporated',
                    title: 'State Incorporated',
                    value: data['stateIncorporated']
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
                corporateName: '',
                corporateType: '',
                dateCreated: '',
                stateIncorporated: ''
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
                if(newFormData.fields[findex]['id'] == 'corporateName'){
                    formData['corporateName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'corporateType'){
                    formData['corporateType'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'dateCreated'){
                    formData['dateCreated'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'stateIncorporated'){
                    formData['stateIncorporated'] = newFormData.fields[findex]['value'];
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

        let formData = MyCorporateInformationSubForm.FnCreateFormData({
            corporateName: this.state.formData['corporateName'],
            corporateType: this.state.formData['corporateType'],
            dateCreated: this.state.formData['dateCreated'],
            stateIncorporated: this.state.formData['stateIncorporated']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionCorporationSubForm");

    }
    goPreviousForm(){
        this.props.cbGoSubForm("MyTrustInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Corporate Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Corporate Name">
                                <Input 
                                    value={this.state.formData.corporateName} 
                                    name="corporateName"
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Corporate Type">
                                <Input 
                                    value={this.state.formData.corporateType} 
                                    name="corporateType" 
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date Created">
                                <DatePicker 
                                    style={{ width: '100%' }}
                                    size={'large'} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('dateCreated', date, dateString)}
                                    value={this.state.formData.dateCreated == null || this.state.formData.dateCreated == '' ? null : moment(this.state.formData.dateCreated, dateFormat)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="State Incorporated">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.stateIncorporated}
                                    onChange={(value) => this.handleSelectChange("stateIncorporated", value)}
                                >
                                {
                                    STATES.map((state, index) => <Option key={index} value={state}>{state}</Option>)
                                }
                                </Select>
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


export default connect()(MyCorporateInformationSubForm);