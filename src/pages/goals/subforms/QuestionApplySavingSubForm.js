import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionApplySavingSubForm';
class QuestionApplySavingSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Would you like to apply savings to a goal?',
            fields: [
                {
                    id: 'isApplySaving',
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
                isApplySaving: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isApplySaving: value
            }
        })

        let formData = QuestionApplySavingSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("AssignSavingsToGoalSubForm");
        }
        else{
            this.props.cbGoSubForm("QuestionLoanSubForm");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Would you like to apply savings to a goal?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isApplySaving', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isApplySaving', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionApplySavingSubForm);