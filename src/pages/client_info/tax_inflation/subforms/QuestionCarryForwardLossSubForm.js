import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionCarryForwardLossSubForm';
class QuestionCarryForwardLossSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Do you have Carry Forward Loss?',
            fields: [
                {
                    id: 'haveCarryForwardLoss',
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
                haveCarryForwardLoss: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value) {
        this.setState({
            formData: {
                haveCarryForwardLoss: value
            }
        })

        let formData = QuestionCarryForwardLossSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);


        if (value == 'Yes') {
            this.props.cbGoSubForm("CarryForwardInformationSubForm");
        }
        else {
            this.props.cbGoSubForm("InflationsSubForm");
        }


    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16} className="mt-2">
                        <Col span={24}>
                            <h4 className="title text-center">Do you have Carry Forward Loss?</h4>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button type="primary" onClick={() => this.handleFormInputChange('haveCarryForwardLoss', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('haveCarryForwardLoss', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>

        )
    }
}


export default connect()(QuestionCarryForwardLossSubForm);