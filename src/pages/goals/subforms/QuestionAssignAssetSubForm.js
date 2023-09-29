import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionAssignAssetSubForm';
class QuestionAssignAssetSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Would you like to assign an asset to a goal?',
            fields: [
                {
                    id: 'isAssignAsset',
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
                isAssignAsset: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                isAssignAsset: value
            }
        })

        let formData = QuestionAssignAssetSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            this.props.cbGoSubForm("AssetsToGoalSubForm");
        }
        else{
            this.props.cbGoSubForm("QuestionApplySavingSubForm");
        }

        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Would you like to assign an asset to a goal?</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAssignAsset', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('isAssignAsset', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionAssignAssetSubForm);