import React, { Component } from "react";
import { connect } from "react-redux";

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
  InputNumber,
} from "antd";
import Currency from "components/form/Currency";
import Number from "components/form/Number";
import moment from "moment";
import { ANIMALS } from "constants/types";
import TextArea from "antd/lib/input/TextArea";

const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

class StockSubFormModalForm extends Component {
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

  componentDidMount() {}

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
            Add Individual Stock
          </h2>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Stock Symbol">
                <Input
                  value={this.state.formData.stockSymbol}
                  name="stockSymbol"
                  size={size}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Quantity">
                <Number
                  value={this.state.formData.quantity}
                  name="quantity"
                  size={size}
                  onChange={(value) =>
                    this.handleFormInputChange("quantity", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Today's Value">
                <Currency
                  value={this.state.formData.todayValue}
                  name="todayValue"
                  size={size}
                  onChange={(event) => this.handleInputChange(event)}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Date">
                <DatePicker
                  placeholder="Select Date"
                  style={{ width: "100%" }}
                  format={dateFormat}
                  onChange={(date, dateString) =>
                    this.handleDatePickerChange(
                      "dateOfIndividual",
                      date,
                      dateString
                    )
                  }
                  value={
                    this.state.formData.dateOfIndividual == ""
                      ? null
                      : moment(this.state.formData.dateOfIndividual, dateFormat)
                  }
                  name="dateOfIndividual"
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
class StockSubFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };

    this.updatedForm = this.updatedForm.bind(this);
  }

  componentDidMount() {}

  renderBody() {
    return (
      <StockSubFormModalForm
        cbUpdatedForm={this.updatedForm}
        formData={this.props.formData}
      ></StockSubFormModalForm>
    );
  }

  updatedForm(formData) {
    this.setState({
      formData: formData,
    });
  }

  renderFooter() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          onClick={() => this.props.cbSave(this.state.formData)}
        >
          {this.props.formData.hasOwnProperty("id") && (
            <React.Fragment>Update</React.Fragment>
          )}
          {!this.props.formData.hasOwnProperty("id") && (
            <React.Fragment>Add</React.Fragment>
          )}
        </Button>{" "}
        <Button onClick={this.props.cbCancel}>Cancel</Button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        width="80vw"
        centered
        visible={this.props.visible}
        footer={this.renderFooter()}
        onCancel={this.props.cbCancel}
      >
        {this.renderBody()}
      </Modal>
    );
  }
}

export default connect()(StockSubFormModal);
