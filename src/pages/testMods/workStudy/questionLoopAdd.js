import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionAddAnotherWorkStudy';
class QuestionAddAnotherWorkStudySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Add Another Work Study',
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

        let formData = QuestionAddAnotherWorkStudySubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("WorkStudy");
        }
        else{
            this.props.cbGoSubForm("TuitionCosts");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <h4 className="title">Add Another Scholarship or Grant?</h4>
                    {/* <p>Additional Principal Payments?</p> */}
                    <Row gutter={16}>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('questionAddAnother', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={() => this.handleFormInputChange('questionAddAnother', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAddAnotherWorkStudySubForm);