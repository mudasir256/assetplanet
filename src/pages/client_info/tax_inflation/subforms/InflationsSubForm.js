import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Button, Row, Col, Input, Select, Icon } from 'antd';

const { Option } = Select;

const inflations = [
    "Static", "Professional Prediction", "User Defined"
]

const formID = "InflationsSubForm";
class InflationsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Inflation Rates',
            fields: [
                {
                    id: 'generalInflation',
                    title: 'General Inflation',
                    value: data['generalInflation']
                },
                {
                    id: 'generalRate',
                    title: 'Rate',
                    value: data['generalRate']
                },
                {
                    id: 'medicalInflation',
                    title: 'Medical Inflation',
                    value: data['medicalInflation']
                },
                {
                    id: 'medicalRate',
                    title: 'Rate',
                    value: data['medicalRate']
                },
                {
                    id: 'educationInflation',
                    title: 'Education Inflation',
                    value: data['educationInflation']
                },
                {
                    id: 'educationRate',
                    title: 'Rate',
                    value: data['educationRate']
                },
                {
                    id: 'luxuryInflation',
                    title: 'Luxury Inflation',
                    value: data['luxuryInflation']
                },
                {
                    id: 'luxuryRate',
                    title: 'Rate',
                    value: data['luxuryRate']
                },
                {
                    id: 'housingInflation',
                    title: 'Housing Inflation',
                    value: data['housingInflation']
                },
                {
                    id: 'housingRate',
                    title: 'Rate',
                    value: data['housingRate']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: true,
            formData: {
                generalInflation: '',
                generalRate: '',
                medicalInflation: '',
                medicalRate: '',
                educationInflation: '',
                educationRate: '',
                luxuryInflation: '',
                luxuryRate: '',
                housingInflation: '',
                housingRate: ''
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
                if(newFormData.fields[findex]['id'] == 'generalInflation'){
                    formData['generalInflation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'generalRate'){
                    formData['generalRate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'medicalInflation'){
                    formData['medicalInflation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'medicalRate'){
                    formData['medicalRate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'educationInflation'){
                    formData['educationInflation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'educationRate'){
                    formData['educationRate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'luxuryInflation'){
                    formData['luxuryInflation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'luxuryRate'){
                    formData['luxuryRate'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'housingInflation'){
                    formData['housingInflation'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'housingRate'){
                    formData['housingRate'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            // if(formData['committmentDate'] != '' && formData['committmentAmount'] != ''){
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

        // if(formData['committmentDate'] != '' && formData['committmentAmount'] != ''){
        //     newState['enableNext'] = true;
        // }
        // else{
        //     newState['enableNext'] = false;
        // }

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

        let formData = InflationsSubForm.FnCreateFormData({
            generalInflation: this.state.formData['generalInflation'],
            generalRate: this.state.formData['generalRate'],
            medicalInflation: this.state.formData['medicalInflation'],
            medicalRate: this.state.formData['medicalRate'],
            educationInflation: this.state.formData['educationInflation'],
            educationRate: this.state.formData['educationRate'],
            luxuryInflation: this.state.formData['luxuryInflation'],
            luxuryRate: this.state.formData['luxuryRate'],
            housingInflation: this.state.formData['housingInflation'],
            housingRate: this.state.formData['housingRate']
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm("EndSubForm");
               
    }

    goPreviousForm(){
        this.props.cbGoSubForm("AssetAllocationSubForm");
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Inflation Rates</h2>
                        </Col>
                    </Row>
                    <p className="subform-title text-center">General Inflation</p>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="General Inflation">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.generalInflation}
                                    onChange={(value) => this.handleSelectChange("generalInflation", value)}
                                >
                                {
                                    inflations.map((inflation, index) => <Option key={index} value={inflation}>{inflation}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%"
                                    value={this.state.formData.generalRate}
                                    name="generalRate"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <p className="subform-title text-center">Medical Inflation</p>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Medical Inflation">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.medicalInflation}
                                    onChange={(value) => this.handleSelectChange("medicalInflation", value)}
                                >
                                {
                                    inflations.map((inflation, index) => <Option key={index} value={inflation}>{inflation}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%"
                                    value={this.state.formData.medicalRate}
                                    name="medicalRate"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <p className="subform-title text-center">Education Inflation</p>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Education Inflation">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.educationInflation}
                                    onChange={(value) => this.handleSelectChange("educationInflation", value)}
                                >
                                {
                                    inflations.map((inflation, index) => <Option key={index} value={inflation}>{inflation}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%"
                                    value={this.state.formData.educationRate}
                                    name="educationRate"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <p className="subform-title text-center">Luxury Inflation</p>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Luxury Inflation">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.luxuryInflation}
                                    onChange={(value) => this.handleSelectChange("luxuryInflation", value)}
                                >
                                {
                                    inflations.map((inflation, index) => <Option key={index} value={inflation}>{inflation}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%"
                                    value={this.state.formData.luxuryRate}
                                    name="luxuryRate"
                                    size={'large'}
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <p className="subform-title text-center">Housing Inflation</p>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={8}>
                            <Form.Item label="Housing Inflation">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    size={'large'}
                                    value={this.state.formData.housingInflation}
                                    onChange={(value) => this.handleSelectChange("housingInflation", value)}
                                >
                                {
                                    inflations.map((inflation, index) => <Option key={index} value={inflation}>{inflation}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Rate">
                                <Input addonAfter="%"
                                    value={this.state.formData.housingRate}
                                    name="housingRate"
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


export default connect()(InflationsSubForm);