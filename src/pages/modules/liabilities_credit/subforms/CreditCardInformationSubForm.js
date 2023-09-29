import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";

import { Button, Row, Col, Input, Select, Form, Collapse, DatePicker, Icon } from 'antd';
import PhoneNumber from 'components/form/PhoneNumber';
import Currency from 'components/form/Currency';
import Percent from 'components/form/PercentV2';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY';

const { Panel } = Collapse;

const formID = 'CreditCardInformationSubForm';
class CreditCardInformationSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Credit Card Information',
            fields: [
                {
                    id: 'creditLimit',
                    title: 'Credit Limit',
                    value: data['creditLimit'],
                    type: 'currency'
                },
                {
                    id: 'creditBalance',
                    title: 'Credit Balance',
                    value: data['creditBalance'],
                    type: 'currency'
                },
                {
                    id: 'monthlyPayment',
                    title: 'Monthly Payment',
                    value: data['monthlyPayment'],
                    type: 'currency'
                },
                {
                    id: 'interestRate',
                    title: 'Interest Rate (or APR%)',
                    value: data['interestRate'],
                    type: 'percent'
                },
                {
                    id: 'phoneNumber',
                    title: 'Phone Number of Issuer',
                    value: data['phoneNumber']
                },
                {
                    id: 'annualFee',
                    title: 'Annual Fee',
                    value: data['annualFee'],
                    type: 'currency'
                },
                {
                    id: 'pointBalance',
                    title: 'Point Balance',
                    value: data['pointBalance']
                },
                {
                    id: 'creditNotes',
                    title: 'Additional Notes about Credit Card',
                    value: data['creditNotes']
                },
                {
                    id: 'expiration',
                    title: 'Point Expiration',
                    value: data['expiration']
                }
            ]
        }

        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            size: 'large',
            formData: {
                creditLimit: '',
                creditBalance: '',
                monthlyPayment: '',
                interestRate: '',
                phoneNumber: '',
                annualFee: '',
                pointBalance: '',
                creditNotes: '',
                expiration: '',
                Step3Data: {},

            }
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'creditLimit') {
                    formData['creditLimit'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'creditBalance') {
                    formData['creditBalance'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'monthlyPayment') {
                    formData['monthlyPayment'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'interestRate') {
                    formData['interestRate'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'phoneNumber') {
                    formData['phoneNumber'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'annualFee') {
                    formData['annualFee'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'pointBalance') {
                    formData['pointBalance'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'creditNotes') {
                    formData['creditNotes'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'expiration') {
                    formData['expiration'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['creditLimit'] != '' && formData['creditBalance'] != '') {
                enableNext = true;
            }

            enableNext = true;

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        if (formData['creditLimit'] != '' && formData['creditBalance'] != '') {
            newState['enableNext'] = true;
        }
        else {
            newState['enableNext'] = false;
        }

        newState['enableNext'] = true;

        this.setState(newState);
    }

    handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.handleFormInputChange(name, value);
    }

    handleSelectChange(name, value) {
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString) {
        this.handleFormInputChange(name, dateString);
    }

    goNextForm(bEnd = false) {

        if (!this.state.enableNext) {
            return;
        }


        let formData = CreditCardInformationSubForm.FnCreateFormData({
            creditLimit: this.state.formData['creditLimit'],
            creditBalance: this.state.formData['creditBalance'],
            monthlyPayment: this.state.formData['monthlyPayment'],
            interestRate: this.state.formData['interestRate'],
            phoneNumber: this.state.formData['phoneNumber'],
            annualFee: this.state.formData['annualFee'],
            pointBalance: this.state.formData['pointBalance'],
            creditNotes: this.state.formData['creditNotes'],
            expiration: this.state.formData['expiration']
        })

        this.props.cbUpdateSubForm(formID, formData, true, bEnd);
        console.log("submit data", formData);
        console.log("step3datafill update", this.state.Step3Data);
        this.props.postCompletedSteps({
            ...this.props.CompletedSteps,
            ...this.state.Step3Data
        });

        if (!bEnd) {
            // this.props.cbGoSubForm("EndSubForm");
            this.props.cbGoNext(formID);
        }

    }

    goPreviousForm() {
        // this.props.cbGoSubForm("MainSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {
        let size = this.state.size;
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Credit Card Information</h2>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Credit Limit">
                                <Currency
                                    value={this.state.formData.creditLimit}
                                    name="creditLimit"
                                    size={size}
                                    onChange={(event) => {
                                        this.handleInputChange(event);
                                        this.setState({
                                            Step3Data: {
                                                ...this.state.Step3Data,
                                                ["Credit Limit"]: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Credit Balance">
                                <Currency
                                    value={this.state.formData.creditBalance}
                                    name="creditBalance"
                                    size={size}
                                    onChange={(event) => {
                                        this.handleInputChange(event);
                                        this.setState({
                                            Step3Data: {
                                                ...this.state.Step3Data,
                                                ["Credit Balance"]: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Monthly Payment">
                                <Currency
                                    value={this.state.formData.monthlyPayment}
                                    name="monthlyPayment"
                                    size={size}
                                    onChange={(event) => {
                                        this.handleInputChange(event);
                                        this.setState({
                                            Step3Data: {
                                                ...this.state.Step3Data,
                                                ["Monthly Payment"]: event.target.value
                                            }
                                        });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Interest Rate (or APR%)">
                                <Percent value={this.state.formData.interestRate} name="interestRate" size={size} onChange={(value) => {
                                    this.handleFormInputChange("interestRate", value);
                                    this.setState({
                                        Step3Data: {
                                            ...this.state.Step3Data,
                                            ["Interest Rate (or APR%)"]: value
                                        }
                                    });
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Form.Item label="Bank">
                                <Input value={this.state.formData.Bank} size={size} name="Bank" onChange={(event) => {
                                    this.handleInputChange(event);
                                    this.setState({
                                        Step3Data: {
                                            ...this.state.Step3Data,
                                            ["Bank"]: event.target.value
                                        }
                                    });
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} type="flex" justify="center">
                        <Col span={16}>
                            <Collapse accordion>
                                <Panel header="Additional Credit Card Information" key="1">
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Phone Number of Issuer">
                                                <PhoneNumber value={this.state.formData.phoneNumber} size={size} name="phoneNumber" onChange={(event) => {
                                                    this.handleInputChange(event);
                                                    this.setState({
                                                        Step3Data: {
                                                            ...this.state.Step3Data,
                                                            ["Phone Number"]: event.target.value
                                                        }
                                                    });
                                                }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Annual Fee">
                                                <Currency
                                                    value={this.state.formData.annualFee}
                                                    size={size}
                                                    name="annualFee"
                                                    onChange={(event) => {
                                                        this.handleInputChange(event);
                                                        this.setState({
                                                            Step3Data: {
                                                                ...this.state.Step3Data,
                                                                ["Annual Fee"]: event.target.value
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Point Balance">
                                                <Input value={this.state.formData.pointBalance} size={size} name="pointBalance" onChange={(event) => {
                                                    this.handleInputChange(event);
                                                    this.setState({
                                                        Step3Data: {
                                                            ...this.state.Step3Data,
                                                            ["Point Balance"]: event.target.value
                                                        }
                                                    });
                                                }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Point Expiration">
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    name='Point Expiration'
                                                    format={dateFormat}
                                                    size={size}
                                                    onChange={(date, dateString) => {
                                                        this.handleDatePickerChange('expiration', date, dateString);
                                                        this.setState({
                                                            Step3Data: {
                                                                ...this.state.Step3Data,
                                                                ["Point Expiration"]: dateString
                                                            }
                                                        });
                                                    }}
                                                    value={this.state.formData.expiration == '' ? null : moment(this.state.formData.expiration, dateFormat)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col>
                                            <Form.Item label="Additional Notes about Credit Card">
                                                <TextArea value={this.state.formData.creditNotes} size={size} name="creditNotes" onChange={(event) => {
                                                    this.handleInputChange(event); this.setState({
                                                        Step3Data: {
                                                            ...this.state.Step3Data,
                                                            [event.target.name]: event.target.value
                                                        }
                                                    });
                                                }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
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
                            <Button type="primary" size={'large'} style={{ marginRight: '10px' }} onClick={() => this.goNextForm(true)}>
                                Update
                            </Button>
                        }
                        <Button type="primary" disabled={!this.state.enableNext} size={'large'} onClick={() => this.goNextForm()}>
                            Next
                            <Icon type="right" />
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    stepsFields: state.rootReducer.loginUser.stepsFields,
    Step3: state.rootReducer.loginUser.Step3,
    CompletedSteps: state.rootReducer.loginUser.CompletedSteps,

});
const mapDispatchToProps = { postStepsFields, postCompletedSteps };

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardInformationSubForm);