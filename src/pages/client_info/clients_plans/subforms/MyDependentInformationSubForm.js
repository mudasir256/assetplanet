import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, DatePicker, Select, Radio, Icon } from 'antd';
import moment from 'moment';
const dateFormat = 'MM/DD/YYYY';
const { Option } = Select;
const relationships = [
    'Family', 'Friend', 'Professional'
]
const child_tax_credits_end_ats = [
    '17 (lives at home - Child Credit)', '24 (Goes to College - Child Credit)', 'Over 17 (Qualifies as Dependent Deduction)'
]
const formID = "MyDependentInformationSubForm";
class MyDependentInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Dependent Information',
            fields: [
                {
                    id: 'dependentFirstName',
                    title: 'Dependent First Name',
                    value: data['dependentFirstName']
                },
                {
                    id: 'dependentLastName',
                    title: 'Dependent Last Name',
                    value: data['dependentLastName']
                },
                {
                    id: 'birthdate',
                    title: 'Date of Birth',
                    value: data['birthdate']
                },
                {
                    id: 'relationship',
                    title: 'Relationship',
                    value: data['relationship']
                },
                {
                    id: 'gender',
                    title: 'Gender',
                    value: data['gender']
                },
                {
                    id: 'disability',
                    title: 'Disability?',
                    value: data['disability']
                },
                {
                    id: 'childTaxCreditsEndAt',
                    title: 'Child Tax Credits End At',
                    value: data['childTaxCreditsEndAt']
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
                if(newFormData.fields[findex]['id'] == 'dependentFirstName'){
                    formData['dependentFirstName'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'dependentLastName'){
                    formData['dependentLastName'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'birthdate'){
                    formData['birthdate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'relationship'){
                    formData['relationship'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'gender'){
                    formData['gender'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'disability'){
                    formData['disability'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'childTaxCreditsEndAt'){
                    formData['childTaxCreditsEndAt'] = newFormData.fields[findex]['value'];
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

        let formData = MyDependentInformationSubForm.FnCreateFormData({
            dependentFirstName: this.state.formData['dependentFirstName'],
            dependentLastName: this.state.formData['dependentLastName'],
            birthdate: this.state.formData['birthdate'],
            relationship: this.state.formData['relationship'],
            gender: this.state.formData['gender'],
            disability: this.state.formData['disability'],
            childTaxCreditsEndAt: this.state.formData['childTaxCreditsEndAt']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("QuestionDependentSubForm");

    }
    goPreviousForm(){
        this.props.cbGoSubForm("MyDetailsInformationSubForm");
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Dependent Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Dependent First Name">
                                <Input 
                                    value={this.state.formData.dependentFirstName}
                                    name="dependentFirstName"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Dependent Last Name">
                                <Input 
                                    value={this.state.formData.dependentLastName} 
                                    name="dependentLastName"
                                    size={'large'} 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Date of Birth">
                                <DatePicker 
                                    style={{ width: '100%' }}
                                    size={'large'} 
                                    format={dateFormat} 
                                    onChange={(date, dateString) => this.handleDatePickerChange('birthdate', date, dateString)}
                                    value={this.state.formData.birthdate == null || this.state.formData.birthdate == '' ? null : moment(this.state.formData.birthdate, dateFormat)}
                                />
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
                            <Form.Item label="Gender">
                                <Radio.Group 
                                    name="gender"
                                    size={'large'} 
                                    onChange={this.handleInputChange} 
                                    value={this.state.formData.gender}
                                >
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Disability?">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.disability}
                                    onChange={(value) => this.handleSelectChange("disability", value)}
                                >
                                    <Option value="Yes">Yes</Option>
                                    <Option value="No">No</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Child Tax Credits End At">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.childTaxCreditsEndAt}
                                    onChange={(value) => this.handleSelectChange("childTaxCreditsEndAt", value)}
                                >
                                {
                                    child_tax_credits_end_ats.map((child_tax_credits_end_at, index) => <Option key={index} value={child_tax_credits_end_at}>{child_tax_credits_end_at}</Option>)
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


export default connect()(MyDependentInformationSubForm);