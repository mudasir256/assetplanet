import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Icon } from 'antd';

const formID = 'QuestionAddAnotherStudentLoan';
class QuestionAddAnotherStudentLoanSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Add Another Student Loan?',
            fields: [
                {
                    id: 'questionAddAnother',
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
                questionAddAnother: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                questionAddAnother: value
            }
        })

        let formData = QuestionAddAnotherStudentLoanSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("StudentLoanDetails");
        }
        else{
            this.props.cbGoSubForm("TuitionCosts");
        }

        
    }
    
    
    
        goPreviousForm(){
        this.props.cbGoSubForm("WorkStudy");
       
    }


    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Add Another Student Loan?</h4>
                    {/* <p>Additional Principal Payments?</p> */}
                    <Row gutter={16}>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('questionAddAnother', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('questionAddAnother', 'No')}>No</Button>
                        </Col>


<Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAddAnotherStudentLoanSubForm);