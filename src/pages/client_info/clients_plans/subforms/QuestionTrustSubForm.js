import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionTrustSubForm';
class QuestionTrustSubForm extends Component {

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
            title: 'Do you have a Trust? (Add another Trust)',
            fields: [
                {
                    id: 'addTrust',
                    title: '',
                    value: value
                }
            ]
        }

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("TrustInformationSubForm");
        }
        else{
            this.props.cbGoSubForm("QuestionCorporationSubForm");
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Do you have a Trust? (Add another Trust)</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5" type="primary" size={'large'} onClick={() => this.handleFormInputChange('addTrust', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('addTrust', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionTrustSubForm);