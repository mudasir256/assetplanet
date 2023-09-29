import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionOwnRateSubForm';
class QuestionOwnRateSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Would you like to Define your own Rate of Return?',
            fields: [
                {
                    id: 'isDefineRate',
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
                isDefineRate: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isDefineRate: value
            }
        })

        let formData = QuestionOwnRateSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("UserDefinedSubForm");
        }
        else{
            this.props.cbGoSubForm("QuestionMonteCarloSubForm");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Would you like to Define your own Rate of Return?</h4>
                    {/* <p>Additional Principal Payments?</p> */}
                    <Row gutter={16}>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('isDefineRate', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('isDefineRate', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionOwnRateSubForm);