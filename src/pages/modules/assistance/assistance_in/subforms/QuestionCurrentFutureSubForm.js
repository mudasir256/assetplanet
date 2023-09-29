import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionCurrentFutureSubForm';
class QuestionCurrentFutureSubForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                isCurrent: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isCurrent: value
            }
        })

        let formData = {
            title: 'Current or Future Assistance',
            fields: [
                {
                    id: 'isCurrent',
                    title: '',
                    value: value
                }
            ]
        }

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Current'){
            this.props.cbGoSubForm("CurrentAssistanceSubForm");
        }
        else{
            this.props.cbGoSubForm("FutureAssistanceSubForm");
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Current or Future Assistance</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isCurrent', 'Current')}>Current</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isCurrent', 'Future')}>Future</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionCurrentFutureSubForm);