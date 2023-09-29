import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionAssistanceInOutSubForm';
class QuestionAssistanceInOutSubForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                isAssistanceInOut: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isAssistanceInOut: value
            }
        })

        let formData = {
            title: 'Assistance In or Out?',
            fields: [
                {
                    id: 'isAssistanceInOut',
                    title: '',
                    value: value
                }
            ]
        }

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'In'){
            this.props.cbGoSubForm("QuestionCurrentFutureSubForm");
        }
        else{
            this.props.cbGoSubForm("AssistanceOutSubForm");
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Assistance In or Out?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAssistanceInOut', 'In')}>I am currently receiving Assistance</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAssistanceInOut', 'Out')}>I am currently Assisting someone else</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAssistanceInOutSubForm);