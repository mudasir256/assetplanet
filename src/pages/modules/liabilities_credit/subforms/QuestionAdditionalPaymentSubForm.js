import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionAdditionalPaymentSubForm';
class QuestionAdditionalPaymentSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Additional Principal Payments?',
            fields: [
                {
                    id: 'isAdditionalPayment',
                    title: 'Additional Principal Payments?',
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
                isAdditionalPayment: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isAdditionalPayment: value
            }
        })

        let formData = QuestionAdditionalPaymentSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("AdditionalPaymentInformationSubForm");
        }
        else{
            this.props.cbGoSubForm("EndSubForm");
        }

        this.props.cbGoNext(formID);
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Additional Principal Payments?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAdditionalPayment', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAdditionalPayment', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAdditionalPaymentSubForm);