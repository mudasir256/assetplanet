import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionLoanSubForm';
class QuestionLoanSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Will you need a loan for this goal?',
            fields: [
                {
                    id: 'isLoan',
                    title: '',
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
                isLoan: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isLoan: value
            }
        })

        let formData = QuestionLoanSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("LoanGoalForm");
        }
        else{
            this.props.cbGoSubForm("EndSubForm");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Will you need a loan for this goal?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isLoan', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isLoan', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionLoanSubForm);