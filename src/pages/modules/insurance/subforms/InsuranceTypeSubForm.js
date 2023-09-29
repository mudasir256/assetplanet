import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col } from 'antd';
import Trust from '../../../../assets/images/latest/Trust.png'
import Insurance from '../../../../assets/images/latest/Insurance.png'
import Networth2 from '../../../../assets/images/latest/Networth2.png'
import Vacation from '../../../../assets/images/latest/Vacation-Home.png'
import { INSURANCE_TYPES, INSURANCE_TYPES_ANNUITY, INSURANCE_TYPES_LIFE_HEALTH, INSURANCE_TYPES_PROPERTY_CASUALTY, INSURANCE_TYPES_LONG_TERM_CARE } from 'constants/types';

const formID = "InsuranceTypeSubForm";
class InsuranceTypeSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Select the Type of Insurance',
            fields: [
                {
                    id: 'insuranceType',
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
                insuranceType: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
        console.log('updateformdata:', newFormData);
        if (newFormData.hasOwnProperty('fields')) {
            this.setState({
                formData: {
                    insuranceType: newFormData['fields'][0]['value']
                }
            })
        }
    }

    handleFormInputChange(name, value) {
        this.setState({
            formData: {
                insuranceType: value
            }
        })

        let formData = InsuranceTypeSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        // this.props.cbGoSubForm('ProductInformationSubForm');
        this.props.cbGoNext(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Select the Type of Insurance</h2>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <h3 className="text-center font-weight-bold insurace-group-title">Annuity</h3>
                            <div className="buttons-container">
                                <div className={'button-wrap-cust'}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12'>
                                            <img src={Trust} height="80px" width="80px" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    INSURANCE_TYPES_ANNUITY.map((insuranceType, index) => {
                                        let className = 'button-wrap width--full';
                                        if (this.state.formData['insuranceType'] == insuranceType.name) {
                                            className = className + ' selected';
                                        }

                                        return (
                                            <div key={index} className={className} onClick={() => this.handleFormInputChange('insuranceType', insuranceType.name)}>
                                                {insuranceType.name}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col span={6}>
                            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Life and Health</h3>
                            <div className="buttons-container">
                                {/* <div className={'button-wrap-cust'} style={{ width: '100%' }}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12'>
                                            <img src={Insurance} height='100px' width='80px' />
                                        </div>
                                    </div>
                                </div> */}
                                <div className={'button-wrap-cust'} style={{ width: '100%' }}>
                                    <div className='col-12'>
                                        <img src={Insurance} height="80px" width="80px" />
                                    </div>
                                </div>
                                {
                                    INSURANCE_TYPES_LIFE_HEALTH.map((insuranceType, index) => {
                                        let className = 'button-wrap width--full';
                                        if (this.state.formData['insuranceType'] == insuranceType.name) {
                                            className = className + ' selected';
                                        }

                                        return (
                                            <div key={index} className={className} onClick={() => this.handleFormInputChange('insuranceType', insuranceType.name)}>
                                                {insuranceType.name}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col span={6}>
                            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Property and Casualty</h3>
                            <div className="buttons-container">
                                <div className={'button-wrap-cust'}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12'>
                                            <img src={Networth2} height="80px" width="80px" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    INSURANCE_TYPES_PROPERTY_CASUALTY.map((insuranceType, index) => {
                                        let className = 'button-wrap width--full';
                                        if (this.state.formData['insuranceType'] == insuranceType.name) {
                                            className = className + ' selected';
                                        }

                                        return (
                                            <div key={index} className={className} onClick={() => this.handleFormInputChange('insuranceType', insuranceType.name)}>
                                                {insuranceType.name}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col span={6}>
                            <h3 className="text-center font-weight-bold mb-2 insurace-group-title">Long Term Care</h3>
                            <div className="buttons-container">
                                <div className={'button-wrap-cust'}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div className='col-12'>
                                            <img src={Vacation} height="80px" width="80px" />
                                        </div>
                                    </div>
                                </div>
                                {
                                    INSURANCE_TYPES_LONG_TERM_CARE.map((insuranceType, index) => {
                                        let className = 'button-wrap width--full';
                                        if (this.state.formData['insuranceType'] == insuranceType.name) {
                                            className = className + ' selected';
                                        }

                                        return (
                                            <div key={index} className={className} onClick={() => this.handleFormInputChange('insuranceType', insuranceType.name)}>
                                                {insuranceType.name}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(InsuranceTypeSubForm);