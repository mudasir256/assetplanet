import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Form, Icon, Button, Row, Col, Select } from 'antd';

import moment from 'moment';
import Currency from '../../../../components/form/Currency';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

const formID = "AutoInsuranceInformationSubForm";
class AutoInsuranceInformationSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Auto Insurance Information',
            fields: [
                {
                    id: 'bodilyInjuryPerIncident',
                    title: 'Bodily Injury Per Person',
                    value: data['bodilyInjuryPerIncident']
                },
                {
                    id: 'bodilyInjuryAggregate',
                    title: 'Bodily Injury per Occurrence',
                    value: data['bodilyInjuryAggregate']
                },
                {
                    id: 'propertyDamagePerIncident',
                    title: 'Property Damage per Occurrence',
                    value: data['propertyDamagePerIncident']
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
                bodilyInjuryPerIncident: '',
                bodilyInjuryAggregate: '',
                propertyDamagePerIncident: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
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
                if(newFormData.fields[findex]['id'] == 'bodilyInjuryPerIncident'){
                    formData['bodilyInjuryPerIncident'] = newFormData.fields[findex]['value'];
                }   
                if(newFormData.fields[findex]['id'] == 'bodilyInjuryAggregate'){
                    formData['bodilyInjuryAggregate'] = newFormData.fields[findex]['value'];
                }  
                if(newFormData.fields[findex]['id'] == 'propertyDamagePerIncident'){
                    formData['propertyDamagePerIncident'] = newFormData.fields[findex]['value'];
                }  
            }
    
            let enableNext = false;
            if(formData['static'] != ''){
                enableNext = true;
            }

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

        if(formData['static'] != ''){
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


    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let formData = AutoInsuranceInformationSubForm.FnCreateFormData({
            bodilyInjuryPerIncident: this.state.formData['bodilyInjuryPerIncident'],
            bodilyInjuryAggregate: this.state.formData['bodilyInjuryAggregate'],
            propertyDamagePerIncident: this.state.formData['propertyDamagePerIncident']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);
        if(!bEnd){
            // this.props.cbGoSubForm("FinancialInformationSubForm");
            this.props.cbGoNext(formID);
        }
        
               
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("FinancialInformationSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Auto Insurance Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Bodily Injury Per Person">
                                <Currency 
                                    value={this.state.formData.bodilyInjuryPerIncident} 
                                    name="bodilyInjuryPerIncident" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Bodily Injury per Occurrence">
                                <Currency 
                                    value={this.state.formData.bodilyInjuryAggregate} 
                                    name="bodilyInjuryAggregate" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Property Damage per Occurrence">
                                <Currency 
                                    value={this.state.formData.propertyDamagePerIncident} 
                                    name="propertyDamagePerIncident" 
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


export default connect()(AutoInsuranceInformationSubForm);