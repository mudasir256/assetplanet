import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionPredictionSubForm';
class QuestionPredictionSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Would you like to add a Professional Prediction Rate of Return?',
            fields: [
                {
                    id: 'isAddPrediction',
                    title: '',
                    value: data['value']
                }
            ]
        }

        return formData
    }

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                isAddPrediction: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isAddPrediction: value
            }
        })

        let formData = QuestionPredictionSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("ChoosePredictionSubForm");
        }
        else{
            this.props.cbGoSubForm("QuestionOwnRateSubForm");
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Would you like to add a Professional Prediction Rate of Return?</h4>
                    {/* <p>Additional Principal Payments?</p> */}
                    <Row gutter={16}>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('isAddPrediction', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('isAddPrediction', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionPredictionSubForm);