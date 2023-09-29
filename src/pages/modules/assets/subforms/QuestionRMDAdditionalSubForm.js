import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

import QuestionContributionDistributionSubForm from './QuestionContributionDistributionSubForm';

const formID = 'QuestionRMDAdditionalSubForm';
class QuestionRMDAdditionalSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Is Spouse / Partner Sole Beneficiary?',
            fields: [
                {
                    id: 'isSpouseSole',
                    title: 'Is Spouse Sole Beneficiary?',
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
                isSpouseSole: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isSpouseSole: value
            }
        })

        let formData = QuestionRMDAdditionalSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        var field = this.props.cbGetSubFormField('AssetInformationSubForm', 'accountType');
        
        console.log('field:', field);
        // if(field != null){
        //     if(field['value'] == 'IRA Inherited'){
        //         this.props.cbGoSubForm("InheritedIRASubForm");
        //         return;        
        //     }
        // }
        // this.props.cbGoSubForm("QuestionContributionDistributionSubForm");
        this.props.cbGoNext(formID);
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Is Spouse \ Partner Sole Beneficiary?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isSpouseSole', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isSpouseSole', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionRMDAdditionalSubForm);