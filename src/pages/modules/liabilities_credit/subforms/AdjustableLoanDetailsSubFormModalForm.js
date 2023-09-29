import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStepsFields } from "../../../../redux/slices/loginSlice";
import ReportModal from 'components/ReportModal';
import { Button, Row, Col, Input, Select, Form, Collapse, Icon, DatePicker, Modal } from 'antd';
import Currency from 'components/form/Currency';
import Percent from 'components/form/PercentV2';
import moment from 'moment';
import { ORDER_DISTRIBUTES, FREQUNCIES } from 'constants/types';
import TextArea from 'antd/lib/input/TextArea';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;

class AdjustableLoanDetailsSubFormModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.formData,
            size: 'large',
            Step4Data: {},
        }

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);

    }

    componentDidMount() {
        console.log("step4>>>>>", this.props.Step4)
    }

    handleFormInputChange(name, value) {

        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData
        };

        this.setState(newState);

        this.props.cbUpdatedForm(formData);
    }

    handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        this.handleFormInputChange(name, value);
    }

    handleDatePickerChange(name, date, dateString) {
        this.handleFormInputChange(name, dateString);
    }

    handleSelectChange(name, value) {
        this.handleFormInputChange(name, value);
    }

    render() {
        let size = this.state.size;

        return (
            <React.Fragment>
                <div className="info-form-block pl-5 pr-5">
                    <h2 className="text-center font-weight-bold mb-4">Add Adjustable Loan Details</h2>
                    <React.Fragment  >
                        {this.props.Step4.map((item, index) => {

                            if (item.name === "New Percent")
                                return (
                                    <Row gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Percent size={'large'} value={this.state.formData.newPercent} name="newPercent" onChange={(value) => this.handleFormInputChange("newPercent", value)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Monthly Payment Changes")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Currency
                                                    size={size}
                                                    value={this.state.formData.monthlyPaymentChanges}
                                                    name="monthlyPaymentChanges"
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Adjustable Loan Details")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input value={this.state.formData.adjustableLoanDetails} name="adjustableLoanDetails" size={size} onChange={(event) => this.handleInputChange(event)} />

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
                                                    onChange={(date, dateString) => this.handleDatePickerChange('dateRateChange', date, dateString)}
                                                    value={this.state.formData.dateRateChange == '' ? null : moment(this.state.formData.dateRateChange, dateFormat)}

                                                    // onChange={(date, dateString) => {
                                                    //     this.setState({
                                                    //         Step4Data: {
                                                    //             ...this.state.Step4Data,
                                                    //             [item.name]: dateString
                                                    //         }
                                                    //     });
                                                    // }}
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
                                                            Step4Data: {
                                                                ...this.state.Step4Data,
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
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => ({
    stepsFields: state.rootReducer.loginUser.stepsFields,
    Step4: state.rootReducer.loginUser.Step4,
});

const mapDispatchToProps = { postStepsFields };
export default connect(mapStateToProps, mapDispatchToProps)(AdjustableLoanDetailsSubFormModalForm);