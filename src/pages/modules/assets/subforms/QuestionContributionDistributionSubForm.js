import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'QuestionContributionDistributionSubForm';
class QuestionContributionDistributionSubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Regular Contributions or Distributions',
            fields: [
                {
                    id: 'regularContribution',
                    title: 'Regular Contributions or Distributions',
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
                regularContribution: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                regularContribution: value
            }
        })

        let formData = QuestionContributionDistributionSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        if(value == 'Yes'){
            // this.props.cbGoSubForm("ContributionSubForm");
        }
        else{
            // this.props.cbGoSubForm("AssetAllocationSubForm");
        }

        this.props.cbGoNext(formID);
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Regular Contributions or Distributions</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('regularContribution', 'Yes')}>Yes</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('regularContribution', 'No')}>No</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(QuestionContributionDistributionSubForm);