import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col, Select, Form, Icon } from 'antd';

const { Option } = Select;

const loanTypes = [
    "Fixed", "Adjustable"
]

const loanPaybackTypes = [
    "Principal and Interest", "Interest Only"
]
const formID = 'LoanPaybackSubForm';
class LoanPaybackSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Loan Payback Type',
            fields: [
                {
                    id: 'loanPaybackType',
                    title: 'Loan Payback Type',
                    value: data['loanPaybackType']
                },
                {
                    id: 'loanType',
                    title: 'Type of Loan',
                    value: data['loanType']
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
                loanPaybackType: '',
                loanType: '',
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
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
                if(newFormData.fields[findex]['id'] == 'loanPaybackType'){
                    formData['loanPaybackType'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'loanType'){
                    formData['loanType'] = newFormData.fields[findex]['value'];
                }
            }
    
            let enableNext = false;
            if(formData['loanPaybackType'] != '' && formData['loanType'] != ''){
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

        if(formData['loanPaybackType'] != '' && formData['loanType'] != ''){
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

        let formData = LoanPaybackSubForm.FnCreateFormData({
            loanPaybackType: this.state.formData['loanPaybackType'],
            loanType: this.state.formData['loanType']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            switch(this.state.formData['loanType']){
                case "Fixed":
                    this.props.cbGoSubForm("QuestionAdditionalPaymentSubForm");
                    break;
                case "Adjustable":
                    this.props.cbGoSubForm("AdjustableLoanDetailsSubForm");
            }
            this.props.cbGoNext(formID);
        }        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("LoanInformationSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Loan Payback Type</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Loan Payback Type">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.loanPaybackType}
                                    onChange={(value) => this.handleSelectChange("loanPaybackType", value)}
                                    size={'large'}
                                >
                                {
                                    loanPaybackTypes.map((loanPaybackType, index) => <Option key={index} value={loanPaybackType}>{loanPaybackType}</Option>)
                                }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Type of Loan">
                                <Select
                                    showSearch
                                    placeholder="-Select-"
                                    value={this.state.formData.loanType}
                                    onChange={(value) => this.handleSelectChange("loanType", value)}
                                    size={'large'}
                                >
                                {
                                    loanTypes.map((loanType, index) => <Option key={index} value={loanType}>{loanType}</Option>)
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


export default connect()(LoanPaybackSubForm);