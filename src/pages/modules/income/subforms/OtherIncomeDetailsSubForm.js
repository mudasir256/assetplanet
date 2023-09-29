import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Button, Row, Col, Input } from 'antd';


const formID = "OtherIncomeDetailsSubForm";
class OtherIncomeDetailsSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Other Income Details',
            fields: [
                {
                    id: 'otherIncomeType',
                    title: 'Other Income Type',
                    value: data['otherIncomeType']
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
                otherIncomeType: '',
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
                if(newFormData.fields[findex]['id'] == 'otherIncomeType'){
                    formData['otherIncomeType'] = newFormData.fields[findex]['value'];
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

        let formData = OtherIncomeDetailsSubForm.FnCreateFormData({
            otherIncomeType: this.state.formData['otherIncomeType']
        })

        this.props.cbUpdateSubForm(formID, formData);
        
        this.props.cbGoSubForm("IncomeTaxationSubForm");

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Other Income Details</h4>
                     <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Other Income Type">
                                <Input value={this.state.formData.otherIncomeType} name="otherIncomeType" size={'large'} onChange={(event) => this.handleInputChange(event)}/>
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


export default connect()(OtherIncomeDetailsSubForm);