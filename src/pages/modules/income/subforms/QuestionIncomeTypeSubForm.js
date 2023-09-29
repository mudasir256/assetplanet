import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionIncomeTypeSubForm';
class QuestionIncomeTypeSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Type of Employment Income',
            fields: [
                {
                    id: 'typeEmployementIncome',
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
                typeEmployementIncome: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                typeEmployementIncome: value
            }
        })

        let formData = QuestionIncomeTypeSubForm.FnCreateFormData({
            value: this.state.formData['typeEmployementIncome']
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Employee (W-2)'){
            this.props.cbGoSubForm("W2IncomeSubForm");
        }
        else{
            this.props.cbGoSubForm("IndependantIncomeSubForm");
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Type of Employment Income</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('typeEmployementIncome', 'Employee (W-2)')}>Employee (W-2)</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('typeEmployementIncome', 'Indpendent Contractor (1099)')}>Indpendent Contractor (1099)</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionIncomeTypeSubForm);