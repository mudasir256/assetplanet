import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields, postCompletedSteps, postmonthlyPaymet } from "../../../../redux/slices/loginSlice";
import { Button, Row, Col, Input, Select, Form, Icon, Collapse, DatePicker } from 'antd';
import { OWNERS } from 'constants/types';
import { disabledEndDate } from "helpers/Utils";
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const getDynamicInfo = function (liabilityType) {
    let mainTitle = '';
    let fieldTitle = '';
    switch (liabilityType) {
        case "Credit - HELOC":
        case "Credit Card - Personal":
            mainTitle = 'Credit';
            fieldTitle = 'Nickname of Credit';
            break;
        default:
            mainTitle = 'Loan Information';
            fieldTitle = 'Nickname of Liabilities';
    }

    return {
        mainTitle: mainTitle,
        fieldTitle: fieldTitle
    }
}

const formID = 'LoanInformationSubForm';
let valueP = "";
class LoanInformationSubForm extends Component {

    static FnCreateFormData(data) {
        let dynInfo = getDynamicInfo(data.liabilityType);

        let formData = {
            title: dynInfo.mainTitle,
            fields: [
                {
                    id: 'name',
                    title: dynInfo.fieldTitle,
                    value: data['name']
                },
                {
                    id: 'owner',
                    title: 'Owner',
                    value: data['owner']
                }
            ]
        }

        return formData;
    }


    constructor(props) {
        super(props);

        let liabilityTypeField = this.props.cbGetSubFormField('LiabilityCreditTypeSubForm', 'liabilityCreditType');
        let mainTitle = '';
        let fieldTitle = '';
        if (liabilityTypeField != null) {
            let dynInfo = getDynamicInfo(liabilityTypeField.value);
            mainTitle = dynInfo.mainTitle;
            fieldTitle = dynInfo.fieldTitle;
        }

        this.state = {
            enableNext: false,
            formData: {
                name: '',
                owner: ''
            },
            mainTitle: mainTitle,
            fieldTitle: fieldTitle,
            StepState: [],
            Step2Data: {},
            payment: "",

        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
        const Step1Fields = this.props.stepsFields.filter(function (el) {
            return el.priority === 1
        })

        console.log("Step1Fields", Step1Fields);
        this.setState({
            StepState: Step1Fields,
        });
        console.log("post completd step data", this.props.Step2)
    }

    componentDidUpdate() {
        console.log("step2datafill update", this.state.Step2Data);
        let Interest = this.state.Step2Data["Interest Rate"];
        let loanAmount = this.state.Step2Data["Initial Loan Amount"];
        let Start = this.state.Step2Data["Start Date"];
        let Maturity = this.state.Step2Data["Maturity Date"];

        console.log("loanAmount", loanAmount);


    }
    calculateMonthlyPayment() {
        let Interest = this.state.Step2Data["Interest Rate"];
        let loanAmount = this.state.Step2Data["Initial Loan Amount"];
        let Start = this.state.Step2Data["Start Date"];
        let Maturity = this.state.Step2Data["Maturity Date"];

        let MaturityYear = "";
        if (Maturity) {
            MaturityYear = Maturity.getFullYear();
            console.log("MaturityYear", MaturityYear);
        }
        let StartYear = "";
        if (Start) {
            StartYear = Start.getFullYear();
            console.log("StartYear", StartYear);
        }

        let numberOfPayemts = (MaturityYear - StartYear) * 12;
        console.log("numberOfPayemts", numberOfPayemts);
        let monthlyIntrestRate = (Math.pow((1 + Interest / 100), 1 / 12)) - 1;
        let NegativePower = "";
        NegativePower = (Math.pow((1 + monthlyIntrestRate), -numberOfPayemts));
        let MonthlyPayment = "";

        MonthlyPayment = (loanAmount * monthlyIntrestRate) / (1 - (NegativePower));
        // this.setState({
        //     payment: MonthlyPayment,
        // });
        // if (MonthlyPayment) {
        //     this.setState({
        //         Step2Data: {
        //             ...this.state.Step2Data,
        //             ["Monthly Payment"]: MonthlyPayment.toPrecision(5),
        //         }
        //     });
        // }
        // return MonthlyPayment;
        // valueP=(loanAmount * monthlyIntrestRate) / (1 - (NegativePower));
        console.log("MonthlyPayment>>>>", MonthlyPayment)
        this.props.postmonthlyPaymet((loanAmount * monthlyIntrestRate) / (1 - (NegativePower)));
        return (loanAmount * monthlyIntrestRate) / (1 - (NegativePower)).toPrecision(5);


    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'name') {
                    formData['name'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'owner') {
                    formData['owner'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['name'] != '' && formData['liabilityType'] != '' && formData['owner'] != '') {
                enableNext = true;
            }

            this.setState({
                formData: formData,
                enableNext: enableNext
            })
        }

    }
    // Monlthypaymet() {
    //     console.log("redux moth", this.props.monthlyPaymet);
    //     this.setState({
    //         Step2Data: {
    //             ...this.state.Step2Data,
    //             ["Monthly Payment"]: this.props.monthlyPaymet
    //         }
    //     });
    // }
    goNextForm(bEnd = false) {
        // let PreviousData = this.props.CompletedSteps;

        this.props.postCompletedSteps({
            ...this.props.CompletedSteps,
            ...this.state.Step2Data
        });
        // this.props.postCompletedSteps(...PreviousData, this.state.Step2Data);
        this.props.cbGoNext(formID);
    }
    goPreviousForm() {
        console.log("previoes is clicked")
        this.props.cbGoPrev(formID);
    }

    render() {
        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">{this.state.mainTitle}</h2>
                        </Col>
                    </Row>
                    <React.Fragment  >
                        {this.props.Step2.map((item, index) => {

                            if (item.dataType === "int")
                                return (
                                    item.name === "Monthly Payment" ?
                                        <Row key={index} gutter={16} type="flex" justify="center">
                                            <Col span={16}>
                                                <Form.Item label={item.name}>
                                                    <Input size={'large'} name={item.name}
                                                        disabled={true}
                                                        value={this.state.Step2Data["Monthly Payment"] && this.state.Step2Data["Monthly Payment"]}
                                                        // value={this.calculateMonthlyPayment().toPrecision(5)}
                                                        onChange={(e) => {
                                                            this.setState({
                                                                Step2Data: {
                                                                    ...this.state.Step2Data,
                                                                    // ["Monthly Payment"]: this.calculateMonthlyPayment().toPrecision(5)
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        :
                                        <Row key={index} gutter={16} type="flex" justify="center">
                                            <Col span={16}>
                                                <Form.Item label={item.name}>
                                                    <Input size={'large'} name={item.name}
                                                        onChange={(e) => {
                                                            console.log("calculateMonthlyPayment", this.props.monthlyPaymet)
                                                            this.setState({
                                                                Step2Data: {
                                                                    ...this.state.Step2Data,
                                                                    [e.target.name]: e.target.value,
                                                                    // ["Monthly Payment"]: this.calculateMonthlyPayment(),
                                                                }
                                                            });
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>


                                )
                            else if (item.name === "Monthly Payment")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    disabled={true}
                                                    value={this.state.Step2Data["Monthly Payment"] && this.state.Step2Data["Monthly Payment"]}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step2Data: {
                                                                ...this.state.Step2Data,
                                                                // ["Monthly Payment"]: this.calculateMonthlyPayment(),
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.type === "String")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step2Data: {
                                                                ...this.state.Step2Data,
                                                                [e.target.name]: e.target.value,
                                                                // ["Monthly Payment"]: this.calculateMonthlyPayment(),
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.type === "Float")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step2Data: {
                                                                ...this.state.Step2Data,
                                                                [e.target.name]: e.target.value,
                                                                ["Monthly Payment"]: this.calculateMonthlyPayment(),
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.type === "Date")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <DatePicker
                                                    name={item.name}
                                                    style={{ width: '100%' }}
                                                    format={dateFormat}
                                                    disabledDate={(value) =>
                                                        disabledEndDate(
                                                          value,
                                                          this.state.Step2Data["Start Date"]
                                                        )
                                    
                                                      }
                                                    onChange={(date, dateString) => {
                                                        this.setState({
                                                            Step2Data: {
                                                                ...this.state.Step2Data,
                                                                [item.name]: date._d,
                                                                // ["Monthly Payment"]: this.calculateMonthlyPayment().toPrecision(5)

                                                            }
                                                        });
                                                    }}
                                                    // onChange={(date, dateString) => this.handleDatePickerChange('startDate', date, dateString)}
                                                    size={'large'}
                                                // value={this.state.formData.startDate == null || this.state.formData.startDate == '' ? null : moment(this.state.formData.startDate, dateFormat)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.dataType === "dropdown")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Select
                                                    name={item.name}
                                                    showSearch
                                                    placeholder="-Select-"
                                                    onChange={(value) => {
                                                        this.setState({
                                                            Step2Data: {
                                                                ...this.state.Step2Data,
                                                                [item.name]: value
                                                            }
                                                        });
                                                    }}
                                                    size={'large'}
                                                >
                                                    {item.attribute_default_values.map((dropitem, idx) => (
                                                        <Option key={idx} value={dropitem.value}>{dropitem.value}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                        })}
                    </React.Fragment>
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
                        <Button type="primary" size={'large'} onClick={() => this.goNextForm()}>
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
    Step2: state.rootReducer.loginUser.Step2,
    CompletedSteps: state.rootReducer.loginUser.CompletedSteps,
    monthlyPaymet: state.rootReducer.loginUser.monthlyPaymet,


});

const mapDispatchToProps = { postStepsFields, postCompletedSteps, postmonthlyPaymet };


export default connect(mapStateToProps, mapDispatchToProps)(LoanInformationSubForm);

