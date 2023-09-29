import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';

const options = [
    'Friends / Family', 'Contributions / Savings', 'Student Loan', 'Scholorships / Grants', 'Personal Loan', 'Assign an Asset'
];

const formID = "TuitionPaymentSubForm";
class TuitionPaymentSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'How are you paying for the Tuition?',
            fields: [
                {
                    id: 'howWillYouPay',
                    title: 'How are you paying for the Tuition?',
                    value: data['value']
                }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                howWillYouPay: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        if(newFormData.hasOwnProperty('fields')){
            this.setState({
                formData: {
                    assetsAllocation: newFormData['fields'][0]['value']
                }
            })
        }
    }

    handleFormInputChange(name, value){        
        this.setState({
            formData: {
                howWillYouPay: value
            }
        })

        let formData = TuitionPaymentSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        let nextSubFormID = "";
        switch(value){
            case "Friends / Family":
                nextSubFormID = "AssistanceReceivedEducationSubForm";
                break;
            case "Contributions / Savings":
                nextSubFormID = "AssignSavingsToGoalSubForm";
                break;
            case "Student Loan":
                nextSubFormID = "StudentLoanSubForm";
                break;
            case "Scholorships / Grants":
                nextSubFormID = "FinancialAssistanceSubForm";
                break;
            case "Personal Loan":
                nextSubFormID = "LoanSubForm";
                break;
            case "Assign an Asset":
                nextSubFormID = "AssignSavingsToGoalSubForm";
                break;
        }

        this.props.cbGoSubForm(nextSubFormID);
    }

    render() {
        
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">How are you paying for the Tuition?</h2>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <div className="buttons-container">
                        {
                            options.map((option, index) => {
                                let className = 'button-wrap';
                                if(this.state.formData['assetsAllocation'] === option){
                                    className = className + ' selected';
                                }
                                return (
                                    <div key={index} className={className} onClick={() => this.handleFormInputChange('howWillYouPay', option)}>
                                        {option}
                                    </div>
                                    
                                )
                            })
                        }
                        </div>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(TuitionPaymentSubForm);