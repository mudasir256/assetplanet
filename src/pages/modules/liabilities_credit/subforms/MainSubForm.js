import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col, Input, Select, Form, Icon } from 'antd';
import { OWNERS } from 'constants/types';

const { Option } = Select;

const getDynamicInfo = function(liabilityType){
    let mainTitle = '';
    let fieldTitle = '';
    switch(liabilityType){
        case "Credit - HELOC":
        case "Credit Card - Personal":
            mainTitle = 'Credit';
            fieldTitle = 'Nickname of Credit';
            break;
        default: 
            mainTitle = 'Liabilities';
            fieldTitle = 'Nickname of Liabilities';                
    }

    return {
        mainTitle: mainTitle,
        fieldTitle: fieldTitle
    }
}

const formID = 'MainSubForm';
class MainSubForm extends Component {

    static FnCreateFormData(data){        
        let dynInfo = getDynamicInfo(data.liabilityType);
        
        let formData = {
            title: dynInfo.mainTitle,
            fields: [
                {
                    id: 'name',
                    title: dynInfo.fieldTitle,
                    value: data['name']
                },
                {
                    id: 'owner',
                    title: 'Owner',
                    value: data['owner']
                }
            ]
        }
    
        return formData;
    }


    constructor(props) {
        super(props);

        let liabilityTypeField = this.props.cbGetSubFormField('LiabilityCreditTypeSubForm', 'liabilityCreditType');
        let mainTitle = '';
        let fieldTitle = '';
        if(liabilityTypeField != null){
            let dynInfo = getDynamicInfo(liabilityTypeField.value);
            mainTitle = dynInfo.mainTitle;
            fieldTitle = dynInfo.fieldTitle;
        }

        this.state = {
            enableNext: false,
            formData: {
                name: '',
                owner: ''
            },
            mainTitle: mainTitle,
            fieldTitle: fieldTitle
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'name'){
                    formData['name'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'owner'){
                    formData['owner'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['name'] != '' && formData['liabilityType'] != '' && formData['owner'] != ''){
                enableNext = true;
            }

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

        if(formData['name'] != '' && formData['liabilityType'] != '' && formData['owner'] != ''){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

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

    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        var liabilityTypeField = this.props.cbGetSubFormField('LiabilityCreditTypeSubForm', 'liabilityCreditType');

        let formData;

        if(liabilityTypeField != null){
            formData = MainSubForm.FnCreateFormData({
                liabilityType: liabilityTypeField.value,
                name: this.state.formData['name'],
                owner: this.state.formData['owner']
            })
        }

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);
        
        if(!bEnd){
            switch(liabilityTypeField.value){
                case "Credit - HELOC":
                case "Credit Card - Business":
                case "Credit Card - Peresonal":
                    this.props.cbGoSubForm("CreditCardInformationSubForm");
                    break;
                default: 
                    this.props.cbGoSubForm("LoanInformationSubForm");
            }

            this.props.cbGoNext(formID);
        }
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("LiabilityCreditTypeSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">{ this.state.mainTitle }</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label={this.state.fieldTitle}>
                                <Input value={this.state.formData.name} size={'large'} name="name" onChange={(event) => this.handleInputChange(event)}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Owner">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.owner}
                                    onChange={(value) => this.handleSelectChange("owner", value)}
                                    size={'large'}
                                >
                                {
                                    OWNERS.map((owner, index) => <Option key={index} value={owner}>{owner}</Option>)
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


export default connect()(MainSubForm);

