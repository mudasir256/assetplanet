import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionAddChildSubForm';
class QuestionAddChildSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Are you adopting?',
            fields: [
                {
                    id: 'isAdopting',
                    title: '',
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
                isAdopting: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isAdopting: value
            }
        })

        let formData = QuestionAddChildSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("AdoptionSubForm");
        }
        else{
            this.props.cbGoSubForm("BirthDetailSubForm");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Are you adopting?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAdopting', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAdopting', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAddChildSubForm);