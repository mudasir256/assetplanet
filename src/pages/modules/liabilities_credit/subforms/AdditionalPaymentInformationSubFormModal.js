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
import AdditionalPaymentInformationSubFormModalForm from "./AdditionalPaymentInformationSubFormModalForm";
import TextArea from "antd/lib/input/TextArea";
import { disabledEndDate } from "helpers/Utils";
const dateFormat = "MM/DD/YYYY";

const { Option } = Select;

class AdditionalPaymentInformationSubFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };

    this.updatedForm = this.updatedForm.bind(this);
  }

  componentDidMount() {
    console.log("step5>>>>>", this.props.Step5)

  }

  renderBody() {
    return (
      <AdditionalPaymentInformationSubFormModalForm
        cbUpdatedForm={this.updatedForm}
        formData={this.props.formData}
      ></AdditionalPaymentInformationSubFormModalForm>
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
const mapStateToProps = (state) => ({
  stepsFields: state.rootReducer.loginUser.stepsFields,
  Step5: state.rootReducer.loginUser.Step5,
});

const mapDispatchToProps = { postStepsFields };
export default connect(mapStateToProps, mapDispatchToProps)(AdditionalPaymentInformationSubFormModal);
