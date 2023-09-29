import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Table, Button, Card, Row, Col } from 'reactstrap';

import { Button, Row, Col, Input, Select, Form, Radio, Collapse, Icon } from 'antd';
import Currency from '../../../../components/form/Currency';
import Country from '../../../../components/form/Country';
import Uploader from '../../../../components/form/Uploader';

const { Option } = Select;
const { Panel } = Collapse;

const accountTypes = [
    '401K', '401K - Individual', '401K Roth', '403B', '457', '529', 'Coverdell Education', 'Custodial', 'Defined Benefit', 'Defined Contribution', 'ESOP', 'Health Savings Account', 'Individual', 'IRA Contributory', 'IRA Inherited', 'IRA Rollover', 'Joint', 'Joint - Tenants In Common', 'Moneye Purchase', 'Pension', 'Profit Sharing Plan', 'Roth', 'SARSEP', 'SEP IRA', 'SIMPLE IRA', 'Trust'
];

const owners = [
    'Bill Client', 'Peggy Client', 'Joint', 'Mark Client', 'Katie Client'
]

const heldWheres = [
    'AIG', 'Allianz Life', 'Ameriprise Financial', 'AXA Advisors'
]

const assetStatuses = [
    'Owned', 'Pending Sale', 'Sold', 'Not Owned'
]

const formID = 'InvestmentPropertySubForm';
class InvestmentPropertySubForm extends Component {

