import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col } from 'antd';

const formID = 'PropertySubForm';
class PropertySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Type of property',
            fields: [
                {
                    id: 'propertyType',
                    title: 'Type of property',
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
                propertyType: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
    }

    handleFormInputChange(name, value){
        this.setState({
            formData: {
                propertyType: value
            }
        })

        let formData = PropertySubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        // this.props.cbGoSubForm("InvestmentPropertySubForm");
        this.props.cbGoNext(formID);
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Type of property</h2>
                        </Col>
                        <Col span={12} className="d-flex align-items-center justify-content-end">
                            <Button className="pl-4 pr-4 mr-5"  type="primary" size={'large'} onClick={() => this.handleFormInputChange('propertyType', 'Residential')}>Residential</Button>
                        </Col>
                        <Col span={12}>
                            <Button className="pl-4 pr-4" type="primary" size={'large'} onClick={() => this.handleFormInputChange('propertyType', 'Commercial')}>Commercial</Button>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(PropertySubForm);