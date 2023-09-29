import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";
import { Button, Row, Col, Input, Select, Form, Icon, Collapse, DatePicker } from 'antd';
import { OWNERS } from 'constants/types';
import moment from 'moment';
const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const loanTypes = [
    "Fixed", "Adjustable"
]

const loanPaybackTypes = [
    "Principal and Interest", "Interest Only"
]
const formID = 'LoanPaybackSubForm';
class LoanPaybackSubForm extends Component {

    static FnCreateFormData(data) {
        let formData = {
            title: 'Loan Payback Type',
            fields: [
                {
                    id: 'loanPaybackType',
                    title: 'Loan Payback Type',
                    value: data['loanPaybackType']
                },
                {
                    id: 'loanType',
                    title: 'Type of Loan',
                    value: data['loanType']
                }
            ]
        }

        return formData;
    }

    constructor(props) {
        super(props);

        this.state = {
            enableNext: false,
            formData: {
                loanPaybackType: '',
                loanType: '',
            },
            StepState: [],
            Step3Data: {},
        }

        this.goNextForm = this.goNextForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        this.updateFormData(this.props.subFormData);
        const Step3Fields = this.props.stepsFields.filter(function (el) {
            return el.groupPriorityValue === 4
        })

        console.log("Step3Fields", Step3Fields);
        this.setState({
            StepState: Step3Fields,
        });
        console.log("post completd step data in form 3", this.props.CompletedSteps)

    }
    componentDidUpdate() {
        console.log("step3datafill update", this.state.Step3Data);

    }

    updateFormData(newFormData) {
        let formData = this.state.formData;
        if (newFormData.hasOwnProperty('fields')) {
            for (var findex = 0; findex < newFormData.fields.length; findex++) {
                if (newFormData.fields[findex]['id'] == 'loanPaybackType') {
                    formData['loanPaybackType'] = newFormData.fields[findex]['value'];
                }
                if (newFormData.fields[findex]['id'] == 'loanType') {
                    formData['loanType'] = newFormData.fields[findex]['value'];
                }
            }

            let enableNext = false;
            if (formData['loanPaybackType'] != '' && formData['loanType'] != '') {
                enableNext = true;
            }

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

        if (formData['loanPaybackType'] != '' && formData['loanType'] != '') {
            newState['enableNext'] = true;
        }
        else {
            newState['enableNext'] = false;
        }

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

    goNextForm(bEnd = false) {
        // if(!this.state.enableNext){
        //     return;
        // }

        // let formData = LoanPaybackSubForm.FnCreateFormData({
        //     loanPaybackType: this.state.formData['loanPaybackType'],
        //     loanType: this.state.formData['loanType']
        // })

        // this.props.cbUpdateSubForm(formID, formData, true, bEnd);

        // if(!bEnd){
        //     switch(this.state.formData['loanType']){
        //         case "Fixed":
        //             this.props.cbGoSubForm("QuestionAdditionalPaymentSubForm");
        //             break;
        //         case "Adjustable":
        //             this.props.cbGoSubForm("AdjustableLoanDetailsSubForm");
        //     }
        // }  
        this.props.postCompletedSteps({
            ...this.props.CompletedSteps,
            ...this.state.Step3Data
        });

        this.props.cbGoNext("AdjustableLoanDetailsSubForm");
    }

    goPreviousForm() {
        // this.props.cbGoSubForm("LoanInformationSubForm");
        this.props.cbGoPrev(formID);
    }

    render() {

        return (
            <React.Fragment>
                <div className="info-form-block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <h2 className="text-center font-weight-bold mb-4">Loan Payback Type</h2>
                        </Col>
                    </Row>
                    <React.Fragment  >
                        {this.props.Step3.map((item, index) => {

                            if (item.dataType === "int")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step3Data: {
                                                                ...this.state.Step3Data,
                                                                [e.target.name]: e.target.value
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )

                            else if (item.dataType === "Date")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <DatePicker
                                                    name={item.name}
                                                    style={{ width: '100%' }}
                                                    format={dateFormat}
                                                    onChange={(date, dateString) => {
                                                        this.setState({
                                                            Step3Data: {
                                                                ...this.state.Step3Data,
                                                                [item.name]: dateString
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
                                                            Step3Data: {
                                                                ...this.state.Step3Data,
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
    Step3: state.rootReducer.loginUser.Step3,
    CompletedSteps: state.rootReducer.loginUser.CompletedSteps,

});

const mapDispatchToProps = { postStepsFields, postCompletedSteps };

export default connect(mapStateToProps, mapDispatchToProps)(LoanPaybackSubForm);