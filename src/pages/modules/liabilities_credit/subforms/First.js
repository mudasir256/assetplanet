import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields, postCompletedSteps } from "../../../../redux/slices/loginSlice";
import { Button, Row, Col, Input, Select, Form, Icon, Collapse, DatePicker } from 'antd';
import Loader from "../../../../components/styled-components/loader/loader"
import { OWNERS } from 'constants/types';
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
            mainTitle = 'Liabilities';
            fieldTitle = 'Nickname of Liabilities';
    }

    return {
        mainTitle: mainTitle,
        fieldTitle: fieldTitle
    }
}

const formID = 'MainSubForm';
class MainSubForm extends Component {

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
            Step1Data: {},
            loading: false,

        }

        this.goNextForm = this.goNextForm.bind(this);
        this.goPreviousForm = this.goPreviousForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        this.updateFormData(this.props.subFormData);
        const Step1Fields = this.props.stepsFields.filter(function (el) {
            return el.priority === 1
        })

        console.log("Step1Fields mount", Step1Fields);
        this.setState({
            StepState: Step1Fields,
        });
        this.setState({
            loading: false,
        });
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
    handleloader() {
        if (this.props.Step1.length === 0) {
            console.log("array is emty loader");
            this.setState({
                loading: true,
            });
        }
        else {
            console.log("array is full", this.props.Step1);
            this.setState({
                loading: false,
            });
        }
    }
    componentDidUpdate() {
        console.log("step1datafill update", this.state.Step1Data);
        // this.handleloader();

        // this.props.postCompletedSteps(this.state.Step1Data);

    }



    goNextForm(bEnd = false) {
        console.log("step1datafill", this.state.Step1Data);
        this.props.postCompletedSteps(this.state.Step1Data);
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
                        {this.props.Step1.map((item, index) => {

                            if (item.dataType === "int")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step1Data: {
                                                                ...this.state.Step1Data,
                                                                [e.target.name]: e.target.value
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.dataType === "string")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input size={'large'} name={item.name}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            Step1Data: {
                                                                ...this.state.Step1Data,
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
                                                            Step1Data: {
                                                                ...this.state.Step1Data,
                                                                [item.name]: dateString
                                                            }
                                                        });
                                                    }}
                                                    size={'large'}
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
                                                            Step1Data: {
                                                                ...this.state.Step1Data,
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
                </div >
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
                {this.props.Step1.length === 0 ?
                    <Loader isLoading={true}></Loader>

                    :
                    <Loader isLoading={false}></Loader>

                }
                <Loader isLoading={this.state.loading}></Loader>
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => ({
    stepsFields: state.rootReducer.loginUser.stepsFields,
    Step1: state.rootReducer.loginUser.Step1,
    CompletedSteps: state.rootReducer.loginUser.CompletedSteps,
});

const mapDispatchToProps = { postStepsFields, postCompletedSteps };


export default connect(mapStateToProps, mapDispatchToProps)(MainSubForm);