    static FnCreateFormData(data){
        let formData = {
            title: 'Investment Property',
            fields: [
                {
                    id: 'purchasePrice',
                    title: 'Purchase Price of Property',
                    value: data['purchasePrice'],
                    type: 'currency'
                },
                {
                    id: 'monthlyRent',
                    title: 'Monthly Lease/Rent Collected',
                    value: data['monthlyRent'],
                    type: 'currency'
                },
                {
                    id: 'totalMonthlyExpenses',
                    title: 'Total Monthly Expenses',
                    value: data['totalMonthlyExpenses'],
                    type: 'currency'
                },
                {
                    id: 'downPayment',
                    title: 'Down Payment',
                    value: data['downPayment'],
                    type: 'currency'
                },
                {
                    id: 'investmentPropertyAddress',
                    title: 'Investment Property Address',
                    value: data['investmentPropertyAddress']
                },
                // {
                //     id: 'addressLine1',
                //     title: 'Address Line 1',
                //     value: data['addressLine1']
                // },
                // {
                //     id: 'addressLine2',
                //     title: 'Address Line 2',
                //     value: data['addressLine2']
                // },
                // {
                //     id: 'city',
                //     title: 'City / District',
                //     value: data['city']
                // },
                // {
                //     id: 'state',
                //     title: 'State / Province',
                //     value: data['state']
                // },
                // {
                //     id: 'postalCode',
                //     title: 'Postal Code',
                //     value: data['postalCode']
                // },
                // {
                //     id: 'country',
                //     title: 'Country',
                //     value: data['country']
                // }
            ]
        }
    
        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                purchasePrice: '',
                monthlyRent: '',
                totalMonthlyExpenses: '',
                downPayment: '',
                investmentPropertyAddress: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData){
        let formData = this.state.formData;
        if(newFormData.hasOwnProperty('fields')){
            for(var findex = 0; findex < newFormData.fields.length; findex++){
                if(newFormData.fields[findex]['id'] == 'purchasePrice'){
                    formData['purchasePrice'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'monthlyRent'){
                    formData['monthlyRent'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'totalMonthlyExpenses'){
                    formData['totalMonthlyExpenses'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'downPayment'){
                    formData['downPayment'] = newFormData.fields[findex]['value'];
                }
                if(newFormData.fields[findex]['id'] == 'investmentPropertyAddress'){
                    formData['investmentPropertyAddress'] = newFormData.fields[findex]['value'];
                }
                // if(newFormData.fields[findex]['id'] == 'addressLine1'){
                //     formData['addressLine1'] = newFormData.fields[findex]['value'];
                // }
                // if(newFormData.fields[findex]['id'] == 'addressLine2'){
                //     formData['addressLine2'] = newFormData.fields[findex]['value'];
                // }
                // if(newFormData.fields[findex]['id'] == 'city'){
                //     formData['city'] = newFormData.fields[findex]['value'];
                // }
                // if(newFormData.fields[findex]['id'] == 'state'){
                //     formData['state'] = newFormData.fields[findex]['value'];
                // }
                // if(newFormData.fields[findex]['id'] == 'postalCode'){
                //     formData['postalCode'] = newFormData.fields[findex]['value'];
                // }
                // if(newFormData.fields[findex]['id'] == 'country'){
                //     formData['country'] = newFormData.fields[findex]['value'];
                // }
            }
    
            let enableNext = false;
            if(formData['purchasePrice'] != '' && formData['monthlyRent'] != '' && formData['totalMonthlyExpenses'] != '' && formData['downPayment'] != '' && formData['investmentPropertyAddress'] != '' ){
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }
        
    }

    handleFormInputChange(name, value){
        
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if(formData['purchasePrice'] != '' && formData['monthlyRent'] != '' && formData['totalMonthlyExpenses'] != '' && formData['downPayment'] != '' && formData['investmentPropertyAddress'] != '' ){
            newState['enableNext'] = true;
        }
        else{
            newState['enableNext'] = false;
        }

        this.setState(newState);
    }

    handleInputChange(event){
        event.preventDefault();
        const {name, value} = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value){
        this.handleFormInputChange(name, value);
    }

    goNextForm(bEnd = false){
        if(!this.state.enableNext){
            return;
        }

        let formData = InvestmentPropertySubForm.FnCreateFormData({
            purchasePrice: this.state.formData['purchasePrice'],
            monthlyRent: this.state.formData['monthlyRent'],
            totalMonthlyExpenses: this.state.formData['totalMonthlyExpenses'],
            downPayment: this.state.formData['downPayment'],
            investmentPropertyAddress: this.state.formData['investmentPropertyAddress'],
            // addressLine1: this.state.formData['addressLine1'],
            // addressLine2: this.state.formData['addressLine2'],
            // city: this.state.formData['city'],
            // state: this.state.formData['state'],
            // postalCode: this.state.formData['postalCode'],
            // country: this.state.formData['country']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        if(!bEnd){
            // this.props.cbGoSubForm("InvestmentPropertyExpensesSubForm");
            this.props.cbGoNext(formID);
        }        
        
    }

    goPreviousForm(){
        // this.props.cbGoSubForm("PropertySubForm");
        this.props.cbGoPrev(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Investment Property Section</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Purchase Price of Property">
                                <Currency 
                                    value={this.state.formData.purchasePrice} 
                                    name="purchasePrice" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly Lease/Rent Collected">
                                <Currency 
                                    value={this.state.formData.monthlyRent} 
                                    name="monthlyRent" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Total Monthly Expenses">
                                <Currency 
                                    value={this.state.formData.totalMonthlyExpenses} 
                                    name="totalMonthlyExpenses" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Down Payment">
                                <Currency 
                                    value={this.state.formData.downPayment} 
                                    name="downPayment" 
                                    onChange={(event) => this.handleInputChange(event)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Investment Property Address">
                                <Input size={'large'} placeholder="Investment Property Address" value={this.state.formData.investmentPropertyAddress} name="investmentPropertyAddress" onChange={(event) => this.handleInputChange(event)}></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
                <div className="row justify-content-between">
                    <div className="col-8">
                        <Button type="primary" size={'large'} onClick={() => this.goPreviousForm()}>
                            <Icon type="left" />
                            Previous
                        </Button>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                        {
                            this.props.dataID != null && 
                            <Button type="primary" size={'large'} style={{marginRight: '10px'}} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={ !this.state.enableNext } size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default connect()(InvestmentPropertySubForm);