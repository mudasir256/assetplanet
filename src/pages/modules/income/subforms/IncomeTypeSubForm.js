import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Row, Col } from 'antd';
import { MODULE_API } from "../../../../apis";

import { INCOME_TYPES, INCOME_TYPES_NON, INCOME_TYPES_GROUP } from 'constants/types';
import Trust from '../../../../assets/images/latest/Trust.png'
import law from '../../../../assets/images/latest/law.png'
import Distributions from '../../../../assets/images/latest/Distributions.png'
import stock from '../../../../assets/images/stock.png'

const formID = "IncomeTypeSubForm";
class IncomeTypeSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Select the Type of Income',
            fields: [
                {
                    id: 'incomeType',
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
                incomeType: ''
            }
        }
        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
        this.getAllIncomeAssets();
    }


    getAllIncomeAssets = async ()=> {
    // setIsLoading(true);
    let data = await MODULE_API.insuraceAllocation("Income")
    if (data && data.data) {
        console.log("data income data", data.data)
        // data.data.map(item => {
        //     if (item.name === "Annuity") {
        //         console.log("item.child", item.child)
        //         setAnnuityData(item.child)
        //     }
        //     if (item.name === "Life and Health") {
        //         setHealthData(item.child)
        //     }
        //     if (item.name === "Property and Casualty") {
        //         setCasualtyData(item.child)
        //     }
        //     if (item.name === "Long Term Care Insurance") {
        //         setDataInsurance(item.child)
        //     }
        // })
    }
    // setIsLoading(false);
}

    updateFormData(newFormData) {
        console.log('updateformdata:', newFormData);
        if (newFormData.hasOwnProperty('fields')) {
            this.setState({
                formData: {
                    incomeType: newFormData['fields'][0]['value']
                }
            })
        }
    }

    handleFormInputChange(name, value) {
        this.setState({
            formData: {
                incomeType: value
            }
        })

        let formData = IncomeTypeSubForm.FnCreateFormData({
            value: value
        })

        this.props.cbUpdateSubForm(formID, formData);

        this.props.cbGoSubForm('IncomeDetailsSubForm');
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Select the Type of Income</h2>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <h2 className="text-center font-weight-bold mb-4">Non-Investment Income</h2>
                            <Col span={8}>
                                <div className="buttons-container">
                                    <div className={'button-wrap-cust'}>
                                        <div style={{ flexDirection: 'column' }}>
                                            <div className='col-12 mt-2'>
                                                <img src={law} height='80px' width='80px' />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        [
                                            // {
                                            //     name: "Alimony",
                                            //     type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            // },
                                            {
                                                name: "Distribution from Asset",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Insurance Payout",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Settlement (Structured or Lump)",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                        ].map((incomeType, index) => {

                                            let className = 'button-wrap';
                                            if (this.state.formData['incomeType'] == incomeType.name) {
                                                className = className + ' selected';
                                            }

                                            // if (incomeType.type == INCOME_TYPES_GROUP.TYPICAL) {
                                            //     className = className + ' bk--yellow';
                                            // }

                                            return (
                                                <div key={index} className={className} onClick={() => this.handleFormInputChange('incomeType', incomeType.name)}>
                                                    {incomeType.name}
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </Col>

                            <Col span={8}>
                                <div className="buttons-container">
                                    <div className={'button-wrap-cust'}>
                                        <div style={{ flexDirection: 'column' }}>
                                            <div className='col-12 mt-2'>
                                                <img src={Trust} height='80px' width='80px' />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        [
                                            {
                                                name: "Annuity",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Disability Income Payments",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Personal Loans",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            // {
                                            //     name: "Real Estate Rental",
                                            //     type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            // },
                                            {
                                                name: "Reverse Motgage",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Royalties",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Social Security",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                        ].map((incomeType, index) => {
                                            let className = 'button-wrap';
                                            if (this.state.formData['incomeType'] == incomeType.name) {
                                                className = className + ' selected';
                                            }

                                            // if (incomeType.type == INCOME_TYPES_GROUP.TYPICAL) {
                                            //     className = className + ' bk--yellow';
                                            // }

                                            return (
                                                <div key={index} className={className} onClick={() => this.handleFormInputChange('incomeType', incomeType.name)}>
                                                    {incomeType.name}
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="buttons-container">
                                    <div className={'button-wrap-cust'}>
                                        <div style={{ flexDirection: 'column' }}>
                                            <div className='col-12 mt-2'>
                                                <img src={Distributions} height='80px' width='80px' />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        [
                                            {
                                                name: "Bonus from Work",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Business Proceeds - Ordinary",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Earned Income From Work",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Military Benefits",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Pension",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Sales Commision from Work",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                            {
                                                name: "Unemployment",
                                                type: 'INCOME_TYPES_GROUP_TYPICAL',
                                            },
                                        ].map((incomeType, index) => {
                                            let className = 'button-wrap';
                                            if (this.state.formData['incomeType'] == incomeType.name) {
                                                className = className + ' selected';
                                            }

                                            // if (incomeType.type == INCOME_TYPES_GROUP.TYPICAL) {
                                            //     className = className + ' bk--yellow';
                                            // }

                                            return (
                                                <div key={index} className={className} onClick={() => this.handleFormInputChange('incomeType', incomeType.name)}>
                                                    {incomeType.name}
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            </Col>
                            {/* <div className="buttons-container">
                            {
                                INCOME_TYPES_NON.map((incomeType, index) => {
                                    let className = 'button-wrap';
                                    if(this.state.formData['incomeType'] == incomeType.name){
                                        className = className + ' selected';
                                    }
                                    
                                    if(incomeType.type == INCOME_TYPES_GROUP.TYPICAL){
                                        className = className + ' bk--yellow';
                                    }

                                    return (
                                        <div key={index} className={className} onClick={() => this.handleFormInputChange('incomeType', incomeType.name)}>
                                            {incomeType.name}
                                        </div>                                   
                                        
                                    )
                                })
                            }
                            </div> */}
                        </Col>
                        <Col span={8}>
                            <h2 className="text-center font-weight-bold mb-4">Investment Income</h2>

                            <div className={'button-wrap-cust'} style={{ marginLeft: "25%" }}>
                                <div style={{ flexDirection: 'column' }}>
                                    <div className='col-12 mt-2'>
                                        <img src={stock} height='80px' width='80px' />
                                    </div>
                                </div>
                            </div>

                            <div className="buttons-container">
                                {
                                    INCOME_TYPES.map((incomeType, index) => {
                                        let className = 'button-wrap';
                                        if (this.state.formData['incomeType'] == incomeType.name) {
                                            className = className + ' selected';
                                        }

                                        // if (incomeType.type == INCOME_TYPES_GROUP.OTHER) {
                                        //     className = className + ' bk--yellow';
                                        // }

                                        return (
                                            <div key={index} className={className} onClick={() => this.handleFormInputChange('incomeType', incomeType.name)}>
                                                {incomeType.name}
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


export default connect()(IncomeTypeSubForm);