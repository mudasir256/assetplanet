import React, { Component } from "react";
import { connect } from "react-redux";
import { postStepsFields } from "../../../../redux/slices/loginSlice";
import ReportModal from "components/ReportModal";
import {
    Button,
    Row,
    Col,
    Input,
    Select,
    Form,
    Collapse,
    Icon,
    DatePicker,
    Modal,
} from "antd";
import Currency from "components/form/Currency";
import Percent from "components/form/Percent";
import moment from "moment";
import { ORDER_DISTRIBUTES, FREQUNCIES } from "constants/types";
import TextArea from "antd/lib/input/TextArea";
import { disabledEndDate } from "helpers/Utils";
const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

class AdditionalPaymentInformationSubFormModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: this.props.formData,
            size: "large",
        };

        this.handleFormInputChange = this.handleFormInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        console.log("step5>>>>>", this.props.Step5)

    }

    handleFormInputChange(name, value) {
        let formData = this.state.formData;
        formData[name] = value;

        let newState = {
            formData: formData,
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
                    <h2 className="text-center font-weight-bold mb-4">
                        Add Additional Principal Payments
                    </h2>
                    <React.Fragment  >
                        {this.props.Step5.map((item, index) => {

                            if (item.name === "Interest Rate")
                                return (
                                    <Row gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Percent size={'large'} value={this.state.formData.newPercent} name="newPercent" onChange={(value) => this.handleFormInputChange("newPercent", value)} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Extra Principal Payment Description")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <TextArea
                                                    value={this.state.formData.extra_payment_description}
                                                    name="extra_payment_description"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Amount")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Currency
                                                    value={this.state.formData.howMuch}
                                                    name="howMuch"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Extra Payment Start Date")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    format={dateFormat}
                                                    size={size}
                                                    onChange={(date, dateString) =>
                                                        this.handleDatePickerChange("startDate", date, dateString)
                                                    }
                                                    value={
                                                        this.state.formData.startDate == ""
                                                            ? null
                                                            : moment(this.state.formData.startDate, dateFormat)
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Frequency")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Select
                                                    showSearch
                                                    placeholder="-Select-"
                                                    value={this.state.formData.howOften}
                                                    onChange={(value) =>
                                                        this.handleSelectChange("howOften", value)
                                                    }
                                                    size={size}
                                                >
                                                    {item.attribute_default_values.map((dropitem, idx) => (
                                                        <Option key={idx} value={dropitem.value}>{dropitem.value}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Number of Occurrences")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <Input
                                                    value={this.state.formData.occurrence}
                                                    name="occurrence"
                                                    size={size}
                                                    onChange={(event) => this.handleInputChange(event)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                            else if (item.name === "Extra Payment End Date")
                                return (
                                    <Row key={index} gutter={16} type="flex" justify="center">
                                        <Col span={16}>
                                            <Form.Item label={item.name}>
                                                <DatePicker
                                                    style={{ width: "100%" }}
                                                    format={dateFormat}
                                                    size={size}
                                                    disabledDate={(value) =>
                                                        disabledEndDate(value, this.state.formData.startDate)
                                                    }
                                                    onChange={(date, dateString) =>
                                                        this.handleDatePickerChange("lastDate", date, dateString)
                                                    }
                                                    value={
                                                        this.state.formData.lastDate == ""
                                                            ? null
                                                            : moment(this.state.formData.lastDate, dateFormat)
                                                    }
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )
                        })}
                    </React.Fragment>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    stepsFields: state.rootReducer.loginUser.stepsFields,
    Step5: state.rootReducer.loginUser.Step5,
});

const mapDispatchToProps = { postStepsFields };
export default connect(mapStateToProps, mapDispatchToProps)(AdditionalPaymentInformationSubFormModalForm);
